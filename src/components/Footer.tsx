'use client';

import { motion } from 'framer-motion';
import { Heart, Mail, ArrowUp, ExternalLink } from 'lucide-react';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Documentation', 'API'],
  Community: ['Discord', 'Forum', 'Events', 'Blog'],
  Company: ['About', 'Careers', 'Press', 'Contact'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
};

const socialLinks = [
  { label: 'GitHub', href: '#', icon: 'GH' },
  { label: 'Twitter', href: '#', icon: 'X' },
  { label: 'Discord', href: '#', icon: 'DC' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050816] to-[#0a0e27]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <span className="text-2xl font-bold gradient-text">VERSE</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Building the future of decentralized community and innovation. 
              Join us in creating a more open and connected world.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors text-sm font-bold"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 VERSE. All rights reserved. Built with{' '}
              <Heart className="w-4 h-4 inline text-red-500" /> by the community
            </p>
            
            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <span className="text-sm">Back to top</span>
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
