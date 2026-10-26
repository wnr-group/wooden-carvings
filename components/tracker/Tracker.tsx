"use client";

import { Check, ChevronLeft, ChevronRight, MoveHorizontal, Maximize2 } from "lucide-react";
import { Fraunces, Work_Sans } from "next/font/google";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
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

/** Before / after reveal: drag the handle (or use arrow keys) to compare two photos. */
function CompareSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
}: {
  before: TrackerPhoto;
  after: TrackerPhoto;
  beforeLabel: string;
  afterLabel: string;
}) {
  const [pos, setPos] = useState(50);
  return (
    <div className="wt-compare" style={{ "--wt-p": `${pos}%` } as CSSProperties}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="wt-compare-img" src={after.src} alt={after.alt} loading="lazy" decoding="async" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="wt-compare-img wt-compare-before" src={before.src} alt={before.alt} loading="lazy" decoding="async" />
      <span className="wt-compare-tag wt-compare-tag--l">{beforeLabel}</span>
      <span className="wt-compare-tag wt-compare-tag--r">{afterLabel}</span>
      <span className="wt-compare-handle" aria-hidden="true">
        <MoveHorizontal />
      </span>
      <input
        className="wt-compare-range"
        type="range"
        min={0}
        max={100}
        step={1}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Compare ${beforeLabel} with ${afterLabel}`}
      />
    </div>
  );
}

export function Tracker({ order, onHelp }: { order: Order; onHelp: () => void }) {
  const rootRef = useRef<HTMLElement>(null);
  const rulerRef = useRef<HTMLDivElement>(null);
  const firstScroll = useRef(true);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  // Selected stage + photo, tagged with the order so they reset when the order changes.
  const [pick, setPick] = useState<{ orderId: string; stage: number; photo: number } | null>(null);

  const view = useMemo(() => getTrackerView(order), [order]);
  const { stages, focus, percent, statusLine, reference, productName } = view;
  const delivered = order.currentStage === "delivered";
  const chipDate = (delivered && order.stageTimestamps.delivered) || order.expectedDelivery;

  const active = pick && pick.orderId === order.id ? pick : null;
  const selIndex = active ? active.stage : focus.index;
  const photoIndex = active ? active.photo : 0;
  const sel = stages[selIndex];
  const shownIndex = Math.min(photoIndex, Math.max(sel.photos.length - 1, 0));
  const shown = sel.photos[shownIndex];

  // Before / after: first photo of the earliest stage vs the latest photo so far.
  const withPhotos = stages.filter((s) => s.photos.length > 0);
  const beforeStage = withPhotos[0];
  const afterStage = withPhotos[withPhotos.length - 1];
  const canCompare = withPhotos.length >= 2 && beforeStage !== afterStage;

  // Cinematic hero photo: the latest picture so far, or the customer's reference.
  const heroPhoto = afterStage ? afterStage.photos[afterStage.photos.length - 1] : reference[0];
  const heroTag = afterStage ? `Latest · Stage ${afterStage.index + 1}` : "Your reference";

  function scrollRail(dir: 1 | -1) {
    const rail = rulerRef.current;
    if (rail) rail.scrollBy({ left: dir * Math.max(rail.clientWidth * 0.8, 240), behavior: "smooth" });
  }

  function choose(stage: number, photo = 0) {
    setPick({ orderId: order.id, stage, photo });
  }

  function onRulerKey(e: KeyboardEvent<HTMLDivElement>) {
    const last = stages.length - 1;
    let next = selIndex;
    if (e.key === "ArrowRight") next = Math.min(selIndex + 1, last);
    else if (e.key === "ArrowLeft") next = Math.max(selIndex - 1, 0);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    choose(next);
    document.getElementById(`wt-tab-${next}`)?.focus();
  }

  // Keep the selected mark in view on narrow screens (scrolls the ruler only, never the page).
  useEffect(() => {
    const ruler = rulerRef.current;
    const mark = document.getElementById(`wt-tab-${selIndex}`);
    if (!ruler || !mark) return;
    const target = mark.offsetLeft - (ruler.clientWidth - mark.offsetWidth) / 2;
    ruler.scrollTo({ left: Math.max(target, 0), behavior: firstScroll.current ? "auto" : "smooth" });
    firstScroll.current = false;
  }, [selIndex, order.id]);

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

  const circ = 2 * Math.PI * 70;

  return (
    <section
      ref={rootRef}
      id="status"
      aria-labelledby="wt-title"
      className={`wt-tracker ${fraunces.variable} ${workSans.variable}`}
    >
      <div className="wt-inner" key={order.id}>
        {/* ---------- Cinematic hero ---------- */}
        <header className="wt-hero wt-reveal">
          {heroPhoto && (
            <div className="wt-hero-bg" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroPhoto.src} alt="" />
            </div>
          )}
          <div className="wt-hero-text">
            <span className="wt-pill">Order update</span>
            <h1 id="wt-title" className="wt-title">
              {productName}
            </h1>
            <p className="wt-mast-meta">
              <span>No. {order.reference}</span>
              <span aria-hidden="true">◆</span>
              <span>
                {delivered ? "Delivered " : "Expected "}
                <time dateTime={chipDate}>{formatDate(chipDate)}</time>
              </span>
            </p>

            <div className="wt-status">
              <p className="wt-label">Overall production status</p>
              <h2 className="wt-status-line">{statusLine}</h2>
              <ol className="wt-bar" aria-hidden="true">
                {stages.map((st) => (
                  <li
                    key={st.index}
                    className={`wt-bar-seg wt-bar-seg--${st.state}`}
                    style={{ animationDelay: `${0.3 + st.index * 0.08}s` }}
                  />
                ))}
              </ol>
              <p className="wt-progress-text">
                <strong>{percent}%</strong> of production complete
              </p>
            </div>
          </div>

          {heroPhoto && (
            <div className="wt-arch-wrap">
              <button
                type="button"
                className="wt-arch"
                onClick={() =>
                  afterStage
                    ? openPhotos(afterStage, afterStage.photos.length - 1)
                    : setLightbox({ stage: "Reference images", photos: reference, index: 0 })
                }
                aria-label={`View larger: ${heroPhoto.alt}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={heroPhoto.src} alt={heroPhoto.alt} decoding="async" />
                <span className="wt-arch-tag">{heroTag}</span>
              </button>
              <div
                className="wt-seal"
                role="progressbar"
                aria-label="Production progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
                style={{ "--wt-pct": percent, "--wt-circ": circ } as CSSProperties}
              >
                <svg viewBox="0 0 200 200" aria-hidden="true">
                  <defs>
                    <linearGradient id="wt-seal-grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#F6DC9C" />
                      <stop offset="100%" stopColor="#B3823E" />
                    </linearGradient>
                    <path id="wt-seal-path" d="M100,100 m-84,0 a84,84 0 1,1 168,0 a84,84 0 1,1 -168,0" />
                  </defs>
                  <circle className="wt-seal-bg" cx="100" cy="100" r="98" />
                  <g className="wt-seal-text">
                    <text>
                      <textPath href="#wt-seal-path" textLength="520" lengthAdjust="spacing">
                        HAND CARVED ◆ HEART OF WOOD ◆ VK WOOD CARVINGS ◆
                      </textPath>
                    </text>
                  </g>
                  <circle className="wt-seal-track" cx="100" cy="100" r="70" />
                  <circle className="wt-seal-fill" cx="100" cy="100" r="70" />
                </svg>
                <div className="wt-seal-num" aria-hidden="true">
                  <strong>{percent}%</strong>
                  <span>carved</span>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* ---------- Journey: swipeable stage gallery + selected stage ---------- */}
        <section className="wt-atelier wt-reveal" aria-labelledby="wt-atelier-title">
          <div className="wt-rail-head">
            <div>
              <p className="wt-label">Stage by stage</p>
              <h2 id="wt-atelier-title" className="wt-h2 wt-h2--light wt-h2--big">
                Production <em>Journey</em>
              </h2>
            </div>
            <div className="wt-rail-nav">
              <button type="button" className="wt-nav-btn" onClick={() => scrollRail(-1)} aria-label="Scroll stages left">
                <ChevronLeft />
              </button>
              <button type="button" className="wt-nav-btn" onClick={() => scrollRail(1)} aria-label="Scroll stages right">
                <ChevronRight />
              </button>
            </div>
          </div>

          <div
            ref={rulerRef}
            className="wt-rail"
            role="tablist"
            aria-label="Production stages"
            onKeyDown={onRulerKey}
          >
            {stages.map((s) => (
              <button
                key={s.index}
                id={`wt-tab-${s.index}`}
                type="button"
                role="tab"
                aria-selected={s.index === selIndex}
                aria-controls="wt-panel"
                tabIndex={s.index === selIndex ? 0 : -1}
                className={`wt-stagecard wt-stagecard--${s.state}${s.index === selIndex ? " wt-stagecard--sel" : ""}`}
                onClick={() => choose(s.index)}
              >
                <span className="wt-node" aria-hidden="true">
                  <span className="wt-node-dot">{s.state === "completed" && <Check />}</span>
                </span>
                <span className={`wt-stagecard-media${s.photos[0] ? "" : " wt-stagecard-media--empty"}`}>
                  {s.photos[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.photos[0].src} alt="" loading="lazy" decoding="async" />
                  ) : (
                    <span className="wt-stagecard-empty" aria-hidden="true" />
                  )}
                  <span className="wt-stagecard-num" aria-hidden="true">
                    {String(s.index + 1).padStart(2, "0")}
                  </span>
                </span>
                <span className="wt-stagecard-name">{s.title}</span>
                <span className="wt-stagecard-state">{stageBadge(s)}</span>
              </button>
            ))}
          </div>

          <div
            id="wt-panel"
            role="tabpanel"
            aria-labelledby={`wt-tab-${selIndex}`}
            tabIndex={0}
            className={`wt-panel wt-panel--${sel.state}`}
          >
            <figure className="wt-frame-wrap">
              {shown ? (
                <button
                  type="button"
                  className="wt-frame"
                  onClick={() => openPhotos(sel, shownIndex)}
                  aria-label={`View larger: ${shown.alt}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img key={shown.src} src={shown.src} alt={shown.alt} decoding="async" />
                  <span className="wt-frame-ico" aria-hidden="true">
                    <Maximize2 />
                  </span>
                </button>
              ) : (
                <div className="wt-frame wt-frame--empty">
                  <p>
                    {sel.state === "upcoming"
                      ? "Photographs appear here once this stage begins."
                      : "No photographs were taken at this stage."}
                  </p>
                </div>
              )}
              <figcaption className="wt-plaque">
                <span>Stage {String(sel.index + 1).padStart(2, "0")}</span>
                <span>{sel.title}</span>
              </figcaption>
            </figure>

            <div className="wt-detail">
              <p className="wt-label">
                Stage {sel.index + 1} of {stages.length}
              </p>
              <h3 className="wt-detail-title">{sel.title}</h3>
              <p className="wt-detail-row">
                <span
                  className={`wt-badge ${
                    sel.state === "completed" ? "wt-badge--done" : sel.state === "current" ? "wt-badge--current" : ""
                  }`}
                >
                  {stageBadge(sel)}
                </span>
                {sel.timestamp && (
                  <span className="wt-meta">
                    {sel.index === focus.index ? "Last updated on " : "Updated "}
                    <time dateTime={sel.timestamp}>{formatDate(sel.timestamp)}</time>
                  </span>
                )}
              </p>
              {sel.index !== focus.index && (
                <button type="button" className="wt-jump" onClick={() => choose(focus.index)}>
                  Jump to latest update: Stage {focus.index + 1}
                </button>
              )}
              {stageExtras(sel)}
              {sel.photos.length > 1 && (
                <div className="wt-strip" role="group" aria-label="Photos in this stage">
                  {sel.photos.map((p, i) => (
                    <button
                      key={p.src}
                      type="button"
                      className={`wt-strip-btn${i === shownIndex ? " wt-strip-btn--on" : ""}`}
                      onClick={() => choose(sel.index, i)}
                      aria-label={`Show photo ${i + 1} of ${sel.photos.length}`}
                      aria-pressed={i === shownIndex}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.src} alt="" loading="lazy" decoding="async" />
                    </button>
                  ))}
                </div>
              )}
              <ol className="wt-log" aria-label="Stage log">
                {stages.map((st) => (
                  <li key={st.index}>
                    <button
                      type="button"
                      className={`wt-log-row wt-log-row--${st.state}${st.index === selIndex ? " wt-log-row--sel" : ""}`}
                      onClick={() => choose(st.index)}
                      aria-current={st.index === selIndex ? "true" : undefined}
                    >
                      <span className="wt-log-dot" aria-hidden="true" />
                      <span className="wt-log-name">
                        {String(st.index + 1).padStart(2, "0")} · {st.title}
                      </span>
                      <span className="wt-log-date">
                        {st.timestamp ? formatDate(st.timestamp) : stageBadge(st)}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ---------- Timber to masterpiece ---------- */}
        {canCompare && (
          <section className="wt-transform wt-reveal" aria-labelledby="wt-transform-title">
            <div className="wt-transform-text">
              <p className="wt-label">The transformation</p>
              <h2 id="wt-transform-title" className="wt-h2 wt-h2--big">
                From raw timber to <em>your piece</em>
              </h2>
              <p className="wt-lede">
                Drag the handle, or use the arrow keys, to see how far your sculpture has travelled since the first
                block of wood.
              </p>
              <p className="wt-meta">
                Left: Stage {beforeStage.index + 1}, {beforeStage.title}. Right: Stage {afterStage.index + 1},{" "}
                {afterStage.title}.
              </p>
            </div>
            <CompareSlider
              before={beforeStage.photos[0]}
              after={afterStage.photos[afterStage.photos.length - 1]}
              beforeLabel={beforeStage.title}
              afterLabel={afterStage.title}
            />
          </section>
        )}

        {/* ---------- Reference images ---------- */}
        {reference.length > 0 && (
          <section className="wt-refs wt-reveal" aria-labelledby="wt-ref-title">
            <div className="wt-refs-text">
              <p className="wt-label">Pinned to the workbench</p>
              <h2 id="wt-ref-title" className="wt-h2">
                Your Reference Images
              </h2>
              <p className="wt-lede">
                The photos you shared with us — our artisans are carving your piece from these.
              </p>
            </div>
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
                    <span>Reference {i + 1}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

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
