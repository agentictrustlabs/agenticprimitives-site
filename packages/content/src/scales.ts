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
  /** For a reader who is not an engineer: one sentence, no jargon. */
  plain: string;
  /** A familiar comparison. */
  analogy: string;
  /** What it means for a person, an organization, a builder. */
  means: { person: string; organization: string; builder: string };
}

/** The plain-language opening, for a reader who will never open a repository. */
export const SCALES_INTRO = {
  eyebrow: 'How it is organized',
  title: 'Four words you will see everywhere: substrate, estate, town, federation.',
  lede:
    'Agentic Primitives is not one website or one app. It is built the way a place is built: materials and a building code, then a property with its own front door and keys, then a street of properties that share an address book and a notice board, then roads between towns. Every screen, every agent and every receipt lives at one of these four scales, and knowing which one tells you who is in charge there.',
  close:
    'The rule that runs through all four: being somewhere never gives anyone power over you. Your keys stay at your estate. A town can list you; it cannot act for you. A federation can prove what you are entitled to elsewhere; it cannot spend on your behalf.',
};

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
    plain: 'The materials and the building code. Nobody lives here; everything else is built from it, so every Home, town and federation behaves the same way.',
    analogy: 'Like the building code and the lumber yard: you never see them, and they are why the house stands.',
    means: {
      person: 'You never touch it. It is why your agent can sign, why a permission you give can be taken back, and why there is always a receipt.',
      organization: 'The guarantees are the same whichever Home or town you use, because they come from here, not from a vendor.',
      builder: 'Published packages and contracts. Take one capability or all nine; your app imports them, they never import you.',
    },
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
    plain: 'Your own property. The front door where you sign in, the staff who work for you (your agents), the filing cabinet that holds your records (the vault), and the gate that checks who may come in (the edge). You hold the keys.',
    analogy: 'Like your house: your door, your help, your papers, your gate, your name on the deed.',
    means: {
      person: 'This is where you sign in, decide, and keep what is yours. Nothing is done in your name without a permission you signed here, and you can take it back here.',
      organization: 'Your members, teams and treasuries live in your estate. A member acts under a role you gave; a treasury pays only within a limit you set.',
      builder: 'ap-home is the estate product, public on GitHub. Run one for your community, or build a relying app that plugs into someone else\u2019s.',
    },
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
    plain: 'The street your estate is on. The address book that says who lives where, the public notice board, the directories of who offers what, and the utilities every neighbour shares. Shared by all, owned by none.',
    analogy: 'Like a town: street names, a notice board, a trades directory. Being listed is not the same as being in charge.',
    means: {
      person: 'How others find you and how you find them. A listing in a directory never gives anyone power over your estate.',
      organization: 'Your name is unique in the town, your public facts are readable by anyone, and your private ones stay in your vault.',
      builder: 'Naming, discovery and registries for every estate on one chain. Build a vertical registry from the same kit; it lists, it never grants.',
    },
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
    plain: 'Towns in different places, connected by public roads. You can visit another town and act there, but your keys never leave home; you prove what you are entitled to, sign at your own door, and keep the receipt.',
    analogy: 'Like travelling with a passport: another country can check it, but it cannot sign your name.',
    means: {
      person: 'Act somewhere else, sign at home, keep the receipt. A permission you gave in one place is never quietly honoured in another.',
      organization: 'Work with organizations whose estates stand on other chains, including public ones, without moving your records or your money to them.',
      builder: 'Public ground, proofs of standing, and the binding between one principal\u2019s accounts. Designed, not yet built; the open questions are listed, not hidden.',
    },
  },
];

export const SCALE_STATUS_LABEL: Record<ScaleStatus, string> = {
  live: 'Live',
  public: 'Public',
  building: 'Building',
  next: 'Next',
};
