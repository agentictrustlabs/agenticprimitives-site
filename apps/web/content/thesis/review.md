*A review of the thesis by the site, written against the substrate's own code, contracts, deployments and published assessment, and against the strongest outside critique we have received. It reaches its own conclusions. Where it disagrees with the thesis it says so; where it disagrees with the critique it says that too.*

## The wrong first question

The outside critique opens with: *most of these benefits could be delivered incrementally through existing identity, authorization and application infrastructure; you have not demonstrated that buyers need the entire combination.* That is true, and it is not the important objection. "Could be delivered incrementally" is true of every architecture that has ever displaced another; the question is never whether the incumbent could in principle add the features, it is whether the incumbent's *shape* lets it. Okta can add rich authorization requests. It cannot stop being an issuer that a tenant operates.

The important question is a trade the thesis names but does not work through: **whose authority is it, and who bears the consequences when it is wrong?** There are three honest answers on the table, and the substrate's claims hold or fail depending on which one a given domain actually has.

## The trade that matters

| | Tenant | Federation | Substrate |
| --- | --- | --- | --- |
| Who is the root | The organization's IdP (Okta, Entra, Salesforce's own permission model) | Each organization's IdP, recognizing selected others; a network in the middle for payments (Visa TAP, Mastercard Agent Pay) | The principal's own account; a chain nobody in the domain operates |
| What authority looks like | Tenant policy: roles, scopes, RAR details | Tenant policy plus issuer trust; the network's rules for what crosses | A signed, caveated grant the principal issued; a mandate per consequential act |
| Where it is checked | Inside the tenant's services | At each resource owner, against issuers it trusts | Per step in the harness; at commit on chain for value; at admission for everything else |
| Who holds the evidence | The tenant's logs | Each party's logs; the network's records | The owner's vault; digests anchored on chain |
| What it is good at | One organization governing its own people, agents and resources, with liability it already carries | Many organizations that already trust a common intermediary and can afford the integration | Many small parties, no common intermediary, the person as the paying principal, records that must outlive any one organization |
| Where it breaks | The moment the act crosses the tenant boundary | Domains without an incumbent network, or where the intermediary's terms are the problem | Any resource the principal does not own; any effect the chain cannot order |

The thesis treats the tenant model as the opponent. The tenant model is not the competitor; it wins its own ground and always will. An enterprise that owns its resources, its employees and its liability should run its agents under its own IdP, and the substrate has nothing to offer it that a well-configured Entra Agent ID plus signed receipts does not. Saying otherwise is the thesis at its weakest.

The real competitor is **federation**, and it has two faces. The first is the payments network: Visa and Mastercard are building exactly the "agent acting for a consumer against providers it has never met" case, with a trusted intermediary, liability rules and a merchant base that already exists. In travel, retail and anything that clears through a card, federation-with-a-network is not a fallback; it is the incumbent, and it carries the one thing the substrate cannot manufacture, which is a counterparty base that already accepts the intermediary. The second face is the vertical SaaS system of record. What Salesforce is to a sales organization, Planning Center, Pushpay and their peers are to a congregation: the organization's data, the organization's users, the organization's agent, one vendor as the root. Their bet is *the organization's system of record*; the substrate's is *the person's*.

So the domain question is not "enterprise or not." It is: **does this domain have an incumbent intermediary, and is the person or the organization the paying principal?**

| Domain | Incumbent intermediary | Paying principal | Records that must outlive an organization | Substrate fit |
| --- | --- | --- | --- | --- |
| Enterprise workflow | The tenant itself | The organization | No | Poor. The tenant model wins. |
| Travel, retail | Card networks; OTAs | The consumer | Rarely | Weak. The network already federates; the consumer's mandate is one signal among the network's. |
| Faith communities, mission work, mutual care | None. Many small organizations, none large enough to be the root; church-management SaaS holds each one's slice | The person, mostly | Yes: a person belongs to several organizations over a life and carries giving, formation, relationships and safety-sensitive records between them | Strong, and the only column where the substrate's claims are not already someone else's product. |
| Healthcare, education | Regulators and large institutions | Mixed | Yes, by law | Possible later, through regulation-driven portability; not a beachhead. |

This is the review's first conclusion, and it is more useful than "not proven": **the substrate is a person-centric architecture for domains without an intermediary. The thesis should say that, and stop arguing with Okta.**

## The eleven principles, judged

Each principle is scored on what it claims, against what the code does and what a competent federation would deliver.

| # | Principle | Verdict |
| --- | --- | --- |
| 1 | Neutral ground, or no ground | **Overstated, and currently false in deployment.** Holds for effects the chain orders; the estate chain is one operator's ledger. |
| 2 | The identity can sign | **Holds**, with one missing distinction: principal continuity is not behaviour continuity. |
| 3 | Credentials rotate; the identity does not | **Wrong as stated.** The contract bumps the custody epoch on every retirement; grants under the old epoch die. Two operations are being called one. |
| 4 | A token says who; a delegation says what | **Overstated.** The differentiator is real but is not the slogan. Every resource owner still admits. |
| 5 | Authority binds to an intent, not a scope | **Holds for closed acts; unproven for open intents.** AP2 got there first and should be cited, not ignored. |
| 6 | Never acting stale | **Holds per step**; needs a finality definition and aggregate constraints it does not yet have. |
| 7 | Accountability has exactly three shapes | **A convention, not a law.** Earns its cost for organizations; questionable for individuals. |
| 8 | One vocabulary, behaviour generated | **Holds inside one estate; unproven across organizations**; a version-binding gap is a security gap. |
| 9 | Records belong to the owner | **Holds for personal records; underspecified for shared ones; in tension with principle 1 in the target domain.** |
| 10 | Evidence travels with the owner | **Holds as statement evidence.** Completeness anchoring exists and is not claimed; "never the binary" is too strong. |
| 11 | Trust is a graph, no score | **Right at the index, wrong as a prohibition.** The reader may compute a score; that is the principle's own logic. |

### 1. Neutral ground — true for the chain's effects, false for the deployment

The thesis says a grant is "checked by an enforcer contract at commit, in the same transaction as the act." That is exactly right for a treasury payment: the payment and the enforcers are one transaction, and a compromised harness cannot move value outside the caveats. It is not right for a message, a vault write, an invitation or a call to an external API. Those effects happen off chain; the chain contributes the root of identity, the revocation state and the signature roots, and the enforcement is the harness (which is software the operator runs) plus the counterparty's admission gate (which is software the counterparty runs). The outside critique's example is fair: check the grant, revoke it, and an external system sends the report anyway. The chain cannot reverse a disclosure it never ordered.

The defensible principle is narrower and still strong: *the chain is the ordering and revocation oracle for every act, and the enforcer for value.* Everything else is enforced at the two ends, and the receipts prove which end did what. The thesis should say that and drop "no seams." There is a seam at every boundary the chain does not order; the substrate's contribution is that the seam is receipted.

The deployment problem is sharper. The estate chain is four Besu validators on a single virtual machine operated by Agentic Trust Labs. That is a database with a signature scheme. Every property that depends on "no vendor operates it" — revocation a stranger can trust, admission receipts no operator can rewrite, the public graph being *anyone's* to reproduce — is, today, a promise by one operator. The reference contracts on Base Sepolia are neutral and hold no real estate. The thesis's principle 1 is therefore not yet deployed anywhere the thesis's other principles run.

This is not fatal, but it decides what "decentralized within a domain" must mean. A single-operator estate chain is federation with a different serialization format. For the faith domain the honest and achievable version is a **domain consortium chain**: validators run by a denomination, a mission agency, a relief organization, a seminary — parties that already distrust each other's databases and would each want a seat. That is "neutral ground" at the scale the domain can actually reach, and it is a concrete deliverable. Until it exists, the thesis should describe the estate as what it is.

### 2. The identity can sign — holds, with a missing concept

The critique argues that a DID is not inferior to an account because DID Core handles rotation and history. That misses the point the thesis gets right: an ERC-7710 delegation needs a *delegator that can be checked at redemption*, and a pointer cannot be that. The account is not a better identifier; it is the only kind of identifier that can be a principal in an enforced grant. On this the thesis wins.

What the thesis lacks is the distinction the critique names correctly: principal continuity is not behaviour continuity. An agent keeps its address while its model, operator, tools and instructions change. The substrate already carries the answer — every receipt cites the digest of the playbook that admitted the run — but treats it as a provenance detail rather than an identity claim. It should be elevated: *for trust purposes, the same principal under a different behaviour digest is a different agent, and a counterparty's edges should be keyed on the pair.* That turns a weakness into a differentiator no framework has.

The cost the thesis does not price: every principal must have a chain account, with deployment, gas or a paymaster, and a custody policy. For a congregation member who will never transact on chain, that is overhead paid for a property they may never use. Counterfactual accounts and paymasters reduce it; they do not remove it. In the target domain, the person-centric argument has to be worth this, and the thesis should say what it costs.

### 3. Credentials rotate — the contract disagrees with the doctrine

The thesis: "a leaked key is a credential revocation, not a new agent; nothing that named the account must be re-signed." The critique asks the right question: if an attacker uses a stolen key to issue a long-lived delegation and the key is then revoked, is the attacker's grant still valid?

The code answers, and the answer contradicts the doctrine. `AgentAccount` keeps a custody epoch; approved-hash delegations are keyed by `(hash, epoch)`; and `_bumpCustodyEpoch()` runs on *every* credential retirement — removing an external custodian, removing a passkey. So after a compromise, grants approved under the old epoch die at redemption, which is the right outcome. But after an **ordinary** rotation the same thing happens: retire a passkey you simply replaced, and every approved-hash grant issued under the previous epoch is dead too. "Nothing must be re-signed" is false for exactly the artifacts the thesis is about.

This is not a bug; it is an undeclared design choice. The substrate has chosen safety on retirement over grant survival, and the September assessment records why (approved-hash delegations had survived custody recovery, and that was a High). The thesis needs two operations with two semantics, stated plainly:

- **Rotation** (add a credential, then retire one you still control): should preserve grants. Today it does not for approved-hash grants; either the epoch should bump only on *recovery*, or rotation should re-approve under the new epoch as part of the ceremony.
- **Recovery** (a credential you no longer control): must invalidate every descendant grant of the compromised epoch, and counterparties must learn it — which they do, at their next read, because the epoch is on chain.

Historical signatures, acts already committed, and the recovery authority itself all need the same explicit treatment. Until the doctrine matches the contract, this principle is the one a competent auditor will use to discount the rest.

### 4. Token versus delegation — a true difference behind a false slogan

The critique is right on the facts. OAuth access tokens are authorization, not identity; token introspection checks current validity; RFC 9396 rich authorization requests carry amount, currency and creditor; macaroons had caveated, attenuable delegation in 2014. "A token says who" is not a fair description of 2026 OAuth, and knowledgeable readers stop reading at that line.

The real differentiator is in the thesis and buried: the grant is **issued by the principal with no authorization server**, is **portable** across every resource that accepts the principal, is **attenuated** in a chain a stranger can verify, and for value is **enforced at commit** by code no party to the transaction operates. Federation cannot give you the first and the fourth. Say that.

But the critique's deeper point also stands and the thesis dodges it: a principal can delegate only what it has. Alice's mandate cannot reach her employer's database, her congregation's roll or a hotel's booking system by itself; each of those is owned by someone whose admission policy decides whether Alice's grant is recognized at all. The substrate has this — admission, entitlements, `charteredUnder` as "never authority" — but the thesis's "no authorization server" rhetoric hides that every resource owner still runs one, consuming grants instead of minting tokens. The honest line is: *no central authorization server; every resource owner is the verifier of the grants it chooses to recognize.* That is also the line that tells you where the substrate fits: it is strongest where the resource is the principal's own — their treasury, their vault, their messages, their agent — and weakest as the resource moves to a third party. That is one more reason the person-centric domain is the right one.

### 5. Intent, not scope — right for closed acts, unproven for open ones

"Pay the caterer 400" as a mandate — digest of the typed intent, single-use nonce, payee and ceiling pinned — is the substrate's best idea and it works. The critique's example is the one that matters: "organize the retreat for under two thousand." Hashing that intent binds the approved object. It says nothing about whether the agent may disclose attendees' dietary needs, accept a cancellation penalty, pay a deposit, or substitute a venue. The digest establishes *what was approved*; it does not establish *which actions satisfy it*.

The substrate's implicit answer is decomposition: fan-out compiles into N mandates, each signed. That works when the sub-acts are enumerable before the plan runs. It does not work for genuinely open plans, and the thesis should stop implying it does. Two refinements, both already latent in the design:

- **Closed mandates for consequential effects, caveated delegations for the envelope.** Google's AP2 has precisely this split — an intent mandate that bounds a shopping session and a cart mandate that binds the transaction — and it is a direct precedent, not a competitor to be omitted. The thesis should adopt the vocabulary and claim the part AP2 does not have: chain enforcement at commit and owner-held receipts.
- **Something must verify that the proposed effect conforms to the approved intent.** Today that is the tool contract's declared risk plus the digest; for open intents it needs a conformance check — a typed comparison of the proposed action against the intent's stated outcome, in the ontology — or a further signature. Naming that component is the work.

The nonce needs defining too. Derived purely from payment fields it forbids two deliberately identical payments; freely generated it lets an unintended duplicate through. The substrate uses an idempotency key and an input digest on the receipt; the mandate needs a logical request identity, and the treasury needs receiver-side idempotency. This is a paragraph of spec the thesis owes.

### 6. Never acting stale — a lease of one step, with two gaps

Per-step verification is a lease of one step, and that is the right primitive. What the thesis does not say is *when a revocation counts*: at the click, at broadcast, at inclusion, or at finality. On a QBFT estate chain with two-second blocks and immediate finality the answer is "inclusion," and it should be written down; on a public L2 it is finality, and the harness must know which chain it is reading. An executor that loses its connection to the chain must stop, not proceed on its last read; the durable-step contract says a prior verdict is never sufficient, which implies exactly that, and should say it.

The second gap is composition. Two delegates each under a per-grant ceiling can jointly exceed a budget; a permitted read followed by a permitted external write can leak. The enforcer set today — value, timestamp, allowed targets and methods, call-data hash, quorum, digest binding, payment — is per delegation. An aggregate limit belongs to the resource, not the grant: a per-treasury spending policy enforced at the treasury account, and information-flow caveats where reads precede writes. Neither exists, and the first is a small contract.

### 7. Three shapes — a good convention, presented as a law

PROV-O offers Person, Organization and SoftwareAgent; it does not say they are exhaustive, and it says nothing about treasuries. The trichotomy is a modelling decision, and a good one: it gives every grant a readable accountability shape and makes "an organization acted" distinguishable from "a person acted for an organization." Call it doctrine, not law.

The treasury-as-service rule earns its cost for organizations: custody of funds separated from stewardship, every payment a mandate from a steward, an auditable "the organization's agent never held the money." For an individual it doubles the accounts and the ceremonies so that a person can be said never to pay. The thesis should defend that for the organizational case and let the personal case be a treasury *facet* of the person's account with the same enforcers, unless there is a reason it cannot be.

On relationships the critique is right and the thesis's own wording is stricter than its code. "A verifier may never read `memberOf` as permission" is the correct prohibition on *implicit* permission. A verifier can and should use current membership as an *explicit necessary condition* in a policy — the finance team's membership as one of three conditions for a payment. The substrate's entitlements already do this. The thesis should say "never sufficient," not "never read."

### 8. One vocabulary — the strength is real, and it concentrates failure

Generating the interface, the planner's tools, the card and the receipts from one definition is the substrate's most productive idea and the September incidents show why: every recent failure was a *knowledge* lie — a name-matched treasury, a receipt written to a field nothing read — not an authority leak. One definition removes the class of bug where the assistant and the product disagree.

Two things follow that the thesis does not confront. First, four generated surfaces can agree about the wrong behaviour, and a build gate catches invented terms, not valid terms used wrongly. Correlated error is the price of consistency and needs independent behavioural validation — which the live gates partly are, and should be described as such. Second, and this is a security gap: a mandate digest binds the intent, not the ontology version or the adapter that interprets it. Approve an intent, then change the schema or the adapter, and the same digest means something else. The receipt records the playbook digest; the *mandate* should bind the schema and execution-semantics version too. That is a caveat, and it does not exist yet.

Across organizations the critique's counter-hypothesis deserves respect rather than rebuttal: AI may make translation between local schemas cheap enough that a shared upper ontology matters less. The Graph is the live case — thousands of subgraphs, no upper ontology, and the question of whether a model can integrate across them is open. The substrate's bet is that *authority* needs shared meaning even where *data* can be translated: a mandate over "a payment to a member" has to mean the same thing to the payer's verifier and the payee's, and translation at act time is where the injection lives. That is a good argument and the thesis does not make it. It should, and it should concede that for read-only integration the counter-hypothesis is probably right.

### 9. Records belong to the owner — true for the person, unresolved for the shared, and at war with principle 1 in the target domain

For a person's own notes, messages and receipts, the vault model is right and the rebuild-or-bereavement test is the best sentence in the thesis. For a conversation between two people, an organization's grant, a joint plan or a disputed transaction, "the owner" is several parties with different rights. The substrate's answer exists — organizations have vaults; both parties get receipts — but the rule is unstated: *each principal's vault holds that principal's side of a shared record; the organization's vault holds the organization's; nothing is one party's alone if two signed it.* The departing employee keeps their receipts and loses the organization's records. Say it, and specify reconciliation.

Portability is also more than bytes. Passkeys are scoped to a relying-party domain; a passkey registered at one Home does not work at another. Moving a person between Homes therefore needs a custody ceremony — add a credential at the new Home, retire the old one — which, by principle 3's current contract, bumps the epoch and kills approved-hash grants. The substrate's portability claim and its rotation semantics are entangled, and the thesis notices neither.

The sharpest problem is inside the substrate's own beachhead. `memberOf`, `stewardOf` and `charteredUnder` are recorded on chain, typed as hierarchical, transitive and symmetric. On a public chain that is a public, machine-readable map of who belongs to which congregation and who stewards which mission organization. The Field application ships with a "discreet posture" — the product name kept out of the browser tab because the name itself is a disclosure to whoever picks up the device — and the estate anchors the membership graph of that same population on a ledger. Today the tension is hidden because the ledger is private and single-operator, which is precisely what principle 1 forbids. The moment the estate becomes neutral ground, the graph becomes discoverable. The substrate needs a rule it does not have: **relationships that are safety-sensitive are vault credentials, presented under grant; only commitments — digests, existence proofs — go on chain.** That is a real design change, and it should happen before the consortium chain, not after.

### 10. Evidence travels — a good principle that under-claims its own mechanism

A signed receipt proves the signer said so. Whether it proves the event depends on what the signer could observe and whether it had reason to lie. The critique's four-way distinction is the right one — attempted, accepted, state changed, outcome occurred — and the substrate's receipt already carries different evidence for each (verifier decision, invoker result, transaction hash, and nothing for outcome). The receipt schema should name which of the four it is attesting.

Selective disclosure is the harder problem: an owner can present the successful receipts and omit the failures, and a hash chain proves order, not completeness. The substrate has an answer it does not advertise — a `ReceiptAnchorRegistry` that anchors a run's bundle digest on chain — which gives a verifier an authoritative head. The thesis should claim it: *completeness is provable against the anchored head; the owner can withhold, and the withholding is visible.*

"Never the binary" is the thesis over-correcting. Attesting the behaviour definition rather than the binary is the right *identity* claim — a TEE proves which binary, not who may act. But environment evidence still matters as *execution* evidence, and RFC 9334's separation of evidence, appraisal and the relying party's decision is exactly the shape the substrate already uses for everything else. Attest the playbook for identity; permit environment attestation as one more evidence edge; let the reader compute.

### 11. Trust is a graph — right about the index, wrong about the reader

The refusal of a score *at the index* is correct and the thesis's own principle proves it: publish the evidence; let the reader compute. But "no score, no ranked list" prohibits the reader from computing, which is incoherent. A relying party that wants a task-specific estimate from relevant edges, independent verification and cost, and wants a ranked shortlist, is doing exactly what the principle asks. The prohibition should be on a *mandatory global* score and on the *index* ranking by anything but relevance. Reader-side scoring is not a concession; it is the design.

The Sybil point stands and the thesis should stop using ERC-8004's numbers as if they settled it. Canonical identities establish continuity, not independence; an attacker can mint accounts, sign mutually reinforcing attestations and route circular payments through them. A graph resists this only where edges are costly or independent — payment-backed interaction receipts, admission with real admission cost, attestations from parties with their own standing. The substrate has the edge types; it does not yet have a statement of which edges count against collusion. And ERC-8004's specification permits raw feedback, reviewer filtering and off-chain aggregation and acknowledges Sybil risk; the 93.8 percent figure is about reviewer addresses without measured x402 payment history in the study window, which is narrower than "never paid." Use the finding precisely or not at all; overreaching on it costs more credibility than it buys.

## Three tensions the substrate has with itself

These matter more than any single principle, because they are places where two principles the thesis holds cannot both be true as stated.

**Neutral ground against discreet posture.** Principle 1 wants the root on a chain nobody operates. Principle 9, in the target domain, wants membership to be undiscoverable. A public relationship graph on neutral ground is the opposite of discreet. Resolution: commitments on chain, relationships in vaults; and a consortium chain whose validators are the domain's own institutions rather than a public L2.

**Rotation doctrine against the custody epoch.** Principle 3 promises grants survive rotation. The contract bumps the epoch on every retirement. Resolution: define rotation and recovery as different ceremonies with different epoch behaviour, and make Home-to-Home portability a rotation, never a recovery.

**Enforcement at commit against effects the chain does not order.** Principle 6 promises verification "again at commit." For value that is literally true; for every other effect "commit" happens in an adapter. Resolution: say which effects are chain-ordered, and make the harness's receipt for the others name the adapter that committed and what it observed.

## What this means for focus

**Focus.** Person-centric domains with many small organizations and no incumbent intermediary: faith communities, mission work, mutual care, and eventually the regulation-driven portability domains. Here the person is the paying principal, records outlive any one organization, and the competitor is a vertical SaaS system of record whose bet is the organization's data, not the person's. This is the ground the substrate can hold and no one else is standing on.

**Do not pursue.** Enterprise workflow, where the tenant model wins on its own terms and should. Card-cleared commerce, where the networks' federation is the incumbent and the consumer's mandate is at best one signal in their scheme. Arguing with Okta; Okta is not wrong about tenants.

**Refine, in the thesis.** Principle 1 to "ordering and revocation oracle for everything; enforcer for value." Principle 4 to "no central authorization server; every resource owner verifies the grants it recognizes." Principle 5 to closed mandates for consequential effects and caveated delegations for the envelope, with AP2 cited. Principle 7 to "never sufficient." Principle 11 to "no score at the index." Drop "no seams," "law," and every claim of novelty that macaroons, RAR or AP2 already hold.

**Change, in the substrate.** Split rotation from recovery in the custody epoch. Move safety-sensitive relationships off chain into vault credentials with on-chain commitments. Bind schema and execution-semantics versions into the mandate. Add a per-resource aggregate enforcer. Name the conformance check for open intents and the logical request identity for nonces. Decide what "neutral" means for an estate chain and build the consortium.

**Stop claiming.** That a single-operator estate is decentralized. That the combination is necessary rather than advantageous. That the ERC-8004 numbers prove more than that unfiltered averages fail.

## What would prove it

The critique's three-implementation comparison is the right experiment and the substrate should run it against itself, in public: the same faith-domain workflow — a person giving to a congregation, joining a mission team, being invited by a steward, paying a caterer — built three ways. Federation on familiar parts: an IdP per organization, RAR-shaped approvals, resource-side checks, exportable signed receipts. Federation plus portable delegation and durable principal references. The full substrate. Then the six failure cases: revoke mid-run; compromise a key that has issued child grants; retry an external act whose response was lost; change a schema after approval; mint colluding identities with plausible receipts; migrate a live agent without the former operator's cooperation.

Two results would settle it in the substrate's favour. First, that on the cases which cross an organization boundary — the invitation, the migration, the compromise with descendants — the federated builds either cannot complete or complete by trusting an operator, and the substrate completes with a receipt a third party can check. Second, that two separately governed organizations, running separately governed estates, finish that work and prefer it. Until the second exists, the substrate has demonstrated an integrated platform, and the thesis should be read as a well-argued bet rather than a result.

*The outside critique this review draws on is published in full on its own page.*
