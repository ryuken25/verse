import type { Metadata } from "next";
import "./globals.css";
import { Web3Provider } from "@/components/wallet/WalletProvider";

export const metadata: Metadata = {
  title: "VERSE - The Future of Web3 Community",
  description: "Learn blockchain, trade tokens, join events, and build the decentralized future with VERSE.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
