*Assume the approach is right. Assume the substrate and every estate built on it use the whole Cloudflare platform — Workers, Durable Objects, Workflows, KV, D1, R2, Queues, Vectorize and AutoRAG, Workers AI and AI Gateway, the Agents SDK, Access and Zero Trust, the WAF and rate limiting, Email, Turnstile — with a private Besu chain for enforcement and reference contracts on Base Sepolia. The question is then: who in the horizontal agentic market could assemble a similar capability, with what, by roughly February 2027, and where would that leave us. Dated claims are from public announcements as of 20 September 2026; the forward view is a projection and is labelled as one.*

## 1. The capability map

A substrate-and-estate is not fifteen functions; it is closer to forty, in nine areas. Naming them is what makes "could someone assemble it" a question with an answer — and it is where the first version of this analysis was thin. The right-hand column is what the seventy-seven packages actually cover.

| Area | Function | What it must do | Ours |
| --- | --- | --- | --- |
| **Identity** | Person sign-in | Passkey, wallet or OAuth sign-in that yields a principal, not a session | `connect-auth`, `connect`, `connect-client`, `browser-identity`; FedCM as IdP and RP |
| | Smart accounts | Every principal an account that can sign, hold value, execute, recover | `agent-account`, `types`; ERC-4337 on chain |
| | Custody and recovery | Credentials rotate under a policy; quorum recovery; the address never changes | `account-custody`, `key-custody` (local AES, AWS KMS, GCP KMS, agentic KMS) |
| | Naming and profile | Typed names; a canonical profile every card and listing is projected from | `agent-naming`, `agent-profile` |
| | Relationships and organizations | Member-of, steward-of, chartered-under; enrollment, roles, revocation cascade; private related-agent credentials | `agent-relationships`, `organization`, `related-agents`, `situations` |
| | Resolution and directory | Where an agent is served; an evidence-backed read model over agents and facets | `agent-resolution`, `identity-directory`, adapters |
| **Authority** | Delegation | Principal-issued, caveated, attenuable, revocable grants | `delegation`, `delegated-signer`; enforcers on chain |
| | Mandates and payments | A grant bound to one typed intent, single-use; payment constraints, open and closed modes | `payments`; DigestBinding and Payment enforcers |
| | Tool policy and entitlements | Risk tiers, exact-call policy; resource / action / field / purpose entitlements as credentials | `tool-policy`, `entitlements`, `key-authorization`, `agentic-authorization` |
| | Admission and vault authority | Admission of every inbound act; who may read or write a vault subject | `admission`, `vault-authority` |
| **Harness** | Orchestration core | Plan → verify per step → execute → receipt, with the planner behind a port | `orchestration`, `harness` |
| | Model routing | More than one provider behind one port; the route decided before the call and recorded | `orchestration-anthropic`, `orchestration-openai-compat`; AI Gateway |
| | Durable execution | Attempts as reconcile → verify → act; suspension for approval or events; one executor per run | the durable port on Cloudflare Workflows and Durable Objects |
| | Memory and context | Standing instructions, remembered confirmations, preferences — vault-resident, room-scoped; two knowledge tiers | `context`; the vault |
| | Triggers | Schedule, message, webhook, on-commitment — with a panel on the Home | the Home's trigger surface on Durable Objects alarms |
| | Service and member runtimes | A generic service-agent framework; admitting an existing runtime as a workspace member without a rewrite; an ACP host | `service-agent`, `runtime-member`, `acp` |
| | Surface generation | One descriptor per route, A2A skill and MCP tool; cards and tool declarations generated | `surface-catalog`, `capability-claims` |
| | Evaluation | Truthfulness of answers against evidence; live gates with negative twins | `evaluation`; the nightly gates |
| **Edge and protocols** | Edge admission and rate control | Vendor-neutral admission; traffic limits and hard usage budgets | `edge-runtime`, `edge-cloudflare`, `rate-control`, `rate-control-cloudflare` |
| | MCP | A conformant protocol primitive; an OAuth envelope; delegation-aware middleware around the official SDK | `mcp-protocol`, `mcp-oauth`, `mcp-runtime` |
| | A2A | Async, delegation-authorized task transport; the public surface | `a2a` |
| **Registry and discovery** | Registry kit and resolution | Anchor-bound registries, pluggable admission, admission receipts; a composed typed resolver | `registry-kit`, `registry-resolution` |
| | Intent engagement | Intent resolution, a marketplace lane, the engagement protocol | `intent-resolver`, `intent-marketplace`, `intent-engagement` |
| **Evidence** | Audit and provenance | Append-only audit events; the PROV projector | `audit`, `provenance` |
| | Receipts, witness, attestations | Verifier-retained receipts; dispute attestation; EAS-aligned attestations with bilateral consent | `verification-receipts`, `witness`, `attestations` |
| | Credentials and privacy | W3C VC envelopes with EIP-712 proofs; selective-disclosure presentations | `verifiable-credentials`, `privacy-credentials` |
| | Agreements and fulfillment | Commitment-only agreements; fulfillment cases with tasks, artifacts, handoff policy and outcome evidence | `agreements`, `fulfillment` |
| **Coordination and collaboration** | Coordination | Endeavours, outcome specifications, plans, participation — between principals | `coordination` |
| | Messaging, channels, discussion | Inbox and direct messages; channels and discussion; directory of who can be reached; bodies in the vault, envelopes in transit | `fabric` |
| | Collaboration activities | Governed huddles; invitations as pending situations whose acceptance writes the relationship | `collaboration` |
| | Library and content | A per-agent library; verifiable content that is never stored or copied; managed storage for artifacts | `content-primitives`, `content-storage` |
| | Home | The person's place: identity, agents, grants, approvals, triggers, vault UI; portable | `home`; the Home app |
| **Ontology** | The T-box and shapes | Thirty-nine modules, SHACL, SKOS crosswalks; a build gate on invented terms | `ontology` |
| **Operations and data** | Vault and private storage | Per-record envelopes with data keys released under a decrypt grant; classification taxonomy; owner-held | `vault`, `key-custody`, `ap-kms` |
| | Public knowledge tier | A knowledge base projected from chain, queryable safely by a generated query | the discovery tier on Workers and GraphDB |
| | Chain read and KMS | The chain-read authority port; a manifest-driven managed-KMS orchestrator | `chain-state`, `chain-state-viem`, `ap-kms` |
| | Geo | Off-chain geo claims and an on-chain feature registry | `geo-features` |
| | Developer kit | A generator that scaffolds a relying app; the kit that pins packages, contracts and skills | `devkit`, `create-app`, the developer kit |
| | Contracts | Fifty contracts and their deployment records | `contracts` |

Everything below is read against that map.

## 2. The field, dated

What each mover has, by area. This is the material an assembler would work from.

**Identity and authority.** Okta Agent SSO reached general availability on 24 August 2026: agents supporting Cross App Access are first-class identities in Universal Directory with short-lived governed tokens, assigned and revoked like employees, in core SSO plans; adopters include Anthropic, Cloudflare, VS Code, Slack, Atlassian, Datadog, Keycard, WorkOS, Stytch and Keycloak. Microsoft Entra Agent ID has been generally available since April, Agent 365 since 1 May as the registry and control plane, with Conditional Access for agents rolled out July–August. Keycard builds multi-agent identity on OAuth token exchange (RFC 8693), attenuating at each hop; Scalekit gives agents scoped delegated access to a hundred-plus SaaS apps. Key custody outside the identity providers: Turnkey, Privy, Dfns and Fireblocks for policy-gated signing; the cloud KMSs. MetaMask's Delegation Toolkit carries ERC-7710 delegations and caveat enforcers, with ERC-7715 permission requests still experimental.

**Harness, runtime and memory.** LangSmith Deployment (the renamed LangGraph Platform) with durable execution, streaming, state, and enterprise SSO and RBAC; Microsoft Agent Framework with Foundry; Dapr Agents with durable approvals that auto-deny on timeout; the OpenAI Agents SDK (Agent Builder and Evals sunset by 30 November 2026); the Claude Agent SDK and Managed Agents in public beta since 8 April; AWS AgentCore Runtime with Memory and Observability; Cloudflare's Agents SDK with per-session durable identity, local SQL, scheduling and recoverable execution on Durable Objects and Workflows; Temporal and Inngest for durable execution generally; Mastra and the Vercel AI SDK for TypeScript agents. Memory is its own market: Mem0 leads adoption with about 55,000 GitHub stars by May 2026 as a hosted extract-and-store API; Zep with Graphiti leads on bi-temporal graphs and scores 71.2 percent on LongMemEval against Mem0's 49; Letta treats memory as an operating system the agent manages itself; LangMem and AgentCore Memory sit beside them.

**Edge, tool gateway and MCP.** Cloudflare's Agents Week in August: managed remote MCP servers on the 2026-07-28 specification with OAuth and Access-based SSO on any MCP server; Cloudflare OS with *Gatekeepers* — governed connectors that define what an agent may read or change and whether an action needs a human; an Identity-Aware AI Gateway with per-user and per-agent analytics; Workers AI and AI Gateway unified into one control plane. AWS AgentCore Gateway with Policy — natural language compiled to Cedar, enforced on every tool call outside the agent's code, generally available since March — and Identity's managed Consent Portal since September. OpenAI's Connector Registry in beta. Zuplo, MintMCP and Kong as gateways; rate limiting from the edge vendors.

**Registry and discovery.** AGNTCY under the Linux Foundation with a Directory, OASF and an MCP server for discovery from an IDE; NANDA's index interoperating with AGNTCY; the official MCP registry; ERC-8004 on Ethereum mainnet since 29 January with more than 24,000 agents there and around 170,000 across chains by May; a first-quarter survey counting more than 104,000 agents across fifteen-plus registries with no interoperability between them.

**Evidence, credentials and attestation.** LangSmith, Langfuse and the OpenTelemetry GenAI conventions for traces; C2PA content credentials for media; the Ethereum Attestation Service and Verax for on-chain attestations; Microsoft Entra Verified ID, SpruceID and Trinsic for verifiable credentials; the EUDI wallet programme with SD-JWT; DocuSign and the e-signature vendors for agreements.

**Coordination, collaboration and messaging.** Agentforce agents run inside Slack threads and DMs, scheduling, pulling CRM data, generating documents; Microsoft 365 Copilot lives inside Teams chats, channels, calls and meetings, and the Teams SDK brings a custom agent into Teams; A2A carries tasks and push notifications between agents; AGNTCY's SLIM is a secure low-latency transport; XMTP, Matrix and ActivityPub are the open messaging fabrics; the enterprise gateways add agent identities, permissions, memory and monitoring between Slack or Teams and internal systems.

**Vault, private storage and knowledge.** Solid and Inrupt's pods for person-controlled data; Apple Health and Google Health Connect as consumer data stores with export; enterprise content in Box, Google Drive and SharePoint; Lit Protocol and Fileverse for encrypted user-held content; Cloudflare R2, D1 and Durable Objects for storage; HashiCorp Vault and the cloud KMSs for keys; Vectorize and AutoRAG, Pinecone and the graph databases — GraphDB, Neo4j, Stardog — and The Graph's subgraphs for knowledge.

**Payments.** Cloudflare Wallets and cloudflare.pay: a stable identity handle per account and agent, Account Wallets holding stablecoins, Virtual Wallets per agent with a spending cap, an approved-merchant list and a per-transaction maximum, settling over x402 in USDC across Base, Ethereum, Polygon, Solana and Sui — announced 5 August, funding and programmable spending "in the coming months." Google's AP2 with signed Intent, Cart and Payment mandates and three public deployments by April (PayPal's wallet, the Mastercard Agent Pay pilot inside PayPal, the A2A x402 extension). Visa's Trusted Agent Protocol specification final, pilots since April with AWS, Aldar and Highnote, mainstream target the 2026 holidays. Mastercard Agent Pay's first live European payment in March with Santander. x402 v2 since December 2025 with more than 100 million payments in six months by Coinbase's count, multichain, bridged to ACH and cards.

**Developer kit and evaluation.** Vercel's AI SDK, Mastra, the Agents SDKs and Cloudflare's templates for scaffolding; LangSmith, Braintrust and Arize for evaluation; OpenAI's Evals retiring.

## 3. Four assemblies that could produce something similar

An assembler does not need every function; it needs enough of them to make a buyer stop looking. These are the four stacks most likely to get there, area by area, with what each would have by February 2027 and what it would still lack.

### A. The Cloudflare-native assembly

*Identity and authority.* Cloudflare account and agent handles; Access for people and operators; Okta Cross App Access for the enterprise tenant; Virtual Wallet caps, merchant lists and per-transaction maximums as the authority model for spend; Gatekeepers as the authority model for everything else.

*Harness and memory.* The Agents SDK — per-session durable identity, local SQL, scheduling, recoverable execution — on Durable Objects and Workflows; AI Gateway for routing, caching and observability; Workers AI or any provider behind it; agent state in Durable Object SQL with Vectorize and AutoRAG for retrieval.

*Edge and protocols.* Managed MCP servers with OAuth; the WAF and rate limiting; Cloudflare OS as the workspace.

*Collaboration.* Cloudflare OS micro-applications for employees; email through Cloudflare Email; no messaging fabric of its own.

*Vault and knowledge.* R2, D1 and Durable Objects; Vectorize; no owner-held, per-record-encrypted vault — data is the tenant's.

*Payments.* cloudflare.pay over x402 in USDC.

*By February 2027, projected.* An enterprise on Cloudflare stands up agents that start with zero access, gain task-scoped access through governed connectors, require a click for named actions, carry a stable Cloudflare identity, hold a capped virtual wallet, pay over x402, remember in Durable Object state, retrieve from Vectorize, and are watched per user and per agent. A tenant-grade estate in a box, on our own infrastructure, from the vendor that runs it — and better than ours on hosting, gateway, wallet rails, connectors and observability within the window.

*What it would still lack.* A principal outside the Cloudflare account, so no principal-issued, attenuable, revocable grant and no chain of attenuation a stranger can verify; caps and lists rather than a mandate bound to an intent's digest, so a planner can be lied into the wrong payee under the right cap; a click rather than a signature over a digest; evidence as gateway analytics the platform holds; memory and records the tenant owns, not the person; no messaging fabric with bodies in a vault; no coordination plane between separately governed organizations; no ontology-bound skill generating interface, tools and card; no person-facing Home; no cross-estate participation.

### B. The enterprise-identity assembly

*Identity and authority.* Okta Agent SSO or Entra Agent ID with Agent 365 and Conditional Access; Keycard or Scalekit for per-hop token-exchange delegation and scoped SaaS access; Verified ID or an SD-JWT wallet for claims; Turnkey or a cloud KMS for signing.

*Harness and memory.* Microsoft Agent Framework with Foundry, or LangSmith Deployment; Mem0 or Zep for memory; Foundry or LangSmith for evaluation.

*Edge and protocols.* An agent gateway — AgentCore Gateway, Zuplo or MintMCP — in front of MCP tools; Teams SDK or Slack for the surface.

*Collaboration.* Teams or Slack as the messaging and discussion fabric, with Copilot or Agentforce agents inside threads, channels, calls and meetings; SharePoint or Box as the library.

*Vault and knowledge.* The tenant's stores: SharePoint, Dataverse, Graph; Purview for classification; a SIEM for evidence.

*By February 2027, projected.* Every enterprise agent has a directory identity, governed tokens, conditional access, cross-app access brokered by the identity provider, per-hop attributable delegation, a memory service, a messaging surface people already live in, and lifecycle governance — broadly adopted because Okta ships it in core SSO plans and Microsoft ships it in Microsoft 365. This is the most complete assembly for a company acting inside its own walls.

*What it would still lack.* The root is the tenant; revocation is token expiry and introspection; no enforcement at commit; evidence and memory are the tenant's; messaging is inside one workspace vendor; a person who belongs to three organizations has three unrelated identities and three inboxes; no Home, no vault the person holds, no coordination across organizations except by federation agreement.

### C. The hyperscaler-platform assembly

*Identity and authority.* AgentCore Identity with the Consent Portal, Cognito, Verified Permissions in Cedar, KMS; or Google's identity with AP2 mandates for spend; Anthropic and OpenAI through connectors and their own OAuth.

*Harness and memory.* AgentCore Runtime with Memory and Observability; Google's ADK with Agent Engine; Managed Agents; the OpenAI Agents SDK; Policy at the gateway compiled from natural language.

*Edge and protocols.* AgentCore Gateway with Policy; the Connector Registry; A2A and MCP natively.

*Collaboration.* Google Workspace and Chat, or the vendor's own surfaces; A2A push notifications between agents.

*Vault and knowledge.* Bedrock Knowledge Bases, Vertex, vector stores; memory vendor-held.

*Payments.* AP2 over cards and stablecoins; the A2A x402 extension.

*By February 2027, projected.* AgentCore is the closest thing to "verification outside the model" as a product — policy authored in natural language, compiled to Cedar, enforced at a gateway on every tool call, a hosted consent portal for acting on a user's behalf, managed memory and traces. AP2 is the closest thing to our mandate — intent, cart and payment mandates as verifiable credentials with trusted approval surfaces — with partners we cannot match and settlement over the networks a buyer already trusts.

*What it would still lack.* Cedar policy is tenant-authored; consent is to the tenant's agent, not a grant the person takes elsewhere; no check at commit for non-payment effects; no receipt the person holds; AP2 mandates have no enforcer in the committing transaction and their evidence stays with the network and the merchant; memory and knowledge vendor-held; no coordination plane; no ontology; no Home; no vault the person holds.

### D. The Web3 assembly

*Identity and authority.* MetaMask Delegation Toolkit for ERC-7710 delegations and caveats, 7715 for the wallet's permission request; Rhinestone Smart Sessions or a ZeroDev or Biconomy account stack; Safe for organizations; Lit Vincent for agent permissions; Privy or Turnkey for embedded custody.

*Harness and memory.* None of its own; any of the frameworks above.

*Edge and protocols.* x402 as the HTTP-native payment gate; ERC-8004 registries for identity, reputation and validation.

*Collaboration.* XMTP for wallet-to-wallet messaging; Farcaster and the open social protocols.

*Vault and knowledge.* Lit and Fileverse for encrypted user-held content; IPFS and Filecoin; The Graph for public indexes.

*Payments.* x402 v2, Coinbase's wallets, stablecoins; Privacy Pools and Railgun for shielded settlement; Aztec for private state when ready.

*By February 2027, projected.* Delegations with caveats issued from a wallet a person already has; agents registered on mainnet and Base with feedback and validation; payments over x402 from Cloudflare, from AP2's extension and from Coinbase's stack; encrypted content the user holds. This is the only assembly that shares our root — the principal's own account — and it is where the delegation object model came from.

*What it would still lack.* Everything above the grant: no harness that verifies per step and re-verifies after approval; no mandate binding an intent digest and a nonce (7710 caveats can express it; nobody ships it); no Home with ceremonies for a person who has never held a wallet; no ontology or skill definitions; no receipts as provenance; no coordination between organizations; a messaging fabric without vault-held bodies or an admission model; relationships either public on chain or absent; reputation at the index and Sybil-heavy by its own measurement.

## 4. Where we stand, by function

| Area · function | Best assembled alternative by February 2027 | Our position | The specific deficiency |
| --- | --- | --- | --- |
| Identity · person sign-in | Okta and Entra for employees; Cloudflare Access; EUDI and Verified ID wallets | At par for sign-in; ahead on the person as a principal | No Verified ID or EUDI presentation accepted at admission; no Cross App Access federation |
| Identity · smart accounts | Cloudflare agent handles; Entra Agent ID; ERC-8004 | Ahead — an account that signs and delegates | No ERC-8004 projection shipped; no Cloudflare-handle projection |
| Identity · custody and recovery | Wallet stacks; Turnkey, Privy, Dfns; Entra recovery | Ahead on quorum recovery; at par on managed KMS; behind on wallet reach | No rotation ceremony for a person; no 7715-compatible permission request |
| Identity · naming, profile, resolution | ENS and DNS; AGNTCY Directory; agent cards | Ahead on projection from one profile; at par on resolution | No OASF or AGNTCY projection |
| Identity · relationships and organizations | Entra groups; Agent 365; Safe and Hats for on-chain roles | Ahead on relationships as never-authority; ahead on private related-agent credentials | Vault form of relationships incomplete; multi-estate participation absent |
| Authority · delegation | MetaMask DTK; Keycard token exchange | At par on the object; ahead on the discipline around it | Grants void on ordinary rotation until the ceremony exists |
| Authority · mandates and payments | Google AP2; Cloudflare Virtual Wallet caps; Visa TAP | Ahead on enforcement at commit; far behind on rails and distribution | No AP2 import or export; no x402 or cloudflare.pay adapter; no conformance check for open intents; no version binding |
| Authority · tool policy and entitlements | AgentCore Policy in Cedar; Verified Permissions; OpenFGA | Ahead on semantics — declared risk, exact-call, entitlement credentials; behind on authoring | No natural-language policy authoring |
| Authority · admission | Gatekeepers; AgentCore Gateway | Ahead on admission as a separate act with receipts | No Cross App Access acceptance at the edge |
| Harness · orchestration core | LangGraph, MAF, Dapr, OpenAI Agents SDK, Claude Agent SDK | Ahead on authority per step; behind on ergonomics and operator tooling | No collector; no operator debugger comparable to LangSmith Studio |
| Harness · model routing | AI Gateway; AgentCore; LiteLLM | At par, with the route recorded | Two planner bindings; no Google or Bedrock binding |
| Harness · durable execution | LangSmith Deployment; Temporal; AgentCore Runtime; Workflows | At par on the port; behind on time-travel, forks and dashboards | Reconcile implemented only for the ledger; approval timeouts not a product control |
| Harness · memory and context | Mem0, Zep and Graphiti, Letta, LangMem, AgentCore Memory, Agents SDK state | Ahead on ownership — vault-resident, room-scoped, under the person's grant; behind on recall quality and craft | No episodic summarization; no benchmark against LongMemEval-class tests; no Mem0- or Zep-style extraction |
| Harness · triggers | Agents SDK scheduling; LangSmith cron; Dapr hooks | At par | Approval-wait expiry not first-class |
| Harness · service and member runtimes | AgentCore; Managed Agents; runtime adapters | Ahead — admitting an existing runtime as a workspace member is unmatched | Two entry points share one intent runner but not one tool set and checkpoint |
| Harness · surface generation | OASF descriptors; the Connector Registry; SKILL.md | Ahead, alone | Reuse unmeasured |
| Harness · evaluation | LangSmith and Foundry evals; Braintrust; Arize | Behind on volume and model judges; ahead on truth cases against evidence | No model-judge harness; no eval dashboard |
| Edge · admission and rate control | Cloudflare WAF and rate limiting; Kong; Zuplo | At par — we run on the same edge | Hard usage budgets not surfaced to the Home |
| Edge · MCP and A2A | Cloudflare managed MCP; AgentCore Gateway; A2A 1.0 | At par on MCP; ahead on A2A with delegation and the TCK green | Not listed in the MCP registry |
| Registry · kit, resolution, intent engagement | AGNTCY, NANDA, ERC-8004, the MCP registry; Virtuals ACP and intent markets | At par on the model; ahead on intent engagement as a protocol; behind on presence | No OASF or AGNTCY projection; no ERC-8004 registration; the marketplace lane is a skeleton |
| Evidence · audit and provenance | LangSmith, Langfuse, AI Gateway analytics; OpenTelemetry | Ahead on owner-held, recomputable receipts; behind on watching a run | No OpenTelemetry exporter; receipt does not label attempt, accepted, committed, confirmed |
| Evidence · receipts, witness, attestations | EAS and Verax; C2PA for content | Ahead on verification receipts and dispute witness; at par on attestations | No EAS projection; no C2PA binding for content artifacts |
| Evidence · credentials and privacy | Verified ID, SpruceID, Trinsic, EUDI; Privacy Pools | At par on VC and SD-JWT; ahead on ontology-shaped credentials; behind on wallet interop | No EUDI wallet interop; zero-knowledge predicate suite reserved, not built |
| Evidence · agreements and fulfillment | DocuSign; AP2 cart mandates; Virtuals ACP | Ahead on commitment-only agreements bound to receipts | Fulfillment handoff across organizations not demonstrated |
| Coordination · between principals | Nothing comparable; A2A handoffs inside one runtime | Ahead, alone | The two-organization demonstration has not been run |
| Collaboration · messaging, channels, discussion | Slack and Teams with agents in threads; XMTP; Matrix | Ahead on bodies in the vault, envelopes in transit, admission per message; far behind on reach and polish | No bridge to Slack, Teams or XMTP; no rich presence; the invite fan-out is newer than the charter step |
| Collaboration · huddles and invitations | Teams meetings with Copilot; Slack huddles | Ahead on invitations as pending situations that grant nothing; behind on the experience | Fan-out enrolment newer and less exercised |
| Collaboration · library and content | Box, Drive, SharePoint; C2PA | Ahead on verifiable content never stored; at par on artifact storage | No C2PA binding; no rights-holder integrations |
| Collaboration · Home | AgentCore Consent Portal; Cloudflare OS for employees; wallet apps; Solid pods | Ahead as the person's place; behind on polish and replaceability | No Home-to-Home migration; Home on a different platform from the estate |
| Ontology | OASF; Palantir's ontology inside a tenant; schema-and-prompt everywhere else | Ahead, alone | Reuse unmeasured |
| Operations · vault and private storage | Solid and Inrupt; Lit and Fileverse; R2 and D1; HashiCorp Vault | Ahead on per-record keys under a decrypt grant and the rebuild-or-bereavement rule; behind on scale operations | Backup unscheduled; no tested key recovery; portability undemonstrated |
| Operations · public knowledge tier | Vectorize and AutoRAG; GraphDB; The Graph | Ahead on the two-tier invariant; behind on retrieval craft | No AutoRAG or Vectorize path for the public tier |
| Operations · chain read and KMS | Cloud KMS; Turnkey | At par | Custody master key from a local secret; KMS caller identity shared across estates |
| Operations · estate infrastructure | AgentCore, Managed Agents, LangSmith Deployment as hosted runtimes | Behind on hosted operations and scale | No packaged "stand up an estate" path; a single-operator chain |
| Operations · developer kit | Vercel AI SDK; Mastra; Cloudflare templates | At par on scaffolding; ahead on a release that pins packages, contracts and skills | — |

## 5. The deficiencies, dated to the window

Each item names when it starts to matter and what closes it.

1. **Cross App Access at the edge — now.** Okta's Agent SSO is generally available and Cloudflare, Anthropic and VS Code are adopters; enterprises will present XAA-brokered tokens for their agents by the fourth quarter. Accept an XAA assertion as admission evidence — never authority — and map it to a tenant-scoped grant.
2. **AP2 mandates in and out — by the holidays.** Visa's mainstream target is the 2026 holiday season and AP2 has live deployments. Emit an AP2 cart mandate from a closed mandate; accept an AP2 intent mandate as a caveated delegation; support the A2A x402 extension.
3. **x402 settlement including cloudflare.pay — within the window.** A treasury adapter that settles a mandate over x402 in USDC and treats a Cloudflare Virtual Wallet as a payee or source under a mandate.
4. **The Cloudflare-native estate — now, as risk and packaging.** Accept Cloudflare agent handles as projections; use the Identity-Aware AI Gateway as a cache, never the record; package an estate on Workers for Platforms and Containers; move the Home from Vercel to Cloudflare.
5. **Policy authoring — now.** A natural-language front end that compiles to our declared risk ladder, exact-call policy and entitlement credentials, matching AgentCore Policy's experience with stronger semantics underneath.
6. **Consent on a third party's resource — now.** The Home ceremony in which a person grants her agent access to a resource someone else owns, with the owner's admission policy in the loop — the person-rooted answer to AgentCore's Consent Portal.
7. **Memory recall — within the window.** Ownership is our advantage; recall is theirs. Add episodic summarization and extraction into the vault-resident, room-scoped model, and benchmark it on LongMemEval-class tests, so that "the person owns it" is not paid for with worse memory.
8. **Messaging reach — within the window.** People live in Slack and Teams, and wallets in XMTP. A bridge that carries an envelope into and out of those fabrics — bodies staying in the vault, admission per message preserved — so an agent can be reached where people already are without the bridge becoming the record.
9. **Registry presence — within the window.** An ERC-8004 projector on mainnet and Base; an OASF and AGNTCY Directory projection; a listing of the home-mcp connector in the MCP registry.
10. **Watching a run — now.** An OpenTelemetry GenAI exporter and a collector, so an operator can watch in LangSmith or Langfuse while the receipt stays the person's; and the attempt, accepted, committed, confirmed label on the receipt.
11. **Wallet and credential reach — within the window.** ERC-7715 permission requests so a MetaMask user grants from the wallet she has; Verified ID and EUDI SD-JWT presentations accepted at admission; an EAS projection of attestations; a C2PA binding for content artifacts.
12. **Vault operations — now.** Scheduled backup and a tested key-recovery drill for the vault; the custody master key into managed KMS with a per-estate caller identity. These are the items that gate a real person's data.
13. **Retrieval craft for the public tier — within the window.** An AutoRAG or Vectorize path over the public knowledge base, with the two-tier invariant intact.
14. **Multi-estate participation — as soon as the assemblies ship.** Cloudflare, Okta and Entra will each be an estate in effect. Our difference shows only when a person spans them: her Home in one, her agents admitted in another on a proof rooted in the first's public projection.
15. **A packaged, hosted estate — within the window.** Managed Agents, AgentCore and LangSmith Deployment set the bar for "run it for me." A builder should stand up an estate — Home, runtime, edge, registry, chain — from the kit on Cloudflare in a day, with the consortium-validator path documented.
16. **The rotation ceremony — now.** Every assembly lets a person replace a device without losing anything; ours voids her standing grants until the Home re-approves them in a batch, and the Home has no such ceremony for a person.

## 6. What no assembly produces by February 2027

Assume all four assemblies ship everything projected above. None of them, alone or combined, produces:

- a grant **issued by the person** rather than a tenant, portable to every resource that accepts her, with an attenuation chain a stranger can verify;
- a **mandate enforced in the transaction that commits**, bound to one intent's digest and a single-use nonce, so a compromised planner cannot change *what*;
- **re-verification after every human approval** and per step, so a revocation takes effect at the next protected act rather than at token expiry;
- **memory, messages and records the person owns** — vault-resident, per-record encrypted, room-scoped, released only under her grant — rather than a tenant's or a vendor's store with an export;
- a **messaging fabric** whose bodies never leave the vault and whose every message is admitted against a grant;
- **receipts the owner holds**, as provenance a counterparty can recompute against an anchored head, without the runtime's cooperation;
- a **coordination plane between separately governed principals**, where a plan grants nothing and each party presents its own mandate when it acts;
- **skill definitions bound to an ontology** from which the interface, the planner's tools and the agent card are generated, so the assistant and the product cannot disagree;
- a **Home the person can leave**, taking her identity, her agents, her grants, her memory and her records to another estate — once the rotation ceremony and the public projection exist.

That is the ground. The honest counter is that each assembly delivers "good enough" *inside a tenant*, faster, with support, from a vendor the buyer already pays — and that our ground only matters to a buyer whose participants will not live inside one tenant. Everything in section 5 is about making sure that buyer, when she arrives, does not find our memory, our messaging reach, our rails, our registry presence or our operations to be the reason she leaves.

*Sources, dated: Okta Agent SSO general availability and Cross App Access partners (August 2026); AWS — AgentCore Policy general availability (March 2026), AgentCore Identity Consent Portal (September 2026); Microsoft — Entra Agent ID and Agent 365 (April–May 2026), Conditional Access for agents (July–August 2026); Cloudflare — Agents Week (August 2026): Cloudflare OS, Cloudflare Wallets and cloudflare.pay, Identity-Aware AI Gateway, Workers AI and AI Gateway unification, managed MCP servers; Google — AP2 deployments (April 2026); OpenAI — Agent Builder and Evals sunset (November 2026), Connector Registry beta; Anthropic — Managed Agents public beta (April 2026); Visa Trusted Agent Protocol pilots and holiday target (April 2026); Mastercard Agent Pay first live European payment (March 2026); ERC-8004 mainnet (January 2026) and the May 2026 empirical study; x402 v2 (December 2025); Keycard for Multi-Agent Apps (May 2026); AGNTCY at the Linux Foundation; the Q1 2026 State of Agent Discovery report; the 2026 agent-memory comparisons (Mem0, Zep and Graphiti, Letta, LangMem); Slack and Teams agent deployments (2026).*
