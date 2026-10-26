# VK Wood Carvings: Order Tracking Prototype

A frontend-only prototype of a customer order-tracking page, built with
Next.js (App Router), TypeScript, Tailwind CSS, Motion and Lucide icons.
There is no backend, database, auth or API.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start   # production check
```

## Prototype content notice

All orders, names, dates, couriers and tracking references are **sample data**
(`data/orders.ts`), not verified customer information. The "Demo preview"
chip (bottom-left) switches between three sample orders:

- A: Crafting in Progress (VK-2026-1042)
- B: Shipped (VK-2026-0987)
- C: Delivered (VK-2026-0861)

Support is a demo form: no real phone, email or WhatsApp is connected.

## Photography

Images in `public/images` are illustrative woodcarving photographs from
Wikimedia Commons (CC0, CC BY, CC BY-SA). They are not photos of any order.
Credits are listed in the page footer and in the lightbox. There is no
suitable packaging photograph yet, so that stage is not illustrated.

## Structure

- `app/`: layout, global tokens (`globals.css`), single page
- `components/`: Hero, Timeline, ProductDetails, DeliveryInfo, Gallery, Lightbox, SupportDialog, etc.
- `data/`: mock orders, stage definitions, gallery items (swap for API data later)
- `lib/`: date formatting (pinned to IST) and status derivation
- `types/`: TypeScript types
