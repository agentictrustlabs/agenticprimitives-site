# Proposal: run the coach through the harness

*2026-09-29. A proposal for the agenticprimitives and engage repositories. HeartCoach today runs its Ask inside
its own Worker under the patient's browser session. This proposes moving it onto the shape the archetypes
already describe: the patient's own agent asks, the coach service answers under a grant the patient signed,
every act is a receipted step at the person's Home. It names the four pieces the estate is missing, what each
costs, and an order of waves that keeps the app working throughout.*

Read with the two walkthroughs: *The Ask at a person's agent* (`harness-ask-walkthrough.md`) for what the estate
harness does today, and *HeartCoach Ask* (the HeartCoach Ask walkthrough) for what
the app does instead.

---

## 1. The shortcut, stated plainly

`coach-a2a` is a harness of its own. It fetches the registered archetype definitions, hands the model every
tool it binds with `tool_choice: any`, gates each act with its own tier catalog and its own entitlement check,
reads the patient's cabinet with the patient's Home session token, and writes the coach's insight with that
same token. For a care-team member it does the same over the practice's desk under the member's role wire.

It works, it is fast (a warm Ask is 5–10 s), and every act is admitted the way a button press would be. But it
sits outside the thing this whole estate exists to provide:

- **The coach does not answer under a grant.** `heartcoach.svc` is minted and named, and answers nothing under its own identity. The coach reads the cabinet *as the patient*, because the app holds the patient's session. The archetype says the opposite: "the patient's agent asks; you answer it. Nothing reaches you except through the patient's own agent, carrying the grant."
- **The person's agent is not in the loop.** No run, no receipt, no provenance at the patient's Home. "What did my agent do today" does not show the consultation. Only the CoachInsight in the cabinet records it, and the coach wrote that record itself into a vault that is not its own.
- **No judge, no plan admission, no mandate verifier.** The model chooses among all bound tools; the doctrine's tier is computed in app code; there is no `authority_required`, no keyring, no risk ladder, no conformal acceptance, no receipt binding the playbook digest and the ontology manifest.
- **The care team's consultation is a system prompt.** The practice's liaison archetype is text inside `coach-a2a`, not the org's own agent acting on its own desk with the member's mandate.
- **The app re-implements the substrate.** `admitToolCall`, `entitled`, the index-verified desk copies: each is a small private copy of something Ring 0/1 owns. That is the duplication the engage repo exists to remove (CLAUDE.md, the ring rule).

Field took the same shortcut, for the same reasons. Two apps on one shortcut is a pattern; this proposal is
the exit.

## 2. The target shape

Three agents, three roles, no key that is also an identity:

| Party | Agent | Playbook | What it does in one Ask |
| --- | --- | --- | --- |
| **The patient** | their own person agent at `demo-a2a` (the Home) | `heart-coach-companion` (person archetype) | takes the sentence, keeps the cabinet, logs a reading on the patient's say, forwards a question or a symptom to the coach *with the grant*, files the coach's insight, sends "tell my nurse" to the practice |
| **The coach** | `heartcoach.svc` at `coach-a2a` (a service agent) | `heart-coach-patient-coach` (service archetype) | answers a question, opens a check-in, triages a symptom, from the cabinet read *under the patient's grant*; writes nothing anywhere |
| **The practice** | the org agent at `demo-a2a` (Atria Heart) | `heart-coach-care-team-liaison` + the role archetypes as specialists | receives the alert and the message, holds the desk; answers a clinician's ask about a patient as the member, under the member's role mandate |

One consultation then runs as one receipted run at the patient's Home:

1. The Ask sheet (or Claude, or any client) asks the patient's agent, as the patient (a Home session or an ask-as-me wire).
2. The harness admits the caller, loads the companion playbook by digest, grounds the sentence, and the judge picks: *log a reading*, *consult the coach*, *message the care team*, or none.
3. *Consult the coach* is one step: an A2A `message/send` to `heartcoach.svc` presenting the patient's coach grant. The coach service runs its consultation over the cabinet it may now read, and returns the reply and the insight as data.
4. The companion files the insight into the patient's cabinet: **the person's agent writes the person's vault**, which the harness already admits for the owner's own agent. The coach never writes.
5. Every step has a receipt with `skillRef` (the companion's digest), the binding, the observation; the consultation shows in "my runs"; the coach's answer carries the coach's own `skillRef` and digest inside the step's observation.

For the care team, a clinician's ask about a patient is a member asking the practice's org agent. The
harness's standing derivation gives *member*; the role wire the practice issued is the mandate; the org
agent's playbook carries the liaison with the role archetypes as **specialists**, which the harness already
stamps onto steps as executors. The desk is the org's own vault, read by the org's own agent.

## 3. What the estate is missing, piece by piece

### 3.1 A coach grant the patient signs

A delegation template `heartcoach-coach`, minted at the Home as a ceremony, from the patient to
`heartcoach.svc`: read on the cabinet's six record families (profile, readings, doses, symptoms, prefs,
guidance), no write, time-bounded (ninety days, like the operational-intent grant), revocable at Home. The
Home already mints `ask-as-me` this way (`demo-accounts.ts`, `delegation_template`); this is one more
template with a narrower selector. On the vault side the Home already has **folder grants** that cascade to a
subtree with a paired cross-principal delegation (content-storage §7.2, ADR-0019) and the **federated shared
lens** for the grantee to read across vaults (`?lens=shared`). The coach grant is a folder grant on
`heartcoach/` plus the delegation the coach presents.

*Cost: a template, a ceremony page, one folder grant issued at enrolment. Owner: agenticprimitives (Home).*

### 3.2 The coach as a service that answers under that grant

`coach-a2a` keeps its consultation code (the archetype fetch, the brief, the model loop, the reply shape) and
changes what it presents: it reads the cabinet **as the grantee**, through the shared lens with the patient's
delegation, and it **returns the insight instead of writing it**. Its A2A card gains one skill the person's
agent calls: `heartcoach.consult` with `{ kind, message, grant }`. The session-token read path is deleted.

The EMR chart pull stays where it is: the token lives only in the browser by design, so a chart pull is an
app-side act the screen invokes directly, not a step the harness plans. The mirrored profile is a cabinet
record the coach reads like any other.

*Cost: a read path over the shared lens, a card entry, deleting the write. Owner: engage (coach-a2a).*

### 3.3 The companion at the person's agent

The patient's agent gets `archetype.assignment` = `heart-coach-companion` at enrolment (a custodian or steward
act, already supported). Its definition compiles to three tools the harness must be able to invoke:

| Tool | What it needs from the harness | What exists |
| --- | --- | --- |
| `heartcoach.log` (log-a-reading) | write one typed record into the owner's own vault | `content.artifact` writes by the owner's agent are admitted today; what is missing is a **generic typed-record invoker** that validates the record against the ontology's class and shape (the definition's `domainRecords` already maps record type to class) instead of a hand-written invoker per app |
| `heartcoach.consult` (consult-the-coach) | call a service agent's skill over A2A presenting a grant | `engagement.agent.invoke` and `external.agent.ask` exist; the missing part is presenting a **delegation the asker holds to that service** on the call, and treating the service's answer as an observation with its own `skillRef` |
| `heartcoach.message` (message-the-care-team) | write into the practice's desk under the patient's membership | a routed subject-ask to the org agent, which already exists; the org agent's liaison playbook admits `message` from an enrolled patient |

The generic typed-record invoker is the one real piece of substrate work. It is also what Field needs, and
what every app after HeartCoach will need: a definition says "this tool writes a record of class X into the
owner's vault", the harness validates by shape and writes, and no app ships a private invoker. It lands beside
the coordination bindings as a `record-bindings.ts`.

*Cost: the typed-record invoker; grant presentation on a service call. Owner: agenticprimitives (demo-a2a,
orchestration). The app side is an assignment and three contract entries in `~/skills`.*

### 3.4 The doctrine's floor as a compiled shape

The one thing that must never be judged: at `call-emergency` the answer is the emergency line, before any
model. In `coach-a2a` this is code. In the harness it must be a **compiled shape** (the same mechanism as the
compiled payment and read shapes): a symptom sentence naming chest pain or fainting is typed
`call-emergency` deterministically, the reply is the fixed sentence, and the alert step still runs. The
judge never sees it. The same shape carries the doctrine's tier table for the other seven symptoms.

*Cost: one compiled shape and its cases in the evaluation program. Owner: agenticprimitives.*

## 4. What we get

- **Authority where it belongs.** The coach acts under a grant the patient signed and can revoke at Home; the grant is verified per step by the mandate verifier with the versions bound; "not the custodian" holds for the coach exactly as it does for `engage-a2a`.
- **Evidence.** Every consultation is a run with receipts at the patient's Home, the coach's digest inside the observation, and provenance a stranger can read.
- **One harness.** The judge, plan admission, the risk ladder, confirmation memory, the asker context that turned 7/19 into 18/19: HeartCoach gets all of it and its evaluation program for free, and the app deletes its copies.
- **The two-party shape for the care team.** A clinician's act on a patient is a member's step at the org agent under a role mandate, with `authority_required` where the role runs out, not a 403 from app code.

## 5. What it costs, and the risks

| Concern | Today | Under the proposal | Mitigation |
| --- | --- | --- | --- |
| Ask latency | 5–10 s warm | the Home's ask p50 is 13–16 s with the selection stage on, a declined ask ~5 s | the companion's three tools are few enough for the fast judge (~1.2 s); the coach's own reads stay memoised in `coach-a2a`; the composer is skipped because the coach's reply is the answer template; target ≤ 8 s warm, measured before W4 |
| Model | Claude Sonnet in the app | Gemini Flash on faithnet by default | the coach service keeps its own provider for the clinical turn; only the companion's judge and planner run on the estate's model |
| Clinical safety | tier computed in app code | must not depend on a judge | §3.4: a compiled shape, with gold cases |
| The EMR token | browser only | unchanged | the chart pull is not a harness step |
| Two apps' worth of private invokers | field-a2a and coach-a2a each carry theirs | one typed-record invoker in the harness | the invoker validates by ontology shape, never by app code |
| Migration | one Worker | three agents and a grant | the waves below keep the current path live until W4 |

## 6. Waves

| Wave | What lands | Proof |
| --- | --- | --- |
| **W1 — the grant** | `heartcoach-coach` template at the Home; folder grant on `heartcoach/` at enrolment; `coach-a2a` reads through the shared lens under the grant and returns the insight as data; the session-token read path is kept behind a flag | the same Playwright walk passes with the flag on; a revoked grant makes the coach answer "I no longer have your grant" |
| **W2 — the companion** | the companion assignment on the demo patients; the typed-record invoker; `heartcoach.consult` as a service call presenting the grant; the insight filed by the person's agent | "log my blood pressure 128 over 78" and "how is my week" run as receipted runs at Alice's Home; `my_runs` shows them; the app's Ask sheet routes to the Home path |
| **W3 — the doctrine and the care team** | the call-emergency compiled shape with cases; the liaison playbook with role specialists on Atria Heart's org agent; the persona's ask about a patient as a member's subject-ask | the six walked Asks from the HeartCoach note reproduce through the Home, including the milestone refusal as `authority_required` / a role's honest refusal |
| **W4 — delete the shortcut** | the app-side harness, `admitToolCall`'s tier catalog and `entitled` come out of `coach-a2a`; the Worker is the coach service and the EMR adapter, nothing else | `coach-a2a/src/coach-turn.ts` shrinks to the consultation; no Home session token reaches a vault from the app |

## 7. Decisions asked of the other developer

1. Is a **typed-record invoker** driven by the definition's `domainRecords` and the ontology's shapes the right substrate piece, or should a person's agent write app records only through a routed subject-ask to an app service? (The proposal prefers the invoker: the person's agent writes the person's vault.)
2. Should a **service call present a delegation the asker holds** as a first-class step (a `grant` argument on `engagement.agent.invoke`), or is the coach grant presented out of band by the service reading the shared lens? (The proposal prefers first-class: the receipt then names the grant.)
3. Is a **compiled shape** the accepted home for a safety floor the judge must never touch, and does the evaluation program want a `heart-coach` domain with `expectedBehaviour` cases for it?

Until these are decided, HeartCoach keeps building on the shortcut, and each screen added there is one more
thing W4 must move.
