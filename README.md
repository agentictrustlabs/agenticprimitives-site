# agenticprimitives.dev

The brand site for [Agentic Primitives](https://agenticprimitives.dev) — the trust substrate for agentic applications.

## Layout

```
apps/web            Next.js 16 site (App Router, Tailwind v4). Deployed to Vercel.
packages/content    The claims: pillars, offerings, stitched-vs-seamless, the Game Night case study, estate topology.
packages/diagrams   Architecture diagrams as pure React SVG components (no client JS; theme via CSS variables).
scripts/            screenshots.mjs — captures the live estate with the Home's demo people (Playwright).
```

Content lives in `packages/content` so that every page, diagram caption and comparison table cites one source.

## Develop

```sh
pnpm install
pnpm dev            # http://localhost:3000
pnpm typecheck
pnpm build
```

## Screenshots

`pnpm shots` drives gamenight.faithnet.io, www.faithnet.me, skills.faithnet.io and discovery.faithnet.io, signs in as a
demo persona where one is offered, and writes `apps/web/public/shots/*.png`. Playwright is resolved from
`PLAYWRIGHT_ROOT` (default `~/pokernight`) so this repo carries no browser download.

## Deploy

Vercel, connected to this repository — pushes to `main` deploy production. Root directory is `apps/web`;
`apps/web/vercel.json` pins the monorepo install/build (`cd ../.. && pnpm …`), the same shape as the Home. Domains: `agenticprimitives.dev` (canonical), `www` and
`agenticprimitives.io` redirect to it. `/ns/*`, `/schemas/*` and `/contexts/*` are reserved for the ontology IRIs
and redirect to their sources in the primitives repository.
