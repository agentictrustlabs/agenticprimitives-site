**Emily's pages:** **Questions** · [Thermal-transition test results](/writing/thermal-transition-test-results-for-emily) · [Vocabulary](/writing/interface-vocabulary-for-emily) · [Language](/writing/interface-language-for-emily) · [Studies reproduced](/writing/interface-studies-reproduced) · [Experiment proposal](/writing/experiment-proposal-for-emily) · [The essay](/writing/testing-a-theory-of-the-interface-with-an-ontology)

# Questions we need Emily to answer

*Companion to [A machine proposed a theory of the silicon interface](/writing/testing-a-theory-of-the-interface-with-an-ontology). The essay says where we stand and what we think our odds are. These are the questions whose answers would move those odds, or that we cannot settle by ourselves. Each one says why it matters and what we will do if we hear nothing, so none of them blocks the work.*

*Written 10 November 2026. Every number below is a judgement or a result described in the essay; all measured values were read from papers by an AI agent and have not been checked by a person.*

## The studies we depend on, reproduced

Before the questions, the thing we most want checked. For each paper our data come from we have written the sample and the timing of its process history in our language as the paper states them, simulated it, and set the result beside the paper's numbers. Each page has the sample in three dimensions with its history on a clock, the paper's words beside our encoding item by item, the paper's terms mapped to ours, the simulation as ISL text, a chart of how far we land from the paper, and our assessment of how well the paper lets its result be reproduced. Start at [the studies we depend on, reproduced](/writing/interface-studies-reproduced), or go to one:

- [Vitkavage, Irene and Massoud 1990](/writing/interface-study-vitkavage-1990): reproducible from the paper as written: moderate; 9 within, 3 near, 9 off of 21 numbers.
- [Deal, Sklar, Grove and Snow 1967](/writing/interface-study-deal-1967): reproducible from the paper as written: moderate; 9 within, 4 near of 13 numbers.
- [Deal and Razouk 1980](/writing/interface-study-deal-razouk-1980): reproducible from the paper as written: high; 19 within, 4 near, 1 off of 24 numbers.
- [Song, Dhar, Feldman, Chung and Williams 2004](/writing/interface-study-song-2004): reproducible from the paper as written: high for growth; 21 within, 3 near of 24 numbers.
- [Kobayashi et al. 2017](/writing/interface-study-kobayashi-2017): reproducible from the paper as written: low; 21 within of 21 numbers.
- [Goncharova et al. 2011](/writing/interface-study-goncharova-2011): reproducible from the paper as written: moderate; 16 within, 5 near, 3 off of 24 numbers.

More are being added (Hung 1987, Rabie 2005, Müller 2023, Krzeminski 2012, Wang 1994). On each page the section “What we would like Emily to check” lists what we could not settle from the paper.

## How to read this page

Each question has four parts: **what we need to know**, **why it matters**, **what we do by default**, and **what it is worth** (our own estimate of how far the answer moves the chance of meeting a criterion). Questions are ordered by that last part. Short answers are enough: a number, a yes or a no, a name, a file.

## A. What will be scored

**1. What measurements will the electrical predictions for interfaces 2 to 5 be judged against?** *(Answered 10 November: nanowires need no electrical measurements; for germanium and SiGe, see the list Emily gave. Still open: the hafnium stack, and whether the same extraction method is expected for all.)*
The challenge lists interface-trap density and fixed charge for all five interfaces. The reference papers we have read for nanowires, hafnium stacks, SiGe and germanium report growth, thickness, composition or oxygen transport, not electrical measurements. We hold no electrical data for those four interfaces and have no program for them.
*Why it matters:* it decides whether four of the five interfaces can be scored on electrical properties at all.
*Default:* we say plainly that those cells are not modelled, and spend effort on thickness, composition and the two electrical cells we can test.
*Worth:* the largest single uncertainty. Electrical on interfaces 2 to 5 is under 5% for us today; a pointer to data could raise it to 20 to 30% for one of them.

**2. Which version of the first benchmark is scored?** *(Answered 10 November: Emily's reply to this question was blank; we keep the technical-report values and flag the four rulings)*
We hold the ONR technical-report version of Vitkavage, Irene and Massoud (DTIC ADA231244). Its tables disagree internally: the units header of Table IV against Tables II and VII differs by a factor of ten, and four values needed a ruling. Is the journal version the scored one, and are the collated values available?
*Default:* we keep the technical-report values, flag the four rulings, and say which version we used.
*Worth:* if the collated values differ from ours, every quantitative cell on planar silicon could move.

**3. Which oxide thicknesses will predictions for the first benchmark be compared with?** *(Answered 10 November: score thickness only on the six values the paper reports in its text (25 nm, 90 nm, 500/640 Å, 2050/2400 Å, read as (100) and (111)); predict every other sample and mark it unscored, since later ellipsometry may score it; Figure 9 cannot be digitized)*
The report gives thickness for only a few samples, in the text. We predict thickness for all of them from the recipe.
*Default:* we score on the six values we have, and report the rest as unscored.

**4. Does "cooling" in the process history mean a recipe that varies cooling?** *(Answered 10 November: cooling is fixed for this benchmark (a pull under 5 s into the endcap) and the Vitkavage data cannot test it; it stays an input of the process history because other datasets vary it)*
All of Vitkavage's wafers were pulled in under five seconds. The paper we read late on dangling bonds says they are seen or not "determined by the cooling rate and the presence/absence of hydrogen/moisture in the ambient". Is there a reference dataset in which cooling rate or cooling ambient is varied?
*Why it matters:* our best reading of why laboratories disagree on trap density by three- to sevenfold is a missing input of exactly this kind. Without data that varies it, no model can be tested on it.
*Default:* we state the missing input and do not model it.

**5. May parameters taken from the reference papers count as declared?** *(Answered 10 November: a constant is sourced only if the data it was fitted to are not used to score the same prediction, otherwise it is fitted (to scored data); one value or one declared law across all conditions, never per-experiment values; list every parameter in every output and give one parameter table for the whole submission)*
Several reference papers fit their own rate constants to the data they report, in one case separately for each experiment. We use published constants where we can, label them sourced, and fit only what is labelled fitted. Is that consistent with "one framework, with declared parameters"?
*Default:* we continue, and list every parameter with its status in the output of every prediction.

**6. Will the collated literature results be published?** *(Answered 10 November: the whole collated set, the rulings and the scoring script will be published; the held-out test is new experiments, with predictions frozen before measurements are released; literature results count as development evidence)*
The page says submissions are evaluated on "accepted literature results that we collate". If the collation is published, even in part, we can test against it before submitting. If not, we are tuning blind to one half of the evaluation.

**7. What counts as "qualitative first"?** *(Answered 10 November: a published list of directional checks scored on sign alone; every prediction is scored including those flagged outside range; correct labels earn reliability credit; quantitative accuracy then ranks entries that pass)*
Is a framework that gets every direction right (a hydrogen anneal lowers trap density, higher temperature thickens the oxide) and says honestly where a number is outside its tested range scored on that stage, even where the amount is wrong? Our pairs ordered right are 99% on thickness, 77% on fixed charge and 79% on midgap trap density; within 10%, 76%, 52% and 41%.
*Worth:* this decides whether an honest scope label helps or hurts.

**8. Does one framework "unchanged in form" allow separate programs behind one entry point?** *(Answered 10 November: separate programs behind one entry point are fine if the same code runs for all five interfaces and only declared material parameters change; charge and trap modules should take the growth module's state, with any direct recipe inputs declared; tested coupling scores better)*
We run one command, one language and one vocabulary, but growth, charge and traps are separate programs, not one coupled model. Is that what is meant?

## B. Data we need and cannot get ourselves

**9. Can you get us these papers, or a person who can?** *(Answered 10 November: Emily is working on getting the papers)*
Listed by what they unlock:
- **Wang 2017** (germanium oxidation, the challenge's own reference): we hold 11 growth points from an older paper and cannot single out a growth law.
- **Revitz 1979** and **Akinwande and Plummer 1987**: fixed charge through anneals; would test our two-equilibria model on a third laboratory.
- **LeGoues 1989**: the one thick SiGe oxidation our line misses; we know it only through a 2005 paper.
- **Massoud 1985**: first-hand thin silicon oxides.
- **Matsubara 2008** (APL 93, 032104), **Sasada 2009** (JAP 106, 073716), **Lee 2009** (ECS Transactions 19, 165) and **Lee 2008** (SSDM abstract A-1-5): the germanium electrical series Emily named. These come first; none is held.
- **Wu and Chin 2000** (EDL 21, 113), **Ahn 1999** (JAP 86, 1542) and **Nayak 1990** (MRS Proc. 198, 521): the SiGe qualitative checks.
- Emily's other pointers could not be resolved to a record without guessing (the GeO-desorption paper PMC2905455, the Osaka and Stanford ozone papers, the strained-Si and pile-up items): which exact papers are meant?
- **Kao Part I** (nanowire oxidation): a third nanowire dataset.
*Default:* we continue with what is held; the nanowire and SiGe thickness cells stay weak.

**10. Is there a laboratory that could run two measurements?** ([The proposal, on one page](/writing/experiment-proposal-for-emily).) *(Answered 10 November: yes, but not until December)*
If the organisers do run experiments on promising models, we would like to propose the two that separate our surviving hypotheses:
- Fixed charge: one hour in nitrogen at 700 °C after oxidation at 900 °C. The surviving structures disagree by two tolerances.
- SiC interface states: one 50 minute argon anneal at 1300 °C after oxidation at 1300 °C. The two surviving forms agree on every anneal measured and part by 13 tolerances here.
And, if possible, matched silicon wafers, one oxidation, with cooling rate and hydrogen exposure varied on purpose.
*Worth:* these are the experiments that would turn inconclusive cells into supported or rejected ones.

## C. Checking what we have

**11. Can a person check the first benchmark's values against the page images?**
Every value in our datasets was read by an AI agent. Page images sit beside every file, so the check takes about an hour for the first benchmark. Our estimate is a one in five chance that one headline conclusion changes when they are checked. Four values in the first benchmark need a human ruling and are listed with the page they come from.
*Default:* everything stays labelled unverified.

**12. Does the vocabulary read like the field's?**
Of 36 working terms, 28 are the sources' own, one is ours (surface-diffusion front) and seven of the 68 domain terms have no source we can cite. We would like an expert to read the 68-term list (linked below) and mark any that a practitioner would not use, or would use differently, for example whether Qss, Nf and Qf should stay as separate quantities.

**The vocabulary and the language are on their own pages:** [the 68 domain terms and 36 working terms](/writing/interface-vocabulary-for-emily) and [how a recipe and a model are written](/writing/interface-language-for-emily), with each term's definition, who wrote it, whether any source in our library uses the words, and which sources. Seven domain terms have no source (miscut is new).

**13. Which of the six hypotheses would you drop?** *(Answered 10 November: drop H6)*
H1 to H6 are in the essay with their odds. H6 (an oxygen repair window) has no data behind it. H4 (stress linking nanowire geometry to electrical defects) has none for the electrical half. Which are not worth effort?

## D. Decisions that are not ours

**14. Do we submit, and with how many of the three entries?** *(Answered 10 November: do not worry about timing; aim for the best model)*
Nothing has been submitted and nothing will be without a decision from a person. The prize goes to the first entry that meets every criterion; the rules allow three entries; the licence is perpetual and irrevocable whether or not we win; and patents should be filed before submitting. Our estimate of meeting every criterion is under 3%. If we submit early we use an entry on a partial result. If we wait, someone else may be first.
*What we need:* a decision on timing, and whether anything here should be filed first.

**15. May we contact authors?** *(Answered 10 November: yes, we may contact authors)*
Several data questions could be answered in one email by the author: the oxidation time Mueller used for the planar samples (we inferred about two minutes), the 1223 K marker in Goncharova Figure 5 that does not add to its drawn sum, and the oxygen-18 profile in Goncharova Figure 4(b), which we read by eye.
*Default:* we contact nobody.

**16. Is there anything in the essay or repository that should not be public?** *(Answered 10 November: it can be public; once results are compared with their real experiments those results must stay confidential)*
The essay is published, the repository is on GitHub, and nothing in a submission is confidential.

## E. What we will do while we wait

- Nanowire structure search across both datasets (45% chance of reaching solved).
- A trap-spectrum observation model that accounts for energy and occupancy, since one conversion factor between trap density and apparent charge predicts only 2 of 8 withheld values.
- Conserved germanium redistribution as a program in the predictor, not only a check on three cases.
- SiGe consumed substrate from Mueller's measurements.
- Transcribing Yano 2002 and Long 2012.
