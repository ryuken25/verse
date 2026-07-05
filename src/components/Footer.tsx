'use client';

import { Heart, ArrowUp } from 'lucide-react';

const footerLinks = {
  'VERSE Ecosystem': [
    { name: 'Verse DEX', url: 'https://verse.bitcoin.com/' },
    { name: 'Swap', url: 'https://verse.bitcoin.com/swap/' },
    { name: 'Pools', url: 'https://verse.bitcoin.com/pools/' },
    { name: 'Farms', url: 'https://verse.bitcoin.com/farms/' },
    { name: 'Staking', url: 'https://verse.bitcoin.com/staking/' },
  ],
  'Resources': [
    { name: 'Whitepaper', url: 'https://www.getverse.com/verse-whitepaper.pdf' },
    { name: 'Audits', url: 'https://verse.bitcoin.com/audits/' },
    { name: 'Analytics', url: 'https://analytics.verse.bitcoin.com/' },
    { name: 'News', url: 'https://news.bitcoin.com/' },
    { name: 'Token List', url: 'https://github.com/bitcoin-portal/verse-dex-tokens' },
  ],
  'Wallet': [
    { name: 'Bitcoin.com Wallet', url: 'https://wallet.bitcoin.com/' },
    { name: 'VERSE Wallet', url: 'https://wallet.bitcoin.com/verse/' },
  ],
  'Community': [
    { name: 'Telegram', url: 'https://t.me/GetVerse/1/' },
    { name: 'Discord', url: 'https://discord.com/invite/bitcoin-com/' },
    { name: 'X (Twitter)', url: 'https://x.com/bitcoincom/' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/bitcoin.com/' },
  ],
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative py-12 md:py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050816] to-[#0a0e27]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="col-span-2 md:col-span-1">
            <a href="https://verse.bitcoin.com/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 mb-4">
              <img src="/verse-logo.png" alt="VERSE" className="w-8 h-8" />
              <span className="text-xl font-bold gradient-text">VERSE</span>
            </a>
            <p className="text-gray-400 text-sm mb-4 max-w-xs">Part of the Bitcoin.com ecosystem. Building the future of decentralized finance.</p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">{category}</h3>
              <ul className="space-y-2 md:space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-xs md:text-sm mb-4 md:mb-0 text-center md:text-left">
              © 2024 VERSE / Bitcoin.com. Built with <Heart className="w-3 h-3 md:w-4 md:h-4 inline text-red-500" /> by the community
            </p>
            <button type="button" onClick={scrollToTop}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm">
              <span>Back to top</span><ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
