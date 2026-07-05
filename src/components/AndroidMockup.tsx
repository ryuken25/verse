'use client';

import { motion } from 'framer-motion';

export default function AndroidMockup() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0a0e27] via-[#0d1130] to-[#0a0e27]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Take <span className="gradient-text">VERSE</span> Everywhere</h2>
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto">Download the Bitcoin.com Wallet to access VERSE on mobile</p>
        </motion.div>

        {/* Phone Mockup */}
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-center mb-12">
          <div className="relative">
            <div className="w-[280px] md:w-[300px] h-[580px] md:h-[620px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[36px] md:rounded-[40px] p-2.5 md:p-3 shadow-2xl shadow-purple-500/20">
              <div className="w-full h-full bg-[#0a0e27] rounded-[28px] md:rounded-[32px] overflow-hidden relative">
                {/* Status Bar */}
                <div className="flex items-center justify-between px-5 md:px-6 py-2">
                  <span className="text-white text-[10px] md:text-xs">9:41</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-3.5 md:w-4 h-1.5 md:h-2 bg-white/60 rounded-sm" />
                    <div className="w-2.5 md:w-3 h-1.5 md:h-2 bg-white/60 rounded-sm" />
                    <div className="w-5 md:w-6 h-2.5 md:h-3 border border-white/60 rounded-sm"><div className="w-3 md:w-4 h-full bg-green-500 rounded-sm m-[1px]" /></div>
                  </div>
                </div>

                {/* App Content */}
                <div className="px-3.5 md:px-4 pt-3 md:pt-4">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center"><span className="text-white font-bold text-xs md:text-sm">V</span></div>
                    <span className="text-white font-semibold text-sm md:text-base">VERSE</span>
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10" />
                  </div>

                  <div className="glass p-3 md:p-4 rounded-xl md:rounded-2xl mb-3 md:mb-4">
                    <p className="text-gray-400 text-[10px] md:text-xs mb-1">Total Balance</p>
                    <p className="text-white text-xl md:text-2xl font-bold">$12,847.50</p>
                    <p className="text-green-400 text-[10px] md:text-xs mt-1">+5.2% this week</p>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 md:gap-2 mb-3 md:mb-4">
                    {['Send', 'Receive', 'Swap', 'Stake'].map((action) => (
                      <div key={action} className="text-center">
                        <div className="w-8 h-8 md:w-10 md:h-10 mx-auto rounded-lg md:rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-0.5 md:mb-1"><div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-purple-500/50" /></div>
                        <span className="text-white text-[9px] md:text-[10px]">{action}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5 md:space-y-2">
                    {[
                      { name: 'VERSE', price: '$0.45', change: '+12.5%', color: 'from-purple-500 to-blue-500' },
                      { name: 'ETH', price: '$3,245', change: '+2.1%', color: 'from-blue-500 to-cyan-500' },
                      { name: 'BTC', price: '$67,890', change: '+0.8%', color: 'from-orange-500 to-yellow-500' },
                    ].map((token) => (
                      <div key={token.name} className="flex items-center justify-between p-2.5 md:p-3 rounded-lg md:rounded-xl bg-white/5">
                        <div className="flex items-center space-x-2 md:space-x-3">
                          <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r ${token.color}`} />
                          <div><p className="text-white text-xs md:text-sm font-medium">{token.name}</p><p className="text-gray-400 text-[10px] md:text-xs">{token.price}</p></div>
                        </div>
                        <span className="text-green-400 text-[10px] md:text-xs">{token.change}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Nav */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around py-2.5 md:py-3 bg-[#0a0e27]/80 backdrop-blur">
                  {['Home', 'Explore', 'Wallet', 'Profile'].map((tab) => (
                    <div key={tab} className="text-center">
                      <div className={`w-4 h-4 md:w-5 md:h-5 mx-auto rounded-full ${tab === 'Home' ? 'bg-purple-500' : 'bg-white/20'}`} />
                      <span className={`text-[8px] md:text-[9px] ${tab === 'Home' ? 'text-purple-400' : 'text-gray-500'}`}>{tab}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -inset-3 md:-inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-[44px] md:rounded-[50px] blur-3xl -z-10" />
          </div>
        </motion.div>

        {/* Download buttons - Bitcoin.com Wallet */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          <a href="https://apps.apple.com/app/bitcoin-com-wallet-bitcoin/id1252903728" target="_blank" rel="noopener noreferrer"
            className="flex items-center space-x-2 px-5 md:px-6 py-2.5 md:py-3 glass rounded-xl text-white hover:bg-white/10 transition-all active:scale-95">
            <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 2.094a.396.396 0 0 0-.058-.005h-.005c-.13.003-.36.044-.647.133a5.11 5.11 0 0 0-.95.414c-.635.34-1.333.846-1.856 1.528-.526.687-.92 1.553-.9 2.522.018.057.046.11.074.155a.345.345 0 0 0 .152.134c.257.11.653.16 1.113.147a4.93 4.93 0 0 0 1.097-.17 5.07 5.07 0 0 0 .947-.376c.608-.316 1.273-.803 1.778-1.476.502-.67.88-1.512.863-2.452a.397.397 0 0 0-.116-.27.399.399 0 0 0-.278-.113l-.005.002h-.003zM12.07 6.16c-.793 0-1.357.26-1.82.598-.36.264-.666.61-.895.988-.28.458-.466.99-.528 1.486h-.002l-.003.015a5.36 5.36 0 0 0-.04.31c-.01.103-.015.185-.013.243-.002.267.043.47.113.635.075.178.185.32.318.433.128.108.284.19.46.25.165.055.352.088.565.098l.11.003h3.674c.037 0 .074-.002.11-.005a2.03 2.03 0 0 0 .538-.108c.16-.056.3-.132.42-.23a1.54 1.54 0 0 0 .327-.41c.088-.168.142-.366.152-.595a2.9 2.9 0 0 0-.037-.48 4.3 4.3 0 0 0-.19-.82 5.1 5.1 0 0 0-.387-.79c-.207-.343-.48-.66-.822-.92-.333-.253-.737-.44-1.22-.49a3.3 3.3 0 0 0-.395-.02l-.145.003zm-5.9 1.83c-.188 0-.38.015-.573.046-.56.09-1.13.36-1.625.818-.493.455-.895 1.1-1.103 1.883-.21.79-.203 1.69.044 2.53.236.803.67 1.53 1.228 2.052.557.52 1.22.83 1.87.87.33.02.638-.02.91-.113.272-.094.5-.24.688-.423.19-.186.334-.41.434-.655.1-.248.16-.515.187-.772a4.2 4.2 0 0 0 .034-.52c0-.155-.01-.303-.03-.44a3.6 3.6 0 0 0-.12-.51 5.3 5.3 0 0 0-.25-.63c-.137-.282-.32-.548-.56-.772a2.57 2.57 0 0 0-.762-.53 3.1 3.1 0 0 0-.952-.3 5.6 5.6 0 0 0-.59-.06l-.12-.004zm11.7 2.32c-.375 0-.765.05-1.15.157-.76.214-1.49.63-2.06 1.21-.57.58-1 1.31-1.25 2.11-.25.81-.3 1.66-.14 2.42.04.19.09.37.15.54.06.17.13.33.21.48.08.15.17.28.27.4.1.12.21.22.33.3.12.09.25.15.39.2.14.05.29.08.44.09.15.01.31.01.47-.01.16-.02.31-.05.45-.1.14-.05.27-.12.39-.21a1.9 1.9 0 0 0 .32-.33c.09-.13.17-.28.23-.44.07-.16.12-.34.16-.52.04-.19.07-.39.08-.59.02-.21.02-.43.01-.64-.01-.21-.03-.42-.07-.61a2.8 2.8 0 0 0-.15-.53 4.2 4.2 0 0 0-.28-.55c-.14-.22-.32-.42-.54-.58a2.2 2.2 0 0 0-.7-.34 3.1 3.1 0 0 0-.82-.12l-.15-.003z" /></svg>
            <div className="text-left"><p className="text-[10px] text-gray-400">Download on the</p><p className="text-xs md:text-sm font-semibold">App Store</p></div>
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.bitcoin.mwallet" target="_blank" rel="noopener noreferrer"
            className="flex items-center space-x-2 px-5 md:px-6 py-2.5 md:py-3 glass rounded-xl text-white hover:bg-white/10 transition-all active:scale-95">
            <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 1.33-2.302 1.33-2.546-2.66 2.546 0zM5.864 2.658L16.801 9l-2.302 2.302L5.864 2.658z" /></svg>
            <div className="text-left"><p className="text-[10px] text-gray-400">Get it on</p><p className="text-xs md:text-sm font-semibold">Google Play</p></div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
