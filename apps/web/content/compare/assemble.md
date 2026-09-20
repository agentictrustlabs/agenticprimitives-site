*Assume the approach is right. Assume the substrate and every estate built on it use the whole Cloudflare platform — Workers, Durable Objects, Workflows, KV, D1, R2, Queues, Workers AI and AI Gateway, the Agents SDK, Access and Zero Trust, the WAF, Email, Turnstile — with a private Besu chain for enforcement and reference contracts on Base Sepolia. The question is then: who in the horizontal agentic market could assemble a similar capability, with what, by roughly February 2027, and where would that leave us. Dated claims below are from public announcements as of 20 September 2026; the forward view is a projection and is labelled as one.*

## 1. The capability set, and what we run it on

A substrate-and-estate is fifteen functions. Naming them is what makes "could someone assemble it" a question with an answer.

| Function | What it must do | What we run it on today |
| --- | --- | --- |
| Person identity | A person signs in and is a principal that can sign | Passkeys and OIDC at the Home (Vercel); the Person agent as an ERC-4337 account |
| Agent identity | Every agent — person's, organization's, service — is an account that can sign and be delegated to | ERC-4337 accounts; counterfactual until needed; typed names; cards projected from the profile |
| Custody and recovery | Credentials rotate; quorum recovery; the address never changes | Custody policy module: trustee, guardian, self-recovery, multisig; custody epoch |
| Delegation | A principal-issued, caveated, attenuable, revocable grant | ERC-7710 delegations; enforcers on chain; `isRevoked` |
| Mandate | A grant bound to one typed intent, single-use | DigestBindingEnforcer + PaymentEnforcer; the confirmation is a passkey signature |
| Verification | Outside the model, per step, again after approval, at commit for value | The harness on Workers + Durable Objects + Workflows; receiver-side re-verification at admission |
| Edge and tool gateway | Admission of every inbound act; MCP behind an admitted runtime | edge on Workers; A2A public surface; MCP OAuth envelope; Access for operators |
| Discovery and registry | Signed cards, admission receipts, resolution as addresses never credentials | Registry kit contracts; discovery tier on Workers + GraphDB; home-mcp connector |
| Payments and settlement | Value moves under a mandate, enforced in the committing transaction | Treasury service agents on the estate chain; a test coin; USDC on Base Sepolia |
| Evidence | Owner-held receipts a stranger can recompute; anchored completeness | PROV receipts in the vault; hash-chained audit sink; ReceiptAnchorRegistry |
| Coordination | Plans, commitments and endeavours between separately governed principals | The coordination package; its own ontology namespace |
| Skills and ontology | One definition generates the interface, the tools and the card | 39 ontology modules; capability claims; skills registry by digest |
| Home | The one place a credential is used; ceremonies; the vault UI; linked apps | The Home app (Vercel); ask-as-me connector for Claude |
| Estate infrastructure | The chain, the KMS, the vault store, the indexer, the gates | Besu QBFT on Azure; managed KMS for runtime signer and vault KEKs; Durable Objects; nightly live gates |
| Privacy | Two knowledge tiers; selective disclosure; membership proofs | Public KB projected from chain; SD-JWT presentations; Merkle membership proofs; relationships on the private chain |

Everything below is read against those fifteen.

## 2. The field, dated

What moved in the last six months, and what each mover now has. This is the material an assembler would work from.

**Cloudflare — our own infrastructure provider, now a participant.** Agents Week, August 2026: Cloudflare OS, an open-source browser-based agentic workspace the company has run internally since May, in which agents start with zero access and gain task-scoped permissions through *Gatekeepers* — governed connectors to internal systems that define what an agent may read or change and whether an action needs human approval. Cloudflare Wallets and cloudflare.pay: a stable identity handle for an account and for individual agents, an Account Wallet holding stablecoins, Virtual Wallets assigned to agents with a spending cap, an approved-merchant list and a per-transaction maximum, settling over x402 in USDC across Base, Ethereum, Polygon, Solana and Sui — announced, handles reservable, funding and programmable spending "in the coming months." An Identity-Aware AI Gateway with per-user and per-agent analytics; Workers AI and AI Gateway unified into one control plane; managed remote MCP servers on the 2026-07-28 MCP specification with OAuth, Access-based SSO on any MCP server; per-session durable identity in the Agents SDK. Cloudflare is also a launch adopter of Okta's Cross App Access.

**Okta.** Agent SSO reached general availability on 24 August 2026: agents supporting Cross App Access are registered as first-class identities in Universal Directory, issued short-lived governed tokens instead of static keys, and assigned or revoked through the same workflows as employees; included in core SSO plans. Twenty-five early adopters, among them Anthropic, Cloudflare, VS Code, Slack, Atlassian, Datadog, Keycard, WorkOS, Stytch and Keycloak.

**Microsoft.** Entra Agent ID generally available since April 2026; Agent 365 generally available 1 May as the unified registry and control plane for agents; Conditional Access and ID Protection for agents rolled out July–August; Agent ID extended to Dataverse in August. Behind it, the Agent Framework and Foundry for the runtime.

**Amazon.** Bedrock AgentCore: Policy generally available in March 2026 — fine-grained tool-access rules authored in natural language, compiled to Cedar, stored in a policy engine and enforced by AgentCore Gateway on every agent-tool call, outside the agent's code; Identity gained a managed Consent Portal in September so an end user can grant an agent access on their behalf; plus Runtime, Gateway, Memory and Observability. This is the most complete "verification outside the model" product from a hyperscaler.

**Google.** Agent Payments Protocol: signed Intent, Cart and Payment mandates over cards and stablecoins; by April 2026 three public deployments — PayPal's wallet with the Conversational Commerce Agent, the Mastercard Agent Pay pilot inside PayPal, and the A2A x402 extension carrying AP2 mandates into crypto settlement. ADK, A2A and Agent Engine underneath.

**Anthropic and OpenAI.** Anthropic: the Claude Agent SDK, Managed Agents in public beta since 8 April 2026, MCP at the 2026-07-28 specification. OpenAI: the Agents SDK and Workspace Agents; Agent Builder and Evals being wound down by 30 November 2026; the Connector Registry in beta for centralized OAuth and API-key access to data sources and MCP servers.

**The card networks.** Visa's Trusted Agent Protocol specification is final; pilots opened in April 2026 with AWS, Aldar and Highnote; the stated mainstream target is the 2026 holiday season — inside the window. Mastercard Agent Pay recorded Europe's first live end-to-end agent payment in March 2026 with Santander.

**The Web3 stacks.** ERC-8004 on Ethereum mainnet since 29 January 2026, with more than 24,000 agents registered there and around 170,000 across chains by a May study; Base next. x402 v2 since December 2025, with more than 100 million payments in its first six months by Coinbase's count, multichain, with bridges to ACH and card rails. MetaMask's Delegation Toolkit carries the ERC-7710 object model and prebuilt caveat enforcers; ERC-7715 permission requests and 7710 redemption are still marked experimental.

**Agent-identity specialists.** Keycard (multi-agent identity built on OAuth token exchange, RFC 8693, attenuating at each hop; acquired Anchor.dev to govern coding agents), Scalekit (scoped delegated access to a hundred-plus SaaS apps, token storage, tool calls on the user's behalf), Stytch (now Twilio), WorkOS, Zuplo, MintMCP. The standards consensus they share: SPIFFE and WIMSE for workloads, OAuth 2.1 through the MCP authorization specification for delegated access, and the IETF Identity Assertion Authorization Grant — Cross App Access — for enterprise brokering.

**Registries.** AGNTCY under the Linux Foundation with a Directory, OASF and an MCP server for discovery from an IDE; NANDA's index interoperating with AGNTCY; the official MCP registry; ERC-8004's three registries. A first-quarter 2026 survey counted more than 104,000 agents across fifteen-plus registries and ten-plus IETF drafts, with no interoperability between them.

**Runtime and observability.** LangSmith Deployment — the renamed LangGraph Platform — with durable execution, streaming, state, authentication and authorization on the agent APIs, and enterprise SSO and RBAC; Langfuse and the OpenTelemetry GenAI conventions beside it.

## 3. Four assemblies that could produce something similar

An assembler does not need every one of the fifteen functions; it needs enough of them to make a buyer stop looking. These are the four stacks most likely to get there, what each would have by February 2027, and what it would still lack.

### A. The Cloudflare-native assembly

*Components.* Cloudflare OS for the workspace and approvals; Gatekeepers as governed connectors; Cloudflare Wallets and cloudflare.pay for agent identity handles and capped spending over x402; Access for people and operators; managed MCP servers with OAuth; the Identity-Aware AI Gateway for observability and routing; Durable Objects and Workflows for the run; Okta Cross App Access for the enterprise tenant.

*By February 2027, projected.* An enterprise on Cloudflare can stand up agents that start with zero access, gain task-scoped access through governed connectors, require a human click for named actions, carry a stable Cloudflare-issued identity a counterparty can see, hold a virtual wallet with a cap and a merchant list, pay in USDC over x402, and be watched per user and per agent at the gateway. That is a tenant-grade estate in a box, on our own infrastructure, from the vendor that runs it.

*What it would still lack.* The identity is rooted in a Cloudflare account, so the principal is the tenant and the grant is the tenant's policy — there is no principal-issued, attenuable, revocable delegation and no chain of attenuation a stranger can verify. The spending guardrails are caps and lists, not a mandate bound to one intent's digest, so a planner can be lied into the wrong payee under the right cap. Approval is a click at a Gatekeeper, not a signature over a digest. Evidence is gateway analytics and connector logs, held by the platform. There is no coordination plane between separately governed organizations, no ontology-bound skill definition generating the interface and the card, and no person-facing Home — Cloudflare OS is an employee's workspace inside a company. No cross-estate participation.

*Time to parity on our differentiators.* Long, and not on their roadmap: the tenant root is the design, not an omission. But every function *around* the differentiators — hosting, gateway, wallet, connectors, approvals, observability — will be better than ours within the window.

### B. The enterprise-identity assembly

*Components.* Okta Agent SSO and Cross App Access, or Entra Agent ID with Agent 365 and Conditional Access for agents; Keycard or Scalekit for per-hop token-exchange delegation and scoped SaaS access; Entra Verified ID or an SD-JWT wallet for claims; the Microsoft Agent Framework or LangSmith Deployment for the runtime; a SIEM for evidence.

*By February 2027, projected.* Every enterprise agent has a directory identity, short-lived governed tokens, conditional access, cross-app access brokered by the identity provider, attributable per-hop delegation through token exchange, and lifecycle governance — with adoption already broad because Okta ships it in core SSO plans and Microsoft ships it in Microsoft 365.

*What it would still lack.* The root is the tenant; revocation is token expiry and introspection, not a per-step check against a principal's own revocation state; there is no enforcement at commit; evidence is the tenant's; a person who belongs to three organizations has three unrelated identities; cross-organization work is a federation agreement between identity providers. No Home, no self-sovereign anything.

*Time to parity.* Never, by design — and irrelevant to their buyers, who own the resources and the liability.

### C. The hyperscaler-platform assembly

*Components.* AWS AgentCore — Runtime, Identity with the Consent Portal, Gateway, Policy in Cedar, Memory, Observability — with Cognito, Verified Permissions and KMS; or Google's ADK, A2A, Agent Engine and AP2 with card and stablecoin settlement; or Anthropic Managed Agents and OpenAI's Agents SDK with a Connector Registry as the tool and data plane.

*By February 2027, projected.* AgentCore is the closest thing to "verification outside the model" as a product: policy authored in natural language, compiled to Cedar, enforced at a gateway on every tool call, with a hosted consent portal for acting on a user's behalf and managed memory and traces. Google's AP2 gives the closest thing to our mandate — an intent mandate bounding a session, a cart mandate binding a transaction, a payment mandate the network charges — with partners we cannot match and settlement over the networks the buyer already trusts, and a path into x402.

*What it would still lack.* Cedar policy is tenant-authored; the Consent Portal is consent to the tenant's agent, not a grant the person issued and can take to another provider; there is no check at commit for non-payment effects and no receipt the person holds. AP2 mandates are verifiable credentials with trusted approval surfaces — good — but no enforcer runs in the transaction that commits, and the evidence stays with the network and the merchant. Memory is vendor-held. No coordination plane, no ontology, no Home.

*Time to parity.* On mandates, AP2 is already at par in shape and ahead in distribution; what it does not have is chain enforcement and owner-held evidence, and it will not need them for its market. On policy authoring and consent UX, they are ahead of us today.

### D. The Web3 assembly

*Components.* MetaMask Delegation Toolkit for ERC-7710 delegations and caveats, with 7715 permission requests for the wallet UX; Rhinestone Smart Sessions or a ZeroDev or Biconomy account stack; Safe for organizations; Lit Vincent for agent permissions; ERC-8004 for identity, reputation and validation registries; x402 v2 and Coinbase's wallets for settlement; Privacy Pools or Railgun for shielded value; Aztec for private state, when ready.

*By February 2027, projected.* Delegations with caveats issued from a wallet a person already has; agents registered on mainnet and Base with feedback and validation attached; payments over x402 from Cloudflare, from AP2's extension and from Coinbase's stack. This is the only assembly that shares our root — the principal's own account — and it is where the delegation object model came from.

*What it would still lack.* Everything above the grant: no harness that verifies per step and re-verifies after approval, no mandate that binds an intent digest and a nonce (7710 caveats can express it; nobody ships it), no Home with ceremonies for a person who has never held a wallet, no ontology or skill definitions, no receipts as provenance, no coordination between organizations, and relationships that are either public on chain or absent. The registries put reputation at the index and are Sybil-heavy by their own measurement.

*Time to parity.* On the grant, they are us; on everything the grant needs to be usable by a congregation or a clinic, they are not building it.

## 4. Where we stand

| Function | Best assembled alternative by February 2027 | Our position | The specific deficiency |
| --- | --- | --- | --- |
| Person identity | Okta or Entra for employees; Cloudflare Access; EUDI and Verified ID wallets for claims | At par for sign-in; ahead on the person as a principal | No acceptance of Verified ID or EUDI presentations at admission; no XAA federation |
| Agent identity | Cloudflare agent handles; Entra Agent ID; ERC-8004 | Ahead — an account that can sign and delegate | No ERC-8004 projection shipped; no Cloudflare-handle projection |
| Custody and recovery | Wallet stacks (MetaMask, Safe); Entra recovery | Ahead on quorum recovery; behind on wallet reach | No rotation ceremony for a person; no 7715-compatible permission request |
| Delegation | MetaMask DTK (7710); Keycard token exchange | At par on the object; ahead on discipline around it | Grants void on ordinary rotation until the ceremony exists |
| Mandate | Google AP2 (intent, cart, payment); Cloudflare virtual-wallet caps | Ahead on enforcement at commit; behind on distribution | No AP2 mandate import or export; no conformance check for open intents; no version binding |
| Verification | AgentCore Policy + Gateway (Cedar); Cloudflare Gatekeepers | Ahead on per-step and post-approval re-verification; behind on policy authoring | No natural-language policy authoring; the adapter's observation is absent from the receipt |
| Edge and gateway | Cloudflare Gatekeepers and MCP OAuth; AgentCore Gateway; Zuplo, MintMCP | At par on MCP; ahead on admission as a separate act | No Cross App Access acceptance at the edge |
| Discovery | AGNTCY Directory; MCP registry; ERC-8004 | At par on the model; behind on presence | Not listed in the MCP registry; no OASF or AGNTCY projection |
| Payments | Cloudflare Wallets over x402; AP2 with the networks; Visa TAP by the holidays | Ahead on mandate at commit; far behind on rails and reach | No x402 settlement adapter; no cloudflare.pay virtual-wallet adapter; no card-network path |
| Evidence | LangSmith, Langfuse, AI Gateway analytics; C2PA for content | Ahead on owner-held, recomputable receipts; behind on watching a run | No OpenTelemetry exporter; no collector; receipt does not label attempt / accepted / committed / confirmed |
| Coordination | Nothing comparable; A2A handoffs inside one runtime | Ahead, alone | The two-organization demonstration has not been run |
| Skills and ontology | OASF descriptors; Connector Registry; SKILL.md conventions | Ahead, alone | Reuse is unmeasured |
| Home | AgentCore Consent Portal; Cloudflare OS for employees; wallet apps | Ahead as a person's place; behind on polish and replaceability | No Home-to-Home migration; Home on a different platform from the estate |
| Estate infrastructure | AgentCore, Managed Agents, LangSmith Deployment as hosted runtimes | Behind on hosted operations and scale | No packaged "stand up an estate" path; a single-operator chain |
| Privacy | Privacy Pools, Railgun, Aztec; SD-JWT wallets | At par on the primitives; behind on applying them across estates | No public projection of a grant; no multi-estate participation |

## 5. The deficiencies, dated to the window

Each item names when it starts to matter and what closes it.

1. **Cross App Access at the edge — matters now.** Okta's Agent SSO is generally available and Cloudflare, Anthropic and VS Code are adopters; enterprises will present XAA-brokered tokens for their agents by the fourth quarter. Our edge should accept an XAA assertion as *admission* evidence — never as authority — and map it to a tenant-scoped grant. A federation adapter at admission.
2. **AP2 mandates in and out — matters by the holidays.** Visa's mainstream target is the 2026 holiday season and AP2 has live deployments. Emit an AP2 cart mandate from our closed mandate and accept an AP2 intent mandate as a caveated delegation; support the A2A x402 extension so an AP2 mandate can settle through our treasury.
3. **x402 settlement, including cloudflare.pay — matters within the window.** Cloudflare Wallets' virtual wallets are promised "in the coming months." A treasury adapter that settles a mandate over x402 in USDC, and that can treat a cloudflare.pay virtual wallet as a payee or a source under a mandate, puts our enforcement at commit on the rail everyone will be using.
4. **The Cloudflare-native estate — matters now, as both risk and packaging.** Gatekeepers are admission by another name; the Identity-Aware AI Gateway is a cache of what our receipts prove; Cloudflare OS is an employee surface an organization's agent could live in. Accept Cloudflare agent handles as projections of an anchor; use the gateway as a cache, never as the record; and package an estate on Workers for Platforms and Containers so a builder stands one up in a day. Move the Home from Vercel to Cloudflare so the estate is one platform.
5. **Policy authoring — matters now.** AgentCore compiles natural language to Cedar and enforces it at a gateway, and has since March. Our tool policy has the stronger semantics and the weaker authoring experience; a natural-language front end that compiles to our declared risk ladder and caveats closes the visible gap.
6. **Consent on a third party's resource — matters now.** AgentCore's Consent Portal (September) is the consent-to-my-tenant's-agent ceremony. Our Home has ask-as-me; it needs the ceremony where a person grants her agent access to a resource a third party owns, with the third party's admission policy in the loop.
7. **Registry presence — matters within the window.** An ERC-8004 projector (mainnet and Base), an OASF and AGNTCY Directory projection, and a listing of the home-mcp connector in the MCP registry. Presence is cheap and absence is invisibility.
8. **Watching a run — matters now.** An OpenTelemetry GenAI exporter and a collector, so an operator can watch a run in LangSmith or Langfuse while the receipt stays the person's. Parity feature; the receipt is the differentiator and it needs the attempt / accepted / committed / confirmed label.
9. **Wallet and credential reach — matters within the window.** ERC-7715 permission-request compatibility so a MetaMask user can grant to our agents from the wallet she has; acceptance of Verified ID and EUDI SD-JWT presentations as evidence at admission.
10. **Multi-estate participation — matters as soon as the assemblies ship.** Cloudflare, Okta and Entra will each be an estate in effect. Our difference shows only when a person spans them: her Home in one, her agents admitted in another on a proof rooted in the first's public projection. This is the one item no assembler can copy and the one we have not built.
11. **A packaged, hosted estate — matters within the window.** Managed Agents, AgentCore and LangSmith Deployment set the bar for "run it for me." A builder should be able to stand up an estate — Home, runtime, edge, registry, chain — from the kit on Cloudflare in a day, with the consortium-validator path documented.
12. **The rotation ceremony — matters now.** Every assembly above lets a person replace a device without losing anything. Ours voids her standing grants until the Home re-approves them in a batch, and the Home has no such ceremony for a person.

## 6. What no assembly produces by February 2027

Assume all four assemblies ship everything projected above. None of them, alone or combined, produces:

- a grant **issued by the person** rather than by a tenant, portable to every resource that accepts her, with an attenuation chain a stranger can verify;
- a **mandate enforced in the transaction that commits**, bound to one intent's digest and a single-use nonce, so a compromised planner cannot change *what*;
- **re-verification after every human approval** and per step, so a revocation takes effect at the next protected act rather than at token expiry;
- **receipts the owner holds**, as provenance a counterparty can recompute against an anchored head, without the runtime's cooperation;
- a **coordination plane between separately governed principals**, where a plan grants nothing and each party presents its own mandate when it acts;
- **skill definitions bound to an ontology** from which the interface, the planner's tools and the agent card are generated, so the assistant and the product cannot disagree;
- a **Home the person can leave**, taking her identity, her agents, her grants and her records to another estate — once the rotation ceremony and the public projection exist.

That is the ground. The honest counter is that each assembly delivers "good enough" *inside a tenant*, faster, with support, from a vendor the buyer already pays — and that our ground only matters to a buyer whose participants will not live inside one tenant. Everything in section 5 is about making sure that buyer, when she arrives, does not find our edge, our rails, our registry presence or our operations to be the reason she leaves.

*Sources, dated: Okta Agent SSO general availability and Cross App Access partners (August 2026); AWS — AgentCore Policy general availability (March 2026), AgentCore Identity Consent Portal (September 2026); Microsoft — Entra Agent ID and Agent 365 (April–May 2026), Conditional Access for agents (July–August 2026); Cloudflare — Agents Week (August 2026): Cloudflare OS, Cloudflare Wallets and cloudflare.pay, Identity-Aware AI Gateway, Workers AI and AI Gateway unification; Google — AP2 deployments (April 2026); OpenAI — Agent Builder and Evals sunset (November 2026), Connector Registry beta; Anthropic — Managed Agents public beta (April 2026); Visa Trusted Agent Protocol pilots and holiday target (April 2026); Mastercard Agent Pay first live European payment (March 2026); ERC-8004 mainnet (January 2026) and the May 2026 empirical study; x402 v2 (December 2025); Keycard for Multi-Agent Apps (May 2026); AGNTCY at the Linux Foundation; the Q1 2026 State of Agent Discovery report.*
