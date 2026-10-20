# Tar Melbene has no Bible, and the model does not know the language.

Ask a large language model to translate John 1:1 into Naba and it will give you a fluent sentence in about a second. The sentence will not be Naba. We measured it. Five current models, asked for sixty words of the language with no help, scored zero. Forced, they offered one or two, and those were Arabic loans a speaker of the region's trade language would recognise. Fluency here is not knowledge. It is the model writing a language it has read — Arabic, French, English — and hoping.

This is the account of what we did instead, in one night and the morning after, for Tar Melbene (ISO 639-3 `mne`), the name its speakers use for the language also called Naba and Bilala. There is no Tar Melbene Scripture. The draft that exists is an experiment. It is labelled as one, on every verse, and no speaker has seen it. It is not a translation, and this page does not present it as one.

It uses the same ontology as [the English edition](/writing/translating-the-bible-with-an-ontology). The difference is the rule that edition was built to survive: a model may arrange attested material. It may not supply a word from memory.

![The Tar Melbene draft loop: open sources become a gated lexicon, then rows on the same ontology, then a draft that may only arrange attested words, then checks and a labelled release.](/writing/naba/process-loop.svg)

## The language, from the paper that describes it

The written description is Elaine Marie Scherrer's [*A phonological description of Naba*](https://doi.org/10.15460/auue.2022.95.1.255) (Afrika und Übersee 95, 2022, CC BY 4.0). Its first page is the description we worked from, not a summary we invented.

![Title page of Elaine Marie Scherrer, A phonological description of Naba, Afrika und Übersee 95, 2022. CC BY 4.0.](/writing/naba/scherrer-2022-title.png)

Naba, or Melbene, also called Bilala, is a Nilo-Saharan language of the Bongo-Bagirmi group, Central Sudanic branch. It is spoken in the Batha-Est region of central Chad by about 410,000 people across three ethnic groups. The relatives that already have documentation, the paper says, are Kenga, Bagirmi and Sar. Chadian Arabic is the trade language around it, which is why religious and abstract vocabulary arrives as loans, and why a model that "knows" the region reaches for those loans first.

The paper describes the phonemic inventory, the syllable and what may stand in it, the tone system and how tone interacts with other processes, and the lexical and post-lexical processes. Its special claim is a sonority hierarchy: affricates and non-sibilant fricatives group with the stops as obstruents; nasals, liquids and approximants are the sonorants; and the two sibilants /s/ and /z/ sit on a level of their own between the two, because they cannot be classed with either. That hierarchy is what drives the syllable, the sandhi, and a set of processes that change a word once it is no longer said alone.

Two glossed sentences in the paper closed gaps we had been marking by hand. "Go" is *ɓawo*, in a sentence about going to a field. Existence and location are carried by *utu*, glossed "exist", and by postpositions — not by a verb "to be" of the kind English uses in "the word was God." Those are linguistic examples. They are not Scripture, and they still have to be reconciled with the dialect and the spelling a community actually writes.

What the paper and the 2021 talk together let us state, as a working description:

| Fact | What we hold | Source |
| --- | --- | --- |
| Names | Tar Melbene / Melbene (the speakers' preferred name); Naba; Bilala | Scherrer 2022 first page; 2021 talk |
| ISO / Glottolog | `mne` · `naba1253` | ISO 639-3; Glottolog |
| Family | Nilo-Saharan › Central Sudanic › Bongo-Bagirmi (Bagirmi branch) | Scherrer 2022 |
| Relatives with documentation | Kenga, Bagirmi, Sar | Scherrer 2022 |
| Speakers | about 410,000, three ethnic groups | Scherrer 2022, citing Eberhard et al. |
| Where | Batha-Est, central Chad | Scherrer 2022 |
| Trade language | Chadian Arabic — religious and abstract words arrive as loans | the regional setting the sources describe |
| Scripture | none in this language | — |
| Consultant dialect of the paper | Yao sub-dialect (Bilala); consultant Abderhaman Daoud of Yao | Scherrer 2022 |
| Tone | lexical and grammatical; **not written** | Scherrer 2021 talk (community decision) |
| Basic order | subject–verb–object; noun before its modifiers | Scherrer 2022 §1.4 |
| Not yet ours to state | negation, questions, relative clauses, tense | no statement in these sources |

The paper's examples also give us a suffix table we can write down. Possessive and object: 1sg *-ma*, 2sg *-i*, 3sg *-n̰a* (written *-ca / -ja / -ya* after the consonant), 1pl *-ze / -zege*, 2pl *-se / -sege*, 3pl *-re / -rege*. Subject marking: prefixes for 1sg and 1pl on vowel-initial verbs only; suffixes for 2pl and 3pl on any verb; 2sg and 3sg unmarked, so a third-person verb is the bare form and *ya* is the optional pronoun. Location and existence: *utu* "exist", *ti* "at, in", *te* "to / with", *taara* "above", *derg* "under". Numbers seen in the sources: *fene* "one", and a "ten two" construction for twenty.

## The orthography is a recorded decision, not a guess

The other open source is the video. Scherrer's talk [*Lexical phonology and the participatory development of the Naba orthography*](https://zenodo.org/records/5395439) (15th Nilo-Saharan Linguistics Colloquium, University of Edinburgh, 4 August 2021; [doi:10.5281/zenodo.5395439](https://doi.org/10.5281/zenodo.5395439), CC BY 4.0) is the record of how the orthography was built with speakers, and of the processes the writing is meant to show.

![Zenodo record 5395439: Lexical phonology and the participatory development of the Naba orthography, 15th Nilo-Saharan Linguistics Colloquium, 4 August 2021. CC BY 4.0.](/writing/naba/zenodo-talk.png)

What the draft is held to, from that talk and the paper together:

- Five vowels, a e i o u. Long vowels are written double. Tone is not written. That last one is a community decision, not an omission.
- The palatal nasal is *n̰* — an n with a combining tilde below — and never *ny*. *y* is the glide. *j* is only the affricate.
- Nearly every word is underlyingly vowel-final. In a sentence, most words drop that vowel. A long vowel left before the drop is shortened. A third-person object *-n̰a* changes shape after the consonant before it. *h* hardens to *k* or *g* in context. Some of these changes are written; some are heard and not written. Which words drop the vowel is lexical: it is learned from attested pairs, and an unknown stem is reported, never guessed.

The letters the draft may use, from the talk's consonant chart:

| | labial | alveolar | palatal | velar | glottal |
| --- | --- | --- | --- | --- | --- |
| stop | f, b | t, d | c /tʃ/, j /dʒ/ | k, g | h |
| prenasalised | mb | nd | nj | ng | |
| implosive | ɓ | ɗ | | | |
| fricative | | s, z | | | |
| nasal | m | n | n̰ /ɲ/ | ŋ | |
| liquid | | l, r | | | |
| approximant | w | | y /j/ | | |

Those rules are data. A small renderer applies them — isolation form in, in-context form out. Fitted to the talk's 18 examples it wrote 18 of 18, as it should: those examples *are* the rules. A model that writes *ny*, or marks tone, or keeps every word in its isolation shape, fails a check. The check is the orthography. The model is not.

Subject pronouns are optional. On the verb, first person singular and plural are marked on vowel-initial verbs, second and third plural by suffixes, and second and third singular are unmarked, so a third-person verb is the bare form and *ya* is the optional pronoun. A draft that needs negation, a question, a relative, or tense — none of them stated in these sources — says so. It does not borrow the English pattern and call it Naba.

## What may count as a word

The ontology is the same one the English edition uses. Persons, places and divine names are nodes, not strings. Concepts are senses of source words, with a rendering rule per language. The Hebrew and Greek of the frozen source — the Westminster Leningrad Codex and the Greek of the translation tables — are the units of coverage. A Tar Melbene rendering is a row on a node that already exists. It does not create a new node, and a language with no stem for a concept is not checked against the English stem. That would demand English words in a Naba verse.

What is new is the lexicon, and the rule for entering it.

![How a word enters a verse: a published CC BY source must write the form and the meaning, or the verse keeps a gap.](/writing/naba/word-gate.svg)

A form is **attested** only when a published source writes it and gives it a meaning. The open sources that cleared that bar, and the counts they gave us:

| Source | Licence | What we took |
| --- | --- | --- |
| Scherrer 2022, including Table 11 | CC BY 4.0 | **355** attested forms (stems, suffixes, glossed words) |
| Scherrer 2021 talk | CC BY 4.0 | **19** written examples; **22** word forms; the orthography rules |
| ASJP Naba–Kuka list | CC BY | **22** core words |

ASJP confirmed several words already in the paper and corrected one an earlier pass had guessed: "fire" is *fodu*. The same list, set beside the related languages it already contains, shows regular sound changes. A change of that kind can predict a candidate. A prediction is not an attestation. It does not enter a verse as a Tar Melbene word.

The paper also carries **81** interlinear glossed examples. Those are sentences, not a second lexicon: they are how we saw *ɓawo* "go" and *utu* "exist" in use, and how the renderer was checked.

Everything else is a candidate, and it is labelled as one. Heard in a public recording, proposed as a loan, inferred from a passage whose other words are known: each of those is a tier below attested, and none of them is written as if a source had settled it. A meaning with no published form is a **gap**, written in the verse as `[GAP: meaning]`. The gap is the record. Filling it with a word the model remembers would be the failure this whole system exists to prevent.

Coverage is stated against a denominator, and the denominator is the source, not the draft.

| Measure | Number | What it is |
| --- | --- | --- |
| Frozen source content tokens | 255,742 | nouns, verbs, adjectives in WLC + the tables' Greek |
| Lemmas those tokens belong to | 10,690 | the unit a lexicon entry can cover |
| Proper nouns, held apart | 35,353 | names, not mixed into the content share |
| Share with an attested candidate | **35.1%** | a published form shares a content word with the commonest English gloss — a proxy, not a translation |
| Next 100 / 500 / 1,000 uncovered lemmas | +14% / +26% / +32% of content tokens | what a speaker session or a larger lexicon would move |
| Models asked for 60 words, no help | **0 / 60** | Haiku 5.5, Sonnet 5, Opus 5.5, GPT-5.5, Fable 5.1 |
| Forced, Arabic loans only | 1–2 / 60 | the model writing the trade language |
| Experimental release | 926 verses | Jonah and John, labelled on every verse |

That 35.1% is not 35% translated. "A candidate exists for this meaning" is all the number says. The open gaps are the everyday core: day, city, before, stand, lift up, holy, sea, wind, gold, bread, build, blood. No open source we have found supplies them.

Two models agreeing on a loan is not a source. We did ask two model families, separately, which of the missing religious words were likely Chadian Arabic borrowings. Where they agreed, the proposal was kept as a proposal. It becomes a word in the draft only when the form also occurs in material we hold and the meaning occurs beside it. Code does that check. A model's confidence does not.

## How a verse is drafted

The translation loop is the one described in [Translating the Bible with an ontology](/writing/translating-the-bible-with-an-ontology), pointed at a language the drafter has never read.

![What the drafter may see: source tokens, attested Tar Melbene forms, and the orthography. What it must never see: an English Bible of the passage, a remembered Naba word, or unpublished collections.](/writing/naba/drafter-sees.svg)

The drafter sees the Hebrew or Greek tokens, their parsing, the lexicon entry for each Strong's number, the names resolved to nodes, and the Tar Melbene forms those nodes already have. It does not see an English Bible of the passage, and it does not see a Naba word that failed the source check. Its job is to arrange attested forms into the order the grammar allows, to apply the in-context writing rules, and to leave a gap where the lexicon has nothing. The alignment still runs from every content token to the span that renders it. A gap is an alignment to nothing, and the check says so.

The checker then does what it does for English, against this language's data rather than English word lists:

- Every content token is aligned, or the verse fails coverage.
- A word in the verse that no token accounts for, and that is not a function word the language profile lists, is an addition.
- A name is held to the rendering on its node. No rendering means the name is unresolved, not that the English name may stand in.
- The orthography check refuses a letter the alphabet does not have and a tone mark the community decided not to write.
- Negation, number and person are checked where the sources state the pattern. Where they do not, the check says it cannot tell. "Cannot tell" stays out of the score. It is not a pass.

What the checker cannot yet see is order. Naba's basic order is subject–verb–object. A drafter that follows the Greek will put the predicate where the Greek puts it. John 1:1 is the example, and it is published so the defect is visible.

## What a reader can open

The experiment is a release of the RBS family, the same family as the English edition, under its own edition id and its own version line. A reader does not need this essay to find it.

- The source picker at [explorer.faithnet.io](https://explorer.faithnet.io) lists **Tar Melbene (Naba) · experimental**, with Jonah and John, 926 verses.
- The same release is at [rbs.faithnet.io/mne](https://rbs.faithnet.io/mne).
- Every verse is marked experimental and carries its own note. The source bar says it is not Tar Melbene Scripture and that no speaker has seen it. A verse says what share of its words is attested, what share is an unconfirmed candidate, and which meanings are still missing.

John 1:1, as the draft stands:

> *ti [GAP: beginning] [GAP: to be] allen wu allen [GAP: to be] ti allah wu allah [GAP: to be] allen*

In the gloss we can give it: "in [the beginning] [was] the word, and the word [was] with God, and God [was] the word."

Two of those gaps are the language as the sources describe it. There is no attested verb "to be" for this use, and no attested word for "beginning." The last clause is the draft's fault. The Greek order has been kept, so it reads "God [was] the word" rather than the subject–verb–object order the paper states. The check names the gaps. It does not yet name the order. Both stay on the page. That is the point of publishing an experiment rather than a translation: a reader can see exactly which words a source stands behind, and which words nobody has supplied.

Jonah is the harder reading, because the book is full of the everyday words the lexicon does not have — right, pity, city, east, wind, the question. Those verses are mostly gaps, with a few attested words and a few candidates holding the frame. A verse that is 29% attested says 29%, and names what is still missing. It does not round itself up to a translation.

## What this is, and what it is not

It is a demonstration that the ontology carries to a language the model has never read. The nodes do not change. The source does not change. A new language is a lexicon with a rule of entry, an orthography with tests, a brief, and a release that says what it is. The English edition's guardrails still hold: nothing the drafter reads is another Bible's wording of the passage, nothing that decides "better" compares our wording to one, and a word the model merely remembers does not get in.

It is not Scripture, not a community translation, and not a claim that 35% of the Bible can now be read in Tar Melbene. Coverage is not correctness. No speaker has reviewed a verse. Negation and questions are not yet ours to state. The next words have to come from a speaker of the variety being written — short sentences, not a list of isolated glosses, checked against the orthography — or from further scholarship published under a licence that lets us use it. Until a source writes the form and the meaning, the gap stays a gap.

The sibling account, of the English edition and why a model must not recite the Bibles it remembers, is [Translating the Bible with an ontology](/writing/translating-the-bible-with-an-ontology).

`#AgenticPrimitives #Ontology #BibleTranslation #Naba #TarMelbene #OpenScholarship`
