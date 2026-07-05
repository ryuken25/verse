'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Trophy, ArrowRight, Clock } from 'lucide-react';

const events = [
  { name: 'VERSE Hackathon 2024', desc: 'Build innovative dApps on the VERSE ecosystem.', date: 'Dec 15-17, 2024', location: 'Online', participants: '500+', prize: '$50,000', status: 'Upcoming', category: 'Hackathon' },
  { name: 'DeFi Summit', desc: 'Deep dive into DeFi protocols and yield strategies.', date: 'Jan 20, 2025', location: 'Hybrid (NYC + Online)', participants: '1,000+', prize: '$10,000', status: 'Upcoming', category: 'Conference' },
  { name: 'NFT Art Contest', desc: 'Create stunning digital art for the VERSE community.', date: 'Feb 5, 2025', location: 'Online', participants: '200+', prize: '$5,000', status: 'Upcoming', category: 'Contest' },
  { name: 'Web3 Workshop', desc: 'Weekly workshops on Solidity, React, and Web3.', date: 'Every Saturday', location: 'Discord', participants: '100+/session', prize: 'NFT Certificates', status: 'Ongoing', category: 'Workshop' },
];

export default function Events() {
  return (
    <section id="events" className="relative py-20 md:py-32 overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0a0e27] via-[#0d1130] to-[#0a0e27]" />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">VERSE <span className="gradient-text">Events</span></h2>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto">Join hackathons, workshops, and community events. Learn, compete, and earn rewards.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
          {events.map((event, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -5 }} className="group">
              <div className="glass p-5 md:p-6 rounded-xl md:rounded-2xl h-full hover:border-green-500/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">{event.category}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${event.status === 'Ongoing' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{event.status}</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{event.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{event.desc}</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
                  <div className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {event.date}</div>
                  <div className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {event.location}</div>
                  <div className="flex items-center"><Users className="w-3 h-3 mr-1" /> {event.participants}</div>
                  <div className="flex items-center"><Trophy className="w-3 h-3 mr-1 text-yellow-400" /> {event.prize}</div>
                </div>
                <button type="button" className="w-full py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg text-white text-sm font-medium flex items-center justify-center space-x-2 group-hover:shadow-lg group-hover:shadow-green-500/20 transition-all active:scale-95">
                  <span>Register Now</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
