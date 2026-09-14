// Capture the screenshots the brand site shows, from the LIVE faithnet estate, signed in as the Home's demo people.
//
//   node scripts/screenshots.mjs            # writes apps/web/public/shots/*.png
//   PLAYWRIGHT_ROOT=/path/with/node_modules node scripts/screenshots.mjs
//
// Playwright is resolved from PLAYWRIGHT_ROOT (default: a sibling checkout that already has it + browsers) so this
// repo does not carry a browser download for a script that runs a few times a year.
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { homedir } from 'node:os';

const root = process.env.PLAYWRIGHT_ROOT ?? resolve(homedir(), 'pokernight');
const { chromium } = createRequire(resolve(root, 'package.json'))('playwright');

const OUT = resolve(import.meta.dirname, '../apps/web/public/shots');
mkdirSync(OUT, { recursive: true });

const GAMENIGHT = 'https://gamenight.faithnet.io';
const HOME = 'https://www.faithnet.me';
const SKILLS = 'https://skills.faithnet.io';
const DISCOVERY = 'https://discovery.faithnet.io';

const log = (s) => console.log(`· ${s}`);
const shot = async (page, name, opts = {}) => {
  await page.waitForTimeout(opts.settle ?? 1200);
  await page.screenshot({ path: resolve(OUT, `${name}.png`), fullPage: opts.fullPage ?? false });
  log(`saved ${name}.png`);
};
const attempt = async (what, fn) => {
  try { await fn(); } catch (e) { console.warn(`  ✗ ${what}: ${String(e).split('\n')[0]}`); }
};

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: 'light' });
const page = await ctx.newPage();

// ── Game Night ──
await attempt('gamenight landing', async () => {
  await page.goto(`${GAMENIGHT}/#/`, { waitUntil: 'networkidle' });
  await shot(page, 'gamenight-landing');
});
await attempt('gamenight sign in', async () => {
  await page.goto(`${GAMENIGHT}/#/signin`, { waitUntil: 'networkidle' });
  await page.locator('.signin-demo summary').click();
  await page.waitForSelector('.persona', { timeout: 30_000 });
  const who = await page.locator('.persona-name').first().innerText();
  await page.locator('.persona').first().click();
  await page.waitForSelector('.room', { timeout: 60_000 });
  log(`signed in to Game Night as ${who}`);
  await shot(page, 'gamenight-play', { settle: 2500 });
});
await attempt('gamenight tables', async () => {
  await page.locator('.sidenav-row', { hasText: 'Tables' }).click();
  await page.waitForTimeout(1500);
  await shot(page, 'gamenight-tables');
});
await attempt('gamenight money', async () => {
  await page.locator('.sidenav-row', { hasText: 'Your money' }).click();
  await page.waitForTimeout(2500);
  await shot(page, 'gamenight-money');
});
await attempt('gamenight practice table', async () => {
  await page.goto(`${GAMENIGHT}/#/`, { waitUntil: 'networkidle' });
  const cards = page.locator('.play-card');
  const n = await cards.count();
  let clicked = false;
  for (let i = 0; i < n; i++) {
    const t = (await cards.nth(i).innerText()).toLowerCase();
    if (/canasta|practice|learn/.test(t)) {
      const btn = cards.nth(i).locator('button, a').first();
      if (await btn.count()) await btn.click(); else await cards.nth(i).click();
      clicked = true; break;
    }
  }
  if (!clicked && n) { const btn = cards.first().locator('button, a').first(); if (await btn.count()) await btn.click(); else await cards.first().click(); }
  await page.waitForFunction(() => /^#\/t\//.test(location.hash), { timeout: 30_000 });
  await page.waitForTimeout(6000);
  await shot(page, 'gamenight-table', { settle: 2000 });
});
await attempt('gamenight sign out', async () => {
  await ctx.clearCookies();
});

// ── Home ──
const home = await ctx.newPage();
await attempt('home landing', async () => {
  await home.goto(HOME, { waitUntil: 'networkidle' });
  await shot(home, 'home-landing');
});
await attempt('home demo sign-in as Alice', async () => {
  const fold = home.locator('.demo-people-fold summary');
  await fold.waitFor({ timeout: 20_000 });
  await fold.click();
  await home.locator('.demo-people-fold button', { hasText: /Alice/ }).first().click();
  await home.waitForURL((u) => !/signin|onboard/i.test(u.toString()) || true, { timeout: 60_000 });
  await home.waitForTimeout(9000);
  await shot(home, 'home-today', { settle: 2000 });
});
const homeTry = async (label, matcher, name) => attempt(`home ${label}`, async () => {
  const link = home.locator('nav a, aside a, header a', { hasText: matcher }).first();
  await link.waitFor({ timeout: 10_000 });
  await link.click();
  await home.waitForTimeout(5000);
  await shot(home, name, { settle: 1500 });
});
await homeTry('work', /^Work$/, 'home-work');
await homeTry('library', /^Library$/, 'home-library');
await homeTry('messages', /Messages|Inbox/, 'home-messages');
await attempt('home org (Missio Nexus)', async () => {
  const org = home.locator('a, button', { hasText: /Missio Nexus/ }).first();
  await org.waitFor({ timeout: 10_000 });
  await org.click();
  await home.waitForTimeout(6000);
  await shot(home, 'home-org', { settle: 1500 });
});

// ── Skills registry + Discovery ──
const other = await ctx.newPage();
await attempt('skills', async () => { await other.goto(SKILLS, { waitUntil: 'networkidle' }); await shot(other, 'skills-landing', { settle: 2500 }); });
await attempt('discovery', async () => { await other.goto(DISCOVERY, { waitUntil: 'networkidle' }); await shot(other, 'discovery-landing', { settle: 3500 }); });

await browser.close();
log('done');
