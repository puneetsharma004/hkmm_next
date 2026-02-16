"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  FaBullseye, 
  FaChartLine, 
  FaTools, 
  FaBolt, 
  FaPlay, 
  FaExclamationTriangle, 
  FaUsers, 
  FaCalendarAlt, 
  FaRupeeSign, 
  FaHeart,
  FaBook,
  FaUtensils,
  FaChevronDown,
  FaChevronUp,
  FaTimes
} from 'react-icons/fa';
import { GiCow, GiWaterDrop } from 'react-icons/gi';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export default function CurrentCampaigns() {
  const [showAllCampaigns, setShowAllCampaigns] = useState(false);
  const [displayedCampaigns] = useState(3); // Show 3 by default
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [campaigns, setCampaigns] = useState([]);

        useEffect(() => {
            const fetchCampaigns = async () => {
              const { data, error } = await supabase
                .from('campaigns')
                .select('*')
                .order('created_at', { ascending: true });

              if (error) {
                console.error('Error fetching campaigns:', error);
              } else {
                setCampaigns(data || []);
              }
            };

            fetchCampaigns();
          }, []);


  // Helper functions
  const getProgressPercentage = (raised, target) => {
    return Math.min((raised / target) * 100, 100);
  };

  const formatAmount = (amount) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  // Scroll to donation form
  const scrollToDonationForm = () => {
    const donationForm = document.querySelector('#donation-form');
    if (donationForm) {
      donationForm.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback: scroll to a section with class name if ID doesn't exist
      const donationSection = document.querySelector('.donation-form, .donate-section');
      if (donationSection) {
        donationSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <section id="campaigns-section" className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50"></div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Current Campaigns
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Join our active fundraising campaigns and help us achieve these important spiritual and community goals
          </p>
        </motion.div>

        {/* Campaigns Grid */}
        <div className="space-y-8">
          {campaigns
            .slice(0, showAllCampaigns ? campaigns.length : displayedCampaigns)
            .map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 group ${
                  campaign.urgent 
                    ? 'bg-gradient-to-br from-red-100/90 to-orange-100/90 border-2 border-red-400 border-opacity-60 ' 
                    : 'bg-white/10 border-primary border-opacity-60 hover:border-primary hover:border-opacity-80'
                } backdrop-blur-xl`}
              >
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left: Image/Video */}
                  <div className="relative">
                    <Image
                      width={100} height={100}
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                    
                    
                    {/* Urgent Badge */}
                    {campaign.urgent && (
                      <motion.div
                        className="absolute top-4 left-4 bg-primary text-white font-bold px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow-lg z-10"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <FaExclamationTriangle />
                        URGENT
                      </motion.div>
                    )}

                    {/* Video Play Button */}
                    {campaign.video && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-100 transition-opacity duration-300">
                        <motion.button
                          className="w-16 h-16 bg-prmary rounded-full flex items-center justify-center text-white text-2xl shadow-lg"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setSelectedVideo(campaign.video);
                            setIsVideoModalOpen(true);
                          }}
                        >
                          <FaPlay />
                        </motion.button>
                      </div>
                    )}

                    {/* Progress Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4" >
                      <div className="text-white text-sm font-semibold mb-2 flex items-center gap-2">
                        <FaRupeeSign />
                        {formatAmount(campaign.raised)} raised of {formatAmount(campaign.target)} goal
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="bg-primary h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${getProgressPercentage(campaign.raised, campaign.target)}%` }}
                          transition={{ duration: 2, ease: "easeOut" }}
                          viewport={{ once: true }}
                        />
                      </div>
                      <div className="text-white text-xs mt-1 text-right">
                        {Math.round(getProgressPercentage(campaign.raised, campaign.target))}% completed
                      </div>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-800 transition-colors duration-300">
                        {campaign.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed transition-colors duration-300">
                      {campaign.description}
                    </p>

                    {/* Campaign Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-orange-100/20 rounded-lg border border-primary">
                        <div className="text-2xl font-bold text-primary">
                          {Math.round(getProgressPercentage(campaign.raised, campaign.target))}%
                        </div>
                        <div className="text-xs text-gray-600">Completed</div>
                      </div>
                      <div className="text-center p-3 bg-amber-100/80 rounded-lg border border-yellow-500/20">
                        <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                          <FaUsers className="text-lg" />
                          {campaign.donors}
                        </div>
                        <div className="text-xs text-gray-600">Donors</div>
                      </div>
                      <div className="text-center p-3 bg-green-100/80 rounded-lg border border-green-400/20">
                        <div className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                          {formatAmount(campaign.target - campaign.raised)}
                        </div>
                        <div className="text-xs text-gray-600">Remaining</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <motion.button
                        className={`flex-1 font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg outline-none cursor-pointer ${
                          campaign.urgent
                            ? 'bg-primary text-white hover:shadow-red-500/30'
                            : 'bg-gradient-to-r from-primary to-yellow-500 text-white hover:shadow-primary/30'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={scrollToDonationForm}
                      >
                        <FaHeart />
                        Contribute Now
                      </motion.button>
                      <motion.button
                        className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary transition-all duration-300 outline-none"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Learn More
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Video Modal */}
        {isVideoModalOpen && selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              className="relative bg-black rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh]"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-300"
                onClick={() => setIsVideoModalOpen(false)}
              >
                <FaTimes />
              </button>
              
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <video
                  src={selectedVideo}
                  controls
                  autoPlay
                  className="absolute top-0 left-0 w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-orange-100/80 to-amber-100/80 rounded-2xl p-8 border border-primary/40 shadow-lg max-w-4xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Make a Difference Today</h3>
            <p className="text-gray-700 text-lg mb-6">
              Every contribution, no matter the size, helps us serve the community better and preserve our spiritual heritage. Join hands with us in these noble causes.
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <FaHeart className="text-primary" />
                <span>Tax Benefits Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaUsers className="text-yellow-500" />
                <span>Join 500+ Donors</span>
              </div>
            </div>
          </div>
          
          {/* Dynamic View All Button - Only show if more than 3 campaigns */}
          {campaigns.length > 3 && (
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {!showAllCampaigns ? (
                <motion.button
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-3 mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={async () => {
                    setLoadingMore(true);
                    await new Promise(resolve => setTimeout(resolve, 500));
                    setShowAllCampaigns(true);
                    setLoadingMore(false);
                  }}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      View All Active Campaigns ({campaigns.length})
                      <FaChevronDown className="text-sm" />
                    </>
                  )}
                </motion.button>
              ) : (
                <motion.button
                  className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-3 mx-auto outline-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowAllCampaigns(false);
                    document.querySelector('#campaigns-section')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }}
                >
                  Show Less
                  <FaChevronUp className="text-sm" />
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
