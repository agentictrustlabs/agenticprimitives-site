# Chains and estates

**Status:** exploration, 2026-10-04. Companion to [The estate and the federation](/architecture/estate). Everything
marked *live* runs today; *designed* has a spec and a gate named; *open* is a question this note frames and does not
decide.

An estate enforces on one chain. A chain is not an estate: several estates may stand on one, and an estate's residents
may hold accounts on others. Some chains are private (faithchain, a Besu network one operator runs), some are public
(Base). Both kinds are shared resources in the federation, and EVM chains come with a large cross-chain toolkit. The
question is what, out of everything an estate holds, may travel between chains, and as what.

The answer is one sentence, and the rest of this note is its consequences. **Authority is chain-local by
construction; evidence and value cross a chain, authority never does.**

## 1. Three ways a chain and an estate relate

![Chains and estates: two estates share a private chain, a third stands on a public one; authority stays on its chain, evidence and value cross](/architecture/chains-and-estates.svg)

| Relation | Example | What is shared | What it means for an act |
| --- | --- | --- | --- |
| **Two estates, one chain** | ap-home and Faithnet on faithchain | the same `AgentAccount`s, the same `DelegationManager`, the same name registries, one `isRevoked` read | a cross-estate act is chain-local: B's runtime verifies a grant A's resident signed, on the chain both read. Live |
| **Two estates, two chains** | ap-home on faithchain, a product on Base | nothing on chain. They meet on public ground, where each anchors its roots | the act in C runs under a grant issued and redeemed on C's chain; A's standing arrives as a proof against A's root. Designed (spec 410 §4) |
| **A public chain as the floor** | Base as public ground for every estate | `EstateProjectionRegistry`: one registry, many estates, each known only by its roots and governance address | C's edge reads A's root from its own chain, one read, no bridge. Designed; which public L2 is spec 407 D-03, Base the default proposal |

An estate on a public chain and an estate on a private chain are the same shape. The private chain buys a closed
validator set and no gas market; the public chain buys the floor everyone can read. Nothing in the substrate prefers
one: `relaxedT4Floor` is a deployer's stated choice, never inferred from `block.chainid`, after the estate's own chain
was once on a hardcoded list and an audited invariant was off where it mattered.

## 2. Why authority is chain-local

This is not a policy. It is what the contracts do.

- **A grant is signed into a chain.** `DelegationManager.DOMAIN_SEPARATOR` is built from `block.chainid` and the
  manager's own address. The same bytes presented on another chain, or to another manager, recover to nothing the
  manager will honour. `CustodyPolicy` builds its domain the same way.
- **Revocation is one read on one chain.** `isRevoked(hash)` on the manager that issued the grant. There is no
  cross-chain read of it, and under [ADR-0013](https://github.com/agentictrustlabs/agentic-primitives/blob/master/docs/architecture/decisions/0013-no-silent-fallbacks.md) there cannot be a second
  mechanism that supplies one when the first is unavailable.
- **A payment mandate names its chain.** PMT-INV-03 (spec 243): redeemable only on `contextBinding.chain`; a
  cross-chain replay fails by test (PMT-T-03).
- **Custody is per account, and an account is per chain.** `AgentAccount` + `CustodyPolicy` live where they were
  deployed. The factory's CREATE2 address commits to the whole custody configuration, so a second deployment with a
  different recovery shape is a different address.

The consequence for the federation: when a resident of estate A acts in estate C on another chain, the mandate is a
C-chain delegation, issued by an account on C's chain, redeemed on C's chain (spec 410 §4.4). What A contributes is
standing, as evidence: *this subject holds a live grant in A; this subject is a member of this organization in A*,
proved against a root A anchored. C decides whether that standing earns admission. C's own mandate, verified per
step, decides whether anything runs.

## 3. One principal, many chains

The identity question is the open one, and it is worth stating carefully.

**An address is chain-qualified.** The identifier is CAIP-10, `eip155:<chainId>:<address>`
([ADR-0008](https://github.com/agentictrustlabs/agentic-primitives/blob/master/docs/architecture/decisions/0008-caip10-nativeid-record-predicate.md), `CanonicalAgentId` in `types`). The same hex on
faithchain and on Base is two accounts with two custody states, two sets of grants and two revocation histories.
Nothing makes them one principal except a statement signed by both.

**The same address is reproducible.** CREATE2 from the same factory address, with the same implementation, salt and
custody configuration, yields the same hex on any EVM chain. A person can hold the "same" address on faithchain and
on Base, and a reader can recognise it. That is evidence that the same custodians deployed both, and no more: it is
not a grant on either side, and a verifier must never treat a match of hex as a match of authority.

**The binding is what is missing.** Spec 220 deferred multi-chain canonical identity and kept CAIP-10 as the bridge.
What a binding would be, in the substrate's own vocabulary: a signed statement from each account naming the other,
anchored where each lives, projected into the signed card so an outside verifier gets it without a chain read. One
account would be the **home account**: where custody is governed, where the Home signs, where recovery runs. The
others would be **satellite accounts**, controlled by the same custodians, holding only the grants and funds the
estate they stand in requires. A rotation at the home account would have to reach the satellites by ceremony, as
spec 410 §1 reaches standing wires. None of this is specified. The note names it so it is not re-derived as a
shortcut.

## 4. What crosses a chain boundary

![What crosses a chain boundary between estates, as what, and by which standard](/architecture/chain-boundary.svg)

| Thing | Crosses | How | Standard | Status |
| --- | --- | --- | --- | --- |
| **Address** | as a reference | `eip155:<chain>:<address>`. One hex on two chains is two accounts until a signed binding joins them | CAIP-10; CREATE2 | live; binding open |
| **Name** | as a record | A name belongs to the registry on its chain. Its `native-id` record may point at an account on another chain. A `.me` on faithchain and a `.me` on Base are two registries with two forced-unique rules | spec 215 records | live; no cross-chain name authority |
| **Grant** | never | Re-issued on the chain where it acts. The EIP-712 domain carries the chain id and the manager | EIP-712; ERC-7710 | by construction |
| **Revocation** | never read across | One read on the grant's chain. The live-grant root on public ground is refreshed on every revocation; a stale root is a refusal, never a cached acceptance | spec 410 §4 | designed |
| **Membership, relationships** | as a proof | The membership root on public ground; a `merkle-membership-v1` presentation reveals one leaf and nothing else about the estate's graph | `privacy-credentials` | designed |
| **Receipt** | as an anchor | Anchored in the `ReceiptAnchorRegistry` of the chain where the act ran. The vault record names the chain and the anchor. A mirrored anchor on another chain is evidence that an anchor exists there, never the receipt | spec 406; ERC-7786 for the mirror | anchors live; mirror open |
| **Value** | as a transfer | A treasury invokes a bridge adapter under a mandate redeemable only on the destination chain. Between two public chains: CCTP V2 for USDC, xERC20 for a token, ERC-7683 for an intent settled by a filler. Between a private chain and a public one there is no public bridge; the estate's operators would run one, and it would be a service agent with a treasury, not a protocol feature | CCTP V2; ERC-7281; ERC-7683 | reserved (spec 243); successor ADR named |
| **Public graph** | as tagged facts | The indexer reads each chain it is pointed at; every fact carries its CAIP-2 chain; the KB still holds only what the chain it names can prove | CAIP-2 | one chain today |
| **Charter, governance** | as a hash | The estate's `AgenticGovernance` address on its own chain is its id on public ground; the charter hash sits beside its roots | spec 410 §9 | designed |

Two things never cross: a grant, and the read of its revocation. Everything else crosses as a reference, a proof, an
anchor or a transfer, and each of those is read from the live original on the chain that holds it.

## 5. The EVM cross-chain toolkit, placed

The EVM world offers more cross-chain machinery than the federation needs. Here is where each piece sits, and the
test for all of them is the same: does it carry authority? If it does, it is refused as a path; if it carries
evidence or value, it is an adapter.

| Standard | What it is | Where it sits here |
| --- | --- | --- |
| CAIP-2, CAIP-10 | chain and account identifiers | **adopted.** On every reference, every receipt, every fact |
| EIP-712 domain with `chainId` | typed-data signing bound to one chain and one verifying contract | **the reason** authority is chain-local |
| ERC-1271, ERC-6492 | signature validation by a contract account, including a counterfactual one | **adopted** (`UniversalSignatureValidator`). Cross-chain it means: verify against the account on *its* chain, never against a copy |
| CREATE2, deterministic deployer | the same address on many chains | **evidence** of common custody, and a convenience. Never an identity claim by itself |
| ERC-7786 | a messaging gateway interface between chains | **adapter**, outside Ring 0. Carries a root or an anchor to where a reader prefers to read it. The reader still treats it as evidence |
| ERC-5164 and cross-chain execution | a message on chain A executes a call on chain B | **refused as an authority path.** A message is not a mandate. An act on B runs under B's own grant |
| CCTP V2, xERC20 (ERC-7281), ERC-7802 | native USDC burn-and-mint; cross-chain token interfaces | **adapter**, invoked by a treasury under a destination-bound mandate |
| ERC-7683 | cross-chain intents settled by fillers | **adapter.** Our intent is the mandate's digest; the filler's settlement is a transfer the receipt observes |
| OP Stack / Superchain interop | native messaging among OP chains (Base is one) | **adapter.** Same rule as 7786 |
| ERC-8004 | an agent identity registry on public mainnets | **projection**, Ring 1 (spec 407 D-10). An estate's agents can appear there with a binding proof the account signed |

Ring 0 ships the fields these adapters carry and the contracts they read: a chain on every reference, a chain and an
anchor on every receipt, a root per estate on public ground, a `DelegationManager` that refuses anything not signed
into its own domain. The adapters live in sibling repositories ([ADR-0037](https://github.com/agentictrustlabs/agentic-primitives/blob/master/docs/architecture/decisions/0037-primitives-pure-repo-external-integration-and-ux-layers.md)).

## 6. The scenario

Two estates on faithchain, one on Base. Mara's Home is in estate A.

**Mara acts on an organization in estate B.** Same chain. Her agent resolves the name, reads the records, is
admitted at B's edge; the act parks at her Home; B verifies her grant on faithchain, where B already reads. This is
the cross-estate act of the companion note, and it is live in part (reads and routed acts proven; G4–G6 pending).

**Mara acts on an organization in estate C.** Other chain. C's edge admits her agent on a presentation rooted in A's
roots, read from Base, which is C's own chain. The act parks at her Home in A, as before. The mandate is a Base
delegation from her Base account, whether that is the same hex by CREATE2 or a fresh account she bound, redeemed on
Base. The receipt lands in her vault in A with `apexec:estate` naming C and an anchor in C's `ReceiptAnchorRegistry`
on `eip155:8453`. She needed a Base account and a binding; that is the open item of §3.

**Mara's organization pays a supplier in C.** Value. Her treasury on faithchain holds funds a private chain can hold;
Base holds USDC. There is no public bridge between them. The move is either the organization's Base treasury paying
from a Base balance under a Base mandate, or an operator-run bridge service the consortium of spec 410 §9 stands up,
invoked by the treasury under a mandate bound to the destination chain. Either way the bridge never decides whether
the payment was allowed; the mandate did, and the receipt says which chain it ran on.

## 7. Open

- **Which public L2** hosts public ground, and whether the authority set itself ever moves there (spec 407 D-03;
  Base the default proposal; paymaster economics and a regulated tenant's private-chain option in the ADR).
- **The binding form** for one principal with accounts on several chains (spec 220's deferral): home and satellite
  accounts, the signed statement, how a rotation reaches satellites.
- **A multi-chain indexer**: the public graph with a CAIP-2 chain on every fact; one chain today.
- **A bridge-aware mandate envelope** for value (spec 243's successor ADR).
- **Order of proof**: G4–G6 on faithnet-b first (one chain, two estates), then `check:cross-estate-admission` (two
  chains and a public ground), then `check:participate-across-estates`.

## Sources

`packages/contracts/src/agency/DelegationManager.sol` (`DOMAIN_SEPARATOR`), `AgentAccountFactory.sol`
(`relaxedT4Floor`, CREATE2), spec 410 §4 and §9, spec 407 D-03 / D-10, spec 243 PMT-INV-03, spec 220 §deferred,
ADR-0008, ADR-0013, ADR-0037, [The estate and the federation](/architecture/estate).
