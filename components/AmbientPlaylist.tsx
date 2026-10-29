"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface AmbientPlaylistProps {
  sources: string[];
  className?: string;
  label: string;
}

/**
 * Silent background videos played one after another, looping through the list.
 * Two stacked <video> layers: while one plays, the other preloads the next clip,
 * then they crossfade. Plays only while on screen; stays on a still frame for
 * visitors who prefer reduced motion.
 */
export function AmbientPlaylist({ sources, className, label }: AmbientPlaylistProps) {
  const videos = useRef<(HTMLVideoElement | null)[]>([null, null]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [front, setFront] = useState<0 | 1>(0);
  const [index, setIndex] = useState(0);
  const visible = useRef(false);
  const reduced = useRef(false);
  const count = sources.length;

  const srcFor = (layer: 0 | 1) => sources[layer === front ? index : (index + 1) % count];

  // Play whichever layer is in front, from the start, when it takes over.
  useEffect(() => {
    const video = videos.current[front];
    if (!video || reduced.current || !visible.current) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  }, [front, index]);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        const video = videos.current[front];
        if (!video || reduced.current) return;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [front]);

  function handleEnded(layer: 0 | 1) {
    if (layer !== front || count < 2) {
      if (count < 2) videos.current[layer]?.play().catch(() => {});
      return;
    }
    setFront((f) => (f === 0 ? 1 : 0));
    setIndex((i) => (i + 1) % count);
  }

  return (
    <div ref={wrapRef} className={cn("relative", className)} role="img" aria-label={label}>
      {([0, 1] as const).map((layer) => (
        <video
          key={layer}
          ref={(el) => {
            videos.current[layer] = el;
          }}
          src={srcFor(layer)}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          onEnded={() => handleEnded(layer)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out",
            front === layer ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
    </div>
  );
}
