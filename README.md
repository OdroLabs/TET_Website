# TET Website

Trilingual (English / සිංහල / தமிழ்) website for the **Transgender Empowerment Trust (TET)**, a trans-led Sri Lankan NGO supporting trans women in sex work, with a full admin panel to manage every piece of content on the site — there is no hardcoded copy on public pages.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · hand-added shadcn/ui-style components · Prisma · PostgreSQL · NextAuth (credentials/JWT) · PayHere payments

## Features

- Public pages: Home, About Us (overview/vision/mission/values/history/team), Projects, Services, Research & Report Publications, News, Events & Gallery, Community Business (product showcase with WhatsApp ordering), Volunteer, Hall Booking, Suggestions, Contact, Donation
- Language switcher (EN/SI/TA) — every content field is editable in all three languages, with automatic English fallback when a translation is blank
- Admin panel at `/admin` — generic CRUD for every content type (projects, services, publications, news, events, gallery, products, testimonials, partners, impact stats) plus all site settings (hero text, about text, contact info, bank details, per-section visibility toggles, SEO metadata, and UI label overrides)
- Two roles: **owner** (everything, including users/settings) and **editor** (content + inbox only)
- Inboxes for donations, suggestions, contact messages, newsletter subscribers, volunteer applications, and hall booking requests
- Online donations via PayHere (sandbox & live), plus admin-editable bank transfer details
- Image/PDF uploads stored on disk under `public/uploads`

## Setup

### 1. Requirements

- Node.js 18.17+ (20+ recommended)
- PostgreSQL (a pooled connection string works — the schema uses a separate `directUrl` for migrations, e.g. Neon, Supabase)

### 2. Install

```bash
npm install
```

`postinstall` runs `prisma generate` automatically.

### 3. Configure environment

Copy `.env.example` to `.env` and fill in real values — **never commit real secrets to `.env.example`**, it should only ever contain placeholders:

```bash
cp .env.example .env
```

Required variables:

- `DATABASE_URL` — pooled PostgreSQL connection string
- `DIRECT_URL` — direct (non-pooled) PostgreSQL connection string, used for migrations/`db:push`
- `NEXTAUTH_SECRET` — any long random string (`openssl rand -base64 32`)
- `NEXTAUTH_URL` — `http://localhost:3000` in development; your domain in production
- `NEXT_PUBLIC_SITE_URL` — used for PayHere return/notify URLs
- `PAYHERE_MERCHANT_ID` / `PAYHERE_MERCHANT_SECRET` — from your [PayHere](https://www.payhere.lk) merchant dashboard (use a [sandbox account](https://sandbox.payhere.lk) for testing)
- `PAYHERE_MODE` — `sandbox` or `live`

### 4. Create tables and seed content

```bash
npm run db:push          # push the Prisma schema to the database (no migration files)
npm run db:seed          # base content in all three languages + the owner account
npm run db:seed:settings # (optional) reset just the Setting rows
```

> **Login:** `admin@tet-srilanka.org` / `admin12345` — **change this password immediately** (Dashboard → Change Password).

### 5. Run

```bash
npm run dev        # development — http://localhost:3000
npm run build      # production build
npm start          # production server
```

Site: `http://localhost:3000` · Admin: `http://localhost:3000/admin`

There is no automated test suite in this repo currently; `npm run lint` runs `next lint`.

## PayHere notes

- The **notify webhook** (`/api/payhere/notify`) must be reachable from the internet for donation statuses to update. On localhost, use a tunnel (e.g. `ngrok http 3000`) and set `NEXT_PUBLIC_SITE_URL` to the tunnel URL while testing.
- In the PayHere dashboard, whitelist your domain under Settings → Domains & Credentials.
- Donations are recorded as `pending` when the visitor is redirected, then updated to `success`/`failed`/`cancelled`/`chargeback` by the webhook (MD5 signature-verified).

## Content management

Everything visible on the site is editable — there is deliberately no hardcoded fallback copy in components:

- **Site Settings** (`/admin/settings`) — site name, tagline, hero section, about texts, contact details, WhatsApp number, map embed, bank details, per-page settings (Home, About, Contact, Donate, Volunteer, Hall Booking), and label/translation overrides for built-in UI strings
- **Content** (`/admin/content/...`) — CRUD for every content type; each text field has EN/SI/TA inputs (Sinhala/Tamil optional; English shown as fallback when blank)
- **Inbox** — donations, suggestions, contact messages, subscribers, volunteer applications, hall booking requests
- **Users** (`/admin/users`, owner-only) — manage admin accounts and roles

## Deployment

Deploy to any Node.js host with a persistent filesystem and PostgreSQL access (VPS, cPanel with Node, Railway, etc.). Uploads are written to `public/uploads` on disk, so plain serverless platforms like Vercel need S3-style storage wired in instead — not set up by default.

Suggested production start (PM2):

```bash
npm run build
pm2 start npm --name tet-website -- start
```
