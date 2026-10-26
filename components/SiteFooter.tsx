import { galleryItems, heroImage } from "@/data/gallery";
import { Wordmark } from "@/components/Wordmark";
import type { PhotoCredit } from "@/types/order";

const credits: { label: string; credit: PhotoCredit }[] = [
  { label: "Hero", credit: heroImage.credit },
  ...galleryItems.map((g) => ({ label: g.title, credit: g.credit })),
];

export function SiteFooter({ onHelp }: { onHelp: () => void }) {
  return (
    <footer className="on-dark bg-charcoal text-ivory">
      <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Wordmark tone="light" />
            <p className="mt-8 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
              Every masterpiece
              <br />
              has a journey.
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="flex flex-col items-start gap-3 text-sm lg:col-span-3 lg:col-start-8"
          >
            <a href="#status" className="text-ivory/80 hover:text-ivory">
              Back to top
            </a>
            <a href="#journey" className="text-ivory/80 hover:text-ivory">
              Order progress
            </a>
            <a href="#delivery" className="text-ivory/80 hover:text-ivory">
              Delivery
            </a>
            <button type="button" onClick={onHelp} className="text-ivory/80 hover:text-ivory">
              Help with your order
            </button>
          </nav>
        </div>

        <div className="mt-14 border-t border-ivory/15 pt-8 text-xs leading-relaxed text-ivory/65">
          <p className="max-w-3xl">
            Prototype notice: all orders, names, dates, couriers and tracking
            references on this page are sample content, not verified customer
            information. Photographs are illustrative and are not images of any
            real order.
          </p>
          <details className="mt-4 max-w-3xl">
            <summary className="cursor-pointer text-ivory/80 hover:text-ivory">
              Photo credits
            </summary>
            <ul className="mt-3 space-y-1.5">
              {credits.map(({ label, credit }) => (
                <li key={label}>
                  {label}:{" "}
                  <a
                    href={credit.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2 hover:text-ivory"
                  >
                    {credit.author}
                  </a>
                  , via Wikimedia Commons,{" "}
                  <a
                    href={credit.licenseUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2 hover:text-ivory"
                  >
                    {credit.license}
                  </a>
                </li>
              ))}
            </ul>
          </details>
          <p className="mt-6">&copy; 2026 VK Wood Carvings (prototype)</p>
        </div>
      </div>
    </footer>
  );
}
