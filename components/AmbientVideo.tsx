"use client";

import { useEffect, useRef } from "react";

interface AmbientVideoProps {
  src: string;
  poster?: string;
  className?: string;
  label: string;
}

/**
 * Silent looping background video. Plays only while on screen, and stays on
 * the poster frame for visitors who prefer reduced motion.
 */
export function AmbientVideo({ src, poster, className, label }: AmbientVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      disablePictureInPicture
    />
  );
}
