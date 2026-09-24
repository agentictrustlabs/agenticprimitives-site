import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { DEMO_PEOPLE, DEMOS, HOME_MCP_CONNECTOR, SITE } from '@apsite/content';
import { JsonLd, pageMeta } from '@/lib/seo';
import { Callout, CTA, Section, Shot, Tag } from '@/components/ui';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = pageMeta({
  title: 'Demos — eight live apps, one substrate',
  description:
    'Run Agentic Primitives live: the Home, your agent inside Claude, registry→Ligonier, Game Night, Gather27, Field, Verifiable Scripture and the skills registry — each with a script and what it proves.',
  path: '/demos',
});

const TOTAL_MIN = DEMOS.reduce((n, d) => n + d.minutes, 0);

function sectionNum(i: number) {
  return String(i + 1).padStart(2, '0');
}

export default function Demos() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Agentic Primitives demos',
          itemListElement: DEMOS.map((d, i) => ({ '@type': 'ListItem', position: i + 1, name: d.name, url: d.links[0]!.href.startsWith('http') ? d.links[0]!.href : `${SITE.url}${d.links[0]!.href}` })),
        }}
      />
      <PageHero
        eyebrow="Demos"
        title={<>One substrate.<br />Eight apps you can run right now.</>}
        lede="Every app here is a relying app of the same Home: it signs people in through faithnet.me, never holds a key, and every act it performs is a grant the person signed. Pick one, sign in as a demo person, follow the script. The whole tour is about half an hour."
        aside={
          <nav className="grid gap-2 text-sm" aria-label="Demos">
            {DEMOS.map((d, i) => (
              <a key={d.id} href={`#${d.id}`} className="card-dark flex items-center justify-between !p-4 hover:border-white/25">
                <span>
                  <span className="num-mark mr-3 text-brass">{sectionNum(i)}</span>
                  <span className="font-semibold text-white">{d.name}</span>
                  <span className="ml-2 text-slate-400">{d.kind}</span>
                </span>
                <span className="font-mono text-xs text-slate-500">{d.minutes} min</span>
              </a>
            ))}
            <div className="px-1 pt-1 font-mono text-xs text-slate-500">{TOTAL_MIN} minutes end to end</div>
          </nav>
        }
      >
        <Link href="/build/demo-people" className="btn-brass">The demo people</Link>
        <a href="https://faithnet.me" className="btn-outline-light" rel="noreferrer">Open the Home</a>
      </PageHero>

      <Section tone="cream" number="00" eyebrow="Before you start" title="Sign in as a demo person. Each one is a real Home.">
        <div className="grid gap-4 md:grid-cols-3">
          {DEMO_PEOPLE.slice(0, 3).map((p) => (
            <div key={p.handle} className="card">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-teal">{p.agent}</span>
                <Tag>{p.handle}</Tag>
              </div>
              <div className="mt-2 font-semibold text-navy">{p.name}</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.role}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate-500">
          Passkeys for the demo people are on the <Link href="/build/demo-people" className="text-teal hover:underline">demo people page</Link>. Everything below runs for play money on a test chain; nothing here is a real-money service.
        </p>
      </Section>

      {DEMOS.map((d, i) => (
        <Section key={d.id} id={d.id} tone={i % 2 === 0 ? 'white' : 'ink'} number={sectionNum(i)} eyebrow={d.kind} title={d.name} lede={d.line} wide>
          <div className="grid gap-10 md:grid-cols-[1.1fr_1fr]">
            <div>
              <p className={`text-[17px] leading-relaxed ${i % 2 === 0 ? 'text-slate-700' : 'text-slate-300'}`}>{d.blurb}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {d.links.map((l, j) => {
                  const ext = l.href.startsWith('http');
                  const cls = j === 0 ? 'btn-brass' : i % 2 === 0 ? 'btn-outline' : 'btn-outline-light';
                  return ext ? (
                    <a key={l.href} href={l.href} className={cls} target="_blank" rel="noreferrer">
                      {l.label} <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link key={l.href} href={l.href} className={cls}>{l.label}</Link>
                  );
                })}
              </div>
              {d.links.some((l) => l.note) && (
                <ul className={`mt-3 space-y-1 text-xs ${i % 2 === 0 ? 'text-slate-500' : 'text-slate-400'}`}>
                  {d.links.filter((l) => l.note).map((l) => (
                    <li key={l.href}><span className="font-semibold">{l.label}</span> — {l.note}</li>
                  ))}
                </ul>
              )}
              {(d.id === 'ask' || d.id === 'home-mcp2') && (
                <pre className={`mt-5 overflow-x-auto rounded-lg border p-4 font-mono text-xs ${i % 2 === 0 ? 'border-line bg-cream text-navy' : 'border-white/10 bg-white/5 text-slate-200'}`}>{HOME_MCP_CONNECTOR}</pre>
              )}
              {d.connect && (
                <div className="mt-6">
                  <div className={`eyebrow${i % 2 === 0 ? '' : '-dark'}`}>Connect in Claude</div>
                  <ol className={`mt-3 list-decimal space-y-1.5 pl-5 text-sm ${i % 2 === 0 ? 'text-slate-700' : 'text-slate-300'}`}>
                    {d.connect.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}
              {d.sampleQuery && (
                <div className="mt-6">
                  <div className={`eyebrow${i % 2 === 0 ? '' : '-dark'}`}>Sample query — paste into Claude</div>
                  <blockquote className={`mt-3 rounded-lg border p-4 text-sm leading-relaxed ${i % 2 === 0 ? 'border-line bg-cream text-navy' : 'border-white/10 bg-white/5 text-slate-200'}`}>
                    {d.sampleQuery}
                  </blockquote>
                </div>
              )}
              <div className="mt-8">
                <div className={`eyebrow${i % 2 === 0 ? '' : '-dark'}`}>What it proves</div>
                <ul className={`mt-3 space-y-2 text-sm ${i % 2 === 0 ? 'text-slate-700' : 'text-slate-300'}`}>
                  {d.proves.map((p) => (
                    <li key={p} className="flex gap-3"><span className="text-brass">—</span><span>{p}</span></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              {d.shot && (
                <Shot
                  dark={i % 2 !== 0}
                  src={d.shot.src}
                  alt={d.shot.alt}
                  caption={d.shot.caption}
                  width={d.shot.width}
                  height={d.shot.height}
                />
              )}
              <div className={`rounded-xl border p-6 ${i % 2 === 0 ? 'border-line bg-cream' : 'border-white/10 bg-white/[0.03]'}`}>
                <div className="flex items-center justify-between">
                  <span className={`eyebrow${i % 2 === 0 ? '' : '-dark'}`}>The script</span>
                  <span className={`font-mono text-xs ${i % 2 === 0 ? 'text-slate-500' : 'text-slate-400'}`}>
                    {d.signInAs ? `sign in as ${d.signInAs} · ` : ''}{d.minutes} min
                  </span>
                </div>
                <ol className={`mt-4 divide-y ${i % 2 === 0 ? 'divide-line' : 'divide-white/10'}`}>
                  {d.script.map((s, j) => (
                    <li key={j} className="grid grid-cols-[2rem_1fr] gap-3 py-4">
                      <span className={`num-mark pt-0.5 ${i % 2 === 0 ? 'text-slate-400' : 'text-white/40'}`}>{j + 1}</span>
                      <div>
                        <div className={`font-semibold ${i % 2 === 0 ? 'text-navy' : 'text-white'}`}>{s.do}</div>
                        <div className={`mt-1 text-sm leading-relaxed ${i % 2 === 0 ? 'text-slate-600' : 'text-slate-400'}`}>{s.expect}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Section>
      ))}

      <Section tone="cream" number={sectionNum(DEMOS.length)} eyebrow="If something refuses" title="Most refusals are ceremonies, not bugs.">
        <Callout tone="navy">
          <strong>authority_required</strong> means the act needs a signature the person has not given — follow the grant link to the Home and sign. <strong>member, not a steward</strong> means the person belongs to the organization but may not speak for it. A refusal after a revoke is the point: nothing was cached. The <Link href="/build/gates" className="underline">gates page</Link> lists every gate and who holds it.
        </Callout>
      </Section>

      <CTA title="Now build one." body="Every app on this page is a third-party relying app: it imports the published packages, signs people in through a Home, and never holds a key. The Build guide is five short pages." primary={{ href: '/build', label: 'Open the Build guide' }} secondary={{ href: '/examples/game-night', label: 'How Game Night did it' }} />
    </>
  );
}
