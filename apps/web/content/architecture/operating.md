# Operating Agentic Primitives — the ladder

**Status:** 2026-10-11. The companion to [Substrate, estate, town, federation](/architecture/scales). That note
says what each scale IS; this one says what you DO at each, and where the instructions live. One guide per rung, kept
in the repository that owns the rung, indexed here and nowhere else twice.

Agentic Primitives is deployed at four scales. Each is a repository; each depends only on the one below it; each has
one operator's guide. A developer picks the rung that matches what they are doing and never has to read the others.

| Rung | You are… | Guide | Repository |
| --- | --- | --- | --- |
| **1 · Substrate** | building an application on the packages and contracts — a relying app of a Home, a service agent, a connector | [Getting started](https://github.com/agentictrustlabs/agentic-primitives/blob/main/docs/getting-started.md) · [Register at a Home](https://github.com/agentictrustlabs/agentic-primitives/blob/main/docs/register-your-app.md) · [`create-app`](https://github.com/agentictrustlabs/agentic-primitives/blob/main/docs/create-app.md) | [`agentic-primitives`](https://github.com/agentictrustlabs/agentic-primitives) — the public kit, exact-pinned; source and specs are in [`agenticprimitives`](https://github.com/agentictrustlabs/agenticprimitives) |
| **2 · Estate** | standing up a Home, an agent runtime, a vault, an edge and a Home MCP for a population of your own — people whose keys stay with you | [What an estate is made of](https://github.com/agentictrustlabs/agenticprimitives/blob/master/docs/operators/estate.md) (the primitives, the invariants, the lessons — read first) → [New estate runbook](https://github.com/agentictrustlabs/ap-home/blob/master/docs/runbooks/new-estate.md) (every command) | [`ap-home`](https://github.com/agentictrustlabs/ap-home) |
| **3 · Town** | publishing an estate into the services every estate on that chain shares — names, the public graph, the registry, chain access, key custody — or standing up a town on a new chain | [Publish an estate](https://github.com/agentictrustlabs/ap-town/blob/master/operations/runbooks/publish-an-estate.md) · [spec 429](https://github.com/agentictrustlabs/ap-town/blob/master/specs/429-ap-town-the-towns-repository.md) (a new town) | [`ap-town`](https://github.com/agentictrustlabs/ap-town) |
| **4 · Federation** | letting an agent from one chain prove its standing at an estate on another, without authority crossing | Designed, not yet runnable: [Chains and estates](/architecture/chains) + [spec 410 §4](https://github.com/agentictrustlabs/agenticprimitives/blob/master/specs/410-thesis-review-ten-additions.md) | `ap-federation` — next |

## How to read the ladder

- **A rung never asks the one below it for anything it should not hold.** An estate takes packages and contracts from
  the substrate, never a deployment. A town takes an estate's public facts (its Home, its edge, its name roots, its
  heartbeat), never a key, a vault, a delegation or a session — if a step in publishing an estate needs one of those
  from the town, the step is wrong. A federation takes evidence from a town, never a mandate.
- **Each rung is one repository and one deployer.** Two deployers must never both believe they own a live
  environment. The town's `DEPLOYER.md` and the estate's `DEPLOYER.md` each name, per Worker, who deploys it.
- **The guides are written from a real second instance, not the first.** Faithnet was the first estate; the lessons
  in [estate.md](https://github.com/agentictrustlabs/agenticprimitives/blob/master/docs/operators/estate.md) are what standing up the SECOND one (imbnet, 2026-10-11) exposed — the places where the
  first instance's values had quietly become defaults. A third estate should hit none of them.

## Where this is mirrored

- The source of this page: [`docs/operators/README.md`](https://github.com/agentictrustlabs/agenticprimitives/blob/master/docs/operators/README.md) in the substrate repository.
- The public kit's README points here from its table.
- `ap-home` and `ap-town` each link their own rung's guide from their README.

When a guide moves, change this index and the three mirrors in the same change; a stale pointer is worse than none.
