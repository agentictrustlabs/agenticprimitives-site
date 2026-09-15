import type { Metadata } from 'next';
import Link from 'next/link';
import { BOM, BOM_TOTALS, CONTRACT_GROUPS, PRODUCT_WALL, PRODUCT_WALL_COUNT, SITE } from '@apsite/content';
import { pageMeta } from '@/lib/seo';
import { ProductWall } from '@apsite/diagrams';
import { Claim, Figure, Stat, Tag } from '@/components/ui';
import { GuideHead, GuideNote } from '@/components/GuideLayout';
import { GuidePager } from '@/components/GuideNav';
import { COMPARE_PAGES } from './pages';

export const metadata: Metadata = pageMeta({
  title: 'Versus — the stack you would buy, or one substrate',
  description: `An agentic solution assembled from products is ${PRODUCT_WALL_COUNT} vendors, three identity models, two permission shapes, three evidence formats and thirty-three contracts to write or fork — with a seam at every boundary. Or 77 packages and 33 contracts that already share one identity, one grant mechanism and one evidence trail.`,
  path: '/compare',
});

export default function Compare() {
  const solCount = CONTRACT_GROUPS.reduce((n, g) => n + g.contracts.length, 0);
  return (
    <>
      <GuideHead
        step="01 · The stack you would buy"
        title={<>An agentic solution takes {PRODUCT_WALL_COUNT} products. Or one substrate.</>}
        lede="Sign-in. Wallets. Accounts and custody. Scoped permissions. Private data. Credentials. An agent loop. Durable workflows. Tools. Agent-to-agent calls. Payments. Admission. Names. Discovery. Evidence. Each is a product you select, contract for, integrate — and then reconcile with the others, because each brings its own idea of who a user is, what a permission is, and what a log line means. We built it that way first. Below is the wall of products it took, band by band, with the seam each band drags in — and beside it the same needs as slots in one model."
      />

      <Figure dark caption={`Left: ${PRODUCT_WALL_COUNT} products in seven bands, one realistic pick per need. The dashed line under each band is the seam it introduces — a second identity model, a second permission shape, a third evidence format. Right: the substrate, the same needs as eight slots in one model. There is nothing to reconcile because there is only one identity, one grant mechanism and one evidence trail.`}>
        <ProductWall />
      </Figure>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow-dark text-rose-bright">Stitched — what it took the first time</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">{BOM_TOTALS.stitched.map((s) => <Stat key={s.label} dark value={s.value} label={s.label} note={s.note} />)}</div>
        </div>
        <div>
          <p className="eyebrow-dark">On the substrate — now</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">{BOM_TOTALS.substrate.map((s) => <Stat key={s.label} dark value={s.value} label={s.label} note={s.note} />)}</div>
        </div>
      </div>

      <div className="mt-12">
        <Claim attribution="Richard Pedersen — after building it the first time">The nightmare was never any one product. It was the thirty seams between them, every one of which was where a person became a token, the token became a row, and the row became a log line nobody could trace back to a decision.</Claim>
      </div>

      <section className="mt-16">
        <p className="eyebrow-dark">Product by product — what you would buy, what you would buy instead, and the packages that cover it here</p>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-slate-300">Every one of the 77 packages appears below exactly once, against the product it stands in for. Not because each row is impossible elsewhere — because here every row shares one identity, one delegation model and one evidence trail, and the seams between rows are where stitched stacks leak authority.</p>
        <div className="mt-6 space-y-10">
          {PRODUCT_WALL.map((b, i) => (
            <div key={b.band}>
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-white/10 pb-2">
                <h2 className="text-lg font-semibold text-white"><span className="num-mark mr-3 text-brass">0{i + 1}</span>{b.band}</h2>
                <span className="font-mono text-[11px] text-rose-bright">seam · {b.brings}</span>
              </div>
              <div className="ledger-dark">
                {b.products.map((p) => (
                  <div key={p.name} className="grid gap-3 py-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,1.6fr)]">
                    <div>
                      <div className="text-base font-semibold text-white">{p.name}</div>
                      <div className="text-xs text-slate-500">{p.need}</div>
                    </div>
                    <div className="text-sm text-slate-400"><span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">or · </span>{p.or}</div>
                    <div className="flex flex-wrap gap-1.5">{p.packages.map((k) => <a key={k} href={`${SITE.npmPackage}/@agenticprimitives/${k}`} rel="noreferrer"><Tag tone="dark">{k}</Tag></a>)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <p className="eyebrow-dark">And the {solCount} contracts you would otherwise write, fork or audit — already written, under audit, deployed as one set</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {CONTRACT_GROUPS.map((g) => (
            <div key={g.group} className="card-dark">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-base font-semibold text-white">{g.group}</h3>
                <span className="num-mark">{g.contracts.length}</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{g.note}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">{g.contracts.map((c) => <Tag key={c} tone="brass">{c}.sol</Tag>)}</div>
            </div>
          ))}
        </div>
        <GuideNote>Solidity 0.8.28 · ERC-4337 · ERC-7579 · ERC-7710 · ERC-1271 / 6492 · EIP-712 · P-256 / WebAuthn. Ported patterns, no runtime dependency on any third-party multisig or account kit. Deployed to faithchain with the ten typed name subregistries; deployable to any EVM.</GuideNote>
      </section>

      <section id="bom" className="mt-16">
        <details className="group">
          <summary className="cursor-pointer list-none">
            <span className="eyebrow-dark">The bill of materials, need by need — what you would assemble, what you would configure, where it bites, and what covers it here</span>
            <span className="ml-3 text-xs text-slate-500 group-open:hidden">show</span>
          </summary>
          <div className="ledger-dark mt-6">
            {BOM.map((r) => (
              <div key={r.need} className="grid gap-6 py-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)_minmax(0,1.3fr)]">
                <div>
                  <div className="text-lg font-semibold text-white">{r.need}</div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {r.packages.map((p) => <Tag key={p} tone="dark">{p}</Tag>)}
                    {r.contracts.map((c) => <Tag key={c} tone="brass">{c}.sol</Tag>)}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-rose-bright">Stitched</div>
                  <ul className="mt-2 space-y-1 text-[15px] text-slate-300">{r.products.map((p) => <li key={p}>— {p}</li>)}</ul>
                  <div className="mt-3 text-sm leading-relaxed text-slate-400"><span className="font-semibold text-slate-300">You configure:</span> {r.config}</div>
                  <div className="mt-2 text-sm leading-relaxed text-rose-200/80"><span className="font-semibold">The seam:</span> {r.seam}</div>
                </div>
                <div>
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-teal-300">On the substrate</div>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-100">{r.substrate}</p>
                </div>
              </div>
            ))}
          </div>
        </details>
      </section>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {COMPARE_PAGES.slice(1).map((p, i) => (
          <Link key={p.href} href={p.href} className="card-dark block hover:border-white/25">
            <span className="num-mark text-brass">0{i + 2}</span>
            <div className="mt-2 text-sm font-semibold text-white">{p.label}</div>
            <div className="mt-1 text-xs leading-relaxed text-slate-400">{p.sub}</div>
          </Link>
        ))}
      </div>

      <GuidePager pages={COMPARE_PAGES} current="/compare" last={{ href: '/examples/game-night', label: 'See it built: Game Night' }} />
    </>
  );
}
