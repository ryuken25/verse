import type { Metadata } from "next";
import "./globals.css";
import { Web3Provider } from "@/components/wallet/WalletProvider";
import XPToast from "@/components/XPToast";

export const metadata: Metadata = {
  title: "VERSE - The Future of Web3 Community",
  description: "Learn blockchain, trade tokens, join events, and build the decentralized future with VERSE.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Web3Provider>
          {children}
          <XPToast />
        </Web3Provider>
      </body>
    </html>
  );
}
