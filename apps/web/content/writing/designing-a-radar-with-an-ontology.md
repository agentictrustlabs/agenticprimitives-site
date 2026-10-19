# A machine designed a tracking radar. The hard part was making sure it didn’t invent the physics.

Ask a large language model to design a radar that can hold a track on a low-observable aircraft and it will give you a fluent, confident configuration in about a minute. It will also, almost certainly, give you numbers it has read in a brochure — a detection range that beats the radar equation, a waveform a transmitter that size cannot carry, a vendor claim treated as a measurement. For a slide deck nobody minds. For a design that claims to come from the physics, it is the whole problem.

This is the story of a science project that uses the same four parts as [the Bible-translation programme](/writing/translating-the-bible-with-an-ontology): an ontology that describes the domain once, a design loop held to a deterministic simulator, a test harness that measures the checker before it trusts the model, and a workbench where people decide. The domain is different. The shape is the same. And the honesty is the same: we say what is live, and we say what is not.

## Why this is a tough job

Three things make tracking-radar design unforgiving in a way most AI tasks are not.

**You cannot grade it against the brochure.** With most engineering generation you check the output against a published answer. Here the published answers — vendor figures, press estimates, even a well-known textbook example taken out of its assumptions — are exactly what the model must not copy as if they were measurements. If you score the machine on how close it gets to a named system, you are training it to recite. We needed a way to measure a design against the *physics* it came from — every claim cited, every number inside the radar equation and the Cramér–Rao bound, every waveform inside the transmitter that carries it — without ever rewarding resemblance to a brochure.

**Three difficulties act together, and they pull against each other.** A low-observable aircraft returns an extremely weak echo that changes with aspect and frequency. Separating that echo from noise, clutter and interference raises false alarms. Holding the track when the echo fades means later detections must be associated to the same object while uncertainty grows. Precision of position and velocity is limited by the aperture a vehicle can carry and by the wavelength that aperture can usefully use. A designer working one component at a time has no way to keep these straight unless something outside the component remembers the trade-offs.

**Every number has to be explainable.** A reviewer is entitled to ask: why this band, why this code, why this burst? "The model preferred it" is not an answer. The answer has to be a reason — a bound, an attributed claim with a date and a source, a simulation under a named seed and a named simulator version — that a person made, recorded, and can revisit.

A language model has none of this by nature. It has fluency and memory. The system around it has to supply the rest.

The boundary of the project is set, not asked. Open-literature physics only. Targets are synthetic classes or open-estimate profiles of a named aircraft type, every value traced to public sources, never a measured signature. No classified or export-controlled parameter. No engagement recommendation. The acquisition radar and the fire-control system are peers modelled only at their interfaces: a cue in, a track out. The thing being designed is the radar in between.

## The approach, in one picture — animated

Press play. The town below is the whole system: six shelves of open physics on the left, the library (the ontology and its knowledge base) at the top, the skill workshop and the tool counter on the right, the harness floor in the middle where the Design Agent works beside the model desk, the test lab on the lower left, and the workbench — where the people are — at the bottom. Fourteen scenes: how the sources become one description, how that description generates the skills, the tools and the plan, what happens to one cue step by step (every tool call and every model call named), how the loop is measured, how people decide, and how their decisions go back into the library before the next scenario runs.

```story
scene: radar
id: radar-loop-story
narration: /audio/radar-loop
```

Four parts. The **ontology** says what exists in the problem and which numbers a claim may use. The **design loop** proposes a configuration under those rules and is sent back when a check fails. The **test harness** measures the loop and the checks themselves, with a floor and a ceiling, before any number is believed. The **workbench** is where people review, decide, and correct — and their corrections flow back into the ontology, not into a pile of notes. The rest of this essay walks the same loop in prose, with the numbers as they stand today.

## Part one: the ontology — describing the problem once, so everything else can be held to it

An ontology is a formal description of a domain: what kinds of things exist, how they relate, what values a field may take, and the individual things themselves. Ours sits on the same foundations the rest of Agentic Primitives uses — W3C PROV-O for who did what, DOLCE for the difference between a *description* (a rule that should hold) and a *situation* (what actually happened), P-Plan for plans with steps — and adds a radar-tracking layer on top, prefix `rtr:`.

What is in it today (radar-tracking 1.1.0):

- **The problem, named.** A mission goal; three performance tiers as thresholds with numbers (cue acquisition, track maintenance, handoff quality), never as words; three difficulties (separation, continuity, precision) as descriptions of the mechanism; the trade-offs that pull against each other (sensitivity against false alarms, wavelength against resolution, energy against low probability of intercept, one node against synchronisation).
- **The phenomenology.** Radar-cross-section models that vary with aspect, frequency and polarisation, with a Swerling kind and a designed low-RCS sector; fades; clutter; noise; interference (noise jamming, deception, multipath); propagation; scattering geometry.
- **The target and the environment, as situations.** A target with its kinematics; an environment; a platform with what a vehicle can carry; a scenario that binds target × environment × platform × the tier asked, and carries the two handoffs: the cue received from the acquisition peer, the contract agreed with the fire-control peer.
- **Two layers, each with a transmit and a receive side.** The hardware layer is physical: nodes, transmitter, receiver, antenna, arrangement, synchronisation. The signal layer is informational and decoupled from it: a waveform library specified to the modulation scheme, the named code, the pulse train and the ambiguity profile the simulator *computes*; a receive-processing chain; a tracker and an association policy; a cognitive controller whose selection policy is a rule table over track-state classes and signal-quality indicators, executed and traced per dwell. The two layers are related by consistency, not identity: a waveform that does not fit its transmitter is a blocking check.
- **Eighteen named codes as rows**, with published peak and integrated sidelobes, Doppler tolerance and generating rule, every figure attributed (Barker, P4, Frank, Zadoff–Chu, Golay, Costas, and the rest). A code is data. A model does not invent its sidelobes.
- **Attributed research claims.** Twenty-six public sources as nodes: what each establishes, what it claims, the date, the method, and which sources depend on which. Agreement among dependent sources is never counted as independent corroboration. A vendor's word is not verification.
- **Open-estimate RCS profiles**, not signatures. The aircraft under study enters as three grades across the published frontal X-band spread (0.1–1 m²), plus a labelled hypothetical stress case ten decibels below nominal. Every band value traces to attributed claims. No record carries a measured or classified signature, and a profile is never asserted to *be* the aircraft.
- **The design record.** A proposal with predicted metrics; a simulation run (seed, scenario, simulator version); a verdict; alternatives kept with why they were not selected; a decision as a receipt over a hash. A recommendation is two paired runs with a lift and its interval, never a vibes comparison.
- **Sixteen invariants**, written down with reasons. A tier is a threshold, not a word. A claim is scored by the simulator. Physics is blocking. A vendor's word is not verification. No measured signature. Pulse-compression gain is the time–bandwidth product; the filter kind decides how cleanly it is realised, never how much. The modulation is specified to the code and the train; the ambiguity profile is computed, never asserted. A selection policy is a data rule table, and every dwell is recorded.

The discipline that makes this more than documentation: the skills the agent runs, the simulator's enums, the checker's profile, the named codes in the code, and the plan the runtime executes are all *generated from* or *validated against* the ontology. Change an invariant and the skill text changes, the checker changes, and the register changes — with a build that fails if any of them drift. One description, many projections.

## Part two: the design loop — proposing from the physics, held to the simulator

The loop runs on one scenario at a time — 332 of them, content-committed, split into a development set of 107, a held-out set of 31 written once and locked, and a regression set of 194 planted errors — as a declared plan of steps. Every step is recorded as a provenance activity — inputs, outputs, model, cost, cache hits — so a run is a graph you can query, not a log you search.

Five pre-registered arms. Two of them have no model at all: the *floor* is the textbook single-node S-band LFM pulse-Doppler monopulse tracker; the *ceiling* is an exhaustive search over the declared design space on the same simulator. The three model arms add the design space, then the attributed claims, then a critic from a second model family. A number from an arm that has not been run is not a number.

On a model arm the steps are:

1. **Scenario.** The frozen cue, contract, target, environment, platform. Frozen means content-committed; the system refuses to re-ingest a source whose upstream edition moved.
2. **Design space and claims.** The spine for this difficulty and tier; the attributed claims under an evidence policy (accepted-and-reviewed by default). Dependent sources are marked.
3. **Analyse — the first model call.** Which difficulty binds, which trade-offs that forces a side on, candidate options in each layer with evidence. No numbers claimed yet. Short record, cheap model.
4. **Propose — the second model call.** Both layers bound, predicted metrics with a cited bound or claim on every number, alternatives kept, a waveform library specified to the code and the train, a selection policy as a rule table. While proposing, the model may call the signal tools: compute the ambiguity, compute the link budget per mode and stratum, look up a code's published figures, dry-run the policy. The proposal is a structured record, not prose — the first live runs taught that a model which writes the whole design as text in a tool round runs out of tokens.
5. **Simulate and check — code, not a model.** The simulator runs the configuration, seeded, many times. Then the checks: physics-consistency (radar equation, CRLB, angular-resolution bound); hardware–signal consistency (waveform inside the transmitter, chain inside the receiver); unsupported-claim; tier-claimed-not-met; missing-trade-off; schema. A claim that beats the physics is blocking, regardless of its prose.
6. **Revise — the third model call, only when a check blocks or is major.** The model receives its own proposal, the run, and the failing checks. After each round the simulator and the checks run again. The kept pass is the best one, not the last one.
7. **Propose.** One proposal into the design store, carrying the configuration, the claims, the run, the checks, which models drafted and revised it, the cost, and the run it came from. The status says `checked`. It never says approved.

The first live model run (Haiku 5.5 drafts and revises, four seeds, one development scenario): sixteen steps, ninety-seven seconds, about two cents, verdict accept — zero blocking, one major, handoff accepted on four seeds of four. That is a smoke reading. It is how we learned four things that are now code: a structured step's token cap is spent on thinking, so analysis runs short; the proposal is asked for as a record after the tools, not as prose during them; a second reviser is opt-in; a structured answer is held to its schema, because the model once returned JSON as text with a stray brace, and once invented a metric id the C-box does not have.

## Part three: the test harness — measure the measurer first

Here is the part most AI projects skip, and the part that found every important mistake we made.

**The checker was measured before the model was.** One hundred and ninety-four cases, eleven kinds of planted error in a sound design: a claim below the Cramér–Rao bound, a violated radar equation, an inflated detection probability, a fabricated vendor claim, a waveform that exceeds the transmitter, a library mode the hardware cannot carry, swapped band properties, a wrong tier, a skipped contract field, a dropped trade-off, an ignored cue volume. Catch rate 0.995 overall. Ten of the eleven kinds catch at 1.00. Inflated detection catches at 12 of 13, because the thirteenth plant was a claim the textbook floor already met — there was nothing honest to catch, and the builder now skips that pair. We know which, and we say so.

**The simulator has its own floor.** The tracking stage was cross-checked against Stone Soup 1.9.1, an independent published filter, on twenty-four cases with the same transition and measurement model. They agree to machine precision (worst relative difference ~10⁻¹⁴, tolerance 0.01). Stone Soup is not in the loop. It is attached afterwards, named in the manifest, like any other independent check.

**Experiments are pre-registered and never pooled.** A development set to tune on. A held-out set written once and locked, so it can be quoted. Arms declared in advance. Deterministic graders first. A run that fails for a reason that is not the agent's fault is recorded as such and kept out of the agent's score. The smoke set is never a number to quote.

**What we do not yet quote.** The held-out model arms have not been walked. The first live run is a smoke reading on one scenario. We will quote held-out numbers with the judge named, with the floor and the ceiling beside them, and with paired intervals, or we will not quote them.

## Part four: the workbench — where people decide, and decisions become data

No design is approved by a machine. The workbench is where a review team reads proposals scenario by scenario, each with its simulation, its checks, which model drafted it and which revised it, a trail from each design element back to the difficulty, the trade-off, the claim and the run, and a per-scenario receipt of who decided what. Three people take a proposal to publishable — one accepts, a second validates, a third approves — never the same person twice and never the proposer. Ask and Do is the same button as in the translation programme: is the proposal wrong, or is the simulator? The recommendation comes with accept, edit, reject, or a change request against a physics model or an RCS prior, with this scenario as the evidence.

**This ceremony is designed. The review team has not yet sat.** The translation workbench is live; this one is the next piece of the programme, not a claim that it already ships. We describe it here because the loop is not closed until people decide, and because describing it later as if it had always been there is how programmes start lying about themselves.

**When it is live, corrections flow upstream as requests with evidence.** Accepted is not applied: applying it means editing the ontology source, passing preflight, and shipping a versioned release whose changelog names the findings it closes and whose projections — the skills, the checker's profile, the named codes, the plan — are regenerated from it. The release is measured on the same pre-registered set as the one before; a release with no measurement is not a release.

## What is next, honestly

The ontology, the simulator, the MCP, the declared plan, the planted-error harness and a live smoke of the model arm exist. Three things do not.

The **workbench**, as above. The **held-out model numbers**, which will be quoted once, with the judge named, or not at all. And the **analysis step made first-class** the way the translation programme is now doing: a structured reading of each scenario — which difficulty binds, which trade-offs, which open questions — validated against the ontology *before* any configuration is written, so the English (here, the design) is generated from the analysis.

The boundary does not move. No measured signature, no classified parameter, no engagement advice, no vendor figure as a design input. A public system enters only as an attributed claim with its evidence and date.

## Why this is not about radar

Strip the radar away and look at the shape.

A task where the obvious metric rewards the wrong behaviour. A domain where consistency must hold across coupled difficulties no one context window can keep. A requirement that every output be explainable as a cited bound or a cited source, not as a preference. A checker that had to be measured against planted errors before it was trusted. A model that is never the judge of its own work. People who decide, and whose decisions become data the next run reads.

That is the Bible-translation programme, with verses swapped for scenarios and a published edition swapped for a brochure. It is also clinical decision support, regulatory filings, contract review, financial reconciliation, incident response under a doctrine. Any place a fluent model would rather remember an answer than derive one.

That is what Agentic Primitives is. The radar is the example where the thing being measured is a number the physics can contradict — which makes both the power of the approach and its limits today unusually easy to see.

The sibling account — the Bible drafted from Hebrew and Greek without copying the English the model remembers — is [Translating the Bible with an ontology](/writing/translating-the-bible-with-an-ontology).

`#AgenticPrimitives #Ontology #Radar #AIEvaluation #KnowledgeGraph #TrustworthyAI`
