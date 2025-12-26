"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FaHandHoldingHeart } from "react-icons/fa";
import { GiByzantinTemple } from "react-icons/gi";
import ThemeToggle from "./ThemeToggle";
import clsx from "clsx";

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
      className={clsx(
        "sticky top-0 z-40 transition-all duration-300",
        isScrolled
          ? "shadow-xl backdrop-blur-md top-[.35rem]"
          : "bg-white/95 shadow-md"
      )}
      style={{
        marginLeft: isScrolled ? "1rem" : "0",
        marginRight: isScrolled ? "1rem" : "0",
        borderRadius: isScrolled ? "1rem" : "0"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.02 }}>
            <GiByzantinTemple className="text-[#003366] dark:text-white" />
            <motion.h1
              className="hidden md:block text-lg font-bold"
              style={{ fontFamily: "serif" }}
            >
              Marwar Mandir
            </motion.h1>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item, index) => {
              const isActive = isActivePage(item.href);
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={clsx(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                      {
                        "bg-[#FFD700] shadow-md": isActive,
                        "hover:shadow-sm": !isActive
                      }
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />

            <motion.button
              onClick={handleDonate}
              className="px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1"
              style={{
                background: "linear-gradient(135deg,#FFD700,#F4C430)",
                color: "#003366"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHandHoldingHeart />
              Donate
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden flex flex-col mt-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 rounded-lg bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </motion.header>
  );
}
