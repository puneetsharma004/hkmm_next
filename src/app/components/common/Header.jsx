"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { FaHandHoldingHeart } from "react-icons/fa";
import clsx from "clsx";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // ✅ SSR safety guard
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { name: "Donations", href: "/donations" },
    { name: "Visit", href: "/visitor-info" },
    { name: "Contact", href: "/contact" }
  ];

  const isActivePage = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleDonate = () => {
    router.push("/donations#donation-form");
  };

  return (
 <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'shadow-xl backdrop-blur-md top-[.35rem]' 
          : 'bg-white/95 shadow-md'
      }`}
      style={{ 
        marginRight: isScrolled ? '1rem' : '0',
        marginLeft: isScrolled ? '1rem' : '0',
        marginRight: isScrolled ? '1rem' : '0',
        borderRadius: isScrolled ? '1rem' : '0', // Rounded only when scrolled
        boxShadow: isScrolled
          ? '0 8px 20px rgba(0,0,0,0.2)'
          : '0 2px 4px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-[1000]"
        style={{
        transition: 'padding 0.3s ease',
        paddingLeft: isScrolled ? '2rem' : '1rem',
        paddingRight: isScrolled ? '2rem' : '1rem'
      }}
      >
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Title */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div 
              className="w-30 h-20 rounded-full flex items-center justify-center"
            >
              <Image src={"/icons/hkmmLogo.svg"} width={400} height={100} alt="HKMM Logo" />
            </div>
            <div>
              <motion.h1 
                className={`text-lg font-bold transition-colors duration-300 hidden md:block${
                  isScrolled?"text-white": "#003366"
                }`}
                style={{ 
                  color: isScrolled?"text-white": "#003366",
                  fontFamily: 'serif'
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Marwar Mandir
              </motion.h1>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item, index) => {
              const isActive = isActivePage(item.href);
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  // Using clsx
                  className={clsx(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 outline-none',
                    {
                      'shadow-md text-white': isActive,
                      'hover:shadow-sm': !isActive,
                      'text-[#003366]': isScrolled,
                      'text-[#003366]': !isScrolled
                    }
                  )}
                  style={{
                    backgroundColor: isActive ? '#AF1E2E' : 'transparent',
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
                {/* <ThemeToggle/> */}
            {/* Donate Button */}
            <motion.button 
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-1 outline-none cursor-pointer"
              style={{ 
                background: 'linear-gradient(135deg, #AF1E2E  0%, #db3c4f   100%)',
                color: '#ffffff'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ 
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDonate}
            >
              <span className="text-xs"><FaHandHoldingHeart /></span>
              <span>Donate</span>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors duration-200 outline-none"
              style={{ color: isScrolled ? '#AF1E2E' : '#AF1E2E' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </motion.svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div 
          className="md:hidden overflow-hidden"
          initial={false}
          animate={{ 
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <nav className="flex flex-col space-y-1 pt-3 pb-4 border-t" 
               style={{ borderColor: isScrolled ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 51, 102, 0.2)' }}>
            {navigationItems.map((item, index) => {
              const isActive = isActivePage(item.href);
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={clsx(`px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 outline-none`,
                    {
                      'shadow-md text-[#FFFFFF]': isActive,
                      'hover:shadow-sm': !isActive,
                      'text-[#003366]': isScrolled,
                      'text-[#003366]': !isScrolled
                    })
                  }
                  style={{
                    backgroundColor: isActive ? '#AF1E2E' : 'transparent',
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  whileHover={{ 
                    x: 5,
                    backgroundColor: isActive ? '#AF1E2E' : (isScrolled ? 'rgba(255, 255, 255, 0.1)' : '#AF1E2E'),
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                  
                </motion.a>
              );
            })}
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
}
