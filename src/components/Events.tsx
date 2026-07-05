'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Loader2 } from 'lucide-react';

interface EventItem { title: string; url: string; date: string; excerpt: string; }

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then(r => r.json())
      .then(data => {
        // Filter for event/conference related articles
        const items = (data.items || [])
          .filter((i: any) => {
            const t = (i.title + ' ' + i.description).toLowerCase();
            return t.includes('event') || t.includes('conference') || t.includes('hackathon') || t.includes('summit') || t.includes('workshop') || t.includes('token2049') || t.includes('ethglobal');
          })
          .slice(0, 6);
        setEvents(items.length > 0 ? items : (data.items || []).slice(0, 4));
      })
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="events" className="relative py-20 md:py-32 overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0a0e27] via-[#0d1130] to-[#0a0e27]" />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">VERSE <span className="gradient-text">Events</span></h2>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto">Latest events and conferences from the Bitcoin.com ecosystem</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center"><Loader2 className="w-8 h-8 text-purple-400 animate-spin" /></div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
            {events.map((ev, i) => (
              <motion.a key={i} href={ev.url} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }} className="group block">
                <div className="glass p-5 md:p-6 rounded-xl md:rounded-2xl h-full hover:border-green-500/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">Bitcoin.com</span>
                    {ev.date && <span className="text-xs text-gray-500">{new Date(ev.date).toLocaleDateString()}</span>}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-300 transition-colors">{ev.title}</h3>
                  {ev.excerpt && <p className="text-sm text-gray-400 mb-4 line-clamp-2">{ev.excerpt}</p>}
                  <div className="flex items-center text-green-400 text-sm">
                    <span>View Source</span><ExternalLink className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="glass p-8 rounded-2xl text-center">
            <Calendar className="w-8 h-8 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400 text-sm mb-4">No events found right now. Check Bitcoin.com for the latest.</p>
            <a href="https://www.bitcoin.com/conferences/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-white font-semibold text-sm hover:shadow-lg transition-all">
              <span>Bitcoin.com Conferences</span><ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Always show conferences link */}
        <div className="text-center mt-8">
          <a href="https://www.bitcoin.com/conferences/" target="_blank" rel="noopener noreferrer"
            className="text-sm text-purple-400 hover:text-purple-300 underline">
            View all Bitcoin.com Conferences →
          </a>
        </div>
      </div>
    </section>
  );
}
