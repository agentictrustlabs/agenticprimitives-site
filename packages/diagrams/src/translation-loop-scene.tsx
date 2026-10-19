// HOW THE BIBLE GETS TRANSLATED — drawn as a workshop town, for the reader who will never open the plan. The open
// sources (the Hebrew and Greek, a lexicon, the people and places, the syntax trees, the word senses, the events) are
// shelved on the west side and poured into the library: the ontology and its knowledge base. The library generates
// everything else — the skills in the workshop, the rules at the tool counter, the plan the agent runs. On the harness
// floor the Translation Agent takes one passage at a time: asks the tool counter for the source, asks the model desk
// for a draft, asks the tool counter to check it, asks the model desk to revise it, and files the result in the
// edition store. The test lab measures the whole loop against a floor and a ceiling. The workbench is where people
// decide — and their decisions go back into the library, and the next passage runs under the new release.
//
// Same contract as the other iso scenes: a `beat` prop, CSS transitions for everything that changes, CSS motion paths
// for the walkers. A static render is a still of that beat. Plain words on the drawing; the technical names live on
// the page.
import type { ReactNode } from 'react';
import { Box, District, EASE, ISO_H, ISO_W, Lane, PAL, Reply, Tag, Tile, Tree, Walker, iso, pathOf, shade } from './iso-town';
import { Agent, Person, Spot, wrap } from './member-message';
import { FONT, tw } from './primitives';

export type TranslationBeat = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export interface TranslationBeatInfo {
  id: string;
  title: string;
  /** What is on screen, in one plain paragraph. */
  caption: string;
  /** The line that makes ours different, said to a non-technical reader. */
  rule: string;
  /** Autoplay dwell, ms — used when narration is off. */
  ms: number;
  /** The interaction, made explicit: who is acting, who receives, what passes between them. */
  from: string;
  to: string;
  what: string;
  /** The spoken walkthrough for this scene (also shown as the transcript). */
  narration: string;
}

export const TRANSLATION_BEATS: readonly TranslationBeatInfo[] = [
  {
    id: 'meet', title: 'Meet the workshop', ms: 10000,
    caption: 'On the west side, six shelves of open scholarship: the Hebrew and Greek text itself, a lexicon, every person and place, the syntax trees, the word senses, the narrative events. At the top, the library — the ontology and its knowledge base — where all of it is described once. East: the skill workshop and the tool counter. In the middle, the harness floor, where the Translation Agent works beside the model desk. South-west, the test lab. South-east, the workbench, where the people are. One person stands by the library: the editor, who writes the rules.',
    rule: 'The model is the smallest building in the picture. Everything else exists to hold it to the text.',
    from: 'Nobody yet', to: '—', what: 'Who is where, and what each part is for',
    narration: "Let's walk around the workshop. On the left are six shelves of open scholarship: the Hebrew and Greek text itself, frozen so it cannot drift; a lexicon; every person and place in the Bible; the syntax trees that say which words make a clause; the word senses; and the narrative events. At the top is the library — the ontology and its knowledge base — where all of that is described once. On the right, the skill workshop and the tool counter. In the middle, the harness floor, where the Translation Agent works, with the model desk beside it. Down on the left, the test lab. Down on the right, the workbench, where the people are. And one person stands by the library: the editor, who writes the rules. Notice how small the model desk is. Everything else in this picture exists to hold it to the text.",
  },
  {
    id: 'sources', title: 'The sources pour into the library', ms: 10000,
    caption: 'The six shelves are loaded into the library, each under its own licence and pinned to an exact release. The Hebrew and Greek become 443,625 frozen tokens. The people and places become nodes — 3,129 persons, 1,007 places — not names. The syntax trees are aligned to the tokens word by word, proven, never assumed. The dictionaries give 25,751 senses, each tied to the passages where a word has that sense. The editor adds what no file contains: fifty concept rules, written down with reasons.',
    rule: 'Nothing is typed in by hand except the decisions. Everything else is built from a pinned source, and the build refuses drift.',
    from: 'the six shelves · and the editor', to: 'the library', what: 'frozen tokens · a lexicon · people and places as nodes · syntax aligned to the tokens · senses per passage · events — and fifty concept rules a person wrote down',
    narration: "First, the sources pour into the library. Each shelf is loaded under its own licence, pinned to an exact release. The Hebrew and Greek become four hundred and forty-three thousand frozen tokens. The people and places become nodes, not names — three thousand persons, a thousand places — so the Judas who betrayed Jesus is one node in all four Gospels, and the patriarch Judah is another. The syntax trees are aligned to those tokens word by word, and every match is proven, never assumed. The dictionaries contribute twenty-five thousand senses, each tied to the exact passages where a word carries that sense. And the editor adds the one thing no file contains: fifty concept rules — eternal life, never everlasting; baptize, never immerse — each written down with its reason. Nothing is typed in by hand except the decisions.",
  },
  {
    id: 'generate', title: 'The library generates the rest', ms: 9500,
    caption: 'From the one description, three things are produced, never written separately: the skills in the workshop (each ends with the exact record it must leave, generated from the ontology\'s shapes); the rules at the tool counter (the checker\'s profile, the controlled values, the store\'s seed of names and renderings); and the plan the agent will run, with its vocabularies. A build fails when any of them drifts from the library.',
    rule: 'One description, many projections. Change a rule in the library and the skill, the checker and the plan all change — or the build fails.',
    from: 'the library', to: 'the skill workshop · the tool counter · the harness floor', what: 'the skills\' record sections · the checker\'s rules and the store\'s seed · the plan and its controlled values',
    narration: "Now watch the library work. From that one description, three things are generated — never written separately. The skills in the workshop: each one ends with the exact record it must leave behind, produced from the ontology's shapes. The rules at the tool counter: the checker's profile, the controlled values, and the store's seed of names and decided renderings. And the plan the agent will run, with its vocabularies. If someone changes a rule in the library, the skill text changes, the checker changes and the plan changes together — and if any of them drifts, the build fails. One description, many projections.",
  },
  {
    id: 'skills', title: 'The skills become the agent\'s playbook', ms: 8000,
    caption: 'Twelve skills — assemble the passage, resolve the referents, draft from the source, run the rules, check fidelity, critique independently, record a decision, submit for review, decline what is out of scope — are compiled into one playbook for the Translation Agent, identified by a digest. The agent is born with it. The playbook says how to behave; it grants nothing.',
    rule: 'The playbook is behaviour, not permission. Nothing the agent reads in it lets it do anything a person did not authorize.',
    from: 'the skill workshop', to: 'the Translation Agent', what: 'twelve skills compiled into one playbook, by digest — how to draft, check, record, submit, and when to decline',
    narration: "The skills go to the agent. Twelve of them — assemble the passage, resolve the referents, draft from the source, run the rules, check fidelity, critique independently, record a decision, submit for review, and decline what is out of scope — are compiled into one playbook for the Translation Agent, identified by a digest. The agent is born with it. But notice what the playbook is: it says how to behave. It grants nothing. Nothing the agent reads in it lets it do anything a person did not authorize.",
  },
  {
    id: 'counter', title: 'The tool counter opens — and the test lab checks the checker first', ms: 10000,
    caption: 'The tool counter is the translation MCP: a small set of tools the agent may call — the source tokens, the lexicon, the names, the syntax, the senses, the checks, and propose. The checks are deterministic code, no model. Before any draft is believed, the test lab runs a respected human translation and a word-for-word gloss through those checks. The first time, 67% of the human translation failed. The Bible was not wrong; five rules were. They were fixed until both pass at 0.99.',
    rule: 'Measure the measurer first. A checker that fails a good human translation is a broken checker, not a bad Bible.',
    from: 'the test lab', to: 'the tool counter', what: 'a human translation (the ceiling) and a gloss (the floor) through the checks — 67% failed, five rules were wrong, now both pass at 0.99',
    narration: "The tool counter opens. This is the translation MCP: a small set of tools the agent is allowed to call. Fetch the source tokens. Look up the lexicon. Look up the names. Get the syntax. Get the senses. Run the checks. Propose. The checks are deterministic code — no model anywhere in them. And before any draft is believed, the test lab does something most projects skip: it runs a respected human translation and a word-for-word gloss through those checks. The first time, sixty-seven percent of the human translation failed. The Bible was not wrong. Five of our rules were. They were fixed until the human translation and the gloss both passed at ninety-nine percent. Only then was the checker trusted.",
  },
  {
    id: 'pericope', title: 'A passage arrives — blind', ms: 8000,
    caption: 'The editor starts the run. The Bible is cut into 3,817 natural passages, and they come to the harness floor one at a time: here, six verses of John 3. The agent is handed the span and nothing else. Not the English. Not even the reference — the prompt will say "verse one" to "verse six", so the model cannot recognise the passage and recite it.',
    rule: 'The drafter never sees an English Bible, and is never told which passage this is.',
    from: 'the editor · the frozen text', to: 'the Translation Agent', what: 'one passage — six verses of John 3 — with no English and no reference',
    narration: "The editor starts the run. The Bible has been cut into three thousand eight hundred natural passages, and they come to the harness floor one at a time. Here comes one: six verses of John chapter three. The agent is handed the span and nothing else. Not the English. Not even the reference. The prompt will call these verse one through verse six, so the model cannot recognise the passage and recite what it remembers. That blindness is the whole safeguard against cheating, and it starts here.",
  },
  {
    id: 'fetch', title: 'Step one: the agent asks the tool counter for the source', ms: 9500,
    caption: 'Five tool calls, no model. For each verse: the tokens with their parsing and Strong\'s numbers; the lexicon entry per word, with the concept rule, divine-name convention or unit value riding along; every name resolved to its node and the rendering already decided for it; the clause outline from the syntax trees — who does what to whom; and the sense each word has at this passage, left open where the dictionary gives two.',
    rule: 'The agent reads the source through the library, not through its memory of English.',
    from: 'the Translation Agent', to: 'the tool counter', what: 'get_source_tokens · lookup_lexicon · lookup_names · get_source_syntax · get_token_senses — back come the tokens, the rules, the nodes, the clauses, the senses',
    narration: "Step one. The agent walks to the tool counter and asks for the source. Five tool calls, no model. For each verse: the tokens with their parsing and Strong's numbers. The lexicon entry for each word — and where the library has a concept rule, a divine-name convention or a unit value for that word, it rides along. Every name, resolved to its node, with the rendering already decided for it. The clause outline from the syntax trees: who does what to whom. And the sense each word has at this passage — left open where the dictionary gives two. The agent reads the source through the library, not through its memory of English.",
  },
  {
    id: 'draft', title: 'Step two: the model desk drafts — the first model call', ms: 10000,
    caption: 'Now the model is called, once. It is shown the tokens, the lexicon, the names, the clauses, the senses and the brief — as text, in a cached prefix so later calls reuse it. It must return the English for every verse and an alignment: which source word each English word renders, written as one compact string. The cheap model drafts. Nothing in its prompt is an English Bible.',
    rule: 'The model proposes words and must account for every one of them. It is never the judge of its own work.',
    from: 'the Translation Agent', to: 'the model desk (the drafter)', what: '"translate every verse, align every token" — back comes a draft and the alignment: 1=For; 2–3=God loved; 4=the world …',
    narration: "Step two. Now, for the first time, the model is called. The agent brings the tokens, the lexicon, the names, the clause outline, the senses and the brief to the model desk — as plain text, in a prefix the later calls will read from cache. The instruction is short: translate every verse, and align every token. The model returns the English for each verse and one compact string saying which source word every English word renders. The cheap model does this; it drafts the whole Bible for about twenty-five dollars. Nothing in its prompt is an English Bible. The model proposes words, and must account for every one of them. It is never the judge of its own work.",
  },
  {
    id: 'checks', title: 'Step three: the checks — deterministic, no model', ms: 11000,
    caption: 'The agent takes the draft back to the tool counter. First a repair: words whose English is already in the verse are aligned by code, so no model call is spent on bookkeeping. Then the checks: is every source word accounted for? Was every negation carried? Are the numbers right? Does every name match its node\'s rendering? Is a word under a concept rule rendered with the rule\'s stem — in this sense of the word? Is there English with no source behind it? And, separately: how much of this coincides with a published Bible — measured, never rewarded. Here verse 18 came back as a 21-word run identical to a published edition, and one word in verse 17 was unaccounted for. Blocking.',
    rule: 'The checks are code, run outside the model. A verse that matches a published Bible word for word is a finding, never a success.',
    from: 'the Translation Agent', to: 'the tool counter (the checker)', what: 'repair_alignments · run_checks — coverage · negation · numbers · names via the library · terminology by sense · additions · the recall gate. Result: v18 recalled ✗ · v17 one word unaccounted ✗',
    narration: "Step three. The agent takes the draft back to the tool counter. First a repair pass, by code: words whose English is already in the verse are aligned without asking the model, so no model call is ever spent on bookkeeping. Then the checks. Is every source word accounted for? Was every negation carried? Are the numbers right — in a system that knows three hundred is three times a hundred? Does every name match its node's decided rendering? Is a word under a concept rule rendered with the rule's stem — and only in the sense the dictionary gives it here? Is there English with no source word behind it? And, measured separately: how much of this coincides with a published Bible? Here, verse eighteen came back as a twenty-one word run identical to a published edition, and one word in verse seventeen had no account. Both are blocking. Notice that nothing in this step is a model. And notice that matching a published Bible word for word is a finding, never a success.",
  },
  {
    id: 'revise', title: 'Step four: revise — the model is called again, with the evidence', ms: 10500,
    caption: 'Only because a check blocked, the model is called again. It receives its own draft and the failing checks; the recalled run is forbidden verbatim. Round one and two go to the cheap model; a stronger model takes round three only on passages still failing. After each round the checks run again. Here: round two cleared verse 17; round three rewrote verse 18 in its own words; the checker reads 0 blocking.',
    rule: 'Revision is driven by the checker\'s evidence, not by the model\'s opinion of itself. The strong model is paid for only where the cheap one failed.',
    from: 'the Translation Agent', to: 'the model desk (the reviser) · then the tool counter again', what: '"your draft, and the checks that failed; this run is forbidden" — rounds 1–2 cheap, round 3 strong; checks after each; result 0 blocking ✓',
    narration: "Step four. Only because a check blocked, the model is called again. This time it receives its own draft and the failing checks — and the recalled run of words is forbidden, verbatim. Rounds one and two go to the cheap model. A stronger model takes round three, and only on passages that are still failing. After every round the agent walks the draft back to the tool counter and the checks run again. Here, round two cleared verse seventeen; round three rewrote verse eighteen in its own words; and the checker reads zero blocking. Revision is driven by the checker's evidence, not by the model's opinion of itself. And the expensive model is paid for only where the cheap one failed — which is why the whole Bible costs about two hundred and thirty dollars instead of seven hundred and fifty.",
  },
  {
    id: 'propose', title: 'Step five: propose — the output, with its whole account', ms: 9000,
    caption: 'The agent files one proposal per verse in the edition store: the English, the alignment for every token, the checks it passed and the ones it did not, which model drafted and which revised, the cost, and the run it came from. Where the dictionary left a reading genuinely open, a footnote says so rather than choosing silently. Beside the store, the record of every step — each tool call, each model call, each skipped step — files as provenance. The status says "checked". It never says "approved".',
    rule: 'The output is not a sentence. It is a sentence with its evidence attached, filed where people can read both.',
    from: 'the Translation Agent', to: 'the edition store', what: 'propose_translation — six verses, every token aligned, the checks, the models, the cost, the run id; the provenance record files beside it. Status: checked.',
    narration: "Step five. The agent files one proposal per verse in the edition store. Not just the English: the alignment for every token, the checks it passed and the ones it did not, which model drafted it and which revised it, what it cost, and the run it came from. Where the dictionary left a reading genuinely open — overcome or understand, cleanse or prune — a footnote says so rather than choosing silently. And beside the store, the record of every step files as provenance: each tool call, each model call, each step that was skipped and why. The status on the verse says checked. It never says approved. The output is a sentence with its evidence attached.",
  },
  {
    id: 'evals', title: 'The test lab measures the loop', ms: 11000,
    caption: 'The same plan runs on pre-registered passages — a development set to tune on, a held-out set written once and locked. Beside the agent\'s arm stand a ceiling (a human translation) and a floor (the word-for-word gloss). 580 passages carry a planted error — a dropped clause, a flipped negation, a swapped speaker, a changed number — and the catch rate per kind is reported on every change (0.93 today). A model from a different family judges meaning and fluency, and its name is on every number. Two arms are compared as paired differences with intervals: when the syntax and senses were added, the accounting improved and the judged meaning did not move — so that is what is said.',
    rule: 'A number is quoted only with its floor, its ceiling, its judge and its interval. A change that moves nothing is reported as moving nothing.',
    from: 'the test lab', to: 'the harness floor · the tool counter', what: 'the same plan on 73 held-out passages · floor and ceiling beside it · 580 planted errors (caught 0.93) · a second-family judge · paired lifts with intervals',
    narration: "Now the test lab measures the loop. The same plan runs on pre-registered passages — a development set to tune on, and a held-out set written once and locked, so it can be quoted. Beside the agent's arm stand a ceiling, a respected human translation, and a floor, the word-for-word gloss. Five hundred and eighty passages carry a planted error — a dropped clause, a flipped negation, a swapped speaker, a changed number — and the checker's catch rate for each kind is reported on every change; today it is ninety-three percent. A model from a different family judges meaning and fluency, and its name is on every number, because judges disagree. Two arms are compared as paired differences with confidence intervals. When the syntax trees and the senses were added, the accounting improved — more source words mapped, fewer rule misses — and the judged meaning did not move. So that is exactly what is reported: an improvement in accounting, and nothing yet in meaning.",
  },
  {
    id: 'workbench', title: 'People are activated: the workbench', ms: 11500,
    caption: 'Proposals reach the workbench with their source, checks, models and cost. A reviewer reads verse by verse; a second person validates; a third approves — never the same person twice, and never the proposer. Every decision is a receipt against the exact text it approved, so an edit after approval is visibly stale. Facing a verse with blocking checks, a reviewer can Ask: is the verse wrong, or is the checker? The answer comes with a recommendation and a button — accept, edit, reject, or file a change request against the rule, with the verse as evidence. The chair rules on what is disputed: in John, Ἰουδαῖοι is "the Jews", never "the Jewish leaders"; who is meant goes in a note.',
    rule: 'No verse is approved by a machine. Three people decide, their decisions are signed records, and a disagreement with the rules becomes a filed request — not a note in a meeting.',
    from: 'the edition store', to: 'the reviewers · the chair', what: 'proposals with their evidence → receipts per verse (accept · edit · reject) · "the checker is too broad here" → a change request with evidence · the chair\'s ruling on Ἰουδαῖοι',
    narration: "Now the people are activated. Proposals reach the workbench with their source, their checks, their models and their cost. A reviewer reads verse by verse. A second person validates. A third approves — never the same person twice, and never the one who proposed. Every decision is a receipt against the exact text it approved, so if anyone edits the verse afterwards, the approval is visibly stale. Facing a verse with blocking checks, a reviewer can ask: is the verse wrong, or is the checker? The answer comes back in plain language with a recommendation and a button — accept, edit, reject, or file a change request against the rule, with this verse as the evidence. And the chair rules on what is disputed. In John, the Greek word for the Jews is rendered the Jews — never the Jewish leaders — and where the authorities are meant, a note says so. No verse of this edition is approved by a machine.",
  },
  {
    id: 'again', title: 'The decisions go back into the library — and we start again', ms: 12000,
    caption: 'A change request that is accepted is applied in the library, not in someone\'s notes: the chair\'s ruling becomes a decision on the node; a too-broad rule becomes a corrected concept rule; a missing distinction becomes a new class. The library ships a versioned release — scripture 1.4.0 added each book\'s author, audience and setting, the situation of every passage, and nine more concepts — and every projection regenerates: the skills, the checker (now version .14), the store\'s seed, the plan. The release is measured on the same held-out set before it counts. Then the next passage arrives, and runs under the new release.',
    rule: 'The loop closes through the ontology. A release with no measurement is not a release.',
    from: 'the workbench', to: 'the library → the workshop, the tool counter, the harness floor', what: 'accepted change requests → a versioned ontology release → skills, checker, seed and plan regenerated → measured on the same held-out set → the next passage runs under it',
    narration: "Last, the loop closes. A change request that is accepted is applied in the library — not in someone's notes. The chair's ruling becomes a decision on the node. A rule that was too broad becomes a corrected concept rule. A distinction the ontology lacked becomes a new class. The library ships a versioned release — the latest added each book's author, audience and setting, the situation of every passage, and nine more concepts — and every projection regenerates: the skills in the workshop, the checker at the tool counter, the store's seed, the plan on the floor. Before the release counts, it is measured on the same held-out set as the one before it. A release with no measurement is not a release. And then the next passage arrives, and runs under the new rules. The people decided; the library remembers; the agent reads the library. That is the whole loop, and it goes around again.",
  },
];

const W = ISO_W; const H = ISO_H;
const SUMMARY = 13;

// ── the town plan ──────────────────────────────────────────────────────────────────────────────────────────────────
// Grid 0..22 × 0..16. In this projection the screen's TOP is the (0,0) corner, LEFT is large gy, RIGHT is large gx and
// BOTTOM is the (22,16) corner. So: the library at the top; the six shelves down the left edge; the skill workshop and
// the tool counter down the right edge; the harness floor in the middle; the test lab lower-left; the workbench lower-right.
const GX = 26; const GY = 21;
const LIB = { gx: 3.4, gy: 1.0, w: 4.4, d: 2.8, h: 76 }; const LIBFRONT = { gx: 5.6, gy: 4.2 }; const LIBEAST = { gx: 8.0, gy: 2.2 };
const EDITOR = { gx: 9.0, gy: 4.6 };
const SHELF_X = 0.8; const SHELF_W = 1.5; const SHELF_D = 1.1;
const SHELVES = [
  { gy: 5.0, sign: 'Hebrew & Greek text', note: 'frozen tokens' },
  { gy: 7.0, sign: 'Lexicon', note: 'STEP' },
  { gy: 9.0, sign: 'People & places', note: 'TIPNR · OpenBible' },
  { gy: 11.0, sign: 'Syntax trees', note: 'Macula' },
  { gy: 13.0, sign: 'Word senses', note: 'UBS dictionaries' },
  { gy: 15.0, sign: 'Events', note: 'the explorer' },
] as const;
const AISLE = 5.6; // the north–south aisle the shelves feed, under the library's front door
const shelfOut = (i: number): readonly [number, number] => [SHELF_X + SHELF_W + 0.1, SHELVES[i]!.gy + SHELF_D / 2];
const SKILLS = { gx: 12.6, gy: 0.8, w: 2.8, d: 2.0, h: 52 }; const SKILLFRONT = { gx: 14.0, gy: 3.0 }; const SKILLWEST = { gx: 12.4, gy: 1.8 };
const MCP = { gx: 16.8, gy: 2.4, w: 3.0, d: 2.2, h: 46 }; const MCPFRONT = { gx: 18.3, gy: 4.8 }; const MCPWEST = { gx: 16.6, gy: 3.5 }; const MCPEAST = { gx: 20.0, gy: 3.5 };
const AGENT = { gx: 12.0, gy: 9.5 };
const MODEL = { gx: 6.4, gy: 10.6, w: 1.9, d: 1.5, h: 32 }; const MODELEAST = { gx: 8.5, gy: 11.35 };
const STORE = { gx: 21.5, gy: 12.4, w: 2.4, d: 1.5, h: 28 }; const STORENORTH = { gx: 22.7, gy: 12.2 }; const STORESOUTH = { gx: 22.7, gy: 14.1 };
const LAB = { gx: 7.6, gy: 17.6, w: 3.0, d: 1.8, h: 40 }; const LABNORTH = { gx: 9.1, gy: 17.4 };
const WB = { gx: 18.5, gy: 15.8, w: 3.4, d: 2.4, h: 50 }; const WBEAST = { gx: 22.1, gy: 17.0 };
const REVIEWER = { gx: 17.4, gy: 19.4 }; const VALIDATOR = { gx: 20.4, gy: 19.7 }; const CHAIR = { gx: 23.4, gy: 19.1 };

const WALK = 6.8; // the east–west walkway north of the harness floor
const CORR = 5.6; // the corridor south of the tool counter
const L = {
  // beat 1 — the shelves into the library (each shelf east to the aisle, then north to the library's front door)
  shelf: SHELVES.map((_, i) => [shelfOut(i), [AISLE, shelfOut(i)[1]], [AISLE, LIBFRONT.gy]] as const),
  editor: [[EDITOR.gx - 0.3, EDITOR.gy - 0.2], [EDITOR.gx - 0.3, LIBEAST.gy + 0.6], [LIBEAST.gx, LIBEAST.gy + 0.6]] as const,
  // beat 2 — the projections
  toSkills: [[LIBEAST.gx, LIBEAST.gy], [SKILLWEST.gx, SKILLWEST.gy]] as const,
  toMcp: [[LIBFRONT.gx + 0.4, LIBFRONT.gy], [LIBFRONT.gx + 0.4, CORR], [MCPWEST.gx - 0.5, CORR], [MCPWEST.gx - 0.5, MCPWEST.gy], [MCPWEST.gx, MCPWEST.gy]] as const,
  toFloor: [[LIBFRONT.gx, LIBFRONT.gy], [LIBFRONT.gx, WALK], [AGENT.gx - 0.4, WALK], [AGENT.gx - 0.4, AGENT.gy - 0.3]] as const,
  // beat 3 — the playbook
  playbook: [[SKILLFRONT.gx, SKILLFRONT.gy], [SKILLFRONT.gx, WALK], [AGENT.gx + 0.4, WALK], [AGENT.gx + 0.4, AGENT.gy - 0.3]] as const,
  // beat 4 — the lab checks the checker (up the aisle, along the walkway, to the counter's west door)
  labToMcp: [[LABNORTH.gx, LABNORTH.gy], [AISLE, LABNORTH.gy], [AISLE, WALK], [MCPWEST.gx - 0.5, WALK], [MCPWEST.gx - 0.5, MCPWEST.gy], [MCPWEST.gx, MCPWEST.gy]] as const,
  // beat 5 — a passage arrives, from the frozen text
  pericope: [shelfOut(0), [AISLE, shelfOut(0)[1]], [AISLE, 7.8], [AGENT.gx - 0.4, 7.8], [AGENT.gx - 0.4, AGENT.gy - 0.3]] as const,
  // the floor's errands
  toCounter: [[AGENT.gx + 0.3, AGENT.gy - 0.2], [MCPFRONT.gx, AGENT.gy - 0.2], [MCPFRONT.gx, MCPFRONT.gy]] as const,
  fromCounter: [[MCPFRONT.gx + 0.3, MCPFRONT.gy], [MCPFRONT.gx + 0.3, AGENT.gy + 0.4], [AGENT.gx + 0.3, AGENT.gy + 0.4]] as const,
  toModel: [[AGENT.gx - 0.3, AGENT.gy + 0.2], [AGENT.gx - 0.3, MODELEAST.gy], [MODELEAST.gx, MODELEAST.gy]] as const,
  fromModel: [[MODELEAST.gx, MODELEAST.gy + 0.5], [AGENT.gx + 0.1, MODELEAST.gy + 0.5], [AGENT.gx + 0.1, AGENT.gy + 0.4]] as const,
  // beat 10 — the proposal
  toStore: [[AGENT.gx + 0.3, AGENT.gy - 0.5], [STORENORTH.gx, AGENT.gy - 0.5], [STORENORTH.gx, STORENORTH.gy]] as const,
  // beat 11 — the lab
  toLab: [[AGENT.gx - 0.4, AGENT.gy + 0.3], [AGENT.gx - 0.4, 16.2], [LABNORTH.gx, 16.2], [LABNORTH.gx, LABNORTH.gy]] as const,
  // beat 12 — the workbench
  toWb: [[STORESOUTH.gx, STORESOUTH.gy], [STORESOUTH.gx, WBEAST.gy], [WBEAST.gx, WBEAST.gy]] as const,
  // beat 13 — upstream to the editor at the library (round the east side), and round again
  upstream: [[CHAIR.gx + 0.3, CHAIR.gy - 0.4], [25.4, CHAIR.gy - 0.4], [25.4, CORR], [EDITOR.gx + 0.4, CORR], [EDITOR.gx + 0.4, EDITOR.gy + 0.3]] as const,
};

// The kit's grid is drawn at 1:1 here — this town needs the whole canvas — and centred.
const K = 1.0;
const centre = iso(12.4, 10.0);
const TOWN_TRANSFORM = `translate(${(W / 2 - centre.x * K).toFixed(1)}, ${(H / 2 + 12 - centre.y * K).toFixed(1)}) scale(${K})`;

/** A multi-line note anchored to a point: it can hang to the right (default), to the left, or sit centred above. */
function Note({ gx, gy, z, lines, color, on, delay = 0, size = 11.5, anchor = 'right', dx = 0, dy = 0 }: { gx: number; gy: number; z: number; lines: readonly string[]; color: string; on: boolean; delay?: number; size?: number; anchor?: 'left' | 'right' | 'centre' | 'below'; dx?: number; dy?: number }) {
  const p0 = iso(gx, gy, z); const p = { x: p0.x + dx, y: p0.y + dy };
  const w = Math.max(...lines.map((l) => tw(l, size, false, 650))) * 1.08 + 26;
  const lh = size + 4; const h = lines.length * lh + 14;
  const below = anchor === 'below';
  const x = anchor === 'right' ? p.x - 26 : anchor === 'left' ? p.x + 26 - w : p.x - w / 2; const y = below ? p.y + 12 : p.y - 12 - h;
  return (
    <g style={{ opacity: on ? 1 : 0, transform: on ? 'translateY(0)' : 'translateY(6px)', transition: `opacity .5s ${EASE} ${on ? delay : 0}ms, transform .5s ${EASE} ${on ? delay : 0}ms` }}>
      {below ? <path d={`M ${p.x - 6} ${y + 1} L ${p.x} ${p.y + 2} L ${p.x + 6} ${y + 1}`} fill={color} /> : <path d={`M ${p.x - 6} ${y + h - 1} L ${p.x} ${p.y - 2} L ${p.x + 6} ${y + h - 1}`} fill={color} />}
      <rect x={x} y={y} width={w} height={h} rx={10} fill={color} />
      {lines.map((l, i) => <text key={i} x={x + 13} y={y + 10 + (i + 1) * lh - 4} fontSize={size} fontWeight={650} fill="#0b1830" fontFamily={FONT}>{l}</text>)}
    </g>
  );
}

/** The interaction, written on the picture: step number, who acts, who receives, what passes between them. */
function InteractionCard({ at }: { at: TranslationBeat }) {
  const b = TRANSLATION_BEATS[at]!;
  const w = 480; const x = W - 30 - w; const y = 24; const size = 12.5;
  const lines = wrap(b.what, size, w - 32).slice(0, 4);
  const h = 96 + lines.length * 17;
  const fromTo = b.to === '—' ? b.from : `${b.from}  →  ${b.to}`;
  const ftSize = Math.min(12.5, (12.5 * (w - 32)) / Math.max(tw(fromTo, 12.5, false, 700), w - 32));
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="#0b1830" stroke={PAL.glow} strokeWidth={1.2} opacity={0.96} />
      <text x={x + 16} y={y + 24} fontSize={10.5} fontWeight={700} fill={PAL.glow} fontFamily={FONT} letterSpacing={1.6}>{`SCENE ${at + 1} OF ${TRANSLATION_BEATS.length}`}</text>
      <text x={x + 16} y={y + 46} fontSize={Math.min(16, (16 * (w - 32)) / Math.max(tw(b.title, 16, false, 700), w - 32))} fontWeight={700} fill={PAL.ink} fontFamily={FONT}>{b.title}</text>
      <text x={x + 16} y={y + 70} fontSize={ftSize} fontWeight={700} fill={shade(PAL.teal, 0.35)} fontFamily={FONT}>{fromTo}</text>
      {lines.map((l, i) => <text key={i} x={x + 16} y={y + 92 + i * 17} fontSize={size} fontWeight={500} fill={PAL.muted} fontFamily={FONT}>{l}</text>)}
    </g>
  );
}

/** A small shelf of sources: a low box with a sign and a note under it. */
function Shelf({ gy, sign, note, lit }: { gy: number; sign: string; note: string; lit: boolean }) {
  const p = iso(SHELF_X + SHELF_W + 0.15, gy + SHELF_D / 2, 8);
  return (
    <g>
      <Box gx={SHELF_X} gy={gy} w={SHELF_W} d={SHELF_D} h={24} tone="slate" roof="slab" windows={false} sign={sign} signSize={12.5} />
      <text x={p.x + 6} y={p.y + 4} fontSize={10.5} fontWeight={600} textAnchor="start" fill={lit ? PAL.glow : PAL.muted} fontFamily={FONT} style={{ transition: `fill .5s ${EASE}` }}>{note}</text>
    </g>
  );
}

function Ground() {
  const tiles: ReactNode[] = [];
  for (let gx = 0; gx < GX; gx++) for (let gy = 0; gy < GY; gy++) {
    const walk = (gy >= 6.5 && gy < 7.5 && gx >= 5 && gx < 17) || (gx >= 5 && gx < 6 && gy >= 4 && gy < 18);
    tiles.push(<Tile key={`${gx}-${gy}`} gx={gx} gy={gy} fill={walk ? PAL.road : PAL.ground} stroke={walk ? undefined : PAL.groundLine} opacity={walk ? 1 : 0.9} />);
  }
  return <g>{tiles}</g>;
}

function Town({ at }: { at: TranslationBeat }) {
  return (
    <g>
      <District gx={2.8} gy={0.4} w={5.8} d={4.4} label="The library · the ontology and its knowledge base" tone="teal" at="bottom" />
      <District gx={0.3} gy={4.6} w={2.6} d={11.8} label="Open sources · six shelves" tone="slate" at="bottom" />
      <District gx={12.0} gy={0.2} w={8.6} d={5.0} label="Generated from the library" tone="amber" at="bottom" />
      <District gx={6.4} gy={7.4} w={9.6} d={5.0} label="The harness floor" tone="navy" at="bottom" />
      <District gx={20.8} gy={11.6} w={3.8} d={3.2} tone="amber" />
      <District gx={6.6} gy={16.6} w={4.8} d={3.4} label="The test lab" tone="rose" at="bottom" />
      <District gx={16.4} gy={15.0} w={8.0} d={5.6} tone="violet" />

      {/* the library and the editor */}
      <Tree gx={2.4} gy={0.8} s={0.9} /><Tree gx={9.6} gy={0.6} s={0.9} />
      <Box gx={LIB.gx} gy={LIB.gy} w={LIB.w} d={LIB.d} h={LIB.h} tone="teal" roof="pediment" sign="The library" signSize={15} />

      {/* the shelves */}
      {SHELVES.map((s) => <Shelf key={s.sign} gy={s.gy} sign={s.sign} note={s.note} lit={at === 1} />)}

      {/* east: the workshop and the counter */}
      <Tree gx={11.6} gy={0.4} s={0.8} /><Tree gx={21.2} gy={1.0} s={0.9} />
      <Box gx={SKILLS.gx} gy={SKILLS.gy} w={SKILLS.w} d={SKILLS.d} h={SKILLS.h} tone="violet" roof="gable" sign="Skill workshop" signSize={14} />
      <Box gx={MCP.gx} gy={MCP.gy} w={MCP.w} d={MCP.d} h={MCP.h} tone="amber" roof="slab" sign="Tool counter · the translation MCP" signSize={13.5} />

      {/* the floor */}
      <Box gx={MODEL.gx} gy={MODEL.gy} w={MODEL.w} d={MODEL.d} h={MODEL.h} tone="navy" roof="flat" sign="The model desk" signSize={13.5} />
      <Box gx={STORE.gx} gy={STORE.gy} w={STORE.w} d={STORE.d} h={STORE.h} tone="amber" roof="slab" windows={false} sign="The edition store · rbs" signSize={13.5} />

      {/* south */}
      <Tree gx={5.8} gy={19.4} s={0.9} /><Tree gx={25.0} gy={16.2} s={0.9} /><Tree gx={16.6} gy={13.4} s={0.8} /><Tree gx={25.2} gy={9.8} s={0.8} />
      <Box gx={LAB.gx} gy={LAB.gy} w={LAB.w} d={LAB.d} h={LAB.h} tone="rose" roof="flat" sign="The test lab" signSize={14} />
      <Box gx={WB.gx} gy={WB.gy} w={WB.w} d={WB.d} h={WB.h} tone="violet" roof="pediment" sign="The workbench" signSize={15} />

      {/* the people, and the agent */}
      <Person gx={EDITOR.gx} gy={EDITOR.gy} name="the editor" color={PAL.teal} note="writes the rules" />
      <Agent gx={AGENT.gx} gy={AGENT.gy} name="the Translation Agent" color={PAL.navy} />
      <Person gx={REVIEWER.gx} gy={REVIEWER.gy} name="a reviewer" color={PAL.violet} note="reads" />
      <Person gx={VALIDATOR.gx} gy={VALIDATOR.gy} name="a second reviewer" color={PAL.violet} note="validates" />
      <Person gx={CHAIR.gx} gy={CHAIR.gy} name="the chair" color={PAL.violet} note="rules" />
    </g>
  );
}

// ── the scene ──────────────────────────────────────────────────────────────────────────────────────────────────────
export function TranslationLoopScene({ beat: at = 0 }: { beat?: TranslationBeat }) {
  const id = 'translation-loop';
  const S = 13; // speech size — the town is drawn at 1:1, so the words are drawn a size larger than in the other scenes
  const T = 12; // tag size
  const libC = { gx: LIB.gx + LIB.w / 2 - 0.5, gy: LIB.gy + LIB.d / 2 }; const libZ = LIB.h + 74;
  const mcpC = { gx: MCP.gx + MCP.w / 2, gy: MCP.gy + MCP.d / 2 }; const mcpZ = MCP.h + 84;
  const skillC = { gx: SKILLS.gx + SKILLS.w / 2, gy: SKILLS.gy + SKILLS.d / 2 }; const skillZ = SKILLS.h + 88;
  const modelC = { gx: MODEL.gx + MODEL.w / 2, gy: MODEL.gy + MODEL.d / 2 }; const modelZ = MODEL.h + 74;
  const storeC = { gx: STORE.gx + STORE.w / 2, gy: STORE.gy + STORE.d / 2 };
  const labC = { gx: LAB.gx + LAB.w / 2, gy: LAB.gy + LAB.d / 2 }; const labZ = LAB.h + 80;
  const wbC = { gx: WB.gx + WB.w / 2, gy: WB.gy + WB.d / 2 }; const wbZ = WB.h + 92;
  const onFloor = at >= 5 && at <= 10;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${id}-title`} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', fontFamily: FONT }}>
      <title id={`${id}-title`}>How the Bible is translated from Hebrew and Greek: open sources into an ontology, skills and tools generated from it, an agent that drafts and checks one passage at a time, a test lab that measures the loop, and a workbench where people decide and their decisions go back into the ontology</title>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={PAL.sky0} /><stop offset="1" stopColor={PAL.sky1} /></linearGradient>
      </defs>
      <style>{`@keyframes iso-in { from { opacity: 0 } to { opacity: 1 } } @keyframes iso-out { to { opacity: 0 } } @media (prefers-reduced-motion: reduce) { #${id} * { transition: none !important; animation: none !important; } }`}</style>
      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
      {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={(i * 173) % W} cy={(i * 97) % 120} r={(i % 3) * 0.5 + 0.4} fill="#fff" opacity={0.35} />)}

      <g transform={TOWN_TRANSFORM}>
      <Ground />

      {/* who is acting: a pool of light */}
      <Spot gx={libC.gx} gy={libC.gy} on={at === 1 || at === 2 || at === 13} r={92} />
      <Spot gx={EDITOR.gx} gy={EDITOR.gy} on={at === 1 || at === 5 || at === 13} />
      <Spot gx={skillC.gx} gy={skillC.gy} on={at === 2 || at === 3 || at === 13} r={64} />
      <Spot gx={mcpC.gx} gy={mcpC.gy} on={at === 2 || at === 4 || at === 6 || at === 8 || at === 9 || at === 13} r={70} color={PAL.amber} />
      <Spot gx={AGENT.gx} gy={AGENT.gy} on={at === 3 || onFloor} r={48} />
      <Spot gx={modelC.gx} gy={modelC.gy} on={at === 7 || at === 9} r={56} />
      <Spot gx={storeC.gx} gy={storeC.gy} on={at === 10 || at === 12} r={58} color={PAL.amber} />
      <Spot gx={labC.gx} gy={labC.gy} on={at === 4 || at === 11} r={70} color={PAL.rose} />
      <Spot gx={wbC.gx} gy={wbC.gy} on={at === 12 || at === 13} r={84} color={PAL.violet} />
      <Spot gx={VALIDATOR.gx} gy={VALIDATOR.gy} on={at === 12} r={110} color={PAL.violet} />

      {/* lanes, under the buildings */}
      {L.shelf.map((pts, i) => <Lane key={i} pts={pts} beat={1} at={at} color={PAL.slate} delay={i * 350} dur={1.6} summary={SUMMARY} />)}
      <Lane pts={L.editor} beat={1} at={at} color={PAL.glow} delay={4200} summary={SUMMARY} />
      <Lane pts={L.toSkills} beat={2} at={at} color={PAL.teal} dur={1.6} summary={SUMMARY} />
      <Lane pts={L.toMcp} beat={2} at={at} color={PAL.teal} delay={1200} dur={1.8} summary={SUMMARY} />
      <Lane pts={L.toFloor} beat={2} at={at} color={PAL.teal} delay={2400} dur={1.6} summary={SUMMARY} />
      <Lane pts={L.playbook} beat={3} at={at} color={PAL.violet} dur={1.8} summary={SUMMARY} />
      <Lane pts={L.labToMcp} beat={4} at={at} color={PAL.rose} dur={2.4} summary={SUMMARY} />
      <Lane pts={L.pericope} beat={5} at={at} color={PAL.glow} dur={2.2} summary={SUMMARY} />
      <Lane pts={L.toCounter} beat={6} at={at} color={PAL.amber} dur={1.4} summary={SUMMARY} />
      <Lane pts={L.toModel} beat={7} at={at} color={PAL.navy} dur={1.4} summary={SUMMARY} />
      <Lane pts={L.toStore} beat={10} at={at} color={PAL.good} dur={1.4} summary={SUMMARY} />
      <Lane pts={L.toLab} beat={11} at={at} color={PAL.rose} dur={1.8} summary={SUMMARY} />
      <Lane pts={L.toWb} beat={12} at={at} color={PAL.violet} dur={1.4} summary={SUMMARY} />
      <Lane pts={L.upstream} beat={13} at={at} color={PAL.glow} dur={2.8} summary={SUMMARY} />
      <Lane pts={L.editor} beat={13} at={at} color={PAL.glow} delay={3000} dur={0.8} summary={SUMMARY} />
      <Lane pts={L.toSkills} beat={13} at={at} color={PAL.teal} delay={3600} dur={1.2} summary={SUMMARY} />
      <Lane pts={L.toMcp} beat={13} at={at} color={PAL.teal} delay={4000} dur={1.4} summary={SUMMARY} />
      <Lane pts={L.pericope} beat={13} at={at} color={PAL.glow} delay={6000} dur={2.2} summary={SUMMARY} />

      <Town at={at} />

      {/* beat 0 — what is where */}
      <Tag gx={libC.gx} gy={libC.gy} z={libZ} text="described once · everything else is held to it" color={PAL.good} on={at === 0} size={T} />
      <Tag gx={skillC.gx} gy={skillC.gy} z={skillZ} text="the skills · how the agent behaves" color={shade(PAL.violet, 0.3)} on={at === 0} size={T} />
      <Tag gx={mcpC.gx} gy={mcpC.gy} z={mcpZ} text="the tools the agent may call · the checker" color={PAL.amber} on={at === 0} size={T} />
      <Tag gx={modelC.gx} gy={modelC.gy} z={modelZ} text="the model — fluent, forgetful, never the judge" color={shade(PAL.navy, 0.4)} on={at === 0} size={T} />
      <Tag gx={labC.gx} gy={labC.gy} z={labZ} text="measures the loop and the checker" color={PAL.rose} on={at === 0} size={T} />
      <Tag gx={wbC.gx} gy={wbC.gy} z={wbZ} text="people decide · decisions become data" color={shade(PAL.violet, 0.3)} on={at === 0} size={T} />

      {/* beat 1 — the sources */}
      <Walker pts={L.shelf[0]!} beat={1} at={at} say="the Hebrew and Greek — 443,625 tokens, frozen" color={PAL.slate} delay={300} dur={2.4} size={S} />
      <Walker pts={L.shelf[2]!} beat={1} at={at} say="3,129 people · 1,007 places — as nodes" color={PAL.slate} delay={1500} dur={2.6} size={S} />
      <Walker pts={L.shelf[4]!} beat={1} at={at} say="25,751 senses · clauses for 99% of verses" color={PAL.slate} delay={2700} dur={2.8} size={S} />
      <Note gx={EDITOR.gx - 0.3} gy={EDITOR.gy} z={-30} lines={['And fifty concept rules I wrote down, with reasons:', '"eternal life, never everlasting".']} color={PAL.glow} on={at === 1} delay={4200} size={S} anchor="left" />
      <Reply gx={libC.gx} gy={libC.gy} z={libZ} text="each under its own licence, pinned to a release" color={PAL.good} beat={1} at={at} delay={5800} size={S} summary={SUMMARY} />

      {/* beat 2 — the projections */}
      <Walker pts={L.toSkills} beat={2} at={at} say="the skills' record sections — from the shapes" color={PAL.teal} delay={200} dur={1.8} size={S} />
      <Walker pts={L.toMcp} beat={2} at={at} say="the checker's rules · the store's seed" color={PAL.teal} delay={1400} dur={2.2} size={S} />
      <Walker pts={L.toFloor} beat={2} at={at} say="the plan and its controlled values" color={PAL.teal} delay={2600} dur={1.8} size={S} />
      <Tag gx={libC.gx} gy={libC.gy} z={libZ} text="one description · many projections · the build fails on drift" color={PAL.good} on={at === 2} delay={4400} size={T} />

      {/* beat 3 — the playbook */}
      <Walker pts={L.playbook} beat={3} at={at} say="twelve skills → one playbook, by digest" color={PAL.violet} delay={300} dur={2.4} size={S} />
      <Reply gx={AGENT.gx} gy={AGENT.gy} z={64} text="born with its playbook — behaviour, never permission" color={shade(PAL.violet, 0.35)} beat={3} at={at} delay={2900} size={S} summary={SUMMARY} />

      {/* beat 4 — the counter opens; the lab checks the checker */}
      <Tag gx={mcpC.gx} gy={mcpC.gy} z={mcpZ} text="tokens · lexicon · names · syntax · senses · checks · propose" color={PAL.amber} on={at === 4} size={T} />
      <Walker pts={L.labToMcp} beat={4} at={at} say="a human translation and a gloss, through the checks" color={PAL.rose} delay={1200} dur={3.2} size={S} />
      <Note gx={MCP.gx + 1.6} gy={MCP.gy + MCP.d + 0.9} z={0} lines={['67% of the human Bible failed a blocking check', '→ five of our rules were wrong, not the Bible', '→ fixed until both pass at 0.99 ✓']} color={PAL.good} on={at === 4} delay={4600} size={S} anchor="below" dx={80} />

      {/* beat 5 — a passage arrives */}
      <Note gx={EDITOR.gx - 0.3} gy={EDITOR.gy} z={-30} lines={['Go. The whole Bible,', 'one passage at a time.']} color={PAL.glow} on={at === 5} delay={200} size={S} anchor="left" />
      <Walker pts={L.pericope} beat={5} at={at} say="John 3:16–21 · six verses · no English · no reference" color={PAL.glow} delay={1200} dur={3} size={S} />
      <Reply gx={AGENT.gx} gy={AGENT.gy} z={64} text='the prompt will say "verse 1 … verse 6"' color={PAL.glow} beat={5} at={at} delay={4500} size={S} summary={SUMMARY} />

      {/* beat 6 — fetch */}
      <Walker pts={L.toCounter} beat={6} at={at} say="get tokens · lexicon · names · syntax · senses" color={PAL.amber} delay={200} dur={1.8} until={2600} size={S} />
      <Note gx={MCP.gx + 1.6} gy={MCP.gy + MCP.d + 0.9} z={0} lines={["25 tokens a verse, parsed, with Strong's numbers", 'the rule that rides on each word', "each name's node and its decided rendering", 'the clause outline: who does what to whom', 'the sense here — open where there are two']} color={PAL.amber} on={at === 6} delay={2300} size={S} anchor="below" dx={80} />
      <Walker pts={L.fromCounter} beat={6} at={at} say="the source, through the library" color={PAL.amber} delay={5200} dur={1.6} size={S} />

      {/* beat 7 — the draft (model call 1) */}
      <Walker pts={L.toModel} beat={7} at={at} say="translate every verse · align every token" color={shade(PAL.navy, 0.3)} delay={200} dur={1.8} until={2600} size={S} />
      <Tag gx={modelC.gx} gy={modelC.gy} z={modelZ} text="MODEL CALL 1 · the drafter (the cheap model)" color={PAL.glow} on={at === 7} delay={1800} size={T} />
      <Note gx={MODEL.gx + MODEL.w + 0.3} gy={MODEL.gy + MODEL.d + 0.8} z={0} dx={140} dy={20} lines={['v1 "For God loved the world in this way…"', 'align: 1=For; 2-3=God loved; 4=the world; …', 'no English Bible in the prompt — not even the reference']} color={shade(PAL.navy, 0.45)} on={at === 7} delay={2600} size={S} anchor="below" />
      <Walker pts={L.fromModel} beat={7} at={at} say="a draft + its alignment" color={shade(PAL.navy, 0.3)} delay={5400} dur={1.6} size={S} />

      {/* beat 8 — checks */}
      <Walker pts={L.toCounter} beat={8} at={at} say="repair the alignments · run the checks" color={PAL.amber} delay={200} dur={1.8} until={2600} size={S} />
      <Tag gx={mcpC.gx} gy={mcpC.gy} z={mcpZ} text="deterministic code · no model in this step" color={PAL.amber} on={at === 8} delay={1800} size={T} />
      <Note gx={MCP.gx + 1.6} gy={MCP.gy + MCP.d + 0.9} z={0} lines={['every source word accounted for?  v17: one missing ✗', 'every negation carried? ✓   numbers? ✓   names via the library? ✓', 'concept rule, in this sense of the word? ✓', 'English with no source behind it? ✓', 'identical to a published Bible?  v18: a 21-word run ✗']} color={PAL.amber} on={at === 8} delay={2400} size={S} anchor="below" dx={80} />
      <Walker pts={L.fromCounter} beat={8} at={at} say="2 blocking — back to the desk" color={PAL.bad} delay={6200} dur={1.6} size={S} />

      {/* beat 9 — revise (model calls 2, 3) and checks again */}
      <Walker pts={L.toModel} beat={9} at={at} say="your draft + the failing checks · this run is forbidden" color={shade(PAL.navy, 0.3)} delay={200} dur={1.8} until={2600} size={S} />
      <Tag gx={modelC.gx} gy={modelC.gy} z={modelZ} text="MODEL CALLS 2–3 · rounds 1–2 cheap · round 3 the strong model" color={PAL.glow} on={at === 9} delay={1800} size={T} />
      <Walker pts={L.fromModel} beat={9} at={at} say="revised — v18 in its own words" color={shade(PAL.navy, 0.3)} delay={3400} dur={1.6} until={5200} size={S} />
      <Walker pts={L.toCounter} beat={9} at={at} say="check it again" color={PAL.amber} delay={5300} dur={1.6} until={7000} size={S} />
      <Reply gx={MCPFRONT.gx} gy={MCPFRONT.gy + 0.4} z={0} text="0 blocking ✓ · v18 no longer matches any published edition" color={PAL.good} beat={9} at={at} delay={7000} size={S} summary={SUMMARY} />

      {/* beat 10 — propose */}
      <Walker pts={L.toStore} beat={10} at={at} say="propose: six verses · every token aligned · the checks · the models · the cost · the run" color={PAL.good} delay={300} dur={2} size={S} />
      <Note gx={STORE.gx + 1.2} gy={STORE.gy + STORE.d + 0.6} z={0} lines={['status: checked — never "approved"', 'a footnote where a reading is genuinely open', 'the provenance of every step filed beside it']} color={PAL.good} on={at === 10} delay={2600} size={S} anchor="below" />

      {/* beat 11 — the lab */}
      <Walker pts={L.toLab} beat={11} at={at} say="the same plan, on 73 held-out passages" color={PAL.rose} delay={300} dur={2.4} size={S} />
      <Note gx={LAB.gx + LAB.w / 2} gy={LAB.gy + LAB.d + 0.4} z={0} lines={['ceiling: a human translation · floor: the gloss · the arm between', '580 planted errors — caught 0.93, per kind', 'a judge from another model family, named on every number', 'paired lifts with intervals: accounting ↑ · judged meaning: no change']} color={PAL.rose} on={at === 11} delay={2900} size={S} anchor="below" dx={30} />
      <Tag gx={labC.gx} gy={labC.gy} z={labZ} text="resemblance to a published Bible is a diagnostic, never a score" color={PAL.rose} on={at === 11} delay={5600} size={T} />

      {/* beat 12 — the workbench */}
      <Walker pts={L.toWb} beat={12} at={at} say="proposals, with their source, checks, models and cost" color={PAL.violet} delay={300} dur={2} size={S} />
      <Note gx={CHAIR.gx} gy={CHAIR.gy} z={-64} dx={80} lines={['a reviewer — v18: the checker was right. Accept.', 'a reviewer — v16: this rule is too broad here →', '    a change request, with this verse as the evidence', 'the chair — in John, Ἰουδαῖοι is "the Jews", never "the Jewish leaders";', '    who is meant goes in a note']} color={shade(PAL.violet, 0.45)} on={at === 12} delay={2600} size={S} />
      <Reply gx={VALIDATOR.gx} gy={VALIDATOR.gy} z={62} text="a receipt per verse · never the same person twice" color={shade(PAL.violet, 0.4)} beat={12} at={at} delay={4800} size={S} summary={SUMMARY} />

      {/* beat 13 — upstream, and round again */}
      <Walker pts={L.upstream} beat={13} at={at} say="accepted change requests → the editor, at the library" color={PAL.glow} delay={300} dur={3.4} size={S} />
      <Reply gx={libC.gx} gy={libC.gy} z={libZ} text="ontology release 1.4.0 — the decisions, now data" color={PAL.good} beat={13} at={at} delay={3800} size={S} summary={SUMMARY} />
      <Walker pts={L.toSkills} beat={13} at={at} say="skills regenerated" color={PAL.teal} delay={4000} dur={1.6} size={S} />
      <Walker pts={L.toMcp} beat={13} at={at} say="checker .14 · seed reloaded" color={PAL.teal} delay={4400} dur={1.8} size={S} />
      <Tag gx={labC.gx} gy={labC.gy} z={labZ} text="measured on the same held-out set before it counts" color={PAL.rose} on={at === 13} delay={5600} size={T} />
      <Walker pts={L.pericope} beat={13} at={at} say="the next passage — under the new release" color={PAL.glow} delay={6400} dur={3} size={S} />
      </g>
      <InteractionCard at={at} />
    </svg>
  );
}
