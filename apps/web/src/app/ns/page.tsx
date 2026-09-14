import type { Metadata } from 'next';
import { SITE } from '@apsite/content';
import { Section } from '@/components/ui';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Ontology namespaces',
  description: 'The Agentic Primitives ontology namespaces: which module each prefix resolves to.',
  path: '/ns',
});

const MODULES: Array<[string, string, string]> = [
  ['ap', 'core', 'Smart Agents, party roles, custody, chartering'],
  ['aps', 'capability', 'CapabilityDefinition, grounding, advertised capabilities'],
  ['apix', 'interaction', 'Interaction, Exchange, Act, Commitment, Receipt'],
  ['apcoord', 'coordination', 'Endeavor, CoordinationPlan, ContributionCommitment'],
  ['apexec', 'execution', 'ExecutionPlan, runs, steps, trace bindings'],
  ['apguide', 'guidance', 'Agent Skill packages / playbooks'],
  ['apeng', 'engagement', 'projections, probes, offers, mandates'],
  ['apar', 'resolution', 'AgentServicePublication, resolution grants'],
  ['apdisc', 'discovery', 'capability matching, KB projection'],
  ['aporg', 'organization', 'Workspace, Team, membership situations'],
  ['apmsg', 'messaging', 'delivery and inbox projection'],
];

export default function Ns() {
  return (
    <Section eyebrow="Ontology" title="Namespaces" lede="IRIs of the form https://agenticprimitives.dev/ns/<module>#Term resolve to the module's T-box source. A content-negotiated server will replace the redirect; the IRIs will not change.">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead><tr className="border-b border-line text-xs uppercase tracking-wider text-slate-500"><th className="py-3 pr-4">Prefix</th><th className="py-3 pr-4">Namespace</th><th className="py-3">Covers</th></tr></thead>
          <tbody>
            {MODULES.map(([p, m, d]) => (
              <tr key={p} className="border-b border-line/70">
                <td className="py-3 pr-4 font-mono text-navy">{p}:</td>
                <td className="py-3 pr-4 font-mono text-xs"><a href={`/ns/${m}`} className="text-teal hover:underline">{SITE.url}/ns/{m}#</a></td>
                <td className="py-3 text-slate-600">{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-sm text-slate-500">JSON-LD context: <a href="/contexts/ap.jsonld" className="font-mono text-teal hover:underline">/contexts/ap.jsonld</a> · JSON Schemas: <a href="/schemas/" className="font-mono text-teal hover:underline">/schemas/</a></p>
    </Section>
  );
}
