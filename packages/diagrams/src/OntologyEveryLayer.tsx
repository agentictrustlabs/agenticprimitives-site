import { Arrow, Box, Brandline, C, Frame, Kicker, Label, MONO, Pill } from './primitives';

/**
 * THE ONTOLOGY IS THE SPINE. Every layer of the architecture — the conversation, the harness, the card, the vault,
 * the interaction, the receipt, the chain — binds to the same T-box by IRI. Nothing describes the domain twice.
 * Meaning flows through the spine; authority never does.
 */
export function OntologyEveryLayer() {
  const id = 'every-layer';
  const W = 1200, H = 760;
  const L = { x: 40, w: 500, h: 68, gap: 10, y0: 72 };
  const spine = { x: 578, w: 64, y: 64, h: 598 };
  const R = { x: 690, w: 470 };

  const layers = [
    { t: 'Ask · the conversation', l: ['who is "alice"? which account pays? what is "20 USDC"?', 'a party is a KIND + a RELATION to follow, never a name match'], bind: 'party-roles · arg-types · decisions', tone: 'amber' },
    { t: 'Harness · playbooks · plans', l: ['SKILL.md knowledge.requires names classes, not prose', 'a fan-out runs only over a modelled, bounded relation'], bind: 'plan-shapes · capability ids', tone: 'violet' },
    { t: 'Agent cards · discovery', l: ['capabilities[] → A2A skills[] — projected, never typed', 'the public KB is RDF; a question is a CONSTRUCT query'], bind: 'agent-profile · apdisc:', tone: 'teal' },
    { t: 'Vault records', l: ['every record key IS a T-box class — Endeavor, Invitation, Grant', 'a question compiles to a selector run inside the store'], bind: 'vault-records', tone: 'navy' },
    { t: 'Interaction · coordination', l: ['apix:Interaction / Exchange · apcoord:Endeavor / Plan', 'SHACL constrains structure — an unauthorized act stays valid'], bind: 'interaction.ttl · coordination.ttl', tone: 'slate' },
    { t: 'Provenance · receipts', l: ['a run is a JSON-LD ep-plan:ExecutionTraceBundle', 'a span IS a prov:Activity and names it'], bind: 'run-provenance.jsonld', tone: 'rose' },
    { t: 'Identity · the chain', l: ['Person · Organization · Service — PROV-O\u2019s trichotomy', 'mirrored by atl:agentType on chain; a name suffix names the type'], bind: 'identity.ttl · naming.ttl', tone: 'paper' },
  ] as const;

  const tiers = [
    { y: 72, h: 104, t: 'upper · DOLCE · PROV-O · EP-Plan · GC', tone: 'slate', l: ['dul:Description · dul:Situation · dul:Category', 'prov:Agent · prov:Activity · prov:Entity', 'p-plan:Plan · p-plan:Step — what kind of thing is it?'] },
    { y: 206, h: 132, t: 'agentic-trust (at:)  ⇄  @agenticprimitives/ontology (ap:)', tone: 'navy', l: ['46 semantic modules  ·  39 T-box files, one per concern', 'Agent · Delegation · Intent · Endorsement · Situation · Skill', 'at: grounds on ap: by rdfs:seeAlso — one meaning, two homes', 'what does EVERY agentic system have?'] },
    { y: 368, h: 132, t: 'texas-holdem (th:)  ·  owl:imports at: · card-room', tone: 'teal', l: ['14 modules: Rules · Room · Cards · Hand · Coaching · Chips …', 'th:CoachService ⊑ cr:CoachService ⊑ at:ServiceAgent', 'th:StudyGrant ⊑ cr:StudyGrant ⊑ at:Delegation', 'what does THIS domain have?'] },
    { y: 530, h: 104, t: 'holdem-coach  ·  the archetype', tone: 'violet', l: ['knowledge.requires: 14 th: classes — the coach can only mean those', 'capabilities: poker.advise · poker.review  (never poker.act)', 'compiled to a definition by digest; assigned at a Home'] },
  ] as const;

  return (
    <Frame id={id} w={W} h={H} title="The ontology as the spine of the architecture: seven layers bind to one T-box by IRI; the T-box grounds on upper ontologies and is extended by a domain ontology and an archetype">
      <Kicker x={L.x} y={48} text="the architecture — every layer binds to the spine" tone="ink" />
      <Kicker x={R.x} y={48} text="the ontology — one meaning, from upper to archetype" tone="navy" />

      {/* the spine */}
      <rect x={spine.x} y={spine.y} width={spine.w} height={spine.h} rx={14} fill={C.navy} />
      <text transform={`translate(${spine.x + spine.w / 2 + 5}, ${spine.y + spine.h / 2}) rotate(-90)`} textAnchor="middle" fontSize={12.5} fontWeight={700} fill={C.paper} fontFamily={MONO} letterSpacing={2.5}>ONE T-BOX · BOUND BY IRI · NEVER RE-DESCRIBED</text>

      {layers.map((ly, i) => {
        const y = L.y0 + i * (L.h + L.gap);
        const my = y + L.h / 2;
        return (
          <g key={ly.t}>
            <Box x={L.x} y={y} w={L.w} h={L.h} title={ly.t} variant="header" tone={ly.tone} lines={ly.l} lineSize={11} titleSize={12.5} />
            <Arrow id={id} d={`M ${L.x + L.w + 2} ${my} H ${spine.x - 2}`} tone="navy" width={1.5} />
            <text x={L.x + L.w - 10} y={y + 13} fontSize={9} fill={C.paper} textAnchor="end" fontFamily={MONO} opacity={0.85}>{ly.bind}</text>
          </g>
        );
      })}

      {tiers.map((tr, i) => (
        <g key={tr.t}>
          <Box x={R.x} y={tr.y} w={R.w} h={tr.h} title={tr.t} variant="header" tone={tr.tone} titleMono lines={tr.l} lineSize={11.5} titleSize={12.5} />
          {i < tiers.length - 1 && (
            <Arrow id={id} d={`M ${R.x + R.w / 2} ${tr.y + tr.h + 2} V ${(tiers[i + 1]?.y ?? tr.y + tr.h + 30) - 2}`} tone={i === 0 ? 'line' : i === 1 ? 'navy' : 'teal'}
              label={i === 0 ? 'grounds' : i === 1 ? 'imports · subclasses' : 'bundles'} lx={R.x + R.w / 2 + 14} ly={tr.y + tr.h + 19} labelSize={10} anchor="start" />
          )}
        </g>
      ))}

      {/* spine → ontology */}
      <Arrow id={id} d={`M ${spine.x + spine.w + 2} 272 H ${R.x - 2}`} tone="navy" width={2} label="is" lx={spine.x + spine.w + 24} ly={264} labelSize={10} />
      <Arrow id={id} d={`M ${spine.x + spine.w + 2} 434 H ${R.x - 2}`} tone="teal" width={2} dashed label="extends" lx={spine.x + spine.w + 24} ly={452} labelSize={10} />

      {/* the two invariants */}
      <rect x={40} y={676} width={1120} height={50} rx={10} fill={C.roseSoft} stroke={C.rose} />
      <Label x={60} y={696} text="Meaning flows through the spine. Authority never does." tone="rose" weight={700} size={12.5} />
      <Label x={60} y={714} text="It says what a thing IS and IS NOT; only a signed, caveated grant says what MAY happen. No verifier reads a term as permission." size={11} tone="ink" />
      <Pill x={942} y={686} text="pnpm check:ontology-bindings" tone="rose" size={10.5} mono solid />
      <Label x={942} y={719} text="an undeclared IRI fails the build" size={9.5} tone="rose" />

      <Brandline w={W} h={H} left="the ontology is the architecture's one description of the world" />
    </Frame>
  );
}
