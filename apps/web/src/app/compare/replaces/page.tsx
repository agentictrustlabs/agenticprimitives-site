import type { Metadata } from 'next';
import { BOM, BOM_TOTALS, CONTRACT_GROUPS, NEEDS, REPLACES, SITE } from '@apsite/content';
import { pageMeta } from '@/lib/seo';
import { StitchedVsSeamless } from '@apsite/diagrams';
import { Claim, Figure, Stat, Tag } from '@/components/ui';
import { GuideHead, GuideNote } from '@/components/GuideLayout';
import { GuidePager } from '@/components/GuideNav';
import { COMPARE_PAGES } from '../pages';

export const metadata: Metadata = pageMeta({
  title: 'Versus — what it replaces: 77 packages, 33 contracts, the bill of materials',
  description: 'Every one of the 77 @agenticprimitives packages next to the products you would otherwise stitch together; the 33 Solidity contracts grouped by concern; and the bill of materials from building it the other way first.',
  path: '/compare/replaces',
});

export default function Replaces() {
  const pkgCount = REPLACES.reduce((n, r) => n + r.packages.length, 0);
  const solCount = CONTRACT_GROUPS.reduce((n, g) => n + g.contracts.length, 0);
  return (
    <>
      <GuideHead step="05 · What it replaces" title={<>{pkgCount} packages. {solCount} contracts. One identity, one grant, one evidence trail.</>} lede="An exhaustive map: every package in the repository appears in exactly one row below, next to the products or projects you would otherwise integrate for that job. The point is not that any row is impossible elsewhere. The point is that here every row shares one identity, one delegation model and one evidence trail — and the seams between rows are exactly where stitched stacks leak authority." />

      <Figure dark caption="The same needs, twice. On the left each product brings its own identity model, permission shape and audit format. On the right the needs are slots in one model.">
        <StitchedVsSeamless />
      </Figure>

      <section className="mt-12">
        <p className="eyebrow-dark">Package by package — you would normally integrate … here it is …</p>
        <div className="ledger-dark mt-4">
          {REPLACES.map((r) => (
            <div key={r.instead} className="grid gap-3 py-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_minmax(0,1fr)]">
              <div className="text-sm font-semibold leading-relaxed text-slate-200">{r.instead}</div>
              <div className="flex flex-wrap gap-1.5">{r.packages.map((p) => <a key={p} href={`${SITE.npmPackage}/@agenticprimitives/${p}`} rel="noreferrer"><Tag tone="dark">{p}</Tag></a>)}</div>
              <p className="text-sm leading-relaxed text-slate-400">{r.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <p className="eyebrow-dark">The contracts — Solidity 0.8.28, deployed to faithchain, deployable to any EVM</p>
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
        <GuideNote>Standards implemented: ERC-4337 · ERC-7579 · ERC-7710 · ERC-1271 / 6492 · EIP-712 · P-256 / WebAuthn. Ported patterns (Safe signature packing), no runtime dependency on any third-party multisig or account kit. Deployed as one set with the ten typed name subregistries; audited in the open with the findings ledger public.</GuideNote>
      </section>

      <section id="bom" className="mt-20">
        <p className="eyebrow-dark">The bill of materials — we assembled it from products once</p>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-slate-300">Before this substrate existed, we built the same capability set the way everyone does: a product for every need, a contract for each, an integration for each, and then the reconciliation of the identity models, permission shapes and audit formats they each brought. This is the tally.</p>
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow-dark text-rose-bright">Stitched — the first time</p>
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

        <details className="group mt-12">
          <summary className="cursor-pointer list-none">
            <span className="eyebrow-dark">Need by need — what you would assemble, configure, where it bites, and what covers it here</span>
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

        <details className="group mt-8">
          <summary className="cursor-pointer list-none">
            <span className="eyebrow-dark">The ten needs, stitched vs on the substrate — the short form</span>
            <span className="ml-3 text-xs text-slate-500 group-open:hidden">show</span>
          </summary>
          <div className="ledger-dark mt-6">
            {NEEDS.map((n) => (
              <div key={n.need} className="grid gap-3 py-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)]">
                <div className="text-sm font-semibold text-white">{n.need}<div className="mt-1 text-xs font-normal text-slate-500">{n.why}</div></div>
                <div className="text-sm text-slate-400"><span className="font-mono text-[10px] uppercase tracking-[0.14em] text-rose-bright">stitched · </span>{n.stitched}</div>
                <div className="text-sm text-slate-200"><span className="font-mono text-[10px] uppercase tracking-[0.14em] text-teal-300">here · </span>{n.seamless}</div>
              </div>
            ))}
          </div>
        </details>
      </section>

      <GuidePager pages={COMPARE_PAGES} current="/compare/replaces" last={{ href: '/examples/game-night', label: 'See it built: Game Night' }} />
    </>
  );
}
