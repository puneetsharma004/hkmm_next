"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  FaCamera,
  FaPalette,
  FaImages,
  FaGift,
  FaUniversity,
  FaHandshake,
  FaBook,
  FaSearch,
  FaTimes,
  FaEye
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { FaSun } from "react-icons/fa6";
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
// import { RemoveScroll } from 'react-remove-scroll';

export default function PhotoGallery() {

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching Images:', error);
      } else {
        setPhotos(data || []);
      }
    };

    fetchImages();
  }, []);



  const categories = [
    { id: 'all', name: 'All Photos', icon: <FaImages /> },
    { id: 'festivals', name: 'Festivals & Celebrations', icon: <FaGift /> },
    { id: 'worship', name: 'Daily Worship & Aartis', icon: <span><FaSun /></span> },
    { id: 'architecture', name: 'Temple Architecture', icon: <FaUniversity /> },
    { id: 'community', name: 'Community Services', icon: <FaHandshake /> },
    { id: 'workshops', name: 'Workshops & Classes', icon: <FaBook /> }
  ];


  const filteredImages = selectedCategory === 'all'
    ? photos
    : photos.filter(image => image.category === selectedCategory);

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Light Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Photo Gallery
          </h2>
          <p className="text-gray-700text-lg max-w-3xl mx-auto">
            Explore the divine moments and sacred experiences captured through our lens
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg cursor-pointer ${selectedCategory === category.id
                  ? 'text-primary'
                  : 'bg-white/10 text-gray-700 border border-primary border-opacity-60 hover:border-primary hover:border-opacity-80'
                  }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={selectedCategory === category.id ? 'text-primary' : 'text-gray-700'}>{category.icon}</span>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Photos Grid */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border-2 border-primary border-opacity-60 group-hover:border-primary group-hover:border-opacity-80 transition-all duration-300">
                <Image
                  width={100} height={100}
                  src={image.src}
                  alt={image.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-sm mb-1">{image.title}</h3>
                    <p className="text-gray-300 text-xs mb-2">{image.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary text-xs font-semibold">{image.date}</span>
                      <div className="bg-primary text-white p-2 rounded-full shadow-lg">
                        <FaSearch className="text-xs" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                  {categories.find(cat => cat.id === image.category)?.name}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {selectedImage && (
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 overflow-hidden"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="max-w-4xl max-h-[90vh] relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
                  <h3 className="text-white font-bold text-xl mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-gray-300 mb-2">{selectedImage.description}</p>
                  <span className="text-primary font-semibold">{selectedImage.date}</span>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-300 flex items-center justify-center"
                >
                  <FaTimes />
                </button>
              </motion.div>
            </motion.div>
          </div>
        )}

        {/* Gallery Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <FaCamera className="text-primary" />
              <span>Professional Photography</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEye className="text-primary" />
              <span>High Resolution</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-primary" />
              <span>Updated Weekly</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
