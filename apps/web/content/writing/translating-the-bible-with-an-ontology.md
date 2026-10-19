# A machine translated the Bible from Hebrew and Greek. The hard part was making sure it didn't cheat.

Ask a large language model to translate John 3:16 from the Greek and it will give you a beautiful sentence in about a second. It will also, almost certainly, give you the sentence it has read ten thousand times in English Bibles — not a translation of the Greek in front of it, but a memory of what English Bibles say. For most purposes nobody minds. For a new edition of Scripture that claims to come from the source, it is the whole problem.

This is the story of how we built a system that translates the Bible from the original languages into a new American English edition (we call it `rbs`), why a model on its own could not do it honestly, and what it took instead: an ontology that describes the text, a translation loop that is held to that ontology, a test harness that measures the loop before it trusts it, and a workbench where people decide. Each piece exists because the job is genuinely hard. And the shape of the solution is not about the Bible at all.

*Updated 19 October 2026: the second complete draft of the whole Bible, concept rules found from data rather than hand-picked, and a full account — in its own section below — of how the translation is kept from creeping toward the English Bibles a model remembers, including the leak we found in our own knowledge base.*

## Why this is a tough job

Three things make Scripture translation unforgiving in a way most AI tasks are not.

**You cannot grade it against the answer key.** With most translation you check the output against a good human translation. Here the "good human translations" are exactly what the model must not copy. If you score the machine on how close it gets to the King James or the Berean Standard Bible, you are training it to recite. We needed a way to measure a translation against the *source* it came from — every Hebrew and Greek word accounted for, every negation carried, every number right, every name resolved to the right person — without ever rewarding resemblance to published English.

**Consistency has to hold across 31,000 verses and a thousand years of text.** "Judas" names six different men. "Jesus" and "Joshua" are one Greek word. The Hebrew word *ruach* is "wind" in one verse, "breath" in another, "Spirit" in a third, and "sides" of a building in a fourth. A translator — human or machine — working one chapter at a time has no way to keep these straight unless something outside the chapter remembers.

**Every choice has to be explainable.** A reader of a new edition is entitled to ask: why does this verse read differently from the others I know? "The model preferred it" is not an answer. The answer has to be a reason — a rule about a word, a decision about a name, a reading of the text — that a person made, recorded, and can revisit.

A language model has none of this by nature. It has fluency and memory. The system around it has to supply the rest.

## The approach, in one picture — animated

Press play. The town below is the whole system: six shelves of open scholarship on the left, the library (the ontology and its knowledge base) at the top, the skill workshop and the tool counter on the right, the harness floor in the middle where the Translation Agent works beside the model desk, the test lab on the lower left, and the workbench — where the people are — at the bottom. Fourteen scenes: how the sources become one description, how that description generates the skills, the tools and the plan, what happens to one passage of John 3 step by step (every tool call and every model call named), how the loop is measured, how people decide, and how their decisions go back into the library before the next passage runs.

```story
scene: translation
id: translation-loop-story
narration: /audio/translation-loop
```

Four parts. The **ontology** says what exists in the text and how it must be rendered. The **translation loop** drafts from the source under those rules and is sent back when a check fails. The **test harness** measures the loop and the checks themselves, with a floor and a ceiling, before any number is believed. The **workbench** is where people review, decide, and correct — and their corrections flow back into the ontology, not into a pile of notes. The rest of this essay walks the same loop in prose, with the numbers as they stand today.

## Part one: the ontology — describing the text once, so everything else can be held to it

An ontology is a formal description of a domain: what kinds of things exist, how they relate, what values a field may take, and the individual things themselves. Ours sits on the same foundations the rest of Agentic Primitives uses — W3C PROV-O for who did what, DOLCE for the difference between a *description* (a rule that should hold) and a *situation* (what actually happened), P-Plan for plans with steps — and adds a scripture layer on top.

What is in it today, and then — because a census is not an argument — the passages where each layer changes the English, or protects it:

- **Every person, place and being in the Bible as a node, not a name.** 3,129 persons with kinship and period; 1,007 places, 870 of them on a map; 477 narrative events with their participants; 78 collectives and 843 memberships. Built from open scholarship (STEP Bible, OpenBible, the Theographic project) and kept under their licences. The Judas who betrayed Jesus is one node in all four Gospels; the patriarch Judah is another. A rendering is a row on the node — so when a second target language comes, it adds rows, never nodes.
- **Every Hebrew and Greek word the source uses as a key term**, 5,168 of them, each opening a lexicon entry.
- **The syntax of the source, aligned to our frozen words.** Clear Bible's Macula trees — which words make a clause, which phrase is the subject, who a verb's agent and patient are, what a pronoun refers to — joined to the frozen tokens word by word. Every match is proven (identical, containing, or a recorded ketiv/qere), never assumed; 99.2% of 443,625 tokens carry a tree, and the 179 verses that do not are named, not bridged.
- **The sense each word has at each passage.** The United Bible Societies' open dictionaries divide every lexeme into senses and list the passages where it has each one. 25,751 senses, 411,287 occurrences mapped onto our tokens. This is what finally separated "wind", "breath", "Spirit" and "sides": a concept is a *sense* of a word, not the word. Measured on the first complete draft, a third of the terminology findings had been a concept's rule firing on a word in another sense; they are gone.
- **184 concepts whose definition is itself the rendering rule — one decision per idea, across both testaments.** "Eternal life, never everlasting, in John and the letters." "Baptize, never immerse, in the running text." "The referent decides the capital: Spirit, spirit, wind." Fifty-seven were written by hand. The other 127 were *found from data*: every word is placed in the dictionaries' semantic domains, joined to the Hebrew words the Septuagint renders by it (ἔλεος with חֶסֶד, ἔθνος with גּוֹי — the bridge the New Testament itself reads the Old through), and ranked by how inconsistently the draft renders it. A model drafts a rule for each family from that evidence; code checks what is decidable (the Strong's numbers, the senses it binds, every per-sense rendering against the rule's own stems, the verses a quotation pairs) and computes how much of the draft it would change; a reviewer decides. Death and dying, life, rulers, evil and disaster, knowing, strike, wrath beside fury (ὀργή and θυμός kept apart, so "the fury of his wrath" keeps two words), counting ("it was counted to him as righteousness" in Genesis 15:6 and in Romans 4, Galatians 3 and James 2 alike), choosing, rescue, distress, father, elder, hand over… Each rule is linked to the dictionary senses that denote it (πιστεύω "to entrust" is not Faith; φιλέω "to kiss" is not Love). Measured on the whole draft, the share of a word's occurrences rendered its usual way rose from 0.65 to 0.79 — and to 0.85 where a rule applies.
- **Each book and each passage in its context.** The 66 books with their testament, language, genres, audience, setting and purpose, and authorship as *attributed* claims — what tradition says, what the text's own heading says, where modern scholarship differs — never as a bare fact. For 15,637 verses, the narrative situation: what is happening, where, with whom, who is speaking. The drafter may read this and decide an unclear word by it, following the edition's recorded decisions.
- **God, the Son and the Holy Spirit as referents**, with the sixteen divine names as *forms* of them. יהוה becomes "the LORD" and אֱלֹהִים becomes "God" because those are two renderings of one node, not because a string matched.
- **The translation brief as a typed norm**: what the drafter may see, what it must never see, how gender language, group names and deity pronouns are handled — with a digest, so a run can say which version of the brief it ran under.
- **Decisions as nodes.** When the chair ruled that Ἰουδαῖοι in John is "the Jews" — never "the Jewish leaders", never "the Judeans", with a note where the authorities are meant — the ruling became a record on the concept (`renderAs` / `neverRenderAs`), the checker holds every draft to it, and the 36 verses of the first draft that had chosen otherwise are listed for revision. A human decision is a row the next run reads.

### What each layer does to a verse

The census above is a list. Here is what it *does*. Five layers, each with passages where the English would go wrong — or stay honest — because of that layer. The source is shown; the English is the difference that layer makes.

**1. Lexicon — what meanings does this source word have?**

The Hebrew word רוּחַ (*ruach*) is documented with meanings including wind, breath, and spirit. These are different uses of the same word, not a translator's preference.

| Passage | What is happening | The meaning that fits |
| --- | --- | --- |
| Genesis 8:1 | God causes *ruach* to pass over the earth as the floodwaters recede. | Wind |
| Ezekiel 37:5 | The dry bones are promised *ruach* so that they will live. | Breath — inside the vision's wider breath/spirit imagery |
| Job 15:13 | Eliphaz accuses Job of turning his *ruach* against God. | Spirit — Job's inward disposition |

The lexicon gives the translator the available meanings. The passage chooses which one fits. A rule that always rendered *ruach* as "spirit" would fail in Genesis 8:1 — and that is exactly the kind of rule a model, left to its memory of English Bibles, will apply.

A unit value can ride along with a word the same way. Exodus 16:36 says an עֹמֶר (*omer*) is one-tenth of an ephah. The record is: dry-volume measure; 1 omer = 0.1 ephah. That relationship is in the text. Converting it into litres is a further historical estimate, and the ontology keeps the two apart — the text's ratio is a fact; the litre figure is an estimate with a source.

**2. Names — which entity does this name identify?**

The Greek name Ἰησοῦς (*Iēsous*) is one spelling and three people.

| Passage | Person identified | Conventional English |
| --- | --- | --- |
| Matthew 1:21 | Mary's son | Jesus |
| Acts 7:45 | The leader associated with Israel's entry into the land | Joshua |
| Colossians 4:11 | Paul's coworker, also called Justus | Jesus |

The dictionary spelling cannot tell them apart. The names layer can: for Acts 7:45 it supplies the lemma Ἰησοῦς, the resolved person Joshua son of Nun, and the approved English "Joshua". The ontology node keeps Joshua, Jesus of Nazareth, and Jesus Justus as three referents. A model that has read a thousand English Bibles still has one English string for the Greek name; without the node it will write "Jesus" in Acts 7:45.

A divine-name example is Psalm 23:1, where the Hebrew is יהוה. A project that has decided "the LORD" produces "The LORD is my shepherd"; one that has decided "Yahweh" produces "Yahweh is my shepherd." The source name is the same; the output follows the project's convention, stored as a rendering on the node, not guessed from a glossary.

**3. Syntax — who is doing what, and how do the words connect?**

The opening of Genesis 22:7 reads וַיֹּאמֶר יִצְחָק אֶל־אַבְרָהָם אָבִיו.

| Source word | Basic meaning | Grammatical role |
| --- | --- | --- |
| וַיֹּאמֶר | spoke / said | Verb |
| יִצְחָק | Isaac | Subject |
| אֶל | to | Preposition introducing the addressee |
| אַבְרָהָם | Abraham | Addressee |
| אָבִיו | his father | Identifies Abraham's relationship to Isaac |

The source order is roughly "spoke Isaac to Abraham his-father." Natural English rearranges that to "Isaac spoke to Abraham his father." The syntax the drafter is shown is: clause order verb–subject–recipient; speaker Isaac; recipient Abraham; "his father" is Abraham, father of Isaac.

Two verses later, Genesis 22:9, Abraham is named earlier in the verse; the verb "bound" does not repeat his name. Isaac follows the direct-object marker אֶת. The tree identifies Abraham as the continuing subject and Isaac as the object. That is how syntax stops a model confusing the person acting with the person receiving the action — a swap no lexicon lookup would catch.

**4. Senses — which meaning applies at this occurrence?**

Jonah 3:10 is the same Hebrew word twice. הָרָעָה (*hara‘ah*) describes the people's way of life, from which they turn — their evil, their wicked conduct — and, in the same verse, what God had threatened to bring upon them: disaster, calamity. The Hebrew connects the two through related wording. An English translation can distinguish their evil conduct from the threatened disaster, and a note can keep the wordplay. The records are:

| Occurrence | Sense | Describes |
| --- | --- | --- |
| 1 | morally wrongful | their conduct |
| 2 | destructive calamity | the threatened outcome |

That is sense selection: applying the appropriate meaning to each occurrence of the same lemma. A concept rule keyed to the *word* would fire on both; a concept keyed to the *sense* fires on one.

Where the reading is genuinely open, the layer must not close it. רוּחַ אֱלֹהִים in Genesis 1:2 is "Spirit of God" or "wind from God" — two recognised competing readings. A responsible input preserves both candidates, with their supporting arguments, rather than presenting one interpretation as an uncontested dictionary fact. That is the 2,503 two-sense tokens counted later in this essay: left open, not silently resolved.

**5. Situation — who is speaking, to whom, and what is happening?**

Job 15:2 has imagery of windy knowledge and the east wind. The situation is: speaker Eliphaz; addressee Job; literary form a poetic dialogue; speech action a rhetorical challenge, a rebuke; immediate purpose to attack the value of Job's speech. Job 15:1 names Eliphaz as the speaker, and the following verses continue his criticism. That supports reading verse 2 as an accusatory rhetorical question, not a sincere request for information about wise people.

The wider book also matters. Job 42:7 rebukes Eliphaz and his companions for their speech about God. The ontology therefore records "Eliphaz asserts this about Job", rather than treating every accusation as an established fact about Job. That distinction is the narrative framing, stored as situation, not inferred by the model from the verse alone.

Jonah 3:1 marks the divine communication as occurring a second time. Its situation includes the earlier commission and Jonah's flight. That context lets the translator keep the force of a *renewed* commission, while keeping explanations of Jonah's motives separate from what this verse actually says.

These five are what the drafter is shown, as text, with no English of the passage in it. A model that has to account for *ruach* as wind here, for Ἰησοῦς as Joshua here, for Abraham as the one who binds and Isaac as the one bound, for *hara‘ah* as conduct in one clause and calamity in the next, and for Eliphaz as the one asserting, not the narrator as the one establishing — that model is being held to the source. One that is not shown them is reciting.

Licensing is a layer of its own: the sources that are CC BY feed the knowledge base; the share-alike ones (the dictionaries, the narrative events) live in their own named graphs, joined by identifier and never mixed in. The build refuses a source whose licence is not on the allow-list.

The discipline that makes this more than documentation: the skills the agent runs, the rules engine, the controlled vocabularies in the code, the policy register a theologian reads, and the plan the runtime executes are all *generated from* or *validated against* the ontology. Change the rule for a concept and the skill text changes, the checker changes, and the register changes — with a build that fails if any of them drift. One description, many projections.

## Part two: the translation loop — drafting from the source, held to the rules

The loop runs on one pericope at a time — a natural unit of text, cut from the section headings of a published edition's markup, 3,817 of them across the Bible, median eight verses — as a declared plan of steps. Every step is recorded as a provenance activity — inputs, outputs, model, cost, cache hits — so a run is a graph you can query, not a log you search. The drafter has three names for the models it may use: the *drafter*, the *reviser* (by default the same, cheap model), and a *second reviser* for the last round.

1. **Tokens.** The frozen Hebrew or Greek for the span: each word with its transliteration, its parsing and its Strong's number — never an English gloss. Frozen means content-committed; the system refuses to re-ingest a source whose upstream edition moved. The verses are labelled "v1 … v6" rather than by reference. Early on we hid the book entirely, because a model told the reference overlapped a published edition at 0.56 where two published editions overlap each other at 0.33. Today the drafter *is* told the book and what is happening in the passage — on a locked test set that lifted every measure, including independence from published editions — and whether that pulls the text toward a Bible is no longer assumed away: it is measured on every edition (see *Keeping the translation from creeping*, below).
2. **Lexicon and names.** For each word, its lexicon entry — and where the ontology has a concept rule, a divine-name convention or a unit value for it, that rule rides along. For each name, the node it resolves to and the rendering already decided for it.
3. **Syntax, senses, situation.** New since the first draft of the Bible: the clause outline from the syntax trees ("C1 (V-S): verb 1 · subject 2; C2: … [the doer is token 2]"), the sense each word has at this passage — left *open* where the dictionary gives two — and, when asked for, the passage's situation in its book. All of it rendered as text, with no English of the passage anywhere in it.
4. **Draft — the first model call.** The model is shown all of the above and the brief as a cached prefix, and must return the English for every verse and an alignment from every source word to the words that render it, as one compact string that names each source word as well as numbering it (`1 bereshit=In the beginning; 2 bara=created; 3 elohim=God`). The echo matters: a model that writes the right English often numbers it against the wrong word — a third of the "missing words" in the first Old Testament books were exactly that — and code now moves an entry to the word it named. The cheap model drafts and revises; a stronger one is called only for the rare passage the cheap one cannot finish.
5. **Repair and checks — code, not a model.** First a deterministic aligner binds the words whose English is already in the verse (names, glosses, a mis-numbered entry moved to the word it named), so no model call is spent on bookkeeping. Then the checks: is every source word accounted for? Was every negation carried? Are the numbers right, in a system that knows "three hundred" is 3 × 100 and "fourteenth" is 4 + 10? Does every name match its node's decided rendering? Is a word under a concept rule rendered with the rule's stem — *in the sense the dictionary gives it here*? Is there English with no source word behind it? And, separately, how much of the output coincides with published editions — measured per edition, reported, and never rewarded. A verse that is still word-for-word identical to a published Bible on the last check is blocking: it can never be proposed as checked.
6. **Revise — the second to fourth model calls.** Only when a check blocks. The model receives its own draft and the failing checks, with any recalled run of words forbidden verbatim, and re-emits every verse; the checks run again. Up to three rounds, all on the cheap model. The kept pass is the best one, not the last one — and a later pass over the passages still failing keeps, verse by verse, whichever version has fewer open checks, so a re-run can only improve what is published.
7. **Propose.** One proposal per verse into the edition store, carrying its alignments, its checks, which models drafted and revised it, the cost, and the run it came from. Where the dictionary left a reading genuinely open — καταλαμβάνω in John 1:5, *overcome* or *understand* — the plan is for a footnote that says so rather than a silent choice; 2,503 such tokens are counted. The status says `checked`. It never says approved.

The economics matter, because a Bible is 31,085 verses. The strong model drafting everything costs around $0.076 a verse. The second complete draft — the cheap model throughout, with the analysis, the context and the concept rules in its material, a stronger model only for seventeen long passages the cheap one kept leaving unfinished and a second model family for one passage a content filter refused (Zechariah 14's plague) — cost $49 for the whole Bible, about $0.0016 a verse. Two thirds of that is revision, and the third round removes barely a quarter of what the first does, so the next saving is to revise only the verses that fail rather than whole passages. That number is only safe because the checks, not the model, are what guarantee the floor; and the order of work is deliberate: ontology and deterministic code first, the cheap model where judgement is needed, the expensive model last.

**The first complete draft exists.** On 18 October a baseline of all 31,085 verses was frozen — drafted and revised by the cheap model, about $50, checker versions recorded per verse, every file pinned by hash, kept outside every repository. 70% of its verses carry no blocking check; most of the rest are the drafter's word-mapping, which the checker names. It is the thing every improvement is now compared against, verse by verse, under one checker version. The first such comparison was John: adding the syntax outline and the senses to the drafter's material, with an instruction not to name participants the outline reveals, took blocking verses from 205 to 117, unmapped source words from 170 to 71 and terminology misses from 67 to 11 — at lower cost, because fewer revisions were needed.

**The second complete draft** (19 October) ran the whole Bible with the analysis, the passage in context and the concept rules, and is the edition the public explorer now shows — every verse, each saying where it is in the process. Against the baseline, re-checked under one checker, verses with a blocking check fell by a quarter and rule misses by four fifths, with every section of the canon improving; the New Testament lost about 40% of its blocked verses, the law codes and lists of the Old Testament least, because their problems are names, numbers and formulas no concept rule touches. (A verse-matching bug in our comparison script, found while writing this, had over-counted both sides; the direction held, and the exact counts are being re-measured.)

## Part three: the test harness — measure the measurer first

Here is the part most AI projects skip, and the part that found every important mistake we made.

**The checker was wrong before the model was.** The first time we ran a respected public-domain human translation (the World English Bible) through our checks, 67% of its verses failed a blocking check. The Bible was not wrong; five of our rules were. Apostrophes came in two shapes. Our negation rule wanted one "not" per Hebrew negator, where English distributes one over "or." Our number rule could not compose. A rule that flagged "spirit" as a divine name fired on "poor in spirit." We fixed the rules until the human translation and the interlinear gloss both passed at 0.99 — and only *then* did we look at what the model produced.

**A planted-error suite prices every rule change.** 580 passages with a known error deliberately inserted — a dropped clause, a flipped negation, a swapped speaker, an added theological term, a changed number. The checker's catch rate per kind (0.93 overall today, unchanged through checker version .17) is reported on every change, so loosening a rule to stop a false alarm shows exactly what it stopped catching. Two kinds got worse when we fixed the pronoun rule; flipped person is still caught only 0.80 of the time, because there is no person–number check yet. We know which, and we say so. The five false alarms the John review found — εἰ μή's "except", an interrogative μή, μή as "stop", negative concord, a gentilic adjective read as a name — each became a grammar rule and a test, not a loosening.

**Experiments are pre-registered and never pooled.** A development set to tune on. A held-out set written once and locked, so it can be quoted. Arms declared in advance — the human translation as the ceiling, the word-for-word gloss as the floor, and the model variants between them. Deterministic graders first; a model-as-judge afterwards, with the judge's identity named on every number, because three judges read the same verses three different ways. Paired comparisons with confidence intervals. A run that fails for a reason that is not the agent's fault — a tool outage, a judge without a key — is recorded as such and kept out of the agent's score.

**Two things the harness caught about itself.** For a while every grader read the checks of the *blind first draft*, not of the proposal — so every revise arm was scored on text its revisions had replaced, and the production shape read worse than the plain draft. The graders read the proposal's checks now, a test pins it, and a re-grade script re-runs the deterministic graders over a stored result without re-walking it. And three newly planted error kinds scored zero not because the checker missed them but because the grader's catch map had no entry for them — the map is total now, by test.

**And the harness changed the system, not just the score.** Jonah went from one clean chunk in six to six in six when the revise pass was added. A critic from a second model family, added to raise fidelity, *lowered* independence and coverage at 2.4× the cost — because its revision was never sent back through the revise loop — so it is out of the production shape until that is fixed, and the measurement is what said so. The held-out numbers we quote today (73 pre-registered passages, 458 verses, judge named): fidelity checks 0.93, source coverage 0.87, independence from published editions 0.96, judged fluency 0.76 against the held human translation's 0.68 by the same judge. A second-family judge read the same verses within 0.02 on fidelity. And the most recent held-out run says the honest thing about the newest work: adding the syntax and the senses moved the *accounting* — more source words mapped, fewer rule misses — with every interval for judged meaning and fluency through zero. An improvement in bookkeeping is reported as an improvement in bookkeeping. The run after it — adding the passage in its context — lifted every measure on the same locked set, judged fidelity and fluency included; only independence from published editions cleared zero by its interval, and that is how we report it.

## Keeping the translation from creeping toward the Bibles the model remembers

A model that has read every English Bible will drift toward them, and it can do so by two routes. **Memory creep:** asked to translate, it writes what it has read. **Harness creep:** if the loop decides what is "better" by resemblance to a published Bible — a score against the King James, a judge who sees the Berean Standard Bible, a rule copied from one — then every improvement pulls the text one step closer to that Bible, and no single step looks wrong. The second is the more dangerous, because it is how a harness that works makes things worse. We close both routes with three rules, and we measure the result rather than trust it.

**1. Nothing the drafter reads contains an existing Bible's wording.** Its material is the Hebrew and Greek words with transliteration, parsing and Strong's numbers; a lexicon (STEPBible's, from Tyndale House); the dictionaries' senses; the syntax trees; our knowledge base and rules; and the book and passage context. We do not take this on faith: we assemble the actual material for real passages and test it against the published text of those verses and against the Berean interlinear's word glosses — the frozen Hebrew and Greek came from that interlinear's tables, so it is the closest source of contamination. The token list, senses, syntax and context carried none.

**The leak we found was our own.** The concept rules above were drafted by a strong model, and it wrote its examples from memory: thirty of the 127 rules carried a seven-word run of an existing Bible — whole verses as some translation renders them, inside a rule the drafter is told is binding. Ten of 120 translation notes did too. This is the lesson worth the most: a strong model *writing your rules* is as much a creep path as the model drafting the text. The fix is code, not a promise: every quoted or borrowed verse rendering (43 of them) is withheld from what the drafter reads, keeping the decided term ("counted … as righteousness") and the reference; the rule-drafter is told never to quote a Bible and its checks refuse a rule that does; and the build fails if anything the drafter reads carries a seven-word run of any held edition.

**2. Nothing that decides "better" compares our wording to an existing Bible.**

| What decides | What it compares against |
| --- | --- |
| The checks (coverage, negation, numbers, names, concepts) | The source words and the ontology |
| Revise, and which pass is kept | The checks |
| Which version of a verse is published | The fewest open checks |
| The judges of meaning and fluency | The source words and the draft — never an English Bible |
| The recall gate | Published Bibles — but only to *penalise* matching them |
| Similarity scores against the WEB, KJV and BSB | Published Bibles — a diagnostic only, used in no decision |

**3. Anything we train, we train on the source and our own text.** The statistical word aligner now being added — it maps English to Hebrew and Greek in seconds for the whole Bible and agrees with the drafter's own mapping on 97% of clean verses — learns only from our drafts against the source. No other Bible's wording can enter our text through it.

**And we measure it.** Two numbers, on every edition. First, a memorisation probe: asked to *recite* 300 random verses from memory, the cheap model reproduces 36% of the Berean Standard Bible's five-word runs and 56% of the World English Bible's; translating the same verses from the source, our text shares 27% with the first and 25% with the second — below what the model can recite on request, so the drafting is translation, not recall. Second, an independence guardrail: on the same verses, the share that carries a five-word run *only one family* of published Bibles has, where those Bibles disagree with each other. A translation from the source will converge with modern renderings in places; what must not happen is that share rising from one edition to the next. From the first draft to the second it went 74.1% → 74.9% for the Berean family, 44.3% → 43.2% for the King James line and 11.8% → 11.6% for the LSV — within the margin we allow, and the check refuses an edition that rises further.

None of this rewards being *different*, either. Agreeing with a published Bible is not a fault — "In the beginning God created the heavens and the earth" is what the Hebrew says. The edition departs from published Bibles only where a recorded decision explains why, and it matches them wherever the source leads there. What is prohibited is copying, not agreement.

## Part four: the workbench — where people decide, and decisions become data

No verse of `rbs` is approved by a machine. The workbench at workbench.faithnet.io is where a review team reads proposals verse by verse, each with its source, its checks, which model drafted it and which revised it, and a per-verse receipt of who decided what. Three people take a verse to publishable — one accepts, a second validates, a third approves — never the same person twice and never the proposer; disagreements go to a chair; every decision is a receipt over a hash of the exact text and alignments it approved, so an edit after approval makes every prior receipt visibly stale. Nothing is deleted: an undo is a compensating revision and a `revert` receipt. The server holds these rules, and the ontology states them.

Two things make it more than a review queue.

**Ask and Do.** A reviewer facing a verse with three blocking checks can ask a stronger model to explain, in plain language, whether the verse is wrong or the checker is. The answer comes back with a recommendation — accept, edit, reject, or *file a change request against the rule* — and a button that does it. The model that answered is named beside the answer. When the recommendation is "the checker is too broad here," it lands on a backlog that an administrator works off, with the verse, the check and the proposal as evidence. The review surface feeds the ontology.

**Corrections flow upstream, as requests with evidence.** A change to the knowledge base or the rules is a *change request* — the finding, the verse, the check — decided by a holder of that kind's role who is not its proposer. Accepted is not applied: applying it means editing the ontology source, passing preflight, and shipping a versioned release whose changelog names the findings it closes and whose projections — the skills, the checker's profile, the store's seed, the plan — are regenerated from it. The release is measured on the same pre-registered set as the one before; a release with no measurement is not a release. Then the next run of every verse that touches that node reads the correction. The loop closes through the ontology, not through someone's memory of what was decided in a meeting. The Ἰουδαῖοι ruling above is the worked example: raised in review, decided by the chair, shipped as scripture 1.3.1, held by checker .14, and the verses it changes listed by the comparison script.

## What is next, honestly

The direction is set by three rules: everything we build must carry to *other languages* through the ontology; deterministic tools and the ontology come before expensive models; and no model may reproduce an existing translation from memory. Under them, the queue is:

- **Word alignment by statistics, not by the model.** The aligner above, trained only on our own text, yields a rendering lexicon per language — for each source word, how our edition renders it. Used by the checker, it would clear about 1,900 of the verses still open, with no text changed and no model call. A second language gets its own lexicon from its own drafts.
- **Judging from the ontology.** A checklist per passage written from the source and the knowledge base — is the speaker kept, the negation, the number, the person and number of each verb, the concept rule — answered by a cheap model with a reason for each item, and combined by the same statistics and multi-judge consensus the rest of Agentic Primitives uses. The questions do not depend on English, so they carry to every language.
- **Deterministic checks for what the model gets wrong silently.** A verse carrying its neighbour's text (rare, but found: a few passages where verses shifted by one or two); a person–number check, the planted-error suite's known gap.
- **Language data out of code.** The checker's English word lists — numbers, negations, the words English adds by construction — move into the ontology, so a new language is data, not a rewrite.
- **Decisions made once.** Parallel passages (Kings and Chronicles, the Synoptic Gospels, the Old Testament quoted in the New) held to one rendering; the remaining concept families; the common words still rendered two ways for no recorded reason (city or town, man or person, wife or woman).

The two complete drafts exist and the workbench is live. Nothing of `rbs` has yet passed a human exegete; that is what the review team is for, and the reason the numbers above are the checker's and the judge's, and not a claim about the translation.

## Why this is not about the Bible

Strip the Scripture away and look at the shape.

A task where the obvious metric rewards the wrong behaviour. A domain where consistency must hold across a corpus far larger than any one context window. A requirement that every output be explainable to someone with the standing to overrule it. A cheap model that is good enough *if* something else guarantees the floor. A need to measure the measurement before trusting it.

That is clinical decision support. It is regulatory filings. It is contract review across a thousand agreements, financial reconciliation, grant writing against a funder's rules, incident response under a runbook. In every one of them the model is the easy part, and the hard part is the same four things: a single description of the domain that everything binds to; a loop held to that description by checks that run outside the model; a harness that measures the loop and the checks against a floor and a ceiling before quoting a number; and a place where people decide, whose decisions become data the next run reads.

That is what Agentic Primitives is. The Bible is the example where the thing being measured is a sentence of Scripture — which makes both the power of the approach and its limits today unusually easy to see.

The detailed account — the ten layers of the ontology, the plan step by step, the field comparison and the licence per layer — is the [Bible translation example](/examples/bible-translation).

`#AgenticPrimitives #Ontology #BibleTranslation #AIEvaluation #KnowledgeGraph #TrustworthyAI`
