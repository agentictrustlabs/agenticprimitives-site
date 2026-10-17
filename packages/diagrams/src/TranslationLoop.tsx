import { Arrow, Box, Brandline, C, Frame, Kicker, Label, Pill } from './primitives';

/**
 * THE TRANSLATION LOOP — how one chapter of the original text became the `rbs` edition, and what shaped every verse.
 *
 * Five bands, top to bottom: (1) the SOURCES the drafter is allowed to see — frozen tokens, the lexicon, the scripture
 * knowledge base — and the English editions it is NOT allowed to see, which exist only for the graders; (2) the MCP
 * TOOLS that serve them; (3) the SKILL and the orchestration PLAN that order the work (draft → checks → revise when
 * blocked); (4) the deterministic CHECKER; (5) the HARNESS that measures the whole thing against a floor and a ceiling
 * and feeds what it finds back into the checker's rules, the skill's text and the knowledge base (the dashed rose
 * arrows in the gutter). The right-hand column is where the output goes: a proposal per verse in the edition store,
 * exported, signed by the edition's issuer, served.
 */
export function TranslationLoop() {
  const id = 'translation-loop';
  const W = 1300, H = 1000;
  const colL = 36, colW = 860; // the main flow: x 36 … 896
  const gutter = 908; // feedback arrows live in x 908 … 976
  const right = 990, rightW = 276; // the output column: x 990 … 1266
  return (
    <Frame id={id} w={W} h={H} title="The translation loop: frozen sources and the knowledge base through MCP tools, a skill and a stepped plan with a revise pass, four deterministic checks, and a harness whose floor-and-ceiling runs tune the checker, the skill and the knowledge base — out to a signed edition">
      {/* ── bands ── */}
      <rect x={colL - 12} y={56} width={colW + 24} height={150} rx={12} fill={C.navySoft} opacity={0.35} />
      <rect x={colL - 12} y={222} width={colW + 24} height={92} rx={12} fill={C.tealSoft} opacity={0.35} />
      <rect x={colL - 12} y={330} width={colW + 24} height={262} rx={12} fill={C.paper} stroke={C.line} strokeDasharray="4 4" />
      <rect x={colL - 12} y={608} width={colW + 24} height={118} rx={12} fill={C.amberSoft} opacity={0.4} />
      <rect x={colL - 12} y={742} width={colW + 24} height={196} rx={12} fill={C.roseSoft} opacity={0.3} />
      <rect x={right - 12} y={56} width={rightW + 24} height={882} rx={12} fill={C.violetSoft} opacity={0.3} />

      <Kicker x={colL} y={48} text="01 · what the drafter may see — and what it may not" tone="navy" />
      <Kicker x={colL} y={216} text="02 · MCP tools (translation-mcp · D1 · bearer, Worker→Worker)" tone="teal" />
      <Kicker x={colL} y={324} text="03 · the skill and the plan (translation-orchestration)" tone="ink" />
      <Kicker x={colL} y={602} text="04 · the deterministic checker — what run_translation_checks runs at steps checks · checks2" tone="amber" />
      <Kicker x={colL} y={736} text="05 · the harness — floor, ceiling, regression; what it found went back in" tone="rose" />
      <Kicker x={right} y={48} text="06 · out: the rbs edition" tone="violet" />

      {/* ── 01 sources ── */}
      <Box x={colL} y={66} w={200} h={128} variant="header" tone="navy" title="Frozen source tokens" lines={['WLC + NE1904 as the tables carry them', 'surface · parsing · Strong\'s · position', 'commitment checked on ingest', 'John.3 → 36 verses, 623 tokens']} lineSize={10.5} titleSize={12} />
      <Box x={252} y={66} w={200} h={128} variant="header" tone="navy" title="STEP lexicon" lines={['one entry per Strong\'s number', 'lemma · POS · gloss · definition', 'carries the KB\'s rule where one exists', 'G4151 πνεῦμα → concept-spirit']} lineSize={10.5} titleSize={12} />
      <Box x={468} y={66} w={236} h={128} variant="header" tone="navy" title="Scripture knowledge base" lines={['3,129 persons · 1,007 places · 5,168 terms', '45 concepts: the definition IS the rule', '16 divine names, each with a convention', 'a rendering per referent IRI, not per string']} lineSize={10.5} titleSize={12} />
      <Box x={720} y={66} w={176} h={128} tone="rose" dashed title="Graders only" lines={['WEB · ASV · KJV · BSB', 'never in the drafter\'s prompt', '(the runtime test asserts', 'WEB wording is absent)', 'chrF per edition, never pooled']} lineSize={10.5} titleSize={12} />

      {/* ── 02 tools ── */}
      <Box x={colL} y={232} w={150} h={70} tone="teal" titleMono title="get_source_tokens" lines={['tokens + a text', '`prompt` line each']} lineSize={10} titleSize={11} />
      <Box x={198} y={232} w={150} h={70} tone="teal" titleMono title="lookup_lexicon" lines={['entry + concept rule', '≤100 binds, paged']} lineSize={10} titleSize={11} />
      <Box x={360} y={232} w={150} h={70} tone="teal" titleMono title="lookup_names" lines={['token → KB referent', '→ decided rendering']} lineSize={10} titleSize={11} />
      <Box x={522} y={232} w={160} h={70} tone="teal" titleMono title="find_similar_approved" lines={['approved memory only', '(empty on a new edition)']} lineSize={10} titleSize={11} />
      <Box x={694} y={232} w={202} h={70} tone="teal" titleMono title="run_translation_checks" lines={['coverage · negation · names', 'quantities · chrF per reference']} lineSize={10} titleSize={11} />

      <Arrow id={id} d="M 136 194 V 230" tone="navy" />
      <Arrow id={id} d="M 352 194 V 230" tone="navy" />
      <Arrow id={id} d="M 586 194 L 440 230" tone="navy" />
      <Arrow id={id} d="M 808 194 V 230" tone="rose" dashed />

      {/* ── 03 skill + plan ── */}
      <Box x={colL} y={340} w={222} h={242} variant="header" tone="slate" title="SKILL.md · translate-from-source" lines={['capability btr.translate.draft', 'execution: instruction', '', 'covers: SegmentTranslation,', '  TokenAlignment, NameRendering,', '  scr:KeyTerm', 'excludes: ReferenceEdition,', '  TranslationCheck, Critique', '', 'tools: the four on the left', 'declines: "translate from the ESV"', '  "make the Trinity clearer"', '', 'one body; the harness measures it']} lineSize={10} titleSize={11.5} />

      {/* row 1: the straight chain */}
      <Label x={276} y={356} text="plan (arm model-source-lexicon-memory) — every step a PROV activity, every output an entity" size={10.5} tone="ink" weight={600} />
      {[
        { x: 276, t: 'tokens', s: 'tool' },
        { x: 352, t: 'lexicon', s: 'tool' },
        { x: 428, t: 'names', s: 'tool' },
        { x: 504, t: 'similar', s: 'tool' },
        { x: 580, t: 'draft', s: 'model' },
        { x: 656, t: 'checks', s: 'tool' },
      ].map((st) => (
        <Box key={st.t} x={st.x} y={366} w={66} h={40} tone={st.s === 'model' ? 'rose' : 'paper'} titleMono title={st.t} lines={[st.s]} lineSize={9} titleSize={10.5} align="middle" />
      ))}
      {[352, 428, 504, 580, 656].map((x) => <Arrow key={x} id={id} d={`M ${x - 10} 386 H ${x - 1}`} tone="ink" />)}
      <Arrow id={id} d="M 722 386 H 742" tone="ink" />
      <Box x={744} y={366} w={152} h={40} tone="amber" title="blocking > 0 ?" lines={['Step.when guard on checks']} lineSize={9} titleSize={10.5} align="middle" />

      {/* row 2: the return path, right to left */}
      <Arrow id={id} d="M 820 406 V 434" tone="amber" label="yes" lx={836} ly={424} labelSize={9.5} />
      <Box x={744} y={436} w={152} h={46} tone="rose" titleMono title="revise" lines={['model: the same cached prefix', '+ the draft + its failing checks']} lineSize={9} titleSize={10.5} align="middle" />
      <Arrow id={id} d="M 744 459 H 724" tone="ink" />
      <Box x={656} y={436} w={66} h={46} tone="paper" titleMono title="checks2" lines={['tool']} lineSize={9} titleSize={10.5} align="middle" />
      <Arrow id={id} d="M 656 459 H 636" tone="ink" />
      <Box x={504} y={436} w={130} h={46} tone="paper" titleMono title="final · finalChecks" lines={['local.coalesce:', 'the revision, else the draft']} lineSize={9} titleSize={10.5} align="middle" />
      {/* the "no" path runs under the return row and enters final from below */}
      <Arrow id={id} d="M 884 406 V 494 H 569 V 484" tone="ink" dashed label="no — the draft stands" lx={740} ly={506} labelSize={9.5} />
      <Arrow id={id} d="M 504 459 H 484" tone="ink" />
      <Box x={352} y={436} w={130} h={46} tone="teal" titleMono title="propose" lines={['one proposal per verse → rbs', 'status checked · runRef stamped']} lineSize={9} titleSize={10.5} align="middle" />
      <Arrow id={id} d="M 352 459 H 332" tone="ink" />
      <Box x={276} y={436} w={54} h={46} tone="paper" titleMono title="answer" lines={['']} lineSize={9} titleSize={10.5} align="middle" />
      <Pill x={276} y={494} text="→ 06 edition store" tone="violet" size={9} />

      {/* what the draft step sees */}
      <Box x={276} y={520} w={620} h={62} variant="header" tone="slate" title="what the model steps see" lines={['userPrefix = tokens.prompt · lexicon.prompt · names.prompt — text lines, not JSON — marked cache_control: ephemeral; then the brief and the ask', 'schema: one entry per verse, text + an alignment from EVERY token (\'-\' only for an article or marker English carries by construction)', 'Claude Sonnet 5 · ~19k input tokens per chunk of 8 verses (30k before the text rendering) · the revision reads the prefix from cache']} lineSize={9.5} titleSize={10.5} />

      <Arrow id={id} d="M 147 302 V 338" tone="teal" />
      <Arrow id={id} d="M 795 302 V 364" tone="teal" />

      {/* ── 04 checker ── */}
      <Box x={colL} y={618} w={200} h={100} variant="header" tone="amber" title="source-coverage" lines={['every token aligned; \'-\' only on a', 'free class (וַיְהִי, נָא, לֵאמֹר-inf,', 'a prefixed waw by itself)', 'no target absent from the text']} lineSize={10} titleSize={11.5} />
      <Box x={248} y={618} w={200} h={100} variant="header" tone="amber" title="negation" lines={['each negator carried; οὐ μή is one;', 'one `not` distributes over `or`;', 'εἰ μή / ἐὰν μή is exceptive →', '"except" / "unless" (John 3:13)']} lineSize={10} titleSize={11.5} />
      <Box x={460} y={618} w={200} h={100} variant="header" tone="amber" title="names (through the KB)" lines={['token → referent IRI → rendering', 'divine-name claims only beside', 'their partner or by exclusive number', '(πνεῦμα in "poor in spirit" is not)']} lineSize={10} titleSize={11.5} />
      <Box x={672} y={618} w={224} h={100} variant="header" tone="amber" title="quantities" lines={['numerals compose under + and ×', '(2, 10, 10000 → 120,000); ordinals and', 'ordinal adverbs (δεύτερον "secondly"', '→ 2, John 3:4); `one` free both ways']} lineSize={10} titleSize={11.5} />

      {/* ── 05 harness ── */}
      <Box x={colL} y={752} w={236} h={176} variant="header" tone="rose" title="Experiments · arms" lines={['control-web — the WEB as the CEILING', 'gloss — the tables\' glosses in gloss', '  order: the FLOOR (pure, so the', '  regression plants in the same text)', 'model-src · model-lex · model-mem', '', 'suiteKind: capability | regression', '  — never pooled', 'a run with no verdict carries a', 'failureCause: agent · grader · env']} lineSize={10} titleSize={11.5} />
      <Box x={288} y={752} w={300} h={176} variant="header" tone="rose" title="Graders (deterministic first, judge after)" lines={['scope · fidelity-checks · source-coverage', 'perturbation-catch (regression only)', 'chrF vs WEB · ASV · KJV — per edition', 'fidelity judge: sees the WEB flagged as reference', '', 'translate-v1.dev — 55 cases × 2 arms = 110 runs', 'translate-v1.regression — 580 planted errors,', '  6 kinds: added/dropped clause, changed name,', '  changed number, removed negative, swapped speaker', 'held-out: written ONCE, locked']} lineSize={10} titleSize={11.5} />
      <Box x={604} y={752} w={292} h={176} variant="header" tone="rose" title="What the harness changed (the loop)" lines={['dev run 1: checker blocked 67% of the WEB,', '  80% of the floor → five rules rewritten →', '  fidelity-checks 0.99 on both', 'regression: catch 0.90 → 0.94 (pronoun drops', '  freed; cost changed-name 1.0 → 0.91)', 'Jonah pilot: 1/6 clean chunks → 6/6 with revise', 'John 3: two checker gaps found on 2 chunks,', '  fixed with tests, re-run → 36/36 clean', 'every fix is a test; preflight refuses drift']} lineSize={10} titleSize={11.5} />

      {/* feedback arrows — in the gutter, up from the harness into the checker, the skill/plan and the sources */}
      <Arrow id={id} d="M 896 790 H 930 V 668 H 908" tone="rose" dashed />
      <g transform="rotate(-90 924 730)"><Label x={924} y={730} text="checker rules" size={9} tone="rose" weight={600} anchor="middle" /></g>
      <Arrow id={id} d="M 896 820 H 950 V 460 H 908" tone="rose" dashed />
      <g transform="rotate(-90 944 560)"><Label x={944} y={560} text="skill text · brief" size={9} tone="rose" weight={600} anchor="middle" /></g>
      <Arrow id={id} d="M 896 850 H 970 V 130 H 908" tone="rose" dashed />
      <g transform="rotate(-90 964 300)"><Label x={964} y={300} text="KB rule · rendering" size={9} tone="rose" weight={600} anchor="middle" /></g>

      {/* checker ↔ harness */}
      <Arrow id={id} d="M 136 718 V 750" tone="amber" />

      {/* ── 06 output ── */}
      <Box x={right} y={66} w={rightW} h={118} variant="header" tone="violet" title="Edition store (D1)" lines={['one proposal per (verse, run):', 'text · alignments · checks · arm · runRef', 'export picks per verse:', 'approved > not-rejected > fewer blocking', '> later; driver runs (runRef rbs/) only', '— Lab runs plant errors here on purpose']} lineSize={10} titleSize={11.5} />
      <Arrow id={id} d="M 1128 184 V 208" tone="violet" />
      <Box x={right} y={210} w={rightW} h={92} variant="header" tone="violet" title="PROV record per chunk" lines={['intent · plan · activities · entities', 'usage incl. cache read/write tokens', 'models · checks · the answer', '~/eval-store/rbs/runs/<ref>.json —', 'the words stay out of every repo']} lineSize={10} titleSize={11.5} />
      <Arrow id={id} d="M 1128 302 V 326" tone="violet" />
      <Box x={right} y={328} w={rightW} h={118} variant="header" tone="violet" title="Whole-Bible driver" lines={['translate-bible.mts — chapter by chapter,', 'chunks of 8 verses, ledger + resume,', '--retry-blocking · --chapters John.3', 'John 3: 5 chunks · 36 verses · $0.77', '  (36/36 clean after the checker fixes)', 'whole Bible ≈ $650 at this rate']} lineSize={10} titleSize={11.5} />
      <Arrow id={id} d="M 1128 446 V 470" tone="violet" />
      <Box x={right} y={472} w={rightW} h={104} variant="header" tone="violet" title="Issuer: rbs-bible.svc" lines={['a service agent chartered under ruth.me', '(the scripture steward), name bought on', 'the priced root; signs with an AKCS key', 'authorized as its delegate — an ERC-7710', 'leaf the custodian signed through the Home']} lineSize={10} titleSize={11.5} />
      <Arrow id={id} d="M 1128 576 V 600" tone="violet" />
      <Box x={right} y={602} w={rightW} h={104} variant="header" tone="violet" title="Scripture service (bsb.faithnet.io)" lines={['edition rbs · en-US · public domain', 'a signed descriptor per verse,', 'verifiable against the corpus root', 'resolve · get_passage · MCP', 'carries no Berean name']} lineSize={10} titleSize={11.5} />
      <Box x={right} y={752} w={rightW} h={176} tone="paper" dashed title="John 3:16 (rbs)" lines={['For God so loved the world that he', 'gave his one and only Son, so that', 'everyone who believes in him should', 'not perish but have eternal life.', '', '25 of 25 tokens aligned · 1 negator', 'carried · θεός → "God" by convention', '· ζωὴ αἰώνιος → "eternal life" by', 'the KB rule · no reference seen']} lineSize={10.5} titleSize={11.5} />

      <Pill x={colL} y={950} text="probabilistic: the two model steps (draft, revise)" tone="rose" size={9.5} />
      <Pill x={colL + 300} y={950} text="deterministic: every tool, every check, every grader but the judge" tone="teal" size={9.5} />

      <Brandline w={W} h={H} left="The drafter sees the source. The graders see the English. The harness sees both — and rewrites the rules, never the verdicts." />
    </Frame>
  );
}
