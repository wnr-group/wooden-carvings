"use client";

import { Fraunces, Work_Sans } from "next/font/google";
import { useEffect, useMemo, useRef, useState } from "react";
import { TrackerLightbox, type LightboxState } from "@/components/tracker/TrackerLightbox";
import {
  getTrackerView,
  LOGISTICS_INDEX,
  REVIEW_INDEX,
  WHATSAPP_NUMBER,
  type TrackerPhoto,
  type TrackerStageView,
} from "@/components/tracker/trackerData";
import { formatDate } from "@/lib/format";
import type { Order } from "@/types/order";
import "@/components/tracker/tracker.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--wt-fraunces", display: "swap" });
const workSans = Work_Sans({ subsets: ["latin"], variable: "--wt-worksans", display: "swap" });

const BADGE_LABEL = { completed: "Completed", current: "In progress", upcoming: "Not started" } as const;

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

function Photos({
  photos,
  onOpen,
}: {
  photos: TrackerPhoto[];
  onOpen: (index: number) => void;
}) {
  if (photos.length === 0) return null;
  return (
    <div className="wt-photos">
      {photos.map((p, i) => (
        <button
          key={p.src + i}
          type="button"
          className="wt-thumb"
          onClick={() => onOpen(i)}
          aria-label={`View larger: ${p.alt}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.src} alt={p.alt} loading="lazy" decoding="async" />
        </button>
      ))}
    </div>
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

  function open(stage: string, photos: TrackerPhoto[], index: number) {
    setLightbox({ stage, photos, index });
  }

  function stageBadge(s: TrackerStageView, o: Order) {
    if (s.state === "upcoming" && s.index === LOGISTICS_INDEX && !o.shipment) return "Not dispatched";
    if (s.state === "upcoming" && s.index === REVIEW_INDEX) return "Share your feedback";
    return BADGE_LABEL[s.state];
  }

  function stageExtras(s: TrackerStageView) {
    if (s.index === LOGISTICS_INDEX) {
      const shipped = s.state !== "upcoming" && order.shipment;
      return shipped ? (
        <dl className="wt-ship">
          <dt>Courier</dt>
          <dd>{order.shipment!.courier}</dd>
          <dt>Tracking</dt>
          <dd>
            <span>{order.shipment!.trackingRef}</span>
            <CopyTracking value={order.shipment!.trackingRef} />
          </dd>
        </dl>
      ) : null;
    }
    if (s.index === REVIEW_INDEX) {
      return (
        <div className="wt-stage-body">
          <p>We&apos;d love to hear about your experience with your piece.</p>
          <button type="button" className="wt-btn wt-btn--review" onClick={onHelp}>
            Write a review ↗
          </button>
        </div>
      );
    }
    return null;
  }

  return (
    <section
      ref={rootRef}
      id="status"
      aria-labelledby="wt-title"
      className={`wt-tracker ${fraunces.variable} ${workSans.variable}`}
    >
      <div className="wt-inner" key={order.id}>
        <header className="wt-reveal">
          <span className="wt-pill">Order update</span>
          <h1 id="wt-title" className="wt-title">
            {productName}
          </h1>
        </header>

        <div className="wt-card wt-card--hero wt-reveal">
          <div className="wt-hero-row">
            <p className="wt-label">Overall production status</p>
            <p className="wt-status-line">{statusLine}</p>
          </div>
          <div
            className="wt-progress"
            role="progressbar"
            aria-label="Production progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
          >
            <div className="wt-progress-fill" style={{ width: `${percent}%` }} />
          </div>
          <p className="wt-progress-text">
            <strong>{percent}%</strong> of production complete
          </p>
        </div>

        {reference.length > 0 && (
          <section className="wt-card wt-card--ref wt-reveal" aria-labelledby="wt-ref-title">
            <h2 id="wt-ref-title" className="wt-h2">
              Your Reference Images
            </h2>
            <Photos photos={reference} onOpen={(i) => open("Reference images", reference, i)} />
            <p className="wt-caption">
              The photos you shared with us — our artisans are carving your piece from these.
            </p>
          </section>
        )}

        <section className="wt-card wt-card--current wt-reveal" aria-labelledby="wt-current-title">
          <div className="wt-card-head">
            <h2 id="wt-current-title" className="wt-h2">
              Current Update
            </h2>
            <span
              className={`wt-badge ${focus.state === "completed" ? "wt-badge--done" : "wt-badge--current"}`}
            >
              {BADGE_LABEL[focus.state]}
            </span>
          </div>
          <p className="wt-h3" style={{ marginTop: "0.6rem" }}>
            {focus.state === "completed" && <span aria-hidden="true">✓ </span>}
            Stage {focus.index + 1} — {focus.title}
          </p>
          {focus.timestamp && (
            <p className="wt-meta">
              Last updated on <time dateTime={focus.timestamp}>{formatDate(focus.timestamp)}</time>
            </p>
          )}
          {focus.photos.length > 0 && (
            <>
              <p className="wt-label" style={{ marginTop: "0.9rem" }}>
                Current photos
              </p>
              <Photos photos={focus.photos} onOpen={(i) => open(focus.title, focus.photos, i)} />
            </>
          )}
        </section>

        <section id="journey" aria-labelledby="wt-journey-title" className="wt-reveal">
          <h2 id="wt-journey-title" className="wt-h2 wt-h2--journey">
            Production Journey
          </h2>
          <ol className="wt-timeline" aria-label="Production stages">
            {stages.map((s) => (
              <li
                key={s.index}
                className={`wt-step wt-step--${s.state}`}
                aria-current={s.state === "current" ? "step" : undefined}
              >
                <span className={`wt-icon wt-icon--${s.state}`} aria-hidden="true">
                  {s.state === "completed" ? "✓" : s.state === "current" ? <span className="wt-icon-dot" /> : "○"}
                </span>
                <div className={`wt-stage wt-stage--${s.state}`}>
                  <div className="wt-stage-head">
                    <h3 className="wt-h3">
                      Stage {s.index + 1} — {s.title}
                    </h3>
                    <span
                      className={`wt-badge ${
                        s.state === "completed" ? "wt-badge--done" : s.state === "current" ? "wt-badge--current" : ""
                      }`}
                    >
                      {stageBadge(s, order)}
                    </span>
                  </div>
                  {s.timestamp && (
                    <p className="wt-meta">
                      Updated <time dateTime={s.timestamp}>{formatDate(s.timestamp)}</time>
                    </p>
                  )}
                  <Photos photos={s.photos} onOpen={(i) => open(s.title, s.photos, i)} />
                  {stageExtras(s)}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="wt-card wt-help wt-reveal">
          <div>
            <h2 className="wt-h2">Questions about your piece?</h2>
            <p>We&apos;re happy to help.</p>
          </div>
          {whatsAppAction()}
        </div>
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
