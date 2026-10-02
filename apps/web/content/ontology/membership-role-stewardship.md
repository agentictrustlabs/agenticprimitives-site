# Membership, role, and stewardship

Membership is belonging. Stewardship is oversight, and oversight does not require belonging. A role is a name a belonging can carry. The classes are `aporg:OrganizationMembership`, `aporg:RoleAssignment`, and `ap:Stewardship`. Those situations, the charter link, and the delegations that carry their authority are the edges of the Agentic Trust graph (`at:TrustGraph`).

Sources: `packages/ontology/tbox/org.ttl`, `packages/ontology/tbox/core.ttl`, `packages/ontology/tbox/trust.ttl`, `packages/ontology/tbox/verification-receipt.ttl`. The Agentic Trust T-box mirrors the same terms under `at:` with `rdfs:seeAlso`. `at:TrustGraph` is declared there.

## Belonging and oversight

A membership says that a person belongs to an organization for a time. The belonging can carry roles. Facilitator, treasurer, and chief financial officer are roles on a membership: each names what that person is called inside that organization, and a delegation may materialize the role so the name has authority. The role qualifies the belonging. End the membership and the roles on it end with it.

Charter is belonging of a different kind. `ap:charteredUnder` says an agent sits under the agent it was created for: a workspace agent under its organization, a treasury under the person or organization that holds it. Charter says whose it is.

Stewardship is not a belonging. A person stewards an agent when that agent has signed an oversight delegation to her. She may also belong to it, and she may hold a role on that membership. Neither is required. A chief financial officer can oversee a company without being a member of it. The stewardship is her oversight of the organization, evidenced by the organization's delegation to her. If she later joins, the membership is a second record, and "chief financial officer" is a role on that membership. Leaving the company ends the role. It does not, by itself, end the oversight. Revoke the oversight delegation and the stewardship ends. The membership, if she has one, stays until it is ended on its own.

The same split holds for a workspace agent. It is a service, and people can belong to it. That belonging is a membership of the workspace agent, written by Home at `workspace-join`. The person who stewards it oversees it, and she may or may not be one of those members. A discussion is not an agent, so nobody belongs to a discussion. Who may speak is participation, derived from a membership when the topic is open, and an accepted invitation when it is restricted.

## What Home, Field, and the card room record

![Four relationships: membership, stewardship, a role, and a discussion](/ontology/relationships.svg)

Home is the record. Field and the card room ask Home who a person is to an agent, and they do not keep a second roster that decides it. Standing is derived, never typed in by an app: `self`, `steward`, `member`, or `none` (`deriveStanding`). `steward` means she holds that agent's oversight delegation, the wire is the right shape, and the chain still accepts it. `member` means she is on that agent's membership roster. Standing shapes what the product says before a ceremony. A gate does not read it as permission.

| Relationship | Host | Record the apps use | What it is |
| --- | --- | --- | --- |
| Membership | An organization agent, a team agent, or a workspace agent | `org.membership:member:<person>` in that agent's vault, and the person's related-agent link with `relationship: member` | Belonging. The workspace-join ceremony writes it for a `.workspace` agent. |
| Stewardship | The same kinds of agent | The oversight delegation on the person's link, `relationship: steward`, checked on chain | Oversight. A chief financial officer can hold this and not be a member. |
| Role on a belonging | The membership, or a Field roster row that points at one | Field team roles: `organization-steward`, `community-steward`, `progress-steward`, `field-recorder`, `member`. Field workspace roster: `custodian`, `steward`, `member` | A name on the belonging. `organization-steward` is materialized by the stewardship wire. The word on the row is not the wire. |
| Participation in a discussion | A topic. Not an agent | Open: no row. Restricted: an invitation, then acceptance | Presence in a conversation. Accepting a field community-team invite does not mint a role and does not create a membership. |

**Home.** An organization and a workspace agent both keep membership records. Joining a workspace is `workspace-member-invite` (the custodian signs the member's grant) then `workspace-join` (the person writes her own link). Stewardship is a different link to that same agent. The trust graph centered on a person draws `member of` and `stewards` from those links.

**The card room** (the poker game). A club is its `.workspace` agent. Who belongs is that agent's `org.membership` records. The card room stores the wire the host signed so the room can act as the club, and nothing else: no roster table, no host column. On each read, Home derives standing. Host means `self` or a verified steward of the club agent. Member means the membership record. A night's conversation is an open topic the club opens on its own board (`club.topic`). Everyone who belongs may speak, because the topic is open. The topic has no member list.

**Field.** A team is an organization agent. The team roster row in the team's vault is a projection: it names the Home membership record, the `has-member` credential, and, when she also oversees the team, the stewardship. The role on that row is one of the five field role names. A workspace is a service agent. Field keeps a `ws-membership` row in the workspace vault so the directory can show who was invited and what title the inviter used (`custodian`, `steward`, or `member`). That title is the field directory. Belonging is still the Home membership of the workspace agent, and oversight is still the stewardship wire. A team conversation is an open topic: every team member is in it, and no participant list is stored. A thread on a field subject is open to the organization's members. A community team room is restricted: invite, then accept, and the acceptance grants nothing.

## The three situations

A person who belongs, holds a role, and oversees an agent is three records.

| Situation | Class | What it says | What it never says |
| --- | --- | --- | --- |
| Membership | `aporg:OrganizationMembership` | This person is a member of this organization right now. | That she may act for it, spend, or sign. |
| Role | `aporg:RoleAssignment` | This membership carries this named role, and this delegation materializes it. | That the role word itself is the grant. |
| Stewardship | `ap:Stewardship` | This person oversees this agent, on the strength of that agent's oversight delegation to her. | That she is a member, or that she custodies the key. |

`Member` is not a class. Membership is a situation that starts and ends. `Steward` is not a class. Stewardship is a situation. A role definition is a vocabulary entry. The grant is always an `apdel:Delegation`.

## Class diagram

![Class diagram: membership is belonging, a role hangs on it, stewardship is oversight, a discussion is not an agent](/ontology/classes.svg)

`stewarded` ranges over an agent that is an organization or a service. It never ranges over a person, and it never ranges over the `aporg:Workspace` entity. The workspace does not sign. Its agent does.

The T-box range of `organizationAgent` is an organization or a team. Home also writes this same membership record on a workspace agent when a person joins it. Stewardship of that workspace agent stays a separate wire.

## Membership

`aporg:OrganizationMembership` is a situation between one `ap:PersonAgent` (`aporg:memberAgent`) and one `ap:OrganizationAgent` (`aporg:organizationAgent`).

It records that the person is a member now. It authorizes nothing. Ending it is `aporg:MembershipTermination`. An `aporg:EnrollmentDecision` creates the membership. Accepting an invite does not hand the person the organization's authority.

`aporg:memberOf` is derived. It is true while a current membership exists. Nothing asserts it as a stored edge.

A contact (`aporg:ContactRelationship`) is a person the organization knows. A contact is not a member.

## The role, and the delegation that makes it authority

`aporg:OrganizationRoleDefinition` names a role inside one organization: facilitator, treasurer, dealer. The definition does not authorize execution. Two organizations can both have a role called treasurer. The word does not travel.

`aporg:RoleAssignment` connects one membership to one role definition.

- `aporg:assignedRole` names the definition.
- `aporg:materializedByDelegation` points at the `apdel:Delegation` that carries the role's permissions.
- `aporg:supportedByEntitlement` points at an entitlement when the role is a data permission rather than an action.

The assignment is not the authority. The delegation is. Revoking the delegation drops what the role could do and leaves the membership in place. Ending the membership ends the role with it. A role without a delegation is a label.

This is the "a relationship has a role that relates to a delegation" sentence. The relationship is the membership. The role hangs off that membership. The delegation hangs off the role. Stewardship is not that role.

## Stewardship

`ap:Stewardship` is its own situation.

- `ap:steward` is a `ap:PersonAgent`.
- `ap:stewarded` is the agent she oversees: an organization agent or a service agent, never a person, never a workspace entity.
- `ap:stewardshipDelegation` is the digest of the oversight delegation that agent signed to her (spec 246). The digest is the record. The delegation is the authority.

Standing, never authority. A verifier does not read a stewardship row as permission. It reads the delegation the digest names, the same way it reads any other grant.

Stewardship is not custody. `ap:CustodyMember` is the set of keys that can sign for the account. Holding the key is not overseeing the agent, and overseeing the agent is not holding the key.

Stewardship is not membership. A steward need not be a member. A member does not steward. When one person is both, she has two situations.

## How a credential names them

`ap:RelationshipCredential` is a private record in the subject's vault. It grants nothing. Its kind picks which situation it is evidence of.

| Credential kind | Projects to |
| --- | --- |
| `has-member` | `aporg:OrganizationMembership` |
| `steward-of` | `ap:Stewardship` |
| `chartered-under` | `ap:charteredUnder` |

`ap:charteredUnder` is belonging. A team is chartered under an organization. A workspace agent is chartered under the organization that governs its workspace. The child keeps its own custody. A resolver may follow the link. A verifier may not read it as permission.

## The Agentic Trust graph

`at:TrustGraph` is the queryable, versionable artifact of trust assertions, endorsements, delegations, and registry entries about agents. Discovery filters with it (`at:consultsTrustGraph`). Scoring reads it. It is an information artifact: content that can be published, committed, and cited. It is the document of the situations above. It is not a fourth situation, and a verifier does not treat a node in it as permission.

Each relationship becomes an edge by being recorded as a trust assertion. `at:recordsSituation` points the assertion at the situation. `at:assertedInTrustGraph` places the assertion in the graph.

| Relationship | Assertion | The edge answers |
| --- | --- | --- |
| Membership (`has-member`) | `at:RelationshipAssertion` | Which agents belong together |
| Stewardship (`steward-of`) | `at:RelationshipAssertion` | Who oversees this agent |
| Charter (`chartered-under`) | `at:RelationshipAssertion` | What this agent sits under |
| The role's grant | `at:DelegationAssertion` | Who authorized this role |
| The oversight grant | `at:DelegationAssertion` | Who authorized this steward to act |

`at:RelationshipAssertion` is the assertion that two agents are related. `at:DelegationAssertion` is the attested record of a grant, and it is what other assertions cite when they need to say the relation was authorized. Membership and stewardship stay relationship edges. The two delegations stay delegation edges. One person who is a member, a facilitator, and a steward is three edges, plus the two grants, in one graph.

![A relationship recorded as an assertion in the trust graph](/ontology/trust-graph.svg)

When the relationship is public and both parties have confirmed it, the same fact is one `aptrust:TrustGraphEdge`. `ap:hasRelationship` hangs that edge on each endpoint. The edge states its subject, its object, its relationship type, and its status absolutely. Subject proposed it. Object confirmed it. Status runs PROPOSED, CONFIRMED, ACTIVE, REVOKED. Only an ACTIVE edge may inform a score. `aptrust:TrustScore` is a number computed over evidence under a named policy and a graph snapshot. The score is derived. The edge is the relationship. Neither one is authority.

A private relationship stays a `ap:RelationshipCredential` in both vaults. That credential is the edge from each holder's vantage point. It is not copied into the public graph. Reading the public graph reveals nothing that reading the chain would not reveal.

So the graph a person sees, centered on an agent, is a reading of these assertions and nothing else. Members are membership edges. The steward is a stewardship edge. A role that has authority is a delegation edge off that membership. Charter is the edge from a child agent to the organization it sits under. There is no separate social model for the app to keep in step.

## The workspace

Four objects, not one.

| Object | Class | What it is |
| --- | --- | --- |
| The plane | `aporg:Workspace` | A governed coordination context. Not an agent. No address, no custody, no authority. |
| The governor | `ap:OrganizationAgent` | `aporg:governedBy`. Every policy the workspace has comes from this agent. |
| The face | `ap:WorkspaceAgent` | The service agent that acts for that one workspace. `aporg:coordinatedBy` / `aporg:coordinatesWorkspace`. |
| The people | `ap:PersonAgent` | Members of the workspace agent when they have joined it, and members of the governing organization when they belong there. Two belongings, when both exist. |

Home, Field, and the card room record "she is part of this workspace" as a membership of the workspace agent, the same `org.membership` record an organization uses. The ontology also has `aporg:WorkspaceParticipation` for a restricted plane when the host is the workspace entity rather than the agent. None of the three apps write that class. An open discussion still derives who may speak from the membership of the host agent, and stores no participant row.

The workspace agent acts only inside what the governor delegated to it. Revoke that delegation and the workspace agent is inert. It is never an independent source of authority.

Product language "steward of the workspace" means `ap:Stewardship` whose `ap:stewarded` is the **workspace agent** (or, when the social face is itself an organization, that organization agent). It does not mean a role on a membership, and it does not mean a property of the workspace entity.

## Worked example

Corridor is an open workspace for a field team. Four people. One of them facilitates, and that same person stewards the workspace agent.

| Object | Address in the example | Class |
| --- | --- | --- |
| Field | `field.org` | `ap:OrganizationAgent` |
| Corridor | the workspace entity | `aporg:Workspace`, `governedBy` `field.org`, policy `open` |
| The workspace agent | `corridor.workspace` | `ap:WorkspaceAgent`, `coordinatesWorkspace` Corridor |
| Ada, Ben, Cora | three person agents | `ap:PersonAgent` |

Ada, Ben, and Cora each belong to Field, and each has joined `corridor.workspace`. Those are two memberships. Field's team roster points at the Field membership. The workspace membership is what Home wrote at `workspace-join`. No discussion stores a third list of them: the team conversation is open, so who may speak is the team membership, read when someone posts.

Cora's membership has one `aporg:RoleAssignment`.

- `assignedRole` = Field's role definition `facilitator`.
- `materializedByDelegation` = delegation **D1**, `field.org` → Cora, methods pinned to what a facilitator may do.

D1 is the authority of the role. Ada and Ben have memberships and no such assignment. They belong. They cannot facilitate.

Cora also has an `ap:Stewardship`.

- `steward` = Cora.
- `stewarded` = `corridor.workspace`.
- `stewardshipDelegation` = the digest of delegation **D2**, `corridor.workspace` → Cora, the oversight delegation the workspace agent signed to her.

D2 is the authority of the stewardship. It is not D1. Ending her facilitator role revokes D1 and leaves D2. Ending her stewardship revokes D2 and leaves her membership and, if it is still current, D1. Removing her from Field ends the membership and the role. It does not, by itself, revoke D2. Someone has to revoke the oversight delegation.

She is not a custody member of `corridor.workspace`. The key stays with the account's custodians. She acts for the workspace agent only where D2 says so.

![Object diagram: Ada, Ben, and Cora, Cora’s facilitator role, and her stewardship of the workspace](/ontology/corridor.svg)

What a reader should be able to answer from the diagram without guessing:

- Who belongs to Field? Ada, Ben, and Cora. Three memberships.
- Who may facilitate? Cora, because D1 materializes that role. Not because she is a member.
- Who stewards the workspace? Cora, because a stewardship names her and `corridor.workspace`, evidenced by D2.
- Who participates in Corridor? Ada, Ben, and Cora, derived from Field's membership because the workspace is open.
- Who holds the workspace agent's key? Not Cora. Not shown, because custody is a different class.

### The same facts, as the trust graph

Centered on `field.org`, the graph is the membership edges, Cora's role grant, and the workspace agent's charter. Ada, Ben, and Cora appear because they are members. Corridor's agent appears because it is chartered under Field. Cora's stewardship does not appear here: that edge is about `corridor.workspace`, not about Field.

![Trust graph centered on field.org](/ontology/graph-field.svg)

Centered on `corridor.workspace`, the graph is whoever has joined that agent, plus Cora's stewardship if she oversees it, plus the charter back to Field. Ada's membership of the workspace agent is an edge of this agent. It is not her membership of Field, and it is not stewardship. A discussion hosted here adds no edge: an open topic is read off these memberships, and a restricted topic is an invitation on the topic, which is not an agent.

![Trust graph centered on the workspace agent](/ontology/graph-workspace.svg)

One set of records. Two centers. Field's picture of "who is on this team" is the membership edges of the team agent. Its picture of "who stewards this workspace" is the stewardship edge of the workspace agent. The card room's picture of a club is the membership edges of the club agent, and host is the stewardship edge, derived on the read.

## The card room

A club is a `.workspace` service agent. The card room acts as that agent under a wire the host signed at charter, pinned to one selector. Who belongs is `org.membership:member:<person>` in the club's vault, written when the person completes `workspace-join`. The card room does not store the roster.

Standing on a club read is Home's derivation for the signed-in person:

| Standing | Derived from |
| --- | --- |
| Host | She is the agent, or she holds a verified stewardship delegation from the club agent |
| Member | She has a membership record on the club agent |
| None | Neither |

A host who has also joined has both records. Hosting is the stewardship. Membership is the belonging. A night's talk is an open topic on the club's board. The people in it are the members, derived. The topic is not an agent and has no membership of its own.

## Field

A team is an organization agent. Each person on the team has a roster row in the team vault. The row points at the Home membership, the `has-member` credential, and the stewardship when she has one. The role on the row is `organization-steward`, `community-steward`, `progress-steward`, `field-recorder`, or `member`. The comment on `organization-steward` is the rule for all three steward titles: the stewardship wire materializes the authority, and the row does not.

A workspace is a service agent. Field's `ws-membership` row records an invitation and a title (`custodian`, `steward`, or `member`) so the directory has a name to show. The title `steward` on that row is not `ap:Stewardship`. Oversight is the wire Home checks. Belonging is the membership Home wrote on the workspace agent. When a team is associated with a workspace, a team member is also an active workspace member. The team roster does not copy the workspace roster into a second authority.

Discussions:

| Topic | Policy in Field | Who is in it |
| --- | --- | --- |
| A team conversation | Open | Every team member. No participant list. |
| A thread on a field subject | Open | The organization's members. |
| A community team room | Restricted | Whoever was invited and accepted. Acceptance does not mint a role and does not write a membership. |

A string match on a person's name, a boolean on a member row, and a prompt sentence are not substitutes for these records. A field roster row that does not name the Home membership is the steward's note. The membership, the credential, and the stewardship wire are the records.

## What not to model

- One address that is both the person and the organization. A person agent and an organization agent are different accounts.
- Stewardship as a role definition on the membership. That collapses two situations and makes "she left the team" silently end her oversight, or the reverse.
- The role definition as the grant. Without `materializedByDelegation`, the role authorizes nothing.
- Membership as a grant. Joining does not delegate.
- Stewardship as custody. The oversight delegation is how she acts for the agent. The key is how the account signs.
- A participant list on an open topic. Who may speak is the host's membership, read at the time.
- A membership of a discussion. A discussion is not an agent. Restricted presence is an accepted invitation.
- A field workspace title of `steward` treated as the oversight delegation. The title is on the directory row. The wire is the stewardship.
- A trust graph drawn from names, avatars, or a table in the app. Every edge is one of the assertions above, or it is not an edge.
