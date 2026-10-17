import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { ArrowRight } from 'lucide-react';
import { DiagramImg } from '@/components/DiagramImg';
import { Callout, CTA, Figure, Ledger, Section, Stat, Tag } from '@/components/ui';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = pageMeta({
  title: 'Translating John 3 from the Greek — what shaped every verse',
  description:
    'A new American English edition (rbs) drafted from the original-language tokens alone. Frozen sources and a knowledge base reach the drafter through MCP tools; a skill and a stepped plan with a revise pass order the work; four deterministic checks block a bad verse; a harness measures the whole loop against a floor and a ceiling — and what it found rewrote the checker, the skill and the knowledge base. With the harness plan, its steps, and the numbers.',
  path: '/examples/bible-translation',
});

const SCRIPTURE = 'https://bsb.faithnet.io';

const PIECES = [
  { who: 'The frozen sources', role: 'what the drafter sees', what: 'The Hebrew/Aramaic and Greek tokens as the published tables carry them (WLC + NE1904), each with its parsing and Strong\'s number, frozen under a content commitment; the STEP lexicon entry each number opens; the scripture knowledge base. No English edition of the passage — ever. A runtime test asserts the WEB\'s wording is absent from the drafter\'s prompt.', tone: 'navy' as const },
  { who: 'The MCP tools', role: 'how it sees them', what: 'Five tools on an internal Worker: get_source_tokens, lookup_lexicon, lookup_names, find_similar_approved, run_translation_checks. Each returns the JSON and a one-line-per-item text rendering (`prompt`) that the plan templates straight into the model\'s prefix — 30k input tokens a chunk fell to 19k when JSON stopped going to the model.', tone: 'teal' as const },
  { who: 'The skill and the plan', role: 'the order of work', what: 'One SKILL.md (translate-from-source) says what the task is, what it covers, what it declines, and which four tools it may call. The orchestration compiles that into a stepped plan — tokens → lexicon → names → similar → draft → checks → revise (only when a check blocks) → final → propose — and records every step as a PROV activity.', tone: 'amber' as const },
  { who: 'The harness', role: 'what measures it — and what it changed', what: 'Experiments over pre-registered case sets, five arms, deterministic graders first and a judge after, paired-bootstrap lifts, a regression suite that plants six kinds of error into the floor. Its first runs blocked two thirds of a real Bible; what it found rewrote the checker\'s rules, the skill\'s brief and the knowledge base, each fix as a test.', tone: 'violet' as const },
];

const STEPS = [
  { id: 'tokens', kind: 'tool', what: 'get_source_tokens — the frozen tokens for the range: surface, parsing (V-PIA-3S, Prep-b | N-fs), Strong\'s, position. Variant marks ({TR} ⧼RP⧽ (WH) 〈NE〉) stay on the token so the drafter follows the base text and names the variant.' },
  { id: 'lexicon', kind: 'tool', what: 'lookup_lexicon — one entry per Strong\'s number: lemma, part of speech, gloss, definition — and, where the knowledge base has one, the concept rule, divine-name convention or unit value attached to that entry. This is where the ontology enters the prompt.' },
  { id: 'names', kind: 'tool', what: 'lookup_names — every name at these verses resolved through the knowledge base to a referent IRI (a TIPNR person or place, a sect, a title), with its decided rendering for this variety when one exists. Simon\'s son Judas and the patriarch are different IRIs; consistency is bound to the referent, never to an English string.' },
  { id: 'similar', kind: 'tool', what: 'find_similar_approved — approved translations of comparable passages in this edition, as memory. Empty on a new edition; it is what makes the third model arm (model-source-lexicon-memory) differ from the second.' },
  { id: 'draft', kind: 'model', what: 'The drafter (Claude Sonnet 5) reads a cached prefix — the three `prompt` renderings — then the brief and the ask, and returns one entry per verse: the text, and an alignment from EVERY source token to the words that render it (\'-\' only for an article or marker English carries by construction).' },
  { id: 'checks', kind: 'tool', what: 'run_translation_checks — four blocking checks (source coverage, negation, names through the KB, quantities) plus chrF against each reference edition, reported per edition and never pooled. The draft is scored against the source it came from, not against a translation.' },
  { id: 'revise', kind: 'model · guarded', what: 'Runs only when checks.blocking > 0 (a Step.when guard — a skipped step is a recorded skip with a null output). Same cached prefix, the draft and its failing checks, and an instruction per check kind. The tool description is byte-identical to the draft\'s so the cache hits. Clean chunks went from 1 of 6 to 6 of 6 on Jonah.' },
  { id: 'checks2 · final · finalChecks', kind: 'tool', what: 'The revision is checked; local.coalesce picks the revision when it exists and the first draft otherwise, and the proposal carries whichever checks ran last.' },
  { id: 'propose', kind: 'tool', what: 'One proposal per verse into the rbs edition store: text, alignments, checks, arm, and the run reference stamped on it — so an export can tell a driver run from a Lab run that planted an error on purpose.' },
  { id: 'answer', kind: 'answer', what: 'The proposal, back to the caller. The whole run — intent, plan, activities, entities, usage including cache reads and writes, models, checks, answer — is one PROV record on disk outside every repository. The words never enter the evaluations folder; results there are numbers and verdicts only.' },
];

const ONTOLOGY_ROWS = [
  { k: <><Tag tone="navy">G4151</Tag> πνεῦμα</>, v: <>Rule: <em>the referent decides the capital: Spirit / spirit / wind — John 3:8 plays on both.</em> Visible at 3:5–6 “born of water and the <b>Spirit</b>… born of the Spirit is <b>spirit</b>” and 3:8 “The <b>wind</b> blows… born of the <b>Spirit</b>” — the three-way split the rule names, in one passage.</>, meta: 'skb:concept-spirit · scr:TheologicalConcept' },
  { k: <><Tag tone="navy">G5207 + G444</Tag> υἱὸς τοῦ ἀνθρώπου</>, v: <>Rule: <em>“Son of Man” as the title in the Gospels; lower-case for the Hebrew idiom.</em> 3:13, 3:14 read <b>Son of Man</b> — the title, not “son of man”.</>, meta: 'skb:concept-son-of-man' },
  { k: <><Tag tone="navy">G4561</Tag> σάρξ</>, v: <>Rule: <em>“Flesh” where the theological sense is in view; “body” only where the text means meat or mortality plainly.</em> 3:6 “born of the <b>flesh</b> is flesh” — not “body”.</>, meta: 'skb:concept-flesh' },
  { k: <><Tag tone="navy">G932</Tag> βασιλεία</>, v: <>Rule: <em>“Kingdom” throughout.</em> 3:3, 3:5 <b>kingdom of God</b>.</>, meta: 'skb:concept-kingdom-of-god' },
  { k: <><Tag tone="navy">G2920 / G2919</Tag> κρίσις / κρίνω</>, v: <>Rule: <em>“judgment” where God’s verdict is; never “righteousness”.</em> 3:19 “this is the <b>judgment</b>” (where a translator working from memory might reach for “condemnation”).</>, meta: 'skb:concept-justice' },
  { k: <><Tag tone="navy">G166 + G2222</Tag> ζωὴ αἰώνιος</>, v: <>Rule: <em>“Eternal life” throughout John and the letters; “everlasting” only in the Old Testament’s “everlasting covenant”.</em> 3:15, 3:16, 3:36 <b>eternal life</b> — no “everlasting”.</>, meta: 'skb:concept-eternal-life' },
  { k: <><Tag tone="navy">G5547</Tag> Χριστός</>, v: <>Convention: <em>“Christ” throughout the New Testament; “the Messiah” where the article carries a title, footnoted.</em> 3:28 “I am not the <b>Christ</b>”.</>, meta: 'skb:divinename-christos · btr:NameRendering decision-names-amer-v1' },
  { k: <><Tag tone="navy">G4100</Tag> πιστεύω</>, v: <>Rule: <em>“faith” and “believe” for the Greek; “faithfulness” where the text means reliability.</em> 3:15, 16, 18, 36 <b>believe</b>.</>, meta: 'skb:concept-faith' },
  { k: <><Tag tone="navy">G907</Tag> βαπτίζω</>, v: <>Rule: <em>transliterate — “baptize”, never “immerse” in the running text.</em> 3:22–23, 26 <b>baptizing</b>.</>, meta: 'skb:concept-baptism' },
  { k: <><Tag tone="navy">G2316</Tag> θεός</>, v: <>Convention: <em>“God” of the true God; “god” / “gods” of others.</em> Every <b>God</b> in the chapter — and this one is <b>checked</b>, not only advised: the names check holds the draft to the decided rendering of the referent.</>, meta: 'skb:divinename-theos · btr:NameRendering decision-names-amer-v1' },
];

const NAMES = ['Jesus', 'Nicodemus', 'Moses', 'John', 'Israel', 'Judah / Judea', 'Jordan', 'Aenon', 'Salim', 'Pharisee', 'Rabbi'];

const HARNESS_PLAN = [
  { k: '1 · Freeze the sources', v: 'Ingest the token tables, the lexicon subset and the reference editions once, under content commitments the MCP refuses to re-ingest if the upstream revision moved. A benchmark against a moving source is not a benchmark.', meta: 'ingest-sources.mts · /admin/segments refuses a moved revision' },
  { k: '2 · Pre-register the sets', v: 'A dev set (55 cases) to tune on, a regression set (580 planted errors, six kinds) that measures the checker and is never pooled with a capability set, and a held-out set written ONCE and locked. A set says task: translate; a localise arm on it is refused.', meta: 'suiteKind: capability | regression · held-out: locked' },
  { k: '3 · Set the floor and the ceiling', v: 'control-web runs the WEB through the checker as the ceiling (its chrF against itself excluded). gloss renders the tables\' glosses in gloss order with one alignment per token — the floor, and pure, so the regression suite can plant its errors in the same text and know exactly what it planted.', meta: 'arms: control-web · gloss · model-src · model-lex · model-mem' },
  { k: '4 · Run the deterministic graders first', v: 'scope, fidelity-checks (the same four checks the plan runs), source-coverage, perturbation-catch, chrF per reference edition. A judge grader (fidelity) sees the WEB as a flagged reference, and reads cantTell — out of the agent\'s denominator — when its key is absent. A run with no verdict carries a failureCause: agent, grader or environment; only agent counts against the agent.', meta: 'ALL_GRADERS — one list; the one-run path once had its own' },
  { k: '5 · Read the floor and the ceiling before reading the model', v: 'If the checker blocks the WEB, the checker is wrong, not the WEB. Tune on dev until both read ~0.99; re-run regression to see what the tuning cost in catch rate; then — and only then — run the model arms, and quote held-out alone.', meta: 'tr-dev-local-2 → -3 · tr-regression-local-3' },
  { k: '6 · Pilot, then drive', v: 'A whole-Bible driver walks the source chapter by chapter in chunks of eight verses with a ledger and a resume; a pilot over small books (Jonah, Ruth, Philemon, Jude, Obadiah, 2–3 John: 231 verses) set the revise pass, the text prompts, prompt caching and the D1 bind limit before a dollar went on a long book. Then one chapter: John 3.', meta: 'translate-bible.mts --chapters John.3' },
  { k: '7 · Publish under an issuer', v: 'Export picks one proposal per verse (approved > not rejected > fewer blocking > later), from driver runs only; a service agent chartered by the scripture steward signs every verse descriptor with a key it holds only as a delegate. The edition carries no Berean name.', meta: 'rbs-bible.svc · AKCS content-signer key · ERC-7710 leaf' },
];

const FOUND = [
  { k: 'The checker blocked the Bible', v: 'First dev run: 67% of the WEB (the ceiling) and 80% of the floor failed a blocking check. Five rules were wrong, not the texts: curly apostrophes (don’t ≠ don\'t); one `not` demanded per negator where English distributes one over “or” and οὐ μή is one negation; numbers that did not compose (“fourteenth” is 4 + 10, “three hundred” 3 × 100); divine-name claims by a Strong\'s that is also a common noun (πνεῦμα in “poor in spirit”, עֶלְיוֹן “upper pool”); “dropped content tokens” that were conjunctions and prepositions English absorbs.', meta: 'fidelity-checks: control-web 0.99 · gloss 0.99 after · blocking rate 0.09 / 0.24' },
  { k: 'The regression suite priced the fix', v: 'Freeing pronoun drops raised catch 0.90 → 0.94 overall (added-clause 0.76 → 0.99, dropped-clause 0.92 → 0.97) and cost changed-name 1.00 → 0.91 and swapped-speaker 0.99 → 0.90. The suite exists so that a rule loosened for the ceiling shows what it stopped catching.', meta: 'tr-regression-local-3 · 580 runs · per kind, never pooled' },
  { k: 'The pilot changed the plan', v: 'Jonah: 1 of 6 chunks clean on a single draft; 6 of 6 with a guarded revise pass that hands the model its draft and the failing checks. Prefixed waw read as a dropped token until `Conj-w | V-…` was parsed as the verb it is; נָא and לֵאמֹר-as-infinitive became free; numeral runs compose under + and × in any bracketing; a hyphenated compound reads as its parts. Jude\'s sentences carried more Strong\'s numbers than D1 allows binds, so every IN (…) is paged.', meta: '5 lessons in the driver\'s record; each a test' },
  { k: 'John 3 found two more', v: 'Two chunks still blocked after revise. 3:4 — δεύτερον is glossed “secondly”, so “a second time” read as a number the source did not have; the quantities check now reads an ordinal adverb as its number. 3:13 — εἰ μή is exceptive, and the negation check wanted a `not` for a μή the draft had rightly rendered “except”; a negator after εἰ / ἐάν rendered except / unless is carried. Both drafts were right; both rules were wrong; both are tests; the chapter re-ran to 36 of 36.', meta: 'John.3.1-8 blocking 2 → 0 · John.3.9-16 blocking 1 → 0 · $0.77' },
  { k: 'The prompt got cheaper without getting shorter', v: 'JSON out of the model\'s context (the tools render a `prompt` line per item): 30k → 19k input tokens a chunk. The system and the passage prefix marked ephemeral for caching; the revision reads the draft\'s prefix from cache — once the tool description was made identical across the two calls (tools precede the system in the cache key). Cache reads and writes are on the usage line of every record.', meta: '$0.012–0.023 a verse on Claude Sonnet 5 · whole Bible ≈ $650' },
];

export default function BibleTranslation() {
  return (
    <>
      <PageHero
        eyebrow="Example · a translation loop, measured"
        title={<>Translating John 3 from the Greek.<br />What shaped every verse.</>}
        lede="A new American English edition — rbs — drafted from the original-language tokens alone. No English Bible in the drafter's prompt; a knowledge base of referents and rules in it instead. A skill and a stepped plan order the work; four deterministic checks block a bad verse and send it back once; a harness measures the whole loop against a floor and a ceiling. This page shows every piece, the harness plan and its steps, and exactly what the harness changed — in the checker, the skill and the knowledge base — before the chapter came out clean."
      >
        <Link href={SCRIPTURE} className="btn-brass">The Scripture service <ArrowRight className="h-4 w-4" /></Link>
        <Link href="/examples/private-scripture" className="btn-outline-light">Asking Scripture privately</Link>
      </PageHero>

      <Section id="picture" tone="navy" eyebrow="The picture" title="Six bands. The drafter sees the top three; the harness sees them all." lede="Read it top to bottom: what the drafter may see and what it may not; the MCP tools that serve it; the skill and the plan with its revise pass; the four checks; the harness — and, in the gutter, the three dashed arrows that carry what the harness found back into the checker, the skill and the knowledge base. The right-hand column is where a verse goes afterwards.">
        <Figure dark caption="The translation loop. Probabilistic steps are the two model calls (draft, revise — rose). Everything else — every tool, every check, every grader but the judge — is deterministic and recorded. The English editions on the top right exist only for the graders; the rbs text on the bottom right was never compared with any of them while it was being written.">
          <DiagramImg name="translation-loop" dark alt="The translation loop: frozen sources and the knowledge base through MCP tools, a skill and a stepped plan with a revise pass, four deterministic checks, and a harness whose floor-and-ceiling runs tune the checker, the skill and the knowledge base — out to a signed edition" width={1300} height={1000} priority />
        </Figure>
      </Section>

      <Section number="01" eyebrow="The pieces" title="Four things touched every verse. None of them was a translation." lede="The constraint that makes the loop honest is in the first card: the drafter is never shown an English rendering of the passage. Everything that shapes a verse therefore has to come in through the source, the knowledge base, the skill, or the checks — and each of those is something the harness can measure and change.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PIECES.map((p) => (
            <div key={p.who} className="card">
              <div className="flex flex-wrap items-center gap-2">
                <Tag tone={p.tone}>{p.who}</Tag>
                <span className="text-xs text-slate-500">{p.role}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{p.what}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section number="02" tone="cream" eyebrow="The plan, step by step" title="Ten steps. Two of them think." lede="This is the plan the model-source-lexicon-memory arm runs for one chunk of eight verses. Every step is a PROV activity with its inputs named; every output is an entity; a guarded step that does not run is a recorded skip. The two model steps are the only probabilistic ones.">
        <Ledger rows={STEPS.map((s) => ({ k: <span className="font-mono text-sm">{s.id} <span className="ml-2 text-xs font-normal text-slate-500">{s.kind}</span></span>, v: s.what }))} />
        <div className="mt-8">
          <Callout tone="navy">
            The prompt is text, not JSON. <code>get_source_tokens</code>, <code>lookup_lexicon</code> and <code>lookup_names</code> each return a <code>prompt</code> rendering — one line per token, lexeme or name, cantillation stripped — and the plan templates those into a cached prefix. The model never parses a structure to find a gloss.
          </Callout>
        </div>
      </Section>

      <Section number="03" eyebrow="The ontology in the text" title="Two layers of the knowledge base reached the drafter in John 3. Both are visible in the verses." lede="The scripture knowledge base is an A-box, not a glossary: 3,129 persons, 1,007 places, 5,168 key terms, 45 theological concepts whose definition IS the rendering rule, 16 divine names each with a convention. The lexicon tool attaches a concept's rule to the Strong's entry it governs; the names tool resolves a token to a referent and its decided rendering. Here is where each one shows in the chapter.">
        <Ledger rows={ONTOLOGY_ROWS} />
        <div className="mt-10 grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <div className="card">
            <h3 className="text-base font-semibold text-navy">Names resolved to referents</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Each of these was resolved through the knowledge base to its TIPNR IRI (<code>scr:Person</code>, <code>scr:Place</code>, <code>scr:NamedThing</code>), so the check holds the draft to the <em>referent&apos;s</em> rendering rather than to a spelling: the Judas who was Simon&apos;s son is one IRI in all four Gospels, and the patriarch is another.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">{NAMES.map((n) => <Tag key={n} tone="teal">{n}</Tag>)}</div>
            <p className="mt-4 text-xs text-slate-500">Four <code>btr:NameRendering</code> decisions were enforced, not advised: God, Jesus, Christ, Holy Spirit (<code>decision-names-amer-v1</code>). One unit (G5438 φυλακή “watch of the night”, with its approximate value) also reached the prompt and went unused.</p>
          </div>
          <Callout tone="amber">
            A caveat on causality. The rules were in the prompt and the text conforms; that is what this page can show. Whether a drafter <em>without</em> the lexicon and the knowledge base would have written “wind” at 3:8 and “judgment” at 3:19 is a counterfactual the harness is built to answer — the <code>model-src</code> arm over the same chapter, about $0.80 — and has not yet been run on John 3.
          </Callout>
        </div>
      </Section>

      <Section number="04" tone="navy" eyebrow="The harness plan" title="Seven steps, in the order they have to happen." lede="A harness is a plan before it is a tool. This one freezes what it measures, pre-registers what it will measure it against, sets a floor and a ceiling, grades deterministically before it asks a judge, reads the floor and ceiling before it reads the model, pilots before it drives — and only then publishes under an issuer.">
        <Ledger dark rows={HARNESS_PLAN} />
      </Section>

      <Section number="05" eyebrow="What the harness changed" title="The harness did not grade the translation. It rewrote the rules the translation was held to." lede="Each of these is a measurement that disagreed with a text the measurement had no business failing — the WEB, the floor, a Jonah chunk, two verses of John 3 — and a rule that changed as a result, with a test so it cannot drift back. The skill's text, the checker, and the knowledge base are the three things it reached.">
        <div className="mb-10 grid gap-4 md:grid-cols-4">
          <Stat value="0.99" label="fidelity-checks on the ceiling and the floor" note="was: 67% / 80% blocked" />
          <Stat value="0.94" label="regression catch rate" note="580 planted errors · was 0.90" />
          <Stat value="6 / 6" label="Jonah chunks clean with revise" note="was 1 / 6 on a single draft" />
          <Stat value="36 / 36" label="John 3 verses clean" note="two checker gaps found and fixed · $0.77" />
        </div>
        <Ledger rows={FOUND} />
      </Section>

      <Section number="06" tone="cream" eyebrow="The result" title="John 3:16, from the Greek." lede="Twenty-five tokens, twenty-five alignments, one negator carried, θεός rendered by convention and ζωὴ αἰώνιος by the knowledge base's rule. No reference edition was consulted while it was written; the graders compared it with four afterwards.">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card">
            <div className="flex items-center gap-2"><Tag tone="violet">rbs</Tag><span className="text-xs text-slate-500">Richard Bible Standard · en-US · from NE1904</span></div>
            <p className="mt-4 text-xl leading-relaxed text-navy">For God so loved the world that he gave his one and only Son, so that everyone who believes in him should not perish but have eternal life.</p>
            <p className="mt-4 font-mono text-[11px] text-slate-500">source-coverage 25/25 · negation 1 carried · names: θεός → “God” (conventional) · quantities: none in the source · issuer rbs-bible.svc</p>
          </div>
          <div className="card">
            <div className="flex items-center gap-2"><Tag tone="slate">BSB</Tag><span className="text-xs text-slate-500">Berean Standard Bible · a grader&apos;s reference, never the drafter&apos;s</span></div>
            <p className="mt-4 text-xl leading-relaxed text-slate-700">For God so loved the world that He gave His one and only Son, that everyone who believes in Him shall not perish but have eternal life.</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">Where they differ is where a rule or a reading decided: rbs does not capitalise deity pronouns, renders ἵνα “so that”, and μὴ ἀπόληται “should not perish”. Where they agree, the same Greek produced the same English twice, independently.</p>
          </div>
        </div>
        <div className="mt-8">
          <Callout tone="teal">
            The edition is served by the Scripture service as <code>rbs</code>, public domain, one signed descriptor per verse, verifiable against the corpus root — and under an issuer of its own (<code>rbs-bible.svc</code>, chartered by the scripture steward), because a derived edition does not carry the Berean name. John 3 is the first chapter; the rest of the Bible is a decision about spend (≈ $650 at the pilot&apos;s rate), not about method.
          </Callout>
        </div>
      </Section>

      <CTA title="A harness measures. A good one changes things." body="The same loop — frozen sources, a knowledge base, a skill, a stepped plan, deterministic checks, a floor and a ceiling — is how every skill on this substrate is assessed. The translation is one example where the thing being measured is a sentence, which makes what the harness changed easy to see." primary={{ href: '/architecture', label: 'The architecture' }} secondary={{ href: '/examples/private-scripture', label: 'Asking Scripture privately' }} />
    </>
  );
}
