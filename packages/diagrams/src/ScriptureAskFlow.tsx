import { Arrow, Band, Box, Brandline, C, Frame, Glyph, Kicker, Label } from './primitives';

/**
 * ASK SCRIPTURE THROUGH YOUR OWN AGENT. The Bible Explorer sends only the question; the person's own agent
 * (at the runtime, under a wire limited to `harness.ask`) runs its person-steward playbook, reads the person's
 * context from THEIR vault over THEIR MCP, engages scripture-resolver.svc over A2A as them, and the Scripture
 * Agent answers from the signed corpus behind its own content MCP — every verse resolved, commitment-checked
 * and signed before it comes back. The two skill planes that make each agent what it is sit underneath.
 */
export function ScriptureAskFlow() {
  const id = 'scripture-ask';
  const W = 1240, H = 1010;
  return (
    <Frame id={id} w={W} h={H} title="Ask Scripture through your own agent: the Explorer sends the question, the person's agent engages the Scripture Agent as them, every verse is verified in the signed corpus, and the answer comes back in the person's context">
      {/* ── Column headers ── */}
      <Label x={40} y={30} text="THE EXPLORER (relying app)" size={11} weight={700} tone="ink" />
      <Label x={372} y={30} text="THE PERSON'S OWN AGENT" size={11} weight={700} tone="navy" />
      <Label x={790} y={30} text="THE SCRIPTURE AGENT + ITS CORPUS" size={11} weight={700} tone="teal" />
      <line x1={356} y1={38} x2={356} y2={620} stroke={C.faint} strokeDasharray="6 5" />
      <line x1={776} y1={38} x2={776} y2={620} stroke={C.faint} strokeDasharray="6 5" />

      {/* ── Column 1: Explorer + Home ── */}
      <g><Glyph x={52} y={58} kind="app" /><Box x={40} y={46} w={300} h={128} title="      explorer.faithnet.io · Ask tab" lines={[
        'demo-bible-ontology (Cloudflare Worker + UI)',
        'sends the QUESTION and the ask-as-me wire — nothing else',
        'who the reader is lives in HER vault (scripture-profile),',
        'edited on the Profile tab, never posted from this page',
        'renders the answer + every citation, each with Verify',
      ]} tone="slate" lineSize={10.5} /></g>

      <Box x={40} y={196} w={300} h={118} title="Explorer backend · POST /ask/as-me" lines={[
        'the Scripture Agent worker, wearing its relying-app hat',
        'holds no person key · signs ONE caller assertion with the',
        'Explorer ask key (an AKCS delegate of scripture-resolver.svc)',
        'message: “ask scripture-resolver.svc: <question>”',
        'plan: one routed step · engagement.agent.invoke',
      ]} tone="slate" lineSize={10.5} titleMono />

      <g><Glyph x={52} y={352} kind="person" /><Box x={40} y={340} w={300} h={110} title="      Home · www.faithnet.me" lines={[
        'the ONE authorization: “Let my agent ask for me”',
        'an ask-as-me wire — ERC-7710 delegation, delegator = alice.me,',
        'caveat = harness.ask only · revocable at her Home',
        'her scripture-profile is written to her vault here',
      ]} tone="navy" lineSize={10.5} /></g>

      <Box x={40} y={474} w={300} h={118} title="What comes back to the page" lines={[
        '“Asked through your own agent · run <runRef>”',
        'the answer, composed for who she is',
        'Scripture behind the answer — N verses, each verified:',
        'resolved → commitment ✓ → citation signed by the agent',
        'passages that did not survive are LISTED, not hidden',
      ]} tone="paper" lineSize={10.5} />

      {/* ── Column 2: the person's agent ── */}
      <g><Glyph x={384} y={58} kind="person" /><Box x={372} y={46} w={384} h={118} title="      alice.me · agent runtime · a2a.faithnet.io" lines={[
        'POST /harness/ask under the App-Delegation scheme (spec 397)',
        'admits the wire on chain: delegator = her SA · caveat = harness.ask',
        'the assertion is spent ONCE · the run is HERS (runRef, trace)',
        'reads her playbook: person-steward, pinned by definition digest',
      ]} tone="navy" lineSize={10.5} /></g>

      <Box x={372} y={186} w={184} h={132} title="her MCP · mcp.faithnet.io" lines={[
        'HER vault, her key binding',
        'vault:scripture-profile',
        '{ role, situation, name }',
        'read under her delegation',
        'conversation memory · receipts',
        'the record; the page holds none',
      ]} tone="navy" lineSize={10} titleMono />

      <Box x={572} y={186} w={184} h={132} title="discovery.agent.inspect" lines={[
        'scripture-resolver.svc by NAME',
        'its records on chain say where',
        'the card is (atl:cardUri) and',
        'what pins it (digest)',
        'served card ≠ pin → say so',
        'public facts — never authority',
      ]} tone="paper" lineSize={10} titleMono />

      <Box x={372} y={340} w={384} h={118} title="engagement.agent.invoke — as her, under her standing" lines={[
        'one A2A message to the service: the question + a data part',
        '{ context: { role, situation } } — today the question alone;',
        'the rule that attaches her scripture-profile is the open item',
        'caller assertion signed for this hop · traceparent carried',
        'the reply is an OBSERVATION of hers: untrusted, source named',
      ]} tone="amber" lineSize={10.5} titleMono />

      <Box x={372} y={480} w={384} h={112} title="compose in her context · record the hop" lines={[
        'the service’s answer + verified citations land in HER run',
        'the receipt names: who asked, the wire, the step, the playbook',
        'digest, the target and its card digest, the run reference',
        'provenance (PROV-O) readable at /harness/provenance',
        'nothing here authorized anything — the wire only let her ASK',
      ]} tone="paper" lineSize={10.5} />

      {/* ── Column 3: Scripture Agent + content MCP ── */}
      <g><Glyph x={802} y={58} kind="service" /><Box x={790} y={46} w={410} h={118} title="      scripture-resolver.svc · scripture.faithnet.io" lines={[
        'demo-bible-a2a — a Service Agent with its own Smart Agent + A2A card',
        'card skills: ask-scripture · resolve-scripture-passage · verify ·',
        'character-trust-profile · find-entities · entity-graph',
        'reader roles: new believer · seeker · growing · … (shape, not gate)',
      ]} tone="teal" lineSize={10.5} /></g>

      <Box x={790} y={186} w={410} h={132} title="THE SKILL · plan → resolve → verify → grade → compose" lines={[
        '1  plan: which passages bear on the question, for THIS reader',
        '2  resolve EACH through the corpus — never from the model’s memory',
        '3  commitment checked against the issuer descriptor; citation SIGNED',
        '4  grade: does the actual text, in context, support the claimed use?',
        '5  compose from the verified texts only; “no” grades are dropped',
        'transparency log per run · passages not used are returned',
      ]} tone="teal" lineSize={10.5} />

      <Box x={790} y={340} w={410} h={118} title="content MCP · demo-bible-mcp (private, behind the agent)" lines={[
        'the canonical BSB corpus — the single source of verse text',
        'issuer descriptors + block commitments per passage (Merkle)',
        'licensed editions (LBSB) gated by entitlement — public BSB is open',
        'the KMS citation signer: the SA-signed leaf names the delegate key;',
        'the worker holds no key — the MCP signs AS scripture-resolver.svc',
      ]} tone="teal" lineSize={10.5} titleMono />

      <Box x={790} y={480} w={410} h={112} title="what travels back — verifiable by anyone" lines={[
        'per verse: reference · edition · descriptor id · commitment ✓/⚠ ·',
        'citation (signed, with the delegating signer) · support grade',
        'POST /verify re-checks the signature against the leaf’s delegate',
        'key and the SA that signed the leaf (ERC-1271) — no trust in the page',
      ]} tone="paper" lineSize={10.5} />

      {/* ── Numbered arrows: the ask ── */}
      <Arrow id={id} d="M 190 174 V 194" tone="ink" label="1  question" lx={200} ly={189} anchor="start" labelSize={9} />
      <Arrow id={id} d="M 190 314 V 338" tone="navy" dashed label="once: sign the wire" lx={200} ly={331} anchor="start" labelSize={9} />
      <Arrow id={id} d="M 340 236 C 356 236, 356 110, 370 110" tone="ink" label="2  /harness/ask · App-Delegation" lx={356} ly={168} labelSize={9} />
      <Arrow id={id} d="M 500 164 V 184" tone="navy" label="3  her context" lx={508} ly={180} anchor="start" labelSize={9} />
      <Arrow id={id} d="M 664 164 V 184" tone="ink" label="4  inspect" lx={672} ly={180} anchor="start" labelSize={9} />
      <Arrow id={id} d="M 500 318 V 338" tone="amber" />
      <Arrow id={id} d="M 664 318 V 338" tone="amber" label="card → endpoint" lx={672} ly={334} anchor="start" labelSize={9} />
      <Arrow id={id} d="M 756 350 C 775 350, 775 330, 790 312" tone="amber" label="5  A2A · as her" lx={782} ly={330} labelSize={8.5} />
      <Arrow id={id} d="M 995 164 V 184" tone="teal" />
      <Arrow id={id} d="M 995 318 V 338" tone="teal" label="6  resolve · sign" lx={1003} ly={334} anchor="start" labelSize={9} />
      <Arrow id={id} d="M 995 458 V 478" tone="teal" label="7  verses + citations" lx={1003} ly={474} anchor="start" labelSize={9} />
      <Arrow id={id} d="M 790 500 C 773 500, 773 490, 758 490" tone="teal" label="8  the service’s answer" lx={772} ly={470} labelSize={8.5} />
      <Arrow id={id} d="M 564 458 V 478" tone="navy" label="9  in her context" lx={572} ly={474} anchor="start" labelSize={9} />
      <Arrow id={id} d="M 370 536 H 342" tone="navy" label="10  reply · runRef" lx={356} ly={466} labelSize={8.5} />

      {/* ── Chain band ── */}
      <Box x={40} y={616} w={1160} h={66} title="faithchain (chain 34348) — what every hop above reads or verifies, and nothing it caches" lines={[
        'an AgentAccount for alice.me and for scripture-resolver.svc · the ask-as-me wire is a delegation verified on chain and revoked by one transaction at her Home',
        'name records: atl:cardUri · a2aEndpoint · siteUrl (the Explorer is the service’s registered site) · the content-signer leaf is signed by the service’s SA (ERC-1271)',
      ]} tone="teal" lineSize={10.5} />

      {/* ── Skill planes ── */}
      <Band x={40} y={706} w={560} h={230} caption="Serving the person's agent" tone="navy" sub="skill artifacts · ~/skills (agentic-trust)" />
      <Box x={56} y={746} w={170} h={176} title="SKILL.md contracts" lines={[
        'person-engagement-invoke',
        '  capability engagement.agent.invoke',
        '  risk R0 · result: message',
        '  utterances → args',
        'person-discovery-inspect',
        'person-discovery-find',
        '… one contract per capability',
        'risk, inputs, what it establishes',
      ]} tone="paper" lineSize={9.5} titleMono />
      <Box x={242} y={746} w={170} h={176} title="archetype · person-steward" lines={[
        'archetypes/person-steward/SKILL.md',
        '“one person, taken from the session”',
        '“their records are the private tier”',
        '“you hold no funds”',
        'knowledge: Agent, Household,',
        '  Organization, Treasury …',
        'compiled → AgentHarnessDefinitionV1',
        'pinned by DIGEST, served by skills.',
      ]} tone="paper" lineSize={9.5} titleMono />
      <Box x={428} y={746} w={156} h={176} title="in her agent" lines={[
        'the assignment record is',
        'in HER vault (her choice,',
        'the estate’s default)',
        'loadPlaybook per run:',
        'definition hashes to the',
        'pinned digest or it is',
        'ignored — bare harness',
        'behaviour, never authority',
      ]} tone="navy" lineSize={9.5} />

      <Band x={624} y={706} w={576} h={230} caption="Serving the Scripture agent" tone="teal" sub="skill artifacts · verifiable-content-demo" />
      <Box x={640} y={746} w={176} h={176} title="A2A Agent Card skills" lines={[
        'ask-scripture — “send the',
        '  question as text; optionally',
        '  a data part { context:',
        '  { role, situation } }”',
        'resolve-scripture-passage',
        'character-trust-profile',
        'find-entities · entity-graph',
        'card digest pinned in its records',
      ]} tone="paper" lineSize={9.5} titleMono />
      <Box x={832} y={746} w={176} h={176} title="the ask skill + reader roles" lines={[
        'planAsk / composeAsk prompts',
        'ASK_ROLES: new-believer, seeker,',
        '  growing, … — guidance per',
        '  reader, applied from context',
        'grade per verse: supports /',
        '  partial / no (no ⇒ dropped)',
        'the model never supplies text:',
        'every verse via the corpus path',
      ]} tone="paper" lineSize={9.5} titleMono />
      <Box x={1024} y={746} w={160} h={176} title="corpus + signer" lines={[
        'issuer descriptors',
        'block commitments',
        '(Merkle per article)',
        'entitlement per edition',
        'KMS content signer under',
        'an SA-signed leaf (spec 266)',
        'CitationAssertion =',
        'the agent’s own credential',
      ]} tone="teal" lineSize={9.5} />

      <Kicker x={320} y={958} text="behaviour is generated — skills say how an agent behaves" tone="navy" anchor="middle" />
      <Kicker x={912} y={958} text="authority never is — verification says what is true: corpus, chain, signature" tone="teal" anchor="middle" />
      <Brandline w={W} h={H} left="The page sent a question. Her agent asked as her. The corpus answered with proof." />
    </Frame>
  );
}
