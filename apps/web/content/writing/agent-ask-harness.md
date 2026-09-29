# The Ask at a person's agent — from the words to the receipt, step by step

*2026-09-29. One conversational ask at `demo-a2a`, followed through the code in the order it runs: how the
caller is admitted, how the agent's playbook is loaded, how the request is grounded and judged, how a
skill is selected and a plan is made around it, how the plan is admitted, how every step is gated by
authority, executed, reconciled and receipted, and what comes back. Then nine real asks walked in full.
Companion to the HeartCoach note (the HeartCoach Ask walkthrough), which
describes the app-side harness that does NOT run here.*

Code (paths under `~/agenticprimitives`): `apps/demo-a2a/src/index.ts` (the doors), `harness-run.ts` (the
harness as this Worker binds it), `skill-apply.ts` (instruction skills), `standard-a2a.ts` (A2A 1.0),
`run-export.ts` / `run-records.ts` (provenance); `packages/orchestration/src/loop.ts` (the run loop),
`selection.ts`, `judgment.ts`, `intent.ts`, `outcome.ts` (judging and selection), `admission.ts`,
`conformance.ts` (plan admission), `authority.ts`, `input.ts` (the ports); `packages/harness/src/playbook.ts`,
`mandate-verifier.ts`, `policy.ts`; `packages/tool-policy/src/step-risk.ts`. Specs: 350 (the
authority-aware harness), 354 (archetypes and the compiled definition), 397 (ask-as-me), 410 §2 §5 (receipts
and version binding), 415 (instruction skills, the assessment program), 416 (skill selection by judgment),
418 (the domain's tests and per-step operations), 379 (outside agents as steps), 385 (confirmation memory).

---

## 1. What an ask is here

An **ask** is one sentence from a person to an agent. The agent is a Smart Agent address (the addressee);
the person is another (the asker); the two may be the same. The harness turns the sentence into a plan of
steps, runs each step under the authority the person actually holds, and answers. Three doctrines govern
everything below:

- **"Intelligence may be probabilistic. Authority must not be."** The planner proposes. The mandate authorizes. The executor acts. The receipt proves. (spec 350)
- **"The ontology proposes; a judge decides; a declared rule accepts; authority is checked separately."** Selecting a skill never permits anything; the chosen step still runs under every gate. (spec 416)
- **"An archetype changes what an agent KNOWS HOW to do, never what it MAY do."** The playbook is a digest-pinned document the custodian assigned; a moved digest is a bare harness. (spec 354)

There are four doors, and they all end in the same function:

| Door | Who | How it arrives |
| --- | --- | --- |
| The Home's Ask screen | a person, signed in at their Home | the Home proxies `POST /a2a/harness/ask` to the agent's `POST /harness/ask` with the person's Home session |
| A2A 1.0 `message/send` | a person's client, or another agent | `/api/a2a`; a person's message is re-posted in-process to `/harness/ask`; an agent caller runs `runAgentAsk` with the agent as the person |
| Ask-as-me (spec 397) | an app holding a wire the person signed (Home MCP, HeartCoach's "My agent" door) | `/harness/ask` with `Authorization: A2A-Session …`; no Home session at all |
| A routed subject-ask | another deployment whose run needs this agent to answer or act | `/harness/ask` with `subjectAsk` and, for one step, a supplied `plan` |

Every door reaches `runUnderMandate` → `runIntent` (the loop) → `askReplyFor` (the reply).

---

## 2. From the screen to the harness

The Home's Ask screen sends one JSON body per turn:

```json
{ "session": "<Home id_token>", "addressee": "0x…", "message": "Can you get david added to Missio Nexus?",
  "runRef": "…", "supplied": [ { "stepRef": "…", "signature": { … } } ], "surface": "home", "tz": "America/…" }
```

- **`addressee`** is who you are asking. **`asker`** is who the session says you are. They differ when a steward asks an organization's agent, or a member asks their team's. `ownAgent` (asker = addressee) is what unlocks the person's memory and preferences records for the run.
- **`runRef` + `supplied`** carry a suspended run forward: after the person signed a mandate, answered a prompt or confirmed a choice, the same ask resumes with what they did, and nothing else is re-sent. The agent holds the question, the plan and every earlier answer under the runRef (spec 350 W3).
- A screen may **supply the plan** for an informational read it draws itself ("who are my contacts" with `plan: { steps: [{ toolId: 'person.contact.list' }] }`) and gets `results[]` back beside the sentence, so the panel renders rows rather than parsing prose (spec 361).

What comes back is one of six reply kinds (section 3, step 12), always with a `runRef` and, when a plan was
made, a `plannerTrace` that says which stage decided what.

---

## 3. The harness, step by step

The order below is the order in `index.ts` (the route), `harness-run.ts` (binding) and `loop.ts` (the loop).

### Step 0 — Admit the caller

1. **Normalise the addressee.** `0x…` or a CAIP-10 `eip155:<chain>:0x…`; anything else is 400.
2. **Ask-as-me?** If the request carries `Authorization: A2A-Session …`, `verifyAppDelegation` checks the wire's signature by ERC-1271 against the universal validator, that the delegation is not revoked on the DelegationManager, and that the caller assertion is spent exactly once at the addressee's task object. The run then proceeds *as the person* with no Home session: reads under their standing, every act parking for the mandate only they can sign.
3. **Forwarded credential?** On a routed hop the bound body's addressee must be the asker's own agent or the room that routed the step, the audience must be this deployment's zones, and the assertion is spent on the receiver's object.
4. **Otherwise a Home session.** `verifyHomeSession` verifies the broker's JWT (issuer, audience, JWKS) and the subject is the asker's address.
5. **The door's own checks.** `HARNESS_AGENT_SA` configured; the agent's budget record (429 when spent); an evaluation `variant` only under `EVAL_CAPTURE=on` and a caller who may oversee the agent; the model provider resolved (a provider not offered on this estate is 400).
6. **Resume?** A `runRef` loads the run: must be claimable by this caller (403), not a workflow's (409), not expired (410); a completed routed operation is replayed, never re-run.

### Step 1 — Load the playbook

`loadPlaybook(addressee)` reads the agent's vault record `archetype.assignment`
(`ap.archetype-assignment.v1`), written by the custodian or a steward and pinning an exact
`(archetypeVersion, definitionDigest)`. The harness **recomputes the definition's digest** and compares; a
mismatch is the bare harness ("this agent has no playbook for that"). The validated `PlaybookScope` holds:
`archetypeId`, `archetypeVersion`, `digest`, `capabilityIds`, `instructions` (the planner doctrine is the text
above `## How each act is done`), `triggers`, `specialists`, `declaredEffects`, `tools` (the definition's
tool contracts by capability id), `retrievalQueries`, `domainLexicon` (every domain class with its label,
terms, clusters and typical `uses`) and `domainRecords` (record type ↔ class). The digest is stamped on the
intent as `versions.semanticsDigest`, beside the ontology manifest digest, so the mandate verifier later
refuses a step whose T-box or definition has moved (spec 410 §5). Cached one minute.

### Step 2 — Offer the tools

The tool list for this run is built from the playbook, never fixed:

| Tools | Offered when |
| --- | --- |
| Action tools (`HARNESS_ACTION_TOOLS`: payments, messaging, funding, invites, membership, coordination, the forge…) | narrowed to `playbook.capabilityIds` |
| Read tools | only where `playbook.tools[id]` has a contract; merged through `mergeContractTool` |
| Instruction skills (spec 415) | the definition's tools with `execution: instruction` and a `source`, turned into informational tools `{ question, material } → answer`, `establishes: lookup`; only when `SKILLS_MCP` is bound |
| `external.agent.ask` (spec 379) | always; no capability; its result is an observation that names who said it |
| `ask.clarify`, `ask.unsupported` | always |

A duplicate id throws. The playbook's contract utterances become the planner's few-shot examples.

### Step 3 — Ground the request

Before any model call on the request:

1. **Open intent.** `classifyOpenIntent(goal, OUTCOME_CLASSES)` is a deterministic word match on the ontology's outcome classes: exactly one hit types the intent (`{ class, bounds }`) into `intent.constraints.outcome` so the mandate digest covers it; zero or two hits leave it closed.
2. **A held mandate** already presented adds "ALREADY granted authority to … do not choose another" to the planner's prompt.
3. **Compiled shapes** — regexes, no model — are tried in order: a skill answer, a consult, a read (balance, members, affiliations, records, receipts), a fan-out, a payment, a routine (own agent only). A hit is the plan (`plannerUsed: compiled`) and steps 4–5 are skipped.
4. **The typed reading** for the judge (`inferIntent` → `renderReading`): the domain terms the sentence names, their cluster neighbours, the asker's relation (self / steward / member / stranger), and under `SKILL_SELECTION_ASKER_CONTEXT=full` their recent skills over 30 days and memory tags, plus the role the tags ground to and the classes they already hold. "Evidence, never a filter: nothing here removes a skill."

### Step 4 — Judge which skill (the selection stage)

Runs only when no compiled shape matched, the playbook has instruction skills, and the estate turns it on
(`SKILL_SELECTION_DEFAULT`: faithnet `selective`; production unset, so the planner model decides there).

- **One call, one question**, to the light-tier model (Gemini `flash-lite` on faithnet), profile `ap.skill-selection-judge.fast.v2`: *"Which ONE offered skill should handle this request?"* over the skills' **cards** (one line of purpose, *Produces:* …, *Not for:* …, from the ontology's `covers` and `excludes`) plus **n/a** = *"No offered skill fits: the request is out of scope, merely adjacent to a skill, or too small or personal for any of them."* The state is the typed reading; the cards are a cacheable prefix. The answer is a probability distribution over the options, nothing else.
- **The acceptance rule** is code over the numbers: n/a on top → `none-fits`; top confidence < 0.5 → `below-floor`; lead over the runner-up < 0.15 → `no-margin`; otherwise the top skill is chosen. Under `SKILL_SELECTION_SPLIT=clarify` a split between two skills whose mass together ≥ 0.7 becomes "ask the person"; `SKILL_SELECTION_BORDERLINE=on` re-asks once inside [0.35, 0.6] and averages.
- **Outcomes:** a skill → step 5 plans around it; `needs-clarification` with two rejected skills plans `ask.clarify` with exactly those options; `none-fits` / a hold hands the request to the planner **with the skills removed** from its tool list (`trace.skillStage = handed-to-planner`), so a plain act or read is planned and a request nothing fits ends as `ask.unsupported`.
- **Selection never permits anything.** The receipt records the arm, the candidates, the distribution and the choice; the step still meets every gate below.

The thorough profile (`v5`), the ontology arms, the conformal acceptance and the measurements are in
section 4.

### Step 5 — Plan around the pick

- **A skill was chosen.** Under `selective` with `SKILL_SELECTION_PLAN=choice` (faithnet), `choosePlanAround` enumerates three plans from the outcome graph — the pick alone, a producer → the pick, the pick → a consumer — and one more judge call (`ap.plan-choice-judge.v1`) picks: *"a two-step plan only if the request wants BOTH results (or needs the first to make the second)."* The graph is the ontology's `produces` / `consumes` between skills; a class the request supplies or the asker already **holds** needs nothing; one another skill produces prepends that skill; anything else is **missing and named** ("ask for it rather than invent it"). Bounds: depth 3, four steps. Without `consumes` declared anywhere the plan is the single step `{ toolId: <skill>, args: { question: <the ask> } }`.
- **No skill was chosen.** The **planner model** (`gemini-3.5-flash-lite` on faithnet, 1024 tokens) plans over the remaining tools with a system prompt of the playbook's doctrine, the fixed planner rules (fan-out, `$when`, `$executor`), the conversation, the memory and the contract utterances as examples. With no provider configured, a rule-based planner runs instead.
- **A plan** is `{ steps: [{ toolId, args, id?, ref?, forEach?, when?, executor? }], rationale? }`; args may bind to earlier steps (`$ref`), fan out (`$forEach`, `$item`) or branch (`$when`). Specialists from the playbook are stamped as executors. With `PLAN_REGRESSION_DEFAULT=on` (faithnet) the plan is completed backwards from the goal through the capability transitions.

### Step 6 — Admit the plan

`planAdmission` runs **every** rule and reports all violations at once. Deterministic, over declarations
only: "never a second model, never a regex over English that guesses intent." In the order the harness
lists them:

| Rule | Code | Recovery |
| --- | --- | --- |
| an act aimed at an outside executor | `EXTERNAL_EXECUTOR_ACT` | refuse ("an outside agent may answer a question, never perform an act") |
| the typed outcome's entailment, bounds, disclosure | `OUTCOME_NOT_ENTAILED` / `_BOUND_EXCEEDED` / `_DISCLOSURE` | refuse |
| an imperative act verb answered only by lookups | `OUTCOME_NOT_ESTABLISHED` | continue (append `plan.continue`) or replan |
| placeholders (`<…>`, tbd, n/a, null) | `UNSUPPORTED_BINDING_SOURCE` | ask |
| `$ref` to nothing earlier | `DEPENDENCY_NOT_SATISFIED` | replan |
| `$when` on nothing decidable | `BRANCH_UNDECIDABLE` | replan |
| the sentence names a fact a read `answers` and the plan skips that read | `QUESTION_NOT_ANSWERED` | replan ("use `<tool>` for that, not a survey of other records") |
| a number on an act the person never said | `UNSUPPORTED_BINDING_SOURCE` | ask |
| an acting party not named in the words | `UNSUPPORTED_BINDING_SOURCE` | ask |
| payer = payee | `UNSUPPORTED_BINDING_SOURCE` | ask |
| regression's transitions | `REQUIRED_ROLE_UNRESOLVED` / `OUTCOME_NOT_ESTABLISHED` | refuse |
| a kind named that is not chartered | `OUTCOME_NOT_ESTABLISHED` | replan |
| the ask names a known agent but the step's subject is empty | `REQUIRED_ROLE_UNRESOLVED` | resolve |

`admitPlan` then: all *continue* → append and re-admit; all *ask* → drop those args so they become prompts;
any *refuse* → terminal `denied`; anything else → **one** re-plan told the violations, and a second failure
is `denied` (`plan_refused: …`). A plan that acts is exempt from the question rule: "a plan that ACTS is not
answering a question."

### Step 7 — Resolve each step's arguments

Names become addresses in the asker's tier (`resolveStepArgs`); a name that resolves to nothing, or to
several, throws `InputRequired` and the run suspends with a **data prompt** (or a choice prompt among the
candidates). A choice the person confirmed before is remembered as evidence scoped to (word, capability,
argument) and cited — "remembered: you chose X for this before" — but it authorizes nothing (spec 385).
Supplied answers from a resume are merged here.

### Step 8 — Authority, per step, never per run

For every non-informational step:

1. **Routed?** When the subject agent judges the step, this run records `presentedRef: routed` and relays.
2. **Self-authorized?** A tool the session itself authorizes records `presentedRef: self`.
3. **Otherwise `authorize()`:** pick a mandate from the keyring (by payee for a payment); with none, under `onMissingMandate: report`, the outcome is **`authority-required`** with the exact requirement (`stepRef, toolId, capability, args, derivation`); with one, the **mandate verifier** checks signature, revocation, the intent binding (plan digest, versions) and answers `allow`, `approval-required` or `deny`; obligations are the verifier's plus the **risk ladder** (`high` → second-party approval; `critical` → second-party approval + quorum + fresh authorization) — the capability and risk come from the tool's declaration, never from the plan; the **approval port** returns a signature prompt over the approval digest, `refused`, or `discharged` after ERC-1271; after a discharge **the verifier runs again**: "an approval is an input to the verifier, not a bypass of it."
4. **The reply.** `askReplyFor` turns `authority-required` into the `authority_required` kind: the requirement bound to the plan, the delegator (the capability's authority, else the resource, else the addressee), the delegate (this agent's `HARNESS_AGENT_SA`), the asker's standing to the delegator with `canGrant`, the parties the words became ("send nathan a message" is authorized against an *address*), and `alsoApprove` when one signature covers more (an invite's grant and credential digests). The run **checkpoints** with `awaiting: authority`; on A2A the task parks as `TASK_STATE_AUTH_REQUIRED`.
5. **Grant and resume.** The person signs at their Home (`/you?run=<runRef>`; Home MCP's `grant_link` returns that URL), then the same ask resumes with `presented`; the stored plan must match and everything is re-verified from scratch.

### Step 9 — Reconcile, then execute

1. **Reconcile before acting.** The reconcile port asks whether this exact effect already happened (`found`: the earlier receipt is reused and no second act runs; `absent`: proceed; `indeterminate`: stop). A resumed run never pays twice.
2. **Invoke.** A hand-off to another executor derives a child mandate from the parent; discovery, engagement and routed subjects go to the subject agent and relay its progress; everything else is local: `playbook.answer` (a templated answer), `skillApply` for an instruction skill, `harnessInvoker` for the action tools, MCP for connectors.
3. **An instruction skill at answer time** (`skillApplyInvoker`): the SKILL.md body is read from `SKILLS_MCP` **by the pinned digest** and refused if the commitment moved; the model runs once under the apply system prompt + the body with the question and the material (1400 tokens; 600 when `brief`); `SKILL_ANSWER_MODEL_DEFAULT=minimal` and streaming on faithnet.
4. **An outside agent** answers over A2A with a 20-second timeout; its card digest is pinned; its words come back as an observation the composer must attribute.
5. **Receipt, then declared effects** through the effect sink, isolated so a failing side effect cannot fail the act. Consecutive independent reads run in parallel.

### Step 10 — Answer

- `ask.unsupported` → a fixed "I can't help with …" sentence.
- Every step declares an `answer` template (instruction skills) → the answer is rendered, **no composer call**.
- Otherwise → the grounded composer, checked by `checkGroundedComposition`, one recompose, then a grounded fallback. An outside agent's words are attributed ("clock.external says…"); a read that wrote a query returns it as `evidence` ("I searched names for the word 'organizations' and matched none").

### Step 11 — Receipts and provenance

Every step receipt carries `skillRef { skillId: archetypeId, version, commitment: playbook.digest }`, the
step's own `skill { id, version, contractDigest }`, the `binding` (intent digest, principal, subject,
resource, authority, expected outcome, operation id, arg sources, standing, actor), `inputDigest`,
`planArgsDigest`, `derivation`, the `observation` (`attempted | accepted | committed | confirmed`; only an
independent read-back may be called *confirmed*) and `attests`. The receipt sink writes
`harness.step.<status>` audit events; large results are offloaded to `run.artifact:` records; the run record
(door, model calls, variant, operational stages, bill) is kept about a week on the agent's task object;
`exportRun` writes `run.provenance:<runRef>`, an anchor and measures into the agent's vault and answers a
PROV-AQ `Link` header. The playbook manifest rides on the A2A artifact.

### Step 12 — The reply

```json
{ "ok": true, "addressee": "0x…", "runRef": "…", "hasProvenance": true, "resumable": false,
  "reply": { "kind": "answer" | "authority_required" | "prompt" | "waiting" | "done" | "refused", …, "spoken": "…", "plannerTrace": { … } } }
```

`answer { text, results?, interaction?, next?, evidence? }` · `authority_required { requirement, delegator,
delegate, capability, stepRef, summary, standing?, parties?, alsoApprove? }` · `prompt { resumeToken, prompt }`
(data, signature, confirmation, commitment, authority) · `waiting { on, commitment, text }` (another agent's
steward) · `done { result, receipts, fulfillment, effects, decisions }` · `refused { outcome, error, receipts }`.
`plannerTrace` names the planner used (`compiled`, `judgment`, a provider, `rule-based`, `supplied`,
`replay`), the selection arm and its distribution, every admission verdict, the structured calls and tokens.

---

## 4. Judging in detail

### The arms, as the orchestration package ships them

| Arm | What decides | Fails how |
| --- | --- | --- |
| **declared** (`selectByDeclaredUtterances`) | stemmed word overlap with each skill's `says` / `isNot` utterances; net = best positive − best negative; choose only above 0.3 with a 0.08 margin, else **hold** | a hold is "a selection of nothing, never a guess" |
| **ontology** (`selectByOntology`, the exact arm) | a class is grounded when every content word of one of its terms is in the ask; a skill survives when it covers a grounded class; coverage → exclusion → cluster neighbourhood only when nothing is covered; exactly one survivor routes | closed: several survivors → `ambiguous`; a skill declaring no classes binds nothing; no confidence exists |
| **judgment v5** (`ap.skill-selection-judge.v5`, thorough) | three typed questions: the choice over descriptions + *clarify* + *several* + n/a; a pointwise yes-no **FIT** per candidate ("asks for what this skill produces (…), and not for (…)"); the domain class it *requests*; options shuffled under neutral ids across K = 2 permutations and averaged; the model may reason privately in a `scratch` field that is discarded unread | calibration: "confident and wrong" |
| **fast** (`fast.v2` / `v3`) | one call, the choice over cards + n/a over the typed reading; the default stage | as above, cheaper |
| **logprob** | the fast question answered by one token's log-probabilities (letters A, B, …) | Gemini's endpoint refuses `logprobs` |
| **ontology-first** | the exact arm when it is decisive, else the fast judge over the whole catalog | |
| **propose+judgment** (416 W1) | the ontology for recall and veto, the judge picks in catalog order | the veto removed the right skill; retired as a gate |
| **outcome** (`ap.outcome-judge.v1`) | "a person does not want a skill; they want an OUTCOME": the judge picks the terminal skill; a rule builds the path back through `consumes` | |

Acceptance is always a declared rule over numbers: **floor 0.5 / margin 0.15 / fit ≥ 0.5**, or, when a
calibration map is cited (416 W3), **temperature scaling then a conformal set**: every outcome whose
calibrated probability ≥ 1 − q̂; one skill in the set routes; several → ask the person among exactly those;
`none` alone → decline; empty → decline. The map is fitted on labelled runs of *this* binding and cited by
digest on every decision.

### What the measurements said (spec 416, faithnet, 12 CIL skills)

| Finding | Numbers |
| --- | --- |
| The ontology as a hard filter misses real requests; as a veto it is precise | ontology alone macro 0.38 / 0.71; judge over all candidates with an explicit *none* 34/34, 23–24/24 |
| Judge v5 with fit, shuffling and averaging | Gemini 24/24 and 32/32, ECE 0.006; Haiku 24/24, 31–32/32, ECE 0.041 (gate ≤ 0.1) |
| Conformal acceptance, live | Gemini 34/34 at coverage 1.000, all singletons; Haiku decided 31/34 and asked on 3, the right skill in every set |
| Where the judge still fails | "ask the person" on ambiguous asks: 0/8 on both bindings (it guessed); proposed fix: derive "ask" from a set of size > 1 or from two bindings disagreeing |
| Speed | fast judge ~1.1–1.3 s and ~3k tokens in vs thorough 11.5 s and 18k; the composer was the floor (15.6 s of 18.6) until instruction skills' templated answers removed it |
| Asker context (fresh 6) | with recent skills and memory tags **18/19**; standing alone **7/19**; McNemar p = 0.001; a misleading history did not override a clear request |
| Adopted by paired test (spec 418 §11) | selective outcome reading (+12/−2, p = 0.013); cached asker records, ask p50 4.62 → 1.71 s |

### What faithnet runs today

`SKILL_SELECTION_DEFAULT=selective`, `SKILL_SELECTION_ASKER_CONTEXT=full`, `SKILL_SELECTION_PLAN=choice`,
`PLAN_REGRESSION_DEFAULT=on`, `ORCHESTRATION_LLM=gemini,anthropic` (Gemini first: `flash` composes and
answers, `flash-lite` plans and judges; Anthropic `claude-haiku-4-5` only when named), `ORCHESTRATION_ROUTE=budget`,
`ANSWER_STREAM_DEFAULT=on`, `SKILL_ANSWER_MODEL_DEFAULT=minimal`. Production sets none of the selection
variables: there the planner model decides. Evaluation cases are ontology individuals
(`apeval:expectedSkill`, `forbiddenSkill`, `expectedBehaviour` route / decline / clarify / several,
`underStartingState`), held-out sets are write-once, and a disputed gold label is adjudicated by a person
against the skill's contract, never edited because a judge disagreed.

---

## 5. Nine asks, walked in full

The asks are the evaluation program's own cases (`skills/evaluations/agentic-trust/home-acts-1.src.json`,
`cil-commons/fresh-heldout-5.src.json`, `fresh-heldout-6.src.json`,
`agenticprimitives/scripts/ask-scenarios.heldout.json`) and the live example in spec 385. Alice asks her own
agent at faithnet unless said otherwise.

### 5.1 "Who's in Missio Nexus right now?" — a read, no model

| Step | What happened |
| --- | --- |
| 0 | Home session verified; asker = addressee = Alice → own agent; memory and preferences records readable |
| 1–2 | Alice's playbook loaded by digest; read tools include `organization.membership.list` |
| 3 | The **compiled read** shape for an organization's members matches; `plannerUsed: compiled`; no judge, no planner (a phrasing the regex misses goes to the planner, which picks the same read) |
| 6 | Admission: `questionAnsweredByRead` is satisfied, the plan uses the read that `answers` "members" |
| 7 | "Missio Nexus" resolves to `missio-nexus.org` in Alice's tier |
| 8 | Informational: no authority gate |
| 9–10 | The read runs; the grounded composer writes the sentence; `evidence` carries the query it ran |
| 12 | `answer`. Expected: the list; **forbidden** `organization.membership.invite` (a reader is not an inviter) |

### 5.2 "Can you get david added to Missio Nexus?" — an act, and the mandate only she can sign

| Step | What happened |
| --- | --- |
| 3 | No compiled shape; the typed reading names *membership*, relation self |
| 4 | No instruction skill fits (skills are handed off); the planner sees the action tools |
| 5 | Plan: `organization.membership.invite { org: missio-nexus.org, invitee: david }` |
| 6 | `actingPartyFromTheWords`: the acting org is named in the words ✓; `instructionNeedsAct`: the act verb "added" is answered by an act ✓ |
| 7 | "david" → `david.me`; "Missio Nexus" → the org's address |
| 8 | No mandate in the keyring → **`authority_required`**: delegator `missio-nexus.org`, delegate Alice's agent, capability `organization.membership.invite`, `alsoApprove` the invite grant and credential digests, `standing: steward, canGrant: true`, `parties: [{ arg: invitee, raw: "david", agent: 0x… }]`; run checkpointed |
| Home | Alice opens `/you?run=<runRef>`, signs one userOp covering the mandate and the two digests |
| 8, resume | Same ask with `presented`; verifier `allow`; risk ladder adds nothing further |
| 9 | Reconcile `absent`; the invite is written; receipt `attests: committed` |
| 12 | `done` with receipts and effects. Expected: `authority_required` first, then the invite |

### 5.3 "Add dave to my contacts." — the adjacent act, kept apart

Same shape as 5.2 up to the plan. The typed reading names *contact*, not *membership*; the planner picks
`person.contact.invite`, and the case's **forbidden** skill is `organization.membership.invite`. "Add" is
the ambiguity spec 416 §2 names ("add Jane" may be invite or enroll); here the object word settles it
before any judge, and the mandate she is asked to sign names the contact grant, not an organization.

### 5.4 "Send 2 USDC to nathan.treasury toward the retreat deposit." — a payment with a marked default payer

| Step | What happened |
| --- | --- |
| 3 | The **compiled payment** shape matches: amount 2, asset USDC, payee `nathan.treasury`, memo |
| 6 | `numbersFromTheWords`: 2 is in `numbersSaid` ✓; `partiesDistinct` ✓; the payer was not said, so it is the **marked default** treasury `alice2.treasury`, and the reply's `parties` say it was decided by a rule rather than asked (spec 363: `because`, `ruleId`) — the act laboratory's earlier failure was exactly a named payer being dropped |
| 8 | `selectByPayee` finds no mandate for this payee → `authority_required` on `treasury.payment.execute`, delegator `alice2.treasury` |
| 8, resume | The verifier allows; the PaymentEnforcer's nonce is checked at reconcile so a retry cannot pay twice |
| 12 | Expected: `authority_required`, payer `alice2.treasury`, payee `nathan.treasury` |

### 5.5 "Pay nathan.treasury back for the hymnals." — a number nobody said

The payment shape matches without an amount. Admission's `numbersFromTheWords` refuses a planned amount
the person never said; the recovery is **ask**: the arg is dropped and the run suspends with a `prompt` of
kind `data` for `usdc | amount`. Expected: `prompt`. Nothing is planned, nothing signed.

### 5.6 "Is our intake screening model okay to keep using?" — two skills could, so ask

At a CIL-commons organization's agent, whose playbook carries twelve instruction skills.

| Step | What happened |
| --- | --- |
| 4 | Fast judge: `bias-fairness-reviewer` and `ai-governance-assessor` split the mass; under floor/margin this is `no-margin`; with `SKILL_SELECTION_SPLIT=clarify` (mass together ≥ 0.7) it becomes `needs-clarification` |
| 5 | `ask.clarify { options: [the two], purposes, what }` is planned; `trace.skillStage: clarify` |
| 12 | a `prompt` offering exactly those two; the person's pick resumes the run and is remembered as scoped evidence |
| Measured | this is the behaviour the program still fails on: fresh-5 asked 0/8 times when it should have; the judge's highest probability on *ask* was 0.25 |

### 5.7 "Write the Marlow Foundation inquiry letter, and once it is done put it on our funding tracker." — several

| Step | What happened |
| --- | --- |
| 4 | The thorough judge's `several` outcome is made for this ("it is a plan, not one skill"); the fast stage picks the terminal skill and leaves the chain to step 5 |
| 5 | `choosePlanAround` over the outcome graph: `grant-loi-proposal-drafter` **produces** the letter class the `grant-pipeline-lifecycle-tracker` **consumes** → the two-step plan "pick → consumer" is chosen; steps `s1 { question }`, `s2 { question, material: $ref o1.answer }` |
| 9 | Both bodies read from `SKILLS_MCP` by digest; two model calls; the second gets the first's answer as material |
| 10 | Templated answers, no composer |
| 12 | `answer` with both results; expected outcome *several* handled on: 7/8 on both bindings |

### 5.8 "Should we order pizza or sandwiches for Saturday's volunteer training?" — nothing fits

The fast judge answers **n/a** ("too small or personal for any of them") → `none-fits`. The planner is
handed the request with the skills removed and finds no read or act for it → `ask.unsupported` → the fixed
"I can't help with …" sentence. Expected: decline. Gold `null`; the control the asker-context runs kept.

### 5.9 "invite carol to thompson" after "invite bob to thompson" — a remembered choice, still gated

The first ask asked *which thompson* (two candidates in Alice's tier) and Alice chose. The second resolves
"thompson" from **scoped confirmation memory** (word, capability, argument) and cites it — "remembered: you
chose X for this before" — then still reaches `authority_required`, because a remembered choice "authorizes
nothing." (spec 385, live example)

### An ask-as-me variant

HeartCoach's "My agent" door sends Alice's question with `Authorization: A2A-Session <wire>`: step 0 verifies
the ask-as-me wire (pinned to `harness.ask`, time-bounded, revocable) and spends the assertion once; there is
no Home session; the run proceeds as Alice under her standing and playbook; any act parks at
`authority_required` with a Home link she must open herself. The host that asked is never a signer.

---

## 6. Timing

| Piece | Cost (faithnet, measured in spec 416 §4e/§4g and 418 §11) |
| --- | --- |
| Admission + playbook | no model call; the playbook is cached one minute |
| Compiled shape | 0 model calls |
| Fast judge | ~1.1–1.3 s, ~1.5–3k tokens in |
| Plan-around judge | one more light call |
| Planner model | ~1 s, 1024 tokens out max |
| An instruction skill's answer | one `flash` call, streamed; 1400 tokens (600 brief) |
| Composer, when needed | was 15.6 s of an 18.6 s run; removed for templated answers |
| Pre-run / post-run overhead | 5.8 → 1.4 s / 4.6 → 2.0 s after the iteration work; asker records cached 4.62 → 1.71 s p50 |
| A whole ask, p50 | ~13–16 s with the stage on; a declined ask ~4.9 s |

---

## 7. Where each piece lives

| Concern | File |
| --- | --- |
| The doors: `/harness/ask`, A2A `message/send`, ask-as-me, routed subject-ask, budget, variant, resume | `apps/demo-a2a/src/index.ts`, `standard-a2a.ts`, `custody-oidc.ts` |
| The harness binding: tools offered, compiled shapes, the selection stage, planner prompt, invokers, reply | `apps/demo-a2a/src/harness-run.ts` |
| Instruction skills (read by digest, applied once) | `apps/demo-a2a/src/skill-apply.ts` |
| Playbook load and digest check | `packages/harness/src/playbook.ts` |
| The run loop: admission, arg resolution, authority per step, reconcile, execute, receipts | `packages/orchestration/src/loop.ts` |
| Selection arms, judge profiles, acceptance (floor/margin, conformal) | `packages/orchestration/src/selection.ts`, `judgment.ts` |
| The typed reading and asker context | `packages/orchestration/src/intent.ts` |
| Outcome graph, plan-around, chains | `packages/orchestration/src/outcome.ts` |
| Plan admission rules and codes | `packages/orchestration/src/admission.ts`, `conformance.ts`, `regression.ts` |
| Authority ports, prompts, bindings | `packages/orchestration/src/authority.ts`, `input.ts` |
| Mandate verification, risk ladder | `packages/harness/src/mandate-verifier.ts`, `policy.ts`, `packages/tool-policy/src/step-risk.ts` |
| Provenance export, run records | `apps/demo-a2a/src/run-export.ts`, `run-records.ts` |
| The Home's Ask screen and its reply types | `apps/demo-sso-next/src/home/ask.ts` |
| Home MCP (`ask`, `grant_link`, `resume`) | `apps/home-mcp/src/tools.ts` |
| Estate configuration | `apps/demo-a2a/wrangler.toml` (`[env.faithnet.vars]`) |
| Cases and scorecards | `skills/evaluations/**`, `skills/evaluations/results/scorecards/` |

---

## 8. And HeartCoach

`coach-a2a` runs none of this. It fixes the archetypes by face and role, offers the model every bound tool
with `tool_choice: any`, gates each act with its own `admitToolCall` and `entitled`, and reads under the
patient's session rather than a mandate to the coach service. There is no judge, no plan admission, no
mandate verifier, no receipt at the person's Home. The "My agent" door is the only place a HeartCoach ask
enters the harness described here, and it enters as an ask-as-me. What it would take to run the coach
consultation through this harness is in the HeartCoach note's discussion of the two-party shape.
