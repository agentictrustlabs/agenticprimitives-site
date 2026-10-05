// The four scales of deployment: substrate → estate → town → federation. Each is a repository, each depends only on
// the ones below it, and each answers one question the one below cannot. "Scale", not "layer": the substrate page
// already uses "layers" for application / harness / authority / identity inside one deployment.

export type ScaleStatus = 'live' | 'public' | 'building' | 'next';

export interface Scale {
  id: 'substrate' | 'estate' | 'town' | 'federation';
  name: string;
  /** One line: what it is. */
  is: string;
  /** The question this scale answers that the one below cannot. */
  answers: string;
  /** What it holds. */
  holds: readonly string[];
  /** Chain scope. */
  chain: string;
  repo: { name: string; url: string; status: ScaleStatus; note: string };
  /** The rule that keeps this scale honest. */
  rule: string;
}

export const SCALES: readonly Scale[] = [
  {
    id: 'substrate',
    name: 'Substrate',
    is: 'The published packages and contracts: everything an agentic application needs, as primitives with one identity, one authority mechanism and one evidence trail.',
    answers: 'What is an agent, what may it do, and how is that proven?',
    holds: ['77 @agenticprimitives/* packages', '33 contracts (AgentAccount, CustodyPolicy, DelegationManager, enforcers, naming, registry kit, anchors)', 'the ontology, bound by IRI', 'the Developer Kit: create-app, doctor, conform'],
    chain: 'Any EVM. The contracts are deployed per chain; nothing in a package names one.',
    repo: { name: 'agentictrustlabs/agentic-primitives', url: 'https://github.com/agentictrustlabs/agentic-primitives', status: 'live', note: 'Ring 0. Packages on npm, exact-pinned by consumers.' },
    rule: 'Generic. No vertical, no brand, no hostname, no deployment. Products import it; it imports nothing of theirs.',
  },
  {
    id: 'estate',
    name: 'Estate',
    is: 'One deployment of the substrate for one set of people and organizations: the Home where they sign, their agents, their vault, the edge in front of it, the Home MCP that lets a client reach the person, and the chain they enforce on.',
    answers: 'Where does a person sign, where do her agents run, and where is the record?',
    holds: ['Home (apps/home)', 'agent runtime: harness, A2A, interactions, triggers', 'vault: the record, as private MCP', 'edge: admission, always', 'Home MCP (spec 397)', 'RPC gateway to the estate chain'],
    chain: 'One chain. An estate enforces on exactly one; its grants, names and anchors live there.',
    repo: { name: 'agentictrustlabs/ap-home', url: 'https://github.com/agentictrustlabs/ap-home', status: 'public', note: 'The Home product. Deploys Faithnet on faithchain. Public since 2026-10.' },
    rule: 'The vault is the record; DO storage is the serving plane. Only a person signs, and only at her Home.',
  },
  {
    id: 'town',
    name: 'Town',
    is: 'Several estates on one chain and the services they share: agent naming, the public graph and discovery, registries, the KMS tenants, and the operations of the chain itself.',
    answers: 'How do estates on one chain find each other, name each other and read the same facts?',
    holds: ['agent naming: typed registries, forced-unique names', 'public graph: indexer → GraphDB → discovery (A2A, MCP, ARD, ACP)', 'registries: registry-kit instances, the skills registry', 'KMS: a tenant per estate, keys as delegates', 'chain operations: RPC, governance, paymaster'],
    chain: 'One chain, by definition. A town is the chain\u2019s estates plus the services built on that chain\u2019s state.',
    repo: { name: 'agentictrustlabs/ap-town', url: 'https://github.com/agentictrustlabs/ap-town', status: 'building', note: 'Being cut now: discovery, naming, registries and the indexer, today in Ring 0 and Faithnet, into one repository.' },
    rule: 'Nothing in a town grants. A resolver returns an address, a registry lists, a graph holds only what the chain can prove.',
  },
  {
    id: 'federation',
    name: 'Federation',
    is: 'Towns on different chains, private and public, and the public ground that lets an estate in one prove its standing to an edge in another: roots, presentations, bindings between a principal\u2019s accounts.',
    answers: 'How does an agent from one chain act in an estate on another without authority ever crossing?',
    holds: ['public ground: EstateProjectionRegistry on a public chain', 'per-estate roots: live grants, membership, resolver state, charter', 'one principal across chains: home and satellite accounts, the card\u2019s account list', 'the ERC-8004 and ENS projections, as adapters', 'the consortium that governs the estate chain'],
    chain: 'Many chains. Authority stays on each; evidence and value cross; a grant never does.',
    repo: { name: 'agentictrustlabs/ap-federation', url: 'https://github.com/agentictrustlabs/ap-federation', status: 'next', note: 'Next. Spec 410 §4 is its design; the chains note names what is still open.' },
    rule: 'A message from another chain is evidence that something happened there. It is never a mandate here.',
  },
];

export const SCALE_STATUS_LABEL: Record<ScaleStatus, string> = {
  live: 'Live',
  public: 'Public',
  building: 'Building',
  next: 'Next',
};
