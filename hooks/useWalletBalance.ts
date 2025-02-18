import { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';

export function useWalletBalance(address: string | undefined) {
  const [balance, setBalance] = useState<string>('0');
  const { ready } = usePrivy();

  useEffect(() => {
    if (!ready || !address) return;

    // Usando a API do Privy para obter o saldo
    const fetchBalance = async () => {
      try {
        // Por enquanto, vamos apenas mostrar o endereço
        // Precisamos implementar de acordo com a documentação do Privy
        setBalance('...');
      } catch (error) {
        console.error('Error fetching balance:', error);
        setBalance('0');
      }
    };

    fetchBalance();
  }, [ready, address]);

  return balance;
} 