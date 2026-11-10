# A machine proposed a theory of the silicon interface. The hard part was building what could prove it wrong.

*Can you predict what a semiconductor interface will be from how it was made? One command now takes a process history and returns thickness, composition, trap density and fixed charge for five kinds of interface, and says how far each number can be trusted. This is the scorecard, the hypotheses in play, and our odds, cell by cell. And a language, an ontology and two harnesses that let anyone check each answer against the published record.*

## The answer, first

*Updated 10 November 2026 with the scorecard and the plan. Earlier versions of this section reported seventeen models and a five-row table; those numbers are superseded by the ones here, and the section "The plan" below says what changed and why.*

**The question.** A chip's performance is set at interfaces a few atoms thick. Engineers can predict how thick an oxide will grow. They cannot reliably predict, from the recipe, how many electrical defects the finished interface will hold, and today that is managed by trial and error. An open challenge asks for one framework that predicts thickness, composition and electrical quality from processing history, across five kinds of interface.

**What we found.** Every measurement we hold was turned into a process history and run through the one predictor we would hand in, with nothing refitted.

| What you want to predict | From the recipe alone? | How well, through the delivered predictor |
|---|---|---|
| Oxide thickness on flat silicon, silicon carbide and germanium | **Yes** | Within 10% on 76%, 88% and 73% of measurements; pairs put in the right order 99% of the time or better |
| Oxide thickness on a silicon nanowire | **Direction yes, amount not yet** | 97% of pairs ordered right, 47% within tolerance. The stress model that passed its first test failed on a second dataset |
| Fixed charge on flat silicon | **Yes, within a stated range** | A reversible equilibrium of the last hot step: fitted at one laboratory, 12 of 16 within 10% at another. Over every source we hold, 52%. Charge read without a hydrogen anneal includes trap charge and is scored apart, with no program |
| Interface trap density on flat silicon | **Partly** | Two trap populations: 41% within 10% in scope, 79% of pairs ordered right. Laboratories still differ three- to sevenfold on one recipe |
| Trap density against energy on silicon carbide | **Partly** | A one-way anneal: 59% within 10%, 80% of pairs ordered right, one laboratory |
| Germanium at a SiGe interface | **For thin oxides** | Fitted on one laboratory, within 2 points at two others; misses the one thick oxide |
| Composition profile through a hafnium gate stack | **Partly** | With oxygen exchange at the surface separated from uptake and interlayer growth, one temperature law passes 9 of 9 profile points it was not fitted to. The held-out temperature's amounts are missed (0 of 3), and the nine points are not independent |
| Electrical properties on nanowires, hafnium stacks, SiGe and germanium | **No** | We hold no measurements and have no program |

**What we propose.**

1. **For thickness: growth laws chosen by search, not taken from a paper.** A small grammar of rate laws is fitted on training rows and the winner is chosen there. Silicon and silicon carbide keep the same form. Germanium and nanowires are not settled.
2. **For fixed charge: two equilibria and a clock,** plus a separate model of what a capacitance measurement actually counts. The charge moves toward one temperature-dependent value in oxygen and a lower one in inert gas, reversibly. Whatever came before the last hot step is forgotten.
3. **For trap density: two populations and a missing input.** One population relaxes with time at temperature; one is set by oxidation temperature and orientation and is removed by hydrogen. What an unannealed measurement sees also depends on hydrogen reaching the interface while the wafer cools, which published recipes do not record. Process records should carry the cooling ambient and the pre-oxidation clean as fields.
4. **For all of it: a way to check.** Each statement is a short program in a purpose-built language, bound by hash to the data that tests it, with its assumptions recorded in an ontology. A different group can rerun every one, or write a competing mechanism in forty lines and see whether it survives the same contracts.

**What we rejected.** Our own starting theory, that the interface is a glass whose defects are set by one relaxing structural state. It failed for fixed charge, was unsupported for trap density, and had been proposed in 1982 by a group whose own data then argued against it. The list of what we have withdrawn since is at the end of "The plan".

**What this is not.** It is not a winning entry. The challenge is won by the first entry that meets every criterion, and our own estimate that this one does is under 3%. The matrix below says where the rest of the probability would have to come from.

The rest of this account is how those answers were reached, and why we think the method matters more than any one of them.

## How it started

A fluent language model can write a theory of the silicon–oxide interface in a minute. Ask it why two wafers with the same oxide thickness carry different numbers of electrical defects and it will tell you, convincingly, that the interface is a glass frozen out of equilibrium, that a structural state relaxes during the anneal, and that hydrogen then decides how much of the damage shows. It will give you equations. It will cite the right people.

We know, because that is how this project began. The theory was ours, written with a model's help, and it was good enough to put on the cover of a proposal.

What follows uses the same four parts as [the radar design](/writing/designing-a-radar-with-an-ontology) and [the Bible-translation programme](/writing/translating-the-bible-with-an-ontology): an ontology that describes the domain once, a loop held to deterministic checks, a harness that scores before anyone sees the answer, and a place where people decide. Here the thing held to account is not a design or a translation. It is a scientific claim. The machinery is the product. The theory was the test load.

## Why this is a tough job

**The published answer is not a number, it is a literature.** The oxidation of silicon has been measured since the 1960s. A model that has read all of it can reproduce any trend you name. What it cannot do unaided is tell you which of two papers that disagree by a factor of six is right, or notice that a paper's Table IV and Table VII differ by ten because one unit header is misprinted.

**The measurements cannot be redone.** We have no furnace. Every number in this study was transcribed from a printed table or read by eye from a figure, by an AI agent. That is a weakness we state on every file. It also means the only honest test of a model is a measurement it was not fitted to, from a document it did not write.

**A wrong model can fit.** With five parameters and twenty points, almost anything fits. One of our models passed four of four held-out contracts and was withdrawn two days later, because the held-out rows shared a confound with the training rows. Fitting is not evidence. Surviving someone else's data is.

**The agent is also the suspect.** Early in the project a different AI agent, asked to build a benchmark, produced three datasets labelled "authentic" that corresponded to no page of any paper, and a model that passed its test because a constant in it had been set equal to the answer. Nothing in a normal software workflow catches that. Tests passed.

## The approach, in one picture

```
 published sources ──► transcriptions, named UNVERIFIED, beside the page images
        │                         │
        │                         ▼
        │              datasets built by script, bound by hash
        │                         │
        ▼                         ▼
   ONTOLOGY  ◄──────────►  ISL PROGRAM  ──►  compile-time checks  ──►  solver
 (what a model,            states, units,      units · conservation        │
  an assumption,           operators with      observation isolation        ▼
  a contract, a            declared kinds,     bounds · operator kind   FROZEN CONTRACT
  result ARE)              parameter status                              target ± tolerance
        ▲                                                                   │
        │                                                                   ▼
        └────────────── review status, scope, assumptions ◄──────────── RECEIPT
                         (supported · inconclusive ·                  pass / fail, hashed
                          refuted · withdrawn)
```

An ontology that says what the things are. A language in which a hypothesis has to be written before it can produce a number. An agent harness that fixes what the agent may and may not touch. An evaluation harness that fixes the score before the run. And a workbench where a person decides what is merged and what a result is taken to mean.

## Part one: the ontology

The Interface Science ontology has 86 classes and about a hundred properties, grounded on PROV-O, SOSA, QUDT and a base ontology for accountable agent work. Its job is to keep apart things that a fluent account runs together:

- A **measurement** is not a **prediction**. They are disjoint classes. A model output "may be compared with measurements but does not become one."
- A **model state** is not a physical entity. Declaring a variable called `N_Pb` does not assert that dangling bonds exist in the specimen.
- A **theory** is "an optional set of mechanism commitments. It is not a global truth graph."
- An **assumption** is a record of its own, with a kind, attached to the model that makes it.
- A **review status** is one of six words — proposed, under review, supported within scope, refuted within scope, inconclusive, withdrawn — and never a boolean.

For most of this project the ontology and the working code lived apart, and we say so: an audit found that the RDF file in the working repository had five classes and was read by nothing. What changed is that the ontology's own shapes are now enforced on the real work. When we first projected our sixteen models into it, the load failed 215 checks. Every model must state a scope and at least one assumption. Every observation model must state an expression and an assumption. Every contract must carry a digest, a metric and its observables.

So each parameter a program marks `hypothesis` became an assumption record. Every model now carries the sentence "the recipe as published determines the predicted quantity; conditions a paper does not state are not represented." Every observation carries "values were transcribed or read from figures by an AI agent and are unverified." These were true before. Now they are data, attached to the thing they qualify, and a query returns them.

Today the graph holds 17 models, 13 datasets, 42 sources and 30 results from this study, generated from the repository by one script. A test fails if the generated files drift from the code, and a second script compares the store with a fresh build.

## Part two: the language

The Interface Science Language is small on purpose. A program declares:

```
STATE Q_f { UNIT: cm^-2; INITIAL: Q_hot + slope * (T_hot - T_ox); MIN: 0; MAX: 1.0e14 }
CONTROL T { UNIT: K }
PARAMETER k_i0 { VALUE: 1.0e1; UNIT: s^-1; STATUS: fitted }
PARAMETER Q_hot { VALUE: 1.7e11; UNIT: cm^-2; STATUS: sourced; SOURCE: Deal et al. 1967 Table II }

OPERATOR F_InertRelaxation : ChargeRelaxation {
    EQUATION: d(Q_f)/dt = -rate_inert * (1 - oxidizing) * (Q_f - Q_inert)
}
OBSERVATION_MODEL Obs { TARGET: Qss; UNIT: cm^-2; EQUATION: Qss = Q_f }

EVALUATION_CONTRACT C {
    FROZEN: true
    DATASET: data/derived/deal_razouk_1980_nf.csv
    DATASET_DIGEST: sha256:...
    TARGET: Qss = 2.96e11 +/- 5.0e10 abs
}
```

Before it produces a number, the compiler checks that:

1. **Every equation is dimensionally consistent.** Not a lint; a refusal.
2. **Every operator conserves what it says it conserves**, operator by operator, including flux through boundaries on a grid.
3. **Observations read states and constants only.** An observation that reads the furnace temperature directly is rejected. This is the rule that stops a model from predicting defect density from the final temperature while claiming to predict it from history.
4. **States stay inside their declared bounds** during integration.
5. **Every operator's declared kind is in the vocabulary and obeys its rule.** An operator that calls itself site exchange must declare a conservation law. One that calls itself transport must be written as a flux. Turning this on found a mislabelled operator in a program that had been running for a week.

Equations are parsed into a restricted expression tree and never executed as code. There is no physics in the host program: the recipe (ramps, gas changes, stated mixtures such as `mix:O2=0.2,N2=0.8`) is a control trajectory, and the right-hand sides come only from the program text.

**Parameter status is part of the science.** Each parameter is a constant, sourced (a citation is required), computed, fitted, or a hypothesis. Only fitted parameters can be changed by a calibration step. The receipt lists how many of each a result rests on. When a reader asks "what did you assume?", the answer is a count and a list, not a paragraph.

## Part three: the agent harness

The agent in this study reads papers, transcribes tables, writes models, runs fits and writes the report. That is a great deal of trust to place in something fluent. The harness is the set of things it cannot do.

- **It cannot write evidence.** One folder is reserved for datasets a person adds. The agent's transcriptions live beside the source PDF, in files named `UNVERIFIED`, next to rendered images of the pages they came from. Datasets the models run on are built from those by script, into a separate folder, every time.
- **It cannot change a dataset under a model.** A frozen contract names its dataset by SHA-256. Change one digit and the run is refused.
- **It cannot tune what it did not declare.** Overriding a parameter whose status is not `fitted` is an error.
- **It cannot merge.** Every piece of work goes on a branch. A person says "merge".
- **It must record how far it read.** Every source folder has a note: which pages were read, which figures digitized, which were only seen at low resolution. A library index ties each of the 42 sources to a system, to the targets it bears on, and to the scripts that use it. A test fails if a folder is missing from the index.
- **It must say what was not done.** The index distinguishes used, read, skimmed and held. Eleven documents are marked held.

Two things happened that show what this buys.

The first is the fabrication described above. Once the rules were in place, a test rejects any dataset that claims experimental provenance without a source image, and another rejects data with implausibly small scatter around a smooth curve. The fabricated sets were removed and the passing "result" that depended on them was withdrawn.

The second is quieter. The agent, working alone, read a thesis, built a model of fixed charge that "remembers its growth through an anneal", froze its contracts, passed four of four on a recipe the model had not seen, and reported it as the first model in the project whose state no anneal erases. Before building on it, the agent scored the model on a second series in the same thesis that it had earlier set aside as out of scope. One of ten. The claim was withdrawn in the next report, the earlier write-ups were marked as corrected rather than rewritten, and the model sits in the graph today with the status *withdrawn* and the note "passed 4 of 4 on one recipe, then 1 of 10 on the same thesis's anneal series."

Nothing forced that second check except the habit the harness creates: every series in a source is a test row.

## Part four: the evaluation harness

A model is scored by contracts frozen before the run, on rows it was not fitted to.

**Contract tolerances are explicit.** Where a source reports applicable repeatability, it informs the tolerance. Elsewhere the tolerance is a declared evaluation choice. In particular, the SiC spectral screen uses stored 10% acceptance bands, not measured confidence intervals. A contract records the threshold used to judge a prediction; it does not turn that threshold into experimental uncertainty.

**Splits are declared in the dataset.** Train, held-out series, another laboratory, another oxide thickness. The fit sees the training rows only.

**The comparison is always against something simpler.** A model with memory is scored beside one without. A mechanistic model is scored beside a four-parameter empirical law. Twice the simpler thing won, and the report says so.

**Reported outcomes are tests.** The suite has 234 tests. Many of them assert the *result*: that a model passes 9 of 12, that a parameter did or did not end on its bound, that a fit is five times too fast at 800 °C. If a later change moves a reported number, a test fails. The paper cannot drift from the code.

**Two grades, never pooled.** Quantitative: contracts passed. Qualitative: for every pair of measurements that differ in one factor by more than the repeatability, does the model say which is larger? On 639 such pairs the models are right on 569: all 172 for oxide thickness, all 24 for composition, 228 of 253 for fixed charge, 145 of 190 for trap density. The two places they are wrong (trap density in nitrogen) are places where they have no mechanism at all. The table says directions are mostly right. It does not say magnitudes are.

## The workbench: where people decide

The agent proposes and reports. People decide three things.

**What is merged.** Every result in this account sat on a branch until a person said to merge it. The proposal document was frozen for eleven analyses at the owner's instruction, while the evidence moved under it, and rewritten only when he said so.

**What a model's standing is.** The graph is browsable in the same ontology workbench that holds the radar and the translation work. Each model appears with its operators, its assumptions, its contract and its review status. The statuses were set by the agent from the receipts; they are there to be overruled.

**Whether the question is right.** The most useful review of this work was three sentences from a physicist: this looks good, but it has drifted from the problem statement, which asks first for layer thicknesses and composition profiles across five systems. Four fifths of the effort had gone into electrical properties on one system. No check in the harness could have said that. The next three results in the table below — nanowires, an isotope profile, germanium pile-up — exist because a person did.

## What the harness found

*This section is the record of the first round: seventeen models, seven principal sources. Four statements in it have since changed and are corrected in "The plan" below: a two-population model of trap density, refuted here in its first form, is now the best one we have; the nanowire model failed on a second dataset; the 15% figure for the time law is "not established"; and a new hafnium surface-exchange screen matches the reconstructed interior shape after each temperature's mean is fitted. That screen does not yet predict an unseen temperature.*

Seventeen models were written and tested against seven principal sources from five laboratories, 1965 to 2023.

| Status | Models | Examples |
|---|---|---|
| Supported within scope | 3 | Oxide growth on Si and SiC with published constants and nothing fitted; fixed charge after inert anneals, fitted at Stanford, 12 of 16 at Fairchild |
| Inconclusive | 7 | Trap density as relaxation plus hydrogen; nanowire oxidation; oxygen exchange under a hafnium silicate |
| Refuted within scope | 4 | Fictive temperature as the state for trap density; two-population traps; trap generation tied to growth rate |
| Withdrawn | 1 | Fixed charge with a memory of growth |

**The central hypothesis did not survive.** A fictive temperature is not a sufficient state for trap density (worst of the models, a parameter at its bound) nor for fixed charge (slow cooling in oxygen gives *more* charge, not less).

What did survive is narrower and, we think, real.

- **Fixed charge is a reversible equilibrium of the last hot step.** It moves toward one value in oxygen and a lower one in inert gas, both set by temperature, and it cycles. A model fitted to argon anneals at one laboratory passes 12 of 16 contracts on another laboratory's wafers, seven years and a different cleaning chemistry apart. No memory of earlier processing is needed, between 900 and 1100 °C on thick oxides.
- **Unannealed trap density falls with time at temperature, and we no longer know what that means.** One thesis varied oxygen pressure so that the same thickness was reached in very different times. Time orders the data within its scatter; thickness, growth rate and oxidant supply do not. Whether that law carries to another laboratory is not established. On five points from a second laboratory a simple power law in time lands within about 15%, and does better than the same predictions matched to the wrong recipes (3 of 5 inside 10%, against 0.8 by chance, p = 0.03). But four of those five points are at one temperature, and on those four alone the time dependence is not distinguishable from chance (p = 0.17). The contract-bound model of the same law passes 1 of 5, no better than knowing the typical level (p = 0.59). But a 2001 paper we read late gives the published reason to be careful: whether dangling bonds are seen after a thermal step "is determined by the cooling rate and the presence/absence of hydrogen/moisture in the ambient." The fall with time may be fewer defects, or the same defects better passivated on the way out of the furnace. Electrical data cannot tell the two apart.
- **A recipe does not determine trap density.** A third laboratory reads three to seven times higher on the same nominal recipe, and not by a constant factor. Inside one laboratory, cleanroom and non-cleanroom wafers differ by 0.8 to 8.5. The same paper names the variable: hydrogen from moisture reaching the interface during cooling. A direct count by spin resonance shows the other half, that an hour without oxygen near 970 °C more than doubles the number of dangling bonds. Both happen, and a published recipe records neither.
- **Oxide on a nanowire thins with the wire for the reason Kao gave.** A cylinder in a viscous shell, with one parameter fitted to five large wires, predicts oxide thickness on seven smaller ones to within 3 nm. Without the stress term the smallest wire is consumed entirely.
- **A model can match an amount and miss the profile.** Our oxygen-exchange model reproduces how much isotope enters a hafnium silicate film and puts it in the wrong place: a surface layer, where the paper finds it through the whole film. This is the first-round result. Once oxygen uptake was separated from exchange and interlayer growth, a finite surface rate passes the profile (see H1).

## The plan: every cell of the challenge, the ideas in play, and our odds

*Added 10 November 2026. The sections above tell how the method was built and what it found first. This one is the working plan: what the challenge requires, where each part of it stands when scored honestly, which hypotheses we are pursuing for each part, and how likely we think each is to work. The percentages are judgements. We publish them so that a reader can disagree with a number.*

### How the challenge is decided

We re-read the challenge page and its rules, and three things in them shape everything below.

- **It is not a ranking.** The prize goes to the first entry that meets every success criterion. A partial result counts only if the challenge says so, and it does not. An entrant has three attempts.
- **What must be handed in is working code** that takes a process history and computes the interface: layer thicknesses (oxide, interlayer, consumed substrate), composition profiles, the density of interface states against energy, and fixed charge, for five interfaces, with "one framework, with declared parameters".
- **It is judged qualitatively first** (does a hydrogen anneal lower the trap density?), then quantitatively, on predictive accuracy, transferability and reproducibility. For very promising models the organisers say they will run their own experiments to check predictions.

So an account of why something cannot be predicted does not win. A framework that returns every quantity for every interface, gets the directions right, and says plainly how far each number can be trusted, might.

### What we now hand in

One command takes a specimen and a recipe written in the language and returns everything the study can say about the interface that results:

```
python -m isl_harness.predict examples/histories/planar_si_dry_then_forming_gas.isl
```

It puts the history into each program held for that interface, runs it with nothing fitted, and reports every observable with the program it came from, every parameter and its status, and a support statement taken from that program's stored evaluation. A history outside what a program was tested on (an orientation with no constants, a wet step in a dry-only program, a temperature outside the fitted range) is labelled as outside its scope instead of being answered with false confidence. What is not modelled is listed as not modelled.

### The scorecard, from that command and nothing else

An outside reviewer pointed out that our earlier headline, 91% of measurement pairs put in the right order, mixed several historical model runs and included training rows. It was true arithmetic and a poor summary. We replaced it. Every measurement in the graph is now turned into a history and run through the same command a user calls; no stored model report is read. The table is reported cell by cell, because a total lets hundreds of easy thickness comparisons hide an absent electrical model.

| Interface | Observable | Measurements held | In the program's tested scope | Within tolerance | Pairs ordered right |
|---|---|---|---|---|---|
| 1. Planar Si/SiO₂ | oxide thickness | 134 | 131 | 100 (76%) | 99% |
| 1. Planar Si/SiO₂ | fixed charge | 121 | 90 | 47 (52%) | 77% |
| 1. Planar Si/SiO₂ | apparent charge read without a hydrogen anneal | 28 | no program | | |
| 1. Planar Si/SiO₂ | interface state density at midgap | 97 | 61 | 25 (41%) | 79% |
| 2. Si nanowires | oxide thickness | 30 | 30 | 14 (47%) | 97% |
| 2. Si nanowires | remaining silicon | 18 | 18 | 9 (50%) | 100% |
| 3. SiC/SiO₂ | oxide thickness | 43 | 43 | 38 (88%) | 99.5% |
| 3. SiC/SiO₂ | interface state density against energy | 27 | 27 | 16 (59%) | 80% |
| 4. HfO₂/SiO₂/Si | oxygen isotope amounts | 15 | 15 | 7 (47%) | 100% |
| 4. HfO₂/SiO₂/Si | isotope depth profile | 9 | 9 | 9 (100%) | 100% |
| 5a. SiGe/oxide | germanium at the interface | 5 | 4 | 4 | 3 of 6 |
| 5a. SiGe/oxide | oxide thickness | 23 | 7 | 2 | 22% |
| 5a. SiGe/oxide | remaining silicon | 16 | no program | | |
| 5b. Ge/GeO₂ | oxide thickness | 11 | 11 | 8 (73%) | 100% |

Tolerance is each measurement's contract tolerance, 10% for most; the challenge sets none. Electrical rows do not exist for nanowires, the hafnium stack, SiGe or germanium because we hold no electrical measurements for them and have no program.

### The methods every hypothesis has to pass through

These are the same for every cell, and they are what we think is worth copying.

1. **Hypotheses are programs.** A mechanism is a short program in the language, of one of six kinds (growth, transport, exchange, passivation, relaxation, defect generation). The compiler checks units, conservation and bounds, and refuses a kind that is not in the vocabulary. The kinds name forms, not theories: what relaxes or grows is said by the state.
2. **Candidates come from a grammar where they can.** For growth, fixed charge and trap density the candidates are enumerated from a small grammar and none is taken from a paper. This is how we keep the language model's memory from choosing the answer: it writes the grammar, it does not pick the winner.
3. **The winner is chosen on training rows only.** We learned this the hard way. On germanium we first chose a growth law by its score at the held-out temperature and reported that it "recovered" the paper's activation energy. Chosen on training rows alone, a different law wins and fails the held-out temperature. We corrected the claim.
4. **A mechanism has to matter.** Each supported mechanism is switched off and the held-out measurements scored again. The fixed-charge model falls from 12 of 16 to 2 of 16; the nanowire model from 9 of 14 to 0 of 14.
5. **Shuffle tests.** Recipes and measurements are re-paired at random to see whether a model does better than one that only knows the typical level.
6. **Data are checked against the page.** Four papers hold their figures as vector drawings, so their values were taken from the drawing itself; this confirmed two of our transcriptions, found one wrong value, and showed that a second reader's axis was off by up to 9 nm. Scanned figures are read by locating the axes by pixel analysis; where a paper prints a number we can compare, it has agreed within 1%.
7. **Every term is traced to the sources.** The words of the vocabulary are searched for in the text of the papers. Of 34 working terms, 25 are the sources' own, and one is ours.
8. **Survivors design the next experiment.** When the data cannot separate candidates, each is run on recipes nobody has measured and the recipes are ranked by how far the predictions spread.

### The hypotheses in play

Six proposals came from reviewing the ontology, the existing ISL programs and the source library together; the other candidates came from the structure searches. The six are recorded as proposed claims, with their applicability, physical states, operator kinds, observation targets, assumptions, sources and rejection tests. They were synthesized by an assistant, not generated by an exhaustive grammar search. A source that motivates a hypothesis is not evidence that our version works.

The common idea is to track the material that produces a measurement. Carbon configurations can contribute to a trap spectrum; oxygen inventories produce isotope profiles; germanium redistribution produces an enriched layer. ISL carries the states forward through a process history. An observation model says what the measurement reads from those states. Sharing that structure between materials requires the right species, geometry and measurement conditions; sharing a target called "trap density" is not enough.

**H1. Oxygen enters a hafnium silicate slowly and mixes quickly.** The delivered program fixes the surface at pure oxygen-18 and uses slower transport inside the film. It passes 2 of 9 reconstructed interior depth points. The alternative gives surface exchange its own rate and conserves each isotope as oxygen-18 enters and oxygen-16 leaves. In a synthetic comparison at the same 20% total replacement, the inner-to-outer isotope ratio is 0.999 with finite surface exchange and 0.0037 with a perfectly exchanged surface. The amount alone cannot separate the mechanisms.

**Update, after the oxygen balance was corrected.** The surface exchanged one oxygen for another while growth of the interlayer removed oxygen from the film and nothing supplied it. With uptake added, exchange, uptake and interlayer growth are three separate terms and the finite-surface form contains the pure-surface form as a limit. Refitted on integrated amounts at four temperatures only, it passes 8 of 12 (the pure-surface form also 8, with larger error), 0 of 3 amounts at the held-out 1073 K (the pure-surface form 1 of 3), and 9 of 9 profile points where the pure-surface form passes 2 of 9. It is now the program the predictor runs, labelled inconclusive: the held-out miss is real (3.6 tolerances), the nine points are three fitted layers at three temperatures and are nearly flat, and the fast internal transport sits at its fitting bound, so the data say fast and not how fast.

The measured shape screen is more encouraging but narrower than a temperature prediction: one rate is chosen at each temperature to match the reconstructed interior mean, after which finite surface exchange passes 9 of 9 interior points. Those points sample fitted layers in the same MEIS reconstruction; they are not nine independent measurements. No common temperature law, held-out temperature, instrument convolution or interfacial-growth model has been tested in this screen. At 1223 K the isotope markers exceed the drawn film sum by 1.00 × 10^15 cm^-2. Using the sum gives an oxygen-18 atomic fraction of 0.580, compared with the reconstructed plateau of 0.545 and the thickness-weighted film value of 0.558. The paper says the detailed oxygen shape is unresolved because of straggling. [Goncharova and colleagues](https://physics.uwo.ca/~lgonchar/research/publications/pdfs/PRB_83_2011_115329.pdf) already describe exchange and its dependence on the stack. Our candidate is a constrained explanation of the amounts and profiles together.

*Next test:* fit a shared temperature law on integrated amounts, freeze it, and predict a withheld temperature and a film-thickness series through the instrument response. *Falsifier:* resolved gradients or thickness-dependent exchange times incompatible with the proposed surface-limited regime. *Status:* proposed; synthetic discrimination and a mean-matched shape screen completed.

**H2. Annealing changes the SiC trap spectrum.** After one 1500 °C argon anneal the remaining densities are about 27%, 16% and 10% of the starting values at 0.3, 0.4 and 0.5 eV below the conduction-band edge. Four of seven before-and-after comparisons cannot be represented by one fixed spectrum times one amplitude, allowing the stored 10% acceptance bands on both spectra. These bands are evaluation tolerances, not experimental confidence intervals. The result requires energy-dependent evolution within those tolerances; it does not identify a defect species. [Kobayashi, Suda and Kimoto](https://doi.org/10.1063/1.4980024) provide the spectra.

The executable candidate has two inventories and an escaped pool; the spectrum is a weighted observation of the inventories. Training on the 1150 °C oxidation selects the two-inventory decay form: 9 of 15 training values and 6 of 12 values from the withheld 1300 °C oxidation fall within 10%. It has ten fitted parameters, including six spectral weights, so the fit is not a unique identification of the kinetics. Its slower inventory changes by only 0.17% in 300 seconds at 1500 °C; these data see a persistent remainder, not a well-measured slow escape rate. The reversible competitor is not rejected by the second, cooler anneal: its fitted rate is too slow to restore equilibrium during that step. Whether either inventory represents carbon remains open. The published cooling comparison also changes furnace, so it does not isolate cooling rate.

We then asked what the data constrain, using our eight-number program (a stable and a removable part at each energy, and a level set by the anneal temperature), which passes 9 of 15 in training and 7 of 12 on the withheld oxidation. Every simpler form loses: no stable part, one spectrum times one amplitude, or a stable part flat in energy each pass 4 of 15 in training and 3 of 12 withheld; a level that ignores anneal temperature passes 3 of 15. What the data do not constrain is whether removal stops at a level or continues. The two forms agree on every anneal measured and part by 13 tolerances after 50 minutes at 1300 °C. That single anneal, on a sample oxidized at 1300 °C, separates them.

*Next test:* an anneal-duration series, with carbon profiling and electrical spectra on matched specimens, followed by a second source. *Falsifier for irreversible removal:* reproducible recovery of the removed spectral contribution without renewed supply. A continuous distribution of barriers or electrical deactivation without carbon loss remains a competitor. *Status:* proposed; a fixed-shape null is rejected in four comparisons, and a two-inventory candidate has been tested on a withheld oxidation history.

**H3. Finite germanium supply sets the enrichment regime.** A relation fitted to two planar values carries to a second laboratory's thin oxides, but misses the thick oxidation and extrapolates to germanium in pure silicon. The replacement hypothesis conserves Ge across the substrate, enriched layer, oxide and escaped material. It must predict the enriched layer's width and concentration together, as well as the remaining substrate. Zero starting Ge must give zero Ge everywhere.

Fast interface diffusion and coupled SiGe oxidation are already published, including the [2024 model by Zechner and Zographos](https://onlinelibrary.wiley.com/doi/10.1002/pssa.202400235). The contribution to test is whether finite supply, geometry and volatile loss explain where our thin-oxide relation fails. *Next test:* fit a planar time series and withhold starting alloy thickness or nanofin geometry. *Falsifier:* failure to predict both enrichment width and concentration, or the finite-film saturation point, with the same parameters and conserved inventory. *Status:* proposed; the endpoint audit is complete, the coupled finite-film model is not.

A first, unfitted step: [Long and colleagues](https://doi.org/10.1063/1.3677987) write the balance down. Under a pure SiO₂ oxide the silicon in the oxide came from the alloy and the germanium stayed, so an oxide thickness and a layer concentration fix the layer's width. Applied to what we hold: the thick oxidation our line misses is reported as a 50 nm layer with up to 75% germanium under 136 nm of oxide, and that cannot be 75% throughout. The germanium released fills 15 nm at 75%, or 50 nm at a mean of 31%. The layer is graded, 75% is its peak, and our line's 44% lies between mean and peak, so part of that miss is a plateau compared with a maximum. A second source's 10 nm layer at 50% holds only 71% of the germanium its 34 nm alloy started with, where the paper puts the loss under 10%: a miss we cannot explain from the text. On that 34 nm layer the balance also says where the regime ends: the interface can stay on the line until 45 nm of oxide, and by 60 nm no silicon is left. Long also reports no discernible effect of temperature on the profile at fixed oxide thickness between 800 and 1000 °C, which is the falsifier we first named for this relation, and it did not fire.

The balance is now a program in the predictor. It carries the germanium dose released by the growing oxide into a layer under it whose peak is the thin-oxide relation, so the interface value, the layer's width and its composition at depth come from one conserved inventory, and zero germanium in gives zero germanium everywhere. Given the oxide thickness and the peak that the source states, it puts the LeGoues layer at 48.6 nm against the 50 nm printed, with nothing fitted to that width. Predicting both, it gives 91 nm, because the peak it predicts is 44% where up to 75% is measured, and the thickness is a silicon law: its wet constants fitted on LeGoues' own four oxide thicknesses give 126 nm against 136 there, and 7 nm against 19 for Mueller's wet oxide at 850 °C. So conservation is not what limits the prediction. The peak and the thickness are. The width is labelled as an assumption on top of a supported thickness, and the SiGe scorecard cells are unchanged.

**H4. Stress relaxation links nanowire geometry to electrical defects.** The viscous-shell model passed its first oxide-thickness test and failed on another dataset from the same laboratory. Before adding a new mechanism, the core and oxide dimensions must satisfy the geometric material balance within their uncertainties. The further hypothesis is that a physical stress-relaxation state affects both subsequent growth and defect production.

A joint structure search followed. Six curvature factors were fitted to both laboratories' wires together, each with its own flat-sidewall oxide as input, and scored on 13 wires held out. With no curvature term 2 of 13 pass; with any of five forms, 8 to 12 do. The training wires cannot say which form: all pass the same 7 of 11 and their errors are within 6%. The fitted length for a term of the form 1/(1 + l/a) is about 7 nm. So the established statement is narrow: some curvature term is needed, and it is not specifically viscous stress. Switching the delivered predictor to the best joint form lowered remaining silicon from 9 to 5 of 18 within tolerance, so the predictor keeps the stress form. The search scores oxide thickness only, and the second laboratory has no core measurements. We adjusted our selection rule after the first run (the no-curvature null tied on training and had no parameters, so it was selected); it is now a baseline that cannot be chosen, and the report says so.

*Next test:* compare oxidation–inert hold–oxidation with inert hold–oxidation–oxidation in one furnace, matching temperature history and total gas exposure. Measure core, oxide and electrical spectra; include a growth model with no stress memory. An inert interruption may change surface chemistry too, so an order effect alone does not identify stress. *Falsifier:* an independently constrained relaxation model predicts an order effect absent above reproducibility, or its shared defect yield cannot explain the geometry and electrical measurements together. *Status:* proposed; no electrical validation on nanowires.

**H5. Defect populations and electrical extraction are separate models.** The vocabulary currently aliases Qss, Nf and Qf. The source symbol must be preserved, but true fixed charge, occupied interface traps and effective charge inferred from a capacitance measurement are distinct quantities. A process model should predict chemical populations; an observation model should account for energy, occupancy and the measurement protocol.

The first paired-data screen now gives a useful limit. Across 18 before-and-after pairs, the drops in reported charge and midgap trap density correlate at 0.656. A single effective energy width of 0.446 eV, fitted on ten pairs, predicts only 2 of 8 withheld unannealed charge values within 10%. Adding a trap contribution is worth testing, but one universal conversion factor is inadequate. This calculation uses the measured annealed charge as an input; it is not a prediction of charge from the process recipe, and correlation does not establish that all of the charge change comes from traps.

*Next test:* fit the chemistry once and compare independently calibrated electrical protocols on matched specimens, preferably with a spin or hydrogen measurement. *Falsifier for a specified mapping:* different probes require incompatible populations after their measurement responses are accounted for. *Status:* proposed; a simple observation mapping has failed its withheld comparison. Free scale factors per laboratory would conceal that failure.

Two things followed. The width is not one number: fitted by orientation it is about 1.0 eV on (100), 0.4 eV on (110) and 0.65 eV on (511), so the population that (110) has more of may sit in a narrower band of energies; testing that needs trap density against energy without an anneal, which the benchmark gives for the annealed case only. And the scorecard no longer scores the 28 unannealed readings against the fixed-charge program: they are a row of their own with no program, which moved fixed charge from 47% to 52% in scope and from 65% to 77% of pairs ordered right.

**H6. An oxygen repair window may precede unwanted growth or loss.** The hypothesis is that an oxygen pulse can change electrically active defects faster than it grows an unwanted interlayer or removes germanium. A useful window would require the repair time to be shorter than the pulse, and the pulse shorter than the growth and loss times. No such window has been established here.

*Next test:* compare oxygen-then-inert with inert-then-oxygen at matched exposure and thermal history, including a final-state control and a pulse-duration series. Read electrical properties, isotope profiles, interlayer thickness and material loss together. Vacancy-mediated transport must compete with the published [network-interstitial explanation of Ge oxidation](https://doi.org/10.1063/1.4984805); isotope exchange alone cannot choose between them. *Falsifier:* the electrical improvement always requires growth or loss beyond a predeclared practical limit. *Status:* proposed; lowest priority until the coupled measurements are available.

### What the ontology has changed about the next experiment

The six proposals remain proposed even where a screen succeeds. The local RDF proposal module links each claim to its scope, states, expressions, observables and sources. The JSON registry is the source of the rendered review. The module can be queried alongside the harness graph; it has not yet been loaded into GraphDB or made an automatic input to the main reasoner.

The language already checks isotope and site balances in the executable screens. Several extensions are still needed for the wider experiments: isotope fraction as a time-dependent gas control, general stoichiometric weights in conservation statements, and support for facet transport and instrument-response kernels. The current conservation checker accepts sums of states and field integrals; molecular inventories must therefore be represented consistently in atom-equivalent units until weighted balances are supported.

The immediate order is H1 and H2, with H5 alongside them. Freeze a model and its measurement mapping before scoring a new temperature, geometry or source. Then use the surviving models to choose process histories where their predictions remain separated after parameter uncertainty and measurement resolution are allowed for. H3 follows once finite-film boundary conditions are explicit. H4 and H6 need new matched measurements.

**No unpublished mechanism has been established.** The promising contribution is a conserved-state model that predicts several observables from one history, transfers under declared conditions, and survives a discriminating experiment. Known surface exchange, Ge diffusion or stress relaxation becomes our scientific contribution only through a demonstrably new and successful prediction or explanation. A passing synthetic run, a fit to a reconstructed profile and a withheld-source prediction are different evidence, and the record must keep them separate.

### Additional candidates from the structure searches

**Two trap populations on silicon.** From the search on the first benchmark: one population relaxes with time at temperature (2.2 eV) and is only partly capped by hydrogen; a second is set by the oxidation temperature, is six to seven times larger on (110) than on (100), does not relax, and is removed by hydrogen. On recipes held out of the fit it passes 5 of 13 within 10% and 8 of 13 within 25%, where the single-population form passed 0 of 13. A hydrogen rate fitted per orientation, which a reviewer proposed and our own notes had raised, fitted to no effect.

**Fixed charge as two equilibria.** Unchanged and still our best electrical result: fitted at one laboratory, 12 of 16 at another. A search over 32 structures, then elimination by anneals the search never saw, leaves only structures whose inert-gas value follows temperature.

**Growth laws by search.** One grammar, four forms. Silicon and SiC both keep a rate that falls with thickness less steeply than 1/x (written as linear-parabolic or as a power law; the data do not separate the two, and one 24-hour oxidation would). Germanium needs a fast first regime that rises steeply with temperature and is otherwise close to diffusion-limited; eleven points do not single out a law.

### The matrix

"Solved" for a cell means: the delivered predictor returns an in-scope value, every dependence the challenge names goes the right way, and the amount is within 25% on measurements not used to fit, from at least two sources. "Now" is where the scorecard puts it. The percentage is our judgement of the chance each approach gets the cell to solved, given the papers listed; where approaches overlap the combined figure is not their sum.

**1. Planar Si/SiO₂ (the first benchmark)**

| Cell | Now | Approaches, with our odds | Needs |
|---|---|---|---|
| Oxide thickness | Close. 76% within 10%, 99% ordered right | Published law for thick oxides, the search's law for thin ones: 85%. Wet oxidation constants: 70% | Constants for steam on planar silicon |
| Consumed substrate | Computed, never measured | Fixed volume ratio: 70% that it is accepted as is | A source that measures it, or the organisers' view |
| Composition profile | Not modelled | Isotope profile from the Toriumi report (new oxygen only at the surface and the interface) as a transport-and-exchange program: 40% | That profile extracted; the transition-region paper digitized |
| Interface states against energy | 41% within 10% at midgap, one laboratory; a measured shape for the annealed case only | Two populations (done): 45% to reach solved on the benchmark. Separate measurement model, H5: +10%. A declared level per laboratory: 30% that it then holds across three laboratories. Cooling hydrogen as an input: 15%, no data records it | The benchmark values checked by a person; a dataset that varies cooling ambient |
| Fixed charge | 52% within 10% over all sources, unannealed readings set apart; 12 of 16 across laboratories in its range | Two equilibria plus a model of what C-V extracts (H5): 60% on the benchmark. Thin oxides: 20% | Revitz 1979; Akinwande and Plummer 1987 |

**2. Si nanowires and nanosheets**

| Cell | Now | Approaches, with our odds | Needs |
|---|---|---|---|
| Oxide thickness | 47% within tolerance; fails its second dataset | A structure search across both datasets for how the rate depends on curvature: 45%. Kao's own measurements as a third dataset: +10% | Kao Part I read and digitized (held) |
| Remaining silicon | 50% | Follows from the same search: 40%. The paper's three diameters are not mutually consistent to better than a volume ratio of 2.1 to 2.7 | The same |
| Composition profile | No data | Not attempted: 5% | A source |
| Interface states, fixed charge | Not required: Emily says not to worry about electrical measurements on nanowires | Not pursued | Nothing |

**3. SiC/SiO₂**

| Cell | Now | Approaches, with our odds | Needs |
|---|---|---|---|
| Oxide thickness | Solved by our measure: 88% within 10%, three faces | Published constants; the search agrees: 90% | A second laboratory to confirm |
| Consumed substrate | A ratio from densities no source states | 60% that it is accepted | A stated molar-volume ratio from a source |
| Composition profile | Not modelled | Carbon inventory (H2) against the measured carbon profile we hold: 25% | Li 2023 digitized |
| Interface states against energy | 59% within 10%, 80% ordered right, one laboratory | One-way anneal (done): 45%. Two inventories (H2), chosen on the 1150 °C oxidation: 6 of 12 on the 1300 °C oxidation, not used to choose. A second laboratory and face (Yano 2002, held): +10% | Yano 2002 transcribed; nitric-oxide anneal data |
| Fixed charge | No data | 5% | A source |

**4. HfO₂/SiO₂/Si**

| Cell | Now | Approaches, with our odds | Needs |
|---|---|---|---|
| Interlayer regrowth | 47% of amounts within tolerance; 0 of 3 at the held-out temperature | H1, interfacial growth as its own layer, now a separate term: 40% | Why the held-out temperature is missed; the interlayer amounts are the weak part |
| Composition profile | 9 of 9 in the delivered program, held-out temperature amounts 0 of 3 | H1, finite surface exchange with uptake, fitted on amounts only: 60% | Instrument resolution. A temperature law with a held-out temperature has not been run |
| Interface states, fixed charge | No data | H6: 5% | A source |

**5. SiGe/oxide and Ge/GeO₂**

| Cell | Now | Approaches, with our odds | Needs |
|---|---|---|---|
| SiGe oxide thickness | Fails outside its home case (six to eight times too slow) | A growth search using the dry and wet rates four papers now give: 35% | Long 2012 transcribed; LeGoues 1989 |
| SiGe consumed substrate | Exact measurements, no program | A loss term for germanium oxide (H3): 30% | Nothing new |
| SiGe composition | Interface value: 2 of 3 across laboratories. A conserved layer width is now in the predictor: 48.6 nm against 50 given the stated oxide and peak, 91 nm with both predicted | The interface relation, for thin oxides: 50%. Layer width and the thick-oxide regime, H3: 35%, held back by the peak (44% against up to 75%) and the silicon growth law | A peak that rises with oxide thickness; a SiGe growth law; Long's Figure 8 digitized |
| Ge oxide thickness | 73% within tolerance, one laboratory, no law singled out | Growth search plus loss as GeO: 40% | Wang 2017, the challenge's own reference (not held) |
| Ge interlayer | Three printed values | A program for the layer under the oxide: 25% | More than three points |
| Ge composition | Not modelled | Exchange through the whole film, as the Toriumi isotope profile shows: 40% | That profile extracted |
| Ge electrical (Dit, Qf) | No data held. Emily named a series: Matsubara 2008 (Dit against oxidation temperature, hydrogen anneal), Sasada 2009 (three orientations), Lee and Toriumi (oxygen pressure), all one group and one extraction method | Process axes already in the language (temperature, ambient, pressure, anneal, orientation): 10% now, about 25% once those papers are held and transcribed. The GeO-desorption paper and Matsubara disagree on whether Dit depends on temperature, a conflict to test H5 on | The papers are listed in `ontology/wanted_references.json`; none is held yet |
| SiGe electrical | No data held. Qualitative checks only: the sign of Qf (a fixed negative charge is reported for rapid thermal oxidation of GeSi), Dit rising with germanium at the interface, and anneal recovery (Ahn 1999) | 10% for qualitative direction, under 5% for amounts: there is no comparable series | Nayak 1990, Ahn 1999 and Wu 2000 are named, not held |

### What the matrix adds up to

- **Thickness on all five interfaces, with directions right:** we are most of the way there. Chance of reaching "solved" on thickness everywhere: about 35%, held back by nanowires and SiGe.
- **Composition on the three interfaces that have data:** about 30%. The hafnium profile and the SiGe interface value are the two with a real mechanism candidate.
- **Electrical on planar silicon and SiC:** about 30% for both together.
- **Electrical on the other three interfaces:** nanowires need none (Emily). For germanium there is now a named series from one group; about 25% once it is held, 10% before. For SiGe, qualitative checks only, 10%. Hafnium stacks: still no data, under 5%.
- **Every criterion, as the rules require:** still under 3%.

That last number is small and we think it is right. It could move for two reasons that are not in our hands: the organisers' answer about electrical data for interfaces 2 to 5, and whether "qualitative first" means a framework with honest scope labels is judged on what it covers.

### What changes the odds most

1. **The organisers' answers.** Which version of the first benchmark is scored, what electrical data exist for the other interfaces, whether published constants count as declared parameters.
2. **A person checking the first benchmark.** Every value in it was read by an AI agent. Two of its tables disagree by a factor of ten in their unit headers and four values needed a ruling.
3. **Five papers:** Wang 2017 (germanium), Revitz 1979 and Akinwande and Plummer 1987 (fixed charge through anneals), LeGoues 1989 (SiGe), Massoud 1985 (thin silicon oxides, first-hand).
4. **Two measurements,** if the organisers do run experiments on promising models. The surviving fixed-charge candidates disagree by two tolerances after an hour in nitrogen at 700 °C following oxidation at 900 °C. The two surviving growth laws on SiC disagree by 19% after 24 hours on the carbon face at 1150 °C. And the experiment that would settle trap density: matched silicon wafers, one oxidation, cooling rate and hydrogen exposure varied on purpose.

### What we have withdrawn or corrected along the way

A plan like this is only worth reading if the record of being wrong is kept beside it.

- The starting theory, a single relaxing structural state, refuted.
- "Fixed charge carries a memory of growth", withdrawn.
- "The time law for trap density carries to a second laboratory at about 15%", corrected to "not established".
- The first ranking of the fixed-charge structure search, which was partly optimizer luck; rerun with random starts.
- "The nanowire model holds on another dataset", tested and false.
- "Germanium selects diffusion-limited growth", a choice made on held-out data, corrected.
- The 91% trend score as a headline, replaced by the scorecard.
- One transcribed value in the hafnium data, found wrong against the drawing and corrected. At 1223 K the oxygen-18 marker and the oxygen-16 marker exceed the sum on the same figure by 1.00 × 10^15 cm^-2. The film total is that sum. As an atomic fraction it is 0.580, against a reconstructed plateau of 0.545 and a thickness-weighted film of 0.558.

## Where this is different

Most machine-learning work on process–property relations fits a regressor to one laboratory's data and reports an error. Most physics-based process simulators stop at geometry and stress. This study does three things neither does.

**It makes transfer a separate test.** The delivered-predictor scorecard includes measurements used during development as well as withheld measurements. Cross-laboratory and withheld-history results are identified separately; the mean-matched hafnium shape screen is a diagnostic fit. A fab engineer needs the next result: will the declared model hold on my tool?

**It publishes the refutations with the same weight as the results.** Four models are marked refuted and one withdrawn, each with the scope of the finding and the data that did it. A negative result with a hash is worth more to the next group than a positive one without.

**It makes assumptions queryable.** Which models assume a parameter with no source? Which sources bear on nanowires, and which of them has anyone read? Which contracts are bound to a dataset that changed? Those are queries against the graph, not questions for the author.

## What this is worth to the industry

**A map of what a recipe can and cannot tell you.** Growth: yes, across materials, with published constants. Fixed charge after a defined last step: yes, to about 10–25% between laboratories that work alike. Trap density from a recipe alone: no, not to better than a factor of several, until the clean and the cooling ambient are part of what is recorded. That last statement is a specification for what process records should contain.

**A reusable harness for vetting a claimed mechanism.** A paper proposes that a defect is generated in proportion to oxidant concentration at the interface. In this system that is forty lines of ISL and an afternoon: write it, freeze contracts on three other papers, read the receipts. We did exactly that to a 1987 thesis's own explanation; it failed on that thesis's own numbers.

**A defence against confident machine-written science.** As more analysis is drafted by models, the scarce thing is not hypotheses. It is a mechanism that will tell you, without being asked, that the hypothesis was published in 1982 and did not hold.

## What is next, honestly

**The questions we need answered** are on their own page: [Questions we need Emily to answer](/writing/questions-for-emily-testing-a-theory-of-the-interface). They are the ones whose answers would move the odds in the matrix above.

**Nothing here has been verified by a person.** About 650 values were read by an agent, half from figures. We put the chance that one headline conclusion changes when they are checked at one in five. The page images sit beside every file so that the check takes an hour, not a week.

**It does not meet the challenge it was built for.** The challenge asks for thicknesses, composition profiles, trap density and fixed charge across five interfaces. The matrix above is the cell-by-cell account: thickness on all five with two weak, composition with a mechanism candidate on two, electrical results on planar silicon and silicon carbide only. Our own estimate that this entry meets every criterion is under three per cent.

**The models are still largely separate.** One command runs them, and they share one language and vocabulary. The new inventory screens couple physical states to observations, but growth, composition, charge and traps are not yet one jointly validated model.

**The agent harness has one seat.** Proposer, checker and reporter are the same agent under the same rules. The second check that withdrew the growth-memory claim was a habit, not a role. It should be a role.

**The probabilities are judgements.** We publish them — 80% that fixed charge is set by the last hot step, 60–65% that trap density is ordered by time at temperature, about 40% that this reflects a change in the number of defects and not in their passivation, under 5% for fictive temperature — so that a reader can disagree with a number.

## Why this is not about silicon

Strip the oxide away and the shape is general. There is a domain with a long literature and no way to rerun the experiments. There is a fluent model that would rather recall an explanation than derive one. There is a temptation, when a fit works, to stop.

The answer has four parts, and none of them is the model. An ontology that will not let a prediction be filed as a measurement or an assumption go unstated, with a language under it in which a hypothesis must be written so that a compiler can refuse it. A loop in which the agent cannot author its own evidence. An evaluation fixed before the run, on data from somewhere else. And people, who decide what is merged and whether the question was the right one.

The silicon interface is a good place to show it because a number there can be contradicted by a table printed in 1967. The same is true of a drug interaction, a load rating, a contract clause. What we built is a way to let a machine propose, and to make sure that what it proposes can lose.

That is what Agentic Primitives is. The interface is the example where the claim being tested is a theory, which makes it unusually easy to see both what the approach can settle and what it cannot.

The sibling accounts are [Designing a radar with an ontology](/writing/designing-a-radar-with-an-ontology) and [Translating the Bible with an ontology](/writing/translating-the-bible-with-an-ontology).

*All measured values in this study were transcribed or read from figures by an AI agent and have not been checked by a person. The repository, the receipts and the page images are available for review.*

`#AgenticPrimitives #Ontology #Semiconductors #MaterialsScience #AIEvaluation #KnowledgeGraph #TrustworthyAI`
