# Planner proposes, mandate authorizes, executor acts, receipt proves

Intelligence may be probabilistic. Authority must not be. Everything in this article is a consequence of taking that sentence literally.

Three weeks in, the substrate has an identity that can sign, grants that are checked per step, and a trust graph instead of a score. This week is about the part people actually see: an agent *doing something*. I want to describe the harness we run today, compare it honestly to LangGraph, Microsoft Agent Framework, Dapr Agents and the OpenAI Agents SDK, and be precise about where each is ahead.

## The one-turn sequence

A request arrives — from a person in their Home, from Claude through a connector that speaks as them, or from another agent over A2A.

1. Scope. The app says where you are standing: which agent context is selected, what this app offers, what standing the connected user has. This narrows what the conversation *offers*. It is never a parameter of any permission check — scope is honesty; the mandate is authority.
2. Classify. The request becomes a typed intent with a stated outcome, and maps to a capability from the agent's *behavior definition* — a compiled set of playbooks (Day 18). Intent, outcome and capability are all ontology terms; the tool set the planner sees is generated from that definition, not hand-written.
3. Resolve. Parties are resolved in the asker's private tier (Day 9). Domain relationships — whose treasury, which congregation, who is a member of what — are followed in the ontology, never guessed from names.
4. Plan. A planner — an LLM behind a port — proposes steps. The route to a model is decided *before* the call and recorded with its reason. Each step names a tool. Each tool carries a *declared* risk floor and requirement type. The plan cannot lower a tool's risk.
5. Verify, per step. Does a live grant cover this tool, resource and arguments? Signature against the principal's account; revocation on chain; caveats against the actual call. If the step needs a mandate that does not exist yet, the run pauses with an input-required that says *exactly which signature is needed*.
6. Approve → re-verify. A human signs (Day 9). The run resumes by verifying again. A checkpointed approval is never sufficient on its own (Day 7).
7. Execute. The invoker for that capability runs — a message, a vault write, an A2A call to another agent, or a request to the principal's treasury service to pay. The person's or org's own agent never moves money; the treasury does, under the mandate, and the on-chain enforcers run again at commit.
8. Receipt. Tool, risk, capability, mandate ref, verifier decision, approvals, idempotency key, input digest, transaction hash, and the digest of the playbook that admitted the run. That record *is* a W3C PROV graph in the owner's vault — JSON-LD a stock RDF stack can load — with a public projection of only the anchored outcomes a stranger may see (Day 19).
9. Reply. The conversational close names what happened, carries the acted capability's binding so the Home can show the right result surface, names where the provenance lives, and both parties are told.

Fan-out shapes — "message everyone on the team," "pay each member" — are compiled from the ontology into plans that re-verify per item. A branch is N mandates, not one.

Every span on that path names the PROV activity it is, and every activity names its span. W3C Trace Context rides the wire. A hop from Claude through a gateway to another agent's catalog is one trace — correlation, never trust. The receipt is the evidence.

## The ontology is doing more than resolving names

The intent and its outcome are classes. The capability the planner is offered is a definition with an id that means the same thing on the A2A card, in the registry and on chain. The plan shape for "everyone on the team" is compiled from *a team has members; a member has an inbox* — modelled relationships, not a loop someone wrote. The resource a caveat is checked against is typed. The receipt is PROV-O. The trust graph a counterparty reads (Day 11) is the same terms. One vocabulary from utterance to receipt is what makes the harness generatable (Day 18) and auditable (Day 19) at the same time. Frameworks give you a graph of nodes; they leave the meaning of the nodes to the prompt.

## The invariant

Every box in that sequence is a named symbol in our code. The planner can be wrong, hijacked or creative. Steps 5–7 do not care. Nothing in the harness consults the planner's opinion about whether a step is allowed.

## Where we compare

"We're different" is cheap. Here is the honest score, family by family.

We are ahead — and it is checkable — on the questions that decide whether an agent can be trusted to act.

— Authority. Theirs: interrupt(), middleware, hooks, allow-lists — checked in the process that also runs the model. Ours: every consequential step presents a mandate that is verified on chain, single-use, attenable, revocable — before the step, and again after a human approval. Revoke mid-run: the next step is denied and the receipt says why. That script is live.

— Identity. Theirs: a config object inside the framework; a restart or a vendor change is an identity change. Ours: the agent is a smart-account address; the runtime acted on its behalf; the model is swapped and routed under the same address; a service signs only as a revocable delegate.

— Playbooks. Theirs: prompts, [SKILL.md](http://SKILL.md) loaded into context, YAML agents. Ours: a compiled definition, digest-pinned, grounded in ontology, assigned by ceremony, cited on every receipt — and it grants nothing.

— Evidence. Theirs: a vendor trace. Ours: the run's vault record *is* a W3C PROV graph; a forged or leaking bundle fails a shape check in CI; a counterparty can recompute a receipt digest against a public row and the chain without our services. LangSmith is still a better place to *watch* a run. It is not a better place to *prove* one.

— Hops. Theirs: handoff is control transfer inside one process. Ours: a routed ask re-derives standing at the receiver; a hand-off is a child delegation; an outsider's answer is an observation, never authority.

— Knowledge. Theirs: prompt-resident rules and RAG. Ours: domain shape in the ontology, bound by IRI; every reply names what was read and from which tier.

We are at par — with a twist we will not drop — on running the work.

— Durable runs. Checkpoint the admitted plan and the completed steps; resume replays receipts and re-verifies only what has not run. LangGraph and MAF still have time-travel, forks, and richer operator surfaces. The twist: their checkpoint is the truth on resume; ours is an input to re-verification.

— Progress. Long-polled run lines, including across a hop. They stream more richly. We chose not to use SSE as the product surface.

— Memory. Standing instructions, remembered confirmations, learned preferences — vault-resident, scoped to the room they were declared in. Deep Agents and LangGraph Store are still broader on episodic summaries. Ownership we will not trade.

— Triggers. Schedule, message, webhook, on-commitment — live, with a panel on the Home. At par with LangSmith cron and Buzz-style hooks.

— Long-run context. A result past the threshold leaves the run as a receipted artifact in the acting agent's vault; a resume rehydrates only what a reference reaches. Deep Agents still lead on summarization craft. The twist: the artifact is the agent's record under its grant, not a platform file.

— Evaluation. Deterministic truth cases against evidence, plus a nightly ledger of live scripts with an authority twin each. LangSmith and Foundry lead on volume and model judges. We will not let a model judge a mandate. — Models. More than one provider behind one port; the route is decided before the call and recorded. At par. The twist: a route, never a fallback.

We are behind on recovering, observing and scaling the run as a product. But, not for long.

— LangSmith Studio and MAF's durable-task dashboard are still better places to debug a live run. We have spans, a Home timeline, and four metrics. We do not ship their collector.

— Dapr is still ahead on approval waits that auto-deny on a timeout. We have durable pause and re-verify. We have not made expiry a first-class product control. — Two entry points still share one intent runner but not one tool set and checkpoint. That is debt. — A hop that completes on a second Home — park there, approve there, resume here — is designed and gated in-estate. It is not yet live across deployments. Until it is, "waiting on their steward" is honest only inside one estate. — We publish no latency numbers.

Each of those gaps, if we close it, still carries the authority twist: resume re-verifies; a branch is N mandates; a trace cites a transaction. That twist is what stops us adopting a framework wholesale — and it is a real cost, not a virtue.

## Against each, in one sentence

LangGraph — ahead on checkpoint ergonomics, time-travel and LangSmith. Their interrupt resumes on a click; ours resumes on a signature over a digest. Their trace is the vendor's; our receipt is the owner's.

Microsoft Agent Framework — ahead on middleware composition, context providers and production-grade durable tasks. Their approval middleware is the right shape and the wrong material: an approval object, not a grant. In MAF a step's authority is a policy decision the middleware *makes*; in ours it is an on-chain artefact the middleware *reads*.

Dapr Agents — ahead on timeout auto-deny and a clean hook decision set. We copied that discipline. A Dapr "deny" is a hook's opinion; ours is a terminal denial because a grant is gone, and no retry can change it.

OpenAI Agents SDK — ahead on developer experience, handoffs and guardrails as primitives. A handoff there is orchestration inside one runtime. For us it is coordination between principals (Day 17) and crosses an authority boundary with its own mandate.

Across all four, five properties are contract-enforced here and policy code everywhere else: identity survives the runtime, attenuation is an on-chain chain, revocation is checked per step, the intent digest binds the act, and the nonce is single-use. That is the whole differentiation — and the whole cost.

## What the harness is not

It is not a framework you install. It is a set of ports — planner, tool invoker, approval, durable step, memory — with an authority-aware loop in the middle and adapters at the edges. Apps wire model credentials and tool implementations; they do not re-implement the loop. The next work is making that loop visible, governable and easy to extend. Whether ports-not-a-framework is the right packaging is a question I would genuinely like the framework authors' view on.

The line: the planner may be wrong about *how*. It is never consulted about *whether*.

Tomorrow: why "handoff" is a coordination word, not an orchestration one.

Question for the community: For those running agents in production on LangGraph, MAF or Dapr — when a permission is revoked mid-run, what does your runtime do with the checkpointed approval?

`#AIAgents #LangGraph #AgentFramework #DurableExecution #AgenticWeb`
