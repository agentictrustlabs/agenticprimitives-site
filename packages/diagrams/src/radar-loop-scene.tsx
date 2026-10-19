// HOW A TRACKING RADAR GETS DESIGNED — drawn as a workshop town, for the reader who will never open the plan. The open
// sources (textbooks, MIT Lincoln Lab courseware, the National Academies, the named waveform codes, open-estimate RCS
// profiles, a frozen library of scenarios) are shelved on the west side and poured into the library: the ontology and
// its knowledge base. The library generates everything else — the skills in the workshop, the tools at the counter,
// the plan the agent runs. On the harness floor the Design Agent takes one scenario at a time: asks the tool counter
// for the cue and the design space, asks the model desk for an analysis and a proposal, asks the simulator to score
// it, and files the result in the design store. The test lab measures the whole loop against a floor and a ceiling.
// The workbench is where people decide — and their decisions go back into the library, and the next scenario runs
// under the new release.
//
// Same contract as the other iso scenes: a `beat` prop, CSS transitions for everything that changes, CSS motion paths
// for the walkers. A static render is a still of that beat. Plain words on the drawing; the technical names live on
// the page.
import type { ReactNode } from 'react';
import { Box, District, EASE, ISO_H, ISO_W, Lane, PAL, Reply, Tag, Tile, Tree, Walker, iso, shade } from './iso-town';
import { Agent, Person, Spot, wrap } from './member-message';
import { FONT, tw } from './primitives';

export type RadarBeat = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export interface RadarBeatInfo {
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

export const RADAR_BEATS: readonly RadarBeatInfo[] = [
  {
    id: 'meet', title: 'Meet the workshop', ms: 10000,
    caption: 'On the west side, six shelves of open physics: the textbooks, the open courseware, the public reports, the named waveform codes, the open-estimate radar-cross-section profiles, and a frozen library of scenarios. At the top, the library — the ontology and its knowledge base — where all of it is described once. East: the skill workshop and the tool counter. In the middle, the harness floor, where the Design Agent works beside the model desk. South-west, the test lab. South-east, the workbench, where the people are. One person stands by the library: the physicist, who writes the invariants.',
    rule: 'The model is the smallest building in the picture. Everything else exists to hold it to the physics.',
    from: 'Nobody yet', to: '—', what: 'Who is where, and what each part is for',
    narration: "Let's walk around the workshop. On the left are six shelves of open physics: the textbooks; Lincoln Laboratory's open courseware; the National Academies' public reports; eighteen named waveform codes with their published figures; open-estimate radar-cross-section profiles, never a measured signature; and a frozen library of scenarios. At the top is the library — the ontology and its knowledge base — where all of that is described once. On the right, the skill workshop and the tool counter. In the middle, the harness floor, where the Design Agent works, with the model desk beside it. Down on the left, the test lab. Down on the right, the workbench, where the people are. And one person stands by the library: the physicist, who writes the invariants. Notice how small the model desk is. Everything else in this picture exists to hold it to the physics.",
  },
  {
    id: 'sources', title: 'The sources pour into the library', ms: 10000,
    caption: 'The six shelves are loaded into the library, each under its own licence and pinned to an exact release. Skolnik, Barton, Richards and Bar-Shalom become the physics the simulator is allowed to use. Public research becomes attributed claims — what the evidence establishes, and what it does not. Eighteen waveform codes become rows with their published peak sidelobes. The Su-57 enters as three open-estimate profiles across the published spread, plus a labelled hypothetical stress case — never as a measured signature. Three hundred and thirty-two scenarios are frozen: a cue, a contract, a target, an environment, a platform. The physicist adds what no file contains: sixteen invariants, written down with reasons.',
    rule: 'Nothing is typed in by hand except the decisions. Everything else is built from a pinned source, and the build refuses drift.',
    from: 'the six shelves · and the physicist', to: 'the library', what: 'textbooks · attributed claims · named codes · open-estimate RCS · 332 frozen scenarios — and sixteen invariants a person wrote down',
    narration: "First, the sources pour into the library. Each shelf is loaded under its own licence, pinned to an exact release. The textbooks become the physics the simulator is allowed to use. Public research becomes attributed claims: what the evidence establishes, and what it does not. A vendor's announcement is a claim, never a design parameter. Eighteen waveform codes become rows with their published peak sidelobes. The aircraft under study enters as three open-estimate profiles across the published spread, plus a labelled hypothetical stress case — never as a measured signature. Three hundred and thirty-two scenarios are frozen: a cue from an acquisition radar, a contract with a fire controller, a target, an environment, a platform. And the physicist adds the one thing no file contains: sixteen invariants — a claim is scored by the simulator; physics is blocking; a vendor's word is not verification — each written down with its reason. Nothing is typed in by hand except the decisions.",
  },
  {
    id: 'generate', title: 'The library generates the rest', ms: 9500,
    caption: "From the one description, three things are produced, never written separately: the skills in the workshop (each ends with the exact record it must leave, generated from the ontology's shapes); the tools at the counter (the simulator's enums, the checker's profile, the named codes); and the plan the agent will run, with its vocabularies. A build fails when any of them drifts from the library.",
    rule: 'One description, many projections. Change an invariant in the library and the skill, the checker and the plan all change — or the build fails.',
    from: 'the library', to: 'the skill workshop · the tool counter · the harness floor', what: "the skills' record sections · the simulator's enums and the checker's rules · the plan and its controlled values",
    narration: "Now watch the library work. From that one description, three things are generated — never written separately. The skills in the workshop: each one ends with the exact record it must leave behind, produced from the ontology's shapes. The tools at the counter: the simulator's enums, the checker's profile, and the named codes. And the plan the agent will run, with its vocabularies. If someone changes an invariant in the library, the skill text changes, the checker changes and the plan changes together — and if any of them drifts, the build fails. One description, many projections.",
  },
  {
    id: 'skills', title: "The skills become the agent's playbook", ms: 8000,
    caption: 'Eleven specialists — target, countermeasures, environment, hardware, signal, processing, tracking, controller, simulation, evidence, critic — plus a lead, twelve archetypes in all, are compiled into one playbook for the Design Agent, identified by a digest. The agent is born with it. Each specialist hands the lead a typed record. The playbook says how to behave; it grants nothing.',
    rule: 'The playbook is behaviour, not permission. Nothing the agent reads in it lets it do anything a person did not authorize.',
    from: 'the skill workshop', to: 'the Design Agent', what: 'eleven specialists and a lead compiled into one playbook, by digest — how to frame, propose, simulate, record, and when to decline',
    narration: "The skills go to the agent. Eleven specialists — a target analyst, a countermeasures analyst, an environment analyst, a hardware architect, a signal designer, a processing designer, a tracking designer, a controller designer, a simulation engineer, an evidence librarian, a critic — plus a lead, twelve archetypes in all, are compiled into one playbook for the Design Agent, identified by a digest. The agent is born with it. Each specialist hands the lead a typed record bound to the scenario and citing its research claims. But notice what the playbook is: it says how to behave. It grants nothing. And the agent declines, in code, anything outside the science project: a measured signature, a classified parameter, an engagement recommendation.",
  },
  {
    id: 'counter', title: 'The tool counter opens — and the test lab checks the checker first', ms: 10000,
    caption: "The tool counter is the radar MCP: a small set of tools the agent may call — the scenario, the design space, the claims, the bounds, the simulator, the checks, and propose. The checks are deterministic code, no model. Before any proposal is believed, the test lab plants eleven kinds of error into a sound design: a claim that beats the radar equation, a fabricated vendor number, a waveform the transmitter cannot carry. One hundred and ninety-four cases. Catch rate 0.995. The one miss was a kind the floor already met, so there was nothing to catch.",
    rule: 'Measure the measurer first. A checker that cannot catch a claim that beats the radar equation is a broken checker, not a good design.',
    from: 'the test lab', to: 'the tool counter', what: 'eleven kinds of planted error through the checks — 194 cases, caught 0.995; inflated detection was 12 of 13 because one plant was already true',
    narration: "The tool counter opens. This is the radar MCP: a small set of tools the agent is allowed to call. Fetch the scenario. Look up the design space. Look up the attributed claims. Compute the bounds. Simulate. Run the checks. Propose. The checks are deterministic code — no model anywhere in them. And before any proposal is believed, the test lab does something most projects skip: it plants eleven kinds of error into a sound design. A claim that beats the radar equation. A waveform the transmitter cannot carry. A fabricated vendor number. A dropped trade-off. One hundred and ninety-four cases. The catch rate is ninety-nine and a half percent. The one miss was a kind the floor already met, so there was nothing honest to catch. Only then was the checker trusted.",
  },
  {
    id: 'scenario', title: 'A cue arrives — one scenario', ms: 8000,
    caption: 'The physicist starts the run. The library is cut into three hundred and thirty-two frozen scenarios, and they come to the harness floor one at a time. Here: an open-estimate profile of a low-observable fighter, inbound, clear air, three nodes ten kilometres apart. The agent is handed a cue from an acquisition radar it did not design — one hundred and twenty kilometres, four seconds old, a kilometre and a half of uncertainty — and a contract with a fire controller it will not design. Design the tracking radar in between.',
    rule: 'The agent designs one radar, between two handoffs. It never sees an engagement, and it never sees a measured signature.',
    from: 'the physicist · the frozen scenarios', to: 'the Design Agent', what: 'one cue — 120 km, 4 s old, σ 1.5 km — and a fire-control contract. No engagement. No measured RCS.',
    narration: "The physicist starts the run. The library has been cut into three hundred and thirty-two frozen scenarios, and they come to the harness floor one at a time. Here comes one: an open-estimate profile of a low-observable fighter, inbound, clear air, three nodes ten kilometres apart. The agent is handed a cue from an acquisition radar it did not design — one hundred and twenty kilometres out, four seconds old, a kilometre and a half of uncertainty — and a contract with a fire controller it will not design. Its job is the radar in between: reacquire inside that volume, hold the track through fades, and hand off a track the fire controller will accept. It never sees an engagement. It never sees a measured signature.",
  },
  {
    id: 'fetch', title: 'Step one: the agent asks the tool counter for the problem', ms: 9500,
    caption: 'Four tool calls, no model. The scenario: the cue, the contract, the target, the environment, the platform. The design space: the bands, the waveform families, the arrangements, the trackers, the trade-offs that pull against each other. The attributed claims under the evidence policy — what public evidence establishes, and which sources depend on which. The physics bounds for this cue: the radar equation, the angular-resolution limit of the aperture, the Cramér–Rao bound.',
    rule: 'The agent reads the problem through the library, not through a brochure it remembers.',
    from: 'the Design Agent', to: 'the tool counter', what: 'get_scenario · lookup_design_space · lookup_claims · compute_bounds — back come the cue, the spine, the claims, the bounds',
    narration: "Step one. The agent walks to the tool counter and asks for the problem. Four tool calls, no model. The scenario: the cue, the contract, the target, the environment, the platform. The design space: the bands, the waveform families, the arrangements, the trackers, and the trade-offs that pull against each other — wavelength against resolution, energy against low probability of intercept. The attributed claims under the evidence policy: what the public evidence establishes, and which sources depend on which, so agreement among dependent sources is never counted twice. And the physics bounds for this cue: the radar equation, the angular-resolution limit of the aperture a truck can carry, the Cramér–Rao bound. The agent reads the problem through the library, not through a brochure it remembers.",
  },
  {
    id: 'draft', title: 'Step two: the model desk analyses, then proposes — the first model calls', ms: 10000,
    caption: 'Now the model is called. First an analysis: which of the three difficulties binds here — separation, continuity, or precision — which trade-offs that forces a side on, and candidate options in each layer, with evidence. Then a proposal: both layers bound, predicted metrics with a cited bound or claim on every number, the alternatives not kept, a waveform library specified to the code and the pulse train, a selection policy as a rule table. While proposing, the model may call the signal tools: compute the ambiguity, compute the link budget, look up a code, dry-run the policy. Nothing in its prompt is a classified parameter.',
    rule: 'The model proposes a design and must account for every number. It is never the judge of its own work.',
    from: 'the Design Agent', to: 'the model desk (the drafter)', what: '"which difficulty binds, then propose both layers" — analysis, then a configuration with cited claims, alternatives, and a rule table',
    narration: "Step two. Now, for the first time, the model is called. First an analysis: which of the three difficulties binds here — separation of the echo from the background, continuity of the track through fades, or precision under the aperture a vehicle can carry — which trade-offs that forces a side on, and candidate options in each layer, with evidence. Then a proposal: both layers bound, predicted metrics with a cited bound or a cited claim on every number, the alternatives not kept, a waveform library specified all the way to the code and the pulse train, and a selection policy as a data rule table the simulator will execute. While proposing, the model may call the signal tools: compute the ambiguity of a code, compute the link budget against the weak stratum, look up a code's published figures, dry-run the policy. Nothing in its prompt is a classified parameter. The model proposes a design, and must account for every number. It is never the judge of its own work.",
  },
  {
    id: 'checks', title: 'Step three: the simulator and the checks — deterministic, no model', ms: 11000,
    caption: 'The agent takes the proposal back to the tool counter. The simulator runs it, seeded, many times: detection, tracking, handoff. Then the checks: does every claim cite a bound or an attributed source? Does any number beat the radar equation or the Cramér–Rao bound? Does the waveform fit the transmitter? Did the run meet the tier the proposal claimed? Are the live trade-offs named? Here the track-mode budget against the weak stratum came back 1.5 dB under the detection requirement, and a continuity claim overran what the run delivered. Blocking.',
    rule: 'The simulator is the judge, not a range test and not the model. A claim that beats the physics is a finding, never a success.',
    from: 'the Design Agent', to: 'the tool counter (the simulator · the checker)', what: 'simulate · run_design_checks — physics · hardware–signal · unsupported claim · tier claimed not met. Result: weak-stratum budget −1.5 dB ✗ · continuity overran ✗',
    narration: "Step three. The agent takes the proposal back to the tool counter. The simulator runs it, seeded, many times: detection, tracking, the handoff. Then the checks. Does every claim cite a bound or an attributed source? Does any number beat the radar equation or the Cramér–Rao bound? Does the waveform fit the transmitter? Did the run meet the tier the proposal claimed? Are the live trade-offs named? Here the track-mode budget against the weak stratum came back one and a half decibels under the detection requirement — the case for a longer coherent burst — and a continuity claim overran what the run delivered. Both are blocking. Notice that nothing in this step is a model. And notice that a claim which beats the physics is a finding, never a success.",
  },
  {
    id: 'revise', title: 'Step four: revise — the model is called again, with the evidence', ms: 10500,
    caption: 'Only because a check blocked, the model is called again. It receives its own proposal, the simulation, and the failing checks. It may call the signal tools again. After each round the simulator and the checks run again. The kept pass is the best one, not the last one. Here: the burst mode was added; the continuity claim was corrected to the run; the checker reads 0 blocking, 1 major.',
    rule: "Revision is driven by the simulator's evidence, not by the model's opinion of itself.",
    from: 'the Design Agent', to: 'the model desk (the reviser) · then the tool counter again', what: '"your proposal, the run, and the checks that failed" — resimulate after each round; result 0 blocking · 1 major ✓',
    narration: "Step four. Only because a check blocked, the model is called again. This time it receives its own proposal, the simulation, and the failing checks. It may call the signal tools again. After every round the agent walks the revision back to the tool counter, the simulator runs it, and the checks run again. The kept pass is the best one, not the last one — a later revision can undo a clean pass. Here, the longer coherent burst was added against the weak stratum; the continuity claim was corrected to what the run actually delivered; and the checker reads zero blocking, one major. Revision is driven by the simulator's evidence, not by the model's opinion of itself.",
  },
  {
    id: 'propose', title: 'Step five: propose — the output, with its whole account', ms: 9000,
    caption: 'The agent files one proposal in the design store: both layers, the predicted metrics, the simulation, the checks it passed and the ones it did not, which model drafted and which revised, the cost, and the run it came from. Beside the store, the record of every step — each tool call, each model call, each skipped step — files as provenance. The status says "checked". It never says "approved".',
    rule: 'The output is not a configuration. It is a configuration with its evidence attached, filed where people can read both.',
    from: 'the Design Agent', to: 'the design store', what: 'propose_design — both layers, the claims, the run, the checks, the models, the cost, the run id; the provenance record files beside it. Status: checked.',
    narration: "Step five. The agent files one proposal in the design store. Not just a configuration: both layers, the predicted metrics, the simulation, the checks it passed and the ones it did not, which model drafted it and which revised it, what it cost, and the run it came from. And beside the store, the record of every step files as provenance: each tool call, each model call, each step that was skipped and why. The status on the proposal says checked. It never says approved. The output is a design with its evidence attached.",
  },
  {
    id: 'evals', title: 'The test lab measures the loop', ms: 11000,
    caption: "The same plan runs on pre-registered scenarios — a development set to tune on, a held-out set of 31 written once and locked. Beside the agent's arm stand a ceiling (exhaustive search over the declared design space) and a floor (the textbook single-node S-band tracker). One hundred and ninety-four planted errors, catch 0.995, per kind. The tracking stage agrees with Stone Soup, an independent published filter, on 24 cases to machine precision. A first live model run on one scenario: sixteen steps, ninety-seven seconds, two cents, verdict accept. The held-out model numbers are not quoted yet — they have not been run.",
    rule: 'A number is quoted only with its floor, its ceiling, and its catch rate. A number that has not been run is not a number.',
    from: 'the test lab', to: 'the harness floor · the tool counter', what: 'the same plan · floor and ceiling beside it · 194 planted errors (caught 0.995) · Stone Soup agrees · live smoke quoted as smoke',
    narration: "Now the test lab measures the loop. The same plan runs on pre-registered scenarios — a development set to tune on, and a held-out set of thirty-one written once and locked, so it can be quoted. Beside the agent's arm stand a ceiling, an exhaustive search over the declared design space, and a floor, the textbook single-node S-band tracker. One hundred and ninety-four planted errors, catch rate ninety-nine and a half percent, reported per kind. The tracking stage was cross-checked against Stone Soup, an independent published filter, on twenty-four cases, and they agree to machine precision. A first live model run on one scenario took sixteen steps, ninety-seven seconds, two cents, and the checker accepted it. That is a smoke reading, not a held-out number. The held-out model arms have not been run. A number that has not been run is not a number.",
  },
  {
    id: 'workbench', title: 'People are activated: the workbench', ms: 11500,
    caption: 'Proposals reach the workbench with their simulation, checks, models and cost, and a trail from each design element back to the difficulty, the trade-off, the claim and the run. A reviewer reads scenario by scenario; a second person validates; a third approves — never the same person twice, and never the proposer. Facing a blocking check, a reviewer can Ask: is the proposal wrong, or is the simulator? The chair rules on what is disputed. The workbench is designed on the same receipts as the translation programme. The review team has not yet sat.',
    rule: 'No design is approved by a machine. Three people decide, their decisions are signed records — and that ceremony is the next thing to stand up, not a claim that it already has.',
    from: 'the design store', to: 'the reviewers · the chair', what: 'proposals with their evidence → receipts per scenario (accept · edit · reject) · "the simulator is too harsh here" → a change request with evidence',
    narration: "Now the people are activated. Proposals reach the workbench with their simulation, their checks, their models and their cost, and a trail from each design element back to the difficulty it addresses, the trade-off it takes a side on, the claim it rests on, and the run that scored it. A reviewer reads scenario by scenario. A second person validates. A third approves — never the same person twice, and never the one who proposed. Facing a blocking check, a reviewer can ask: is the proposal wrong, or is the simulator? The answer comes back in plain language with a recommendation and a button — accept, edit, reject, or file a change request against the physics model or an RCS prior, with this scenario as the evidence. The chair rules on what is disputed. This workbench is designed on the same receipts as the translation programme. The review team has not yet sat. No design is approved by a machine — and we do not pretend the ceremony is live before it is.",
  },
  {
    id: 'again', title: 'The decisions go back into the library — and we start again', ms: 12000,
    caption: "A change request that is accepted is applied in the library, not in someone's notes: a too-loose bound becomes a corrected invariant; a missing modulation becomes a new class. The library ships a versioned release — radar-tracking 1.1.0 added the modulation to the code and the pulse train, and the selection policy as a rule table the simulator executes — and every projection regenerates: the skills, the checker, the named codes, the plan. The release is measured on the same held-out set before it counts. Then the next scenario arrives, and runs under the new release.",
    rule: 'The loop closes through the ontology. A release with no measurement is not a release.',
    from: 'the workbench', to: 'the library → the workshop, the tool counter, the harness floor', what: 'accepted change requests → a versioned ontology release → skills, checker, codes and plan regenerated → measured on the same held-out set → the next scenario runs under it',
    narration: "Last, the loop closes. A change request that is accepted is applied in the library — not in someone's notes. A bound that was too loose becomes a corrected invariant. A distinction the ontology lacked becomes a new class. The library ships a versioned release — the latest specified the modulation all the way to the code and the pulse train, and made the selection policy a rule table the simulator executes and traces — and every projection regenerates: the skills in the workshop, the checker at the tool counter, the named codes, the plan on the floor. Before the release counts, it is measured on the same held-out set as the one before it. A release with no measurement is not a release. And then the next scenario arrives, and runs under the new rules. The people decided; the library remembers; the agent reads the library. That is the whole loop, and it goes around again.",
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
  { gy: 5.0, sign: 'Textbooks', note: 'Skolnik · Barton' },
  { gy: 7.0, sign: 'Open courseware', note: 'MIT Lincoln Lab' },
  { gy: 9.0, sign: 'Public reports', note: 'National Academies' },
  { gy: 11.0, sign: 'Waveform codes', note: 'Levanon · 18 codes' },
  { gy: 13.0, sign: 'RCS estimates', note: 'open literature' },
  { gy: 15.0, sign: 'Frozen scenarios', note: '332 cases' },
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
function InteractionCard({ at }: { at: RadarBeat }) {
  const b = RADAR_BEATS[at]!;
  const w = 480; const x = W - 30 - w; const y = 24; const size = 12.5;
  const lines = wrap(b.what, size, w - 32).slice(0, 4);
  const h = 96 + lines.length * 17;
  const fromTo = b.to === '—' ? b.from : `${b.from}  →  ${b.to}`;
  const ftSize = Math.min(12.5, (12.5 * (w - 32)) / Math.max(tw(fromTo, 12.5, false, 700), w - 32));
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="#0b1830" stroke={PAL.glow} strokeWidth={1.2} opacity={0.96} />
      <text x={x + 16} y={y + 24} fontSize={10.5} fontWeight={700} fill={PAL.glow} fontFamily={FONT} letterSpacing={1.6}>{`SCENE ${at + 1} OF ${RADAR_BEATS.length}`}</text>
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

function Town({ at }: { at: RadarBeat }) {
  return (
    <g>
      <District gx={2.8} gy={0.4} w={5.8} d={4.4} label="The library · the ontology and its knowledge base" tone="teal" at="bottom" />
      <District gx={0.3} gy={4.6} w={2.6} d={11.8} label="Open physics · six shelves" tone="slate" at="bottom" />
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
      <Box gx={MCP.gx} gy={MCP.gy} w={MCP.w} d={MCP.d} h={MCP.h} tone="amber" roof="slab" sign="Tool counter · the radar MCP" signSize={13.5} />

      {/* the floor */}
      <Box gx={MODEL.gx} gy={MODEL.gy} w={MODEL.w} d={MODEL.d} h={MODEL.h} tone="navy" roof="flat" sign="The model desk" signSize={13.5} />
      <Box gx={STORE.gx} gy={STORE.gy} w={STORE.w} d={STORE.d} h={STORE.h} tone="amber" roof="slab" windows={false} sign="The design store" signSize={13.5} />

      {/* south */}
      <Tree gx={5.8} gy={19.4} s={0.9} /><Tree gx={25.0} gy={16.2} s={0.9} /><Tree gx={16.6} gy={13.4} s={0.8} /><Tree gx={25.2} gy={9.8} s={0.8} />
      <Box gx={LAB.gx} gy={LAB.gy} w={LAB.w} d={LAB.d} h={LAB.h} tone="rose" roof="flat" sign="The test lab" signSize={14} />
      <Box gx={WB.gx} gy={WB.gy} w={WB.w} d={WB.d} h={WB.h} tone="violet" roof="pediment" sign="The workbench" signSize={15} />

      {/* the people, and the agent */}
      <Person gx={EDITOR.gx} gy={EDITOR.gy} name="the physicist" color={PAL.teal} note="writes the invariants" />
      <Agent gx={AGENT.gx} gy={AGENT.gy} name="the Design Agent" color={PAL.navy} />
      <Person gx={REVIEWER.gx} gy={REVIEWER.gy} name="a reviewer" color={PAL.violet} note="reads" />
      <Person gx={VALIDATOR.gx} gy={VALIDATOR.gy} name="a second reviewer" color={PAL.violet} note="validates" />
      <Person gx={CHAIR.gx} gy={CHAIR.gy} name="the chair" color={PAL.violet} note="rules" />
    </g>
  );
}

// ── the scene ──────────────────────────────────────────────────────────────────────────────────────────────────────
export function RadarLoopScene({ beat: at = 0 }: { beat?: RadarBeat }) {
  const id = 'radar-loop';
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
      <title id={`${id}-title`}>How a tracking radar is designed from open physics: open sources into an ontology, skills and tools generated from it, an agent that proposes and a simulator that scores one scenario at a time, a test lab that measures the loop, and a workbench where people decide and their decisions go back into the ontology</title>
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
      <Tag gx={skillC.gx} gy={skillC.gy} z={skillZ} text="eleven specialists · a lead · how they behave" color={shade(PAL.violet, 0.3)} on={at === 0} size={T} />
      <Tag gx={mcpC.gx} gy={mcpC.gy} z={mcpZ} text="the tools the agent may call · the simulator" color={PAL.amber} on={at === 0} size={T} />
      <Tag gx={modelC.gx} gy={modelC.gy} z={modelZ} text="the model — fluent, never the judge of physics" color={shade(PAL.navy, 0.4)} on={at === 0} size={T} />
      <Tag gx={labC.gx} gy={labC.gy} z={labZ} text="measures the loop and the checker" color={PAL.rose} on={at === 0} size={T} />
      <Tag gx={wbC.gx} gy={wbC.gy} z={wbZ} text="people decide · decisions become data" color={shade(PAL.violet, 0.3)} on={at === 0} size={T} />

      {/* beat 1 — the sources */}
      <Walker pts={L.shelf[0]!} beat={1} at={at} say="the textbooks — the physics the simulator may use" color={PAL.slate} delay={300} dur={2.4} size={S} />
      <Walker pts={L.shelf[2]!} beat={1} at={at} say="attributed claims — what evidence establishes, and not" color={PAL.slate} delay={1500} dur={2.6} size={S} />
      <Walker pts={L.shelf[4]!} beat={1} at={at} say="332 frozen scenarios · open-estimate RCS, never measured" color={PAL.slate} delay={2700} dur={2.8} size={S} />
      <Note gx={EDITOR.gx - 0.3} gy={EDITOR.gy} z={-30} lines={['And sixteen invariants I wrote down, with reasons:', '"a claim is scored by the simulator".']} color={PAL.glow} on={at === 1} delay={4200} size={S} anchor="left" />
      <Reply gx={libC.gx} gy={libC.gy} z={libZ} text="each under its own licence, pinned to a release" color={PAL.good} beat={1} at={at} delay={5800} size={S} summary={SUMMARY} />

      {/* beat 2 — the projections */}
      <Walker pts={L.toSkills} beat={2} at={at} say="the skills' record sections — from the shapes" color={PAL.teal} delay={200} dur={1.8} size={S} />
      <Walker pts={L.toMcp} beat={2} at={at} say="the checker's rules · the named codes" color={PAL.teal} delay={1400} dur={2.2} size={S} />
      <Walker pts={L.toFloor} beat={2} at={at} say="the plan and its controlled values" color={PAL.teal} delay={2600} dur={1.8} size={S} />
      <Tag gx={libC.gx} gy={libC.gy} z={libZ} text="one description · many projections · the build fails on drift" color={PAL.good} on={at === 2} delay={4400} size={T} />

      {/* beat 3 — the playbook */}
      <Walker pts={L.playbook} beat={3} at={at} say="eleven specialists + a lead → one playbook, by digest" color={PAL.violet} delay={300} dur={2.4} size={S} />
      <Reply gx={AGENT.gx} gy={AGENT.gy} z={64} text="born with its playbook — behaviour, never permission" color={shade(PAL.violet, 0.35)} beat={3} at={at} delay={2900} size={S} summary={SUMMARY} />

      {/* beat 4 — the counter opens; the lab checks the checker */}
      <Tag gx={mcpC.gx} gy={mcpC.gy} z={mcpZ} text="scenario · space · claims · bounds · simulate · checks · propose" color={PAL.amber} on={at === 4} size={T} />
      <Walker pts={L.labToMcp} beat={4} at={at} say="eleven kinds of planted error, through the checks" color={PAL.rose} delay={1200} dur={3.2} size={S} />
      <Note gx={MCP.gx + 1.6} gy={MCP.gy + MCP.d + 0.9} z={0} lines={['194 planted cases · catch 0.995', 'a claim that beats the radar equation is blocking', 'the one miss: inflated Pd where the floor already met it']} color={PAL.good} on={at === 4} delay={4600} size={S} anchor="below" dx={80} />

      {/* beat 5 — a passage arrives */}
      <Note gx={EDITOR.gx - 0.3} gy={EDITOR.gy} z={-30} lines={['Go. The whole library,', 'one scenario at a time.']} color={PAL.glow} on={at === 5} delay={200} size={S} anchor="left" />
      <Walker pts={L.pericope} beat={5} at={at} say="a cue at 120 km · 4 s old · σ 1.5 km · no engagement" color={PAL.glow} delay={1200} dur={3} size={S} />
      <Reply gx={AGENT.gx} gy={AGENT.gy} z={64} text='the acquisition radar and the fire controller are peers — not designed here' color={PAL.glow} beat={5} at={at} delay={4500} size={S} summary={SUMMARY} />

      {/* beat 6 — fetch */}
      <Walker pts={L.toCounter} beat={6} at={at} say="get scenario · design space · claims · bounds" color={PAL.amber} delay={200} dur={1.8} until={2600} size={S} />
      <Note gx={MCP.gx + 1.6} gy={MCP.gy + MCP.d + 0.9} z={0} lines={['the cue, the contract, the target, the platform', 'the bands, families, arrangements, trackers', 'attributed claims under the evidence policy', 'the radar equation and the CRLB for this cue', 'dependent sources never counted twice']} color={PAL.amber} on={at === 6} delay={2300} size={S} anchor="below" dx={80} />
      <Walker pts={L.fromCounter} beat={6} at={at} say="the problem, through the library" color={PAL.amber} delay={5200} dur={1.6} size={S} />

      {/* beat 7 — the draft (model call 1) */}
      <Walker pts={L.toModel} beat={7} at={at} say="which difficulty binds · then propose both layers" color={shade(PAL.navy, 0.3)} delay={200} dur={1.8} until={2600} size={S} />
      <Tag gx={modelC.gx} gy={modelC.gy} z={modelZ} text="MODEL CALLS 1–2 · analyse, then propose (the cheap model)" color={PAL.glow} on={at === 7} delay={1800} size={T} />
      <Note gx={MODEL.gx + MODEL.w + 0.3} gy={MODEL.gy + MODEL.d + 0.8} z={0} dx={140} dy={20} lines={['continuity binds: the nose-on fade drops the echo', 'X-band, five-mode library, 4× burst on the track mode', 'every number cites a bound or an attributed claim']} color={shade(PAL.navy, 0.45)} on={at === 7} delay={2600} size={S} anchor="below" />
      <Walker pts={L.fromModel} beat={7} at={at} say="a proposal + its cited claims" color={shade(PAL.navy, 0.3)} delay={5400} dur={1.6} size={S} />

      {/* beat 8 — checks */}
      <Walker pts={L.toCounter} beat={8} at={at} say="simulate the proposal · run the checks" color={PAL.amber} delay={200} dur={1.8} until={2600} size={S} />
      <Tag gx={mcpC.gx} gy={mcpC.gy} z={mcpZ} text="the simulator and the checks · no model in this step" color={PAL.amber} on={at === 8} delay={1800} size={T} />
      <Note gx={MCP.gx + 1.6} gy={MCP.gy + MCP.d + 0.9} z={0} lines={['every claim cited? ✓', 'beats the radar equation or the CRLB? ✓', 'waveform fits the transmitter? ✓', 'weak-stratum budget 1.5 dB under detection ✗', 'continuity claim overran the run ✗']} color={PAL.amber} on={at === 8} delay={2400} size={S} anchor="below" dx={80} />
      <Walker pts={L.fromCounter} beat={8} at={at} say="2 blocking — back to the desk" color={PAL.bad} delay={6200} dur={1.6} size={S} />

      {/* beat 9 — revise (model calls 2, 3) and checks again */}
      <Walker pts={L.toModel} beat={9} at={at} say="your proposal + the run + the failing checks" color={shade(PAL.navy, 0.3)} delay={200} dur={1.8} until={2600} size={S} />
      <Tag gx={modelC.gx} gy={modelC.gy} z={modelZ} text="MODEL CALL 3 · the reviser · then simulate again" color={PAL.glow} on={at === 9} delay={1800} size={T} />
      <Walker pts={L.fromModel} beat={9} at={at} say="revised — burst mode in, claim corrected" color={shade(PAL.navy, 0.3)} delay={3400} dur={1.6} until={5200} size={S} />
      <Walker pts={L.toCounter} beat={9} at={at} say="simulate and check it again" color={PAL.amber} delay={5300} dur={1.6} until={7000} size={S} />
      <Reply gx={MCPFRONT.gx} gy={MCPFRONT.gy + 0.4} z={0} text="0 blocking ✓ · 1 major · the burst covers the weak stratum" color={PAL.good} beat={9} at={at} delay={7000} size={S} summary={SUMMARY} />

      {/* beat 10 — propose */}
      <Walker pts={L.toStore} beat={10} at={at} say="propose: both layers · the run · the checks · the models · the cost · the run id" color={PAL.good} delay={300} dur={2} size={S} />
      <Note gx={STORE.gx + 1.2} gy={STORE.gy + STORE.d + 0.6} z={0} lines={['status: checked — never "approved"', 'alternatives kept, with why they were not selected', 'the provenance of every step filed beside it']} color={PAL.good} on={at === 10} delay={2600} size={S} anchor="below" />

      {/* beat 11 — the lab */}
      <Walker pts={L.toLab} beat={11} at={at} say="the same plan, on 31 held-out scenarios" color={PAL.rose} delay={300} dur={2.4} size={S} />
      <Note gx={LAB.gx + LAB.w / 2} gy={LAB.gy + LAB.d + 0.4} z={0} lines={['ceiling: exhaustive search · floor: the textbook S-band tracker', '194 planted errors — caught 0.995, per kind', 'Stone Soup agrees on the tracker, 24 cases, to machine precision', 'held-out model numbers: not run, so not quoted']} color={PAL.rose} on={at === 11} delay={2900} size={S} anchor="below" dx={30} />
      <Tag gx={labC.gx} gy={labC.gy} z={labZ} text="a vendor brochure is a claim, never a score" color={PAL.rose} on={at === 11} delay={5600} size={T} />

      {/* beat 12 — the workbench */}
      <Walker pts={L.toWb} beat={12} at={at} say="proposals, with their run, checks, models and cost" color={PAL.violet} delay={300} dur={2} size={S} />
      <Note gx={CHAIR.gx} gy={CHAIR.gy} z={-64} dx={80} lines={['a reviewer — the burst was the right lever. Accept.', 'a reviewer — this RCS prior is too optimistic here →', '    a change request, with this scenario as the evidence', 'the chair — a vendor number is a claim, never a parameter;', '    the workbench is designed; the team has not yet sat']} color={shade(PAL.violet, 0.45)} on={at === 12} delay={2600} size={S} />
      <Reply gx={VALIDATOR.gx} gy={VALIDATOR.gy} z={62} text="a receipt per scenario · never the same person twice" color={shade(PAL.violet, 0.4)} beat={12} at={at} delay={4800} size={S} summary={SUMMARY} />

      {/* beat 13 — upstream, and round again */}
      <Walker pts={L.upstream} beat={13} at={at} say="accepted change requests → the physicist, at the library" color={PAL.glow} delay={300} dur={3.4} size={S} />
      <Reply gx={libC.gx} gy={libC.gy} z={libZ} text="ontology release 1.1.0 — the decisions, now data" color={PAL.good} beat={13} at={at} delay={3800} size={S} summary={SUMMARY} />
      <Walker pts={L.toSkills} beat={13} at={at} say="skills regenerated" color={PAL.teal} delay={4000} dur={1.6} size={S} />
      <Walker pts={L.toMcp} beat={13} at={at} say="named codes reloaded · checker regenerated" color={PAL.teal} delay={4400} dur={1.8} size={S} />
      <Tag gx={labC.gx} gy={labC.gy} z={labZ} text="measured on the same held-out set before it counts" color={PAL.rose} on={at === 13} delay={5600} size={T} />
      <Walker pts={L.pericope} beat={13} at={at} say="the next scenario — under the new release" color={PAL.glow} delay={6400} dur={3} size={S} />
      </g>
      <InteractionCard at={at} />
    </svg>
  );
}
