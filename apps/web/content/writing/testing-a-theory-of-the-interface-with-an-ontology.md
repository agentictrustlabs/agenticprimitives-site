# A machine proposed a theory of the silicon interface. The hard part was building what could prove it wrong.

*Can you predict what a semiconductor interface will be from how it was made? Our answer: oxide thickness, yes; fixed charge, yes within a stated range; trap density, not from the recipe alone. And a language, an ontology and two harnesses that let anyone check each of those answers against the published record.*

## The answer, first

**The question.** A chip's performance is set at interfaces a few atoms thick. Engineers can predict how thick an oxide will grow. They cannot reliably predict, from the recipe, how many electrical defects the finished interface will hold, and today that is managed by trial and error. An open challenge asks for one framework that predicts thickness, composition and electrical quality from processing history, across five kinds of interface.

**What we found.** We wrote seventeen candidate models and scored each on published measurements it had not been fitted to, wherever possible from a laboratory other than the one it was tuned on.

| What you want to predict | From the recipe alone? | How well, on data the model had not seen |
|---|---|---|
| Oxide thickness on silicon and silicon carbide | **Yes** | Published constants, nothing fitted: 7 of 7 held-out points on SiC; 4 of 6 within 10% on Si |
| Oxide thickness on a silicon nanowire | **Yes, with one extra parameter** | A viscous-shell stress term fitted to five large wires predicts seven smaller ones to within 3 nm |
| Fixed charge at the interface | **Yes, within a stated range** | It is a reversible equilibrium of the last hot step. Fitted at one laboratory, 12 of 16 within 10% at another (thick oxides, 900–1100 °C) |
| Interface trap density | **No** | Directions right on 145 of 190 comparisons. Magnitudes differ three- to sevenfold between laboratories running the same recipe |
| Composition profile through a gate stack | **Not yet** | The amount of exchanged oxygen is right; where it sits in the film is wrong |

**What we propose.**

1. **For thickness: the established growth law, plus viscous stress on curved surfaces.** Nothing new is needed on flat silicon or silicon carbide. On a nanowire, one parameter for the compression that a flowing oxide shell puts on the silicon accounts for the thinning.
2. **For fixed charge: two equilibria and a clock.** The charge moves toward one temperature-dependent value in oxygen and a lower one in inert gas, reversibly. Whatever came before the last hot step is forgotten. This replaces the idea we started with, that the interface freezes in a memory of its history.
3. **For trap density: a missing input, not a missing equation.** What an unannealed measurement sees depends on how much hydrogen reached the interface while the wafer cooled: the moisture in the gas, the pull, the tube. Published recipes do not record that, which is why laboratories disagree. Our proposal is that process records carry the cooling ambient and the pre-oxidation clean as first-class fields, and that models take them as inputs. Until then no model that reads only the recipe will predict trap density to better than a factor of several, and we can show that ours do not.
4. **For all of it: a way to check.** Each of the statements above is a short program in a purpose-built language, bound by hash to the data that tests it, with its assumptions recorded in an ontology. A different group can rerun every one, or write a competing mechanism in forty lines and see whether it survives the same contracts.

**What we rejected.** Our own starting theory, that the interface is a glass whose defects are set by one relaxing structural state. It failed for fixed charge, was unsupported for trap density, and had been proposed in 1982 by a group whose own data then argued against it. Four of the seventeen models are marked refuted and one withdrawn.

**What this is not.** It is not a winning entry: we have nothing on germanium and electrical results on flat silicon only.

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

**The contract is the measurement's own repeatability.** Where a paper says identically processed wafers agree within 10%, the tolerance is 10%. We did not choose a tolerance that our models pass. Most of them do not.

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
- **A model can match an amount and miss the profile.** Our oxygen-exchange model reproduces how much isotope enters a hafnium silicate film and puts it in the wrong place: a surface layer, where the paper finds it through the whole film.

## Where this is different

Most machine-learning work on process–property relations fits a regressor to one laboratory's data and reports an error. Most physics-based process simulators stop at geometry and stress. This study does three things neither does.

**It tests transfer, not fit.** Every headline number is from a laboratory or a recipe the model was not fitted to. That is the only test a fab engineer cares about: will this hold on my tool?

**It publishes the refutations with the same weight as the results.** Four models are marked refuted and one withdrawn, each with the scope of the finding and the data that did it. A negative result with a hash is worth more to the next group than a positive one without.

**It makes assumptions queryable.** Which models assume a parameter with no source? Which sources bear on nanowires, and which of them has anyone read? Which contracts are bound to a dataset that changed? Those are queries against the graph, not questions for the author.

## What this is worth to the industry

**A map of what a recipe can and cannot tell you.** Growth: yes, across materials, with published constants. Fixed charge after a defined last step: yes, to about 10–25% between laboratories that work alike. Trap density from a recipe alone: no, not to better than a factor of several, until the clean and the cooling ambient are part of what is recorded. That last statement is a specification for what process records should contain.

**A reusable harness for vetting a claimed mechanism.** A paper proposes that a defect is generated in proportion to oxidant concentration at the interface. In this system that is forty lines of ISL and an afternoon: write it, freeze contracts on three other papers, read the receipts. We did exactly that to a 1987 thesis's own explanation; it failed on that thesis's own numbers.

**A defence against confident machine-written science.** As more analysis is drafted by models, the scarce thing is not hypotheses. It is a mechanism that will tell you, without being asked, that the hypothesis was published in 1982 and did not hold.

## What is next, honestly

**Nothing here has been verified by a person.** About 650 values were read by an agent, half from figures. We put the chance that one headline conclusion changes when they are checked at one in five. The page images sit beside every file so that the check takes an hour, not a week.

**It does not meet the challenge it was built for.** The challenge asks for thicknesses, composition profiles, trap density and fixed charge across five interfaces. We have thickness on three, first results on nanowires, a composition profile that is wrong in shape, nothing on germanium, and electrical results on planar silicon only. Our own estimate that this entry meets every criterion is under two per cent.

**The models are separate.** Growth, charge and traps are three programs, not one.

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
