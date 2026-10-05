// Render brand diagrams to static SVG files so a Markdown note can show them as images.
//   pnpm --filter @apsite/web exec tsx scripts/render-diagrams.mts <outDir> [<outDir2> ...]
// CSS variables are resolved to their fallbacks: a standalone <img> has no site theme to read.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ChainBoundary, ChainsAndEstates, CrossEstateAct, EstateBlock, EstateCommons, EstateResidents, Federation, NandaLayers, PrincipalAcrossChains, Scales, TownScene } from '@apsite/diagrams';

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
  'town-street': () => createElement(TownScene, { beat: 0 }),
  'town-act': () => createElement(TownScene, { beat: 4 }),
  'town-revoke': () => createElement(TownScene, { beat: 6 }),
  'town-federation': () => createElement(TownScene, { beat: 7 }),
};

const resolveVars = (svg: string): string => {
  let out = svg;
  for (let i = 0; i < 3; i++) out = out.replace(/var\(--[\w-]+,\s*([^()]*?)\)/g, '$1');
  return out;
};

const dirs = process.argv.slice(2);
if (!dirs.length) throw new Error('usage: render-diagrams.mts <outDir> [<outDir2> ...]');
for (const dir of dirs) {
  mkdirSync(dir, { recursive: true });
  for (const [name, make] of Object.entries(FILES)) {
    const svg = resolveVars(renderToStaticMarkup(make()));
    writeFileSync(join(dir, `${name}.svg`), `<?xml version="1.0" encoding="UTF-8"?>\n${svg}\n`);
  }
  console.log(`wrote ${Object.keys(FILES).length} diagrams to ${dir}`);
}
