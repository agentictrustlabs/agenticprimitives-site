// The demo tour: every live app on the faithnet estate, what each one proves about the substrate, and a script
// short enough to run in front of someone. Every app here is a relying app of the same Home — it signs people in
// through www.faithnet.me, never holds a key, and every act it performs is a grant the person signed.

export interface DemoLink { href: string; label: string; note?: string }
export interface DemoStep { do: string; expect: string }
export interface DemoShot { src: string; alt: string; caption: string; width?: number; height?: number }
export interface Demo {
  id: string;
  name: string;
  kind: string;
  line: string;
  blurb: string;
  links: readonly DemoLink[];
  proves: readonly string[];
  script: readonly DemoStep[];
  /** Paste-ready prompt shown on the demos page when present. */
  sampleQuery?: string;
  /** Claude → Settings → Connectors steps (Home MCP demos). */
  connect?: readonly string[];
  shot?: DemoShot;
  /** Extra shots (rendered after `shot` when both are set). */
  shots?: readonly DemoShot[];
  signInAs?: string;
  minutes: number;
}

export const HOME_MCP_CONNECTOR = 'https://home-mcp.faithnet.io/mcp';

export const HOME_MCP_CONNECT_STEPS = [
  'In Claude, open Settings → Connectors.',
  'Choose Add custom connector.',
  'Name it (e.g. My Home agent) and paste the connector address below.',
  'Click Add, then Connect — your browser opens faithnet.me.',
  'Sign in and approve ask-as-me for this connector only.',
  'Back in Claude, open a new chat; turn the connector on under Search and tools.',
] as const;

export const DEMOS: readonly Demo[] = [
  {
    id: 'home',
    name: 'Home',
    kind: 'The person’s own place',
    line: 'One name, your own agent, your own records, the organizations you can act for.',
    blurb:
      'faithnet.me is the Home every other app on this page signs in through. A passkey yields a Smart Agent — alice.me — not a session. Organizations are created here, apps are linked here, and every grant an app asks for is signed here, by the person, with the caveats on screen.',
    links: [{ href: 'https://faithnet.me', label: 'faithnet.me' }],
    proves: ['Identity that can sign (a passkey → an ERC-4337 account)', 'Your app cannot create an organization; the person does, at their Home', 'A grant is a ceremony the person performs, never an operation the app performs'],
    script: [
      { do: 'Sign in with a passkey.', expect: 'You are alice.me — an account with an address, not a row in a users table.' },
      { do: 'Open Organizations.', expect: 'The organizations Alice stewards or belongs to, each its own Smart Agent with its own treasury.' },
      { do: 'Open Linked apps.', expect: 'Every relying app on this page, with the exact grant each holds and a Revoke that takes effect at the next gate.' },
      { do: 'Open your vault.', expect: 'The receipts of everything an agent did as you — the record is yours, the apps hold caches.' },
    ],
    signInAs: 'alice',
    minutes: 3,
  },
  {
    id: 'ask',
    name: 'Your agent, inside Claude',
    kind: 'Home MCP connector',
    line: 'Claude asks your agent as you. Anything that would change something waits for your signature.',
    blurb:
      'A remote MCP server that is an OAuth 2.1 authorization server toward Claude and a relying app toward the Home. The bearer Claude holds never leaves the Worker; what reaches your agent is your own ask-as-me delegation, verified against your account on chain per request. Acts park as authority_required and hand you a link to your Home to sign.',
    links: [
      { href: HOME_MCP_CONNECTOR, label: 'Connector address', note: 'Claude → Settings → Connectors → Add custom connector' },
      { href: 'https://faithnet.me', label: 'Sign the ask-as-me grant at your Home' },
    ],
    proves: ['The service that acts as an agent is never that agent — Claude holds a revocable delegate, not you', 'Resolution is not authority: finding an agent is not permission to use it', 'Trust is a graph: discovery returns candidates with evidence, never a score'],
    script: [
      { do: 'Ask: “What have I asked my agent for recently?”', expect: 'Your recent runs, answered by your agent by name (alice.me). This proves the bearer reaches your agent as you — not as the connector.' },
      { do: 'Ask: “Find an agent that can help with a study on justification.”', expect: 'Your agent searches the estate’s discovery tier and returns candidate agents — the Ligonier catalog service among them — with what each one can do and the evidence for it. Nothing has been asked of them yet.' },
      { do: 'Ask the Ligonier catalog the same question through your agent.', expect: 'The catalog answers with titles, teachers and topics (240 items under 236 topics). Your agent reports what it read and from which tier; the run leaves a receipt in your vault.' },
      { do: 'Ask for something that would change a record — “invite Bob to Missio Nexus.”', expect: 'authority_required, and a grant_link to your Home. Claude cannot sign for you.' },
    ],
    signInAs: 'alice',
    minutes: 5,
  },
  {
    id: 'home-mcp2',
    name: 'Registry → Ligonier in Claude',
    kind: 'Home MCP · discovery + A2A content',
    line: 'Search the ADR registry through your agent, then ask Ligonier (or a publisher) over A2A — inside Claude.',
    blurb:
      'The same Home MCP connector as “Your agent, inside Claude,” exercised on the content path: discover_agents searches the estate’s ADR / discovery registry; engage sends your words as you to the returned agent’s A2A endpoint. Works for ligonier.svc catalog asks and other publisher agents the registry lists. Claude never holds your keys — it holds a revocable ask-as-me delegate; the hop and the answer are your agent’s record.',
    links: [
      { href: HOME_MCP_CONNECTOR, label: 'Connector address', note: 'Claude → Settings → Connectors → Add custom connector' },
      { href: 'https://claude.ai/chat/8377ba9f-f9c0-44a3-bb64-1def58db4e2a', label: 'Example chat', note: 'grace / works query via Ligonier' },
      { href: 'https://faithnet.me', label: 'Sign the ask-as-me grant at your Home' },
    ],
    proves: [
      'Discovery is a registry search through your agent — candidates with evidence, not a vendor score',
      'Engage is A2A: Ligonier (or another publisher) answers from its own catalog under its own playbook',
      'Claude shows the tool hop (“Searched Ligonier resources”); the receipt lands in your vault',
    ],
    sampleQuery:
      'If salvation is by grace alone, what role do good works play in a Christian\'s life—and how can someone distinguish growing in faith from trying to earn God\'s acceptance?',
    connect: HOME_MCP_CONNECT_STEPS,
    shot: {
      src: '/shots/home-mcp-ligonier-claude.jpg',
      alt: 'Claude using the Home MCP connector — Searched Ligonier resources, then answered a grace-and-works question from Ligonier’s teaching',
      caption: 'claude.ai — connector on; registry hop → Ligonier A2A; answer cites the publisher, not the model’s memory alone',
      width: 1024,
      height: 539,
    },
    script: [
      { do: 'Connect the Home MCP (steps below). In a new chat, turn My Home agent on under Search and tools.', expect: 'The connector shows as connected; tools are available for this chat.' },
      { do: 'Paste the sample query (grace alone / good works).', expect: 'Claude calls the connector — you see a hop like “Searched Ligonier resources.” The answer is grounded in Ligonier’s catalog/teaching, with scripture and doctrine named as theirs.' },
      { do: 'Or step it: “Find agents that offer study plans about justification.” Then engage ligonier.svc with the same theological ask.', expect: 'Registry candidates first (ADR discovery); then Ligonier’s own A2A reply — titles, teachers, topics — presented as that agent’s answer.' },
      { do: 'Ask: “What have I asked my agent for recently?”', expect: 'The run appears under your agent’s name (e.g. alice.me), with a vault receipt for the hop.' },
    ],
    signInAs: 'alice',
    minutes: 5,
  },
  {
    id: 'gamenight',
    name: 'Game Night',
    kind: 'A card room — the reference app',
    line: 'People and AI agents at the same table; the house holds nobody’s keys.',
    blurb:
      'Texas hold’em and canasta for play money (Sheqel, a test coin). Buy-ins and cash-outs settle from each player’s own Smart Agent treasury under a mandate the player signed — payee, ceiling, coin. A coach service Bob custodies is consulted through the player’s own agent under a study grant, and may advise but never act.',
    links: [
      { href: 'https://gamenight.faithnet.io', label: 'gamenight.faithnet.io' },
      { href: '/examples/game-night', label: 'The case study' },
      { href: 'https://github.com/agentictrustlabs/pokernight', label: 'Source' },
    ],
    proves: ['A mandate binds a grant to one intent — a buy-in is N mandates, not one', 'The person’s agent never moves money; the treasury service does, under the mandate', 'A capability’s declared risk cannot be lowered by the planner (poker.advise, never poker.act)'],
    script: [
      { do: 'Sign in as alice; “Deal me in.”', expect: 'The Home asks Alice to sign the buy-in mandate: payee = the table, ceiling = the buy-in, coin = Sheqel. The chips arrive from alice.treasury.' },
      { do: 'Play a hand; ask the coach.', expect: 'Advice comes back through Alice’s own agent under a study grant Bob’s service accepted. It cannot bet.' },
      { do: 'Cash out; open Alice’s vault at the Home.', expect: 'A receipt per buy-in and cash-out — mandate, verifier decision, transaction hash — held by Alice, not the card room.' },
      { do: 'Revoke the card room at the Home; try to buy in again.', expect: 'Refused at the next gate. Nothing was cached.' },
    ],
    signInAs: 'alice',
    minutes: 6,
  },
  {
    id: 'gather27',
    name: 'Gather27',
    kind: 'Gatherings — find, host, operate',
    line: 'Listings are communities and regions, never individuals; a host is a person who signed for the listing.',
    blurb:
      'A seeker finds a group near them with no session. A host connects at the Home, creates or adopts an organization, affirms the four-clause covenant, and publishes a listing; the host organization’s vault is the record of truth and the site holds a rebuildable projection. Three surfaces of one app: Find (public), the host app, and Ops — admission receipts, the lifecycle of every listing, who signed what.',
    links: [
      { href: 'https://find.gather27.faithnet.io', label: 'Find', note: 'public — no sign-in' },
      { href: 'https://gather27.faithnet.io', label: 'Host', note: 'sign in at the Home' },
      { href: 'https://ops.gather27.faithnet.io', label: 'Ops', note: 'operator console' },
    ],
    proves: ['Two tiers that never meet: Find reads the public tier; a host’s records live in their vault', 'Acting for an organization needs a stewardship grant, not membership', 'A listing is a signed, timestamped event — so is delisting'],
    script: [
      { do: 'Open Find; search a region.', expect: 'Public listings from the discovery tier — no account, no cookie, nothing private disclosed.' },
      { do: 'Open Host; sign in as dave; adopt an organization, affirm the covenant, publish a gathering.', expect: 'The listing is a signed event by the host organization’s agent. A member who is not a steward is told so, and which grant it would take.' },
      { do: 'Open Ops.', expect: 'The admission receipt for the listing, its lifecycle, and the signer — evidence, not a log line.' },
    ],
    signInAs: 'dave',
    minutes: 5,
  },
  {
    id: 'field',
    name: 'Field Operations',
    kind: 'Field Circles — people groups, communities, churches',
    line: 'A team workspace where people groups and communities are ontology — circles and churches are modelled edges, not spreadsheet tabs.',
    blurb:
      'field.faithnet.io is Faithnet Field Operations: local-first workspaces for field teams (Northern Colorado Field · Somali Corridor). Who belongs, who may speak, and whom the work serves are ontology-backed. A People Group (Somalis) is the ethno-linguistic unit of share — Research aligns it to a registry (ROP3 / graph.global.church) with confidence and evidence, never a bare name match. A People Community is that people in a place (e.g. Somalis — Weld). Circles (discovery L0, discipleship L1) and Churches (house church G1/G2) are typed structures on that community: each can be an AGENT, carries health grain (seekers / believers / baptized / leaders · Acts 2), meeting time, facilitator, and lifecycle. List, badges, gen map, and map are projections of one model. Membership comes from the ontology; stewardship grants gate acts that speak for the organization. The tab title stays discreet — under some postures the app name itself is a disclosure.',
    links: [
      {
        href: 'https://field.faithnet.io/w/0x3d653cbab0c99b1513439758eb2eac2039caa6e1/t/0x6ff6D76cD285b6c899c13C7fdF82f642eF246830/overview',
        label: 'Somali Corridor Team',
        note: 'team overview',
      },
      {
        href: 'https://field.faithnet.io/w/0x3d653cbab0c99b1513439758eb2eac2039caa6e1/research',
        label: 'Research',
        note: 'people-group alignment',
      },
      { href: 'https://field.faithnet.io', label: 'field.faithnet.io' },
    ],
    proves: [
      'People Group ≠ People Community ≠ Circle ≠ Church — four modelled kinds, never one “group” string',
      'Registry alignment (ROP3 / Global Church graph) is a claim with confidence — not a silent rename',
      'Circle/church health (believers, baptized, leaders) and AGENT tags are structured assertions, not chat notes',
      'Membership is not a grant — a member sees; a steward acts',
    ],
    shot: {
      src: '/shots/field-circles-churches-list.jpg',
      alt: 'Field Operations — Circles & Churches list: discovery and discipleship circles, house churches for Somalis — Weld, AGENT tags',
      caption: 'Circles & Churches · 4 circles · 3 churches · Somalis — Weld · AGENT-backed entries',
      width: 1024,
      height: 682,
    },
    shots: [
      {
        src: '/shots/field-circles-church-detail.jpg',
        alt: 'Evans Somali house church detail — church health, believers/baptized/leaders, people group Somali, lifecycle',
        caption: 'Church detail · house-church health grain · people group + facilitator + lifecycle',
        width: 1024,
        height: 681,
      },
      {
        src: '/shots/field-research-people-groups.jpg',
        alt: 'Research — Somalis aligned to ROP3 100395 with high confidence; Somali Bantus offered for alignment from graph.global.church',
        caption: 'Research · people-group alignment to registry (ROP3 / graph.global.church) with confidence',
        width: 1024,
        height: 685,
      },
    ],
    script: [
      { do: 'Open Circles & Churches in the Northern Colorado / Somali Corridor workspace.', expect: 'Typed list: discovery/discipleship circles and churches (G1/G2), whom they serve (Somalis — Weld), AGENT where applicable.' },
      { do: 'Open Evans Somali house church (or another church card).', expect: 'Health grain: seekers / believers / baptized / leaders; facilitator, meeting time, people group, lifecycle (e.g. Established).' },
      { do: 'Open Research → People groups.', expect: 'Somalis aligned (e.g. ROP3 100395, confidence high); candidates from graph.global.church (e.g. Somali Bantus) offered for select-to-align — not auto-merged.' },
      { do: 'Open Ask: “Who are the members of my organization?” Then try an act that speaks for the org.', expect: 'Members from ontology. Stewardship-gated acts refuse with the grant named.' },
    ],
    signInAs: 'alice',
    minutes: 6,
  },
  {
    id: 'bible',
    name: 'Verifiable Scripture',
    kind: 'Verse lookup — content you can prove',
    line: 'The model never quotes the verse. A tool retrieves it; a third party can re-check the claim.',
    blurb:
      'bible.faithnet.io is a scripture lookup built on published @agenticprimitives content packages. Resolve a reference to a stable canonical locus, retrieve gated text under policy, get a signed CitationAssertion bound to the commitment and run, then hand an EvidenceBundle to an independent validator — optional Groth16 membership against the issuer’s Merkle corpus. Ask — verifiable citations: type a topic (e.g. “What does it say about love?”); the agent (scripture-resolver.svc) answers with signed citations you verify — not model memory. You / the app trust the validator (demo-validator.svc), which checks against a profile (public-domain-demo); the agent cites a descriptor issued by the corpus issuer (e.g. qbsb.svc). Validated means N/N checks passed and an attestation hash — not “trust the chat.” Quotation fidelity is the floor; verifiable provenance is the point.',
    links: [
      { href: 'https://bible.faithnet.io/', label: 'bible.faithnet.io' },
      { href: 'https://validator.faithnet.io', label: 'Validator', note: 'demo-validator.svc' },
      { href: 'https://github.com/rpedersen3/verifiable-content-demo', label: 'Source' },
    ],
    proves: [
      'Verse text is tool-retrieved under policy, never model-emitted',
      'A citation binds canonicalId, commitment, issuer, and run — not a bare string',
      'You trust the validator, not the answering agent — validated / gated / rejected with attestation',
      'Trust graph is explicit: app → validator → profile; agent → cited descriptor ← issuer',
    ],
    sampleQuery: 'What does it say about love?',
    shot: {
      src: '/shots/bible-ask-verifiable-citations.jpg',
      alt: 'Ask — verifiable citations: love query returns John 3:16 and Romans 8:28; John 3:16 validated 10/10 by demo-validator.svc with trust graph',
      caption: 'bible.faithnet.io · Ask — verifiable citations · validated by demo-validator.svc (10/10 checks)',
      width: 735,
      height: 1011,
    },
    script: [
      { do: 'Open bible.faithnet.io → Ask; paste “What does it say about love?” (or comfort / strength / creation).', expect: 'Cited passages (e.g. John 3:16, Romans 8:28) with signed citations — not bare model quotes.' },
      { do: 'Open a citation’s Validate / attestation card.', expect: '✓ validated · attested by demo-validator.svc · profile (e.g. public-domain-demo) · N/N checks · attestation hash.' },
      { do: 'Read the trust graph under the result.', expect: 'You/app → validator → profile; agent (scripture-resolver.svc) cites descriptor issued by qbsb.svc (or the edition’s issuer).' },
      { do: 'Optionally look up the same verse in the picker; inspect candidates / ZK if shown.', expect: 'Same canonical locus + commitment path; Merkle / ZK membership without revealing the leaf when licensed.' },
    ],
    minutes: 5,
  },
  {
    id: 'explorer',
    name: 'Bible Explorer',
    kind: 'PROV-O graph — people, places, trust',
    line: 'Explore the Bible as a living graph of people, places, events, and the verses behind them.',
    blurb:
      'explorer.faithnet.io is the ontology surface of the verifiable-content stack: ~6,300 entities across 66 books, geolocated places, timelines, oikos rings, generations, and a trust graph with character signals. Browse the graph free; licensed verse reads (LBSB) are entitlement-gated via your Home. Validate GCO checks the Global Church Ontology against the same corpus the verse lookup uses.',
    links: [
      { href: 'https://explorer.faithnet.io/', label: 'explorer.faithnet.io' },
      { href: 'https://bible.faithnet.io/', label: 'Verifiable Scripture', note: 'same substrate — verse path' },
      { href: 'https://github.com/rpedersen3/verifiable-content-demo', label: 'Source' },
    ],
    proves: [
      'Entity identity is a canonical graph node — names collide; the id does not',
      'Map, timeline, oikos and trust views are projections of one ontology, not separate databases',
      'Graph browse is free; verse disclosure still runs the gated, accountable path',
    ],
    sampleQuery: 'Jesus',
    shot: {
      src: '/shots/bible-explorer-home.jpg',
      alt: 'Bible Explorer home — search people, places, events; Map, Timeline, Oikos, Generations, Trust Graph',
      caption: 'explorer.faithnet.io — 6,376 entities · 1,758 places · 66 books',
      width: 1024,
      height: 891,
    },
    script: [
      { do: 'Open explorer.faithnet.io; search “Jesus” (or Jerusalem, Exodus).', expect: 'Entity cards resolve to canonical people/places/events — not a bare string match.' },
      { do: 'Open Map; pan to a region and play time if offered.', expect: 'Geolocated places with activities; the graph, not a static atlas.' },
      { do: 'Open Oikos or Generations on a featured person (Paul, Abraham).', expect: 'Relationship rings / descent — household and discipleship as modelled edges.' },
      { do: 'Open Graph / Trust Graph; optionally Validate GCO.', expect: 'Character and attestation signals on entities; GCO validation against the living ontology.' },
    ],
    minutes: 5,
  },
  {
    id: 'publishing',
    name: 'Source Publishing',
    kind: 'Publish your own sources — signed, block-hashed',
    line: 'A person publishes into their Home library; the public listing carries on-chain provenance a reader can verify.',
    blurb:
      'publishing.faithnet.io is the people-as-publishers path on the same content-primitives substrate as Verifiable Scripture. Sign in at the Home, author a work (title, structure, articles), accept the listing agreement, and publish: Home mints and signs a release; each article is a Merkle of content blocks. The public page shows Signed ✓ verified on chain — not “trust the host.” Demo works (e.g. AP3) ship Free + CC BY with proof details open.',
    links: [
      { href: 'https://publishing.faithnet.io/@rich-google2-me/ap3', label: 'Example: AP3', note: 'signed listing · 8 articles' },
      { href: 'https://publishing.faithnet.io/publish', label: 'Publish', note: 'step 1 of the ceremony' },
      { href: 'https://publishing.faithnet.io/', label: 'publishing.faithnet.io' },
    ],
    proves: [
      'The person (or their agent) signs the release — the site never holds the author’s key',
      'Each article is block-committed; the listing verifies the whole run matches',
      'License + agreement ride with the release (e.g. CC BY 4.0) — attribution is evidence, not a footer guess',
    ],
    shot: {
      src: '/shots/source-publishing-ap3.jpg',
      alt: 'Source Publishing — AP3 listing with Signed ✓ verified on chain and per-article block hashes',
      caption: 'publishing.faithnet.io/@rich-google2-me/ap3 — Signed ✓ on chain 34348 · 8 articles match',
      width: 1024,
      height: 816,
    },
    shots: [
      {
        src: '/shots/source-publishing-publish.jpg',
        alt: 'Source Publishing — Publish step 1: title, type, structure, language, authors',
        caption: 'Publish · step 1 of 6 — nothing leaves the browser until you sign',
        width: 1024,
        height: 850,
      },
    ],
    script: [
      { do: 'Open the AP3 example listing.', expect: 'Provenance sidebar: Signed ✓ verified on chain; each article lists block count + commitment hash.' },
      { do: 'Expand Show proof details if offered.', expect: 'Signer, release, agreement digest — re-checkable, not a trust-me badge.' },
      { do: 'Open Publish; sign in as a demo person; start a work (title + structure).', expect: 'Multi-step ceremony; listing address under your handle. Text stays local until the sign step.' },
      { do: 'Finish publish (or open Studio on an existing work).', expect: 'Public page under /@you/slug with the same provenance card pattern as AP3.' },
    ],
    signInAs: 'alice',
    minutes: 5,
  },
  {
    id: 'skills',
    name: 'Skills registry',
    kind: 'Playbooks and ontology, by digest',
    line: 'Every capability a demo above used, pinned by digest — and the ontology modules it binds to, as graphs.',
    blurb:
      'SKILL.md management for the estate: agent archetypes, the capabilities each may mean, and the ontology modules behind them. A receipt from any app above cites the digest of the playbook that admitted the run; this is where that digest resolves.',
    links: [
      { href: 'https://skills.faithnet.io', label: 'skills.faithnet.io' },
      { href: 'https://skills.faithnet.io/library', label: 'Library' },
    ],
    proves: ['Behaviour is generated; authority never is — a playbook is consulted by no verifier', 'One ontology from the utterance to the audit'],
    script: [
      { do: 'Open the Hold’em Coach archetype.', expect: 'poker.advise and poker.review — never poker.act — and the fourteen ontology areas it binds.' },
      { do: 'Take a playbook digest from a Game Night receipt and find it here.', expect: 'The exact compiled definition that admitted that run.' },
    ],
    minutes: 2,
  },
];
