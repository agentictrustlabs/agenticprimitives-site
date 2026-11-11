**Emily's pages:** [Questions](/writing/questions-for-emily-testing-a-theory-of-the-interface) · [Vocabulary](/writing/interface-vocabulary-for-emily) · **Language** · [Studies reproduced](/writing/interface-studies-reproduced) · [Experiment proposal](/writing/experiment-proposal-for-emily) · [The essay](/writing/testing-a-theory-of-the-interface-with-an-ontology)

# The language: how a process history and a model are written

*Written 10 November 2026 for Emily. Generated from the language's own files and a live run of the predictor; not edited by hand.*

ISL, the Interface Science Language, is how this project writes down two things: **what was done to a sample** (the recipe) and **what we think happens because of it** (a model). Both are plain text. A model is a short program; it contains no built-in physics, so every rate law and every constant a prediction uses is on the page where a person can read, question and change it.

It exists so that two kinds of claim can be told apart: a model that was *fitted* to data and a model that was *checked* against data it never saw. The language labels every number with which of those it is, and refuses to run a program whose units, conservation claims or bounds do not hold.

## What we would like Emily to check

1. **Can you write the recipes you care about?** Section 2 lists what a recipe can say today. Anything a process engineer would record and we cannot (cooling ambient, furnace and tube, moisture in the gas, pull rate, loading step, boat position) is a gap, and the answer to Question 4 on the questions page says which gaps matter most.
2. **Do the six kinds of process, and the five labels on a number, cover how you would describe an interface model?** Section 4 and 5.
3. **Are the observables the right ones?** Section 8 lists every quantity the language can predict. Say what is missing.
4. **Would you trust a prediction that came with the support statement shown in Section 1?**

## 1. From a recipe to a prediction

A recipe is a sample and a list of steps. This is the whole file for one:

```
# (100) silicon, dry oxidation for one hour at 1000 C, then a forming-gas anneal after metallization.
SAMPLE Wafer_A {
    FAMILY: Si_Planar
    ORIENTATION: Si100
    CLEAN: RCA
}
CONTROL_TRAJECTORY History {
    RUN Oxidation DURATION 3600 TEMP 1000->1000 AMBIENT dry_O2
    RUN PostMetalAnneal DURATION 1800 TEMP 400->400 AMBIENT forming_gas_H2
}
```

One command turns it into everything the project can say about the resulting interface:

```
python -m isl_harness.predict examples/histories/planar_si_dry_then_forming_gas.isl
```

which prints (shortened):

```
Interface: Si_Planar (challenge system 1)
Sample: FAMILY: Si_Planar; ORIENTATION: Si100; CLEAN: RCA
Recipe:
  RUN Oxidation DURATION 3600 TEMP 1000->1000 AMBIENT dry_O2
  RUN PostMetalAnneal DURATION 1800 TEMP 400->400 AMBIENT forming_gas_H2

Predictions:
  oxide thickness                               57.94 nm           [supported within scope]
  consumed substrate                            15.37 nm           [supported within scope]
  oxide thickness (thin-oxide program)          51.59 nm           [outside the tested scope]
  fixed charge                              1.462e+11 cm^-2        [supported within scope]
  interface state density at midgap         7.508e+10 cm^-2 eV^-1  [direction only]
  interface state density at 0.20 eV above the valence band    1.397e+11 cm^-2 eV^-1  [direction only]
  interface state density at 0.30 eV above the valence band    1.148e+11 cm^-2 eV^-1  [direction only]
  interface state density at 0.40 eV above the valence band    1.079e+11 cm^-2 eV^-1  [direction only]
  interface state density at 0.55 eV above the valence band    7.508e+10 cm^-2 eV^-1  [direction only]
  interface state density at 0.70 eV above the valence band    5.418e+10 cm^-2 eV^-1  [direction only]
  interface state density at 0.80 eV above the valence band    6.941e+10 cm^-2 eV^-1  [direction only]
```

Every line carries a label saying how far to trust it. *Supported within scope* means the program was tested on data it was not fitted to and this recipe lies inside what it was tested on. *Direction only* means it gets the direction of change right and the amount is not reliable. *Outside the tested scope* means the recipe is beyond what that program was tested on. The full output also lists, for each program, its parameters with their labels and a sentence on how it was tested.

## 2. What a recipe can say

A sample has a **family** (which of the challenge's five interfaces; SiGe and germanium are separate families) and, where they matter, an **orientation**, a **pre-oxidation clean** (one of RCA, sulfuric_aqua_regia_HF, peroxide_HF, HCl_in_situ, sulfuric_peroxide_HF, not_stated), a **shape**, a **composition** and a **diameter**.

A recipe is a list of steps, each `RUN <name> DURATION <seconds> TEMP <start °C>-><end °C> AMBIENT <gas>`. A ramp is a step whose two temperatures differ. The gases it knows by name are `dry_O2`, `inert_N2`, `inert_Ar`, `forming_gas_H2` (10% hydrogen), `pure_H2`, `steam`, `wet_O2` and `vacuum`. A mixture is written with its partial pressures: `mix:N2=0.999998,H2O=2.0e-6` is nitrogen with 2 ppm of water, and a model may read the water pressure.

What a recipe **cannot** say yet: the bubbler temperature that sets the moisture of `wet_O2` (so wet oxygen supplies no partial pressures), the cooling ambient as a separate field, furnace or tube, wafer loading and pull rates other than as a short step, and the state of the gate metal. Whether those matter is a question for you.

## 3. What a model looks like

A model is a set of named blocks. This is a real one and a short one: it says where the germanium fraction under the oxide settles while a SiGe alloy is oxidized. Read it as a sentence: *there is a quantity `ge_i`, the germanium fraction just under the oxide; it starts at the alloy's composition; while the alloy is being oxidized it moves toward a value set by the starting composition; and the model is scored against these measurements.*

```
# ISL MODEL: GERMANIUM AT THE OXIDE INTERFACE OF A SiGe ALLOY
#
# While the alloy is being oxidized, the germanium fraction just under the oxide moves to a
# value set by the starting alloy: a floor plus a share of the starting fraction. The two
# numbers are fitted to one laboratory's two planar measurements (Mueller et al. 2023, 20% and
# 50% alloys) and the program is then scored on other laboratories.
#
# This is a relation written as a relaxation, not a transport model: it says where the
# interface composition settles, not why. How fast it settles is not measured by any source we
# hold (the shortest oxidation is two minutes), so the settling time is a hypothesis.

SAMPLE Alloy_A {
    FAMILY: SiGe_oxide
    COMPOSITION: Si0.80Ge0.20
}

STATE ge_i { UNIT: 1; INITIAL: ge_start; MIN: 0; MAX: 1 }

CONTROL T { UNIT: K }
CONTROL p_N2 { UNIT: atm }
CONTROL p_Ar { UNIT: atm }

PARAMETER ge_start { VALUE: 0.2; UNIT: 1; STATUS: sourced; SOURCE: the sample's stated composition }
PARAMETER floor_ge { VALUE: 0.3; UNIT: 1; STATUS: fitted }
PARAMETER share_ge { VALUE: 0.8; UNIT: 1; STATUS: fitted }
# No source measures the interface earlier than two minutes into an oxidation.
PARAMETER settle_time { VALUE: 30.0; UNIT: s; STATUS: hypothesis }
PARAMETER p_ref { VALUE: 1.0; UNIT: atm; STATUS: constant }

# The interface moves only while the alloy is being oxidized: not during a hold in nitrogen or argon.
QUANTITY oxidizing { UNIT: 1; EQUATION: oxidizing = 1 - (p_N2 + p_Ar) / p_ref }

CONTROL_TRAJECTORY History {
    RUN Oxidation DURATION 120 TEMP 850->850 AMBIENT steam
}

OPERATOR F_InterfaceEnrichment : Relaxation {
    EQUATION: d(ge_i)/dt = -oxidizing * (ge_i - (floor_ge + share_ge * ge_start)) / settle_time
}

OBSERVATION_MODEL Obs_Ge_At_Interface { TARGET: Ge_at_interface; UNIT: 1; EQUATION: Ge_at_interface = ge_i }

EVALUATION_CONTRACT Contract_A {
    FROZEN: true
    DATASET: data/derived/sige_interface_germanium.csv
    DATASET_DIGEST: sha256:<hash of the dataset file>
    SPLIT: train
    TARGET: Ge_at_interface = 0.482 +/- 0.05 abs
}
```

| Block | What it is |
|---|---|
| `SAMPLE` | what is being processed |
| `STATE` | a quantity with one value that changes in time (a thickness, a fraction, a number of sites) |
| `GRID`, `FIELD` | a coordinate, and a quantity that varies along it (a concentration against depth) |
| `PARAMETER` | a number, with a unit and a label (Section 5) |
| `QUANTITY` | a named intermediate expression, written once |
| `CONTROL` | something the recipe prescribes: temperature, partial pressures |
| `CONTROL_TRAJECTORY` | the recipe itself |
| `OPERATOR` | one physical process and the equation it contributes (Section 4) |
| `OBSERVATION_MODEL` | what a measurement reads from the state: a measurement is not the state |
| `EVALUATION_CONTRACT` | what the model is scored against, with the dataset's hash; once frozen it cannot be changed to suit the result |

An observation may read states and constants but never a control. This keeps a measurement from being a restatement of the recipe.

## 4. The six kinds of process

Every operator states one kind. The kinds name a *form* of change, not a mechanism: what relaxes, grows or is passivated is said by the quantity the operator acts on. Each word is one the sources themselves use (checked by a text search of the papers; see the vocabulary page).

| Kind | What it says | The compiler also requires | Serves |
|---|---|---|---|
| OxideGrowth | the oxide gets thicker, or its interface moves into the substrate | nothing further | layer thickness |
| Transport | a species moves through the film by diffusion or drift | FLUX | composition profile |
| Exchange | material passes between the film and a reservoir (the gas, another layer) | CONSERVATION | composition profile |
| Passivation | sites change what occupies them, such as hydrogen capping a dangling bond | CONSERVATION | trap density |
| Relaxation | something moves toward a target value at a stated rate | nothing further | trap density, fixed charge, layer thickness |
| DefectGeneration | defects or sites are made by a process the program names | nothing further | trap density, fixed charge |

A *Transport* operator must be written as a flux, so the amount is conserved. *Exchange* and *Passivation* must declare a conservation law: what leaves one place must arrive in another, and sites are neither made nor destroyed.

## 5. Every number carries a label

The 29 model files in this repository hold 311 labelled numbers:

| Label | Meaning | Count |
|---|---|---|
| constant | a physical constant or a definition | 108 |
| sourced | taken from a cited publication; the program must cite it | 62 |
| computed | produced by a first-principles or atomistic calculation; the program must say which | 1 |
| fitted | adjusted to data by a calibration step: the only label a fit may change | 100 |
| hypothesis | assumed, with nothing supporting it yet | 40 |

A fit may change only `fitted` numbers. The runtime refuses to override a `sourced` one. This is how the project keeps a published constant from being quietly adjusted to match a result.

## 6. What is checked before a program runs

- **Units.** Every term of every equation must have consistent dimensions. The language has one unit per dimension (`1` (a pure number), `cm` (length), `s` (time), `K` (temperature), `eV` (energy), `atm` (pressure)), so a scale error such as nm beside cm cannot be written; values are converted before they are put in.
- **Conservation.** Each declared conservation claim is checked symbolically against the operator's own terms, including boundary fluxes and sources.
- **Isolation of the measurement.** An observation reads states and constants only, never a control.
- **Bounds.** Minimum, maximum and capacity limits are enforced on every accepted solver step.
- **The contract.** Every target has an observation model, and a frozen contract matches its dataset's hash.

## 7. What the language cannot yet say

- One spatial dimension only.
- A layer whose own thickness changes, such as the growing oxide, has no grid of varying length; the oxide is a state, not a field. A front moving into a material is followed on a grid that travels with it.
- A drift velocity that varies with position.
- The pre-oxidation clean is recorded with a program but no process can read it yet.
- Nothing in the language says *why* a number is what it is. It says what a number is labelled, and where it came from.

## 8. What the language can predict

The language names 34 observables. Each serves one of the challenge's four targets:

- **layer thickness** (Oxide, interlayer and consumed-substrate thicknesses.): Consumed_alloy, Consumed_substrate, Core_diameter, Si_oxidized, Thickness
- **composition profile** (Composition against depth across the interface.): Enriched_layer_efold_width, Enriched_layer_extent, GeO2_fraction, Ge_at_10nm, Ge_at_30nm, Ge_at_interface, O16_interface, O18_film, O18_fraction_at_13A, O18_fraction_at_22A, O18_fraction_at_5A, O18_interface, O_film_total, Si_at_front, Si_in_grid
- **trap density** (Interface trap density, at midgap or against energy.): Dit, Dit_at_0p20eV_above_Ev, Dit_at_0p30eV_above_Ev, Dit_at_0p3eV_below_Ec, Dit_at_0p40eV_above_Ev, Dit_at_0p4eV_below_Ec, Dit_at_0p55eV_above_Ev, Dit_at_0p5eV_below_Ec, Dit_at_0p70eV_above_Ev, Dit_at_0p80eV_above_Ev, Normalized_Pb
- **fixed charge** (Fixed oxide charge.): Nf, Qf, Qss

Which interface each program covers, how well it did on held-out data, and which cells of the challenge have no program at all, is in the essay's scorecard.
