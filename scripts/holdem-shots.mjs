// Alice → Play → Deal me in (Texas hold’em) → a live hand.
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { homedir } from 'node:os';

const root = process.env.PLAYWRIGHT_ROOT ?? resolve(homedir(), 'pokernight');
const { chromium } = createRequire(resolve(root, 'package.json'))('playwright');
const OUT = resolve(import.meta.dirname, '../apps/web/public/shots');
mkdirSync(OUT, { recursive: true });

const GAMENIGHT = 'https://gamenight.faithnet.io';
const log = (s) => console.log(`· ${s}`);
const save = async (page, name, settle = 800) => {
  await page.waitForTimeout(settle);
  await page.screenshot({ path: resolve(OUT, `${name}.png`), fullPage: false });
  log(`saved ${name}.png`);
};

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1600, height: 1000 },
  deviceScaleFactor: 2,
  colorScheme: 'light',
});
const page = await ctx.newPage();
page.setDefaultTimeout(90_000);

await page.goto(`${GAMENIGHT}/#/signin`, { waitUntil: 'networkidle' });
await page.locator('.signin-demo summary').click();
await page.waitForSelector('.persona');
const alice = page.locator('.persona', { hasText: /Alice/i }).first();
if (!(await alice.count())) throw new Error('Alice is not in the demo roster');
const label = (await alice.locator('.persona-name').innerText()).trim();
log(`connecting as ${label}`);
await alice.click();
await page.waitForSelector('.play, .room', { timeout: 90_000 });
await page.waitForSelector('.play-poker', { timeout: 30_000 });
log('on Play');
await page.locator('.play-poker').scrollIntoViewIfNeeded();
await save(page, 'gamenight-play', 1200);

const holdem = page.locator('.play-poker');
await holdem.screenshot({ path: resolve(OUT, 'gamenight-holdem-deal.png') });
log('saved gamenight-holdem-deal.png');

await holdem.locator('button.primary', { hasText: /Deal me in/i }).click();
await page.waitForFunction(() => /#\/t\//.test(location.hash), { timeout: 60_000 });
log(`table ${page.url()}`);

await page.waitForSelector('.felt', { timeout: 60_000 });
const sitIn = page.locator('button.sit-in, button', { hasText: /^Sit in$/i }).first();
if (await sitIn.count()) {
  try { await sitIn.click({ timeout: 2000 }); log('pressed sit in'); } catch { /* already in */ }
}
// Wait until it is Alice's turn with hole cards showing.
await page.waitForFunction(
  () => {
    const sittingOut = /dealt in shortly|sat out after this hand/i.test(document.body.innerText);
    const live = Boolean(document.querySelector('.actions.live'));
    const faceUp = [...document.querySelectorAll('.card')].filter((c) => /[A2-9TJQK]/.test(c.textContent || '')).length;
    return !sittingOut && live && faceUp >= 2;
  },
  { timeout: 180_000 },
);
log('her turn, hole cards up');
// Coach usually speaks within a couple of seconds of the turn.
try {
  await page.waitForFunction(
    () => /call|fold|raise|check/i.test(document.querySelector('.coach, [class*=coach]')?.innerText ?? ''),
    { timeout: 12_000 },
  );
  log('coach spoke');
} catch {
  log('coach quiet — shooting anyway');
}
await save(page, 'gamenight-holdem-hand', 800);
await save(page, 'gamenight-table', 200);

await browser.close();
log('done');
