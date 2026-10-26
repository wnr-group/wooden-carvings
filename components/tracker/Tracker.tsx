"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TrackerLightbox, type LightboxState } from "@/components/tracker/TrackerLightbox";
import {
  getTrackerView,
  LOGISTICS_INDEX,
  REVIEW_INDEX,
  WHATSAPP_NUMBER,
  type TrackerStageView,
} from "@/components/tracker/trackerData";
import { formatDate } from "@/lib/format";
import type { Order } from "@/types/order";
import "@/components/tracker/tracker.css";

const STATE_LABEL = { completed: "Completed", current: "In progress", upcoming: "Not started" } as const;

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.08.8.83-3-.2-.31a8.2 8.2 0 1 1 6.93 3.83Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-1.98-1.22 7.4 7.4 0 0 1-1.37-1.7c-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05 0 1.2.88 2.37 1 2.54.12.16 1.73 2.64 4.2 3.7.59.26 1.05.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.14-1.17-.06-.1-.23-.17-.48-.29Z" />
    </svg>
  );
}

function CopyTracking({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly", "");
      area.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
      } catch {
        /* nothing more to try */
      }
      document.body.removeChild(area);
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button type="button" className="wt-btn wt-btn--copy" onClick={copy} aria-label="Copy tracking number">
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

export function Tracker({ order, onHelp }: { order: Order; onHelp: () => void }) {
  const rootRef = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const view = useMemo(() => getTrackerView(order), [order]);
  const { stages, focus, percent, statusLine, reference, productName } = view;

  // Fade-up on scroll, scoped to this section. Skipped for reduced motion.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("wt-ready");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("wt-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );
    root.querySelectorAll(".wt-reveal").forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      root.classList.remove("wt-ready");
    };
  }, [order.id]);

  const contactHref = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello, I have a question about order ${order.reference}.`)}`
    : undefined;

  function whatsAppAction(floating = false) {
    const cls = floating ? "wt-float-wa" : "wt-btn wt-btn--wa";
    const label = floating ? "Message us on WhatsApp" : undefined;
    const content = (
      <>
        <WhatsAppIcon />
        {!floating && "Message us on WhatsApp"}
      </>
    );
    return contactHref ? (
      <a className={cls} href={contactHref} target="_blank" rel="noreferrer" aria-label={label}>
        {content}
      </a>
    ) : (
      <button type="button" className={cls} onClick={onHelp} aria-label={label}>
        {content}
      </button>
    );
  }

  function openPhotos(stage: TrackerStageView, index: number) {
    setLightbox({ stage: stage.title, photos: stage.photos, index });
  }

  function stageBadge(s: TrackerStageView) {
    if (s.state === "upcoming" && s.index === LOGISTICS_INDEX && !order.shipment) return "Not dispatched";
    if (s.state === "upcoming" && s.index === REVIEW_INDEX) return "Share your feedback";
    return STATE_LABEL[s.state];
  }

  function stageExtras(s: TrackerStageView) {
    if (s.index === LOGISTICS_INDEX && s.state !== "upcoming" && order.shipment) {
      return (
        <dl className="wt-ship">
          <dt>Courier</dt>
          <dd>{order.shipment.courier}</dd>
          <dt>Tracking</dt>
          <dd>
            <span>{order.shipment.trackingRef}</span>
            <CopyTracking value={order.shipment.trackingRef} />
          </dd>
        </dl>
      );
    }
    if (s.index === REVIEW_INDEX) {
      return (
        <div className="wt-extra">
          <p>We&apos;d love to hear about your experience with your piece.</p>
          <button type="button" className="wt-btn wt-btn--review" onClick={onHelp}>
            Write a review ↗
          </button>
        </div>
      );
    }
    return null;
  }

  function thumbs(s: TrackerStageView) {
    if (s.state === "upcoming" || s.photos.length === 0) return null;
    return (
      <ul className="wt-tl-photos" aria-label={`Photos from stage ${s.index + 1}`}>
        {s.photos.map((p, i) => (
          <li key={p.src}>
            <button
              type="button"
              className="wt-tl-photo"
              onClick={() => openPhotos(s, i)}
              aria-label={`View larger: photo ${i + 1} of ${s.photos.length}, ${s.title}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt="" loading="lazy" decoding="async" />
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section
      ref={rootRef}
      id="status"
      aria-labelledby="wt-title"
      className="wt-tracker"
    >
      <div className="wt-inner" key={order.id}>
        {/* ---------- Title + overall status ---------- */}
        <h1 id="wt-title" className="wt-title">
          {productName}
        </h1>

        <section className="wt-status wt-reveal" aria-label="Overall production status">
          <div className="wt-status-top">
            <p className="wt-label">Overall production status</p>
            <h2 className="wt-status-line">{statusLine}</h2>
          </div>
          <div
            className="wt-meter"
            role="progressbar"
            aria-label="Production progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
          >
            <span className="wt-meter-fill" style={{ width: `${percent}%` }} />
          </div>
          <p className="wt-progress-text">{percent}% of production complete</p>
        </section>

        {/* ---------- Reference images ---------- */}
        {reference.length > 0 && (
          <section className="wt-refs wt-reveal" aria-labelledby="wt-ref-title">
            <h2 id="wt-ref-title" className="wt-h2">
              Your Reference Images
            </h2>
            <p className="wt-lede">The photos you shared with us — our artisans are carving your piece from these.</p>
            <ul className="wt-pins">
              {reference.map((p, i) => (
                <li key={p.src} className="wt-pin">
                  <button
                    type="button"
                    onClick={() => setLightbox({ stage: "Reference images", photos: reference, index: i })}
                    aria-label={`View larger: ${p.alt}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.src} alt={p.alt} loading="lazy" decoding="async" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ---------- Journey: vertical timeline ---------- */}
        <section className="wt-tl wt-reveal" aria-labelledby="wt-tl-title">
          <h2 id="wt-tl-title" className="wt-tl-title">
            Production Journey
          </h2>

          <div className="wt-tl-now">
            <p className="wt-tl-now-label">Current update</p>
            <div className="wt-tl-now-head">
              <h3 className="wt-tl-now-title">
                Stage {focus.index + 1} — {focus.title}
              </h3>
              <span className={`wt-tl-pill wt-tl-pill--${focus.state}`}>{stageBadge(focus)}</span>
            </div>
            {focus.timestamp && (
              <p className="wt-tl-date">
                Updated <time dateTime={focus.timestamp}>{formatDate(focus.timestamp)}</time>
              </p>
            )}
            {thumbs(focus)}
          </div>

          <ol className="wt-tl-list">
            {stages.map((s) => (
              <li key={s.index} className={`wt-tl-item wt-tl-item--${s.state}`}>
                <span className={`wt-tl-dot wt-tl-dot--${s.state}`} aria-hidden="true">
                  {s.state === "completed" ? "✓" : s.state === "current" ? s.index + 1 : "○"}
                </span>
                <div className="wt-tl-card">
                  <div className="wt-tl-head">
                    <h3 className="wt-tl-name">
                      Stage {s.index + 1} — {s.title}
                    </h3>
                    <span className={`wt-tl-pill wt-tl-pill--${s.state}`}>{stageBadge(s)}</span>
                  </div>
                  {s.timestamp && s.state !== "upcoming" && (
                    <p className="wt-tl-date">
                      Updated <time dateTime={s.timestamp}>{formatDate(s.timestamp)}</time>
                    </p>
                  )}
                  {thumbs(s)}
                  {stageExtras(s)}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Help ---------- */}
        <section className="wt-help wt-reveal" aria-labelledby="wt-help-title">
          <div>
            <h2 id="wt-help-title" className="wt-h2 wt-h2--light">
              Questions about your piece?
            </h2>
            <p>We&apos;re happy to help.</p>
          </div>
          {whatsAppAction()}
        </section>
      </div>

      {whatsAppAction(true)}

      {lightbox && (
        <TrackerLightbox
          state={lightbox}
          onChange={(index) => setLightbox({ ...lightbox, index })}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
