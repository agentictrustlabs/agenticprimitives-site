# The vocabulary: what the ontology calls things

*Companion to [Questions we need Emily to answer](/writing/questions-for-emily-testing-a-theory-of-the-interface). Written 10 November 2026. Generated from the ontology's own files; this page is not edited by hand.*

The ontology has two vocabularies. **67 domain terms** are the field's words that the language can name, so that a model reasoning in it uses the field's terms and not ours. **36 working terms** are the quantities, process factors and operator kinds that the programs and claims actually use.

Two things to know before reading the tables.

- **The definitions of the 67 were written by the AI agent from general knowledge. They have not been checked by a person.** Whether a term is supported is not decided by the agent: a script searches the text of the sources in our library for the term's words as a phrase. "The sources' own term" means at least two sources use it; "one source's term" means one does; "no source in the library" means none does, so it comes from general knowledge alone.
- Of the 67 domain terms, 49 are the sources' own, 12 are one source's, and **6 have no source** (e-prime-center, gate-oxide-integrity, hydrogen-chloride, interlayer-thickness, nitric-oxide-anneal, off-axis-angle). Of the 36 working terms, 28 are the sources' own, 2 are one source's, 4 join two of the sources' terms, 1 is the challenge statement's, and 1 is ours.

## What we would like Emily to check

1. Mark any term a practitioner would not use, or would use differently. Say what they would say instead.
2. For the terms marked *no source in the library*: is the term right and the definition right? These are the ones most likely to carry our memory of the field and not the field's own words.
3. Anything missing that a process engineer would expect to find in each group.
4. Whether Qss, Nf and Qf, which sources use for the same or different charges, should stay separate (the ontology keeps the source's symbol and treats the quantity as distinct).

## The 67 domain terms

### Quantities (19): things that are measured or computed

| Term | Definition (agent, unverified) | Support | Sources (of how many) |
|---|---|---|---|
| threshold-voltage | Gate voltage at which the channel forms. | the sources' own term | Deal and Razouk 1980, Faruque 2016, [Fukuda 1992](https://doi.org/10.1063/1.351665), [Goncharova 2011](https://doi.org/10.1103/physrevb.83.115329) and 4 more (8) |
| breakdown-field | Electric field at which the oxide fails. | the sources' own term | Faruque 2016, [Fukuda 1992](https://doi.org/10.1063/1.351665), [Goto and Hijikata 2016](https://doi.org/10.1088/0022-3727/49/22/225103), Hung 1987 and 2 more (6) |
| channel-mobility | Carrier mobility in the inversion channel; lowered by interface defects. | the sources' own term | [Goto and Hijikata 2016](https://doi.org/10.1088/0022-3727/49/22/225103), [Hijikata 2013](https://doi.org/10.5772/50748), [Kobayashi 2017](https://doi.org/10.1063/1.4980024), [Li et al. 2023](https://doi.org/10.3390/nano13091568) and 2 more (6) |
| refractive-index | Refractive index of the oxide film; tracks its density. | the sources' own term | Faruque 2016, [Hijikata 2013](https://doi.org/10.5772/50748), Kao, Part I report (DTIC ADA181721), Kobeda and Irene report (DTIC ADA169602) and 2 more (6) |
| flat-band-voltage | Gate voltage at which the semiconductor bands are flat; shifts with oxide charge. | the sources' own term | Deal and Razouk 1980, [Fukuda 1992](https://doi.org/10.1063/1.351665), Murali 1988, [Osullivan 2001](https://doi.org/10.1063/1.1343897) and 1 more (5) |
| suboxide | Silicon in oxidation states between the element and the dioxide, found at the interface. | the sources' own term | Bashouti 2013, [Goncharova 2011](https://doi.org/10.1103/physrevb.83.115329), [Li et al. 2023](https://doi.org/10.3390/nano13091568), Thornton 2022 and 1 more (5) |
| transition-region | The thin region across which composition changes from substrate to oxide. | the sources' own term | [Goncharova 2011](https://doi.org/10.1103/physrevb.83.115329), Hung 1987, Raider and Berman 1978, [Raider and Flitsch 1978](https://doi.org/10.1147/rd.223.0294) and 1 more (5) |
| mobile-ionic-charge | Charge of ions such as sodium that move in the oxide under bias and temperature. | the sources' own term | Deal and Razouk 1980, Hung 1987, [Razouk and Deal 1979](https://doi.org/10.1149/1.2129333), Vitkavage and Irene 1990 (4) |
| oxide-trapped-charge | Charge held on traps in the bulk of the oxide. | the sources' own term | Deal and Razouk 1980, Hung 1987, [Razouk and Deal 1979](https://doi.org/10.1149/1.2129333), Vitkavage and Irene 1990 (4) |
| oxygen-vacancy | A missing oxygen in the oxide network. | the sources' own term | [Fukuda 1992](https://doi.org/10.1063/1.351665), [Hijikata 2013](https://doi.org/10.5772/50748), Stanford SUPREM report 1982 (DTIC ADA121414), Wang 2017 (4) |
| capture-cross-section | Cross-section with which an interface state captures a carrier. | the sources' own term | Deal and Razouk 1980, Hung 1987, [Johnson et al. 1981](https://doi.org/10.1116/1.571070) (3) |
| carbon-cluster | Carbon left at or near the SiC/oxide interface. | the sources' own term | [Gupta and Akhtar, InTech chapter on SiC oxidation](https://doi.org/10.5772/20465), [Li et al. 2023](https://doi.org/10.3390/nano13091568), Yano and Kimoto 2002 (3) |
| near-interface-traps | Oxide traps near the interface, the usual term on SiC. | the sources' own term | [Goto and Hijikata 2016](https://doi.org/10.1088/0022-3727/49/22/225103), [Hijikata 2013](https://doi.org/10.5772/50748), [Li et al. 2023](https://doi.org/10.3390/nano13091568) (3) |
| film-stress | Stress in the oxide film. | the sources' own term | Kobeda and Irene report (DTIC ADA169602), Vitkavage and Irene 1990 (2) |
| interface-roughness | Roughness of the boundary between substrate and oxide. | the sources' own term | Faruque 2016, Hung 1987 (2) |
| oxide-density | Mass density of the oxide film. | the sources' own term | [Krzeminski 2012](https://doi.org/10.1063/1.4729410), Vitkavage and Irene 1990 (2) |
| border-traps | Traps in the oxide close enough to the interface to exchange charge with the substrate. | one source's term | [Fukuda 1992](https://doi.org/10.1063/1.351665) (1) |
| germanium-pile-up | Germanium accumulated at the oxide interface when silicon is oxidized selectively. | one source's term | [Rabie 2005](https://doi.org/10.1063/1.2060927) (1) |
| interlayer-thickness | Thickness of a layer that forms between a deposited dielectric and the substrate. | no source in the library | none |

### Processes (21): things done to a specimen

| Term | Definition (agent, unverified) | Support | Sources (of how many) |
|---|---|---|---|
| wet-oxidation | Oxidation in the presence of water vapour. | the sources' own term | [Deal 1967](https://doi.org/10.1149/1.2426565), [Deal and Grove 1965](https://doi.org/10.1063/1.1713945), Faruque 2016, [Gupta and Akhtar, InTech chapter on SiC oxidation](https://doi.org/10.5772/20465) and 14 more (18) |
| dry-oxidation | Oxidation in oxygen with little water. | the sources' own term | [Deal and Grove 1965](https://doi.org/10.1063/1.1713945), [Goto and Hijikata 2016](https://doi.org/10.1088/0022-3727/49/22/225103), [Gupta and Akhtar, InTech chapter on SiC oxidation](https://doi.org/10.5772/20465), [Hijikata 2013](https://doi.org/10.5772/50748) and 13 more (17) |
| native-oxide | The thin oxide present on a surface before deliberate oxidation. | the sources' own term | Bashouti 2013, Faruque 2016, [Gupta and Akhtar, InTech chapter on SiC oxidation](https://doi.org/10.5772/20465), [Hijikata 2013](https://doi.org/10.5772/50748) and 9 more (13) |
| forming-gas-anneal | A low-temperature anneal in dilute hydrogen. | the sources' own term | Deal and Razouk 1980, [Gupta and Akhtar, InTech chapter on SiC oxidation](https://doi.org/10.5772/20465), [Osullivan 2001](https://doi.org/10.1063/1.1343897), [Reed 1989](https://doi.org/10.1088/0268-1242/4/12/003) and 3 more (7) |
| post-oxidation-anneal | An anneal after oxidation and before metallization. | the sources' own term | Deal and Razouk 1980, Hung 1987, Kobeda and Irene report (DTIC ADA169602), Murali 1988 and 3 more (7) |
| nitridation | Incorporation of nitrogen into the oxide or interface. | the sources' own term | Faruque 2016, [Kobayashi 2017](https://doi.org/10.1063/1.4980024), [Krzeminski 2007](https://doi.org/10.1063/1.2711764), [Li et al. 2023](https://doi.org/10.3390/nano13091568) and 2 more (6) |
| cooling-rate | Rate of cooling from the process temperature. | the sources' own term | [Hayamizu, patent EP0562783](https://patents.google.com/patent/EP0562783A1/en), [Kobayashi 2017](https://doi.org/10.1063/1.4980024), [Osullivan 2001](https://doi.org/10.1063/1.1343897), [Razouk and Deal 1979](https://doi.org/10.1149/1.2129333) and 1 more (5) |
| ramp-rate | Rate of heating to the process temperature. | the sources' own term | Faruque 2015, Faruque 2016, Hung 1987, Vitkavage and Irene 1990 and 1 more (5) |
| rapid-thermal-oxidation | Oxidation in a lamp-heated single-wafer system, in seconds to minutes. | the sources' own term | David 2015, [Deal and Grove 1965](https://doi.org/10.1063/1.1713945), Murali 1988, [Osullivan 2001](https://doi.org/10.1063/1.1343897) and 1 more (5) |
| water-vapor | Water in the process gas. | the sources' own term | [Deal 1967](https://doi.org/10.1149/1.2426565), [Deal and Grove 1965](https://doi.org/10.1063/1.1713945), Mayo and Evans 1979, [Ryu and Tomozawa 2006](https://doi.org/10.1016/j.jnoncrysol.2006.07.005) and 1 more (5) |
| substrate-doping | Dopant type and concentration of the substrate. | the sources' own term | Kao, Part I report (DTIC ADA181721), [Osullivan 2001](https://doi.org/10.1063/1.1343897), Stanford SUPREM report 1982 (DTIC ADA121414), Stanford SUPREM report (DTIC ADA130105) (4) |
| atomic-layer-deposition | Layer-by-layer chemical deposition of a dielectric. | the sources' own term | Faruque 2016, [Goncharova 2011](https://doi.org/10.1103/physrevb.83.115329), [Li et al. 2023](https://doi.org/10.3390/nano13091568) (3) |
| electron-beam-evaporation | Metal deposition by electron-beam heating; can damage the oxide. | the sources' own term | Deal and Razouk 1980, Faruque 2016, [Johnson et al. 1981](https://doi.org/10.1116/1.571070) (3) |
| radiation-damage | Defects made by ionizing radiation during processing. | the sources' own term | [Johnson et al. 1981](https://doi.org/10.1116/1.571070), Stanford SUPREM report 1982 (DTIC ADA121414), Vitkavage and Irene 1990 (3) |
| post-metallization-anneal | An anneal after the gate metal is deposited. | the sources' own term | Deal and Razouk 1980, Vitkavage and Irene 1990 (2) |
| gate-metal | Material and deposition method of the gate electrode. | one source's term | Hung 1987 (1) |
| germanium-fraction | Germanium content of a SiGe alloy. | one source's term | Rabie et al. 2005 (1) |
| total-pressure | Total pressure of the process gas. | one source's term | Wang et al. 1994 (1) |
| hydrogen-chloride | HCl added to the oxidizing gas. | no source in the library | none |
| nitric-oxide-anneal | An anneal in NO, used on SiC to lower trap density. | no source in the library | none |
| off-axis-angle | Miscut angle of a SiC wafer from the basal plane. | no source in the library | none |

### Mechanisms (12): things that happen inside it

| Term | Definition (agent, unverified) | Support | Sources (of how many) |
|---|---|---|---|
| linear-parabolic | Growth law with a reaction-limited linear regime and a diffusion-limited parabolic regime. | the sources' own term | Faruque 2016, [Goto and Hijikata 2016](https://doi.org/10.1088/0022-3727/49/22/225103), [Gupta and Akhtar, InTech chapter on SiC oxidation](https://doi.org/10.5772/20465), [Hijikata 2013](https://doi.org/10.5772/50748) and 5 more (9) |
| interdiffusion | Mutual diffusion of two species, as silicon and germanium. | the sources' own term | David 2015, Faruque 2016, [Goncharova 2011](https://doi.org/10.1103/physrevb.83.115329), [Rabie 2005](https://doi.org/10.1063/1.2060927) and 3 more (7) |
| oxidant-diffusion | Diffusion of the oxidizing species through the oxide. | the sources' own term | Bashouti 2013, [Goto and Hijikata 2016](https://doi.org/10.1088/0022-3727/49/22/225103), Kao, Part I report (DTIC ADA181721), [Rabie 2005](https://doi.org/10.1063/1.2060927) and 2 more (6) |
| hydrogen-diffusion | Diffusion of hydrogen through the oxide. | the sources' own term | Mayo and Evans 1979, [Osullivan 2001](https://doi.org/10.1063/1.1343897), [Reed 1989](https://doi.org/10.1088/0268-1242/4/12/003) (3) |
| carbon-emission | Emission of carbon atoms from the SiC interface during oxidation. | the sources' own term | [Goto and Hijikata 2016](https://doi.org/10.1088/0022-3727/49/22/225103), [Hijikata 2013](https://doi.org/10.5772/50748) (2) |
| strain-relaxation | Loss of strain in a layer. | the sources' own term | David 2015, [Muller 2023](https://doi.org/10.1088/1361-6528/aca419) (2) |
| viscous-flow | Flow of the oxide at high temperature, relieving stress. | the sources' own term | Kao, Part I report (DTIC ADA181721), Kobeda and Irene report (DTIC ADA169602) (2) |
| depassivation | Loss of hydrogen from passivated defects. | one source's term | [Stesmans and Afanasev 1996](https://doi.org/10.1088/0953-8984/8/36/002) (1) |
| germanium-condensation | Enrichment of germanium under a growing silicon oxide. | one source's term | David 2015 (1) |
| isotope-exchange | Exchange of oxygen isotopes between gas and film. | one source's term | [Goncharova 2011](https://doi.org/10.1103/physrevb.83.115329) (1) |
| silicon-emission | Emission of silicon atoms from the interface during oxidation. | one source's term | [Hijikata 2013](https://doi.org/10.5772/50748) (1) |
| gate-oxide-integrity | Resistance of a gate oxide to breakdown. | no source in the library | none |

### Defects (5): what electrical measurements are about

| Term | Definition (agent, unverified) | Support | Sources (of how many) |
|---|---|---|---|
| dangling-bond | An unsatisfied bond on a silicon atom. | the sources' own term | [Fukuda 1992](https://doi.org/10.1063/1.351665), [Gupta and Akhtar, InTech chapter on SiC oxidation](https://doi.org/10.5772/20465), Hung 1987, [Johnson et al. 1981](https://doi.org/10.1116/1.571070) and 4 more (8) |
| pb-center | A silicon dangling bond at the Si/SiO2 interface, seen by spin resonance. | the sources' own term | [Fukuda 1992](https://doi.org/10.1063/1.351665), [Kobayashi 2017](https://doi.org/10.1063/1.4980024), [Osullivan 2001](https://doi.org/10.1063/1.1343897), Vitkavage and Irene 1990 (4) |
| pb0 | The dangling-bond centre on (111) and one of two on (100). | one source's term | [Osullivan 2001](https://doi.org/10.1063/1.1343897) (1) |
| pb1 | The second dangling-bond centre on (100). | one source's term | [Osullivan 2001](https://doi.org/10.1063/1.1343897) (1) |
| e-prime-center | An oxygen-vacancy centre in the oxide seen by spin resonance. | no source in the library | none |

### Techniques (10): how things are measured

| Term | Definition (agent, unverified) | Support | Sources (of how many) |
|---|---|---|---|
| ellipsometry | Optical measurement of film thickness and index. | the sources' own term | Faruque 2016, [Goto and Hijikata 2016](https://doi.org/10.1088/0022-3727/49/22/225103), [Gupta and Akhtar, InTech chapter on SiC oxidation](https://doi.org/10.5772/20465), [Hijikata 2013](https://doi.org/10.5772/50748) and 10 more (14) |
| capacitance-voltage | Measurement of capacitance against gate voltage. | the sources' own term | [Deal 1967](https://doi.org/10.1149/1.2426565), Faruque 2016, Hung 1987, [Kobayashi 2017](https://doi.org/10.1063/1.4980024) and 6 more (10) |
| x-ray-photoelectron-spectroscopy | Surface-sensitive measurement of chemical state. | the sources' own term | Bashouti 2013, Faruque 2016, Hung 1987, [Li et al. 2023](https://doi.org/10.3390/nano13091568) and 4 more (8) |
| transmission-electron-microscopy | Imaging of cross-sections at atomic scale. | the sources' own term | Bashouti 2013, Hung 1987, Kao, Part I report (DTIC ADA181721), [Li et al. 2023](https://doi.org/10.3390/nano13091568) and 3 more (7) |
| quasi-static | Low-frequency capacitance-voltage method used for midgap state density. | the sources' own term | [Johnson et al. 1981](https://doi.org/10.1116/1.571070), [Kobayashi 2017](https://doi.org/10.1063/1.4980024), [Li et al. 2023](https://doi.org/10.3390/nano13091568), Murali 1988 and 2 more (6) |
| electron-spin-resonance | Detection of unpaired electrons; counts dangling bonds. | the sources' own term | [Fukuda 1992](https://doi.org/10.1063/1.351665), [Johnson et al. 1981](https://doi.org/10.1116/1.571070), [Osullivan 2001](https://doi.org/10.1063/1.1343897), [Reed 1989](https://doi.org/10.1088/0268-1242/4/12/003) and 1 more (5) |
| conductance-method | Extraction of state density from ac conductance. | the sources' own term | [Osullivan 2001](https://doi.org/10.1063/1.1343897), Yano and Kimoto 2002 (2) |
| deep-level-transient-spectroscopy | Capacitance transient method for trap levels. | the sources' own term | [Johnson et al. 1981](https://doi.org/10.1116/1.571070), [Reed 1989](https://doi.org/10.1088/0268-1242/4/12/003) (2) |
| medium-energy-ion-scattering | Depth-resolved composition by ion scattering. | the sources' own term | [Goncharova 2011](https://doi.org/10.1103/physrevb.83.115329), [Song 2004](https://doi.org/10.1063/1.1690097) (2) |
| secondary-ion-mass-spectrometry | Depth profiling by sputtering and mass analysis. | one source's term | [Johnson et al. 1981](https://doi.org/10.1116/1.571070) (1) |

## The 36 working terms

These are used by the programs, the claims and the findings. A source's own words for the same thing are shown where the term itself is not in its text.

| Term | Kind | Standing | Sources (of how many) | The sources say instead |
|---|---|---|---|---|
| oxidation-temperature | factor | the sources' own term | Bashouti 2013, David 2015, [Deal 1967](https://doi.org/10.1149/1.2426565), [Deal and Grove 1965](https://doi.org/10.1063/1.1713945) and 32 more (36) | - |
| oxidation-time | factor | the sources' own term | Bashouti 2013, David 2015, [Deal and Grove 1965](https://doi.org/10.1063/1.1713945), Faruque 2015 and 24 more (28) | - |
| orientation | factor | the sources' own term | Bashouti 2013, [Deal 1967](https://doi.org/10.1149/1.2426565), Deal and Razouk 1980, Faruque 2016 and 22 more (26) | Si face, C face |
| growth-rate | factor | the sources' own term | [Deal 1967](https://doi.org/10.1149/1.2426565), Faruque 2016, [Fukuda 1992](https://doi.org/10.1063/1.351665), [Goncharova 2011](https://doi.org/10.1103/physrevb.83.115329) and 16 more (20) | - |
| anneal-temperature | factor | the sources' own term | Bashouti 2013, [Deal 1967](https://doi.org/10.1149/1.2426565), Faruque 2016, [Fukuda 1992](https://doi.org/10.1063/1.351665) and 11 more (15) | annealing temperature |
| laboratory | factor | the sources' own term | Deal and Razouk 1980, Faruque 2015, Faruque 2016, [Fukuda 1992](https://doi.org/10.1063/1.351665) and 10 more (14) | - |
| processing-conditions | factor | the sources' own term | Deal and Razouk 1980, Faruque 2016, [Fukuda 1992](https://doi.org/10.1063/1.351665), [Goncharova 2011](https://doi.org/10.1103/physrevb.83.115329) and 6 more (10) | - |
| ge-concentration | factor | the sources' own term | David 2015, Ganster 2012, Long 2012, [Muller 2023](https://doi.org/10.1088/1361-6528/aca419) and 3 more (7) | - |
| hydrogen-anneal | factor | the sources' own term | [Fukuda 1992](https://doi.org/10.1063/1.351665), Hung 1987, [Kobayashi 2017](https://doi.org/10.1063/1.4980024), [Razouk and Deal 1979](https://doi.org/10.1149/1.2129333) and 3 more (7) | - |
| compressive-stress | factor | the sources' own term | Bashouti 2013, Kao, Part I report (DTIC ADA181721), Kobeda and Irene report (DTIC ADA169602), [Krzeminski 2012](https://doi.org/10.1063/1.4729410) and 2 more (6) | viscous flow, stress in the oxide |
| cooling-rate | factor | the sources' own term | [Hayamizu, patent EP0562783](https://patents.google.com/patent/EP0562783A1/en), [Kobayashi 2017](https://doi.org/10.1063/1.4980024), [Osullivan 2001](https://doi.org/10.1063/1.1343897), [Razouk and Deal 1979](https://doi.org/10.1149/1.2129333) and 1 more (5) | - |
| vacuum-anneal | factor | the sources' own term | [Fukuda 1992](https://doi.org/10.1063/1.351665), [Johnson et al. 1981](https://doi.org/10.1116/1.571070), [Osullivan 2001](https://doi.org/10.1063/1.1343897), [Reed 1989](https://doi.org/10.1088/0268-1242/4/12/003) and 1 more (5) | vacuum annealing, anneal in vacuum |
| oxygen-pressure | factor | the sources' own term | [Goto and Hijikata 2016](https://doi.org/10.1088/0022-3727/49/22/225103), [Hijikata 2013](https://doi.org/10.5772/50748), Mayo and Evans 1979, [Song 2004](https://doi.org/10.1063/1.1690097) (4) | - |
| final-anneal | factor | the sources' own term | Stanford SUPREM report 1982 (DTIC ADA121414), Stanford SUPREM report (DTIC ADA130105) (2) | - |
| inert-anneal | factor | the sources' own term | Kobeda and Irene report (DTIC ADA169602), [Osullivan 2001](https://doi.org/10.1063/1.1343897) (2) | inert ambient, anneal in nitrogen, argon anneal, nitrogen anneal |
| oxide-thickness-grown | factor | the sources' own term | Stanford SUPREM report 1982 (DTIC ADA121414), Stanford SUPREM report (DTIC ADA130105) (2) | - |
| pre-oxidation-clean | factor | the sources' own term | Mayo and Evans 1979, [Osullivan 2001](https://doi.org/10.1063/1.1343897) (2) | - |
| thermal-history | factor | the sources' own term | [Ryu and Tomozawa 2006](https://doi.org/10.1016/j.jnoncrysol.2006.07.005), Stanford SUPREM report (DTIC ADA130105) (2) | - |
| fictive-temperature | factor | one source's term | [Ryu and Tomozawa 2006](https://doi.org/10.1016/j.jnoncrysol.2006.07.005) (1) | - |
| hydrogen-during-cooling | factor | built from the sources' terms | [Osullivan 2001](https://doi.org/10.1063/1.1343897) (1) | cooling rate, presence of hydrogen |
| nanowire-diameter | factor | one source's term | [Muller 2023](https://doi.org/10.1088/1361-6528/aca419) (1) | NW diameter |
| slow-pull-in-oxygen | factor | built from the sources' terms | Deal and Razouk 1980 (1) | slow pull, pull rate |
| surface-diffusion-front | factor | ours | none | - |
| OxideGrowth | operator_kind | the sources' own term | Bashouti 2013, [Deal and Grove 1965](https://doi.org/10.1063/1.1713945), Faruque 2015, Faruque 2016 and 21 more (25) | interface moves |
| Transport | operator_kind | the sources' own term | Bashouti 2013, David 2015, [Deal and Grove 1965](https://doi.org/10.1063/1.1713945), Faruque 2015 and 15 more (19) | - |
| Relaxation | operator_kind | the sources' own term | David 2015, [Deal and Grove 1965](https://doi.org/10.1063/1.1713945), Ganster 2012, Hearn and Schwuttke 1975 and 9 more (13) | equilibrium, decay |
| Passivation | operator_kind | the sources' own term | Bashouti 2013, Deal and Razouk 1980, [Fukuda 1992](https://doi.org/10.1063/1.351665), [Goncharova 2011](https://doi.org/10.1103/physrevb.83.115329) and 8 more (12) | - |
| Exchange | operator_kind | the sources' own term | David 2015, Faruque 2016, Ganster 2012, [Goncharova 2011](https://doi.org/10.1103/physrevb.83.115329) and 4 more (8) | - |
| DefectGeneration | operator_kind | the sources' own term | [Kobayashi 2017](https://doi.org/10.1063/1.4980024), [Osullivan 2001](https://doi.org/10.1063/1.1343897), Stanford SUPREM report 1982 (DTIC ADA121414) (3) | - |
| oxide-thickness | quantity | the sources' own term | David 2015, [Deal 1967](https://doi.org/10.1149/1.2426565), [Deal and Grove 1965](https://doi.org/10.1063/1.1713945), Deal and Razouk 1980 and 30 more (34) | - |
| fixed-charge | quantity | the sources' own term | Deal and Razouk 1980, [Fukuda 1992](https://doi.org/10.1063/1.351665), Hung 1987, [Kobayashi 2017](https://doi.org/10.1063/1.4980024) and 8 more (12) | - |
| interface-state-density | quantity | the sources' own term | Deal and Razouk 1980, [Goto and Hijikata 2016](https://doi.org/10.1088/0022-3727/49/22/225103), [Hijikata 2013](https://doi.org/10.5772/50748), [Kobayashi 2017](https://doi.org/10.1063/1.4980024) and 6 more (10) | interface states, interface trap density |
| composition-profile | quantity | the sources' own term | [Johnson et al. 1981](https://doi.org/10.1116/1.571070), Long 2012 (2) | concentration profile, depth profile |
| density-of-dangling-bonds | quantity | built from the sources' terms | [Fukuda 1992](https://doi.org/10.1063/1.351665) (1) | dangling bond, Pb center |
| consumed-substrate | quantity | the challenge's own term | none | consumed |
| interface-state-density-after-hydrogen-anneal | quantity | built from the sources' terms | none | forming gas anneal, post metallization anneal |

Source counts are of the sources in our library whose text has been read (49 with a text layer; 3 more are scans and are not searched). Where a source name has no link it has no checked link: see the library for the full citation.
