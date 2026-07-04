'use client';

import { motion } from 'framer-motion';
import { BookOpen, Award, Clock, Users, ArrowRight, CheckCircle } from 'lucide-react';

const courses = [
  {
    title: 'Introduction to Web3',
    description: 'Learn the fundamentals of blockchain, crypto, and decentralized applications',
    duration: '4 weeks',
    level: 'Beginner',
    students: '10K+',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    title: 'Smart Contract Development',
    description: 'Master Solidity and build your first smart contracts on Ethereum',
    duration: '6 weeks',
    level: 'Intermediate',
    students: '5K+',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'DeFi Protocols Deep Dive',
    description: 'Understand lending, borrowing, and yield farming strategies',
    duration: '8 weeks',
    level: 'Advanced',
    students: '3K+',
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'NFT Development',
    description: 'Create, deploy, and market your own NFT collections',
    duration: '5 weeks',
    level: 'Intermediate',
    students: '8K+',
    color: 'from-pink-500 to-rose-500',
  },
];

const benefits = [
  'Earn NFT certificates upon completion',
  'Access to exclusive community channels',
  'Hands-on projects with real-world applications',
  'Mentorship from industry experts',
  'Job placement assistance',
  'Lifetime access to course materials',
];

export default function Learn() {
  return (
    <section id="learn" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27] via-[#0d1130] to-[#0a0e27]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Learn & <span className="gradient-text">Earn</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Master Web3 skills with our comprehensive courses and earn NFT certificates
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="glass p-8 rounded-2xl h-full hover:border-purple-500/30 transition-all duration-500">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${course.color} flex items-center justify-center mb-6`}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{course.title}</h3>
                <p className="text-gray-400 mb-6">{course.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {course.duration}</span>
                  <span className="flex items-center"><Award className="w-4 h-4 mr-1" /> {course.level}</span>
                  <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> {course.students}</span>
                </div>
                <div className="mt-6 flex items-center text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Enroll now</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-12 rounded-3xl"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Why Learn with VERSE?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
