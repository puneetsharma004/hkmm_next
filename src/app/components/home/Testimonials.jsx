"use client";

import { motion } from 'framer-motion';
import { BiSolidQuoteLeft } from "react-icons/bi";
import { BiSolidQuoteRight } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from 'next/image';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Ramesh Kumar',
      location: 'Jodhpur, Rajasthan',
      quote: 'Visiting Hare Krishna Marwar Mandir has completely transformed my life. The serene atmosphere and the teachings of Lord Krishna inspire me every day to live with love, compassion, and devotion.',
      img: '/images/srila-prabhupada-hkm.webp',
      rating: 5,
      role: 'Regular Devotee'
    },
    {
      name: 'Meera Sharma',
      location: 'Mumbai, Maharashtra',
      quote: 'The Bhagavad Gita sessions here are enlightening. I feel spiritually nourished and find practical guidance for facing life’s challenges with clarity and peace',
      img: '/images/srila-prabhupada-hkm.webp',
      rating: 5,
      role: 'Visiting Devotee'
    },
    {
      name: 'Arjun Patel',
      location: 'Ahmedabad, Gujarat',
      quote: 'Participating in Annadana Seva has taught me the joy of selfless service. Feeding others with prasadam brings immense happiness and a sense of connection to Lord Krishna.',
      img: '/images/srila-prabhupada-hkm.webp',
      rating: 5,
      role: 'Temple Volunteer'
    },
    {
      name: 'Priya Agarwal',
      location: 'Delhi, India',
      quote: 'Hare Krishna Marwar Mandir is more than a temple; it’s a spiritual home. The youth programs here helped me develop skills while staying grounded in Krishna Consciousness.',
      img: '/images/srila-prabhupada-hkm.webp',
      rating: 5,
      role: 'Temple Patron'
    }
  ];

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-primary">


      <div className="relative max-w-6xl mx-auto z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            What Devotees Say
          </h3>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Hear from our beloved devotees about their spiritual journey with us
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 }
          }}
          className="pb-60"
        >
          {testimonials.map((testimonial, i) => (
            <SwiperSlide key={i}>
              <div
                className="
                    p-8 rounded-2xl 
                    bg-white/20 
                    border border-white/30 
                    backdrop-blur-xl 
                    transition-all duration-300 
                    hover:-translate-y-1 
                    hover:bg-white/30
                    hover:border-primary/60"
              >
                {/* Quote */}
                <div className="relative mb-6">
                  <div className="absolute -top-4 -left-6 text-2xl text-primary opacity-50">
                    <BiSolidQuoteLeft />
                  </div>
                  <div className="absolute -bottom-4 -right-2 text-2xl text-primary opacity-50">
                    <BiSolidQuoteRight />
                  </div>
                  <p className="text-gray-700 text-lg italic leading-relaxed relative z-10">
                    {testimonial.quote}
                  </p>
                </div>

                {/* Devotee Info */}
                <div className="flex items-center space-x-4 ">
                  <Image
                    src={testimonial.img}
                    alt={testimonial.name}
                    width={100}
                    height={100}
                    className="w-16 h-16 rounded-full border-4 border-primary shadow-lg"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-primary text-sm font-medium">
                      {testimonial.role}
                    </p>
                    <p className="text-gray-600 text-xs">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
