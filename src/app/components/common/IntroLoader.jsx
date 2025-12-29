"use client";

import { useEffect, useState } from "react";

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black pointer-events-none"
    >
      <video autoPlay muted playsInline className="w-[320px]">
        <source src="/loader.webm" type="video/webm" />
      </video>
    </div>
  );
}
