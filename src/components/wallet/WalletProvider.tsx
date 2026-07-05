'use client';

import { createConfig, http, WagmiProvider } from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode, useEffect } from 'react';
import { polygon } from '@/lib/chains';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

// Create config with multiple connectors
const config = createConfig({
  chains: [polygon],
  connectors: [
    // Injected connector for browser extensions (MetaMask, Rabby, OKX, Bitget, etc.)
    injected({ shimDisconnect: true }),
    // WalletConnect for mobile QR/deeplink (only if projectId exists)
    ...(projectId
      ? [
          walletConnect({
            projectId,
            showQrModal: true,
            metadata: {
              name: 'VERSE Academy',
              description: 'Learn Web3 with VERSE',
              url: 'https://verse-kenshi.vercel.app',
              icons: ['https://verse-kenshi.vercel.app/verse-logo.png'],
            },
          }),
        ]
      : []),
  ],
  transports: {
    [polygon.id]: http('https://polygon-rpc.com'),
  },
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {mounted ? children : <>{children}</>}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
