# The estate and the federation

**Status:** 2026-10-04. Drawn from what `ap-home` deploys today, what Ring 0 deploys as Faithnet, and the specs that
say how estates meet. **Reads:** [spec 399](https://github.com/agentictrustlabs/agentic-primitives/blob/master/specs/399-repository-split-program.md) (the names),
[spec 410 §4](https://github.com/agentictrustlabs/agentic-primitives/blob/master/specs/410-thesis-review-ten-additions.md) (the estate boundary), ADR-0057 (the edge), ADR-0055
(the vault), ADR-0040 (the public graph), ADR-0038 (registries), ADR-0019 (keys as delegates).

Agentic Primitives runs as **estates**. An estate is one deployment of the substrate: a Home where people sign, an
agent runtime, a vault, an edge, a Home MCP entrance, an RPC gateway, and the chain they all enforce on. Estates share
services held in common: agent naming, a public graph, registries, a KMS pilot, and, by design, public ground. Many
estates around one commons are a **federation**.

Four names, kept apart on purpose. **faithchain** is a chain. **Faithnet** is Ring 0's deployment on it. **Home** is
the product. **The estate** is one product deployment, with its own names, its own vault, and its own people.

## 1. One estate

![One estate: the ap-home deployment on faithchain, with people, applications and outside agents at its boundary](/architecture/estate-block.svg)

Every building has one job and one promise.

| Building | Deployed as | What it does | What it holds to |
| --- | --- | --- | --- |
| **Home** | `apps/home`, Next.js on Vercel | Passkey sign-in, OIDC issuer, the ceremonies (charter, invite, delegate, assign a playbook), parked approvals, revocation, the Ask | The only place a person signs. |
| **Agent runtime** | `home-a2a.faithnet.io`, Cloudflare Workers + Durable Objects (`A2aTaskDO`, `InteractionsDO`, huddles, provider meter), a wake queue, an approval workflow | One A2A agent per resident. The harness: plan → verify each step against a live grant → act → receipt. Playbooks by digest, triggers, budget-routed models | No step without a live grant. DO storage is the serving plane; the vault is the record. |
| **Vault** | `home-vault.faithnet.io`, D1, served as private MCP | Per-agent encrypted records under per-record delegation scope: inbox, roster, receipts, memory, relationships | Records the owner can carry away. The vault id is the estate's (`home-vault`), so a grant to one estate's vault never satisfies another's. |
| **Edge** | `home-edge.faithnet.io` | Admission for every inbound A2A message: transport, application identity, canonical resolution, mandate. Forwards to the runtime and the vault | Admission before anything. HTTPS required, mTLS optional evidence. |
| **Home MCP** | `home-mcp.faithnet.io` | A public MCP server and OAuth 2.1 authorization server that is a relying app of the Home. Claude.ai enters as the person, under her `ask-as-me` or `act-as-me` wires | The client holds a wire, never the person. |
| **RPC gateway** | `home-rpc.faithnet.io` → `faithchain-rpc.agentkg.io` | Tokenised JSON-RPC in front of the private chain | A token, rate-limited, per caller. |
| **Estate chain** | faithchain, chain 34348, Besu QBFT | `AgentAccount` + `CustodyPolicy` for every resident, `DelegationManager` + enforcers, name registries and typed subregistries, registry-kit instances, `ReceiptAnchorRegistry` | Revocation is final and global. Any EVM works. |
| **KMS** | AKCS pilot, tenant `faithnet` | The session keys services sign with | A key is a delegate under a wire the custodian minted. Compromise reaches a delegate, never an identity. |

Around the estate stand the people (browser, phone, Claude.ai), the relying applications (the field app, the card
room, yours: an OIDC client and an A2A caller), and outside agents (partner A2A agents, other estates, MCP clients).
Every one of them reaches the estate through the Home or the edge.

What is per-estate: the six services, their Durable Objects and D1, the KV namespaces, the secrets and the broker key,
the vault id, the people. Deploy order: RPC gateway → vault → runtime → edge → Home MCP → Home.

## 2. Who lives there

![Who lives in an estate: people, organizations and services, each a Smart Agent account on the estate chain, each with a typed name](/architecture/estate-residents.svg)

Every resident is a Smart Agent account on the estate chain, and every resident is a person, an organization, or a
service. The name says which: `.me` for a person; `.org`, `.team`, `.church`, `.circle` for an organization; `.svc`,
`.treasury`, `.workspace`, `.registry` for a service. The on-chain type is the authority and a mismatched suffix fails
closed. The address is the identity. A name, a card, a profile and a registry entry are facets that point at it.

Between residents the estate records relationships: membership and roles (person → organization), stewardship (a
person oversees an organization or service), team affiliation (team → organization), governance (workspace →
organization), charter (service → the agent that holds it), and delegation (any → any, caveated). How these differ is
[its own note](/ontology/membership-role-stewardship). Private relationships live in vaults. Public ones are chain state.

## 3. The commons

![The commons: agent naming, the public graph, registries, the KMS pilot and public ground, shared by every estate that attaches to them](/architecture/estate-commons.svg)

Nothing in the commons is anybody's Home. Each service answers a question any estate can ask, and none of them grants
anything.

| Service | What it is | How it is shared | Status |
| --- | --- | --- | --- |
| **Agent naming** | The name registry contracts and typed subregistries on a chain. Forced-unique names; a suffix names a derived agent type | Estates on one chain share its names by construction. Estates on different chains do not, yet | Live on faithchain |
| **Public graph** | The discovery indexer, the only writer, reads the chain into GraphDB (`graphdb.agentkg.io`). Discovery serves it over A2A and MCP (`discovery-a2a.faithnet.io`), as an ARD document and an ACP registry, and as passage retrieval over public, released works | A world-readable read tier. It holds only what anyone could rebuild from the chain: names, types, profiles, public relationships, cards, releases. Never a viewer's state, never a vault's contents | Live on faithchain |
| **Registries** | Registry-kit instances. The skills registry (`skills.faithnet.io`) pins playbooks by digest and renders ontologies; vertical registries list their own members. Admission receipts and a lifecycle log | Any estate's agent may be listed. A registry's signature binds only the fact that it lists | Live: skills registry |
| **KMS pilot** | One AKCS pilot, a tenant per estate, a wire per service | Shared operator; per-estate tenants and keys. The shared caller token is a posture finding to close | Live |
| **Public ground** | `EstateProjectionRegistry` on a public chain. Each estate anchors two roots, a live-grant root and a membership root, plus its charter hash, under its `estateId`, the estate's governance address on its own chain. A presentation reveals one leaf; the other estate's admission consumes it | The only thing public ground learns about an estate is its roots. One registry, many estates | Designed, generation 3, not deployed |

The public graph is the piece people compare with The Graph: an index built from chain events, rebuildable by anyone,
queried by everyone. The difference worth keeping is what it is allowed to contain. Reading the whole graph reveals
nothing reading the chain would not.

## 4. The federation

![The federation: estates on faithchain and on another chain, around the commons they share, with the roads between them](/architecture/federation.svg)

Four estates stand in the picture. **ap-home** and **Faithnet** are on faithchain, so they share its naming, its
indexer and its KMS tenant model by construction; only the default deployment serves names that are unpublished
(`A2A_SERVES_UNPUBLISHED_NAMES`). **faithnet-b** is the federation twin (`edge-b.faithnet.io`, `*.b.faithnet.io`), the
second deployment the cross-Home proofs run against. **Another product** on its own chain has the same shape and
shares nothing on chain; it meets the others on public ground.

| | Per estate | Shared |
| --- | --- | --- |
| People, organizations, services | ✓ their accounts, their vaults, their Home | names resolve from the commons |
| Home · runtime · vault · edge · Home MCP · RPC | ✓ | — |
| Durable Objects, D1, KV, secrets, broker key | ✓ | — |
| Name registries, typed subregistries | on the estate chain | ✓ for estates on that chain |
| Public graph, discovery, ARD/ACP | — | ✓ |
| Skills registry and other registries | — | ✓ |
| KMS | tenant and keys | ✓ the pilot |
| Roots on public ground | each estate's own | ✓ the registry |

The roads between estates all end at an edge. Resolve a name, read the records, fetch the signed card, send the A2A
message, be admitted. No road carries authority: a resolver returns an address, a card describes, a registry lists.

## 5. One act across the boundary

![One act across an estate boundary: Mara, whose Home is in estate A, acts on an organization served by estate B](/architecture/cross-estate-act.svg)

Mara's Home is in estate A. The organization she wants to act on is served by estate B.

1. Her agent in A resolves `outreach.team` through agent naming: an address and a type.
2. The public graph gives the organization's records: `atl:a2aEndpoint`, `atl:cardUri`, the signed card.
3. The A2A message reaches B's edge and is admitted: transport, identity, mandate, in that order, every time.
4. The act parks in B's runtime. B asks her Home in A for the signature. She signs there and nowhere else.
5. B executes under the grant, verified on chain at that step.
6. The receipt is written to her vault in A with `apexec:estate` naming B, and anchored in B's `ReceiptAnchorRegistry`.

Steps 1–3 are discovery and admission: addresses and documents. Step 4 is authority: a mandate she signs. Steps 5–6
are evidence: a receipt she keeps.

Where it stands. Reads and routed acts across Faithnet A and B are proven live (`verify-cross-deployment`: an
organization placed on B through its records, a read and an act routed from A, `observedVia: network`, a session
wire). Completion across deployments, hand-off with a live revocation twin, and the three-link authority chain are the
federation proofs G4–G6, pending the wave on faithnet-b. Roots on public ground, for estates on different chains, are
designed in spec 410 §4 and gated by `check:cross-estate-admission`.

## 6. Project NANDA

![Project NANDA's twelve protocol layers, and which part of an estate answers each](/architecture/nanda-layers.svg)

Project NANDA frames agent-to-agent interaction as twelve protocol layers and builds a sandbox where plugins for each
layer meet. An estate answers each layer with a building, and the mapping is honest: eleven are live in some estate
today, and negotiation (the intent engagement profile, spec 336) is specified and partly built.

Where the two stacks agree: a lean index (our chain), a signed facts document (our `AgentServicePublication` and signed
card), a quilt of registries (our registry kit, with no horizontal root). Where they differ, and the difference is the
point of the estate: the agent signs its own address and its own facts, a resolver issues no tokens, a registry delists
but cannot revoke, and trust is read between two parties for an outcome, never scored by a directory. An estate's
agents can appear in a NANDA index as projections of their accounts, each entry carrying a proof the account signed.
That adapter belongs in a sibling repository, as every external protocol bridge does.

## 7. What an estate is not

- **Not a chain.** Two estates share faithchain today. A chain is where an estate enforces; it is not the estate.
- **Not Ring 0's deployment.** Faithnet is one estate among several. `ap-home` is another, from a product repository
  on published packages.
- **Not a tenant of a registry.** Registries list an estate's agents. They hold no authority over them.
- **Not its Durable Objects.** If a DO were wiped the loss is a rebuild. If a vault were wiped the loss is a
  bereavement. That test decides where a record lives.
- **Not its KMS.** The KMS holds delegates. The custodian of an identity is a person or an organization at a Home.

## Sources

`ap-home`: `README.md`, `DEPLOYER.md`, `deploy/estate.json`, `docs/runbooks/estate.md`, `apps/*/wrangler.toml`,
`apps/home/src/lib/domain.ts`, `scripts/verify-cross-deployment.mts`. Ring 0: spec 399 §names, spec 410 §4 and §9,
spec 407 D-03/D-04/D10, ADR-0010, ADR-0019, ADR-0038, ADR-0040, ADR-0055, ADR-0057, ADR-0061, ADR-0063,
`docs/architecture/product-comparison/response-to-project-nanda.md`, `docs/runbooks/cross-home-wave-faithnet-b.md`.
