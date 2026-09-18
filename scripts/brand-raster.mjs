import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { homedir } from 'node:os';

const { chromium } = createRequire(resolve(homedir(), 'pokernight/package.json'))('playwright');
const base = process.env.BASE ?? 'http://localhost:3123';
const out = resolve(import.meta.dirname, '../apps/web/public');

const shots = [
  { path: '/brand/export/og', file: 'og.png', w: 1200, h: 630 },
  { path: '/brand/export/og-writing', file: 'brand/og-writing.png', w: 1200, h: 630 },
  { path: '/brand/export/banner', file: 'brand/banner-1500.png', w: 1500, h: 500 },
  { path: '/brand/export/avatar', file: 'brand/avatar-400.png', w: 400, h: 400 },
  { path: '/brand/export/card', file: 'brand/card-square.png', w: 1080, h: 1080 },
  { path: '/brand/export/icon', file: 'brand/icon-512.png', w: 512, h: 512 },
  { path: '/brand/export/icon', file: 'brand/apple-touch-icon.png', w: 180, h: 180 },
  { path: '/brand/export/lockup-dark', file: 'brand/lockup-dark.png', w: 2000, h: 480 },
  { path: '/brand/export/lockup-light', file: 'brand/lockup-light.png', w: 2000, h: 480 },
  { path: '/brand/export/linkedin-cover', file: 'brand/linkedin-cover-1128x191.png', w: 1128, h: 191, scale: 2 },
  { path: '/brand/export/linkedin-logo', file: 'brand/linkedin-logo-400.png', w: 400, h: 400 },
];

const svgs = [
  { src: 'brand/mark-light.svg', file: 'brand/mark-white.png', size: 512 },
  { src: 'brand/mark.svg', file: 'brand/mark-navy.png', size: 512 },
];

const browser = await chromium.launch();
for (const s of shots) {
  const page = await browser.newPage({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: s.scale ?? 1 });
  await page.goto(base + s.path, { waitUntil: 'networkidle' });
  const el = page.locator('#frame');
  await el.waitFor();
  await el.screenshot({ path: resolve(out, s.file), type: 'png' });
  console.log('wrote', s.file);
  await page.close();
}

const { readFileSync } = await import('node:fs');
for (const s of svgs) {
  const svg = readFileSync(resolve(out, s.src), 'utf8').replace('<svg', `<svg width="${s.size}" height="${s.size}"`);
  const page = await browser.newPage({ viewport: { width: s.size, height: s.size }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html><body style="margin:0;background:transparent">${svg}</body></html>`);
  await page.screenshot({ path: resolve(out, s.file), type: 'png', omitBackground: true });
  console.log('wrote', s.file);
  await page.close();
}
await browser.close();
