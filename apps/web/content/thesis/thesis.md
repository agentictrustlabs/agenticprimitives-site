Healthcare spans patients, clinicians and care teams. Fitness spans coaches, facilities and daily habits. Faith spans people, congregations and ministries. Finance spans households, businesses, advisers and financial institutions. A cruise spans the line, its ports and the excursion operators ashore.

The opportunity is to turn their separate capabilities into coordinated action — with clear commitments, permission to act and continuity across organizations.

**Agentic Primitives gives domain innovators the shared foundation to build that coordination into their marketplace, community or partner network.**

A new participant brings expertise. A partner contributes services. An agent connects a need with the people and resources that can meet it. Each useful contribution expands what the ecosystem can accomplish.

Our strategy follows directly: **build the shared foundation once, make it specific to each domain, and let independent participants extend what everyone can do.**

In this substrate a person is an agent too — an account of their own that can sign — and the agents that act for them are chartered under that account, distinct from the agents that belong to companies, apps and treasuries. When the pages below say "participant," they mean a person and the agents she has chartered, or an organization and its service agents; when they say "act," they mean one of those agents acting under its principal's authority against an agent that belongs to someone else.

## 1. The opportunity belongs to the ecosystem builder.

If you are building a care network, a fitness community, a ministry partnership, a financial services ecosystem or a travel marketplace, your opportunity extends across the whole journey your participants are trying to complete.

People experience a course of care, a training goal, a shared mission, a financial plan or a cruise as connected work. Delivering it may involve many providers, applications, decisions and changes. Someone has to hold those pieces together.

Consider a relief effort after a storm. A congregation sends a volunteer team; a mission agency funds the supplies; a local partner church hosts the team and knows which families need help first. Then the team's arrival slips by two days. Rebooking the team is one task. Understanding what that slip means for the host families, the supply shipment, the agency's disbursement, the local partner's own volunteers and the families waiting is a coordination problem. Each organization controls a different part of the effort. The volunteers have limits and the host church has commitments that none of the others can simply override.

An ecosystem designed for that situation could let agents identify affected commitments, propose alternatives, seek the right approvals, request changes and carry back evidence of what each organization accepted. If one change fails, the plan must account for that failure. The experience depends on the participants' ability to work together under explicit terms.

The same structure appears in every domain. A referral involves several parties. A training plan changes when a person's circumstances change. A household's financial goal spans accounts, obligations and advisers. A cruise changes when a port is missed.

For a builder, the differentiating capability is to make that whole journey coherent. Each provider remains accountable for its contribution. The ecosystem makes their contributions discoverable, understandable and usable together.

## 2. Five markets. One architectural bet.

These are proposed applications of the AP foundation. They describe the value to pursue and the boundaries to preserve; they do not imply that every domain integration is already implemented or ready for production.

| Domain | Journey to coordinate | What independent participants contribute | What the builder makes possible |
| --- | --- | --- | --- |
| Healthcare | Referrals, appointments, care transitions and follow-through | Patients, clinicians, care teams, laboratories and service providers contribute authorized information, professional decisions and accountable actions. | A coordinated care journey with scoped disclosure, explicit handoffs and clear responsibility for clinical decisions. |
| Fitness | Sustained progress toward a personal goal | People, coaches, facilities, programs and permitted data sources contribute plans, sessions, observations and support. | Progress and permitted context that remain useful as the person moves between coaches, services and facilities. |
| Faith | Formation, mutual care, service and collective mission | People, congregations, ministries, funders and local partners contribute relationships, expertise, resources and commitments. | Shared efforts that preserve local governance, respect participation choices and protect sensitive relationships. |
| Finance | Planning, payments and follow-through across institutions | Households, businesses, advisers, account providers and payment services contribute information, expertise and authorized transactions. | Financial coordination through bounded permissions, specific approvals and verifiable records, within each institution's responsibilities. |
| Travel | Planning, booking, experiencing and adapting a cruise | Cruise lines, ports, excursion operators, guides and travellers contribute availability, services, preferences and commitments. | A cruise experience whose participants can coordinate changes — a missed port, a rebooked excursion — under the traveller's permissions and each provider's terms. |

The shared pattern is a goal, a set of participants, a plan, commitments, authorized actions and evidence of results. The meaning and obligations of those objects differ by domain.

What is actually common across the five is not a product, a schema or a workflow. It is three abstractions. The **principles** — the eleven in section 6 — say how identity, authority and evidence must behave whatever the domain. The **technical protocols** — ERC-4337 and ERC-7710 for accounts and delegation, A2A between agents, MCP between an agent and its tools, OpenID Connect and passkeys for sign-in, W3C Verifiable Credentials and DIDs for claims and identifiers — say how participants reach and check each other. The **ontological standards** — W3C PROV-O for who did what, P-Plan for plans and their steps, SKOS for vocabularies and crosswalks, W3C Organization and ActivityStreams for organizations and activity, with DOLCE beneath — say what kind of thing anything is. The substrate's own modules bind those three to code; each domain adds its meaning beneath them. Everything above that line is shared; everything below it is the domain's.

A training recommendation is not a clinical instruction. An invitation to a ministry partnership is not authority to spend its funds. A financial plan is not permission to execute every transaction that might advance it. A reservation is not a referral.

AP's strategy depends on preserving those distinctions while reusing the foundation underneath them.

## 3. What makes this a competing bet.

An ecosystem builder has several credible approaches. The right comparison concerns how work is coordinated, how participants retain control and how expensive the next integration becomes.

| Approach | How it creates value | Responsibility the builder takes on |
| --- | --- | --- |
| A comprehensive platform | Brings participants, workflows and records into one managed operating environment. | Define the platform's rules, operate the common system and support the breadth of the journey. |
| A network of integrations | Connects existing systems through APIs, adapters and agreements between partners. | Maintain the mappings, permissions and state transitions across each participating system. |
| A shared domain foundation | Gives independent participants common definitions, explicit authority and records they can verify and retain — a protocol carried by a kit, with builders standing up estates as places for identity and Home, each governed by the vertical's own institutions, and every identity self-sovereign and free to participate across them. | Govern the common model, make integrations dependable and prove that capabilities can be reused across journeys. |

**Our competing bet is that a shared domain foundation will make each additional participant and capability more useful — and less costly to coordinate — than rebuilding the same meaning, permissions and evidence at every connection.**

That advantage is a hypothesis to demonstrate. A tightly managed platform can be simpler for a bounded workflow. A few direct integrations can be sufficient for a small partner network. AP earns its place when a domain needs more combinations of independently governed participants than those approaches can economically maintain.

Identity providers, payment rails, systems of record and agent frameworks all have roles in that architecture. Identity and authority support the larger objective: dependable cooperation across the domain.

## 4. The strategy for building and providing AP.

**AP should provide a common foundation, governed domain models and a repeatable path from one useful workflow to a growing ecosystem.**

### The shared foundation

The common layer covers concerns that recur across all five markets: participant identity, custody, delegation, discovery, plans, commitments, execution checks, private records and verifiable receipts.

These primitives must compose. A capability discovered in a directory should mean the same thing when a planner selects it, an approver authorizes it, a service executes it and a counterparty reviews the result.

### The domain layer

Domain partners define the specialized objects, relationships, capabilities and rules that make the foundation useful in their world.

A healthcare model could define referrals, appointments, care-team roles and information-sharing purposes. Fitness could define goals, programs, sessions and progress observations. Faith could define communities, formation activities, partnerships and shared mission commitments. Finance could define accounts, obligations, budgets and payment mandates. A travel model could define sailings, shore excursions, reservations and cancellation terms.

These are versioned, governed definitions. They need domain expertise, explicit boundaries and a way to handle disagreement. Each solution can specialize them and map its existing systems to them.

### The ecosystem experience

Builders combine those layers into the marketplace, community or coordination experience their participants need. That includes onboarding, discovery, conversation, screens, approvals, shared plans and progress.

The builder decides whom the ecosystem admits, what contributions it recognizes, what quality means and how disputes are handled. Each participating organization retains authority over its resources and responsibilities.

AP's role is to make the underlying cooperation reusable. The domain builder's differentiation comes from its participants, expertise, experience and ability to deliver valuable outcomes.

### Estates, not a walled environment

The substrate is a protocol, carried by a kit, plus a domain ontology. It is not an operating environment, and Agentic Primitives does not operate one for you. What a builder stands up with the kit is an **estate**: a place that gives participants a Home for their identity and their records — a Home for people, an agent runtime, an edge, a registry, a chain — governed by that builder and the vertical's institutions. A vertical may have several. A denomination, a mission alliance and a relief network may each run one; a cruise line and a port authority may each run one; a health system may run its own under its own compliance obligations. The estate this project runs is a reference, not the product.

An identity does not belong to an estate. A person's account is hers; her Home lives in one estate, and she participates in any estate that admits her, carrying her agents, her grants and her receipts with her. An organization's agent is chartered by its custodians, not by the estate that hosts it. Moving a Home from one estate to another is a rotation ceremony, not a loss of identity. That is the structural difference from a closed platform whose participants exist only inside its walls: here the walls belong to the vertical's institutions, the identities belong to their principals, and the two are never the same thing.

Decentralized, self-sovereign identity and management is therefore not a feature of the substrate. It is the reason the substrate can be shared by participants who would never join one operator's system.

### The delivery sequence

Start with one journey involving at least two independently governed parties. Define the outcome, the capabilities required, the approval boundaries and the evidence of completion. Integrate the existing systems that matter to that journey.

Then add another participant offering a known capability. Add a new capability that can serve an existing plan. Demonstrate that the same capability can support a second journey. Exercise refusal, revocation, failure and provider change.

This sequence tests the economic claim behind AP: the second and third additions should benefit from the work already done. A broad platform catalogue is useful only if that reuse actually occurs.

## 5. Thirteen bets that make the ecosystem possible.

### 1. Independent participants can coordinate through explicit commitments.

A shared plan identifies the intended outcome, required capabilities and responsible parties. Each participant accepts its own commitments and authorizes its own agents. A mission coordinator can ask a host congregation to move a team's arrival; the congregation still decides whether to accept it under its own commitments.

**The test:** can multiple parties complete a shared plan while each remains responsible for its own decisions?

### 2. Shared meaning makes capabilities reusable.

A layered ontology defines what a resource, a role, an approval and an outcome mean. Applications translate their local terms at explicit boundaries. The model must name meaningful differences, such as a requested appointment versus a confirmed appointment.

**The test:** does the governed model reduce integration effort and semantic errors as participants join?

### 3. Identity must survive changes in tools and operators.

People, organizations and services need continuity as they change applications, models or hosting. The identity used to sign a commitment should remain recognizable. An agent's behaviour and operating configuration are separate, versioned claims that counterparties can evaluate.

**The test:** can a participant change providers while preserving the identity and valid commitments that others depend on?

### 4. Discovery must lead to a capability someone can responsibly engage.

A registry can serve a care network, fitness community, ministry partnership, financial ecosystem or destination. Its admission rules explain what a listing establishes. Discovery, willingness to participate and authority to act are separate decisions.

**The test:** can a participant find a suitable contributor, inspect relevant evidence and request work without treating a listing as blanket permission?

### 5. Records must remain useful across applications.

Each participant keeps the records it is entitled to retain. A volunteer can carry the receipt of a service commitment she completed; a coach can retain the records appropriate to the coaching relationship; a ministry partner can retain its side of a shared commitment. Portability does not transfer another party's private records or erase its retention duties.

**The test:** can participants leave an application without losing entitled history or acquiring information beyond their rights?

### 6. Useful discovery must coexist with privacy.

A public description can advertise a capability without exposing a patient relationship, a household's finances or a sensitive ministry network. Private information is disclosed for a defined purpose, to an authorized audience, at an appropriate level of detail.

**The test:** can a counterparty verify what it needs without learning the underlying private relationship graph?

### 7. Reusable primitives must produce a practical builder advantage.

Identity, delegation, receipts and execution checks recur across domains. A common kit should let builders concentrate on domain value and participant experience. Its advantage must show up in working integrations, maintenance effort and outcomes.

**The test:** does the next capability cost less to integrate and become usable in more than one journey?

### 8. Enforceable limits make greater autonomy practical.

An agent may propose ways to achieve a goal. Independent checks decide whether an action is within its authority. A spending limit, permitted recipient or disclosure boundary must survive a planner's mistake or an adversarial instruction.

**The test:** can agents complete useful work while altered, unauthorized and revoked actions are refused?

### 9. Trust depends on the relationship, purpose and evidence.

Evidence relevant to a guide's reliability differs from evidence relevant to clinical responsibility or a financial service. Signed credentials, attestations and interaction receipts can inform the decision. Each relying party evaluates that evidence for the work at hand.

**The test:** does the evidence improve selection decisions and remain useful under attempted manipulation?

### 10. Conversation and screens should invoke the same capabilities.

"Move our team to the Tuesday slot," a scheduling button and an agent's request should reach the same action definition, permission checks and records. Natural language may require clarification; a screen can provide exact parameters. Both enter one governed flow.

**The test:** do the different interfaces produce equivalent authorized actions and understandable results?

### 11. Broad goals must become specific, accountable actions.

"Organize the retreat" or "help me follow this plan" states an outcome and constraints. As the work becomes concrete, consequential actions need specific authorization. A general goal cannot silently become permission for adjacent purchases, disclosures or commitments.

**The test:** can each effect be traced to both the approved goal and the authority for that particular action?

### 12. Participants need a usable place to manage participation.

A Home brings together identity, agents, permissions, approvals and entitled records across applications. It must make delegation, recovery and departure understandable. Replaceability has to be demonstrated through a working migration process.

**The test:** can ordinary participants see who may do what, withdraw permission and change providers?

### 13. Every participant retains authority over its resources.

The ecosystem coordinator can propose a plan and establish participation requirements. Its role does not automatically grant access to every participant's funds, private data or agents. Each resource owner decides which grants it recognizes and which actions it admits.

**The test:** can differently governed parties cooperate while enforcing their own policies?

## 6. Eleven design principles beneath the vision.

These principles carry forward the substrate's technical foundation. They are architectural commitments; implementation maturity and production readiness must be assessed separately for each capability and integration.

### 1. Separate private state from public claims.

Private records and relationships should remain with the parties authorized to hold them. Public descriptions, commitments and proofs should disclose only what is necessary for discovery and verification.

The architecture distinguishes private enforcement from public verification. Consortium infrastructure needs explicit governance; public proofs require demonstrated security and disclosure properties. A private chain alone does not establish neutrality or protect information from its own operators.

### 2. Give each principal an identity that can sign and delegate.

The architecture uses smart accounts as persistent anchors for people, organizations and services. Names, directory entries and agent descriptions are projections of that identity. Credentials and runtime operators can change beneath it.

Identity continuity does not prove continuing competence or independence. Counterparties must also consider the agent's current behaviour, relevant evidence and operating conditions.

### 3. Distinguish planned rotation from recovery.

A planned custody change can re-approve appropriate standing grants under the new configuration. Recovery from a compromised credential must invalidate affected authority and require deliberate review before permissions are reissued.

In ecosystem terms, changing a provider should be manageable; recovering from a compromise should not silently preserve the compromise's descendants.

### 4. Represent authority as a bounded, revocable grant.

A delegation identifies who authorized whom, for what scope and under which conditions. A delegate can only narrow the authority it passes onward. The receiver checks the grants it recognizes against its own policy and current validity requirements.

Membership, an authenticated session or a registry listing may inform a decision. None should silently substitute for authority to perform the requested act.

### 5. Bind consequential effects to the approved intent.

A mandate identifies the concrete action being approved, its parameters, relevant versions and replay protections. A broad plan decomposes into bounded actions as details become known.

A ministry's supply purchase might bind supplier, amount and delivery terms. A data release might bind the recipient, purpose and permitted record selection. Each domain must define which effects require fresh approval and who is qualified to provide it.

### 6. Verify outside the model and at the point of execution.

The planner proposes. Independent checks evaluate authority and constraints. Receivers enforce the rules governing their resources. Supported on-chain effects can be checked in the transaction that commits them.

External APIs have their own execution and cancellation semantics. A permission check does not make an external action atomic with revocation. Each adapter must state its verification window, retry behaviour, failure handling and evidence of the result.

### 7. Keep people, organizations and software agents accountable in different ways.

The model distinguishes persons, organizations and software agents, drawing on PROV-O. A team can be represented as an organization; a service can operate under a principal's authority.

That distinction matters across every target domain. A clinician's judgment, a ministry's commitment, a volunteer's consent and a software agent's request are different acts. Relationships identify the parties; explicit grants establish what they may do.

### 8. Use one governed vocabulary from intent to receipt.

Capability definitions, plans, permissions, execution records and receipts should refer to the same versioned terms. Domain extensions preserve local meaning while explicit mappings connect existing systems.

The ontology constrains interpretation; it does not make a model infallible. Generated interfaces and tools can share the same mistake. Independent validation and negative cases remain necessary.

### 9. Keep durable records under appropriate participant control.

Each person and organization holds its entitled records. Shared commitments produce records for the relevant parties. Access to another participant's vault is scoped to the requester's authority.

Public knowledge and private records require different access paths. A generated query must not become the reason private information is disclosed. Healthcare and finance integrations must also preserve institutional recordkeeping and access responsibilities.

### 10. Make evidence portable and precise about what it proves.

Receipts should identify the action, authority, verifier decision, relevant versions and observed result. They must distinguish an attempt, acceptance, a state change and a confirmed outcome.

Anchored commitments can help detect modification or omission relative to a defined record set. They do not prove that an unobserved event occurred or that a provider's claim is true. A payment receipt, referral acceptance and completed service each require appropriate evidence.

### 11. Let participants evaluate trust from relevant evidence.

Registries publish descriptions and admission claims. Counterparties assess credentials, attestations and interaction evidence according to their own purposes and policies. A single mandatory global score cannot express every domain's decision.

Canonical identity supports continuity. Resistance to fake identities, collusion and manufactured evidence requires additional mechanisms and meaningful costs. Trust must be earned in ways relevant to the proposed work.

## 7. Shared meaning is where the domain becomes buildable.

A shared foundation becomes useful when a builder can describe its domain precisely enough for people, applications and agents to act together.

The substrate is built on a layered ontology: open foundational vocabularies, common agentic concepts, domain definitions and solution-specific extensions. The value lies in giving each layer a clear responsibility.

| Layer | What it establishes | How it supports the five markets |
| --- | --- | --- |
| Open foundations — W3C and other open standards | Parties, activities, plans, relationships and provenance: PROV-O, P-Plan, SKOS, W3C Organization, ActivityStreams, DOLCE. | A common basis for describing who committed to what and what occurred, in vocabularies no single vendor owns. |
| AP primitives — the principles and protocols, bound to code | Identity, custody, delegation, intent, capabilities, execution and receipts, over ERC-4337, ERC-7710, A2A, MCP, OpenID Connect, passkeys, Verifiable Credentials and DIDs. | Reusable mechanics for authorized cooperation. |
| Domain models | The meaning of specialized objects, actions and responsibilities. | Referrals, training plans, ministry commitments, financial mandates and reservations. |
| Solution extensions | Local policies, workflows and mappings to existing systems. | A care network, fitness community, ministry partnership, financial ecosystem or destination marketplace. |

An application can expose a capability once through the domain model. Its screen, conversational interface, agent description and execution path should agree about what that capability means.

In fitness, another coach could contribute a service that fits existing goals and approval flows. In travel, a new excursion operator could offer a capability already understood by a cruise plan. The specific provider differs; the shared meaning reduces the work needed to engage it.

This reuse has boundaries. Domain stewards must resolve disagreements, manage versions and name exceptions. A clinical referral and a marketing referral may share a word while carrying entirely different obligations. Cross-domain connections require their own mappings and permission decisions.

**Shared primitives do not imply shared data access, identical policies or automatic authority across domains.**

## 8. The ecosystem's advantage should accumulate.

The value of AP should grow through contributions that become useful beyond their original integration.

A provider adds a capability that several plans can use. A domain partner clarifies a definition that several applications depend on. A participant keeps a record that supports continuity with another provider. Evidence from a permitted interaction helps a counterparty make a better decision later.

For an ecosystem builder, that creates a potential advantage in the combination of participants, reusable capabilities, domain knowledge, reliable integrations and demonstrated cooperation.

For AP, the defensible work is making those foundations dependable and repeatable across domains. Code volume alone does not establish that advantage. Neither does the number of registered agents. The important questions are whether contributions are reused, whether the next integration is easier and whether participants choose to keep cooperating.

A care network could differentiate through accountable transitions. A fitness community could differentiate through sustained progress across services. A faith ecosystem could differentiate through coordinated care and mission. A financial ecosystem could differentiate through coherent planning and authorized execution across providers. A cruise ecosystem could differentiate through an experience that stays coherent when a port is missed.

The same primitives can support these outcomes, while each ecosystem creates its own domain value.

## 9. Bring existing systems into the journey.

Adoption needs a practical path. Providers already have systems, operating processes and responsibilities. AP integrations should make their capabilities usable in a shared journey while making the boundaries explicit.

Identity providers can authenticate people and workloads within organizations. Existing applications can expose operational capabilities. Agent runtimes can reason and use tools. Registries can support discovery. Payment and settlement services can move value. AP supplies common structures for meaning, authority, coordination and evidence across those components.

An adapter should state what it can read, request, authorize, change, cancel and verify. Its limitations are part of the capability definition. A host congregation's scheduling system that accepts a request asynchronously should not be represented as a confirmed placement. A service that cannot reverse an action should not promise cancellation through a generic workflow.

The ecosystem builder remains responsible for selecting and operating integrations appropriate to its domain. A common substrate reduces repeated work; it does not remove the obligations of the participants or substitute for professional judgment.

## 10. Prove the strategy one journey at a time.

Five markets establish the breadth of the architectural opportunity. They do not justify launching every domain at once. Select an initial workflow where committed participants, useful integrations and a measurable coordination problem make learning possible.

Faith and community work remain the concrete starting context: a running estate already carries people, congregations, treasuries, agents, mandates and receipts. Healthcare, fitness, finance and travel extend the strategy into additional ecosystems with different requirements. Readiness must be assessed independently rather than inferred from success in another domain.

| Domain | Illustrative initial proof | Evidence of value |
| --- | --- | --- |
| Healthcare | Coordinate a referral and appointment handoff between authorized parties. | The appropriate information reaches the intended recipient, responsibility is explicit, and acceptance or failure is visible. |
| Fitness | Carry an agreed goal and permitted progress context between a coach and facility. | Less repeated setup, clear access boundaries and continuity the participant finds useful. |
| Faith | Coordinate a shared service effort between independently governed organizations. | Accepted commitments, authorized resource contributions, protected relationships and records each party can retain. |
| Finance | Coordinate an approved payment between an organization's planning workflow and its treasury service. | The intended payee and amount are enforced, retries do not create duplicate payment, and the parties receive evidence of the result. |
| Travel | Coordinate a missed-port change across the cruise line and an excursion operator. | Both providers' accepted changes, the traveller's approval where required, and an updated plan that exposes any unresolved dependency. |

Across those proofs, measure time to onboard the next participant, effort to reuse a capability in another workflow, manual coordination required, completed outcomes, unauthorized actions refused, and the ability to change providers without losing entitled records.

Include a declined invitation, revoked grant, stale request, failed provider action and disputed outcome. A dependable ecosystem must make these ordinary situations understandable and recoverable.

The published implementation, critical review and readiness assessment provide material to inspect. The ecosystem bet still requires evidence from independent participants operating under their own governance.

## 11. Where the bet can fail.

**The shared foundation costs more than it saves.** Start with a bounded workflow and compare the full integration and maintenance cost with a conventional approach. Include governance and exception handling in the comparison.

**Domain agreement becomes a bottleneck.** Give domain stewards a clear process for definitions, versions, disputes and local extensions. Keep differences explicit. Reuse open vocabularies where they fit.

**Participants have little reason to contribute.** The ecosystem must give providers, experts and organizations a clear benefit from joining. More connections help only when they lead to useful work, appropriate compensation or meaningful shared outcomes.

**The coordinating operator accumulates excessive control.** Specify governance over admission, rules, custody and infrastructure. Demonstrate cooperation between independently governed deployments and a workable path for provider change.

**Coordination exposes sensitive relationships.** Minimize disclosure and examine what combined observations can reveal. A care relationship, household financial pattern or ministry association can be sensitive even when individual records appear harmless.

**External systems cannot enforce the promised limits.** Document what each integration can actually check and commit. Expose revocation windows, uncertain outcomes and actions that cannot be reversed. Do not imply that a shared plan makes independent systems one atomic transaction.

**The same design is applied indiscriminately across markets.** Reuse the primitives while keeping clinical responsibility, financial authority, local governance and participant consent explicit. Domain readiness and professional accountability remain separate requirements.

**Participants cannot understand their control.** Make approvals, delegation, recovery and departure usable product flows. A participant should be able to see what an agent can do, who can access a record and what has already happened.

## The bet we intend to prove.

**Build an ecosystem where every participant expands what everyone can accomplish.**

For healthcare, that means a care network that can carry responsibility across transitions. For fitness, progress that can continue across services. For faith, independent communities that can act together. For finance, goals connected to explicitly authorized action across providers. For travel, a cruise experience its providers can coordinate.

AP's opportunity is to give the builders of those ecosystems a shared foundation they can extend with domain expertise, participants and valuable experiences.

**The bet wins when the next participant is easier to connect, its capabilities make more journeys possible, and everyone retains control of what they contribute.**

*The domain examples describe strategic applications, not a claim of production readiness across all five markets.*
