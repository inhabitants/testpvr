import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export function useWalletBalance(address: string | undefined) {
  const [balance, setBalance] = useState<string>('0');

  useEffect(() => {
    if (!address) return;

    const provider = new ethers.providers.JsonRpcProvider('https://eth.llamarpc.com');
    
    async function getBalance() {
      try {
        const bal = await provider.getBalance(address);
        setBalance(ethers.utils.formatEther(bal));
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    }

    getBalance();
  }, [address]);

  return balance;
} 