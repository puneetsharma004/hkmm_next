"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const INACTIVITY_TIME = 10 * 60 * 1000; // 10 minutes
const LOADER_DURATION = 2000; // 2 seconds

export default function Loader() {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const now = Date.now();

    const hasVisited = sessionStorage.getItem("hasVisited");
    const lastActivity = localStorage.getItem("lastActivity");

    const inactiveTooLong =
      lastActivity && now - parseInt(lastActivity, 10) > INACTIVITY_TIME;

    // Decide whether to show loader
    if (!hasVisited || inactiveTooLong) {
      setShowLoader(true);
      sessionStorage.setItem("hasVisited", "true");

      setTimeout(() => {
        setShowLoader(false);
      }, LOADER_DURATION);
    }

    // Track user activity
    const updateActivity = () => {
      localStorage.setItem("lastActivity", Date.now().toString());
    };

    ["click", "scroll", "mousemove", "keydown"].forEach((event) =>
      window.addEventListener(event, updateActivity, { passive: true })
    );

    updateActivity();

    return () => {
      ["click", "scroll", "mousemove", "keydown"].forEach((event) =>
        window.removeEventListener(event, updateActivity)
      );
    };
  }, []);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-[400px]"
          >
            <source src="/loader.webm" type="video/webm" />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
