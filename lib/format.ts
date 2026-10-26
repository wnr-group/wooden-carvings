const TZ = "Asia/Kolkata";

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: TZ,
});

const timeParts = new Intl.DateTimeFormat("en-GB", {
  hour: "numeric",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: TZ,
});

/** "12 Oct 2026", pinned to IST so server and client always agree. */
export function formatDate(iso: string): string {
  return dateFmt.format(new Date(iso));
}

/** "11:42 am", built by hand because ICU day-period casing varies by runtime. */
export function formatTime(iso: string): string {
  const parts = timeParts.formatToParts(new Date(iso));
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const m = parts.find((p) => p.type === "minute")?.value ?? "00";
  const suffix = h >= 12 ? "pm" : "am";
  return `${h % 12 === 0 ? 12 : h % 12}:${m} ${suffix}`;
}

export function formatDateTime(iso: string): string {
  return `${formatDate(iso)}, ${formatTime(iso)}`;
}
