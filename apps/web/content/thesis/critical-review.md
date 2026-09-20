*Prepared for Richard Pedersen, September 20, 2026. Based on the supplied “Going against conventional wisdom” document and the primary sources linked below. This reviews the argument and its proposed guarantees; it is not an audit of the implementation.*

**The central problem is that the document turns a promising architectural combination into a claim of architectural necessity.** It repeatedly moves from “this property matters” to “this particular mechanism is required” without establishing the connection. Durable identity does not establish that every principal must be a smart account. Specific authorization does not establish that OAuth cannot express it. Portable evidence does not establish that its storage must be an owner-operated vault. Failure of an unfiltered reputation average does not establish that every contextual score is invalid.

The strongest surviving thesis is narrower: independent parties need a practical way to carry specific authority, inspect its provenance, constrain execution, and retain usable evidence across administrative boundaries. Your combination may implement that unusually well. The document does not yet demonstrate that advantage, and several of its strongest claims would make knowledgeable reviewers discount the better parts.

**The strongest competing bet is a federation of accountable resource owners using familiar infrastructure.** A serious enterprise architect could argue:

“The company owns the resources and bears the consequences of access. Its identity and authorization systems should govern employees and agents acting for it. We can add specific transaction approvals, constrained delegation, resource-side checks, and exportable signed receipts. For external collaboration, each organization recognizes selected issuers and retains its own policies. We do not need one universal identity provider, but neither do we need everyone to join a public-chain identity system.”

That argument is stronger than the opponent depicted in the document. An IdP-centered architecture can be inadequate for portable, cross-organization authority without being limited to authentication or frozen in 2012. Okta explicitly positions Cross App Access around moving access decisions to identity providers. Its June 23, 2026 announcement names Claude and VS Code integrations and describes an Anthropic customer beta. That supports the competing control-plane thesis; “shipped” should still distinguish integration announcements, beta availability, and general availability. [Okta’s XAA position](https://www.okta.com/solutions/cross-app-access/), [June 2026 announcement](https://www.okta.com/newsroom/press-releases/okta-announces-cross-app-access-partners/).

My strategic inference is that the incumbent can win without solving universal agent identity. It only has to solve a buyer’s important workflows with acceptable cost, integration effort, and operational responsibility. AP must demonstrate where the federated alternative becomes materially worse, rather than argue that it cannot exist.

## The collective thesis has seven major weaknesses.

1. **The dependency chain is asserted rather than established.** A typed payment request can be defined with a small schema. Signed delegation can exist without a blockchain. Evidence can be exported without a personal vault. A neutral settlement layer can be useful without becoming everyone’s identity root. The eleven principles may reinforce one another, but that is different from proving all eleven are prerequisites.

2. **The document compares its intended end state against selected weaknesses of competitors.** Fair comparison requires comparable scope: implementation against implementation, protocol against protocol, and operational guarantee against operational guarantee. Having more principles is not evidence of lower risk or greater customer value.

3. **The enforcement boundary is underspecified.** An EVM transaction can enforce conditions on changes within its execution boundary. It cannot make an unrelated email send, external database update, or bank API call part of that same atomic transaction. Bridges and adapters remain trusted components with explicit failure behavior.

4. **Cryptographic integrity is repeatedly allowed to stand in for semantic correctness.** A digest can bind the approved representation. It cannot establish that the representation captured the user’s meaning, that an invoice was legitimate, or that the recipient will deliver the promised outcome.

5. **Decentralization relocates governance.** Someone still decides account recovery, contract upgrades, ontology versions, admitted issuers, acceptable proofs, and emergency behavior. Public verification can reduce dependence on an operator, but it does not remove those decisions or their power.

6. **The breadth of the kit creates a concentrated failure surface.** Identity, custody, delegation, ontology, discovery, vaults, compiler, receipts, and Home become tightly coupled. A bad schema or compromised release can generate mutually consistent mistakes across UI, tools, verifier bindings, and audit records. Consistency is valuable; correlated error remains a risk.

7. **The adoption claim is not falsifiable yet.** “Experts underestimate AI” and “enterprises are not buying this axis yet” can protect the thesis from negative evidence. What result would convince you that a chain, universal ontology, or Home requirement costs more than it contributes?

**The opening explanation of Palantir is too simple to carry the argument.** The document attributes its success to focused markets and suggests AI lets AP expand similar principles more broadly. That is a possible hypothesis, not an established causal account. Palantir’s own architecture combines integrated data, semantic objects, actions, functions, security, and operational applications. Ontology is embedded in a much larger delivery system. [Palantir Ontology overview](https://www.palantir.com/docs/foundry/ontology/overview/).

AI may reduce the labor required to create mappings, code, and interfaces. It does not resolve who owns a disputed record, whether two organizations mean the same thing by “member,” or which exceptions their operations require. More capable models may also reduce the need for a globally unified ontology by making local mappings cheaper. Both effects are plausible. The thesis must test which dominates.

The sharper objection is economic: AI makes implementation cheaper for your competitors too. A broad kit becomes easier to produce, while trusted deployment, distribution, support, and semantic governance can remain expensive. Code volume is therefore weak evidence of defensibility.

**Each of the thirteen initial hypotheses faces a distinct objection.** The later principle analysis expands the overlapping points.

| Initial hypothesis | Strongest counterargument | What would substantiate the bet |
| --- | --- | --- |
| Core ontologies become worth their cost because of AI | AI can accelerate both ontology creation and direct mapping between local schemas. Shared semantics still require agreement and maintenance. Abstraction can impose its own dependencies. | Independent teams integrate a new domain faster and with fewer semantic defects than a smaller schema-and-adapter baseline. |
| Canonical agent identity, separate from an IdP | Persistence is useful, but global correlation can be harmful, and independently generated canonical IDs do not establish unique actors. | Identity survives runtime, key, and operator changes while preserving appropriate unlinkability and understandable recovery. |
| Identity is not registry; discovery becomes SEO | Separation is useful, but registries can combine functions successfully. Discovery economics may favor curated marketplaces or dominant aggregators. SEO can reward manipulation. | Agents discover useful counterparties across independent registries and retain meaningful choice when an index excludes them. |
| Private surface is identity plus a person-controlled vault | Many records concern multiple parties or belong to an organization. Data portability requires permissions, reconciliation, and compatible behavior as well as bytes. | A real migration preserves shared records and access rules without copying someone else’s data beyond the user’s rights. |
| Public surface is reproducible from chain | This is a clean rule for one public projection, but it excludes useful public off-chain material and can amplify correlation from on-chain metadata. | Useful discovery works without placing sensitive relationships on-chain or quietly introducing unaudited off-chain inputs. |
| AI makes a very broad composable kit feasible on Cloudflare | Generation cost is only one cost. Compatibility, support, verification, and provider dependence grow with breadth. | Another team can operate and extend the kit, and its important functions can move to a second runtime. |
| Guardrails can be complete rails with no seams | Complete mediation is possible only over identified interfaces and effects. Model errors, authorized harmful acts, and external systems remain. | A threat model lists every protected effect and demonstrates an enforcement point that cannot be bypassed within that boundary. |
| Provenance and trust require ontology and a trust graph; scores fail | Provenance does not establish truth. A graph can contain collusion. Contextual, calibrated scores can support decisions. | Evidence improves a defined decision against a baseline, including adversarial and incomplete evidence. |
| All UX goes through typed intent and mandate | Shared command validation is useful. Not every interaction is an action or needs an approval ceremony; explicit controls should not be reparsed by a model. | Equivalent actions have equivalent authorization semantics across modalities without unnecessary latency or prompts. |
| Authority binds to an intent digest rather than scope | Unknown resources require bounded discretion. A digest identifies the approved object but does not decide whether a novel plan satisfies it. | A deterministic verifier rejects forbidden intermediate effects while allowing useful alternative plans. |
| Home is the only credential surface | Home concentrates approval, recovery, and presentation risk. A mandatory hosted Home can become another control plane. | Users can replace it, approve safely through another compatible surface, and recover without its operator. |
| Applications are delegates and never custodians | Signing custody is only one kind of control. Apps can still read data, control recovery, change adapters, and exercise broad operational power. | A precise control matrix shows what a compromised app can and cannot do. |
| A2A coordination differs from harness orchestration; agents outlive runtimes | The conceptual distinction is sound, but wire protocols do not determine principal boundaries, and persistent names do not migrate running work. | A live agent migrates with tasks, grants, evidence, and replay protection intact, while counterparties retain their own authority. |

## 1. “Neutral ground, or no ground” imposes a stronger requirement than the problem establishes.

A public chain is attractive when parties need shared ordering and execution without appointing one transaction operator. That does not make it the necessary foundation of every identity or grant. A consortium, federation, signed capability system, or resource owner’s authorization service may be adequate for a particular relationship.

The claim that no vendor or platform operates the root must also be assessed for the actual deployment. Validators, sequencers where applicable, RPC services, upgrade authorities, and recovery mechanisms have different powers. Calling the chain public does not specify them.

The central technical limit is atomicity. Suppose AP validates a grant on-chain, then calls an external service to release a report. The grant is revoked after the check but before disclosure. The external service must provide its own enforcement and ordering semantics. The chain cannot roll back a disclosure that already happened. On-chain enforcement remains valuable, but the end-to-end promise is conditional.

There is also a policy distinction: a stranger can verify that Alice signed a delegation without accepting Alice as an authority over the stranger’s resource. Public verifiability does not compel admission.

**A defensible revision:** use a public chain where shared execution or independently verifiable authority state creates concrete value. State the trust and commit boundary of every off-chain adapter. Measure the incremental benefit against a federated baseline.

## 2. “The identity can sign” conflates a principal with one representation of its control.

An ERC-4337 account is a useful programmable control point. ERC-1271 specifies how a contract validates a signature; it does not itself give the contract a private signing key. ERC-4337 allows account implementations to define validation and recovery behavior. Neither standard automatically provides your full custody, quorum, grant, or migration policy. [ERC-1271](https://eips.ethereum.org/EIPS/eip-1271), [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337).

The phrase “a DID is just a pointer” does not establish its inferiority. An account address is also a reference to state interpreted under rules. The meaningful comparison is controller continuity, upgrade power, key rotation, recovery, verification cost, and migration. DID Core explicitly discusses verification-method rotation and historical verification, while noting that method support varies. [DID Core](https://www.w3.org/TR/did/).

There are cases where continuity itself becomes dangerous. An agent can retain the same account while its operator, model, system prompt, tools, or underlying implementation changes. Its historical competence should not automatically transfer to the new configuration. Stable principal identity and stable behavior are separate properties.

Similarly, one global identifier can connect activity across contexts that the person intended to keep separate. Pairwise identifiers and selective links can be desirable even when a stable private root exists.

**A defensible revision:** distinguish the principal, its control account, its credentials, its public projections, and its implementation versions. Make the smart account a chosen anchor implementation rather than a definition of personhood.

## 3. “Credentials rotate; the identity does not” is a good objective with unresolved compromise semantics.

Rotating a key stops future uses only under the relevant validation rules. It does not automatically cancel grants the attacker issued while the key was valid, erase disclosed data, or undo committed actions. The response to a compromise needs a rule for descendant grants and a definition of the compromise interval.

Ask what happens if an attacker uses a stolen authorized key to create a long-lived delegation to another key before discovery. Does revoking the first key invalidate the child? Does an account-wide authorization epoch change? Do counterparties need to refresh previously accepted proofs? These are not optional implementation details; they determine whether recovery works.

The statement that nothing naming the account needs re-signing is plausible for a simple identifier reference. It is too broad for artifacts whose validity depends on controller state, signer eligibility, or compromise history. Historical proof validation must distinguish valid-at-issuance evidence from authority-to-act-now.

“No app is a custodian” also needs a control analysis. An app that can invoke KMS, alter the trusted confirmation UI, deploy new policy code, or control recovery may wield substantial effective power even without exporting a root key.

**A defensible revision:** publish explicit rules for rotation, suspected compromise, descendant revocation, recovery quorum, lost recovery factors, and historical validation. Test the compromised-key case, not just a cooperative rotation.

## 4. “A token says who; a delegation says what” is technically misleading.

OAuth access tokens represent authorization to access protected resources; confusing them with identity assertions weakens the comparison. OAuth token introspection can report current validity and revocation state. The relevant distinction is the artifact’s semantics and how the resource enforces it, not whether it is called a token. [OAuth 2.0, section 1.4](https://www.rfc-editor.org/rfc/rfc6749.html#section-1.4), [RFC 7662](https://www.rfc-editor.org/rfc/rfc7662.html).

Attenuable delegation is also not unique to blockchain. The 2014 Macaroons work describes decentralized delegation with contextual caveats. It is a particularly direct counterexample to the claim that strangers require a public chain to handle constrained authority. That does not mean its revocation or operational model is identical to yours. [Macaroons research paper](https://research.google/pubs/macaroons-cookies-with-contextual-caveats-for-decentralized-authorization-in-the-cloud/).

ERC-7710 defines a minimal delegation-redemption interface. Obtaining delegations is outside its scope, and implementation does not require ERC-4337. Citing it does not establish all the issuance, attenuation, and revocation guarantees in your principle. Those need an AP profile and implementation evidence. [ERC-7710](https://eips.ethereum.org/EIPS/eip-7710).

Finally, a signed delegation only transfers authority the delegator actually has. Alice can authorize access to her own protected resource. She cannot authorize access to an employer’s confidential database merely by signing. The resource owner’s policy and recognized delegation chain remain decisive.

**A defensible revision:** emphasize principal-controlled, portable authorization artifacts, explicit attenuation, and resource-side enforcement. Identify which issuer dependencies this removes and which resource authorities necessarily remain.

## 5. “Authority binds to an intent, not a scope” contains the largest unresolved technical jump.

The criticism of a coarse payments-write permission is sound. The claim that conventional authorization is limited to it is not. RFC 9396 defines rich authorization requests and uses a payment with an amount, currency, creditor, and creditor account as its introductory example. It also supports machine-readable authorization types. AP may offer different portability and enforcement properties, but detailed transaction consent is not exclusive to AP. [RFC 9396](https://www.rfc-editor.org/rfc/rfc9396.html).

More fundamentally, an intent digest only proves which representation was authorized. Consider “organize the retreat for less than $2,000.” A digest cannot determine whether an unfamiliar hotel reservation, attendee-data disclosure, cancellation penalty, or subcontracting arrangement is permissible. The system must supply machine-checkable constraints, further approval, or discretionary interpretation. Unknown resources do not eliminate the need for bounds on that discretion.

For a fixed transfer, bind concrete execution parameters and replay state. For a flexible goal, specify permitted intermediate effects and a refinement rule from goal to action. Merely attaching the original goal’s digest to every tool call allows an unrelated call to carry the right digest. Some trusted component must check the relationship between the approved object and the proposed effect.

The nonce also needs more definition. If derived only from business intent fields, two intentionally identical payments collide. If fresh values are freely generated, unintended duplicates may acquire different nonces. Distinguish the logical request instance, signed mandate, individual action attempt, and receiver-enforced idempotency key. One-time redemption at one verifier does not ensure exactly one effect across independent external systems.

Google AP2 is a direct competitor the document must address. Its current authorization framework defines mandates, trusted approval surfaces, verifier checks, and receipts. It distinguishes open mandates containing constraints from closed mandates bound to a transaction. This is substantial overlap with your claimed problem and mechanism, even though it does not establish AP’s proposed chain enforcement or owner-vault guarantees. [AP2 Agent Authorization Framework](https://ap2-protocol.org/ap2/agent_authorization/).

**A defensible revision:** authority binds to an approved, versioned action or constraint set. Each proposed effect must satisfy that authorization under a defined verifier. A digest is the integrity mechanism, not the semantic verifier.

## 6. “Never acting stale is a property of the design” needs a precise consistency boundary.

Moving authorization checks outside the language model is strong engineering. Rechecking after long pauses is sensible. Neither provides instantaneous knowledge of a remote revocation.

If an executor loses contact with the authority source, it must stop, use a previously valid lease under an explicit freshness policy, or risk acting on outdated information. A design cannot silently promise both fresh knowledge and continued operation through a partition.

Even on-chain, “revoked” has to mean something precise: requested by the owner, broadcast, included in a block, finalized, or observed by a particular verifier. If action and revocation are ordered in the same authoritative state machine, define the guarantee in terms of that order. Do not imply that an action can never occur after the human clicked Revoke.

These consistency problems are not ignored by conventional authorization. Zanzibar was designed around causally ordered, externally consistent authorization decisions. It is relevant prior work for the guarantee, although it solves a different deployment problem. [Zanzibar paper](https://www.usenix.org/conference/atc19/presentation/pang).

Individual step authorization also fails to capture some aggregate harms. Two delegates can each spend within their local limit while jointly exceeding the owner’s budget. A permitted data read and a permitted external write can combine into a prohibited disclosure. The verifier needs shared budget state and information-flow rules where the application requires them.

**A defensible revision:** specify a serialization point, freshness policy, outage behavior, aggregate constraints, and adapter guarantees. Replace “never stale” with a property an independent test can actually observe.

## 7. “Accountability has exactly three shapes” mistakes an ontology profile for a universal rule.

PROV-O provides Person, Organization, and SoftwareAgent as three subclasses of Agent. It does not make your exclusive classification or payment operating model a law of accountability. Using those categories as an AP profile can be useful, but that restriction belongs to AP. [PROV-O](https://www.w3.org/TR/prov-o/).

“A person never pays; a treasury transacts” is an architectural allocation of functions. It can simplify consistent payment control. It can also add another principal, lifecycle, grant relationship, and failure point to a simple action. The document needs to show why a separate service boundary is required rather than merely convenient.

Typing an entity SoftwareAgent also does not answer who is responsible for its actions. A useful record must preserve the authorizer, executor, operator, beneficiary, and relevant organization when those differ. Broad categories are a starting point, not a responsibility model.

The caution that a bare member-of relationship is not automatically permission is correct. A blanket rule that verifiers must never use relationships is too restrictive. Explicit authorization policy can legitimately depend on current role membership. The forbidden step should be an implicit grant inferred from an ordinary descriptive edge.

**A defensible revision:** present the three categories as your modeling convention, justify separate service principals by risk or lifecycle needs, and permit relationships as policy inputs only through explicit, authoritative rules.

## 8. “One vocabulary from utterance to audit” reduces drift but can spread one error everywhere.

Generating UI, planner tools, discovery cards, and receipt schemas from one action definition is a strong consistency strategy. The counterargument is that shared syntax does not ensure correct semantics. A compiler can generate four agreeing surfaces for a wrongly modeled action.

An invented IRI is easy to reject. A valid but inappropriate IRI is harder. Two organizations can share a term while disagreeing about its meaning. Versions, provenance, mappings, and local policy overlays remain necessary.

There is also a security issue in schema evolution. If a signed intent’s meaning changes when an ontology, resolver, or policy implementation changes, its unchanged digest no longer guarantees unchanged operational interpretation. Approval must bind the relevant semantic and policy versions, with explicit upgrade behavior.

“Domain shape never lives in a prompt” should mean no independently maintained authoritative duplicate. Generated documentation and prompts may legitimately explain the domain to the planner. Denying that need would make the model less informed without making authorization safer.

“Behavior generated, authority never” also needs precision. Generated code may implement enforcement. In that case, the source model, compiler, review, and release process are part of the trusted computing base. The model may propose authority-bearing definitions; an authorized process must adopt them.

**A defensible revision:** maintain one versioned source of action contracts, allow domain-specific schemas and mappings, and test generated surfaces against independent behavioral expectations.

## 9. “Records belong to the owner; the app is a cache” underspecifies ownership and portability.

Personal custody is compelling for personal records. Many important records are relational: a shared conversation, joint plan, organization grant, payment dispute, or receipt signed by two parties. The document needs to distinguish subject, author, controller, custodian, and permitted reader. They are not always the same principal.

A departing worker’s ability to retain a personal identity does not settle which employer records may move with it. Similarly, deleting one owner’s copy cannot erase another participant’s legitimate copy. These are product and governance questions that the vault abstraction must represent.

The cache test is useful but incomplete. A store can be technically rebuildable while requiring days of processing or an unavailable external source. Portability requires keys, schemas, permissions, compatible execution semantics, and a tested restoration procedure.

The chain-only public graph has a clear integrity rule: its contents can be independently reconstructed. That is not a privacy proof. Indexing public events can make affiliation and activity correlations dramatically easier. Nor does it cover useful public information such as capability documentation or published research that originates off-chain. Add distinct provenance rules for publicly distributable off-chain material if the product needs it.

Per-record selectors reduce accidental over-disclosure but do not prevent inference from repeated permitted queries, aggregate counts, outputs, or metadata. Separate engines also do not help if a later component combines their results and sends private information to an unauthorized recipient.

**A defensible revision:** preserve owner-controlled authoritative records where ownership is clear, model shared rights explicitly, and evaluate disclosure across the full output path. Demonstrate migration using a different implementation.

## 10. “Evidence travels with the owner” is valuable; “never the binary” weakens its strongest guarantee.

A signed receipt can demonstrate that its signer made a statement. Whether it proves an action occurred depends on what the signer observed and why the verifier trusts that observation. The receipt should distinguish an attempted call, accepted request, committed state change, and independently observed outcome.

A playbook digest establishes which behavior definition was referenced. It does not establish that the executable followed that definition. A compromised runtime can claim to execute the approved playbook and then emit a false receipt. Independently enforced effects, external confirmations, witnessed logs, or execution attestation can strengthen different parts of that claim.

Remote-attestation architecture explicitly separates evidence, its appraisal, and the relying party’s decision; runtime measurements and configuration can matter. This does not mean every AP action needs a TEE or binary hash. It means “never the binary” is an unnecessary exclusion. [RFC 9334](https://www.rfc-editor.org/rfc/rfc9334.html).

Recomputing the verifier decision requires more than its final result: the applicable policies, versions, relevant inputs, authority state, and timing evidence must remain available. Even then, recomputing a decision is not the same as reproducing the external world’s outcome.

Owner custody introduces selective-disclosure risk. An agent can present favorable receipts and omit failures. A hash chain detects alteration of a known sequence; without external checkpoints, a known head, or another completeness mechanism, it does not establish that the presented history includes everything relevant.

**A defensible revision:** define receipt evidence levels, signer roles, completeness assumptions, and replayable verification inputs. Permit implementation or environment attestations when the threat model requires them.

## 11. “Trust is a graph; no score, no ranked list” overcorrects against bad aggregation.

A graph preserves relationships that a universal scalar hides. But the relying party must still make a choice. It may rationally compute a task-specific risk estimate or rank candidates by relevant performance, cost, and uncertainty. That computation need not become a universal reputation authority.

A graph is not inherently resistant to manipulation. One operator can create many agents, produce mutually reinforcing attestations, and conduct circular transactions. Signing all the edges makes their origins auditable under those identities; it does not prove the identities are independent. Canonical IDs address continuity, not uniqueness.

Payment-backed evidence can increase attack cost, but circular payments among controlled accounts can produce authentic receipts for artificial activity. The system still needs an argument about identity independence, economic cost, external anchors, or accountable admission. More detailed evidence is useful without being conclusive.

ERC-8004 is not accurately described as simply a centralized scalar reputation authority. Its specification provides on-chain registries, raw feedback, reviewer filters, optional off-chain evidence, and room for off-chain aggregation. It explicitly acknowledges Sybil risk. You can criticize the identity coupling, deployment governance, or actual scoring practices, but those are distinct criticisms. [ERC-8004](https://eips.ethereum.org/EIPS/eip-8004).

Discovery and authority should remain distinct, but refusing ranked discovery does not prevent someone else from becoming the dominant index. A usable product needs search and selection. The defensible property is that an index’s ranking cannot create authority and that consumers can choose competing indexes and evaluation policies.

**A defensible revision:** make raw signed evidence portable; avoid a mandatory global score; allow contextual evaluation, ranking, and explicit trust policies chosen by the relying party.

**The ERC-8004 empirical evidence supports a narrower conclusion than the document draws.** The cited numbers correspond to a study first submitted June 24, 2026, revised July 8, and covering data through May 13. It reports more than 170,000 registrations and substantial reputation manipulation. Its 93.8% figure concerns Base reviewer addresses lacking the measured x402 payment history during the observation window. It does not establish that those actors never paid through any channel or never used a service. [Study, version 2](https://arxiv.org/abs/2606.26028v2), [payment-history analysis](https://arxiv.org/pdf/2606.26028).

Even accepting its findings fully, the inference to “therefore canonical account identity plus projections is necessary” does not follow. You need a mechanism showing why the same attacker cannot create many AP anchors and manufacture AP evidence. The study also does not compare every possible contextual scoring method or evaluate AP.

Your statement that your own testing created more than 20% of initial agents should be clearly labeled as your report, with chain, dates, addresses, and denominator if published. I did not independently verify it. Test-generated registrations demonstrate that registration count is a poor adoption proxy. They do not, by themselves, demonstrate that registration identity is architecturally invalid.

## Three surrounding claims need explicit revisions beyond the numbered principles.

The first is the mandatory Home. A dedicated approval surface can reduce credential exposure. But if every user must trust the same Home operator for confirmation display, recovery, or availability, Home becomes a powerful intermediary. A user-controlled deployment changes that trust relationship, but does not remove operational requirements. WebAuthn credentials are scoped to a relying party, so moving to another Home also needs a deliberate credential-portability or re-enrollment design. [WebAuthn specification](https://www.w3.org/TR/webauthn-3/).

The second is the universal UX pipeline. A click with explicit parameters should enter the shared command and authorization layer directly. A chat request may require interpretation and clarification first. Reads, drafts, simulations, navigation, and protected effects need different policies. Shared semantics are the useful invariant; one identical conversational route or one mandatory approval pattern is not.

The third is the A2A/MCP boundary. The distinction between cooperation among principals and orchestration within one principal is useful. A2A’s own documentation distinguishes agent collaboration from tool integration and supports complementary use of MCP. Your additional contribution would be explicit principal and authority semantics. An A2A exchange can still occur between two services controlled by one organization, while an MCP call can cross an organization’s boundary. Protocol choice does not establish who may commit whom. [A2A and MCP documentation](https://a2a-protocol.org/latest/topics/a2a-and-mcp/).

An agent surviving its runtime also requires task-state portability, pending commitments, subscriptions, deadlines, idempotency records, and state reconciliation. A persistent identifier alone is insufficient. A migration demonstration should include an in-flight operation with an uncertain external outcome.

**“Rails, not throttles” should describe a layer of protection, not claim completeness.** A validly authorized act can still be harmful, fraudulent, or based on a misunderstanding. For example, a correctly signed payment to the intended account can still pay a fraudulent invoice. Every authority check may pass. That is a limit of authorization, not necessarily an implementation defect.

Sandboxing and network restrictions can also enforce hard constraints. They are not inherently probabilistic throttles. A process that cannot reach an external network lacks one route for exfiltration; a capability verifier controls another boundary. Both can be needed.

If “no seams” means no unguarded path to a protected operation, make that a demonstrable complete-mediation requirement. If it implies no trust boundaries or no residual risk, it is unsupportable. Safe composition depends on explicit, well-controlled boundaries.

## The competitor paragraph should be replaced with evidence-based comparisons.

| Claim in the draft | Stronger comparison |
| --- | --- |
| Everyone uses the same 2012 architecture | Separate authentication, grant representation, transaction binding, enforcement, evidence, and administrative ownership. Visa TAP, for example, specifies signatures bound to merchant, purpose, and time, with replay protections. That is already more specific than the blanket characterization. [Visa TAP](https://developer.visa.com/capabilities/trusted-agent-protocol). |
| Nobody has principle 5 | Compare AP mandates directly with AP2 mandates and rich authorization requests. Explain precisely what AP adds. |
| Nobody has principle 6 | External deterministic enforcement and consistency-aware authorization have substantial prior art. Compare threat models and freshness guarantees. |
| Nobody has principle 10 | Compare receipt structure, independent verification, ownership, completeness, and portability separately. Exportable evidence is not an all-or-nothing feature. |
| ERC-8004 empirics prove scores fail | Identify the evaluated aggregation, evidence rules, attacker cost, and dataset. Do not generalize one deployment’s failure to every decision model. |
| Every peer holds two or three principles | Supply sources and observable acceptance criteria. A source-free binary matrix mostly rewards the wording of your own framework. |
| Dina/Hestia has principle 12 | There are eleven principles in this version. Resolve the numbering and identify the exact projects, versions, and sources. |

**The beachhead mitigation may avoid testing the most important bet.** A single Estate can centrally manage its members, ontology, apps, recovery, and policies while using decentralized identifiers underneath. That can be a sensible first product. But success inside it chiefly validates an integrated operating environment.

To validate independence, involve two separately governed Estates. Let them use different identity providers, different administrators, and at least one different runtime. Require them to collaborate without granting either operator unilateral authority over the other. Then test migration and revocation when one operator is uncooperative or unavailable.

The commercial hypothesis should also identify who pays. The person benefiting from portability may not be the organization paying for the system. The app developer asked to integrate a protocol may not capture its network benefit. Lowering technical integration cost does not remove that incentive problem.

**The most informative next step is a comparison that removes architectural components one at a time.** Build one narrowly defined cross-organization workflow in three forms:

| Variant | Included components | Question it answers |
| --- | --- | --- |
| Conventional baseline | Existing organizational identity, typed commands, detailed approvals, resource-side policy checks, signed exportable receipts | How far can familiar components satisfy the requirements? |
| Portable authority | Baseline plus independently verifiable delegations and durable principal references | How much value comes from portability itself? |
| Full AP | Portable authority plus public-chain enforcement where applicable, ontology-generated surfaces, owner vaults, and Home | Which additional benefits justify the remaining cost and dependencies? |

Use the same workflow, adversarial cases, and operational requirements. Measure onboarding effort, successful completion, authorization failures, user corrections, latency, operating cost, recovery time, migration effort, and who can independently verify what. If a simpler variant delivers the same customer outcome, treat that as evidence to simplify.

## These concrete tests would expose the largest unresolved risks.

| Test | Adversarial or failure condition | Evidence required |
| --- | --- | --- |
| Meaning before signature | The parser selects the wrong recipient while the UI displays an ambiguous name | Approval displays authoritative details; the signed representation matches them; correction is possible. |
| Flexible intent | A plan reaches the goal while making an unnecessary disclosure | A stated policy rejects the forbidden intermediate effect. |
| Combined permissions | One permitted read feeds a separately permitted external write | Information-flow or output policy blocks disclosure where required. |
| Aggregate budget | Two delegates act concurrently under individually valid limits | Shared accounting prevents exceeding the owner’s total budget. |
| Revocation ordering | Revocation races execution, including a disconnected verifier | Documented outcomes match the stated serialization and outage rules. |
| External retry | A provider commits an action, loses its response, and the agent retries | Receiver-supported idempotency or reconciliation prevents unintended repetition. |
| Compromised key | An attacker issues child grants before the root credential is revoked | Recovery invalidates the intended descendants and preserves explainable historical evidence. |
| Semantic upgrade | An ontology or adapter changes between approval and execution | Version binding blocks silent reinterpretation. |
| Hostile runtime | A runtime references the approved playbook while running altered behavior | Independent enforcement or evidence detects or constrains the relevant deviation. |
| Selective history | An agent presents successful receipts while omitting failures | The verifier can determine the limits of completeness and does not treat selected history as complete. |
| Sybil evidence | One operator creates many anchors and mutually signed receipts | The evaluation remains robust under a defined attack budget and independence model. |
| Exit and continuity | Home is unavailable during an in-flight operation | A compatible replacement restores authorized operation and resolves uncertain outcomes without the former operator’s help. |

These are proposed acceptance tests, not tests performed in this review. Their thresholds should follow the intended product and threat model.

**The claim worth defending is portable, verifiable authority with explicit enforcement boundaries.** The public chain, smart accounts, ontology, vault, and Home should earn their place through measurable improvements to that outcome. The document becomes more credible when it states where each mechanism is necessary, where it is optional, and where another party must still be trusted.

The decisive demonstration is two independently governed organizations completing useful work, limiting each other’s authority, surviving compromise and migration, and retaining independently useful evidence at a cost they prefer to the conventional alternative.
