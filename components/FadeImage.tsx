"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * next/image that fades in once loaded. Put it inside a container with the
 * `skeleton` class and the shimmer shows until the photograph arrives.
 */
export function FadeImage({ className, onLoad, alt, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      alt={alt}
      ref={(el) => {
        // Cached images can finish before hydration, so onLoad never fires for them.
        if (el?.complete && el.naturalWidth > 0) setLoaded(true);
      }}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      className={cn("transition-opacity duration-700 ease-out", loaded ? "opacity-100" : "opacity-0", className)}
    />
  );
}
