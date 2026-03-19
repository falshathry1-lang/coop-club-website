/**
 * generate-data.mjs
 * Run with: npm run generate-data
 * Requires: ANTHROPIC_API_KEY in .env.local
 *
 * This script:
 * 1. Reads the raw Apify Instagram export
 * 2. Uses Claude to auto-categorize each post
 * 3. Uses Claude to extract timeline milestones from captions + dates
 * 4. Overwrites data/instagram.json and data/timeline.json
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Load .env.local manually
const envPath = path.join(root, '.env.local');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  for (const line of lines) {
    const [key, ...rest] = line.split('=');
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
  }
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── 1. Load raw Instagram data ─────────────────────────────────────────────
const rawPath = path.join(root, 'dataset_instagram-post-scraper_2026-03-19_02-18-05-080.json');
const dataPath = path.join(root, 'data', 'instagram.json');

let rawPosts = [];
if (fs.existsSync(rawPath)) {
  rawPosts = JSON.parse(fs.readFileSync(rawPath, 'utf-8'));
  console.log(`Loaded ${rawPosts.length} raw posts from Apify export.`);
} else if (fs.existsSync(dataPath)) {
  rawPosts = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  console.log(`Loaded ${rawPosts.length} posts from data/instagram.json.`);
} else {
  console.error('No Instagram data file found.');
  process.exit(1);
}

// ── 2. Categorize posts with Claude ───────────────────────────────────────
console.log('\n📦 Categorizing posts with Claude...');

const postsForCategorization = rawPosts.map((p, i) => ({
  index: i,
  caption: p.caption || '(no caption)',
  timestamp: p.timestamp,
  likesCount: p.likesCount,
}));

const categorizationPrompt = `You are categorizing Instagram posts for a university cooperative training club called "COOP Club" (coop.psu).

The club runs programmes like:
- Training Journey (رحلة تدريب) — company visits and professional development trips
- Graduate Dialogue (حوار خريجين) — sessions with alumni and professionals
- Tamayuz (تميز) — excellence programme with Company Visit, Escape Room, Weekly Fair sub-tracks
- Mulham (ملهم) — inspirational sessions

Categorize each post as one of: "event", "announcement", "partner", "milestone", or "general"
- event: posts about events, activities, company visits, training sessions
- announcement: posts announcing upcoming events, recruitment, or news
- partner: posts featuring company partnerships or sponsors
- milestone: posts celebrating achievements, high engagement moments, founding anniversaries
- general: everything else

Posts to categorize (JSON array):
${JSON.stringify(postsForCategorization, null, 2)}

Return ONLY a JSON array of objects: [{ "index": 0, "category": "event" }, ...]
No explanation, just the JSON.`;

let categories = [];
try {
  const msg = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [{ role: 'user', content: categorizationPrompt }],
  });
  const text = msg.content[0].text.trim();
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (jsonMatch) categories = JSON.parse(jsonMatch[0]);
  console.log(`✅ Categorized ${categories.length} posts.`);
} catch (err) {
  console.warn('⚠️  Categorization failed, using defaults:', err.message);
}

// ── 3. Build cleaned instagram.json ───────────────────────────────────────
const cleanedPosts = rawPosts.map((post, i) => {
  const catEntry = categories.find((c) => c.index === i);
  const id = post.url?.split('/p/')[1]?.replace('/', '') || `post-${i}`;
  return {
    id,
    caption: post.caption || '',
    ownerFullName: post.ownerFullName || 'COOP CLUB',
    ownerUsername: post.ownerUsername || 'coop.psu',
    url: post.url || '',
    displayUrl: post.displayUrl || '',
    commentsCount: post.commentsCount || 0,
    likesCount: post.likesCount || 0,
    timestamp: post.timestamp,
    category: catEntry?.category || 'general',
  };
});

fs.writeFileSync(dataPath, JSON.stringify(cleanedPosts, null, 2));
console.log(`✅ Saved ${cleanedPosts.length} cleaned posts → data/instagram.json`);

// ── 4. Extract timeline milestones with Claude ────────────────────────────
console.log('\n🗓️  Extracting timeline milestones with Claude...');

const captionSummary = rawPosts
  .filter((p) => p.caption)
  .map((p) => `Date: ${p.timestamp.slice(0, 10)} | Likes: ${p.likesCount} | Caption: ${p.caption}`)
  .join('\n');

const timelinePrompt = `You are analyzing Instagram posts from a university cooperative training club called "COOP Club" to extract key timeline milestones.

The club runs Training Journey (رحلة تدريب) seasons. Based on the posts, Season 5 was in Nov 2025 and Season 6 in Mar 2026. Earlier seasons happened in prior semesters. The club appears to have been founded around 2023.

Instagram post data:
${captionSummary || 'No captions available — infer from context.'}

Extract 6–10 key milestones in the club's history (including founding, first events, programme launches, season milestones).

Return ONLY a JSON array, sorted chronologically:
[
  { "year": 2023, "month": 9, "title": "COOP Club Founded", "description": "..." },
  ...
]

No explanation, just JSON.`;

let timelineMilestones = [];
try {
  const msg = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [{ role: 'user', content: timelinePrompt }],
  });
  const text = msg.content[0].text.trim();
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (jsonMatch) timelineMilestones = JSON.parse(jsonMatch[0]);
  console.log(`✅ Extracted ${timelineMilestones.length} milestones.`);
} catch (err) {
  console.warn('⚠️  Timeline extraction failed:', err.message);
}

if (timelineMilestones.length > 0) {
  const timelinePath = path.join(root, 'data', 'timeline.json');
  fs.writeFileSync(timelinePath, JSON.stringify(timelineMilestones, null, 2));
  console.log(`✅ Saved timeline → data/timeline.json`);
}

console.log('\n🎉 Done! All data files updated.');
