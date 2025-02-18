import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { usePrivy, getAccessToken } from "@privy-io/react-auth";
import Head from "next/head";

async function verifyToken() {
  const url = "/api/verify";
  const accessToken = await getAccessToken();
  const result = await fetch(url, {
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined),
    },
  });

  return await result.json();
}

export default function DashboardPage() {
  const [verifyResult, setVerifyResult] = useState();
  const router = useRouter();
  const {
    ready,
    authenticated,
    user,
    logout,
    linkEmail,
    linkWallet,
    unlinkEmail,
    linkPhone,
    unlinkPhone,
    unlinkWallet,
    linkGoogle,
    unlinkGoogle,
    linkTwitter,
    unlinkTwitter,
    linkDiscord,
    unlinkDiscord,
  } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  const numAccounts = user?.linkedAccounts?.length || 0;
  const canRemoveAccount = numAccounts > 1;

  const email = user?.email;
  const phone = user?.phone;
  const wallet = user?.wallet;

  const googleSubject = user?.google?.subject || null;
  const twitterSubject = user?.twitter?.subject || null;
  const discordSubject = user?.discord?.subject || null;

  return (
    <>
      <Head>
        <title>Dashboard | Privy Auth</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-violet-50 to-violet-100">
        {ready && authenticated ? (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-violet-900">Bem-vindo!</h1>
                  <p className="text-gray-600">Gerencie suas conexões</p>
                </div>
                <button
                  onClick={logout}
                  className="bg-violet-100 hover:bg-violet-200 text-violet-700 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <span>Sair</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3zm11.707 4.707a1 1 0 0 0-1.414-1.414L10 9.586 6.707 6.293a1 1 0 0 0-1.414 1.414L8.586 11l-3.293 3.293a1 1 0 1 0 1.414 1.414L10 12.414l3.293 3.293a1 1 0 0 0 1.414-1.414L11.414 11l3.293-3.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Grid de Conexões */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Card Email */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span className="font-medium">Email</span>
                    </div>
                    {email ? (
                      <button
                        onClick={() => unlinkEmail(email.address)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium disabled:text-gray-400"
                        disabled={!canRemoveAccount}
                      >
                        Desconectar
                      </button>
                    ) : (
                      <button
                        onClick={linkEmail}
                        className="text-violet-600 hover:text-violet-700 text-sm font-medium"
                      >
                        Conectar
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Wallet */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Carteira</span>
                    </div>
                    {wallet ? (
                      <button
                        onClick={() => unlinkWallet(wallet.address)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium disabled:text-gray-400"
                        disabled={!canRemoveAccount}
                      >
                        Desconectar
                      </button>
                    ) : (
                      <button
                        onClick={linkWallet}
                        className="text-violet-600 hover:text-violet-700 text-sm font-medium"
                      >
                        Conectar
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Phone */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span className="font-medium">Telefone</span>
                    </div>
                    {phone ? (
                      <button
                        onClick={() => unlinkPhone(phone.number)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium disabled:text-gray-400"
                        disabled={!canRemoveAccount}
                      >
                        Desconectar
                      </button>
                    ) : (
                      <button
                        onClick={linkPhone}
                        className="text-violet-600 hover:text-violet-700 text-sm font-medium"
                      >
                        Conectar
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Google */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      <span className="font-medium">Google</span>
                    </div>
                    {googleSubject ? (
                      <button
                        onClick={() => unlinkGoogle(googleSubject)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium disabled:text-gray-400"
                        disabled={!canRemoveAccount}
                      >
                        Desconectar
                      </button>
                    ) : (
                      <button
                        onClick={linkGoogle}
                        className="text-violet-600 hover:text-violet-700 text-sm font-medium"
                      >
                        Conectar
                      </button>
                    )}
                  </div>
                </div>

                {/* Card X/Twitter */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      <span className="font-medium">X (Twitter)</span>
                    </div>
                    {twitterSubject ? (
                      <button
                        onClick={() => unlinkTwitter(twitterSubject)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium disabled:text-gray-400"
                        disabled={!canRemoveAccount}
                      >
                        Desconectar
                      </button>
                    ) : (
                      <button
                        onClick={linkTwitter}
                        className="text-violet-600 hover:text-violet-700 text-sm font-medium"
                      >
                        Conectar
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Discord */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path 
                          fill="#5865F2" 
                          d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"
                        />
                      </svg>
                      <span className="font-medium">Discord</span>
                    </div>
                    {discordSubject ? (
                      <button
                        onClick={() => unlinkDiscord(discordSubject)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium disabled:text-gray-400"
                        disabled={!canRemoveAccount}
                      >
                        Desconectar
                      </button>
                    ) : (
                      <button
                        onClick={linkDiscord}
                        className="text-violet-600 hover:text-violet-700 text-sm font-medium"
                      >
                        Conectar
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Botão de Verificação */}
              <div className="mt-6">
                <button
                  onClick={() => verifyToken().then(setVerifyResult)}
                  className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Verificar Token
                </button>

                {Boolean(verifyResult) && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-medium text-gray-600">
                      Resultado da Verificação
                    </summary>
                    <pre className="mt-2 p-4 bg-gray-50 rounded-lg text-sm overflow-auto">
                      {JSON.stringify(verifyResult, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </>
  );
}
