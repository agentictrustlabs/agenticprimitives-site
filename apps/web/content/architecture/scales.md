# Substrate, estate, town, federation

**Status:** 2026-10-05. The four scales at which Agentic Primitives is built and deployed, one repository each.
Companions: [The estate and the federation](/architecture/estate) (the buildings) and
[Chains and estates](/architecture/chains) (what crosses a chain).

## In plain words

Agentic Primitives is built the way a place is built.

- The **substrate** is the materials and the building code. Nobody lives in it; everything else is built from it, so
  every Home, town and federation behaves the same way. You never touch it. It is why your agent can sign, why a
  permission you give can be taken back, and why there is always a receipt.
- An **estate** is your own property: the front door where you sign in (the Home), the staff who work for you (your
  agents), the filing cabinet that holds your records (the vault), and the gate that checks who may come in (the
  edge). You hold the keys. Nothing is done in your name without a permission you signed here, and you can take it
  back here.
- A **town** is the street your estate is on: the address book that says who lives where, the public notice board,
  the directories of who offers what, and the utilities every neighbour shares. Shared by all, owned by none. Being
  listed in a directory never gives anyone power over your estate.
- A **federation** is towns in different places, connected by public roads. You can visit another town and act there,
  but your keys never leave home; you prove what you are entitled to, sign at your own door, and keep the receipt.

The rule that runs through all four: being somewhere never gives anyone power over you. Your keys stay at your
estate. A town can list you; it cannot act for you. A federation can prove what you are entitled to elsewhere; it
cannot spend on your behalf.

## In full

Agentic Primitives is built at four scales. Each is a repository. Each depends only on the one below it. Each answers
a question the one below cannot, and each is held to one rule that keeps it from becoming the one above.

![The four scales: substrate, estate, town, federation](/architecture/scales.svg)

| Scale | Repository | What it is | Chain scope | Status |
| --- | --- | --- | --- | --- |
| **Substrate** | [`agentic-primitives`](https://github.com/agentictrustlabs/agentic-primitives) | The published packages and contracts: identity, authority, harness, edge, registry kit, evidence, coordination, ontology, operations, and the Developer Kit | Any EVM; nothing in a package names a chain or a host | Live. Ring 0, on npm, exact-pinned |
| **Estate** | [`ap-home`](https://github.com/agentictrustlabs/ap-home) | One deployment for one set of people and organizations: the Home where they sign, the agent runtime, the vault, the edge, the Home MCP, the RPC gateway | One chain | Public. Deploys Faithnet on faithchain |
| **Town** | [`ap-town`](https://github.com/agentictrustlabs/ap-town) | Several estates on one chain and the services they share: agent naming, the public graph and discovery, registries, KMS tenants, chain operations | One chain, by definition | Public. The services every estate on one chain shares |
| **Federation** | `ap-federation` | Towns on different chains, private and public, and the public ground that lets an estate in one prove its standing to an edge in another | Many chains | Next. Spec 410 §4 is its design |

"Scale," not "layer." Inside one deployment the substrate already has layers: application on harness, harness on
authority, authority on identity, identity on chain. The four scales are about how far a deployment reaches.

## 1. Substrate

**What is an agent, what may it do, and how is that proven?**

Seventy-seven `@agenticprimitives/*` packages and thirty-three contracts. A Smart Agent account per person,
organization and service; a delegation with caveats as the one authority mechanism; a harness that verifies every
step against a live grant; an edge that admits before anything; receipts the owner carries; an ontology every term
binds to by IRI. The Developer Kit (`create-app`, `doctor`, `conform`) is how a product repository starts and stays
honest against the rules.

**The rule:** generic. No vertical vocabulary, no brand, no hostname, no deployment. Products import the substrate;
the substrate imports nothing of theirs. Integrations with other people's protocols live outside it, importing inward.

## 2. Estate

**Where does a person sign, where do her agents run, and where is the record?**

An estate is one deployment of the substrate: a Home, an agent runtime, a vault, an edge, a Home MCP entrance, an RPC
gateway, all enforcing on one chain. Its people, organizations and services are accounts on that chain with typed
names. `ap-home` is the estate product; it deploys Faithnet, the Home at `faithnet.me` and the Workers behind it on
faithchain. A second estate is the same shape with other names. Building by building:
[The estate and the federation](/architecture/estate).

**The rule:** the vault is the record and Durable Object storage is a serving plane; only a person signs, and only
at her Home; no step runs without a live grant.

## 3. Town

**How do estates on one chain find each other, name each other, and read the same facts?**

A town is a chain's estates plus the services built on that chain's state: agent naming (typed registries,
forced-unique names, the on-chain type as the authority), the public graph (the indexer as the only writer, GraphDB,
discovery over A2A and MCP, the ARD document and the ACP registry), registries (registry-kit instances; the skills
registry that pins playbooks by digest), the KMS pilot with a tenant per estate, and the chain's own operations: RPC
gateways, governance with its timelock, a paymaster policy. ap-home and Faithnet stand in the faithchain town today;
faithnet-b, the federation twin, is its third estate.

Why a town is single-chain by definition: every service in it is a read of one chain's state or a contract on it. The
names are the chain's name registries. The graph holds only what that chain can prove. A town on Base would have its
own names, its own graph, its own registries.

**The rule:** nothing in a town grants. A resolver returns an address, never a credential. A registry's signature
binds only the fact that it lists. The graph holds only what anyone could rebuild from the chain. Trust is read
between two parties for an outcome, never scored by a directory.

[`ap-town`](https://github.com/agentictrustlabs/ap-town) is public. It holds what Ring 0 and Faithnet already run: `demo-discovery`, `demo-discovery-indexer`,
`demo-discovery-mcp`, `demo-discovery-a2a`, the naming service, the skills registry. Towns are what the
many-registries hypothesis predicts: hundreds of them, mostly vertical, each built from the same kit, no horizontal
winner.

## 4. Federation

**How does an agent from one chain act in an estate on another, without authority ever crossing?**

A federation is towns on different chains, some private (faithchain) and some public (Base), and the public ground
between them: an `EstateProjectionRegistry` on a public chain where each estate anchors its roots (live grants,
membership, resolver state, charter), a presentation that reveals one leaf, an admission evaluator that consumes it,
and the binding that makes one principal's accounts on several chains legibly hers. Authority stays on each chain;
evidence and value cross; a grant never does. What crosses, as what, and what ten chains would break:
[Chains and estates](/architecture/chains).

**The rule:** a message from another chain is evidence that something happened there. It is never a mandate here.

`ap-federation` is next. Its design is spec 410 §4, its gates are `check:cross-estate-admission` and
`check:participate-across-estates`, and its open questions are listed honestly in the chains note: the revocation
window across chains, custody propagation to satellite accounts, aggregate spend across chains, the public L2.

## 5. Why four, and why in this order

Each scale exists because the one below it cannot answer the question. Packages cannot say where a person signs; an
estate cannot say how two estates find each other; a town cannot say how two chains meet. And each scale is kept from
collapsing into the next by its rule: the substrate must not name a deployment, the estate must not become the
record's only copy, the town must not grant, the federation must not carry authority.

The order is the build order. The substrate was first and is the only thing a third party must take. `ap-home` was
cut second, with history, and is public. [`ap-town`](https://github.com/agentictrustlabs/ap-town) is public too, holding the services that already run. `ap-federation`
comes last because its design depends on everything below it holding: a cross-estate presentation is only worth
verifying if the estate's grants were real, the town's names were forced-unique, and the substrate's revocation was
final on its chain.

## Sources

ADR-0063 and spec 399 (the split), spec 410 §4 and §9 (the estate boundary, the consortium), ADR-0038 (many
registries), ADR-0040 (the public graph), ADR-0055 (the vault), ADR-0057 (the edge), ADR-0037 and ADR-0021 (what the
substrate must not contain), [`ap-home`](https://github.com/agentictrustlabs/ap-home) `README.md` and `DEPLOYER.md`, [`ap-town`](https://github.com/agentictrustlabs/ap-town) `README.md`.
