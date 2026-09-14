import { Arrow, Box, Brandline, C, Frame, Kicker, Label, Pill } from './primitives';

/**
 * UPPER ONTOLOGY → DOMAIN ONTOLOGY → ARCHETYPE → ARTIFACTS. One model, defined once, and every agent surface
 * projected from it: the A2A agent card advertises capability ids the ontology names; each SKILL.md declares which
 * classes it needs to know. Meaning flows down the ladder. Authority never does — that is a grant a person signs.
 */
export function OntologyLadder() {
  const id = 'ladder';
  const W = 1200, H = 640;
  const cols = [40, 276, 512, 748, 984] as const;
  const next = [276, 512, 748, 984] as const;
  const arrowTone = ['line', 'navy', 'teal', 'violet'] as const;
  const arrowLabel = ['grounds', 'imports · subclasses', 'bundles', 'projects'] as const;
  const cw = 196;
  return (
    <Frame id={id} w={W} h={H} title="From upper ontology to signed agent card: Agentic Trust → Texas hold'em → Hold'em Coach archetype → A2A capabilities and SKILL.md packages">
      <Kicker x={cols[0]} y={40} text="1 · foundations" tone="muted" />
      <Kicker x={cols[1]} y={40} text="2 · upper ontology" tone="navy" />
      <Kicker x={cols[2]} y={40} text="3 · domain ontology" tone="teal" />
      <Kicker x={cols[3]} y={40} text="4 · agent archetype" tone="violet" />
      <Kicker x={cols[4]} y={40} text="5 · published artifacts" tone="amber" />

      <Box x={cols[0]} y={64} w={cw} h={150} title="DOLCE · PROV-O · ep-plan" variant="header" tone="slate"
        lines={['dul:Description / dul:Situation', 'prov:Entity · Activity · Agent', 'p-plan:Plan · Step', '', 'the trichotomy nothing', 'may subsume across']} lineSize={11.5} />

      <Box x={cols[1]} y={64} w={cw} h={150} title="agentic-trust  (at:)" variant="header" tone="navy" titleMono
        lines={['46 semantic modules', 'Agents & Identity', 'Delegation & Authority', 'Skills & Capabilities', 'Provenance & Crypto Trust', 'Situations & Descriptions']} lineSize={11.5} />

      <Box x={cols[2]} y={64} w={cw} h={150} title="texas-holdem  (th:)" variant="header" tone="teal" titleMono
        lines={['14 modules · owl:imports at:', 'Coaching · The Hand · Advice', 'CoachService ⊑ at:ServiceAgent', 'StudyGrant ⊑ at:Delegation', 'Consultation ⊑ at:SkillInvocation', 'HandReview ⊑ at:Assessment']} lineSize={11.5} />

      <Box x={cols[3]} y={64} w={cw} h={150} title="holdem-coach" variant="header" tone="violet" titleMono
        lines={['a Service Agent a coach custodies', 'skills: holdem-preflop · -flop', '  -turn · -river · -memory · -review', 'capabilities: poker.advise', '  poker.review  (never poker.act)', 'knowledge.requires: 14 th: classes']} lineSize={11.5} />

      <Box x={cols[4]} y={64} w={cw} h={150} title="A2A signed agent card" variant="header" tone="amber"
        lines={['skills[] = capability ids', 'ES256 JWS · delegate key the', 'author authorised once', 'verifiable against the JWKS', '', 'SKILL.md packages by digest']} lineSize={11.5} />

      {next.map((nx, i) => {
        const x = nx - 236;
        return (
          <Arrow key={i} id={id} d={`M ${x + cw} 139 H ${nx - 2}`} tone={arrowTone[i] ?? 'line'}
            label={arrowLabel[i] ?? ''} lx={x + cw + 20} ly={130} labelSize={10} />
        );
      })}

      {/* What each rung answers */}
      <Label x={cols[0]} y={244} text="what kind of thing is it?" size={11} italic />
      <Label x={cols[1]} y={244} text="what does every agentic system have?" size={11} italic />
      <Label x={cols[2]} y={244} text="what does THIS domain have?" size={11} italic />
      <Label x={cols[3]} y={244} text="what does one agent bundle?" size={11} italic />
      <Label x={cols[4]} y={244} text="what does the world see?" size={11} italic />

      {/* One class, followed down the ladder */}
      <rect x={40} y={276} width={1120} height={150} rx={12} fill={C.slateSoft} stroke={C.faint} />
      <Kicker x={60} y={302} text="One thing, followed down the ladder — the study grant" tone="ink" />
      <Pill x={60} y={318} text="dul:Description → prov:Entity" tone="slate" size={10.5} mono />
      <Pill x={276} y={318} text="at:Delegation" tone="navy" size={10.5} mono solid />
      <Pill x={512} y={318} text="th:StudyGrant ⊑ at:Delegation" tone="teal" size={10.5} mono solid />
      <Pill x={748} y={318} text="knowledge.requires: [StudyGrant]" tone="violet" size={10.5} mono solid />
      <Pill x={984} y={318} text="card: advise · review" tone="amber" size={10.5} mono solid />
      <Label x={60} y={368} text="The coach reads her hands only under a grant she signed at her Home; the domain ontology says what the grant IS; the archetype declares it must know that class;" size={11.5} tone="ink" />
      <Label x={60} y={388} text="the SKILL.md for each street names it in knowledge.requires; the agent card advertises the two capabilities that need it. Change the class once and every surface moves." size={11.5} tone="ink" />
      <Label x={60} y={412} text="A SHACL shape on th:StudyGrant is checked at build — a playbook that names a class the ontology does not have fails to compile." size={11} italic />

      {/* Authority firewall */}
      <rect x={40} y={452} width={1120} height={128} rx={12} fill={C.paper} stroke={C.rose} strokeWidth={1.5} strokeDasharray="6 4" />
      <Kicker x={60} y={478} text="What flows down the ladder, and what never does" tone="rose" />
      <Label x={60} y={504} text="Meaning flows down: classes, shapes, capability ids, the words an Ask understands, the tools an agent may be given, what follows an act." size={12} tone="ink" />
      <Label x={60} y={526} text="Authority does not. An archetype grants nothing; a signed agent card grants nothing; a SKILL.md grants nothing. No verifier reads any of them." size={12} tone="ink" />
      <Label x={60} y={548} text="The only thing that lets the coach see Alice's hands is the StudyGrant — a delegation she signed, caveated, revocable in one transaction." size={12} tone="ink" weight={600} />
      <Pill x={880} y={468} text="behaviour is generated · authority never is" tone="rose" size={10.5} solid />
      <Brandline w={W} h={H} />
    </Frame>
  );
}
