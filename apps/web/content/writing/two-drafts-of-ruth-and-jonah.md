# Two machine drafts of Ruth and Jonah in Kamano-Kafe — and what the checks see in each

A translation team in the Eastern Highlands of Papua New Guinea has finished its New Testament and wants a first draft of the next books. Two kinds of machine can produce one today. One is a translation model fine-tuned on the team's own text — the way SIL's Serval service drafts for Paratext projects. The other is an agent harness — a language model held to the original-language source, a lexicon and a battery of checks, which is how we draft the [RBS](/writing/translating-the-bible-with-an-ontology) editions. We ran both on the same two books, from the same target-language material, and scored both against the team's own translation of those books.

This page records exactly what each system was, so the numbers can be compared with what we end up with when either is run at full strength. Neither draft is published, and neither is Scripture. Both are machine drafts that no speaker of Kamano-Kafe has read.

## The test

| | |
| --- | --- |
| Language | Kamano-Kafe (ISO 639-3 `kbq`), Eastern Highlands Province, Papua New Guinea |
| The team's text | the Kamano-Kafe Bible in the eBible corpus (`kbq-kbq`), © Tyndale Bible Translators, **CC BY-SA**. Whole Bible: 23,006 OT verses, 7,950 NT verses |
| What both systems may learn from | the team's **New Testament only** — the case of a team that has finished its NT and starts the Old |
| What both systems draft | **Ruth and Jonah**, held out: neither system ever reads the team's version of them |
| Reference | the team's own Ruth and Jonah, 132 verses |
| Why this language | an open licence that allows training and measurement, a complete human translation to score against, and a language none of the models we use knows |

The team's Ruth and Jonah are the answer key. They are never shown to either drafter. This is the one property a fair comparison needs, and the only one that makes the scores mean anything.

## System A — a fine-tuned NLLB, Serval-style

Serval is SIL's open-source machine-translation service (MIT licence). Its training job is published as SIL's `machine.py` library, and we ran that library ourselves on a laptop GPU. We did not use Serval's hosted service.

| | what we ran | what Serval's production job runs |
| --- | --- | --- |
| Library | SIL `machine.py` 1.9.2, `HuggingFaceNmtModelTrainer` / `HuggingFaceNmtEngine` | the same library |
| Base model | `facebook/nllb-200-distilled-600M` (Serval's *development* setting) | `facebook/nllb-200-distilled-1.3B` |
| Source side | World English Bible (`eng-engwebp`, public domain) | the team's chosen source text |
| Target tag | `kbq_Latn`, a new language token added to the tokenizer (NLLB-200 has no Kamano-Kafe) | the same mechanism |
| Training pairs | 7,944 NT verse pairs | the team's finished books |
| Steps × batch | 3,000 × 16 (8 per device, 2 accumulated), 6.0 epochs | 5,000 × 64 (≈ 40 epochs here) |
| Optimizer, schedule | Adafactor, linear, 200 warm-up steps | AdamW, cosine, 1,000 warm-up steps |
| Regularisation | none | label smoothing 0.2, batches grouped by length |
| Precision, memory | fp16, gradient checkpointing | fp16 + tf32, gradient checkpointing |
| Unknown characters | added on the target side | added on both sides |
| Decoding | beam 2 | beam 2 |
| Hardware, time | RTX 5070 Laptop (8 GB), 219 minutes | a server GPU |
| Final training loss | 2.18, still falling | — |
| Cost | $0 | — |

**Our run is a small version of Serval, and it is not the production setup.** The full model does not fit on an 8 GB card. We chose Adafactor because AdamW's optimizer state does not fit beside the 600M weights. Training stopped while the loss was still falling. So the NLLB numbers below are a floor for what Serval would do with this New Testament, not an estimate of it.

NLLB's weights are licensed CC BY-NC. Nothing NLLB produced enters RBS, and its drafts would belong to the team's project, not to us.

## System B — our agent harness

This is the harness that drafted the American English, Spanish and experimental Tar Melbene (Naba) editions. Every step is the same: the plan, the tools, the checker and the revise loop. Only the target language and its lexicon are new.

| | |
| --- | --- |
| Source | the frozen original-language tokens (`wlc-ne1904`: Westminster Leningrad Codex Hebrew/Aramaic and NE1904 Greek, one record per verse with Strong's number, parsing and transliteration) |
| Plan | `packages/translation-orchestration`: source tokens → STEPBible lexicon → names → syntax outline, word senses, passage context → draft → alignment repair → checks → up to three revise rounds → best pass → proposal |
| Analysis | MACULA syntax outline and UBS word senses for every verse (`--analysis on`); the knowledge base's passage context (`--context on`); passage events where the snapshot has them (Jonah; Ruth has none) |
| Models | **Claude Haiku 5.5** for the draft and all three revise rounds; no Sonnet, no Opus |
| Chunking | 3 verses at a time (the closed-lexicon setting that worked best for Naba) |
| Brief | `kbq-pilot-v1`, generated from the ontology (`ontology/bible-translation.data.ttl`) like every RBS brief |
| Checker | `translation-mcp`, `CHECKER_VERSION 2026-10-20.23`, closed-lexicon mode: a word that isn't in the lexicon blocks, and so does a gap |
| What the drafter never sees | any translation of the passage, the team's Ruth and Jonah, the book/chapter/verse reference |
| Cost, time | **$0.23** for 133 verses (3.55M input / 0.19M output tokens), about 4 minutes at concurrency 6 |

The new piece is the **target lexicon**. A model cannot invent Kamano-Kafe, so the harness runs in the closed-lexicon mode built for Tar Melbene. Every word of the draft must be a form the team itself wrote in its New Testament. The lexicon is built by code, with no model involved:

1. Our statistical aligner, eflomal 2.0, aligns each of the team's 7,938 NT verses to our Greek tokens in both directions, and keeps the intersection. That gives **1,666 Greek lemmas** with the Kamano-Kafe words that render them. For example, God → *anumzamofo*, Jesus → *Jisasi*, sea → *hagerimpi*.
2. Ruth and Jonah are Hebrew, so a Hebrew word reaches those Kamano-Kafe words **through the Septuagint**. MACULA Hebrew (CC BY 4.0, Biblica/Clear) records on every Hebrew word which Greek lemma the Septuagint uses for it. Hebrew Strong's → Septuagint Greek → the team's word gives **3,338 Hebrew lemmas**. For example, יהוה (the LORD) → κύριος → *Ra*; בַּיִת (house) → οἶκος → *nompi*.
3. All **24,951** word forms of the team's NT are the closed vocabulary. In this pilot, "attested" means "the team has written this form".
4. **Names**: each of the 30 people and places in Ruth and Jonah is resolved to one referent by our scripture knowledge base. Where the team's NT names that referent, the drafter is given the team's spelling, matched by letters (*Boasi*, *Betlehemi*, *Ruti*, *Jona*, *Ninive*, *Jopa*) — 17 of 30. The other 13 (Naomi, Elimelech, Moab, Orpah …) the NT never names, so the English label stands as a marked placeholder. The team spells a new name; the drafter does not.

No English and no other Bible's wording enters the lexicon. The World English Bible is NLLB's source side, but our harness never sees it.

## The checks, run the same way on all three

The trust-layer check (`scripts/trust-layer-check.py`) is deterministic, uses no model, and costs nothing.
- It aligns the team's whole Bible except Ruth and Jonah to our source tokens, and learns which Kamano-Kafe words render each source word and which words are grammar words.
- It then reads every verse of Ruth and Jonah — the team's, NLLB's and ours — for content the source has that nothing renders, added words, missing names, and missing numbers.
- A finding means "a reviewer should look", never "the translation is wrong". The team's own translation is the baseline for how often a finished human text trips each check.

## Results

| | the team (human) | NLLB pilot | our harness |
| --- | --- | --- | --- |
| verses | 132 | 132 | 133 |
| **chrF3** against the team's text | — | **39.5** | 20.3 |
| chrF2 | — | 39.9 | 21.5 |
| BLEU | — | 4.1 | 0.06 |
| words written | 3,159 | 2,890 | 1,854 (plus 75 gaps) |
| words the team's NT also contains | 83.1% | 92.6% | 96.4% |
| name findings | 14 | 45 | 60 |
| source content nothing renders | 73 | 84 | 10 * |
| added words | 278 | 185 | 33 * |
| verses with no finding | 53% | 39% | 64% * |

\* *Not a win.* The check learns its word lists the same way the harness built its lexicon, so the harness's own words pass it almost by construction. Read these three rows as a property of how the check works, not as evidence our draft is better. The rows that compare fairly are chrF, BLEU, length and the name findings.

chrF is the character-level score SIL reports (chrF3 weights recall), computed with sacreBLEU 2.6.0 over the 132 verses. Gap markers are removed from the harness draft before scoring, so a gap counts as missing text.

### Reading it

**On this test, the fine-tuned model is the better drafter, by a wide margin.** NLLB writes Kamano-Kafe sentences. Its verbs end clauses the way the team's do, its endings attach, and in places it lands close to the team's wording. Our harness writes the right words, mostly in their dictionary forms, in an order a speaker would not use, with a gap wherever the lexicon had nothing. A translation model that has read 7,944 verses of a language learns its grammar. A language model handed a word list does not.

Ruth 1:1 and Jonah 1:2 from all three:

> **Ruth 1:1 — the team:** Korapa'ma keaga refakohu vahe'mo'za (jasi) mopa kva hu'naza knafi, tusi'a zamagate'za Juda mopare fore higeno, mago nera Betlehemu, Juda mopareti ne'mo, osi'agna Moapu umaniku nenarone, tare ne'ane zamavareno vu'ne.
>
> **NLLB:** Hagi ke refakohu kva vahe'mo'za refko hu'naza knafina, ana mopafina agate'za fore hu'ne. Magora Juda kazigati Betlehemu kumateti nera, nenaro ene tare ne' mofavre'ane Moabi mopare umani'naze.
>
> **our harness:** fore kna refko fore agate'za mopafi vuo nera Betlehemi Juda mani'naza hozafi Moab ana ara tare mofavre

> **Jonah 1:2 — the team:** Otinka tusi'a rankumate Ninive vunka, kefo avu'ava'ma nehaza zankura kezatinka Anumzamo'a keaga huneramante hunka zamasmio. Na'ankure kefo zamavu'zamava'ma hu'nazana hago Nagra ke'noe.
>
> **NLLB:** Otinka Ninive rankumamofona vunka, ana kumamofo kea ome huama huo, na'ankure havi avu'avazamo'a nagrite ko eri fore hu'ne.
>
> **our harness:** Otino vuo huno Ninive rankumate tusi'a tamagima ha na'ankure mrerino havi avugosa

*Kamano-Kafe text © Tyndale Bible Translators, CC BY-SA. The two machine drafts are derived from it and are shown here under the same licence.*

**The harness also made an error a check should have caught.** In Jonah 3:4 it rendered "forty days" with *100'a* (NLLB wrote 40 correctly). Kamano-Kafe writes most numbers as numerals with a suffix, and the pilot's language profile declares no number words, so our numbers check had nothing to hold the draft to. That gap in our profile is a fault and is now on the list.

### What the checks found in the machine drafts

Some findings come from translation freedom: the team itself trips the name check 14 times, at Moab, the LORD and the Almighty, where it words a phrase its own way. Against that baseline, the checks point at real problems in NLLB's draft, with no knowledge of the language:
- **The LORD**: the team renders יהוה consistently. NLLB drops or changes that rendering **28 times** in 132 verses; the team's own text trips the check 4 times.
- **Moab**: NLLB writes *Moabi*, carried over from its English source, where the team writes *Moapu* — a source-language spelling leaking through.
- **Tarshish**: NLLB drops it from Jonah where the source names it.

These are the mistakes a translation team most needs flagged in a machine draft. A source-anchored check finds them without anyone on the checking side reading Kamano-Kafe.

The check also missed one. NLLB spells Naomi *Noemi* 14 times and *Neomi* twice — inconsistent with itself, and unlike the team's *Naomi*. Naomi never appears in the New Testament, so the check had no learned spelling to compare against. Checking a name against the knowledge base's referent and against the draft's own consistency would catch it, and needs no model.

## What this says about where an agent harness belongs

For a language no model knows, with a finished New Testament to learn from, **the drafting step belongs to a fine-tuned translation model**. Ours did not come close, and more Haiku turns would not change that: the grammar is not in the lexicon.

What the harness side brings is everything around the draft:
- **source-anchored checks** that flag dropped divine names, source-language spellings and dropped content in a language the checker does not speak;
- **a provenance record for every draft verse** — what produced it, what it was trained on, its findings, its stage, a fingerprint of its text;
- **a published, repeatable comparison** — this page.

The combination to test next is the obvious one: **NLLB (or Serval) drafts, and our checks and revise loop work on its draft**, with the team deciding.

## What would change these numbers

| change | expected effect | status |
| --- | --- | --- |
| NLLB at Serval's production setting (1.3B, 5,000 × 64, cosine, label smoothing) | NLLB's scores rise; ours stay put | needs a larger GPU, or Serval itself |
| Training on everything the team has finished except Ruth and Jonah (here, the OT too) | NLLB much closer to the team | a different scenario, run on its own |
| NLLB drafts → our checks → our revise loop | the comparison that matters next | not yet built |
| Number words and a name-consistency check in the Kamano-Kafe profile | catches *100'a* and *Noemi* | on the list |
| A speaker's review of either draft | the only real quality judgement | the team's call |

## Reproducing it

Everything except the eBible corpus and the outputs is in the repository. The outputs stay outside it, in `~/eval-store/ebible/pilot-kbq/`.

```
# NLLB (machine.py), ~3.7 h on an 8 GB GPU
~/.venvs/mms/bin/python scripts/serval-pilot.py --tgt kbq-kbq --src eng-engwebp --steps 3000 --books RUT,JON

# the harness's lexicon and names from the team's NT (eflomal + MACULA's LXX bridge), then seed the MCP
~/.venvs/align/bin/python scripts/build-kbq-pilot-data.py
python3 -I scripts/build-kbq-pilot-names.py
npx tsx scripts/seed-rendering-lexicon.mts kbq      # and POST name-renderings.kbq.json to /admin/name-renderings

# the harness, Haiku 5.5 only
npx tsx scripts/translate-bible.mts --books Ruth,Jonah --target pilot-kbq --variety kbq --analysis on --context on \
  --pericopes off --chunk 3 --drafter anthropic:claude-haiku-5-5 --reviser anthropic:claude-haiku-5-5 --reviser2 anthropic:claude-haiku-5-5

# the same checks over all three, with chrF/BLEU
~/.venvs/align/bin/python scripts/trust-layer-check.py --harness ~/eval-store/ebible/pilot-kbq/harness/harness.tsv
```

Inputs, fingerprinted: `kbq-kbq.txt` sha256 `c5fe607f605b7b9d…`, `eng-engwebp.txt` `a9cbd39e2cf499d3…`, eBible corpus commit `c531ff2`. Software: torch 2.11.0 (CUDA 12.8), transformers 4.47.1, sil-machine 1.9.2, eflomal 2.0.0, sacreBLEU 2.6.0. The numbers are recorded in `evaluations/results/trust-layer/kbq-pilot-2026-10-20.json`. One caveat: eflomal is stochastic, so the check's per-verse findings on the human text moved between 45% and 53% verses-with-no-finding across runs. The drafts and chrF/BLEU do not move.
