"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, type KeyboardEvent, type MouseEvent, type TouchEvent } from "react";
import type { TrackerPhoto } from "@/components/tracker/trackerData";

export interface LightboxState {
  stage: string;
  photos: TrackerPhoto[];
  index: number;
}

interface TrackerLightboxProps {
  state: LightboxState;
  onChange: (index: number) => void;
  onClose: () => void;
}

/** Native modal <dialog>: focus is trapped and Esc is handled by the browser. */
export function TrackerLightbox({ state, onChange, onClose }: TrackerLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const { photos, index, stage } = state;
  const photo = photos[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, []);

  function go(delta: number) {
    onChange((index + delta + photos.length) % photos.length);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDialogElement>) {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
  }

  function onBackdropClick(e: MouseEvent<HTMLElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  function onTouchEnd(e: TouchEvent<HTMLDivElement>) {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50 && photos.length > 1) go(dx < 0 ? 1 : -1);
  }

  return (
    <dialog
      ref={dialogRef}
      className="wt-lightbox"
      aria-label={`${stage} photos`}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onKeyDown={onKeyDown}
      onClick={onBackdropClick}
    >
      <div className="wt-lb-frame" onClick={onBackdropClick}>
        <div className="wt-lb-bar">
          <button type="button" className="wt-lb-btn" onClick={onClose} aria-label="Close photo viewer">
            <X />
          </button>
        </div>
        <div
          className="wt-lb-stage"
          onClick={onBackdropClick}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={onTouchEnd}
        >
          {photos.length > 1 && (
            <button type="button" className="wt-lb-btn wt-lb-prev" onClick={() => go(-1)} aria-label="Previous photo">
              <ChevronLeft />
            </button>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo.src} alt={photo.alt} />
          {photos.length > 1 && (
            <button type="button" className="wt-lb-btn wt-lb-next" onClick={() => go(1)} aria-label="Next photo">
              <ChevronRight />
            </button>
          )}
        </div>
        <p className="wt-lb-caption" aria-live="polite">
          {stage} · photo {index + 1} of {photos.length}
        </p>
      </div>
    </dialog>
  );
}
