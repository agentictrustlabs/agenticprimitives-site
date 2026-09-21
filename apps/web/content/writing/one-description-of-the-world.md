# One Description of the World: How an Ontology Becomes a Rail

Most agent stacks describe their domain four times and check none of them against the others. Agentic Primitives describes it once, as an ontology; binds every layer to that description by IRI; and forbids the description from ever authorizing anything. That last clause is the whole strategy. This is what it costs and what it buys — and how the skills registry turns one description of the world into every agent, card, playbook and receipt that runs on the substrate.

## The fourfold description problem

An agentic application has to say what its world contains. Who the parties are. What counts as an act. Which records exist and whose they are. What an approval means, and what it does not.

Today that description gets written four times. Once in a system prompt, where the domain rules live as prose the model is asked to respect. Once in a database schema, where the same concepts become tables with different names. Once in an agent card, typed by hand, advertising capabilities in whatever words the author reached for. And once in a playbook, which names things the model has never been told exist.

The four never meet. Nothing compares them, so they drift, and the drift is invisible until an agent does something that was correct under one description and wrong under another. The industry’s answer is to inspect the model’s output for danger — a classifier, a monitor, a second model grading the first. That is grading an answer to a question nobody wrote down.

We took a different position. The domain is described once, in a form that code can import and a build can check. The conversation, the planner, the vault, the agent card, the receipt and the chain all bind to that one description. A term the ontology does not declare cannot be a field of a record, an argument of a tool, a party in a payment, or a word on a screen.

## What we mean by “ontology” — concretely

Not a diagram. Not a glossary. Not a knowledge graph a retriever consults so the model can sound informed. A formal vocabulary in RDFS/OWL, with SHACL shapes for structure and SKOS schemes for closed code lists, published under stable IRIs, that TypeScript imports as constants and Solidity mirrors as registered terms.

`@agenticprimitives/ontology` is the substrate’s vocabulary. Thirty-nine T-box modules, one per concern: core identity and the agent kinds, naming, delegation, custody, organization and membership, coordination, plans, execution, interaction, messaging, payment, agreement, attestation, verification receipts, guidance, capabilities, trust, content, geography, values. A C-box of SHACL shapes and SKOS vocabularies. A `context.jsonld` so any consumer shares one prefix map. A `run-provenance.jsonld` so a run record loads in a stock JSON-LD processor. A thin, browser-safe TypeScript surface — `NS`, `CLASS`, `PREDICATE`, `SHAPE` — and nothing else: the package depends on no other package, because a vocabulary that depends on its consumers has inverted the graph.

Every class grounds on an upper standard rather than inventing its own metaphysics. W3C PROV-O supplies the three kinds of agent — `prov:Person`, `prov:Organization`, `prov:SoftwareAgent` — and nothing may subsume across them. DOLCE+DnS supplies roles and situations, so that “Alice is the treasurer” is a state of affairs and not a power. P-Plan and EP-Plan supply plans, steps and execution traces, so a run is an `ep-plan:ExecutionTraceBundle` and a span *is* a `prov:Activity` rather than something joined to one by an id somebody invented. SKOS supplies code lists, because an enumeration is a concept scheme and never a class hierarchy.

Standards are not decoration here. They are the reason a counterparty with an ordinary RDF stack can load our receipts and ask a question of them without adopting our software.

### Four tiers, one spine

The ontology is layered, and the layering is the strategy.

**The upper standards** — PROV-O, DUL, P-Plan, SKOS — say what kind of thing anything is.

**The substrate (`ap:`)** — the thirty-nine modules — says what every Agentic Primitives deployment has: Smart Agents in three kinds, delegations and caveats, mandates, custody, typed names, vault records, receipts.

**Agentic Trust (`at:`)** is the base every domain in the skills registry inherits from: about five hundred and thirty classes covering what every agentic system has — agents, roles, situations, intents, capabilities, knowledge records, plan steps, endorsements, content commitments. It is grounded in `ap:` and never forks it. Where a real is-a holds it says `rdfs:subClassOf`; where the correspondence is alignment rather than identity it says `rdfs:seeAlso` and explains why subsumption fails. It re-declares nothing the substrate already names.

**The domain ontologies** say what one field of life contains. For faith, that is the Global.Church ontology (`gc:`), with the bounded contexts a congregation, a formation ministry, a field circle and a global mission actually operate in. For commerce, CommerceCore: offers, orders, fulfilment and settlement as classes an agent can be granted authority over. For a family office, the office. For a card room, one upper (`cr:` — the coach, the study grant, the consultation, the review) with Texas hold’em and canasta as two rule books beneath it, so that a third game is a third rule book and not a third coaching arrangement.

**Archetypes** sit at the bottom: the classes, capabilities and playbooks one kind of agent needs, declared as data and compiled.

Meaning flows down that ladder. `th:StudyGrant ⊑ cr:StudyGrant ⊑ at:Delegation`. A hold’em coach’s grant is a card-room study grant is a delegation, and every gate that knows what a delegation is knows what to do with it.

Crosswalks to other people’s standards are deliberately weak. A2A’s `skills[]`, an OASF taxon, a SKILL.md playbook, an MCP tool and a capability claim credential all use the word *skill* for five different things — a category, an advertisement, a playbook, an operation, a credential. Our canonical noun is **Capability**, and each of the five is a projection of one, related by `skos:closeMatch`, never `owl:sameAs`. Equating them is how a card editor ends up with a section titled “Capabilities” full of protocol flags beside a section titled “Skills” holding what the agent can actually do. We shipped that screen once. A build gate now refuses the word.

## The rule that makes it safe to build on

**Meaning flows through the ontology. Authority never does.**

This is the sentence that separates our ontology strategy from the one the enterprise platforms sell. They also anchor agents in an ontology — and then read the ontology as permission: purpose-based access, role-derived rights, lineage as entitlement. The description and the authority are the same object, so whoever edits the description edits what may happen.

We keep them apart, and the ontology itself says so.

`ap:charteredUnder` says a treasury is chartered under the person or organization that holds it. A resolver may follow that relationship to find Alice’s treasury. A verifier may not read it as permission to pay from that treasury; that is a delegation with a value caveat, checked on chain at redemption. The property’s own definition carries the warning.

A role describes; a delegation authorizes. Being a congregation’s deacon, a family office’s CFO, a mission’s field partner is a *situation* — a fact about the world with a start and an end — attested by a credential and explained by a role assignment. None of those three grants anything. Fire the CFO and you revoke delegations; the role record becomes history, not a live key. Forge the credential and it attests a situation that does not exist.

Membership is not delegation. A membership is a situation created by an enrolment decision; it explains why grants were issued; it is never itself executable. A directory listing is evidence of presence, not a roster with authority.

SHACL shapes constrain structure, never permission. This one is counter-intuitive and load-bearing: an *unauthorized* record must remain shape-valid. If the shapes encoded permission, an agent that overreached would produce an invalid record, the store would refuse it, and the evidence of the overreach would vanish. The shape says what a payment receipt looks like. The delegation says whether the payment was allowed. Both are kept.

The grounded vocabulary — the glossary that gives every term its ontology IRI, its TypeScript name, its plain-English gloss and its web2 and web3 equivalents — flags the terms that carry context or presentation only with `notAuthority: true`. A pairwise pseudonym, a display name, a registry entry: shown to a counterparty, never consulted by a gate.

And the developer skills that teach an agent to model a domain end on the same instruction, twice over: *treat semantic assertions as policy inputs, never direct authority*; *never infer access or operational authority from a ministry role or ontology relationship alone*.

## Three rails, not one

Containment bounds what an agent can reach. A grant bounds what it may do. The ontology bounds what a request can *mean*.

The third rail is what the other two stand on. A caveat that says “payee must be this treasury” is only checkable if *treasury* is one thing everywhere — in the conversation that resolved the name, in the planner that wrote the step, in the vault that holds the record, in the enforcer that compares the address. If the four descriptions drift, the caveat is precise about a word that means something slightly different at every gate, and the precision is theatre.

A rule written in a prompt is a throttle: invisible to every gate, drifting silently, applied confidently to cases it was never meant for. A term declared in the T-box is a rail, because a gate outside the model reads it — at build time, at run time, and at redemption.

## Where it binds — seven layers, seven bugs

Each layer of the architecture asks the ontology a question and binds to the answer by IRI. Each binding replaced a bug that had lived where nothing could check it.

**The Ask.** A conversational surface has to turn “send Alice 20” into two agent addresses. That needs three facts the sentence does not contain: what *kind* of agent each party must be (money moves between treasuries; an inbox belongs to a person), which *relationship* to follow when the agent you resolved is not that kind (Alice is a person; her treasury is the one chartered under her), and whether getting it wrong is recoverable (a message can be re-sent; a payment cannot be taken back). Those facts used to be a hand-written table inside one app. The table looked for a treasury whose *name* resembled its owner’s — `alice` → `alice.treasury`. Hers was `alice2.treasury`. A payment that should have worked dead-ended on a rule nobody had written down and the ontology had never claimed. Now a party is a class IRI plus a relation IRI — `ap:Treasury ⊑ ap:ServiceAgent`, reached by `ap:charteredUnder` — and the build fails if either IRI is not in the T-box.

**The plan.** A planner once improvised “pay every member” over a public search result: an unbounded list of strangers, shaped like an array, indistinguishable in code from a roster. Nothing could refuse it because the difference between a bounded, owner-recorded relationship and an open search lived nowhere. It lives in the ontology now — which relations a plan may fan out over, and which it may not — and the refusal has somewhere to stand.

**The vault.** A person’s Home listed their organization’s vault faithfully and uselessly: `coordination.endeavor:end_05b…`, `org.invite:agent:0x8c5c…`, *show*. Every one of those keys was already something the T-box had a class for — an endeavour, an invitation, a roster. Nothing had said which was which, so the only reader who could interpret a vault was a person who already knew the codebase. Every record key is now bound to a class, and a question about a vault compiles to a selector evaluated inside the store. The binding distinguishes *entities* (things the ontology describes, which a question may reach) from *indexes* (projections over entities — a cursor, a name map, an event log — deliberately not askable, because answering from a cache is how answers go stale). It narrows what a question can mean. It never widens who may read the answer; that remains the delegation’s decision, per subject, per record.

**The card.** The profile’s `capabilities[]` is the record. The A2A card’s `skills[]` and the discovery registry’s entries are projections of it, generated and signed, never typed. The build refuses the word *skill* outside the A2A wire types and the raw-JSON inspector, because the drift is one word at a time.

**Interaction and coordination.** An interaction carries a pinned profile version; an endeavour and its plan are classes; the shapes constrain structure only — see the rule above about unauthorized records staying valid.

**Receipts.** A run’s provenance is one JSON-LD document whose context maps every term to a T-box IRI, and a test asserts the shipped file and the in-memory constant are byte-for-byte the same document. When USDC moved from Alice to Bob and neither was told — while the treasury playbook already promised “every payment leaves a receipt” — the fix was not another log line. The promise became a declared effect in the SKILL.md, compiled into the definition, discharged by the executor, and written into the vault as an `apix:PaymentReceipt` whose field names *are* the T-box property names, so the record is readable *by* the ontology rather than interpreted into it. Before that there were spans, log lines and attestations joined by ids: three evidence formats and no single graph a stock RDF stack could load.

**Identity and the chain.** Three kinds of agent, mirrored by `AgentType` in code and by the agent-type record on chain. A typed name suffix — `.me`, `.org`, `.svc`, `.treasury`, `.workspace` — names a derived type and is checked against the on-chain record, failing closed on mismatch. On chain, an `OntologyTermRegistry` and a `ShapeRegistry` govern which predicates a metadata-bearing contract may carry, so the vocabulary is the same above and below the chain boundary. The bug this replaced: a demo person pointed at as his own organization. The operator check compared one address to itself and went green; a workspace switcher walked a person as if he were a parent org.

## How it guards: build time, run time, redemption time

**At build time**, nearly forty gates run on every change to the substrate, and the ontology has its own row of them. `check:ontology-bindings` reads every IRI the code binds to and fails if the T-box does not declare it — with the right kind, class versus property. `check:forbidden-terms` reads each package’s declared forbidden vocabulary and greps its source for a neighbour’s words. `check:capability-vocabulary` holds the one-noun rule. `check:no-domain-in-packages` keeps the substrate generic: a hostname, a hosting provider, or a faith-vertical term in a Ring-0 package is a defect, because domain vocabulary belongs in the domain ontology and the application, never in the primitives. `check:demo-person-org-distinct` exists because of the bug above. And the ontology’s version manifest — every module’s IRI, declared version and content hash, with one digest over the lot — is regenerated from the T-box and refused when stale. *The code may not invent domain vocabulary* is not a review comment. It is a red build.

**At run time**, the ontology bounds meaning before any gate decides authority. What a question can mean. What kind a party must be. What a plan may fan out over. What a record is. The prompt an agent runs under is rendered *from* those bindings rather than being the place they are kept. The answer a person reads is composed only from what the observations contain — “the directory does not say” is a correct answer — and is a rendering of the receipts, never evidence in itself.

**At redemption**, the ontology reaches the chain. A mandate binds one exact intent by digest, and the digest’s preimage carries two more digests: the ontology manifest the intent’s terms were bound under, and the compiled definition the act runs under. The verifier recomputes the digest under the versions *it* runs with. Change a T-box module — even a comment, since the manifest hashes content — and an intent approved before the change no longer matches; the on-chain enforcer reverts with a digest mismatch using the contract it already has, and the harness says which version moved and offers re-approval, which is a new signature. This closes a gap most systems do not know they have: approve an intent, then change the schema its words are bound to, and the digest is unchanged while its meaning is not. A runtime that does not supply its versions is simply not bound — and the receipt says so.

## The skills registry: where the ontology is compiled into agents

An ontology that only constrains code would already be worth the discipline. What makes it the spine is that it is also where agents are *made*. That is the job of the skills registry at skills.faithnet.io.

**It is a verifiable corpus first.** Every SKILL.md has a canonical id — `skill:<namespace>/<name>`, stable across versions — a SHA-256 content commitment, and a leaf in an append-only Merkle transparency log. Each publish cuts a new snapshot root over the whole prefix, so a superseded version never loses its proof. An independent validator re-derives the commitment, rebuilds the root and re-checks inclusion; it trusts nothing the producer says. A playbook is content, and content that shapes an agent’s behaviour deserves the same integrity as scripture or a contract.

**It renders every ontology module as a graph.** Agentic Trust and each domain — thirty-nine of them at present, from congregation operations to incident response to canasta — load into GraphDB and appear as browsable class graphs, with *semantic clusters* over them: every class belongs to exactly one cluster, so a domain can be read a manageable slice at a time. The clusters are a view layer; they add no axioms and change no meaning. The graph is a cache. The repository’s Turtle is the truth, and the store can be rebuilt from it at any time.

**Domains are bounded contexts with a declared tier.** The card room is an upper; hold’em and canasta are domains beneath it. Faith is not one context but several — a congregation’s operations, formation, field circles, global mission — each with its own vocabulary, each grounded on Global.Church and Agentic Trust. Their skill folders live in the domain’s own organization at its Home, so a domain’s playbooks are custodied by its stewards, not by the registry and not by whoever wrote the first version.

**An archetype is the classes one kind of agent may mean.** Its SKILL.md frontmatter declares `knowledge.requires` — a list of T-box classes: for a coaching service, the study grant, the consultation, the review request, the study record, the coach note, the decision spot. A package that names a class the ontology lacks fails to compile. Every other skill in the archetype carries an *execution contract* in its frontmatter: the capability id it realises, the risk it declares, the type of mandate it will ask for, which argument names the resource and which the acting party, the effects that must follow a success, whether the act may land once per request or once per resource version, and what its adapter declares about verification windows, retries and cancellation. The body beneath the frontmatter is the doctrine: how the act is done, and what it must never be mistaken for. “An invitation is not a membership” reaches the model because the author wrote it into the artifact the agent is compiled from.

**The compiler turns the archetype into the thing an agent runs under.** Out comes a harness definition: instructions rendered from the bodies, tools with their capability and risk, the mandate types the agent will start asking for, retrieval seeds, evidence obligations, and the source commitments that make the build reproducible — all under one `definitionDigest`. The invariant the compiler cannot violate is the ontology’s rule in another form: the definition carries what the agent *knows how* to do, never what it *may* do. No signature, no delegator, no grant appears in its output; the substrate’s validator refuses one that tries.

**Everything downstream cites it.** The agent card is projected from the definition and signed by a delegate key the author authorised once; nobody typed its capabilities. When an agent uses a skill to shape a reply, the reply carries a `skill-provenance` manifest — id, version, digest — that any receiver can verify against the corpus: resolvable, digest-match, version-match, Merkle inclusion. The tag proves the skill was actually used, not merely named. The run record cites the definition digest; the mandate folds it into the intent digest; the receipt anchors both.

**Successful work becomes a recipe.** A completed run can be saved as a draft SKILL.md for the domain’s library: the admitted plan as steps, the capabilities used, and the parties as *roles* — an argument the contract names as the resource or the acting party, or one typed with an ontology class (`Agent`, `Organization`, `Treasury`), or any argument whose value is an address, is written as `{payee}` or `{org}` and listed under `roles:`. The recipe is about the shape of the work, not the people it was first done with. Secrets never enter, because the recipe is compiled from the plan and the definition and nothing else. And authority is requested anew: assigning the recipe to an agent grants nothing; every act in it parks for a mandate signed for *that* request, exactly as the first run did.

**The registry teaches its own extension.** Among its skill packages are the methods for building the ontology itself — *ontology-grounding* (anchor a domain term on an existing upper before minting; a “field partner” is a role an organization plays, so `dul:Role`, not a subclass of Organization), *author-tbox-class*, *author-shacl-contract*, *detect-semantic-clusters*, *curate-vocabulary*, *sync-ontology-graphdb*. An agent asked to extend a domain is handed the discipline, in the same form as any other playbook, verifiable in the same corpus. Rich Canvas authors the domains; the registry is where a domain becomes runnable.

This is the power of the thing. One graph — and every artifact an agent runs under, produces or is judged by cites that graph by IRI and by digest. Not because a policy says to, but because the compiler, the verifier, the vault and the build refuse anything else.

## A congregation, end to end

Take a congregation on the faith estate. Its people are Smart Agents in their own right — each person with a Home, a passkey, a vault. The congregation is an Organization Smart Agent, custodied by its elders. Its treasury is a Service Agent chartered under it. Its operations agent is another service, running a `congregation-operations` archetype compiled from the registry, whose `knowledge.requires` names the Global.Church classes it may mean: the household, the membership, the gathering, the benevolence request, the role assignment.

A member’s household is a `gc:Household ⊑ at:Household` — the same local name, a genuine specialisation, the comment says so. Her membership is a situation an enrolment decision created. The deacon who oversees benevolence holds a role assignment, and the role explains why the elders issued him a delegation to read the benevolence roster — but the delegation, signed by the organization’s steward at its Home, is the only thing that lets him read it. A field partner supporting the congregation’s mission work is not a kind of organization; it is a role an organization plays, and its grant discloses exactly the records that role needs and nothing adjacent.

The deacon asks the operations agent, through his own agent, to send two hundred dollars of benevolence to the Ramirez household. The Ask resolves the parties by kind and relation — a payment moves from the congregation’s treasury, found by following `ap:charteredUnder` from the organization, to the household’s treasury, found the same way — never by matching names. The planner writes a step whose capability is `treasury.payment.execute`, whose risk floor the contract set, and whose mandate type the compiled definition declared. The deacon’s confirmation is a signature over the intent digest, which carries the ontology manifest digest and the definition digest. The enforcers check payee, value, time and digest on chain. The declared effect fires: an `apix:PaymentReceipt`, field names straight from the T-box, lands in the congregation’s vault, and the household is told, because the payee is named in the mandate they are already party to.

Three months later the field-circles ontology is revised. The next benevolence payment under the old approval is refused at redemption with the moved version named; the deacon re-approves the same intent under the new versions with one more signature. Nothing paid that should not have. Nothing was silently re-interpreted.

At no point did the ontology authorize anything. It said what a household is, what a treasury is, what a role is, what a receipt looks like. A grant said what could happen. A model proposed, and was as creative as it liked about how — and could not redefine what.

## What it costs

Authoring a T-box is real work, and grounding is judgement. A domain takes weeks, and the hard decisions — is this a kind of thing or a role something plays; is this subsumption or alignment — cannot be automated, only disciplined.

The build gates check that an IRI exists and what kind it was declared as. They do not check subsumption; that is a reasoner’s job and needs a triple store the build must not require. SHACL validation over live instances is wired by consumers, not by the vocabulary package.

The relationship between the substrate’s `ap:` and the registry’s `at:` is kept current by a report a person reads, not a gate. A term added to one and never reflected in the other is a concept the registry cannot show.

The version binding at redemption is only as good as the runtime that supplies its versions; one that does not is not bound, and says so in the receipt.

GraphDB is a cache. If the store and the repository disagree, the repository wins.

And an ontology cannot make a model right. It makes *wrong* legible — a party of the wrong kind, a record of an unknown class, a plan over an unbounded relation, a term whose meaning moved — and gives a gate outside the model something exact to refuse.

## The line

The ontology says what a thing *is*. Only a grant says what may *happen*.

Intelligence may be probabilistic. Authority must not be. And the meaning that authority is expressed in must be written down once, bound everywhere, and never mistaken for permission.

`#AIAgents #Ontology #PROVO #SHACL #AgentSkills #AgenticPrimitives`
