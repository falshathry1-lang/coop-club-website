# COOP Club Website

A full Next.js 14 website for the COOP Club at Prince Sultan University — bridging students with the professional world.

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** — styling
- **Framer Motion** — animations
- **Formspree** — application form backend
- **Anthropic Claude API** — post categorization & timeline extraction (optional script)

---

## Getting Started

### Prerequisites

- [Node.js 18+](https://nodejs.org/) installed on your machine

### 1. Install dependencies

```bash
cd "Coop website"
npm install
```

### 2. Set up environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and add:

```
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_form_id
ANTHROPIC_API_KEY=your_key_only_if_running_generate_data
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Updating Content

All website content lives in the `/data` folder as JSON files. Edit them directly — no code changes needed.

### `/data/instagram.json`
Each post has:
```json
{
  "id": "unique-id",
  "caption": "Post caption text",
  "url": "https://www.instagram.com/p/...",
  "displayUrl": "https://direct-image-url.jpg",
  "likesCount": 42,
  "commentsCount": 3,
  "timestamp": "2026-03-10T19:00:00.000Z",
  "category": "event"
}
```
**category** options: `event`, `milestone`, `announcement`, `partner`, `general`

> **Note:** The `displayUrl` field holds the direct image URL. If empty, the gallery shows a gradient placeholder card instead. To get real image URLs, use an Apify Instagram scraper export that includes `displayUrl`.

### `/data/team.json`
```json
[
  { "name": "Full Name", "role": "President", "department": "Executive", "photo": "" }
]
```
Set `"photo"` to a URL or a path like `"/photos/name.jpg"` (place images in `/public/photos/`).

### `/data/timeline.json`
```json
[
  { "year": 2023, "month": 9, "title": "Club Founded", "description": "..." }
]
```
Sorted chronologically. Month is 1–12.

### `/data/events.json`
```json
[
  {
    "id": 1,
    "title": "Event Name",
    "titleAr": "اسم الفعالية",
    "description": "...",
    "date": "2026-05-01",
    "time": "18:00",
    "location": "Auditorium B",
    "type": "upcoming",
    "category": "Graduate Dialogue",
    "image": ""
  }
]
```
Set `"type"` to `"upcoming"` or `"past"`. Upcoming events show a live countdown timer.

### `/data/partners.json`
```json
[
  {
    "id": 1,
    "name": "Company Name",
    "logo": "",
    "website": "https://company.com",
    "description": "...",
    "type": "corporate"
  }
]
```
`"type"` is `"corporate"` or `"academic"`. Set `"logo"` to a URL or `/partners/logo.png`.

---

## Formspree Setup (Apply Form)

1. Go to [formspree.io](https://formspree.io/) and create a **free account**
2. Click **New Form** → give it a name like "COOP Club Application"
3. Copy the **Form ID** from the form URL (looks like `xpwzabcd`)
4. Add it to `.env.local`:
   ```
   NEXT_PUBLIC_FORMSPREE_ID=xpwzabcd
   ```
5. Submit a test application — it will arrive in your Formspree inbox

---

## Auto-categorize Posts with Claude API (Optional)

If you get a fresh Apify export and want Claude to automatically categorize posts and extract timeline milestones:

1. Add your Anthropic API key to `.env.local`:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```
2. Place the Apify export file in the root directory (it should be named `dataset_instagram-post-scraper_*.json`)
3. Run:
   ```bash
   npm run generate-data
   ```

This will overwrite `data/instagram.json` and `data/timeline.json` with AI-generated categories and milestones.

---

## Adding Team Member Photos

1. Add photos to the `/public/photos/` folder (e.g. `ali.jpg`)
2. In `data/team.json`, set the `"photo"` field:
   ```json
   { "name": "Ali Alsayyar", "photo": "/photos/ali.jpg", ... }
   ```

---

## Deploy on Vercel (Free)

1. Push the project to GitHub
2. Go to [vercel.com](https://vercel.com/) and sign up with GitHub
3. Click **New Project** → Import your repository
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_FORMSPREE_ID` → your Formspree ID
5. Click **Deploy**

Your site will be live at `https://your-project.vercel.app` in ~2 minutes.

For a custom domain, go to your Vercel project → Settings → Domains → Add your domain.

---

## Pages Overview

| Route | Page |
|-------|------|
| `/` | Home — hero, stats, Instagram preview, programmes |
| `/about` | About & History — club story, timeline, mission/vision/values |
| `/structure` | Club Structure — org chart + department cards |
| `/events` | Events — upcoming (with countdown) + past events |
| `/gallery` | Gallery — masonry Instagram grid with category filter |
| `/partners` | Partners — corporate and academic partner cards |
| `/apply` | Apply — full application form via Formspree |

---

Built with ♥ by the COOP Club team · [@coop.psu](https://www.instagram.com/coop.psu/)
