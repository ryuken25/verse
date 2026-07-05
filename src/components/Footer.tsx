'use client';

import { useCallback } from 'react';
import { Heart, ArrowUp } from 'lucide-react';

const footerLinks = {
  Product: [{ name: 'Features', href: 'features' }, { name: 'Swap', href: '/swap' }, { name: 'Academy', href: '/academy' }, { name: 'Events', href: 'events' }],
  Community: [{ name: 'Discord', href: '#' }, { name: 'Telegram', href: '#' }, { name: 'Twitter', href: '#' }, { name: 'Forum', href: '#' }],
  Developers: [{ name: 'SDK', href: 'docs-section' }, { name: 'Documentation', href: '/docs' }, { name: 'GitHub', href: 'https://github.com/ryuken25/verse' }, { name: 'API', href: 'docs-section' }],
  Resources: [{ name: 'Blog', href: '#' }, { name: 'Asset Hub', href: 'build' }, { name: 'Whitepaper', href: '#' }, { name: 'FAQ', href: '#' }],
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleClick = (href: string) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (href.startsWith('/')) {
      window.location.href = href;
    } else if (href !== '#') {
      document.getElementById(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-12 md:py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050816] to-[#0a0e27]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="col-span-2 md:col-span-1">
            <button type="button" onClick={scrollToTop} className="flex items-center space-x-2 mb-4">
              <img src="/verse-logo.png" alt="VERSE" className="w-8 h-8" />
              <span className="text-xl font-bold gradient-text">VERSE</span>
            </button>
            <p className="text-gray-400 text-sm mb-4 max-w-xs">Building the future of decentralized community and innovation.</p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">{category}</h3>
              <ul className="space-y-2 md:space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <button type="button" onClick={() => handleClick(link.href)}
                      className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm">{link.name}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-xs md:text-sm mb-4 md:mb-0 text-center md:text-left">
              © 2024 VERSE. Built with <Heart className="w-3 h-3 md:w-4 md:h-4 inline text-red-500" /> by the community
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
