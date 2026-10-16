# Federation and anonymous credentials

**Status:** 2026-10-16. What runs today across two estates on two chains, in plain terms, and what does not. Companion to [Substrate, estate, town, federation](/architecture/scales) and [Chains and estates](/architecture/chains).

## 1. What a federation is

A federation is how estates that live on different chains deal with each other without trusting each other. Four things make it up.

- **Neutral ground.** A registry on one chain that no estate controls. Each estate anchors there the fingerprints (roots) of two sets: the permissions it currently vouches for and the memberships it currently records. Each issuer of credentials anchors one more: the credentials it still stands behind. Neutral ground learns the roots and nothing underneath them.
- **A projector.** A scheduled job that reads each estate's and each issuer's own vault, rebuilds the sets, and re-anchors a root when it changes or ages. No operator runs it. A revoked permission or a retired credential leaves the next root, and every proof made against the old root is stale from then on.
- **Doors.** An estate's online front door. A visitor from another estate knocks under a one-time alias and proves one leaf against the root the door reads from the chain. The door admits or refuses on that proof and writes a receipt. A door never decides what the visitor may *do*; the estate behind it still decides every act under its own permissions.
- **Receipts.** Every decision at a door is a hash-chained record naming the evidence and nothing else: which facet, which predicate, which status sequence, where the proof was checked, the alias. Never a claim value, never the person's agent. After a dispute window the record keeps its decision and its hash and drops its parties.

Two towns are live: faithnet.town on faithchain and hopenet.town on hopechain. Each has its own estates, its own registry and graph and naming; hopenet roots its names at faithchain and keeps a local table. The cross-estate twin runs in both directions across the two chains, and payments cross the boundary both ways: inward through the door under the resident's permission, outward under the payer's own. Neither estate honours the other's permissions.

## 2. What an anonymous credential is here

A credential is a signed statement by an organization about whoever holds the key it is bound to. Two things are different from a credential in a wallet.

**The holder is a program.** The person's agent presents the credential, at any hour, without her. The key the credential is bound to is held *for* her by her estate's key service, inside an attested confidential machine; it is never the agent's key and never a key on her account. She signs one standing permission that says which doors, which questions and which issuers her agent may present to, and for how long. Inside the one moment a signature is needed, a release judges that permission against the exact statement being proved. A permission for another door signs nothing. The key service checks the same thing again before it signs.

**The verifier chooses what it learns.** Two presentation suites run over the same credential:

- *Selective disclosure.* The holder reveals the values the verifier asked for and withholds the rest. She presents under a pseudonym that is stable for that verifier and different everywhere else. This is the suite for a verifier entitled to the values, such as the organization's own ledger.
- *Zero-knowledge predicates.* The holder proves that a statement over the claims holds, such as *over 18 and a member*, and reveals no value, no credential, no issuer signature and no device key. This is the suite for a verifier entitled to a fact, which is most verifiers. It uses OpenAC, the Ethereum Foundation's zkID work.

A request names one suite and gets that suite or a refusal.

**The organization issues, as itself.** The organization's own agent issues the credential under a permission its steward signs. It checks its roster (a non-member is refused and never admitted by this act), reads its published issuing key, builds the credential bound to the member's key, and asks the key service to sign with an issuing key that has exactly one role. It records what it issued and never the values. It vouches for the credential by writing to its own vault, which the projector anchors. The credential is written into the member's vault by her own permission; the organization has no access to her vault and needs none.

**The member asks through her own agent.** She tells her agent to ask the organization for a credential. Her agent confirms she is on the roster, takes the public half of her key, and leaves a request with the organization. The steward's issuing act reads that request and binds the credential to the key it names.

**The member pays, and the organization learns only that a member paid.** At the door her agent proves *over 18 and a member*. The door issues a payment ticket bound to that admission: the organization's account, the amount, the chain. Her agent pays from her own account under a standing dues permission she signed once; her own runtime verifies every link before value moves. The door confirms the payment on the chain, settles the ticket once, and records the acceptance next to the admission. Which member paid is in her receipt, in her vault.

Scheduled checks prove this against the live system: the visit, with twenty-five checks including five deliberate refusals, and the payment, with fifteen checks including four refusals.

## 3. Multi-estate and multi-town

- An **estate** is one shape, stamped as many times as needed: a Home where people sign, an agent runtime, a vault, an edge, a Home MCP, an interactions service agent, a registry agent, one key-service tenant, and one chain. Two are live: faithnet on faithchain and imbnet on hopechain. A person is a resident of one estate; her permissions, names and credentials are bound to its chain.
- A **town** is one chain, every estate on it, and the shared services: registry, public graph, typed naming, chain access, portal. Two are live. Nothing in a town grants anything.
- **Across** estates and towns, everything is proof and nothing is trust. Authority stays inside each estate. A receipt is evidence, a permission is authority, and a permission is verified on the chain its grantor lives on.

## 4. What is not done

- **Nullifier.** The one-visit token a door consumes is asserted by the holder's key, not emitted by the proof circuit. OpenAC does not define one. The receipt records the grade so no reader mistakes it.
- **Status proof.** The proof that a credential is still vouched for reveals which leaf, so it links to the credential. The zero-knowledge form waits on circuit work upstream.
- **Key custody.** The key service's root is released only to an attested machine, but the release binds the machine, not the software on it. A measured image, a second node and a two-operator quorum are deployments still to make.
- **Membership across estates.** A person of one estate cannot yet be invited into an organization on another and recorded as its member. The estate's registry agent stands in as issuer for such a visitor until that lands.
- **The signer patch.** The published OpenAC SDK takes the device private key as a value; a local patch lets it take a signer callback instead, so the key can stay in custody. It is written up for upstream.
- **The four-pattern limit.** The 1k circuit matches at most four claim-or-predicate patterns; the 2k keys lift it at a cost in time.
- **Network privacy.** Edge workers see the sender's address and timing. No credential protocol fixes that; a relay would.
- **Offline.** The proof's expensive half is prepared offline; the showing half needs the runtime, because that is where the permission is judged.
