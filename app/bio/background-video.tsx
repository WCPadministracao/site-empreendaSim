"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const respectMotionPreference = () => {
      if (reducedMotion.matches) {
        video.pause();
      } else {
        void video.play().catch(() => {});
      }
    };

    respectMotionPreference();
    reducedMotion.addEventListener("change", respectMotionPreference);
    return () => reducedMotion.removeEventListener("change", respectMotionPreference);
  }, []);

  return (
    <video
      ref={videoRef}
      className={styles.backgroundVideo}
      src="/bio/empreenda-sim-fundo.mp4"
      poster="/bio/empreenda-sim-palco.webp"
      preload="none"
      muted
      playsInline
      loop
      aria-hidden="true"
    />
  );
}
