"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  FaGem,
  FaSun,
  FaHandPaper,
} from 'react-icons/fa';


export default function TempleArchitecture() {

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Light Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 "></div>

      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-primary/30 to-orange-400/30 rounded-full opacity-40 blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Temple Architecture
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            A magnificent blend of traditional Marwar architecture and sacred temple design
          </p>
        </motion.div>

        {/* Main Description */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/10 rounded-2xl shadow-2xl p-8 border border-primary border-opacity-60 backdrop-blur-xl mb-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">Architectural Heritage</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Our temple stands as a testament to the rich architectural heritage of Rajasthan, seamlessly blending traditional Marwar design principles with sacred Vedic temple architecture.
                </p>
                <p>
                  The structure incorporates the distinctive blue hues of Jodhpur, earning its place as a spiritual jewel in the Blue City. Intricate stone carvings, traditional jharokhas (overhanging enclosed balconies), and ornate domes create a visual symphony that reflects both devotion and cultural pride.
                </p>
                <p>
                  Recent renovations have preserved the original charm while incorporating modern amenities for the comfort of devotees, ensuring our temple remains a bridge between ancient wisdom and contemporary accessibility.
                </p>
              </div>
            </div>
            <div className="text-center flex flex-col justify-center items-center ">
              <Image width={100} height={100} className='w-full lg:w-[60%] h-auto rounded-2xl shadow-xl' src="/images/about/TempleArchitecture.jpg" alt="Temple Architecture" />
              <p className="text-gray-600 italic mt-4">
                "Where ancient artistry meets divine inspiration"
              </p>
            </div>
          </div>
        </motion.div>

        {/* Special Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 bg-primary/10 rounded-2xl p-8 border border-primary/40 border-opacity-60 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8 text-primary">Special Architectural Elements</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <FaHandPaper />, title: 'Hand-Carved Details', desc: 'Intricate stone work by master craftsmen' },
              { icon: <FaGem />, title: 'Sacred Geometry', desc: 'Vedic proportions for spiritual harmony' },
              { icon: <FaSun />, title: 'Natural Lighting', desc: 'Strategic placement for divine illumination' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-4xl flex justify-center items-center mb-3 text-primary group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h4 className="font-bold text-primary mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Architectural Heritage Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-white/10 rounded-2xl p-8 border border-primary border-opacity-60 backdrop-blur-sm max-w-4xl mx-auto shadow-xl">
            <p className="text-gray-700 text-lg italic">
              "Every stone speaks of devotion, every arch echoes with prayers, and every dome reaches toward the divine - our temple is not just built with materials, but with the faith and love of countless devotees." <br /> - Srila Prabhupada
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
