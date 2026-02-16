"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  FaVideo,
  FaFilm,
  FaPlay,
  FaGift,
  FaMusic,
  FaBook,
  FaHandshake,
  FaEye,
  FaClock,
  FaTimes,
  FaCalendarAlt,
  FaArrowRight,
  FaPlayCircle
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { supabase } from '@/lib/supabase';

export default function VideoGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching Images:', error);
      } else {
        setVideos(data || []);
      }
    };

    fetchImages();
  }, []);

  const videoCategories = [
    { id: 'all', name: 'All Videos', icon: <FaVideo /> },
    { id: 'festivals', name: 'Festival Highlights', icon: <FaGift /> },
    { id: 'kirtans', name: 'Kirtan Performances', icon: <FaMusic /> },
    { id: 'teachings', name: 'Teachings & Lectures', icon: <FaBook /> },
    { id: ' ', name: 'Community Outreach', icon: <FaHandshake /> }
  ];


  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(video => video.category === selectedCategory);

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
            Video Gallery
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Watch the divine moments, festivals, and spiritual teachings come alive through our videos
          </p>
        </motion.div>

        {/* Video Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {videoCategories.map((category, index) => (
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

        {/* Videos Grid */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/10 rounded-2xl shadow-2xl overflow-hidden border border-primary border-opacity-60 hover:border-primary hover:border-opacity-80 transition-all duration-300 group cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              {/* Video Thumbnail */}
              <div className="relative overflow-hidden">
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  allowFullScreen
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:scale-110 transition-transform duration-300">
                    <FaPlay />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm flex items-center gap-1">
                  <FaClock />
                  {video.duration}
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded-full font-semibold">
                  {videoCategories.find(cat => cat.id === video.category)?.name}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors duration-300">
                  {video.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {video.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <FaEye />
                      <span>{video.views}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt />
                      {video.date}
                    </span>
                  </div>
                  <span className="text-primary font-semibold flex items-center gap-1">
                    Watch Now <FaArrowRight />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Video Modal */}
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl overflow-hidden border border-primary border-opacity-60 shadow-2xl">
                {/* Video Player */}
                <div className="aspect-video">
                  <iframe
                    src={selectedVideo.videoUrl}
                    title={selectedVideo.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>

                {/* Video Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedVideo.title}</h3>
                  <p className="text-gray-600 mb-4">{selectedVideo.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <FaEye />
                        <span>{selectedVideo.views} views</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock />
                        {selectedVideo.duration}
                      </span>
                    </div>
                    <span className="text-primary flex items-center gap-1">
                      <FaCalendarAlt />
                      {selectedVideo.date}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary transition-all duration-300 shadow-lg"
              >
                <FaTimes />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <FaPlayCircle className="text-primary" />
              <span>HD Quality</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaVideo className="text-primary" />
              <span>Exclusive Content</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-primary" />
              <span>Regular Updates</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
