# Studio Socialé

Marketing site for **Studio Socialé**, a social media management, content and
strategy agency. Built with Next.js (App Router), TypeScript, Tailwind CSS,
Framer Motion, GSAP/ScrollTrigger and Lenis.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** for styling and design tokens
- **Framer Motion** for component animation (reveals, hover states, the
  custom cursor, the hero's 3D phone tilt)
- **GSAP + ScrollTrigger** for scroll-scrubbed effects (the word-by-word
  statement reveal, the process timeline draw) and the velocity-aware marquee
- **Lenis** for smooth scrolling
- **Resend** for emailing contact form inquiries
- **Zod** for form validation (shared between the client and the API route)

All looping/scroll-driven motion respects `prefers-reduced-motion` and is
disabled in favor of static content when it's set.

## Getting started

Requires Node.js 20.19+ (or 22.13+).

```bash
npm install
cp .env.example .env.local   # then fill in your Resend details
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note on `next dev` and Turbopack:** this project uses Turbopack (the
> Next.js default) for `dev`/`build`. If you're developing inside a sandboxed
> environment that blocks spawning child Node processes, Turbopack's CSS
> loader worker can fail to start. If that happens, run
> `next dev --webpack` / `next build --webpack` instead — a
> `postcss.config.mjs` using `@tailwindcss/postcss` is included specifically
> as a webpack-mode fallback. A normal local machine or CI/Vercel build does
> not need this.

## Contact form / email setup

The contact form posts to `src/app/api/contact/route.ts`, which validates the
payload with the shared schema in `src/lib/contact-schema.ts` and sends an
email via [Resend](https://resend.com).

Environment variables (see `.env.example`):

| Variable | Required | Description |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | API key from your Resend dashboard. |
| `CONTACT_TO_EMAIL` | Yes | Inbox that should receive inquiries. |
| `CONTACT_FROM_EMAIL` | No | Sender address, e.g. `"Studio Socialé <inquiries@yourdomain.com>"`. Must be on a domain verified in Resend. Defaults to Resend's shared test sender (`onboarding@resend.dev`), which works immediately but is best for testing only — verify your own domain in Resend before going live. |

If the env vars aren't set, the API route returns a friendly error instead of
throwing, and the form surfaces it inline.

## Project structure

```
src/
  app/
    page.tsx              # assembles all sections
    layout.tsx             # fonts, metadata, smooth scroll + cursor providers
    globals.css             # design tokens (colors, radii, easing, shimmer/glass utilities)
    api/contact/route.ts    # POST handler, emails via Resend
    icon.tsx / apple-icon.tsx / opengraph-image.tsx   # generated brand imagery
  components/               # one component per section, plus shared bits
    (Nav, Hero, Marquee, Statement, Services, StatementPanel,
     Process, Contact, ContactForm, Footer, BlobField, FadeIn,
     CustomCursor, SmoothScroll, PhoneMockup, ServiceIcons)
  lib/
    motion.ts               # shared easing curve + Framer Motion variants
    contact-schema.ts        # Zod schema shared by the form and the API route
assets/fonts/                # font files bundled for the generated OG/icon images
```

## Content still to fill in

Everything in the spec is implemented with real copy, but a few things are
placeholders you'll want to replace before shipping:

- **Open Graph / social preview URL**: `metadataBase` in `src/app/layout.tsx`
  points at `https://studiosociale.example` — update it to the real domain
  once you have one, so shared links resolve correctly.
- **Sender email domain**: see `CONTACT_FROM_EMAIL` above — verify a real
  domain in Resend for production sends.
- **Social handles / links**: Instagram and TikTok links are wired to the
  real handles given in the brief (`@studiosocialeofficial`,
  `@studio.sociale`); double-check they're still correct before launch.
- No pricing, testimonials or case studies were specified, so none are
  included — add sections for those if/when you have real content.

## Deploying to Vercel

1. Push this project to a Git repository.
2. Import it in Vercel.
3. Add the environment variables above (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
   optionally `CONTACT_FROM_EMAIL`) in the Vercel project settings.
4. Deploy — no other configuration is required.

## Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # eslint
```
