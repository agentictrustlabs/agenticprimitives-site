# Chains and estates

**Status:** exploration, 2026-10-04; §3 and §5 revised the same day with the ENS v2 and ERC-8004 study. Companion to
[The estate and the federation](/architecture/estate). Everything marked *live* runs today; *designed* has a spec
and a gate named; *proposed* is what this note recommends and no spec yet holds; *open* is a question it frames and
does not decide.

An estate enforces on one chain. A chain is not an estate: several estates may stand on one, and an estate's residents
may hold accounts on others. Some chains are private (faithchain, a Besu network one operator runs), some are public
(Base). Both kinds are shared resources in the federation, and EVM chains come with a large cross-chain toolkit. The
question is what, out of everything an estate holds, may travel between chains, and as what.

The answer is one sentence, and the rest of this note is its consequences. **Authority is chain-local by
construction; evidence and value cross a chain, authority never does.** The second half of the note is what that
leaves for a person who holds accounts on two chains, and what ERC-8004 and ENS v2 already know about joining them.

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

![One principal, two chains: a home account where custody is governed, a satellite account where she also acts, joined by her signed card and her name](/architecture/principal-across-chains.svg)

**An address is chain-qualified.** The identifier is CAIP-10, `eip155:<chainId>:<address>`
([ADR-0008](https://github.com/agentictrustlabs/agentic-primitives/blob/master/docs/architecture/decisions/0008-caip10-nativeid-record-predicate.md), `CanonicalAgentId` in `types`). The same hex on
faithchain and on Base is two accounts with two custody states, two sets of grants and two revocation histories.
Nothing makes them one principal except a statement signed by both. Spec 220 deferred that statement and kept CAIP-10
as the bridge.

### 3.1 What is lost without the binding

Nothing in authority, and most of what makes the person one person. Without it: cross-chain participation (spec 410
§4.4) stops at the edge, because A's root proves standing for `eip155:34348:0x…` and C's mandate is signed by
`eip155:8453:0x…`, and nothing joins them; a passkey rotated out at her Home is still a live custodian on the Base
account, so custody must be duplicated per chain or left stale; one history becomes two `prov:Agent`s and a receipt
anchored on Base is not provably hers; her name stops at its chain and someone else can hold `mara.me` on a second
`.me` registry; rosters, stewardship and `charteredUnder` for a treasury drift per chain; and an ERC-8004 entry on a
public chain cannot honestly point back at the account where custody is governed. The per-chain posture (a person on
Base is a different account) is honest and cheap, and it forgoes all six. The binding is worth having if a Home
person is meant to participate in an estate on another chain as herself; custody alone justifies it.

### 3.2 The recommended shape

Two existing standards have already solved the records half of this, from opposite ends. ERC-8004 keeps identity
chain-local and joins the registrations in one self-published document, each entry verified by round trip, each
wallet bound only by a signature it made. ENS v2 keeps one authoritative registry for a name, keys address records by
chain, lets each chain's account claim the name in reverse, valid only when the forward record agrees, and resolves
the name on other chains by proof against the home chain's state. Port both as principles in AP vocabulary; the
custody half is ours to write.

1. **Home and satellite accounts.** One account per principal is the **home account**: where `CustodyPolicy` is
   governed, where the Home signs, where recovery and rotation run. Every other is a **satellite**: an
   `AgentAccount` on another chain with the same custodians installed, holding only the grants and funds the estate
   it stands in requires. Nothing about a satellite is new on chain; what is new is the statement that it is hers.
2. **The card lists the accounts; each proves itself.** The signed card (`A2AAgentCardV1`, the
   `AgentServicePublication`, spec 347) is already the agent's self-published facts document, which is the role the
   8004 registration file plays. Add `accounts: [{ chain, account, role: 'home' | 'satellite', proof }]`. The home
   account signs the card. Each satellite `proof` is an EIP-712 statement with the satellite's chain id and the card
   digest in its domain, verifiable against that account on its own chain by ERC-1271, or ERC-6492 while it is
   counterfactual. This is 8004's `setAgentWallet` rule: an address is bound by a signature it made, never by
   assertion. The round trip closes per chain: the satellite's own profile record (`atl:cardUri`) names the card.
   Spec 347 already carries external identity bindings; an own account on another chain is one more binding kind.
3. **One home registry per typed root; address records keyed by chain.** `mara.me` belongs to the `.me` registry on
   one chain, and no other chain runs a parallel forced-unique `.me`. Replace the single `atl:addr` and the one-way
   `atl:nativeId` with `atl:addr` keyed by CAIP-2 chain, written by the name owner. The contract comment "no
   multi-coin (ENSIP-9) address records" in `AgentNameAttributeResolver.sol` becomes the thing to change.
4. **A reverse claim per chain, valid only with the forward.** The satellite account on Base publishes "I am
   `mara.me`"; a reader honours it only when the home registry's `atl:addr[8453]` names that account (ENSIP-19's
   rule; our universal resolver already enforces round trip on one chain).
5. **Resolution elsewhere by proof, never by gateway trust.** A verifying resolver on Base answers `mara.me` against
   a resolver storage root the estate anchors beside its live-grant and membership roots on public ground (spec 410
   §4). ENS's version rides the rollup's state commitment; faithchain has none, so the root is the estate's signed
   anchor, the same trust public ground already makes. Under [ADR-0013](https://github.com/agentictrustlabs/agentic-primitives/blob/master/docs/architecture/decisions/0013-no-silent-fallbacks.md) a
   proof-backed answer or an empty one; no second mechanism when the proof is missing.
6. **A deterministic authority set.** We deploy accounts by CREATE2 already; deploy the factory, implementation,
   `DelegationManager` and enforcers at the same addresses on every chain the federation uses, one deployer and one
   salt, so the `chain-state` multi-chain registry spec 407 D-03 asks for is a chain-id lookup. A matching account hex
   then follows when the custody configuration matches. It remains evidence of common deployment. A verifier never
   treats a match of hex as a match of authority.
7. **Custody propagation, the part neither standard has.** A rotation or a recovery at the home account reaches each
   satellite by that satellite's own custody action, under its own timelocks, and the satellite's card proof is
   re-signed under the new epoch, in the same class of ceremony as spec 410 §1's re-approval of standing wires.
   8004's answer would be "transfer the NFT"; ENS has no answer; ours has to be a `CustodyPolicy` ceremony. Until a
   satellite has been propagated to, its proof is stale and a reader should say so.

Nothing in 1–6 is authority. A satellite entry, a resolved address and a reverse claim are evidence a verifier reads.
The act on Base still runs under a Base grant, verified per step.

## 4. What crosses a chain boundary

![What crosses a chain boundary between estates, as what, and by which standard](/architecture/chain-boundary.svg)

| Thing | Crosses | How | Standard | Status |
| --- | --- | --- | --- | --- |
| **Address** | as a reference | `eip155:<chain>:<address>`. One hex on two chains is two accounts until a signed binding joins them | CAIP-10; CREATE2 | live |
| **Principal** | as a signed list | The card lists her accounts by chain, each with a proof that account signed on its own chain; round trip from each chain's `atl:cardUri` (§3.2) | the ERC-8004 registration pattern; ERC-1271/6492 | proposed |
| **Name** | as a record | One home registry per typed root; `atl:addr` keyed by chain; a per-chain reverse claim valid only with the forward; resolution on other chains by proof against an anchored root (§3.2) | the ENSIP-9/19 pattern; ERC-3668 for the proof path | proposed; today one `atl:addr` and a one-way `native-id` |
| **Grant** | never | Re-issued on the chain where it acts. The EIP-712 domain carries the chain id and the manager | EIP-712; ERC-7710 | by construction |
| **Revocation** | never read across | One read on the grant's chain. The live-grant root on public ground is refreshed on every revocation; a stale root is a refusal, never a cached acceptance | spec 410 §4 | designed |
| **Membership, relationships** | as a proof | The membership root on public ground; a `merkle-membership-v1` presentation reveals one leaf and nothing else about the estate's graph | `privacy-credentials` | designed |
| **Receipt** | as an anchor | Anchored in the `ReceiptAnchorRegistry` of the chain where the act ran. The vault record names the chain and the anchor. A mirrored anchor on another chain is evidence that an anchor exists there, never the receipt | spec 406; ERC-7786 for the mirror | anchors live; mirror open |
| **Value** | as a transfer | A treasury invokes a bridge adapter under a mandate redeemable only on the destination chain. Between two public chains: CCTP V2 for USDC, xERC20 for a token, ERC-7683 for an intent settled by a filler. Between a private chain and a public one there is no public bridge; the estate's operators would run one, and it would be a service agent with a treasury, not a protocol feature | CCTP V2; ERC-7281; ERC-7683 | reserved (spec 243); successor ADR named |
| **Public graph** | as tagged facts | The indexer reads each chain it is pointed at; every fact carries its CAIP-2 chain; the KB still holds only what the chain it names can prove | CAIP-2 | one chain today |
| **Charter, governance** | as a hash | The estate's `AgenticGovernance` address on its own chain is its id on public ground; the charter hash sits beside its roots | spec 410 §9 | designed |
| **Custody** | as a ceremony | A rotation or recovery at the home account reaches each satellite by that satellite's own custody action; the satellite's card proof is re-signed under the new epoch | `CustodyPolicy`; spec 410 §1's shape | proposed |

Two things never cross: a grant, and the read of its revocation. Everything else crosses as a reference, a signed
list, a proof, an anchor, a transfer or a ceremony, and each of those is read from the live original on the chain
that holds it.

## 5. The EVM standards, placed

The EVM world offers more cross-chain machinery than the federation needs. Four verdicts, and one test for all of
them: does it carry authority? If it does, it is refused as a path. If it carries identity facts, we **port the
principle** in our vocabulary. If it carries evidence or value, it is an **adapter** in a sibling repository
([ADR-0037](https://github.com/agentictrustlabs/agentic-primitives/blob/master/docs/architecture/decisions/0037-primitives-pure-repo-external-integration-and-ux-layers.md)). If it is an identifier, we
**adopt** it as is.

### 5.1 Identity: port the principle

| Standard | The concept | Our form | Verdict |
| --- | --- | --- | --- |
| **ERC-8004** registration file, `registrations[]` | identity is chain-local; one self-published document lists every registration; each entry is checked by round trip (registry → URI → file names the registry) | the signed card's `accounts[]` (§3.2 item 2); the round trip from each chain's `atl:cardUri` | **port** |
| **ERC-8004** `setAgentWallet` | a wallet is bound by an EIP-712 signature it made, ERC-1271 for a contract wallet; never by assertion | the per-satellite `proof`, chain id in the domain, 1271/6492 on that chain | **port** |
| **ERC-8004** deterministic registries | the same registry address on 30+ chains; "which registry" collapses to "which chain" | the same factory, implementation and `DelegationManager` addresses on every federation chain (item 6) | **port** |
| **ERC-8004** reputation / validation per `agentId` | evidence keyed per chain; the reader aggregates | receipts anchored per chain; no cross-chain score, ever | **already ours** |
| **ERC-8004** `agentId` as ERC-721; transfer = identity move | a number names the agent; ownership transfer in one step | our id is the account; control is `CustodyPolicy` with T5/T6 delays and recovery | **refused.** No timelock, no custody governance |
| **ERC-8004** the registry itself | a public identity registry on mainnets | a Ring 1 **projection** (spec 407 D-10) whose registration file lists both our home and satellite accounts with their proofs; `agentWallet` = the Base satellite via 1271 | **projection**, sibling repo |
| **ENS v2** one authoritative registry, resolved on other chains | names live on one chain; other chains resolve, never re-register | one home registry per typed root; no parallel `.me` (item 3) | **port** |
| **ENSIP-9 / ENSIP-11, ERC-7930** multi-chain address records | `addr(node, chain)`: one name, an address per chain | `atl:addr` keyed by CAIP-2 chain, replacing the single record and the one-way `nativeId` | **port** |
| **ENSIP-19** per-chain primary name | the account on chain X claims the name; valid only if the forward on the home chain agrees | the reverse claim with round trip (item 4); our universal resolver already enforces round trip on one chain | **port** |
| **ERC-3668** CCIP-Read, **ENSIP-10** wildcard, state-proof verifiers | a resolver on chain Y answers for names stored on chain X against X's state root | the verifying resolver on Base against the estate's anchored resolver storage root (item 5); the gateway is a Ring 1 adapter; proof-backed or empty | **port the shape, adapter for the gateway** |
| **ERC-7828** `name@chain` | chain-qualified name syntax | **do not adopt.** `x@ctx` is already a contextual name (spec 346); the chain belongs in the record, not the name | **refused** |
| **CAIP-2, CAIP-10** | chain and account identifiers | on every reference, every receipt, every fact | **adopted** |
| **EIP-712** domain with `chainId` | typed data bound to one chain and one verifying contract | the reason authority is chain-local; the satellite proof's domain too | **adopted** |
| **ERC-1271, ERC-6492** | signature validation by a contract account, counterfactual included | `UniversalSignatureValidator`; across chains: verify against the account on *its* chain, never a copy | **adopted** |
| **CREATE2**, a deterministic deployer | the same address on many chains | evidence of common deployment; never an identity claim by itself | **adopted, as evidence** |

### 5.2 Evidence and value: adapters

| Standard | What it is | Where it sits here |
| --- | --- | --- |
| ERC-7786 | a messaging gateway interface between chains | **adapter.** Carries a root or an anchor to where a reader prefers to read it. The reader still treats it as evidence |
| OP Stack / Superchain interop | native messaging among OP chains (Base is one) | **adapter.** Same rule as 7786 |
| CCTP V2, xERC20 (ERC-7281), ERC-7802 | native USDC burn-and-mint; cross-chain token interfaces | **adapter**, invoked by a treasury under a destination-bound mandate |
| ERC-7683 | cross-chain intents settled by fillers | **adapter.** Our intent is the mandate's digest; the filler's settlement is a transfer the receipt observes |
| ERC-5164 and cross-chain execution | a message on chain A executes a call on chain B | **refused as an authority path.** A message is not a mandate. An act on B runs under B's own grant |

Ring 0 ships the fields these adapters carry and the contracts they read: a chain on every reference, a chain and an
anchor on every receipt, a root per estate on public ground, a card that lists accounts with their proofs, a
`DelegationManager` that refuses anything not signed into its own domain.

### 5.3 What none of them has

How a rotation or a recovery at the home account reaches a satellite. 8004 would transfer the token; ENS is a records
layer and says nothing; the bridges carry messages, and a message is not a custody action. This is item 7 of §3.2, a
`CustodyPolicy` ceremony per satellite, and it is the piece that must be specified by us before any of the ported
principles is safe to rely on: a binding whose satellite can be left under a retired credential is a binding to a
compromised account.

## 6. The scenario

Two estates on faithchain, one on Base. Mara's Home is in estate A.

**Mara acts on an organization in estate B.** Same chain. Her agent resolves the name, reads the records, is
admitted at B's edge; the act parks at her Home; B verifies her grant on faithchain, where B already reads. This is
the cross-estate act of the companion note, and it is live in part (reads and routed acts proven; G4–G6 pending).

**Mara acts on an organization in estate C.** Other chain. C's edge admits her agent on a presentation rooted in A's
roots, read from Base, which is C's own chain. C's edge joins the proved subject to the actor through her card: the
`accounts[]` entry for `eip155:8453` carries a proof her Base satellite signed, and the satellite's `atl:cardUri`
names the same card. The act parks at her Home in A, as before. The mandate is a Base delegation from the satellite,
redeemed on Base. The receipt lands in her vault in A with `apexec:estate` naming C and an anchor in C's
`ReceiptAnchorRegistry` on `eip155:8453`. If she rotated a passkey last week, the satellite's proof must have been
re-signed by the propagation ceremony, or C's edge should treat the entry as stale (§3.2 item 7).

**Mara's organization pays a supplier in C.** Value. Her treasury on faithchain holds funds a private chain can hold;
Base holds USDC. There is no public bridge between them. The move is either the organization's Base treasury paying
from a Base balance under a Base mandate, or an operator-run bridge service the consortium of spec 410 §9 stands up,
invoked by the treasury under a mandate bound to the destination chain. Either way the bridge never decides whether
the payment was allowed; the mandate did, and the receipt says which chain it ran on.

## 7. Recommended order, and what stays open

Specs precede the code. The recommendation, in the order the dependencies run:

1. **Amend spec 347**: `accounts[]` on the canonical profile and the released card, the `SatelliteAccountProofV1`
   EIP-712 type (satellite chain id and card digest in the domain), round trip from each chain's `atl:cardUri`. Gate:
   a card whose satellite proof does not verify against the satellite on its own chain is refused at release.
2. **Amend specs 215 and 346**: `atl:addr` keyed by CAIP-2 chain; `nativeId` retired in its favour; one home registry
   per typed root across the federation; the per-chain reverse claim and its round-trip rule.
3. **Extend spec 410 §4**: a resolver storage root beside the live-grant and membership roots; the verifying resolver
   on public ground; the Ring 1 CCIP-Read gateway named as an adapter. Gate: `mara.me` resolved on the second anvil
   chain by proof, and refused when the root is stale.
4. **Extend spec 410 §1 or write the custody-propagation spec**: the satellite ceremony on rotation and recovery, the
   re-signed proof, the stale-proof rule at an edge. Gate: rotate at home, act on the second chain, the first attempt
   is refused as stale and the second succeeds after propagation.
5. **The deterministic authority set** in spec 407 D-03's chain-posture ADR: same addresses on every federation chain,
   the `chain-state` multi-chain registry as a chain-id lookup.
6. **The Ring 1 ERC-8004 projection** (D-10), now listing both accounts with their proofs.

Open, and not decided here:

- **Which public L2** hosts public ground, and whether the authority set itself ever moves there (D-03; Base the
  default proposal; paymaster economics and a regulated tenant's private-chain option in the ADR).
- **A multi-chain indexer**: the public graph with a CAIP-2 chain on every fact; one chain today.
- **A bridge-aware mandate envelope** for value (spec 243's successor ADR), and whether the consortium runs a bridge
  service between a private chain and Base at all.
- **Order of proof**: G4–G6 on faithnet-b first (one chain, two estates), then `check:cross-estate-admission` (two
  chains and a public ground), then `check:participate-across-estates`, then the gates named above.

## 8. Not figured out, and what ten chains would break

Everything above is drawn for two chains and three estates. Take the federation to ten chains, private and public,
with estates on each, and the following are either unsolved or stop holding. Each is stated with what it would cost
if ignored.

1. **Revocation stops being "final and global."** On one chain, revoke → refuse is one block and one read. Across
   chains it becomes: the estate's projector notices, re-signs the root, anchors it on public ground, the anchor
   confirms, and the far edge's freshness window expires. Minutes at best, and a retired grant is honoured elsewhere
   for all of them. The thesis property degrades to *final here, eventual there*. Nothing bounds the window today, and
   an edge's choice of window is a security parameter nobody has named.

2. **Custody propagation fans out, and the gap is the attack.** One rotation at home is ten satellite ceremonies, each
   under that chain's own timelocks (T4 1 h, T5 24 h, T6 48 h), each paid in that chain's gas, each needing the Home to
   hold RPC and a paymaster there. A recovery that `revokeAll`s at home races the holder of the retired credential to
   nine other chains. Partial propagation is a real state with no representation: which satellites are current, which
   are stale, and what an edge does with "stale" are undefined. §3.2 item 7 names the ceremony; it does not solve the
   race.

3. **Aggregate spend limits cannot be enforced across chains.** Assets live only in treasuries (spec 420), and a
   treasury is per chain. `TreasurySpendPolicy` (spec 410 §7) caps spend where it runs. A grant honoured on ten
   chains is ten caps. The only cross-chain aggregate is one the harness keeps in memory before signing, which is
   policy, not enforcement. Either the mandate names one chain (today's rule, PMT-INV-03) and a person accepts ten
   separate budgets, or an aggregate root is anchored and read, which reintroduces item 1's window for money.

4. **Private-chain evidence is not verifiable by strangers.** A receipt anchored on faithchain names a chain whose RPC
   is tokenised. "Anyone can verify the receipt" is false for anyone without a token. The mirror on public ground
   (ERC-7786, §5.2) helps only for what the estate chooses to mirror, and a mirrored anchor is the estate's word that
   the anchor exists. Public estates have the opposite problem (item 7). The honest statement is: private chains buy
   a closed validator set at the price of third-party verifiability of everything anchored there.

5. **"One home registry per typed root" has no home across federations.** Within one federation the rule works. Two
   federations each with a `.me` home collide exactly as two chains did, one level up. The many-registries hypothesis
   (ADR-0038) refuses a horizontal root; a typed root needs one. Unresolved, and the candidates are all bad: a
   federation prefix in the name (fights spec 346's syntax), a root registry on a public chain (a horizontal root),
   or accepting that `mara.me` is scoped to a federation and saying so in the card.

6. **Public ground becomes plural.** Spec 410 §4 says one registry, many estates. Estates will anchor where their
   public chain is: Base, an OP chain, an Arbitrum chain. A verifying edge then needs to know which public ground an
   estate uses, and that fact must come from somewhere a stranger can read, which is the problem public ground was
   meant to solve. A registry of public grounds is a root again.

7. **Finality differs, and the substrate assumes it does not.** QBFT is final at the block; a public L2 is soft-final
   in seconds and L1-final in minutes to hours. A receipt observed and reconciled (spec 410 §2, §3) on a soft-final
   block can be undone by a reorg after the vault has recorded it. The KB can serve a fact the chain later did not
   contain. Per-chain finality policy for observation, reconcile and indexing is not written.

8. **Contract generations drift per chain.** Deterministic addresses need identical bytecode; faithchain runs
   generation 1, Base Sepolia later generations, and `approveDigest`'s semantics are generation 3. Ten chains at three
   generations means a satellite proof, a wire or a receipt verified under different rules depending on the chain,
   while the card says they are one principal. A generation floor per federation, and a refusal when a chain is below
   it, are undefined.

9. **A public binding is a public correlation.** CAIP-10 is omnidirectional by construction (spec 260); the card's
   `accounts[]` joins ten of them in one signed document. Spec 338's pairwise and unlisted agents exist precisely so a
   person is not correlatable across contexts. Binding and unlinkability pull in opposite directions, and §3.2 picks
   binding without saying where a person may keep a satellite out of the card. She should be able to; the stale-proof
   rule then has to work for an account the card does not list.

10. **An estate's chain can die or fork.** If a private chain is shut down, the home accounts, names, grants and
    anchors on it are gone, and every satellite is orphaned with a home that no longer exists. A chain-id fork
    recomputes `CustodyPolicy`'s domain but `DelegationManager`'s separator is immutable, so every grant on the fork
    is dead. The Home-to-Home move (spec 410 §1.2) moves a Home within a chain; moving a principal's home account to
    another chain, with its custody epoch and its standing, is unspecified. At ten chains some will be abandoned.

11. **Operations multiply linearly and governance has no floor.** Ten chains is ten RPC gateways, ten deployers, ten
    paymaster policies, ten `AgenticGovernance` instances with timelocks, ten indexer feeds with ten reorg models. A
    paymaster that sponsors an act is a party that can refuse to, which is a censorship surface the authority model
    does not name. Federation-level governance (spec 410 §9's consortium) has no chain to live on except public
    ground, which puts the consortium's decisions on a chain some of its members may not run.

12. **The ontology has no word for it.** `prov:Agent` is one IRI, and ours is one CAIP-10. A person with ten accounts
    is ten agents in every graph until a term says otherwise: `ap:homeAccount`, `ap:satelliteOf`, and a rule for which
    IRI a receipt, a membership and a stewardship edge attach to. Under the ontology rule this is the first thing to
    write, and it has not been.

The shape that falls out of this list: a federation should be **few chains, chosen**, not many chains, accepted. One
private chain per regulated posture, one public chain as ground and as the default public home, and a stated
generation floor. Ten chains is not a goal; it is the stress test that shows which of the above must be solved before
the third chain is added. Items 1, 2 and 3 are the ones that touch money and custody and should be solved first, and
each needs a written window, a written race, and a written cap, before any code.

## Sources

`packages/contracts/src/agency/DelegationManager.sol` (`DOMAIN_SEPARATOR`), `AgentAccountFactory.sol`
(`relaxedT4Floor`, CREATE2), `naming/AgentNameAttributeResolver.sol` ("no multi-coin address records"),
`naming/AgentNameUniversalResolver.sol` (round trip), spec 410 §1, §4 and §9, spec 407 D-03 / D-10, spec 347, specs
215 / 346, spec 243 PMT-INV-03, spec 220 §deferred, ADR-0008, ADR-0013, ADR-0037, ADR-0056; ERC-8004 (registration
file, `setAgentWallet`), ENS v2 / ENSIP-9 / ENSIP-11 / ENSIP-19 / ENSIP-10, ERC-3668, ERC-7930, ERC-7828;
[The estate and the federation](/architecture/estate).
