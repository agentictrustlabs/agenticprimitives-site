# Membership, role, and stewardship

Membership is belonging. Stewardship is oversight, and oversight does not require belonging. A role is a name a belonging can carry. The classes are `aporg:OrganizationMembership`, `aporg:RoleAssignment`, and `ap:Stewardship`. Those situations, the charter link, and the delegations that carry their authority are the edges of the Agentic Trust graph (`at:TrustGraph`).

Sources: `packages/ontology/tbox/org.ttl`, `packages/ontology/tbox/core.ttl`, `packages/ontology/tbox/trust.ttl`, `packages/ontology/tbox/verification-receipt.ttl`. The Agentic Trust T-box mirrors the same terms under `at:` with `rdfs:seeAlso`. `at:TrustGraph` is declared there.

## Belonging and oversight

A membership says that a person belongs to an organization for a time. The belonging can carry roles. Facilitator, treasurer, and chief financial officer are roles on a membership: each names what that person is called inside that organization, and a delegation may materialize the role so the name has authority. The role qualifies the belonging. End the membership and the roles on it end with it.

Charter is belonging of a different kind. `ap:charteredUnder` says an agent sits under the agent it was created for: a workspace agent under its organization, a treasury under the person or organization that holds it. Charter says whose it is.

Stewardship is not a belonging. A person stewards an agent when that agent has signed an oversight delegation to her. She may also belong to it, and she may hold a role on that membership. Neither is required. A chief financial officer can oversee a company without being a member of it. The stewardship is her oversight of the organization, evidenced by the organization's delegation to her. If she later joins, the membership is a second record, and "chief financial officer" is a role on that membership. Leaving the company ends the role. It does not, by itself, end the oversight. Revoke the oversight delegation and the stewardship ends. The membership, if she has one, stays until it is ended on its own.

A workspace agent is a service, and it cannot have members. People belong to the organization that governs it. Teams belong to that same organization. The workspace names the organization and nothing else, and it reaches the organization's teams and members through that one reference. A discussion is not an agent, so nobody belongs to a discussion. Who may speak is participation, derived from a membership when the topic is open, and an accepted invitation when it is restricted.

## What Home, Field, and the card room record

![Four relationships: membership, stewardship, a role, and a discussion](/ontology/relationships.svg)

Home is the record. Field and the card room ask Home who a person is to an agent, and they do not keep a second roster that decides it. Standing is derived, never typed in by an app: `self`, `steward`, `member`, or `none` (`deriveStanding`). `steward` means she holds that agent's oversight delegation, the wire is the right shape, and the chain still accepts it. `member` means she is on that agent's membership roster. Standing shapes what the product says before a ceremony. A gate does not read it as permission.

| Relationship | Host | Record the apps use | What it is |
| --- | --- | --- | --- |
| Membership | An organization agent. A team is an organization, so people belong to a team the same way. | `org.membership:member:<person>` in that organization's vault, the person's link with `relationship: member`, and the `has-member` credential both signed | Belonging. Home refuses this record on a workspace agent. |
| Team of an organization | The organization | `aporg:TeamAffiliation`: the team agent, the organization, kind `chartered`. On the link, `parent` is the organization. | The team belongs to the organization. It is not nested under a workspace. |
| Workspace reference | The workspace agent | `workspace.governor` = `{ governedBy, coordinatedBy }`. The organization's vault holds the mirror `workspace:<workspace sa>`. | The workspace names its governing organization and reaches that organization's members and teams through it. |
| Stewardship | An organization or a service, including a workspace agent | The oversight delegation on the person's link, `relationship: steward`, checked on chain | Oversight. A chief financial officer can hold this and not be a member. |
| Role on a belonging | The membership | Field team roles: `organization-steward`, `community-steward`, `progress-steward`, `field-recorder`, `member` | A name on the belonging. The stewardship wire materializes `organization-steward`. The word on a roster row is not the wire. |
| Participation in a discussion | A topic. Not an agent | Open: no row. Restricted: an invitation, then acceptance | Presence. Accepting does not mint a role and does not create a membership. |

![The organization is the hub: members, teams, and the workspace all hang on it, and the workspace points back](/ontology/hub.svg)

**Home.** The organization is the hub. It holds the members and the teams, and it governs the workspace. The shape is `org → { members, teams, workspace }` and `workspace → org`. A chain `org → workspace → teams` is the shape Home refuses. A workspace with no governing organization stands alone: it has no members and no teams, and access to it is a direct grant from the person to the workspace. A workspace chartered before this rule, with no `workspace.governor` pointer, still keeps the membership records it already has until it is migrated. Standing for a workspace or a club is `deriveStanding` against the governing organization. A member reads the workspace's content by belonging to that organization: at create, the workspace grants the organization a content-scoped read of itself, and the member's membership chains onto that grant. That read is not a relationship to the workspace agent.

**The card room** (the poker game) and **Field.** A club and a field realm are `.workspace` agents. Who belongs is the governing organization's `org.membership` records. The card room stores the wire the host signed so the room can act as the club, and no roster. Field's `ws-membership` rows are a projection: each names `organization` and `membershipRecord`. Nobody joins the workspace. A team a person founds is its own organization, affiliated with the governing organization, and its members are members of the team. A team conversation is open to those members. A community team room is restricted: invite, then accept, and the acceptance grants nothing.

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

The T-box range of `organizationAgent` is an organization or a team. Home writes the membership on that organization. A workspace agent is outside the range, and Home refuses the record there.

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
| The people | `ap:PersonAgent` | Members of the governing organization. They are not members of the workspace agent. |
| The teams | `ap:TeamAgent` | Affiliated with the governing organization (`aporg:TeamAffiliation`). Not children of the workspace. |

The workspace agent's only relationship record is `workspace.governor`, pointing at that organization. Teams and members are read by following it. `aporg:WorkspaceParticipation` is the direct grant for a workspace that has no governing organization. A governed workspace does not use it for "who is here." An open discussion derives who may speak from the membership of the organization that hosts the topic.

The workspace agent acts only inside what the governor delegated to it. Revoke that delegation and the workspace agent is inert. It is never an independent source of authority.

Product language "steward of the workspace" means `ap:Stewardship` whose `ap:stewarded` is the **workspace agent** (or, when the social face is itself an organization, that organization agent). It does not mean a role on a membership, and it does not mean a property of the workspace entity.

## Worked example

Corridor is a workspace governed by Field. Walk team belongs to Field. Three people belong to Field. One of them facilitates, and that same person stewards Field.

| Object | Address in the example | Class |
| --- | --- | --- |
| Field | `field.org` | `ap:OrganizationAgent` |
| Corridor | the workspace entity | `aporg:Workspace`, `governedBy` `field.org`, policy `open` |
| The workspace agent | `corridor.workspace` | `ap:WorkspaceAgent`, `coordinatesWorkspace` Corridor |
| Ada, Ben, Cora | three person agents | `ap:PersonAgent` |

Ada, Ben, and Cora each have one membership, of Field. Walk team is a team of Field, an `aporg:TeamAffiliation`, not a child of the workspace. `corridor.workspace` holds `workspace.governor` with `governedBy` Field. It holds no membership records. The team's open conversation takes its speakers from the team's own membership. No topic stores a second list.

Cora's membership has one `aporg:RoleAssignment`.

- `assignedRole` = Field's role definition `facilitator`.
- `materializedByDelegation` = delegation **D1**, `field.org` → Cora, methods pinned to what a facilitator may do.

D1 is the authority of the role. Ada and Ben have memberships and no such assignment. They belong. They cannot facilitate.

Cora also has an `ap:Stewardship`.

- `steward` = Cora.
- `stewarded` = `field.org`.
- `stewardshipDelegation` = the digest of delegation **D2**, `field.org` → Cora, the oversight delegation the organization signed to her.

D2 is the authority of the stewardship. It is not D1. Ending her facilitator role revokes D1 and leaves D2. Ending her stewardship revokes D2 and leaves her membership and, if it is still current, D1. Removing her from Field ends the membership and the role. It does not, by itself, revoke D2. Someone has to revoke the oversight delegation.

She is not a custody member of Field or of the workspace agent. The keys stay with the accounts' custodians. She acts for Field only where D2 says so. Belonging to Field is what lets her read the workspace, by chaining that membership onto the content grant the workspace gave Field.

![Object diagram: Ada, Ben, and Cora, Cora’s facilitator role, and her stewardship of the workspace](/ontology/corridor.svg)

What a reader should be able to answer from the diagram without guessing:

- Who belongs to Field? Ada, Ben, and Cora. Three memberships of the organization.
- Who may facilitate? Cora, because D1 materializes that role. Not because she is a member.
- Who stewards Field? Cora, because a stewardship names her and `field.org`, evidenced by D2. That is not a membership, and it is not a property of the workspace.
- Who is in the workspace? Whoever Field's membership says, because the workspace names Field and keeps no roster of its own.
- Which team is in the workspace? Walk team, because it belongs to Field. The workspace does not list teams.
- Who holds the keys? Not Cora. Custody is a different class.

### The same facts, as the trust graph

Centered on `field.org`, the graph is the membership edges, Walk team's affiliation, the workspace the organization governs, and Cora's role grant. Ada, Ben, and Cora appear because they are members of Field. The workspace appears because Field governs it. The team appears because it belongs to Field.

![Trust graph centered on field.org](/ontology/graph-field.svg)

Centered on `corridor.workspace`, the graph has one reference: `governedBy` Field. Members and teams are not edges of the workspace. They are read by following that reference to Field. A discussion hosted in the workspace adds no membership edge. An open topic takes its speakers from the organization or team that hosts it.

![Trust graph centered on the workspace agent](/ontology/graph-workspace.svg)

One hub. The organization is the center a person reads for "who belongs" and "which teams." The workspace is a pointer at that center, plus the content the organization is granted to read.

## The card room

A club is a `.workspace` service agent. The card room acts as that agent under a wire the host signed at charter, pinned to one selector. Who belongs is the governing organization's `org.membership:member:<person>` records. The club's vault does not hold them. The card room does not store a roster.

Standing on a club or workspace read is Home's derivation against the governing organization:

| Standing | Derived from |
| --- | --- |
| Host | She is that organization, or she holds a verified stewardship delegation from it |
| Member | She has a membership record on that organization |
| None | Neither. A link to the workspace agent alone is not membership. |

A workspace with no `workspace.governor` pointer is the older shape: standing is derived against the workspace agent itself, and those records stay until the workspace is given a governing organization. A night's talk is an open topic. The people in it are the governing organization's members, derived. The topic is not an agent and has no membership of its own.

## Field

A team is an organization agent, affiliated with the governing organization. Each person on the team has a membership of the team. The roster row in the team vault points at that Home membership, the `has-member` credential, and the stewardship when she has one. The role on the row is `organization-steward`, `community-steward`, `progress-steward`, `field-recorder`, or `member`. The stewardship wire materializes the authority. The row does not.

The field realm's workspace does not have members. The accompanying organization does. Field's `ws-membership` rows are a projection of that roster: each carries `organization` and `membershipRecord`. A title on the row is not `ap:Stewardship`. A team hangs under the governing organization, and a circle or church hangs under its team. The workspace's link hangs under the organization. A member sees the workspace because she belongs to the organization that governs it, and she reads its content through the grant the workspace gave that organization.

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
- A membership of a workspace agent. The workspace names its governing organization. People and teams belong to that organization.
- A team nested under a workspace. The organization holds the teams. The workspace does not.
- A field workspace title of `steward` treated as the oversight delegation. The title is on a projection row. The wire is the stewardship.
- A trust graph drawn from names, avatars, or a table in the app. Every edge is one of the assertions above, or it is not an edge.
