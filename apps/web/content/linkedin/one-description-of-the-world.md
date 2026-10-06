# One Description of the World: How an Ontology Becomes a Rail

Most agent stacks describe their domain four times — in a system prompt, a database schema, a hand-typed agent card, and a playbook — and check none of them against the others. They drift, and the drift is invisible until an agent does something that was correct under one description and wrong under another. The industry then inspects the model’s output for danger. That is grading an answer to a question nobody wrote down.

Agentic Primitives takes a different position. The domain is described once, as an ontology. Every layer binds to that description by IRI. And the description is forbidden from ever authorizing anything.

That last sentence is the whole strategy.

## What “ontology” means here

Not a diagram, not a glossary, not a knowledge graph a retriever reads so the model sounds informed. A formal vocabulary in RDFS/OWL, with SHACL shapes for structure and SKOS schemes for code lists, published under stable IRIs, imported by TypeScript as constants and mirrored on chain as registered terms.

Thirty-nine modules in `@agenticprimitives/ontology`, one per concern — agents, naming, delegation, custody, organization, coordination, plans, execution, payment, receipts, capabilities — grounded on W3C PROV-O (three kinds of agent: person, organization, software), DOLCE+DnS (roles and situations), P-Plan/EP-Plan (plans and traces), SKOS (code lists). Above it, Agentic Trust (`at:`), the base every domain in our skills registry inherits from. Above that, the domains: Global.Church for faith, CommerceCore for commerce, family office, a card room with hold’em and canasta as two rule books beneath one coaching arrangement. At the bottom, archetypes — the classes one kind of agent may mean.

Meaning flows down the ladder: `th:StudyGrant ⊑ cr:StudyGrant ⊑ at:Delegation`. A coach’s grant is a delegation, and every gate that knows what a delegation is knows what to do with it.

## Three rails, not one

Containment bounds what an agent can reach. A grant bounds what it may do. The ontology bounds what a request can *mean*.

The third rail is what the other two stand on. A caveat that says “payee must be this treasury” is only checkable if *treasury* is one thing everywhere — in the conversation that resolved the name, the planner that wrote the step, the vault that holds the record, the enforcer that compares the address. If the four descriptions drift, the caveat is precise about a word that means something slightly different at every gate.

A rule in a prompt is a throttle: invisible to every gate, drifting silently, applied confidently where it was never meant to go. A term in the T-box is a rail, because a gate outside the model reads it — at build time, at run time, and at redemption.

## The rule that makes it safe

Meaning flows through the ontology. Authority never does.

The enterprise platforms also anchor agents in an ontology — and then read it as permission: purpose-based access, role-derived rights. Description and authority are one object, so whoever edits the description edits what may happen.

We keep them apart, and the ontology says so itself. `ap:charteredUnder` says a treasury is chartered under the person who holds it; a resolver may follow that to find her treasury; a verifier may not read it as permission to pay from it — that is a delegation with a value caveat, checked on chain. A role describes; a delegation authorizes. Being a congregation’s deacon or a family office’s CFO is a *situation*, attested by a credential, explained by a role assignment; none of the three grants anything. Membership is not delegation. And SHACL shapes constrain structure, never permission — an *unauthorized* record must remain valid, or the evidence of the overreach disappears.

## Where it binds — and the bugs it replaced

Every binding replaced a defect that lived where nothing could check it.

**The Ask.** A hand-written table looked for a treasury whose *name* resembled its owner’s: `alice` → `alice.treasury`. Hers was `alice2.treasury`. A payment dead-ended on a rule nobody wrote down. Now a party is a class IRI plus a relation IRI, and the build fails if either is missing from the T-box.

**The plan.** A planner improvised “pay every member” over a public search result — an unbounded list of strangers shaped like a roster. The difference between an owner-recorded relationship and an open search lived nowhere. It lives in the ontology now, and the refusal has somewhere to stand.

**The vault.** A Home listed an organization’s vault faithfully and uselessly: `coordination.endeavor:end_05b…` · show. Every key was already a class. Now each is bound to one, and a question compiles to a selector inside the store — narrowing what a question can mean, never widening who may read the answer.

**The receipt.** USDC moved from Alice to Bob and neither was told. The fix was a declared effect in the playbook, compiled into the definition, discharged by the executor, written as an `apix:PaymentReceipt` whose field names *are* the T-box property names — readable by the ontology, not interpreted into it.

**The chain.** Typed name suffixes — `.me` `.org` `.svc` `.treasury` — are checked against the on-chain agent type and fail closed. An `OntologyTermRegistry` governs which predicates a contract may carry. The vocabulary is the same above and below the chain boundary.

## Build time, run time, redemption time

At build time, nearly forty gates run; the ontology’s row of them fails the build when code binds an IRI the T-box does not declare, when a package uses a neighbour’s word, when the word *skill* appears where *capability* belongs, when a domain term leaks into the generic primitives.

At run time, the ontology bounds meaning before any gate decides authority — what kind a party must be, what a plan may fan out over, what a record is.

At redemption, it reaches the chain. A mandate binds one intent by digest, and the digest’s preimage carries the ontology manifest digest and the compiled definition digest. Change a T-box module and an intent approved before the change no longer matches; the enforcer reverts on chain; the harness names the version that moved and offers re-approval — a new signature. Approve an intent, then change the schema its words are bound to: the digest used to stay the same while its meaning did not. It no longer can.

## The skills registry: where the ontology becomes agents

An ontology that only constrains code would be worth the discipline. What makes it the spine is that it is also where agents are *made* — at skills.faithnet.io.

It is a verifiable corpus first: every SKILL.md has a canonical id, a SHA-256 commitment and a leaf in an append-only Merkle log; an independent validator trusts nothing the producer says. It renders every ontology module — Agentic Trust and thirty-nine domains — as a browsable graph with semantic clusters.

An archetype is the classes one kind of agent may mean: its frontmatter names T-box classes, and a package that names one the ontology lacks fails to compile. Each skill’s frontmatter is an execution contract — capability, risk, the mandate type it will ask for, which argument names the resource, the effects that must follow — and its body is doctrine: “an invitation is not a membership” reaches the model because the author wrote it into the artifact the agent is compiled from.

The compiler turns the archetype into a harness definition under one digest, with one invariant it cannot violate: the definition carries what the agent *knows how* to do, never what it *may* do. No signature, delegator or grant appears in its output. The agent card is projected from it and signed; nobody types capabilities. A reply carries `skill-provenance` a receiver can verify against the corpus — proving the skill was used, not merely named. A completed run can become a draft playbook with parties written as roles and authority requested anew.

One graph — and every artifact an agent runs under, produces, or is judged by cites it by IRI and by digest. Not because a policy says to, but because the compiler, the verifier, the vault and the build refuse anything else.

## The line

The ontology says what a thing *is*. Only a grant says what may *happen*.

Intelligence may be probabilistic. Authority must not be. And the meaning that authority is expressed in must be written down once, bound everywhere, and never mistaken for permission.

The full essay — with the seven-layer walk-through, the redemption-time version binding, and a congregation worked end to end — is at agenticprimitives.dev/writing/one-description-of-the-world

`#AIAgents #Ontology #PROVO #SHACL #AgentSkills #AgenticPrimitives`
