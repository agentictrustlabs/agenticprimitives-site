// Alice → skills.faithnet.io → upper ontology (Agentic Trust) module graph → domain ontology
// (Texas hold'em) module graph → the Hold'em Coach archetype → its capabilities.
//
// Signs in the way the skills e2e harness does: the platform's `/connect/demo-signin` mints the same
// AgentSession JWT the ceremony would, seeded where the app already reads it. No new auth surface.
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const OUT = resolve(import.meta.dirname, '../apps/web/public/shots');
mkdirSync(OUT, { recursive: true });

const HOME = 'https://www.faithnet.me';
const SKILLS = process.env.SKILLS_APP ?? 'https://skills.faithnet.io';
const SESSION_KEY = 'faithchain.session';
const log = (s) => console.log(`· ${s}`);

const r = await fetch(`${HOME}/connect/demo-signin`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ handle: 'alice', client_id: 'skills-app' }),
});
if (!r.ok) throw new Error(`demo-signin failed (${r.status})`);
const { id_token } = await r.json();
log('minted alice session');

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2, colorScheme: 'dark' });
await ctx.addInitScript(([k, v]) => localStorage.setItem(k, v), [SESSION_KEY, JSON.stringify({ handle: 'alice', token: id_token })]);
const page = await ctx.newPage();
page.setDefaultTimeout(90_000);

const save = async (name, settle = 1200, clip) => {
  await page.waitForTimeout(settle);
  await page.screenshot({ path: resolve(OUT, `${name}.png`), fullPage: false, ...(clip ? { clip } : {}) });
  log(`saved ${name}.png`);
};

async function pickDomain(id) {
  const sel = page.locator('select.domain-picker-select');
  await sel.waitFor();
  await page.waitForFunction((id) => [...document.querySelector('select.domain-picker-select').options].some((o) => o.value === id), id);
  await sel.selectOption(id);
  await page.waitForTimeout(800);
  log(`domain ${id}`);
}

async function openModuleGraph(moduleLabel) {
  await page.locator('[data-testid=nav-ontology]').click();
  await page.locator('.ontree-tabs button', { hasText: /^Modules$/ }).click();
  const row = page.locator('.cluster-row', { hasText: moduleLabel }).first();
  await row.waitFor();
  await row.click();
  // Cytoscape draws into a canvas; give layout time to settle.
  await page.waitForSelector('.ograph-canvas canvas');
  await page.waitForTimeout(2500);
  log(`module ${moduleLabel}`);
}

await page.goto(SKILLS, { waitUntil: 'networkidle' });
await page.waitForSelector('[data-testid=nav-ontology]');
log('signed in as alice');

// 1 · Upper ontology: Agentic Trust → Delegation & Authority
await pickDomain('agentic-trust');
await openModuleGraph('Delegation & Authority');
await save('skills-upper-delegation', 800);

// 2 · Domain ontology: Texas hold'em → Coaching
await pickDomain('texas-holdem');
await page.locator('[data-testid=nav-overview]').click();
await page.waitForTimeout(3000);
await save('skills-overview', 600);
await openModuleGraph('Coaching');
await save('skills-holdem-coaching', 800);

// 3 · Archetypes for the domain (Hold'em Coach)
await page.locator('[data-testid=nav-archetypes]').click();
await page.waitForTimeout(2500);
await save('skills-holdem-archetypes', 600);

// 4 · Capabilities for the domain
await page.locator('[data-testid=nav-capabilities]').click();
await page.waitForTimeout(2500);
await save('skills-holdem-capabilities', 600);

// 5 · SKILL.md packages linked to the domain
await page.locator('[data-testid=nav-skills]').click();
await page.waitForTimeout(2500);
await save('skills-holdem-skills', 600);

// 6 · The Hold'em Coach's signed A2A agent card
await page.locator('[data-testid=nav-agents]').click();
const coach = page.locator('.card', { hasText: /^Hold'em Coach/ }).first();
await coach.waitFor();
await coach.click();
await page.waitForTimeout(3000);
await save('skills-holdem-agent-card', 600);

await browser.close();
log('done');
