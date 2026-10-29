import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { galleryItems } from "@/data/gallery";

interface SiteFooterProps {
  /** Adds a "Help with your order" button (used on the tracking page). */
  onHelp?: () => void;
  /** Optional disclosure shown above the credits, e.g. that order data is sample content. */
  notice?: string;
}

/** The one footer used across the whole website. */
export function SiteFooter({ onHelp, notice }: SiteFooterProps) {
  return (
    <footer className="on-dark bg-[#1d120a] text-ivory">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-3 lg:px-12">
        <div>
          <Wordmark tone="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/65">
            Heirloom wood carvings, shaped slowly by hand.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-oak">Quick links</h3>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            <li><Link href="/" className="hover:text-ivory">Home</Link></li>
            <li><Link href="/#collection" className="hover:text-ivory">Collection</Link></li>
            <li><Link href="/#craft" className="hover:text-ivory">Why choose us</Link></li>
            <li><Link href="/track" className="hover:text-ivory">Track order</Link></li>
            {onHelp && (
              <li>
                <button type="button" onClick={onHelp} className="hover:text-ivory">
                  Help with your order
                </button>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-oak">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            <li>Phone: +00 00000 00000 (placeholder)</li>
            <li>Email: hello@example.com (placeholder)</li>
            <li>Address: Workshop address to be added</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] border-t border-ivory/15 px-5 py-6 text-xs leading-relaxed text-ivory/60 sm:px-8 lg:px-12">
        {notice && <p className="mb-4 max-w-3xl">{notice}</p>}
        <details>
          <summary className="cursor-pointer text-ivory/75 hover:text-ivory">Photo credits</summary>
          <ul className="mt-3 space-y-1.5">
            {galleryItems.map((g) => (
              <li key={g.id}>
                {g.title}:{" "}
                <a href={g.credit.sourceUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-ivory">
                  {g.credit.author}
                </a>
                , via Wikimedia Commons,{" "}
                <a href={g.credit.licenseUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-ivory">
                  {g.credit.license}
                </a>
              </li>
            ))}
          </ul>
        </details>
        <p className="mt-4">&copy; 2026 VK Wood Carvings (prototype)</p>
      </div>
    </footer>
  );
}
