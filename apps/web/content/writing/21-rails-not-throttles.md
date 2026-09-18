# Rails, not throttles

The fear of AI is not a fear of fluent text. It is a fear of an action nobody authorized. The industry's answer, right now, is to make the agent smaller. This series was an argument that the answer is a rail the agent cannot leave.

## The remedies on the table are throttles

A throttle reduces rate, reach, or confidence.

— **Containment.** Sandboxes, restricted modes, egress denied, a kill switch. A smaller blast radius for one process on one machine. Every act inside the wall is equally unauthorized — which is to say, none of them are authorized.

— **Supervision.** Permission prompts, and when people approve almost all of them, a second model grading the first. Fewer catastrophic actions, on average, with a miss rate the vendors already acknowledge. A click is not consent. A classifier is not a grant. Two probabilistic systems in series are still probabilistic, and the record is a log line in someone else's store.

— **Platform governance.** Purpose-based permissions, a human-in-the-loop dial, reversible actions, lineage — inside one vendor, for the workloads it hosts, on terms it sets. Reversibility the platform holds is the platform's sovereignty. Revocability the owner holds is yours.

— **Pacing.** Slow the frontier, embed evaluators, coordinate requirements, pause a research workload. Welcome it. It buys time. It does not say which records an agent may read, which payee a payment may reach, or whether a grant still exists when a paused run resumes.

A throttle can make a dangerous proposal rarer. It cannot say what the agent has the right to do, and it cannot enforce that right in a place the proposer does not control.

Keep the emergency stop. Do not mistake it for the architecture.

## What the twenty days actually said

They were not twenty topics. They were one operating model, in the order a counterparty asks the questions.

**Who is acting.** The layer under discovery is nearly empty, and that emptiness is why trust keeps getting bolted on as a score (Day 1). An agent's identity has to be able to *sign* — a smart account, not a name, a token, or a document (Day 2). Names, cards, registry entries and DID methods are projections of that account. The thing that lists you is never the root of trust for who you are (Day 3). Credentials rotate. The address does not (Day 4). Every agent is a person, an organization, or a service. A person or organization authorizes; an associated treasury service transacts. Three classes is the shape accountability has, and the ontology is where that shape is written once (Day 5). The service that acts as an agent must never *be* that agent. The key it signs with is a delegate: revocable by the custodian, narrow to one capability (Day 10).

**May they do this.** A token is a claim that authority existed at issue time. A delegation is the authority itself, still checkable at act time (Day 6). A grant checked once is a grant that is cached. Revocation latency is a property of the network. Never acting on a stale verdict is a property of the design (Day 7). A mandate binds that grant to one intent. A compromised planner can be creative about *how*. It cannot change *what* (Day 8). "Send Alice 10 dollars" does not complete on a click. For a consequential act the confirmation *is* the signature, and the payment cannot commit without it (Day 9).

**What anyone else may conclude.** Trust is a graph a party reads between itself and a counterparty, for an outcome, from evidence — never a score at the index (Day 11). Be what registries are built from. Anchor the registry to the agent. Delete the listing and you lost a listing, not an identity (Day 12). A resolver returns addresses, never credentials. Finding an agent is not permission to use it (Day 13). Public facts and private records are two tiers that never meet inside one engine. A generated query is never the reason something is disclosed (Day 14). The vault is the record. The Home, the runtime, the trace store are caches. A second Home reads what the owner holds. It does not inherit the first Home's database (Day 15).

**What the runtime is allowed to do with all of that.** The planner proposes. The mandate authorizes. The executor acts. The receipt proves. The planner may be wrong about *how*. It is never consulted about *whether* (Day 16). Coordination schedules work between agents. Orchestration sequences work within one. The creating agent may invite. It may not enroll people by iterating over them (Day 17). Behavior — the words, the tools, the screen — is generated from one model. Authority never is. A playbook that promises a receipt into a field nothing reads has promised nothing (Day 18). A receipt is a worse observability product and a better evidence product. It travels with the owner, and a counterparty can recompute it without the runtime's cooperation (Day 19). HTTPS is required. A client certificate is optional evidence of a pipe. Admission is always required, and a certificate never says who may act (Day 20).

Under the sequence, one ontology. Intent, outcome, capability, playbook, relationship, receipt and trust edge each mean one thing, from the utterance to the audit. Membership is not a grant. A suggestion is not a commitment. An assertion is not a verified outcome. *Chartered under* finds a treasury. It never authorizes a payment.

## That is the guardrail

A guardrail, in most of the current conversation, is a prompt, a classifier, a sandbox, or a person watching a screen. All four fail the same way. Either the thing that might misbehave is also the thing asked to stay inside the line, or the line is a wall around a room with no notion of permission inside it.

The rail is the refusal sitting outside the proposer.

— **Admission** asks whether the request may enter at all. Being admitted is not permission to perform the act that follows.

— **Custody** asks who may speak for the agent. Replacing a passkey does not mint a new principal.

— **Authority** asks what may be done, on whose behalf, under which caveats, still live. An agent cannot pass along more than it received.

— **Mandate** asks whether *this* act was approved — payee, amount, resource, outcome — not whether someone once said yes in this session.

— **The risk ladder** asks what approval the capability's contract requires. The planner cannot classify its own payment as harmless to skip the signature.

— **Enforcement** asks whether the constraints still hold when state changes. Where the effect goes through our contracts, the check runs in the transaction that commits. Preliminary approval is not the final word. The person's agent never moves the money. The treasury service does, under the mandate.

— **Revocation** asks whether the authority still exists. Withdrawing a grant stops the next protected step when a participating verifier reads the confirmed revocation. That is selective withdrawal. It is not a promise of instantaneous cancellation across the internet. Pull at block time is the property we have. A push that says "revoked" is a reason to re-verify, never a verdict.

Ordinary actions stay straightforward. Consequential ones are bounded to the act that was signed. Accountability is a record the planner cannot narrate for itself.

## What this does not buy

A rail cannot stop an exploit that never presents itself to the gate it controls. A signed mandate can faithfully capture a human misunderstanding. The knowledge plane can still tell a plausible falsehood — we have shipped those — while the authority plane holds. We do not have requester unlinkability. We will not claim millisecond revocation, or sub-second propagation of a fact across every index.

Pacing, isolation and an emergency stop still belong in the kit. They buy time. They are not an answer to "may this agent do this."

Intelligence may be probabilistic. Authority must not be.

**The line:** a throttle makes a dangerous agent slower. A rail makes an unauthorized act impossible to commit. The fear is about action without a principal. The answer is not a smaller model. It is authority the model cannot exceed.

**Question:** Which response to AI risk, now being sold as a guardrail, is actually a throttle — and where does its enforcement sit when the agent leaves that vendor?

`#AgenticWeb #AIAgents #AISafety #Accountability #Web3`
