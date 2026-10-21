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

Four parts. The **ontology** says what exists in the problem and which numbers a claim may use. The **design loop** proposes a configuration under those rules and is sent back when a check fails. The **test harness** measures the loop and the checks themselves, with a floor and a ceiling, before any number is believed. The **workbench** is where people review, decide, and correct — and their corrections flow back into the ontology, not into a pile of notes. The animation is the walk of one cue. The prose below is the description as of 20 October 2026, with each quoted number named by its run.

## Part one: the ontology — describing the problem once, so everything else can be held to it

An ontology here is a formal description a machine can check. It names the kinds of things in the problem, the relations between them, the closed lists a field may take, the shape a record must have, and the individual things themselves — a scenario, a code, a claim, a rule. It sits on the same foundations the rest of Agentic Primitives uses: W3C PROV-O for who did what, DOLCE for the difference between a *description* (a rule that should hold) and a *situation* (what actually happened), and P-Plan for plans with steps.

There are two ontologies, and they are not the same job.

**Radar tracking** (`rtr:`, version 1.1.0) is the problem between two peers. It has 118 classes in sixteen modules. The acquisition radar and the fire controller are modelled only at the interface: a cue in, a contract out. The modules, in the order a design is read, are:

1. **The problem.** A mission goal. Three phases as thresholds with numbers — cue acquisition, track maintenance, handoff quality — and a phase with no numbers is a word. Three difficulties: separation (the weak echo against noise, clutter and interference inside the cue volume), continuity (association through fades as uncertainty grows), and precision (range, speed and angle under the aperture the vehicle can carry). The trade-offs that pull against each other: sensitivity against false alarms, wavelength against resolution, energy against a low probability of intercept, one node against synchronisation, dwell on the held track against search of the cue volume after a fade.
2. **The physics of the echo.** A radar-cross-section model that varies with aspect, frequency and polarisation, with a Swerling kind and a designed low-RCS sector. Fades. Clutter. Noise. Interference. Propagation. Scattering geometry. A Cramér–Rao bound for range, Doppler and angle. A claimed precision below that bound is a physics failure.
3. **Cue, target and scenario.** The acquisition handoff is a position, a velocity, their errors, the time they were valid, and how old they are when they arrive. The tracking radar searches that volume and nothing wider. A target, its kinematics, an environment, a platform, and a scenario that binds them to the phase being asked.
4. **The arrangement.** Nodes, roles, band, monostatic or multistatic geometry, and the synchronisation a network's angle and Doppler claims need.
5. **The hardware layer.** Transmitter, receiver, antenna, the two subsystems, and the binding to a signal. A waveform the transmitter cannot carry is a blocking check. Peak power does not change per dwell. Energy does, inside the duty ceiling.
6. **The signal layer.** A waveform family, a pulse width, a bandwidth, a pulse-repetition frequency, a pulse count, and the role that mode plays in a library. Bandwidth sets range resolution. The coherent interval sets Doppler resolution. The repetition frequency sets the unambiguous range and the unambiguous speed, and one frequency rarely holds both.
7. **The modulation, in detail.** The scheme, the named sweep or the named code, the taper, and the ambiguity profile. Eighteen named codes are rows — Barker, P4, Frank, Zadoff–Chu, Golay, Costas, and the rest — each with published peak and integrated sidelobes, Doppler tolerance and a generating rule, every figure attributed. A model does not invent a code's sidelobes. The ambiguity profile is computed by the simulator. It is never typed in.
8. **The pulse train and the library.** One mode or several. Agility from pulse to pulse or burst to burst. A library of one fixed mode is the classic single-waveform radar.
9. **Waveform selection.** How a mode is chosen each dwell: fixed, scheduled by phase, driven by track quality, adapted to clutter and interference, a one-step look-ahead, or a rule table the designer writes. The first five are built into the simulator. A rule table is data: if the track is in this state and these indicators hold, send this mode, with a priority, a hysteresis and a minimum stay. Every dwell is recorded.
10. **Tracking and cognitive control.** The filter, the association policy, the detector, the receive chain stage by stage.
11. **Measurement and the handoff.** What the fire controller's contract actually requires: covariance, track age, update rate, latency, continuity over the last window.
12. **The design team's assessments.** One typed record per specialist, bound to the scenario and citing a claim.
13. **The proposal and its evidence.** Predicted metrics, alternatives kept with why they were not selected.
14. **Simulation, checks and the decision.** A run (seed, scenario, simulator version), a verdict, a receipt over a hash.
15. **Attributed research claims.** Public sources as nodes: what each establishes, what it only claims, the date, the method, and which sources depend on which. Agreement among dependent sources is never counted as a second witness.
16. **The benchmark.** The frozen scenarios, the arms, the planted errors.

Open-estimate RCS profiles, not signatures. The aircraft under study enters as three grades across the published frontal X-band spread (0.1–1 m²), plus a labelled hypothetical stress case ten decibels below nominal. Every band value traces to an attributed claim. No record carries a measured or classified signature, and a profile is never asserted to *be* the aircraft.

**Radar signals** (`rsg:`, version 1.0.0) is what the signal designer is allowed to say about a pulse. It has 136 classes in fifteen modules. Tracking says "a library mode with a PRF and a code." Signals says what that sentence is made of, so a rule can be evaluated over a proposal's fields:

- The transmitted signal: carrier, envelope, spectrum, energy, and the time–bandwidth product, which fixes the compression gain.
- Sweep laws as functions with parameters: linear, polynomial, tan-hybrid, cosine-on-pedestal, stationary-phase, piecewise, stepped across pulses.
- Codes as the generators that produce them, the sets built from one generator, continuous-phase shaping, and a slow-time phase code across a burst.
- The schedule: ordered repetition frequencies, stagger, burst, coherent interval, dwell, and the blind-zone map the schedule leaves. The map is derived. It is not asserted.
- The ambiguity function cut into pieces: the sidelobes near and far, the Doppler-tolerance curve at the target's Doppler, the range–Doppler coupling and the correction, the resolution cell at the cue.
- The receive filters: matched, weighted, mismatched (sidelobes bought with a stated SNR loss), adaptive, stretch; the clutter canceller; the Doppler bank; keystone; space-time adaptive processing.
- Detection, angle, and track-before-detect.
- The target as the signal sees it, synthetic.
- Clutter resolved into the cells the waveform actually forms.
- The environment the signal crosses.
- The closed loop: perceive, value, act, record.
- Learned synthesis, held to the same checks as a named code.
- Design rules the harness runs: a derivation the simulator must match, a constraint that blocks, or a heuristic that only proposes an alternative to score. A heuristic never blocks and never scores by itself.
- A laboratory package for proposing waveforms. Its courtyard figures are stopping criteria written on the claim. None of them is a measurement in this study.

The two ontologies meet at the proposal. A tracking scenario names the cue, the contract and the difficulties. A signal record names the pulse. A design rule reads the signal record's fields and writes a check the tracking proposal must survive. Compression gain is \(10 \log_{10}(BT)\). The filter kind decides how cleanly that gain is realised. It does not add to it.

The skills the agent runs, the simulator's enums, the checker's profile, the named codes, and the plan the runtime executes are generated from or validated against these files. Change an invariant and the skill text, the checker and the register change with it. The build fails if any of them drift.

## The design approach

The acquisition radar has already handed over a location. The tracking radar does not search the sky. It searches the cue volume, and the tracker already has a place to hang the next measurement. That changes what the signal is allowed to spend.

**Range may fold. Speed should not, or the fold must be a mode the controller can leave.** One repetition frequency sets both the unambiguous range and the unambiguous speed, and they pull against each other. Because the cue names a volume, a folded range is a labeling problem for the filter: the measurement is assigned to the fold the track predicts, inside that volume. A folded speed is not. A target whose Doppler lands on the same bin as a stationary return is invisible to integration, however many pulses you add. The sampling step therefore writes two frequencies when one cannot hold both — one that keeps the cue's range, and one that keeps the speed — and says so. A code does not remove that ambiguity.

**Detection is pulse count, inside a coherent interval the echo still holds.** Once the track is associated, the way to raise the probability of detection on a weak return is to put more pulses on it: a longer burst, at the repetition frequency the speed requires, for as long as the echo stays coherent. The target assessment names that decorrelation time, and a burst longer than it is a blocking check. Compression gain stays the time–bandwidth product of each pulse. Extra pulses are integration, and the link budget shows the SNR the detector actually sees for that mode and that RCS stratum.

**The modulation moves with the track.** The library is several modes, each specified to the scheme, the code or the sweep, the taper and the train. The controller picks one per dwell from the track state and the signal-quality indicators the simulator computes. While the track is held and the residual is inside the gate, it stays on the long burst. When the residual says the range fold or the speed fold is the thing that is wrong, it switches: a second repetition frequency, a stagger whose blind speeds interleave, or a sweep reversed so the range–Doppler coupling of the first sweep can be taken out by the midpoint of the pair. Hysteresis and a minimum stay keep it from oscillating. Every choice is a row in the selection trace. A policy with no rows is a blocking check, and the run completes on the fixed waveform so the failure is named rather than crashing the walk.

**Twelve roles, one proposal.** The design lead does not write the antenna and the waveform in one prompt. It convenes eleven specialists, in this order, and each hands it a typed record bound to the scenario and citing a claim:

| Role | What it owns | What it hands the lead |
| --- | --- | --- |
| Target analyst | stratum, Doppler span, fades, decorrelation, manoeuvre | a target assessment |
| Countermeasures analyst | a hypothetical posture, and the ECCM it asks for | a posture, with the sentence that says it is hypothetical |
| Environment analyst | band, losses, horizon, clutter spread, bounds | an environment assessment and the bound rows |
| Hardware architect | nodes, transmitter, receiver, antenna, synchronisation | options with their limits |
| Signal designer | the library to the pulse, and the link budget per mode and stratum | the modes, their ambiguity, their budgets |
| Processing designer | the receive chain, stage by stage | the filter, the notch, the detector |
| Tracking designer | filter, gate, association, coast, unfolding | the tracker, and the handoff arithmetic |
| Controller designer | the rule table over track state and signal quality | the selection policy |
| Simulation engineer | paired runs, seeds, intervals, verdicts | the campaign, and nothing revised |
| Evidence librarian | what a public source establishes, and what it does not | the claims every figure resolves to |
| Design critic | a blind reading on another model family | checks and arguments; it may fail to find, and it may not accept |

The lead binds the hardware and the signal (`transmits`, `processesWith`), proposes one configuration, sends it to the campaign, revises on a blocking check, takes the critic's reading, and records a decision. The status of a machine proposal is `checked`. It is not approved.

## The signal archetypes and the skill artifacts

A skill is a `SKILL.md`. Its canonical id is `skill:radar-tracking/<name>`. The frontmatter names the archetype that wears it, the capability, the ontology classes it may produce (`covers`), the classes it must leave alone (`excludes`), and the tools it may call. The body is the instruction. On a full design arm the runtime appends that body to the system prompt of the step the capability governs, and the activity records `governedBySkill`. On the signal-receive focus the four short questions are written into the plan itself, and the skill body is left off those steps, so a trace of that arm will not show the text below. The text is still the contract those questions are cut from.

Three archetypes own the signal. The others own the problem around it.

| Archetype | Artifact | Capability | What the body directs |
| --- | --- | --- | --- |
| `radar-signal-designer` | `skill:radar-tracking/design-waveform-library` | `rtr.signal.design` | The library, mode by mode, to the pulse, and the link budget of each mode at each cross-section |
| `radar-signal-designer` | `skill:radar-tracking/compute-ambiguity` | `rtr.signal.ambiguity` | The ambiguity profile, computed from the pulse. The tool runs it. The skill says which numbers, and that a typed-in figure is a blocking check |
| `radar-processing-designer` | `skill:radar-tracking/design-receive-chain` | `rtr.processing.design` | The chain that reads that library: compression, Doppler, clutter, detector |
| `radar-controller-designer` | `skill:radar-tracking/design-selection-policy` | `rtr.controller.design` | The rule table that picks a mode each dwell from track state and signal quality |

The rest of the team, the same way: `radar-design-agent` wears `frame-the-problem`, `explore-design-space`, `ground-in-evidence`, `propose-configuration`, `simulate-and-check`, `independent-critique`, `record-decision`, `decline-out-of-scope`. `radar-target-analyst` wears `assess-target`. `radar-countermeasures-analyst` wears `assess-countermeasures`. `radar-environment-analyst` wears `assess-environment`. `radar-hardware-architect` wears `design-hardware-layer`. `radar-tracking-designer` wears `design-tracker`. `radar-simulation-engineer` wears `run-simulation-campaign`. `radar-evidence-librarian` wears `curate-claims`. `radar-design-critic` wears `red-team-design`.

### What goes on the pulse

`design-waveform-library` is the signal designer's instruction. It takes the target assessment (Doppler span, fade fraction, decorrelation time), the environment (clutter spread, the band), the hypothetical posture, and the transmitter's limits (peak, average, duty, instantaneous bandwidth). It then specifies every mode the controller will be allowed to send.

The scene decides what the signal spends.

- **High signal-to-noise.** Detection is already easy. Bandwidth is spent on range and coherent time on velocity. Range resolution is \(c/(2B)\). Velocity resolution is the wavelength over twice the coherent time. A linear chirp puts range and velocity on one ridge: a moving target walks in range, and a range error looks like a speed. A thumbtack separates them. Costas frequency hops, or a polyphase code (Frank, P1–P4, Zadoff–Chu) with a Doppler bank, are thumbtacks. The code length is the one nearest the chip count, bandwidth times pulse width. Barker is short and has low sidelobes, and it runs out of length before a long pulse does.
- **Clutter.** A long coherent burst, and a notch wider than the clutter's Doppler spread. The burst stays inside one clutter decorrelation time, or the notch stops matching. The repetition frequency is chosen so the target's speed is not a blind speed. Unambiguous range is \(c/(2\cdot\mathrm{PRF})\). Unambiguous velocity is \(\lambda\cdot\mathrm{PRF}/4\). When one repetition frequency cannot hold both, the pulse interval is staggered, or a second frequency is added.
- **A hypothetical jammer.** Noise wants energy on the target and a carrier hop so the noise does not sit on every dwell. A hypothetical repeater wants a code or a carrier it cannot predict from the last pulse, and a mismatched filter that keeps the code's sidelobes down. The posture is named as hypothetical. The skill forbids naming a piece of equipment to defeat.
- **The lowest cross-section, at speed, at the cue.** That dwell is designed first. The open-estimate cross-section is larger at long wavelengths and smaller at X-band and above, so the band is scored on the low sector at the cue: detection has to hold, and the beam (wavelength over aperture) still has to serve the track. Energy is peak power times pulse width times the number of pulses. Duty is pulse width times the repetition frequency, and it stays under the transmitter's ceiling. A far cue wants a lower repetition frequency. A fast target wants a higher one. When one cannot hold both, the library carries two, and says so. A longer pulse raises energy and the time–bandwidth product, and it raises duty.
- **Frequency modulation.** A linear chirp is Doppler-tolerant and couples range and velocity by a known walk. Nonlinear FM lowers the sidelobes and gives up some of that tolerance. Stepped frequency buys range resolution across steps, through a narrow instantaneous bandwidth. Costas hops are a thumbtack and do not tolerate speed unless the receiver has a Doppler bank.
- **Phase modulation.** Barker does not tolerate speed. Frank, P1–P4 and Zadoff–Chu are longer and keep a peak that walks. Complementary codes cancel sidelobes across a pair at zero Doppler, and the cancellation breaks when the target moves. A code with no Doppler bank is a missed peak.
- **Amplitude.** The transmitter wants a constant envelope. Amplitude enters as a taper on the pulse: none, Hann, Hamming, Taylor, Chebyshev, Kaiser, or Gaussian. A taper lowers sidelobes and broadens the main lobe, which spends range resolution. It is a weighting. It is not a third modulation family.

What is kept is at least three modes: search until the track confirms, track while it is firm, and one for the thing that makes the scene hard (a longer burst in clutter, a thumbtack when range and speed must both be reported, a hop under a hypothetical jammer). Each kept mode is scored by `compute_ambiguity` and `compute_link_budget` at the low sector and at the cue. Compression gain on the budget is \(10\log_{10}(BT)\). A filter, a code, or a model that claims more than that is wrong by construction. Chip count times chip width equals pulse width. Chip bandwidth stays inside the transmitter. The coherent interval stays inside the echo's decorrelation time. A figure that was not computed is not a result.

The source named on the skill is Robert M. O'Donnell, *Detection of Targets in Noise and Pulse Compression Techniques*, MIT Lincoln Laboratory open courseware, lecture 5 (2001–2002, posted 2018). It is cited as `ex:rc-mitll-radar-equation` plus that lecture: one megahertz of bandwidth is 150 m of range resolution; a long modulated pulse has the energy of its length and the resolution of its bandwidth; coherent gain is \(10\log_{10}(N)\) when the noise samples are independent; linear FM couples range and Doppler; a matched filter maximises peak signal over mean noise. The lecture does not pick a waveform for a scenario, and it says nothing about a target's cross-section. Whether the band can see the cue at all is lecture 3, answered before any family: attenuation, multipath as a coherent path sum, and the 4/3-earth horizon.

### The ambiguity profile, computed

`compute-ambiguity` is the other skill on the same archetype. The ambiguity function is what the waveform is to the receiver. The profile is computed from the scheme and the train:

- range resolution \(c/(2B)\); Doppler resolution \(1/\mathrm{CPI}\); velocity resolution \(\lambda/(2\cdot\mathrm{CPI})\)
- peak and integrated range sidelobes after the taper, or of the code
- Doppler tolerance at 3 dB, in \(f_d T\) and in metres per second at the band. A linear chirp's is large. A Barker's is about 0.4. A P4's is about 4, and the peak walks
- range–Doppler coupling, metres of range error per metre per second of speed, for FM. Zero for a code, which pays in tolerance instead
- unambiguous range \(c/(2\cdot\mathrm{PRF})\), unambiguous velocity \(\lambda\cdot\mathrm{PRF}/4\), first blind speed \(\lambda\cdot\mathrm{PRF}/2\)
- eclipsing loss at the cue, from pulse width and the pulse interval
- compression gain \(10\log_{10}(BT)\)
- the shape: thumbtack, ridge, bed of nails, or periodic

The skill then reads that profile against the scenario: how many velocity folds the target's Doppler span crosses, how many bins the clutter fills, which blind speeds the trajectory crosses, what fraction of the cue volume is eclipsed. Two modulations proposed for one role are compared at the same pulse width and the same bandwidth. A proposal's sidelobe that differs from the computed one is a physics check, and it blocks. An unweighted linear chirp does not have −45 dB sidelobes. The profile computes about −13 dB.

### The receive chain that matches the signal

`design-receive-chain`, worn by `radar-processing-designer`, is the receive half. The order is beamforming, then pulse compression, then Doppler, then space-time adaptive processing when the geometry has more than one channel, then excision, then the detector. Compression comes before Doppler because of the chirp's coupling.

The filter follows the mode. A chirp wants pulse compression and then a Doppler FFT. A phase code wants that code's matched filter, or a mismatched filter when the sidelobes matter more than a fraction of a decibel, and then a Doppler bank (eight or more when the code cannot tolerate speed). A Costas hop wants a bank across the hops, then the Doppler FFT. Clutter wants a canceller or a notch sized to the clutter's spread, before the detector. A window on the receive filter changes sidelobes and spends signal-to-noise. A window across pulses changes the Doppler response. A taper on the transmitted pulse changes the envelope and the energy. The skill requires the designer to say which one.

Range comes from the compressed pulse. Velocity comes from the coherent burst. Angle comes from monopulse when the antenna has a difference channel, and from the baseline when there is more than one site. No stage adds to the time–bandwidth product. A matched filter maximises peak signal over mean noise. Coherent integration keeps amplitude and phase and gains with the number of pulses. The same lecture 5 is the cited source, including CFAR: the threshold comes from the noise estimate in nearby cells, with guard cells, because a fixed threshold fails when the noise floor moves.

### The signal changes during the track

`design-selection-policy`, worn by `radar-controller-designer`, is where that library is used. One waveform for the whole track is a fixed radar. Each mode has its own repetition frequency, pulse width, bandwidth, pulse count and modulation, and a track state that selects it. The simulator picks a mode every dwell and writes the choice.

What may change, and what it does, is written in `design-waveform-library` and executed by this policy:

- **Repetition frequency.** Raise it when the target is fast or the range is short. Lower it when the cue is far. A second mode with a different frequency is how both unambiguous range and unambiguous speed are held. The acquisition cue is what makes a range fold survivable: the tracker assigns the measurement to the fold the track predicts, inside the cue volume. A speed fold is not survivable in the same way. A return whose Doppler lands in the clutter notch, or on the same bin as a stationary reflector, is not separated by adding pulses. The policy's ambiguity flag, read from the profile, is what sends the second frequency.
- **Pulses per dwell.** More pulses raise coherent time and energy, which is the detection lever on a weak return, until the burst is longer than the clutter's decorrelation time or the target's manoeuvre smears the bin. The fade rule is this: when the signal-to-noise estimate stays under the detector's requirement for two dwells, switch to the burst (the track mode with more pulses). Hysteresis and a minimum stay stop it flipping every dwell.
- **Bandwidth and family.** A firm track in high signal-to-noise spends bandwidth on range. When range and speed must be reported apart, the track mode switches from the chirp to a thumbtack. Precision near handoff widens the bandwidth and shortens the burst. Clutter lengthens the burst and picks a frequency off the blind speed.
- **Power.** Peak is the transmitter's ceiling. A mode spends more of it with a longer pulse or more pulses, inside the average-power cap. It does not get a new peak.

The rule table is data. A typical table, as the skill writes it: reacquiring sends search; signal-to-noise below the fade threshold for two dwells sends the burst; radial speed inside the clutter sends the clutter mode; a hypothetical jammer-to-signal ratio or a false-target density sends the eccm mode; time-to-handoff inside the window, on a firm track, sends precision; otherwise track. Every target mode is a mode of this library. Thresholds have arithmetic: the fade threshold is the detector's requirement plus the margin, and the burst's extra decibels say how far below that the burst still works. The policy is then dry-run, and the selection trace — how often each mode fired, which rule chose it, switches per ten dwells, dwells spent fading with no change — is what the thresholds are tuned from.

### The signal ontology those skills are held to

`radar-signals` 1.0.0 is the typed form of the same science. A `rtr:Waveform` names a family. A `rsg:TransmitSignal` names the carrier, the envelope, the spectrum, the energy, the sweep or the code generator, the slow-time phase, and the repetition-frequency schedule. The envelope is rectangular, trapezoidal, raised-cosine edges, or Gaussian. A taper is a weighting on that envelope. Fast edges widen the spectrum. A taper on transmit spends average power.

The sweep laws are functions, each with the sidelobes it has at rest and at a stated Doppler, taken from the attributed claim and then recomputed:

- Linear: \(f(t) = f_0 + (B/T)\,t\). The ontology records −13.2 dB with a matched filter, and a receive window buying about −40 dB for about 1.3 dB of signal-to-noise and about 1.4 times the main-lobe width. The coupling is \(\Delta t = f_d T / B\). The peak walks by a known amount.
- Polynomial nonlinear FM: a low-order odd polynomial concentrates the sweep at the centre and shapes the spectrum without a window's loss.
- Tan-hybrid: a linear share \(\alpha\) for Doppler tolerance and a curvature \(\gamma\) for sidelobes. The cited example (\(\alpha \approx 0.28\), \(\gamma \approx 1.18\)) is a literature report of about −42 dB at rest and under −36 dB across ±20 kHz. It is the claim's figure. The simulator still computes the waveform that is actually sent.
- Cosine-on-pedestal, stationary-phase (Taylor or Chebyshev: the window's sidelobes at rest, and the least Doppler tolerance, because the edge slope is unbounded), piecewise linear (a V or an alternating slope is two segments), and stepped frequency across pulses (synthesised bandwidth \(N\Delta f\), synthesised range resolution \(c/(2 N \Delta f)\), unambiguous synthesised range \(c/(2\Delta f)\)).

A code is the generator that produces it: P4, Frank, Zadoff–Chu with a root, an m-sequence, Gold, Kasami, Legendre, Golay, Costas–Welch, a seeded polyphase, or a minimum-peak-sidelobe search. A set built from one generator is orthogonal, complementary, or agile. Continuous-phase shaping (PCFM) turns a code's phase steps into a constant envelope so a saturated amplifier does not splatter them. The cited hardware-in-the-loop figure is the source's, not a number this study measured. A slow-time phase code across the burst is in the ontology as a way to park a range-folded return in a known Doppler zone. The simulator does not model it, so a design that names it has no scored gain from it.

The schedule is ordered repetition-frequency entries: single, dual, a set, major–minor, jitter, or a stagger. Each entry's unambiguous range and speed are derived. The blind-zone map — eclipsed ranges, blind speeds, and the fraction of the cue that is blind on every entry at once — is derived. It is not typed in. Sidelobes are split into the near peak, which masks a second scatterer beside the target, and the far peak, which leaks a strong cell across the swath. The Doppler-tolerance curve is read at the target's Doppler, not at the brochure's 3 dB point. Coupling correction is one of four: none, the average of an up-sweep and a down-sweep, the tracker's own velocity estimate subtracted off, or keystone when the target walks more than a cell during the burst.

The design rules over these fields are three kinds. A derivation must match the simulator. A constraint blocks (duty, chips, compression gain, coherent interval, far sidelobes against the clutter). A heuristic only proposes an alternative to score: a stationary-phase law when the Doppler span is small, a tan-hybrid when it is not, two repetition frequencies whose blind speeds interleave, a Doppler bank when the clutter is spread. A heuristic never scores by itself.

### A separate laboratory reading

The same characteristics were read on a bench that is not an aircraft scenario: a 200 kHz carrier, 80 kHz sweep, 250 µs pulse, 800 Hz repetition frequency, eight pulses, in water at 1500 m/s. That is a laboratory ultrasonic pulse, recorded so the formulas can be checked on a grid a person can recompute.

An unweighted linear chirp there has zero-Doppler peak sidelobes of −15.3 dB and a main lobe of 11.7 µs. At 15 m/s the up-sweep peak walks −11.7 µs and the down-sweep walks +11.7 µs. The midpoint of the two peaks is at 0. The unambiguous speed at 800 Hz is 1.5 m/s, so 15 m/s aliases to 0 m/s and 7 m/s aliases to 1.0 m/s. Reversing the sweep removes the range bias. It does not unfold the speed.

Against a stationary reflector at 0 dB, with that reflector at 40 dB signal-to-noise on one pulse, a return 30 dB or 45 dB weaker was not found in 40 trials: it sits under the −15 dB sidelobes, and at 15 m/s it shares the reflector's Doppler bin. A return 15 dB down, at the sidelobe floor, was found on a minority of trials. When it was found at 1 m/s, the range scatter was a few millimetres and the speed error was about 0.1 m/s. This is why the skills spend pulses and a second repetition frequency on a dim mover, and why a sidelobe number alone is not a detection.

Several later waveform notes — a hyperbolic envelope with a phase ripple, a staggered V-chirp with a Legendre phase, an amplitude ripple treated as a second ambiguity channel, and a seven-role discovery loop — are in the claim record as extracted proposals. The author later identified the first two as composites of published blocks. Their courtyard figures are stopping criteria. The bench above did not reproduce them. The alternating linear chirp, with the midpoint, is what that bench measured.

## Part two: the agent harness — one scenario, a declared plan, tools that are the physics

The loop runs on one scenario at a time — 332 of them, content-committed, split into a development set of 107, a held-out set of 31 written once and locked, and a regression set of 194 planted errors — as a declared plan of steps. Every step is a provenance activity: inputs, outputs, model, cost, cache hits. A run is a graph you can query.

The tools the plan may call are one list: the scenario, the design space, the claims under an evidence policy, the bounds, the ambiguity, the link budget, the named codes, a dry run of the selection policy, the simulator, the design checks, and the proposal. The floor and the ceiling are tools too, with no model in them. Dependent sources are marked, and two of them never count as two witnesses.

Six arms are pre-registered. Two have no model. The *floor* is the textbook single-node S-band linear-FM pulse-Doppler monopulse tracker. The *ceiling* is a search over the declared design space on the same simulator. Three model arms add the design space, then the attributed claims (accepted and reviewed only), then a critic from a second model family reading the final proposal blind. The sixth arm is the signal-receive focus on the claims arm: the flight, the sites and the tracker stay as the template left them, and the model designs only the transmit library and the receive chain. A number from an arm that did not finish is not a number.

On a full model arm the steps are:

1. **Scenario.** The frozen cue, contract, target, environment, platform. The system refuses to re-ingest a source whose upstream edition moved.
2. **Design space and claims.** The spine for this difficulty and this phase. Claims under the evidence policy.
3. **Analyse.** Which difficulty binds, which trade-offs that forces a side on, candidate options in each layer. No numbers claimed yet. A short record, on the cheap model.
4. **Antenna, then signal, then chain.** Three records, not one essay. The antenna sets the power ceiling and the beam schedule. The signal step designs the library — each mode its own repetition frequency, pulse width, bandwidth, pulse count and modulation — and a selection rule. The chain is the receive half of that library.
5. **Draft.** Both layers bound. Every predicted number cites a bound or a claim. Alternatives are kept. The proposal is a structured record. The first live runs taught that a model which writes the whole design as text during a tool round runs out of tokens, so the record is asked for after the tools.
6. **Simulate and check.** Code, not a model. The simulator runs the configuration, seeded. Then the checks: radar equation, Cramér–Rao bound, angular resolution; waveform inside the transmitter and chain inside the receiver; a claim with no source; a tier the run did not meet; a dropped trade-off; a field the schema does not have. A claim that beats the physics is blocking.
7. **Revise, only when a check blocks or is major.** The model receives its own proposal, the run, and the failing checks. The simulator and the checks run again. The kept pass is the best one, not the last one. A second reviser is opt-in.
8. **Propose.** One proposal into the design store: the configuration, the claims, the run, the checks, which models drafted and revised it, the cost, and the run id. Status `checked`.

The signal-receive focus replaces the analysis and the antenna with four short questions, because one call that asked for the whole library died twice on the token cap:

1. **Visible.** Can the measurements see this target: horizon, attenuation by band, multipath as a path sum, and what range, speed and angle can be told apart. No waveform yet.
2. **Sampling.** The repetition frequency that holds the cue range, and a second for speed when one cannot hold both.
3. **Compare.** Exactly two waveforms, one chirp and one phase code, at the same pulse width, bandwidth and pulse count, so neither wins by spending more. The record says whether the chirp couples range and speed, whether the code needs a Doppler bank, and where any amplitude weight sits.
4. **Library.** Written from those three records. No third family. Then the chain, then the draft.

The first live model run (Haiku 5.5 drafts and revises, four seeds, one development scenario): sixteen steps, ninety-seven seconds, about two cents, verdict accept — zero blocking, one major, handoff accepted on four seeds of four. That is a smoke reading. It is how the token cap, the structured record, the opt-in second reviser, and the schema hold became code. The model had once returned JSON as text with a stray brace, and once invented a metric id the codelist does not have.

## Part three: the test harness — measure the measurer first

The grades are never pooled. Each one says what it is.

Deterministic, from the run: scope, tier met, precision as the ratio to the Cramér–Rao bound, continuity, prediction error, physics consistency, unsupported claim, decision traceability, and — on a regression case only — whether the planted error was caught. From the provenance: claims cited before the proposal, the simulator run before a performance claim, the critic from another model family, the revision answering the checks that failed. From a judge, one call each, the judge named on the verdict: rationale quality, and whether the trade-offs were actually faced. An agent failure scores zero and stays in the denominator. A grader failure or an environment failure is recorded and kept out of that denominator. A lift is paired by case, with a bootstrap interval. An interval through zero is said to be through zero.

**The checker was measured before the model was.** `radar-regression-v1-1`, 194 cases, four seeds, textbook arm only. Eleven kinds of planted error in a sound design: a claim below the Cramér–Rao bound (18/18), a violated radar equation (18/18), a fabricated vendor claim (22/22), a waveform that exceeds the transmitter (17/17), a library mode the hardware cannot carry (18/18), swapped band properties (18/18), a wrong tier (18/18), a skipped contract field (18/18), a dropped trade-off (17/17), an ignored cue volume (17/17), an inflated detection probability (12/13). Catch rate 0.995. The thirteenth inflated-detection plant was a claim the textbook floor already met, so there was nothing honest to catch, and the builder now skips that pair.

**The simulator has its own floor.** The tracking stage was cross-checked against Stone Soup 1.9.1 on twenty-four cases with the same transition and measurement model. They agree to machine precision (worst relative difference ~10⁻¹⁴, tolerance 0.01). Stone Soup is not in the loop. It is named in the manifest.

**The development set has been walked. It is not the held-out number.** `rl-dev-1` is the full development set, simulator `radar-sim 0.1.0`, four seeds, judge tier `default` (so the two judge grades are not quoted here). Ten of the 107 cases are declines and carry no scenario; the means below are over the cases each grader could score.

| Arm | Tier met | Precision ratio | Continuity | Physics consistency | What finished |
| --- | ---: | ---: | ---: | ---: | --- |
| Textbook floor | 0.72 | 0.60 | 0.64 | 0.97 | 97 scored |
| Oracle search | 0.76 | 0.64 | 0.84 | 0.73 | 97 scored |
| Model, design space only | 0.70 | 0.59 | 0.78 | 0.53 | 94 scored; 12 agent failures |
| Model, with claims | 0.73 | 0.67 | 0.77 | 0.53 | 79 scored; 14 environment failures excluded |
| Model, claims, and a critic | — | — | — | — | 97 of 107 failed in the environment; no grade |

On the 24-flight subset below, the oracle's paired lift over the textbook clears zero on tier met and on continuity, and is negative, also clear of zero, on physics consistency. Searching the grid finds points the checks then mark. That is the ceiling of this grid.

A signal-only subset of the same development set, `rl-signal-2026-10-20`, is 24 low flights (weaving, aspect sweep, terrain-masked, at or below 300 m). Textbook: tier met 0.71, precision ratio 0.68, continuity 0.71, physics consistency 1.00. Oracle: 0.78, 0.70, 0.88, 0.84. The signal-focus model arm spent about $0.93 and all 24 runs failed in the environment before a design was scored. Those 24 are not in anyone's denominator.

A separate catalog, `rs-signal-2026-10-20`, holds the flight fixed and changes only the waveform the existing tracker is given: 27 named designs, four seeds, no model, from a fixed chirp through Costas, complementary codes and noise to the cognitive library and a rule table. Its own note says it is a development reading and not a number to quote. Handoff on that one flight was not met. Sweep-law variants inside one family score alike, because the tracker reads the family.

**What we do not quote.** The held-out model arms have not been walked. The critic arm on the development set did not finish. The signal-focus model arm did not finish. The smoke reading and the waveform catalog are not headlines. A held-out number will be quoted once, with the judge named, with the floor and the ceiling beside it, and with paired intervals, or it will not be quoted.

## Part four: the workbench — where people decide, and decisions become data

No design is approved by a machine. Two surfaces are live.

The review workbench at [radar-workbench.faithnet.io](https://radar-workbench.faithnet.io) lists proposals, the design each one stored (sites, signal, receiver, track, and how it spends its time), the critic's reading when the run recorded one, a receipt, a change request, and the release. A change request renders the ontology row it would add. It does not write the file. Runs and tests use the same pre-registered sets. A limit is labeled a subset. Held-out stays locked and asks for an explicit confirmation at the strong judge. A model run past twenty cases asks for the spend. The regression set stays on the textbook arm.

The skills app's test flow is the same packaging as the translation programme. Intents and gold, the scorecard, the comparison, where a set struggles, and the issue queue for radar tracking are at [skills.faithnet.io](https://skills.faithnet.io/d/radar-tracking/evaluate/tests/workbench). The scorecard reads the result files. The item screen reads a run's words live from the runtime, because the slim result carries numbers only. Radar signals has its own scorecard for the fixed-flight catalog. The Signal page reads one scenario's waveform against the manoeuvre: family and Doppler tolerance, the mismatch of a code that cannot take Doppler, and the Doppler walk a coherent burst pays when the target accelerates. The knobs are family, bandwidth, pulse, repetition frequency, pulses in the burst, and the filter. A reading is four seeds. It does not call a model.

**The ceremony is designed. The three seats are not yet split.** Publishable is three receipts — one accepts, a second validates, a third approves — never the same person twice and never the proposer. Today a signed-in person holds all three steward roles. Splitting them is a ceremony that has not been run. Ask and Do is the same button as in the translation programme: is the proposal wrong, or is the simulator? A recommendation comes with accept, edit, reject, or a change request against a physics model or an RCS prior, with this scenario as the evidence.

Accepted is not applied. Applying it means editing the ontology source, passing preflight, and shipping a versioned release whose changelog names the findings it closes and whose projections — the skills, the checker's profile, the named codes, the plan — are regenerated from it. The release is measured on the same pre-registered set as the one before.

## What is next, honestly

The two ontologies, the twelve-role team, the simulator, the declared plan, the planted-error harness, the development-set walk, the signal-receive focus, and both workbench surfaces exist.

Four things do not. The **held-out model numbers**. A **finished critic arm** and a **finished signal-focus model arm** — both failed in the environment on the walks above, and the failures are the record. The **split review seats**. And the **analysis step made first-class** the way the translation programme does it: a structured reading of each scenario, validated against the ontology, before any configuration is written.

The boundary does not move. No measured signature, no classified parameter, no engagement advice, no vendor figure as a design input. A public system enters only as an attributed claim with its evidence and date. A waveform is a general technique. It is not a way to defeat a low-observable aircraft by itself.

## Why this is not about radar

Strip the radar away and look at the shape.

A task where the obvious metric rewards the wrong behaviour. A domain where consistency must hold across coupled difficulties no one context window can keep. A requirement that every output be explainable as a cited bound or a cited source, not as a preference. A checker that had to be measured against planted errors before it was trusted. A model that is never the judge of its own work. People who decide, and whose decisions become data the next run reads.

That is the Bible-translation programme, with verses swapped for scenarios and a published edition swapped for a brochure. It is also clinical decision support, regulatory filings, contract review, financial reconciliation, incident response under a doctrine. Any place a fluent model would rather remember an answer than derive one.

That is what Agentic Primitives is. The radar is the example where the thing being measured is a number the physics can contradict — which makes both the power of the approach and its limits today unusually easy to see.

The sibling account — the Bible drafted from Hebrew and Greek without copying the English the model remembers — is [Translating the Bible with an ontology](/writing/translating-the-bible-with-an-ontology).

`#AgenticPrimitives #Ontology #Radar #AIEvaluation #KnowledgeGraph #TrustworthyAI`
