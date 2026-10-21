# Two machines translated the same Greek into the same language. Deciding which did it better turned out to be the hard part.

A translation team in the Eastern Highlands of Papua New Guinea has a complete Bible in Kamano-Kafe. That makes the language an unusually good laboratory: there is a published human translation to measure against, openly licensed, and a frozen Greek and Hebrew source we already hold. So we built four machine translators into that language, held five complete books back from every one of them, and scored them.

The ranking was stable and unwelcome. Then we looked at what the scores were actually measuring, and the ranking stopped meaning what it appeared to mean.

This page records all of it, including the two things we predicted wrongly and the bug that cost one system a third of its score. None of these drafts is Scripture. No speaker of Kamano-Kafe has read a word of them.

## The setup

| | |
| --- | --- |
| Language | Kamano-Kafe (ISO 639-3 `kbq`), Henganofi and Kainantu districts, Papua New Guinea |
| The team's text | *Anumzamofo Ruotage Avontafere*, © 2022 Tyndale Bible Translators, CC BY-SA 4.0, as republished in the [BibleNLP eBible corpus](https://github.com/BibleNLP/ebible). 23,006 Old Testament verses, 7,950 New Testament |
| The source | Westminster Leningrad Codex and Nestle 1904 as the Berean tables carry them, pinned at one SHA, public domain. One edition id, `wlc-ne1904`, shared by every language we translate |
| Held out | Titus, Philemon, 2 John, 3 John, Jude — **123 verses in five complete books**, removed from every training set and every lexicon |
| Also drafted | Mark 1, 45 verses, reported separately because the rest of Mark stayed in training |

Complete books matter. Scattered held-out verses leak: a model that has seen the rest of a chapter has seen its vocabulary, its names and its idiom. Five whole books, none of them touched, is the only version of this test we would quote.

Holding data back from a neural model is easy — you leave it out of the training file. Holding it back from our own harness took more work, because our harness learns its target lexicon by statistically aligning the team's New Testament to the Greek. Those 123 verses had to come out of that alignment too, out of the attested-word list the checker uses, and out of the name list. Our lexicon went from 7,338 entries to 7,192 and was reseeded before the harness drafted anything. Without that step we would have been scoring our own training data.

## The four systems

**A. A translation model, trained on English.** SIL's open `machine.py` fine-tuning NLLB-200-distilled-600M on 7,938 verse pairs: the World English Bible on one side, the team's New Testament on the other. It then drafted Ruth and Jonah *from the English*. This is roughly what a commercial drafting service does for a Paratext project.

**B. The same model, trained on Greek.** The identical recipe with the source replaced: 7,770 pairs of Koine Greek beside the team's Kamano-Kafe. No English anywhere. NLLB has no Koine Greek tag — its 203 languages include Modern Greek and Modern Hebrew, not the ancient forms — so the Greek rides on the modern Greek embedding. Seven hours on a laptop GPU.

**C. Our agent harness.** A language model held to the source and to a battery of checks. At draft time it sees the source tokens with their morphology and Strong's numbers, a lexicon entry per number with its Kamano candidates and an evidence tier for each, every name resolved to a knowledge-base node, a clause-by-clause syntax outline, the sense each word carries at that passage, the passage's context, and a code-built starting draft. It may use only attested words. Where no word exists it must write a gap. Deterministic checks then run — does every source token have something rendering it, does every word in the draft have a source — and it gets three revision rounds.

**D. Both together.** B drafts, C revises. The neural draft is handed to our drafter as the baseline, with instructions to keep its wording wherever the source supports it and to change only what the source requires.

## What the scores said

Similarity to the team's own text, on the same 123 held-out verses:

| | chrF2 | chrF3 | BLEU | cost per verse |
| --- | --- | --- | --- | --- |
| B. NLLB trained on Greek | 38.56 | 38.53 | 3.03 | free, after one GPU run |
| D. Both together | 33.24 | 32.62 | 1.32 | $0.031 |
| C. Our harness alone | 25.15 | 24.45 | 0.09 | $0.027 |

And on Ruth and Jonah, where system A translated from English:

| | chrF3 | BLEU |
| --- | --- | --- |
| A. NLLB trained on English | 39.48 | 4.13 |
| C. Our harness | 20.67 | 0.06 |

**The first finding is a negative one about our own suspicion.** We assumed system A's lead was partly an artefact of the English pivot: it was translating the World English Bible, and the team's own translators had worked with English and Tok Pisin helps, so the two shared an ancestor. Twelve of the sixteen names whose Kamano spelling the team's New Testament gives are better reproduced by a rule that starts from the English label than by one that starts from the Hebrew, which is real evidence of that influence. But removing the pivot changed nothing: English-trained scored 39.5, Greek-trained 38.5. The gap was never about the pivot.

Here is why, in one verse. Titus 2:11, which neither machine had seen:

```
the team   Na'ankure Anumzamofo asunku zamo vahe avare'zana hakare vahete erino efore hu'ne.
NLLB       Na'ankure Anumzamofo asunku'zamo maka vahera zamaza hugahie huno eama hu'ne.
our arm    kamautim na'ankure ama asunku ama anumzamofo krina hu'ne maka vahe'mofo
```

The neural model writes a Kamano-Kafe sentence. It opens with the team's own `Na'ankure`, inflects `asunku'zamo` as a subject, chains to a final verb. Our harness has the right stems in roughly source order, uninflected, with a stray word at the front. The difference is not vocabulary. Our lexicon covers 93% of the source tokens in these books. The difference is that one system learned how this team builds sentences and the other was handed a word list and a grammar summary.

## Then we looked at what chrF was measuring

chrF compares character sequences between a draft and a reference. BLEU compares word runs. Both answer one question: how closely does this text resemble that text. Four things make that the wrong primary question here.

**There is exactly one Kamano-Kafe translation, so there is no ceiling.** For English we can score the World English Bible against the American Standard Version and learn what two legitimate independent translations of the same verse score against each other. That number is the ceiling, and anything near it is as good as a translation gets. For Kamano-Kafe no second translation exists. We cannot say whether the 38.5 to 24.5 spread is a quality difference or a stylistic distance, because we have no idea what a second human translator would have scored.

**BLEU is noise at this scale.** It needs exact four-word runs to match. In a language where one word carries subject, object, tense and clause-chaining, almost no four-word run recurs anywhere. The whole range we measured, 0.09 to 3.03, sits inside what is effectively zero.

**chrF rewards the stem and punishes the synonym.** Long suffix chains mean a draft that gets a stem right in the wrong grammatical form scores well, and a draft that chooses a correct different word scores badly. We hit this inside our own tooling: an automated test flagged Daniel 11:3 as dropping רַב when the translation renders it perfectly as "mighty", and 1 Kings 2:38 as dropping וַיֹּאמֶר when the verse says "answered" rather than the gloss's "replied".

**And the decisive one: the metric is one system's own objective.** A model fine-tuned on this team's parallel text is optimising exactly what chrF measures — write like this team. Our harness optimises something else entirely — account for every word of the source. Scoring both with chrF scores one of them on its own training objective and the other on a goal it was never given.

## A second measure, and the row that changes the picture

So we measured the other virtue. Our checks are reference-free: they align a draft to the frozen source statistically and ask whether every source token has something rendering it and whether every word in the draft has a source behind it. No second translation is needed. The same code runs on any language.

Then we ran those checks on the team's own published translation, to find out what the scale actually is.

| on the same 123 verses | source tokens nothing renders | words with no source | gaps marked |
| --- | --- | --- | --- |
| C. Our harness alone | 3 | 26 | 59 |
| D. Both together | 44 | 119 | 40 |
| **The team's own human translation** | **92–105** | **292–331** | 0 |

Read that bottom row twice. The published human translation, by the people whose language it is, leaves 92 to 105 source tokens with no word rendering them and adds 292 to 331 words that no token accounts for. That is not a criticism of their work. That is what translation is. A translator renders meaning across a clause, compresses, supplies what the target language requires, and drops what it cannot carry.

Which means our harness's three unaccounted tokens are not evidence of superior fidelity. They are evidence that it is not translating. It is glossing. The combination, at 44 and 119, is closer to how a human actually renders Greek while remaining twice as tight to the source as the humans are.

**One column no similarity metric can see.** The neural model marked zero gaps. Not because it knew every word, but because it cannot produce a gap — where it does not know, it invents something plausible. Our harness marked 59 gaps and the combination 40. Each one is a word the team is being asked to supply instead of a word quietly fabricated, and this is a real quality difference that scores 0.0 on every metric in the first table.

## What the combination actually does

We expected a blend. It is a selector, and that matters.

| what it did with each verse | verses | its chrF3 | the neural draft's chrF3 on the same verses |
| --- | --- | --- | --- |
| kept the partner's sentence | 53 (43%) | 39.2 | 39.3 |
| rewrote it | 40 (33%) | 33.5 | 37.1 |
| fell back to our literal draft | 30 (24%) | 24.5 | 39.7 |

On the 43% where our checks pass on the neural sentence, it keeps that sentence and loses nothing — 39.2 against the partner's 39.3 — while adding token alignments, coverage findings and gap marking that the partner cannot produce. That is the trust layer doing exactly its job.

The 24% is the bug. When the revision fails, the code was substituting its own word list and throwing away a neural draft that had scored 39.7. Fixing the fallback to keep the partner's sentence instead moved the overall score from 31.4 to 32.6 and the kept share from 25% to 43%. The remaining fallbacks are the drafter choosing to write literally despite being told not to, which is a prompt and model-capability problem rather than a plumbing one.

Two things had to change before the combination worked at all. The revision instruction had to move into the system prompt, because the translation brief lives there and its rule — use only the candidates listed for each token — was overriding a user-message instruction to keep the partner's wording. And the code-built starting draft had to be suppressed, because a second word-order-free draft sitting next to a fluent one simply competes with it. Before those two changes the combined draft was 12% similar to the partner and 85% similar to our own: it was ignoring the partner entirely while appearing to use it.

## So how should you decide which translation is better?

Not with a single number, and not primarily with similarity to an existing translation. What we would now propose, in order of weight:

**1. Accountability to the source, measured without a reference.** Does every source token have something rendering it? Does every word in the draft have a source behind it? Are names resolved to the right referent and rendered consistently? Are the numbers right? Is negation preserved? These are deterministic, language-independent, need no second translation, and are the questions a translation consultant asks first. Crucially they have a *calibration*: run them on an existing human translation of the same passage and you learn what a good score looks like. Our harness scoring far tighter than the humans was the signal that it was glossing rather than translating.

**2. Honest ignorance.** A draft that marks what it could not translate is more useful than a fluent draft that fills the hole. This is binary and easy to check, and no similarity metric registers it.

**3. Comprehension testing with speakers.** The field's own standard. Read the draft to speakers who have not seen the source and ask what it says. Nothing else establishes whether the meaning survived.

**4. Post-editing effort.** How much work does a human translator do to make the draft publishable? This is the only measure of a draft's actual value as a draft, and it is the one a team would care about most.

**5. Similarity to existing translations — as a diagnostic, never as the decider.** This was already our standing rule for the English edition, written down before this experiment: nothing that decides "better" may compare our wording to a held edition, and similarity to any existing Bible is a diagnostic only. This work is why that rule exists. A system optimised to match one translation will win on chrF and may still be the wrong tool.

We cannot do 3 or 4 ourselves. That is the honest limit of everything above, and it is why none of these numbers should be read as a verdict on translation quality. They are a verdict on two measurable properties, and the two properties disagree.

## What we would build

The product is the combination, not either half. A team that has finished part of their Bible can fine-tune a model on their own text and get drafts in their own voice, for the cost of one GPU run. What that model cannot do is tell them where it departed from the source, or admit when it did not know a word. Our layer does both, keeps the model's sentence on the 43% of verses where the source supports it, and flags the rest for a human.

For a team with no Scripture at all, neither half works. We measured that too, on Naba in Chad: 116 glossed sentences and phrases exist in the entire published record, against the 7,770 verse pairs this experiment used. Training is not possible, and the useful contribution is source-side help for human speakers rather than a draft.

---

**Provenance and limits.** The Kamano-Kafe text is © 2022 Tyndale Bible Translators under CC BY-SA 4.0; verses quoted above are from that edition, and our drafts are derived works, marked as changed, carrying the same licence. The NLLB-200 weights are CC BY-NC 4.0, which makes systems A, B and D research pilots and not publishable editions. The source tables are public domain. The trust checks' counts move between runs because the aligner is stochastic — the team's own 123 verses scored 0.447 and 0.512 clean in two runs minutes apart — so those counts are comparable within one scoring run and the chrF and BLEU figures across runs. Every number here comes from a recorded run; the words of each draft stay in our evaluation store and are not published.

An earlier version of this work, covering only systems A and C on Ruth and Jonah, was published and then withdrawn at the author's request because its comparison was not sound: the two systems were translating from different source languages. This page replaces it, and the held-out design is the reason we would stand behind these numbers.
