// Render brand diagrams to static SVG files so a Markdown note can show them as images — and so a page can embed a
// heavy figure as <img> instead of inline markup (an inline server-rendered SVG is sent twice: once as HTML, once
// again inside the React flight payload; the home page was 556 KB of HTML for that reason).
//   pnpm --filter @apsite/web exec tsx scripts/render-diagrams.mts <outDir> [<outDir2> ...]
// Each diagram is written twice: `<name>.svg` on the light palette and `<name>-dark.svg` on the dark one.
// CSS variables are resolved: a standalone <img> has no site theme to read.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ChainBoundary, ChainsAndEstates, CrossEstateAct, EstateBlock, EstateCommons, EstateResidents, Federation, IsoTown, NandaLayers, PrincipalAcrossChains, Scales, StitchedVsSeamless, SubstrateLayers, TownScene } from '@apsite/diagrams';

const FILES: Record<string, () => React.JSX.Element> = {
  'estate-block': () => createElement(EstateBlock),
  'estate-residents': () => createElement(EstateResidents),
  'estate-commons': () => createElement(EstateCommons),
  'federation': () => createElement(Federation),
  'cross-estate-act': () => createElement(CrossEstateAct),
  'nanda-layers': () => createElement(NandaLayers),
  'chains-and-estates': () => createElement(ChainsAndEstates),
  'chain-boundary': () => createElement(ChainBoundary),
  'principal-across-chains': () => createElement(PrincipalAcrossChains),
  'scales': () => createElement(Scales),
  'substrate-layers': () => createElement(SubstrateLayers),
  'stitched-vs-seamless': () => createElement(StitchedVsSeamless),
  'town-street': () => createElement(TownScene, { beat: 0 }),
  'town-act': () => createElement(TownScene, { beat: 4 }),
  'town-revoke': () => createElement(TownScene, { beat: 6 }),
  'town-federation': () => createElement(TownScene, { beat: 7 }),
  'iso-town': () => createElement(IsoTown, { beat: 0 }),
  'iso-town-patient': () => createElement(IsoTown, { beat: 1 }),
  'iso-town-window': () => createElement(IsoTown, { beat: 4 }),
  'iso-town-day': () => createElement(IsoTown, { beat: 6 }),
};

// Mirrors `.figure-dark` in apps/web/src/app/globals.css. Keep in step.
const DARK: Record<string, string> = {
  '--dg-ink': '#e8eef7', '--dg-muted': '#93a4bd', '--dg-line': '#3b4d68', '--dg-faint': '#1b2a40', '--dg-paper': '#0f1d31',
  '--dg-navy': '#8db4ff', '--dg-navy-soft': '#13284a', '--dg-teal': '#2dd4bf', '--dg-teal-soft': '#0d2f31',
  '--dg-amber': '#e0b062', '--dg-amber-soft': '#33270f', '--dg-rose': '#fb7185', '--dg-rose-soft': '#3a1420',
  '--dg-violet': '#b79bff', '--dg-violet-soft': '#241a45', '--dg-slate-soft': '#14233a', '--dg-bg': '#07101c',
};

const resolveVars = (svg: string, palette?: Record<string, string>): string => {
  let out = svg;
  for (let i = 0; i < 3; i++) out = out.replace(/var\((--[\w-]+),\s*([^()]*?)\)/g, (_, name: string, fallback: string) => palette?.[name] ?? fallback);
  return out;
};

const dirs = process.argv.slice(2);
if (!dirs.length) throw new Error('usage: render-diagrams.mts <outDir> [<outDir2> ...]');
for (const dir of dirs) {
  mkdirSync(dir, { recursive: true });
  for (const [name, make] of Object.entries(FILES)) {
    const svg = renderToStaticMarkup(make());
    writeFileSync(join(dir, `${name}.svg`), `<?xml version="1.0" encoding="UTF-8"?>\n${resolveVars(svg)}\n`);
    writeFileSync(join(dir, `${name}-dark.svg`), `<?xml version="1.0" encoding="UTF-8"?>\n${resolveVars(svg, DARK)}\n`);
  }
  console.log(`wrote ${Object.keys(FILES).length} diagrams (light + dark) to ${dir}`);
}
