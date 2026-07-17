# Silicon Sales Institute — Demo Site

Standalone marketing site for **Silicon Sales Institute** (temporary client demo).

Built with Next.js (App Router). The site serves at **`/`**.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Stack

- Next.js 16 + React 19
- GSAP (scroll motion)
- Custom CSS (no Tailwind)
- Google fonts via `next/font`: Sora, Manrope, JetBrains Mono

## Content & assets

| Path | Purpose |
|------|---------|
| `src/lib/silicon-sales.ts` | Copy, FAQs, placement logos, apply URL |
| `src/components/silicon-sales/` | Page UI, particle headline, win carousel |
| `public/silicon-sales/` | Placement logos + win imagery |

Edit `src/lib/silicon-sales.ts` to swap copy, logos, apply link, or contact email before launch.

## Environment

No required env vars for the demo. Apply / contact URLs are hardcoded in `src/lib/silicon-sales.ts`.

Optional: add a `.env.local` later if you move URLs behind `NEXT_PUBLIC_*` vars.

## Deploy on Netlify

1. Push this repo to GitHub (already done if you cloned from the remote).
2. In [Netlify](https://app.netlify.com): **Add new site → Import an existing project → GitHub**.
3. Select this repository.
4. Build settings (usually auto-detected via `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** leave as Netlify Next plugin default (`.next`)
5. Deploy. Netlify’s Next.js runtime (`@netlify/plugin-nextjs`) handles SSR/static output.

CLI alternative (if logged in):

```bash
npm i -g netlify-cli
netlify login
netlify init
netlify deploy --build --prod
```

## GitHub

Public repo: see the remote after `git remote -v`, or open the URL returned when this project was published.

## Client email

See [`CLIENT_EMAIL.md`](./CLIENT_EMAIL.md) for the draft message from RAED to the client.
