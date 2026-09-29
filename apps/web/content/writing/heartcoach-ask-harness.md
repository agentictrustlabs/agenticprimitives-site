# HeartCoach Ask — from an intent on the screen to the A2A harness, step by step

*2026-09-29. Companion to [24-heartcoach.md](24-heartcoach.md) ("The Ask", "The care team"). This document
follows ONE Ask through the whole system: what the screen sends, how `coach-a2a` admits it, judges who is
asking and about whom, selects the archetypes and tools, plans the brief, runs the model, admits each act,
answers, and files. Then six real Asks are walked in full.*

Code: `apps/coach-web/src/AskPanel.tsx` (the sheet), `apps/coach-web/src/intents.ts` (the one way out of
the browser), `apps/coach-a2a/src/index.ts` (the gateway), `apps/coach-a2a/src/coach-turn.ts` (the
harness), `apps/coach-a2a/src/archetypes.ts` (the registry), `apps/coach-a2a/src/desk.ts` (the desk and
its gates), `apps/coach-a2a/src/skills.ts` (the cabinet skills), `packages/coach-domain/src/ask.ts`,
`careteam.ts`, `tools.ts` (the pure parts: briefs, arg translation, the tier catalog, the role table).

---

## 1. What an Ask is

The Ask sheet has **two doors**. They are two different harnesses in two different places.

| Door | Who answers | Where the harness runs | What it can do |
| --- | --- | --- | --- |
| **HeartCoach** | HeartCoach AI (`heartcoach.svc`), *or* the practice's own agents for the member's roles | **Inside `coach-a2a`** — this Worker is the harness: the registry's archetype definitions are the playbook, the registry's tools are the tools, and the Worker binds each tool's invoker to one of its own skills | Read the patient's cabinet or the practice's desk under the caller's grant; **act** (log, triage, message, acknowledge, record a milestone, pull the chart), each act through the app's own gate; answer in the say/because shape; file one insight |
| **My agent** | The person's OWN agent at their Home | **At Home** — `coach-a2a` signs a caller assertion under the ask-as-me wire the person signed and posts to the person's agent's `/harness/ask`; the Home harness runs the person's own playbook over their own records | Asks; never acts. Everything else in the person's life at Home |

This document is about the first door. The second is one skill (`heartcoach.ask.me`, `ask-me.ts`): it
builds `{ method, nonce, addressee, message, channel, surface }`, signs its digest with the service's AKCS
key, wraps the signature in the person's `ask-as-me` delegation (the `0x51` session form), and forwards
the Home's answer as the agent's, never as the coach's. Without a wire it answers `412 ask_wire_required`
and the sheet offers "Connect at Home".

**Three consultations, one harness.** `heartcoach.ask` (a question), `heartcoach.checkin` (the morning
check-in) and `heartcoach.triage` (a symptom report) are three skill ids on the Agent Card that all run
`coachTurn` with a different `kind`. The kind changes the opening line the model sees
(`[daily check-in] …`, `[symptom report] …`) and is filed on the insight; nothing else branches on it —
the doctrine decides what a symptom means, not the skill id.

**Two faces of the same skill.** `heartcoach.ask` with no `patient` (or `patient` = the caller) is the
**patient's consultation** with HeartCoach AI over their own cabinet. `heartcoach.ask` with
`practice` + `patient` naming someone else is the **care team's consultation** — a clinician or a
caregiver asking *about* a patient, spoken for by the archetypes of the roles they hold on that
patient's team, over the practice's desk. Same JSON-RPC envelope, same gateway, same loop, different
playbook, different brief, different tools, different filing.

---

## 2. From the screen to the harness

The web **expresses an intent and never names a tool** (ADR-0005). The Ask sheet does exactly one thing
when the person presses Ask:

```ts
// AskPanel.tsx — the patient's Ask
sendCoachIntent({ skill: 'heartcoach.ask', goal: message,
                  context: { message, emr?: { accessToken, patientId } } }, session.token, undefined, { priority: true });
 
// AskPanel.tsx — a care-team member's Ask ABOUT a patient (the sheet was opened from that patient's page)
sendCoachIntent({ skill: 'heartcoach.ask', goal: message,
                  context: { message, practice: about.practice, patient: about.patient } }, session.token, undefined, { priority: true });
```

`sendCoachIntent` (`intents.ts`) turns that into **one A2A `message/send`** to `coach-a2a`'s `/a2a`:

```json
{ "jsonrpc": "2.0", "id": "<uuid>", "method": "message/send",
  "params": { "message": { "role": "user", "parts": [{ "kind": "text", "text": "How is my week going?" }],
              "metadata": { "skill": "heartcoach.ask", "message": "How is my week going?", "practice": "0x…", "patient": "0x…" } } } }
```

with `Authorization: Bearer <the person's Home id_token>`. Three things about the envelope matter:

- **The skill is discoverable.** `heartcoach.ask` is on `/.well-known/agent-card.json` with its tier (`ReadOrDraft`), its archetype (`heart-coach-patient-coach`) and its outcomes (`Insight | Escalated | Refused:coach-unreachable`). An unknown skill is `-32602` with the list of known ones. This is the control-plane test from CLAUDE.md: a skill on a card, carried by `message/send`, under the principal's grant, re-evaluated per call.
- **The token is the grant, not the authority.** It says who is asking. What they may read or do is decided again on the Worker, per call, from the Home's records (section 4).
- **Priority.** Every other intent from the browser waits in a queue (parallel reads under one Home session collide at the vault); an Ask goes at once, because its reads are memoised or warmed server-side. A question never waits behind a screen's reads.

What comes back is the harness's answer (section 3, step 12). The sheet shows `say`, `because` in
muted type, a red banner at `call-emergency`, an amber note at `tell-care-team`, and one ✓ or ✕ line per
act. If any act landed it fires `coach:cabinet-changed` (patient) or `coach:desk-changed` (care team) so
the screen behind the sheet re-reads.

---

## 3. The harness, step by step

Every step below is in `coachTurn` / `careTeamTurn` (`coach-turn.ts`) or the gate it calls. The order is
the order in the code.

### Step 0 — Admit the request (gateway, `index.ts`)

1. The body must be JSON-RPC 2.0 and the method `message/send`. Nothing else is served.
2. `metadata.skill` must be on the card (`skillById`). The card's declared tier rides on every answer as `tier`.
3. **Verify the subject** (`verifiedSubject` → `verifyRequest` in `@engage/home/auth`): the bearer must be a JWT whose issuer is under `SESSION_ISS_DOMAIN`, whose signature verifies against that issuer's `/jwks`, and whose audience is in `SESSION_AUDS`. A failure **rejects** (401); there is no second mechanism. The result is the `Subject`: `{ address, name, token, sub }` — the Smart Agent address is the identity; the name is a facet. For a persona session (Dr. Dave Silva, MD, minted by the Home's `demo-signin { sa, as }`), the subject IS the persona's address; the human it stands for is not in the token and never reaches the harness.
4. Dispatch on the skill id. `heartcoach.ask` → `coachTurn(ctx, subject, metadata, 'question')`. `ctx.waitUntil` is the request's `executionCtx.waitUntil`, so work can outlive the response.

### Step 1 — Gate the capability

`admitToolCall({ toolName: 'coach_turn' })`. The tier catalog (`tools.ts`) lists every capability the
app has with its consequence tier — `ReadOrDraft`, `ProtectedMutation`, `HighConsequence`. `coach_turn`
is ReadOrDraft. An uncatalogued name throws `ToolPolicyError` (→ 403). A HighConsequence capability needs
a `DecisionCase` whose approver is not its proposer — and no HighConsequence tool is ever offered to the
model, so the model cannot even propose one here (see step 8).

Then the two preconditions with an honest failure: an empty message is 400; no `ANTHROPIC_API_KEY` is
`503 coach_unconfigured`. Never a canned answer.

### Step 2 — Judge which consultation this is

```ts
const about = String(params['patient'] ?? '').toLowerCase();
if (about && about !== subject.address) return careTeamTurn(...);   // the other consultation entirely
```

- No `patient`, or `patient` is the caller → **the patient's consultation** (steps 4a–11a).
- `patient` names someone else → **the care team's consultation**, and `practice` is required (400 without it) (steps 3b–11b).

There is no third path and no inference from the message text: who you are asking *about* is a
parameter the screen set from the page the sheet was opened on.

### Step 3 — Establish standing (care team only)

`deskRead(c, subject, { practice, patient })` reads the practice's desk **as the member** — under
their own role wire, not the app's — and derives their standing:

- `openPractice` → `readLibrary` for the org: the member's remembered copy of the desk, verified against the Home's index (24-heartcoach.md, "Reads"). What the copy holds is what the member's grant admitted.
- `standingAt` (`careteam.ts`): from the roster, the enrollments and the `heartcoach.careteam` records, `rolesOver(me, patient)` — the roles this member holds on THIS patient's team (a steward holds `clinical-manager` implicitly). `capabilitiesOf(roles)` is the union of `hp:roleEntitles` for those roles, read from the generated ontology constants, never from a table in code.
- `entitled(standing, patient, 'chart.read')` — the **first gate** (section 4). Not on this patient's team, or the role is not for `chart.read` → 403 `not_entitled`, in words, before any model runs.

The result `PatientDeskView` carries `standing.roles`, `standing.capabilities`, the enrollment, the
team, the alerts, the thread and the transition (with each milestone's owners and status).

### Step 4 — Select the archetypes (the playbook)

The system prompt is **not written in this repo**. It is the registered archetype definitions, fetched
from the skills registry (`SKILLS_REGISTRY`, reached over the `SKILLS_A2A` service binding) at
`/context/contexts/heart-coach/archetypes/<id>/definition`, verbatim, digest-bound, memoised ten minutes
per isolate so a republished skill reaches the coach without a deploy.

| Consultation | Archetypes, in order | Chosen by |
| --- | --- | --- |
| Patient | `heart-coach-patient-coach` (HeartCoach AI: the clinical-safety doctrine, the five crafts, answer-a-question, daily-check-in, triage-symptoms) then `heart-coach-companion` (the patient's own agent: log-a-reading, message-the-care-team) | `ASK_ARCHETYPES`, fixed |
| Care team | `archetypesFor(standing.roles)` — one archetype per role held, deduplicated in the codelist's order — then `heart-coach-care-team-liaison` (the practice's own agent, beneath them) | `hp:roleArchetype` on each `hp:CareTeamRole` in `health-portal.data.ttl` |

The role → archetype table as the ontology holds it today:

| Role(s) | Archetype |
| --- | --- |
| cardiologist, hospitalist, advanced-practice-provider | `heart-coach-cardiologist` |
| primary-care-physician, palliative-care-clinician | `heart-coach-primary-care` |
| transitional-care-nurse, heart-failure-nurse, nurse, medical-assistant, home-health-nurse | `heart-coach-transitional-care-nurse` |
| pharmacist | `heart-coach-pharmacist` |
| dietitian | `heart-coach-dietitian` |
| cardiac-rehab-clinician, physical-therapist | `heart-coach-cardiac-rehab` |
| social-worker | `heart-coach-social-worker` |
| care-coordinator, clinical-manager | `heart-coach-care-coordinator` |
| caregiver | `heart-coach-caregiver` |

A member with several roles (Carol as coordinator *and* manager; a nurse who is also a caregiver) is
spoken for by all of their archetypes at once. Each definition is `# <archetypeId> (v<version>, <digest>)`
followed by its instructions; the definitions are joined and closed with the deployment's **contract**
(`APP_CONTRACT` or `CARE_TEAM_CONTRACT`) — the one piece this repo authors: how THIS deployment binds each
tool, brevity, and what the model must never do. That whole block is marked `cache_control: ephemeral`
so its tokens are cached across consultations.

### Step 5 — Select the tools

The model's tool list is built per consultation, never fixed:

**Patient** (`boundTools`): of the tools the two definitions carry, this deployment binds exactly
`heartcoach.log`, `heartcoach.triage`, `heartcoach.message` — with the registry's own description and
input schema (vendor `x-` keys stripped). `heartcoach.emr.sync` is added **only while the session
presents an EMR token** (`context.emr`). `coach_reply` is always last.

**Care team** (`careTeamTools`): by what the member's roles are for —

| Tool | Offered when |
| --- | --- |
| `heartcoach.alert.ack` | `capabilities` includes `alerts.acknowledge` |
| `heartcoach.transition` | the patient has an open transition AND one of its undone milestones lists one of the member's roles as `hp:milestoneOwner` |
| `heartcoach.message` | `capabilities` includes `messages.write` (the liaison's registered definition when it carries the tool; a local shape otherwise) |
| `coach_reply` | always |

So a dietitian's Ask about Alice has `message` and `coach_reply` and nothing else; a pharmacist's has
`transition` too while `discharge-med-rec` is undone; the cardiologist's has all four. A tool the
model is not offered cannot be called, and one it names anyway is refused by name in the tool result.

Tool names: the registered ids are dotted; the model's namespace is not. `heartcoach.log` is offered as
`heartcoach__log` and mapped back on every call (`modelToolName` / `registeredToolId`). Every record,
receipt and reply names the registered id.

### Step 6 — Plan the context (the brief)

The second system block is the **brief** — what the playbook may read, and only that. It is rebuilt
after every round in which an act landed, so the model reads the current state.

**Patient** — six cabinet folders under the patient's own grant, read in parallel from the colo-wide
memo (`readCabinet`: profile, readings, doses, symptoms, prefs, guidance; a refused folder is a refused
consultation, never a guessed one), then `cabinetBrief`:

```
# The cabinet of Alice Okoro — read under their grant · now 2026-09-29 11:58
## Cardiac profile (mirrored from nextgen 2026-09-28 …)  — diagnoses [heart-failure], today's orders with orderIds, allergies, care plan, goals, recent labs
## The last seven days — BP average, latest weight and change, steps at goal, doses ticked; readings newest first with ids and sources (you | device | chart)
Still to do today: weight
Check-ins: on at 08:00
## Your own earlier insights (newest first)
```

plus the care-team section from `careTeamAtHand`: the practice the patient is enrolled at, who is on
their team and in what role **with each member's address** (so "tell my nurse" has a `to`), the thirty
days (day N, done, coming up), open alerts, the latest word from each member and the last ten messages.
This section is taken from what is at hand: a desk already remembered is used; one not yet read is
**warmed with `waitUntil`** and the brief says "being read now — team details will be at hand for the
next question". An answer in seconds beats a complete one in twenty.

**Care team** — `deskBrief` from the view read in step 3, and nothing from the patient's cabinet (it is
not on the desk and the brief says so):

```
# The desk at Atria Heart, about Alice Okoro — read under Dr. Dave Silva, MD's own grant · now …
## You, on this patient's care team
Roles: Cardiologist.  What your role is for (hp:roleEntitles): patient.find, chart.read, … plan.write, transition.track, …
As Cardiologist, in the first thirty days you owe: (1) … (hp:roleDuty)   As Cardiologist you never: … (hp:roleNeverDoes)
## The thirty days — day 3 after discharge (heart-failure, St. Anne's, discharged 2026-09-25)
- discharge-med-rec · … · DONE by Nathan as Pharmacist …
- visit-7d · … · due 2026-10-02 12:00 · DUE · YOURS TO RECORD
…
## Alice Okoro — enrolled under …; care team: …; "the patient's own readings live in THEIR cabinet"
## Alerts (newest first) — each with severity, state, text, (alertId …)
## Thread (oldest first, last 10)
```

The brief is where the ontology speaks to the model: the roles, what they are for, what they owe, what
they never do, which milestones are theirs. The model is told to offer only what the role is for and
that "what lands is decided by the practice's grant, not by this list" — the second gate.

### Step 7 — Run the model loop

`callModel`: Anthropic Messages API, model `COACH_MODEL` (default `claude-sonnet-5`), `max_tokens`
450, `tool_choice: any` (the model must call a tool; plain text is a contract violation and is answered
`502 coach_no_reply`), up to `MAX_ROUNDS = 5` calls. A reading logged and an answer is two rounds; a
chart pull, a dose tick and an answer is three.

Each round: the assistant's blocks are appended; every `tool_use` is handled in order; the tool results
go back as one user message; if an act landed the brief block is rebuilt. The loop ends the moment
`coach_reply` validates.

### Step 8 — Admit each act (the gate the model cannot bypass)

**The model proposes; the gate decides.** Every tool the model calls runs the same handler a button
press on the screen would, with the same validation, the same tier catalog and the same grant:

| Model calls | Handler | Gate(s) | What is written |
| --- | --- | --- | --- |
| `heartcoach.log` | `recordFromLogArgs` → `log()` (`skills.ts`) | `admitToolCall(reading_log \| dose_tick)`; `validateLoggable`; subject stamped from the **verified session**, never the payload; a dose must match an **active order** in the chart | one `heartcoach.reading` or `heartcoach.dose` in the patient's cabinet |
| `heartcoach.triage` | `symptomFromTriageArgs` → `log()` → `deliverAlert` | `symptom_report`; the tier is computed **server-side** from `SYMPTOM_TIER` (the doctrine's table; fainting or chest pain anywhere → `call-emergency`); then `alert_deliver` writes the alert **onto the practice's desk under the patient's own wire** | a `heartcoach.symptom` in the cabinet; a `heartcoach.alert` on the desk (or `delivered: false` with the reason, said back) |
| `heartcoach.message` | `messageSend` (`desk.ts`) | `message_send`; patient side: must be enrolled at exactly one practice, `to` must be a current team member; care-team side: `entitled(standing, patient, 'messages.write')` | one `heartcoach.thread-message` on the desk |
| `heartcoach.alert.ack` | `alertAcknowledge` | `alert_acknowledge`; `entitled(…, 'alerts.acknowledge')` | the alert's state and acknowledgement |
| `heartcoach.transition` | `transitionTrack(action: mark)` | `transition_track`; `entitled(…, 'transition.track')` **and** `mayRecordMilestone(roles, milestone)` — the role must be an `hp:milestoneOwner` | the milestone done, by whom, as which role, with the note |
| `heartcoach.emr.sync` | `emrSync` | `emr_chart_read` (+ `profile_mirror` when `save`); only with the session's EMR token | the chart mirror (saved as `heartcoach.profile` when asked) |
| anything else | — | refused by name: "'x' is not a tool this deployment binds / this role is offered" | nothing |

A refusal is returned to the model as a tool result with `is_error: true` and the gate's own sentence
(ADR-0013: the reason, verbatim). The contract tells the model to repeat it honestly. Every act,
landed or refused, is appended to `acted[]` with a plain-words summary and where it was stored.

### Step 9 — Fold what landed into the brief

Patient: after a log or a chart pull the readings and doses are re-read from the memo and the brief is
rebuilt, so the next round (and the reply) sees the new number. Care team: the act's own result is
patched into the view (`current`) — the acknowledged alert, the marked milestone, the sent message — and
the brief rebuilt **without a second desk read** (that would be seconds, mid-consultation).

### Step 10 — Validate the reply

`validateCoachReply`: `say` is required (≤ 1200 chars); `tier` must be one of
`self-care | tell-care-team | flag-urgent | call-emergency`; `theme`, when given, must be one of the
ontology's `hc:QuestionThemeKind` values (`bp-trend`, `weight-change`, `missed-dose`, `medication-question`, `symptom`,
`chest-discomfort`, `pulse-and-rhythm`, `salt-and-diet`, `walking-and-exercise`, `other`); `stillToDo` ⊆ `{bp, weight, steps, doses}`; `builtFrom` is the
reading ids the answer cites. A bad reply is a refused tool result and the model tries again within the
round budget.

### Step 11 — File

Patient: **one `CoachInsight`** (`heartcoach.guidance`) — the one record the coach ever writes —
with the question, `say`, `because`, tier, theme, still-to-do, the acts taken, the readings it was built
from, and `under`: the source commitments of the archetypes it ran under. Gated by `guidance_append`
and filed **after the reply leaves** (`waitUntil`); the patient waits for words, not for a vault
round trip.

Care team: **no insight**. The insight is the patient's record and this consultation was not theirs.
What the member did is on the desk already (the acknowledgement, the milestone, the message).

### Step 12 — Answer

```json
{ "kind": "answer", "consultationKind": "question" | "check-in" | "symptom" | "care-team",
  "about": { "patient", "patientName", "roles", "capabilities" },      // care team only
  "say": "…", "because": "…", "escalationTier": "self-care", "theme": "…", "stillToDo": ["weight"], "builtFrom": ["bp-…"],
  "acted": [{ "tool": "heartcoach.log", "summary": "logged 2400 steps", "storedIn": "heartcoach/readings/steps-….json" }],
  "insight": { "id": "guidance-…", "storedIn": "…" } | null,
  "archetypes": [{ "id": "skill:archetypes/heart-coach-patient-coach", "version": "…", "digest": "…" }],
  "under": ["<source commitment>", …], "model": "claude-sonnet-5", "usage": { "input", "output" }, "ms": 5400, "tier": "ReadOrDraft" }
```

The coach's escalation tier travels as `escalationTier`; the gate's capability tier as `tier`. The
`archetypes` and `under` fields make every answer attributable to the exact registered words it ran
under.

---

## 4. Judging and refusal — the two gates

Nothing in the harness decides authority from the message, the model, or the token alone. Two gates,
in this order, and both are in words:

1. **The ontology gate — "is this what your role is for?"** `entitled(standing, patient, capability)`. The member's roles on the patient's team come from the desk's `heartcoach.careteam` record; what a role is for is `hp:roleEntitles` from `health-portal.data.ttl`, generated into `HP_LINKS.roleEntitles`. The refusal names the roles and the capability: `403 { error: "your role on Alice Okoro's team (dietitian) is not for alerts.acknowledge — hp:roleEntitles", code: "not_entitled" }`. Not on the team at all: `404 no enrollment on this desk names that patient — or your grant does not reach it`.
2. **The Home's gate — "does the practice's grant admit it?"** The desk write itself goes to the Home under the member's own role wire (`deskWireFamilies(roleEntitles(role))`, issued by the seed). A write the wire does not admit is a vault problem said back verbatim. The Worker holds no key that could widen it.

The ontology gate exists so the refusal is legible *before* the Home's, and so the tool list offered
to the model (step 5) is the same list the gate will admit. The full table, from the ontology:

| Role | Entitled to (hp:roleEntitles) |
| --- | --- |
| cardiologist | patient.find, chart.read, alerts.read/acknowledge, messages.read/write, careteam.read/manage, enrollment.write, plan.write, transition.read/track, medications.reconcile, rehab.refer |
| advanced-practice-provider | as cardiologist + services.arrange |
| hospitalist | patient.find, chart.read, alerts.read, messages.read/write, careteam.read, transition.read/track, medications.reconcile |
| primary-care-physician | patient.find, chart.read, alerts.read/acknowledge, messages.read/write, careteam.read, plan.write, transition.read/track, medications.reconcile, rehab.refer, services.arrange |
| transitional-care-nurse | patient.find, chart.read, alerts.read/acknowledge, messages.read/write, careteam.read, transition.read/track, education.record, medications.reconcile |
| heart-failure-nurse, home-health-nurse | as above without medications.reconcile |
| nurse | patient.find, chart.read, alerts.read/acknowledge, messages.read/write, careteam.read, transition.read |
| medical-assistant | patient.find, chart.read, alerts.read, messages.read/write, careteam.read |
| pharmacist | patient.find, chart.read, alerts.read, messages.read/write, careteam.read, transition.read/track, medications.reconcile |
| dietitian | patient.find, chart.read, messages.read/write, careteam.read, transition.read, education.record |
| cardiac-rehab-clinician | patient.find, chart.read, messages.read/write, careteam.read, transition.read/track, education.record |
| physical-therapist | as above without transition.track |
| social-worker | patient.find, chart.read, messages.read/write, careteam.read, transition.read/track, services.arrange |
| palliative-care-clinician | patient.find, chart.read, alerts.read, messages.read/write, careteam.read, transition.read, plan.write |
| care-coordinator | patient.find, chart.read, alerts.read/acknowledge, messages.read/write, careteam.read/manage, transition.read/track, services.arrange |
| clinical-manager | as coordinator + enrollment.write, roster.manage |
| caregiver | careteam.read, messages.read/write, transition.read |

And the milestones with their owners (`hp:milestoneOwner`, `hp:milestoneDueHours`), which is what
"YOURS TO RECORD" in the brief and `mayRecordMilestone` in the gate read:

| Milestone | Due | Owners |
| --- | --- | --- |
| discharge-med-rec | 0 h | hospitalist, pharmacist, transitional-care-nurse, cardiologist |
| summary-to-pcp-24h | 24 h | hospitalist |
| contact-48h | 48 h | transitional-care-nurse, care-coordinator, clinical-manager, … |
| teach-back | 72 h | transitional-care-nurse, heart-failure-nurse, home-health-nurse, dietitian, … |
| red-flag-plan | 72 h | transitional-care-nurse, heart-failure-nurse, home-health-nurse |
| home-services | 72 h | social-worker, care-coordinator, clinical-manager, … |
| visit-7d | 168 h | cardiologist, advanced-practice-provider, primary-care-physician |
| rehab-referral | 168 h | cardiologist, advanced-practice-provider, primary-care-physician, cardiac-rehab-clinician |
| day-30-close | 720 h | cardiologist, primary-care-physician, care-coordinator |

The patient's side has its own judgement, also outside the model: the **symptom tier** is computed by
the Worker from the doctrine's table (`SYMPTOM_TIER`), the alert is **delivered, never decided** (a
`self-care` symptom raises nothing; anything higher goes to the desk), and at `call-emergency` the
Worker's own `say` ("Call 911 now. Do not wait for the coach.") is in the tool result before the model
composes anything.

---

## 5. Six Asks, walked in full

The messages, tool calls and replies below are from the 2026-09-29 Playwright walks against
coach.faithnet.io (a Playwright walk), lightly trimmed. Alice Okoro is enrolled at Atria Heart
under Dr. Dave Silva; Dr. Dave Silva, MD is Dave's professional persona (`dave-md.me`) holding the
`cardiologist` role on Alice's and Bob's teams.

### 5.1 Alice: "How is my week going?" — a question, no act

| Step | What happened |
| --- | --- |
| Screen | Patient face, Home tab, Ask sheet, HeartCoach door. `{ skill: heartcoach.ask, context: { message } }`, priority |
| 0–2 | Subject = Alice (0xb0d1…). No `patient` → patient's consultation, kind `question` |
| 4 | Archetypes: `heart-coach-patient-coach`, `heart-coach-companion` (registry, memoised) |
| 5 | Tools: `heartcoach__log`, `heartcoach__triage`, `heartcoach__message`, `coach_reply` (no EMR token in the session → no `emr.sync`) |
| 6 | Brief: profile (heart-failure; furosemide 40 mg …), last seven days (BP 126/79 avg over 4 readings, weight not logged today, steps …), still to do: weight; care team at Atria Heart: Dr. Dave Silva (cardiologist), Elena Voss (transitional-care nurse), Nathan (pharmacist), David (social worker), Carol (coordinator), Bob (caregiver); day 3 of 30; 1 open alert; latest from each member |
| 7 | Round 1: the model calls `coach_reply` directly |
| 10 | `say`: "Your blood pressure has been steady this week, averaging 126/79 across your readings — a healthy range. Weight hasn't been logged yet today, and that's the key number your heart failure plan watches each morning." `because`: the plan's fluid watch. `tier: self-care`, `theme: bp-trend`, `stillToDo: [weight]`, `builtFrom: [bp-2026092911…, …]` |
| 11 | `guidance-20260929…` filed with `waitUntil` |
| 12 | 200 in ~5–10 s (all of it the model). The sheet shows say + because; no banner, no acts |

### 5.2 Alice: "Log 2400 steps for today" — a question that is an act

| Step | What happened |
| --- | --- |
| 7, round 1 | The model calls `heartcoach__log { metric: "steps", value: "2400" }` |
| 8 | `recordFromLogArgs` → `{ kind: heartcoach.reading, metricKind: steps, steps: 2400, id: steps-20260929…, source: patient-entered }`; `log()` → `admitToolCall(reading_log)` (ProtectedMutation) → `validateLoggable` → `writeCabinet` under Alice's own token → the remembered readings folder is patched in place. Tool result: `done: logged 2400 steps → heartcoach/readings/steps-….json (record id steps-…)` |
| 9 | Readings re-read; the brief now shows steps for today |
| 7, round 2 | `coach_reply`: "2,400 steps logged for today. Weight is still the one thing left to log — that's the key number your heart failure plan watches each morning." `stillToDo: [weight]` |
| 12 | `acted: [{ tool: heartcoach.log, summary: "logged 2400 steps", storedIn: … }]`. The sheet shows ✓ logged 2400 steps and fires `coach:cabinet-changed`; the Home behind it re-reads and shows the new count (~0.8 s). ~6–12 s in all (two model calls) |

Had Alice said "log my water pill", the same tool would have been called with `metric: dose`,
`value: "water pill"`; `recordFromLogArgs` matches it against the **active orders in the chart**
(furosemide) and refuses with "no active order matches … today's orders are …" if it cannot — and the
model asks, because the contract says to ask when a number is missing, never to guess.

### 5.3 Alice: "Tell my nurse my ankle swelling is a bit better this morning" — an act that reaches the team

| Step | What happened |
| --- | --- |
| 6 | The care-team section lists Elena Voss — Transitional-care nurse [0x…elena] |
| 7, round 1 | Because the words carry a symptom, the model calls `heartcoach__triage { symptoms: "swollen-ankles", note: "a bit better this morning" }` first (the companion's rule: a symptom in the words goes to triage first), then `heartcoach__message { text: "My ankle swelling is a bit better this morning.", to: "0x…elena" }` |
| 8 (triage) | `symptomFromTriageArgs` → `swollen-ankles`; `log()` computes the tier **server-side**: `tell-care-team`; `symptom_report` admitted; the symptom is written to Alice's cabinet; `deliverAlert` → `alert_deliver` → `alertFromSymptom` → `writeDesk` onto Atria Heart's desk **under Alice's own patient wire**: `heartcoach.alert alert-…` (severity attention). Tool result: `done: recorded symptom report (swollen-ankles) at tier tell-care-team; alert DELIVERED to Atria Heart's desk …` |
| 8 (message) | `messageSend`: patient side; Alice is enrolled at exactly one practice; `to` is a current member (Elena) → `toName: Elena Voss`; `message_send` admitted; `heartcoach.thread-message msg-…-b0d11c` written to the desk with `from: alice, fromRole: patient, to: elena (0xa723…)`. Tool result: `done: sent to Elena Voss: "…" → …. It is read during clinic hours; say so.` |
| 7, round 2 | `coach_reply`: "Got it — I've flagged your ankle swelling to your care team, and Elena will see it. Keep your feet up when you can today, and weigh yourself again tomorrow morning so we have two mornings to compare." `tier: tell-care-team` |
| 12 | Two ✓ lines on the sheet and the amber note "Worth telling your care team today." `coach:cabinet-changed` fires. ~11–16 s (two model calls, two desk writes) |
| Elsewhere | Dr. Dave's Today now shows one more alert to acknowledge on Alice; Elena's Messages thread shows the direct message; both copies of the desk are brought current against the index on their next read |

### 5.4 Dr. Dave: "Where is Alice in her thirty days, and what is still mine to do?" — a care-team question

| Step | What happened |
| --- | --- |
| Screen | Care-team face, Alice's patient page, Ask sheet titled "Ask about Alice — as Cardiologist at Atria Heart". `{ skill: heartcoach.ask, context: { message, practice: 0xBFc9…, patient: 0xb0d1… } }` |
| 0–2 | Subject = Dr. Dave Silva, MD (0x921c…, the persona). `patient` ≠ subject → **care team's consultation** |
| 3 | `deskRead` as the persona: standing over Alice = roles `[cardiologist]`, capabilities = the cardiologist's fourteen; `entitled(chart.read)` ok |
| 4 | Archetypes: `heart-coach-cardiologist` (`hp:roleArchetype` of cardiologist) + `heart-coach-care-team-liaison` |
| 5 | Tools: `heartcoach__alert__ack` (alerts.acknowledge ✓), `heartcoach__transition` (visit-7d / rehab-referral / day-30-close list the cardiologist as owner and are not all done ✓), `heartcoach__message` (messages.write ✓), `coach_reply` |
| 6 | `deskBrief`: "Roles: Cardiologist. What your role is for: …", the four duties and two never-does from the ontology, the thirty days with each milestone's status and `YOURS TO RECORD` on the undone ones the cardiologist owns, the enrollment, the team, alerts with ids, the last ten messages. No cabinet numbers — and the brief says why |
| 7 | Round 1: `coach_reply` |
| 10 | `say`: "Alice is on day 3 of her thirty-day transition (heart-failure, discharged 2026-09-25 from St. Anne's). Everything on the milestone list is now recorded: med rec at discharge (Nathan, PharmD), contact-48h and teach-back (Elena) … Of yours: visit-7d and rehab-referral are recorded; day-30-close is still open, due 2026-10-25." `tier: self-care` |
| 11 | No insight (care team) |
| 12 | `about: { patient, patientName: Alice Okoro, roles: [cardiologist], capabilities: […] }`. ~6–14 s |

### 5.5 Dr. Dave: "Tell Alice her potassium was 4.1 and the plan stands" — a care-team act

| Step | What happened |
| --- | --- |
| 7, round 1 | `heartcoach__message { text: "Your potassium came back at 4.1 at yesterday's visit — that's in a good range. The plan stands: furosemide 40 mg daily continues, and we'll recheck labs in a week.", to: "0xb0d1…" }` |
| 8 | `messageSend`: care-team side; `openPractice` → `entitled(standing, alice, 'messages.write')` ok (cardiologist); `to` = the patient → `toName: Alice Okoro`; `message_send` admitted; `heartcoach.thread-message msg-…-921cc8` with `from: 0x921c…, fromName: Dr. Dave Silva, MD, fromRole: care-team, to: alice` written to the desk under the persona's role wire; the persona's copy of the desk is patched in place with the record and its commitment |
| 9 | `current.thread` gains the record; the brief is rebuilt without a desk read |
| 7, round 2 | `coach_reply`: "Sent to Alice's thread just now: 'Your potassium came back at 4.1 …' You can follow up when her next weight comes in." |
| 12 | ✓ sent to Alice Okoro: "Your potassium came back at 4.1 …". `coach:desk-changed` fires; the Messages segment behind the sheet shows it. ~10–14 s |
| Elsewhere | Alice signs in: her desk copy sees one changed artifact in the Home's index, hydrates it by name (~1.4 s), and her Messages list shows Dr. Dave's reply with "10:30" |

A variant seen in the same walk: "Acknowledge Alice's alert — I called and reviewed the plan" →
`heartcoach__alert__ack { alertId: "alert-…", note: "Called; reviewed the plan", resolve: true }` →
`alertAcknowledge` → `entitled(alerts.acknowledge)` → the alert's state becomes `resolved` with
`acknowledgedByName: Dr. Dave Silva, MD` → ✓ resolved alert alert-… — "Called; reviewed the plan".

### 5.6 A refusal: the primary-care physician tries to record the pharmacist's milestone

Dr. Priya Nair (`priya-carol.me`, role `primary-care-physician` on Alice's team) asks: "Record the
discharge medication reconciliation as done — I went through her list."

| Step | What happened |
| --- | --- |
| 3 | Standing over Alice: roles `[primary-care-physician]`; capabilities include `transition.track` → `chart.read` ok |
| 4 | Archetypes: `heart-coach-primary-care` + liaison |
| 5 | `heartcoach__transition` IS offered — the PCP owns `visit-7d`, `rehab-referral` and `day-30-close`, and at least one is undone. `discharge-med-rec` is not hers, and the brief lists it without `YOURS TO RECORD` |
| 7, round 1 | The model (told "only a milestone this member's role owns") may still call `heartcoach__transition { milestone: "discharge-med-rec", note: "Went through her list" }` |
| 8 | `transitionTrack(mark)`: `entitled(transition.track)` ok; then `mayRecordMilestone([primary-care-physician], discharge-med-rec)` → **false** → `403 { error: "recording “discharge-med-rec” is the duty of hospitalist, pharmacist, transitional-care-nurse, cardiologist — your role on Alice Okoro's team (primary-care-physician) does not own it", code: not_entitled, milestone, roles }`. Tool result `is_error: true` with that sentence |
| 7, round 2 | `coach_reply`: "I can't record discharge-med-rec for you — that milestone belongs to the pharmacist, the discharging hospitalist, the transitional-care nurse or the cardiologist. Nathan, PharmD recorded it on 2026-09-25 already. If you want your reconciliation on the record, message Nathan or record it against visit-7d, which is yours." |
| 12 | ✕ Could not: milestone not recorded — recording “discharge-med-rec” is the duty of … — your role … does not own it; nothing was written. This is the seed's own behaviour (`alice-week.faithnet.mts`: "PCP records no milestone"), not a bug |

The same shape covers every other refusal: a dietitian asked to "acknowledge the alert" is not offered
the tool at all (step 5) and, if the model names it anyway, is told "'heartcoach.alert.ack' is not a
tool this role is offered"; a caregiver asking "what was her weight this morning" is told, from the
brief, that the readings are in her own cabinet and not on the desk; a patient not enrolled anywhere
who says "tell my nurse" gets `heartcoach.message` refused with "you are not enrolled at a practice
yet" and the coach says so.

---

## 6. Timing — what an Ask costs and why

| Piece | Cost | Notes |
| --- | --- | --- |
| Gateway + subject verification | < 50 ms | JWKS cached |
| Archetype definitions | 0 (memoised 10 min) / ~300 ms cold | registry over the service binding |
| Patient brief: six cabinet folders | ~0 (memo) / 0.5–4 s each cold | memo lives an hour; a write folds into it |
| Patient brief: care team | ~0 (copy) / warmed behind the answer | never awaited on a cold desk |
| Care-team brief: `deskRead` | ~0 (copy fresh 45 s) / ~1.5–3 s (index verify) / ~20 s (first read of the day) | 24-heartcoach.md "Reads" |
| One model call | 3–6 s | 450 output tokens; the system block is prompt-cached |
| One desk write | 2–5 s | a Home library save |
| Filing the insight | 0 on the answer | `waitUntil` |

A plain question is one model call: 5–10 s. A question with an act is two model calls and one or two
writes: 6–16 s. What remains is the model and the Home's write latency; streaming the reply would
change how it feels, not the total.

---

## 7. Where each piece lives

| Concern | File |
| --- | --- |
| The sheet, the two doors, the suggestions per face/role, ✓/✕ rendering | `apps/coach-web/src/AskPanel.tsx` |
| The one call out of the browser; the queue and `priority` | `apps/coach-web/src/intents.ts` |
| Skill ids, tiers, archetypes, outcomes on the card | `apps/coach-a2a/src/agent-card.ts` |
| JSON-RPC admission, subject verification, dispatch, `x-coach-read` | `apps/coach-a2a/src/index.ts`, `packages/engage-home/src/auth.ts` |
| The harness: both consultations, the loop, the invokers, the contracts | `apps/coach-a2a/src/coach-turn.ts` |
| Registry fetch of archetype definitions | `apps/coach-a2a/src/archetypes.ts` |
| The my-agent door (ask-as-me) | `apps/coach-a2a/src/ask-me.ts` |
| Cabinet skills (log with server-side tier, EMR sync) | `apps/coach-a2a/src/skills.ts`, `cabinet.ts` |
| Desk: copies, standing, `entitled`, message/ack/transition/plan, alert delivery | `apps/coach-a2a/src/desk.ts` |
| Tier catalog and `admitToolCall` | `packages/coach-domain/src/tools.ts` |
| Arg → record translation, `cabinetBrief`, reply validation | `packages/coach-domain/src/ask.ts` |
| Roles, entitlements, archetypes, duties, milestones, `careTeamBrief`, `deskBrief`, `standingAt` | `packages/coach-domain/src/careteam.ts` (reads `HP_LINKS`, `HP_FACETS`, `HP_LABELS`) |
| The ontology the judgement reads | `skills/ontology/health-portal.data.ttl` (synced read-only; generated by `scripts/generate_ontology_constants.py`) |
| The playbooks (never authored here) | `skills/archetypes/heart-coach-*/SKILL.md`, `skills/skills/heart-coach/*/SKILL.md`, registered by `node scripts/register-heart-coach.mjs` |
| Tests that pin the flows above | `apps/coach-a2a/test/ask.test.ts`: the registry definitions as the playbook with `heartcoach.log` bound to the cabinet write and the insight filed; a refused act handed back to the model as an error with the reply still finishing; the nurse's archetype over a patient's desk, offered only what her role is for, recording the milestone she owns and acknowledging, filing no insight; a member with no role on the patient's team refused in words before any model call |
