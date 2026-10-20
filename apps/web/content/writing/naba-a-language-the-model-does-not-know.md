# Tar Melbene has no Bible, and the model does not know the language.

Ask a large language model to translate John 1:1 into Naba and it will give you a fluent sentence in about a second. The sentence will not be Naba. We measured it. Five current models, asked for sixty words of the language with no help, scored zero. Forced, they offered one or two, and those were Arabic loans a speaker of the region's trade language would recognise. Fluency here is not knowledge. It is the model writing a language it has read — Arabic, French, English — and hoping.

This is the account of what we did instead, in one night and the morning after, for Tar Melbene (ISO 639-3 `mne`), the name its speakers use for the language also called Naba and Bilala. There is no Tar Melbene Scripture. The draft that exists is an experiment. It is labelled as one, on every verse, and no speaker has seen it. It is not a translation, and this page does not present it as one.

It uses the same ontology as [the English edition](/writing/translating-the-bible-with-an-ontology). The difference is the rule that edition was built to survive: a model may arrange attested material. It may not supply a word from memory.

## The language, from the paper that describes it

The written description is Elaine Marie Scherrer's [*A phonological description of Naba*](https://doi.org/10.15460/auue.2022.95.1.255) (Afrika und Übersee 95, 2022, CC BY 4.0). Its first page is the description we worked from, not a summary we invented.

Naba, or Melbene, also called Bilala, is a Nilo-Saharan language of the Bongo-Bagirmi group, Central Sudanic branch. It is spoken in the Batha-Est region of central Chad by about 410,000 people across three ethnic groups. The relatives that already have documentation, the paper says, are Kenga, Bagirmi and Sar. Chadian Arabic is the trade language around it, which is why religious and abstract vocabulary arrives as loans, and why a model that "knows" the region reaches for those loans first.

The paper describes the phonemic inventory, the syllable and what may stand in it, the tone system and how tone interacts with other processes, and the lexical and post-lexical processes. Its special claim is a sonority hierarchy: affricates and non-sibilant fricatives group with the stops as obstruents; nasals, liquids and approximants are the sonorants; and the two sibilants /s/ and /z/ sit on a level of their own between the two, because they cannot be classed with either. That hierarchy is what drives the syllable, the sandhi, and a set of processes that change a word once it is no longer said alone.

Two glossed sentences in the paper closed gaps we had been marking by hand. "Go" is *ɓawo*, in a sentence about going to a field. Existence and location are carried by *utu*, glossed "exist", and by postpositions — not by a verb "to be" of the kind English uses in "the word was God." Those are linguistic examples. They are not Scripture, and they still have to be reconciled with the dialect and the spelling a community actually writes.

## The orthography is a recorded decision, not a guess

The other open source is the video. Scherrer's talk [*Lexical phonology and the participatory development of the Naba orthography*](https://zenodo.org/records/5395439) (15th Nilo-Saharan Linguistics Colloquium, University of Edinburgh, 4 August 2021; [doi:10.5281/zenodo.5395439](https://doi.org/10.5281/zenodo.5395439), CC BY 4.0) is the record of how the orthography was built with speakers, and of the processes the writing is meant to show.

What the draft is held to, from that talk and the paper together:

- Five vowels, a e i o u. Long vowels are written double. Tone is not written. That last one is a community decision, not an omission.
- The palatal nasal is *n̰* — an n with a combining tilde below — and never *ny*. *y* is the glide. *j* is only the affricate.
- Nearly every word is underlyingly vowel-final. In a sentence, most words drop that vowel. A long vowel left before the drop is shortened. A third-person object *-n̰a* changes shape after the consonant before it. *h* hardens to *k* or *g* in context. Some of these changes are written; some are heard and not written. Which words drop the vowel is lexical: it is learned from attested pairs, and an unknown stem is reported, never guessed.

Those rules are data. A small renderer applies them — isolation form in, in-context form out — and it was tested blind on held-out pairs from the talk before any draft used it. A model that writes *ny*, or marks tone, or keeps every word in its isolation shape, fails a check. The check is the orthography. The model is not.

Basic order is subject–verb–object. A noun comes before its modifiers. Subject pronouns are optional; on the verb, first person singular and plural are marked on vowel-initial verbs, second and third plural by suffixes, and second and third singular are unmarked, so a third-person verb is the bare form and *ya* is the optional pronoun. Possessive and object suffixes are a table in the paper. We do not yet have, from these sources, a statement of negation, of questions, of relative clauses, or of tense. A draft that needs one of those and does not have it says so. It does not borrow the English pattern and call it Naba.

## What may count as a word

The ontology is the same one the English edition uses. Persons, places and divine names are nodes, not strings. Concepts are senses of source words, with a rendering rule per language. The Hebrew and Greek of the frozen source — the Westminster Leningrad Codex and the Greek of the translation tables — are the units of coverage. A Tar Melbene rendering is a row on a node that already exists. It does not create a new node, and a language with no stem for a concept is not checked against the English stem. That would demand English words in a Naba verse.

What is new is the lexicon, and the rule for entering it.

A form is **attested** only when a published source writes it and gives it a meaning. The open sources that cleared that bar are the 2022 paper, the 2021 talk, and the ASJP database (CC BY), which carries a twenty-two-word Naba list. ASJP confirmed several words already in hand and corrected one an earlier pass had guessed: "fire" is *fodu*. The same list, set beside the related languages it already contains, shows regular sound changes. A change of that kind can predict a candidate. A prediction is not an attestation. It does not enter a verse as a Tar Melbene word.

Everything else is a candidate, and it is labelled as one. Heard in a public recording, proposed as a loan, inferred from a passage whose other words are known: each of those is a tier below attested, and none of them is written as if a source had settled it. A meaning with no published form is a **gap**, written in the verse as `[GAP: meaning]`. The gap is the record. Filling it with a word the model remembers would be the failure this whole system exists to prevent.

Coverage is stated against a denominator, and the denominator is the source, not the draft. Of the content tokens in the frozen Hebrew and Greek — nouns, verbs, adjectives, proper nouns held apart — 35% have a candidate a published source attests, form and meaning together. That is not 35% translated. "A candidate exists for this meaning" is all the number says. The open gaps are the everyday core: day, city, before, stand, lift up, holy, sea, wind, gold, bread, build, blood. No open source we have found supplies them.

Two models agreeing on a loan is not a source. We did ask two model families, separately, which of the missing religious words were likely Chadian Arabic borrowings. Where they agreed, the proposal was kept as a proposal. It becomes a word in the draft only when the form also occurs in material we hold and the meaning occurs beside it. Code does that check. A model's confidence does not.

## How a verse is drafted

The translation loop is the one described in [Translating the Bible with an ontology](/writing/translating-the-bible-with-an-ontology), pointed at a language the drafter has never read.

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
