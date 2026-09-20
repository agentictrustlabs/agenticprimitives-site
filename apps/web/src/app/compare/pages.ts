/** The Versus area's pages, in order. Plain data — imported by the client nav and the server pages. */
export const COMPARE_PAGES = [
  { href: '/compare', label: 'The stack you would buy', sub: 'Thirty products, or one substrate' },
  { href: '/compare/throttles', label: 'The three throttles', sub: 'Containment · supervision · platform governance' },
  { href: '/compare/frameworks', label: 'Agent frameworks', sub: 'MAF · ADK · LangGraph · Dapr · Mastra …' },
  { href: '/compare/web3', label: 'The Web3 field', sub: 'DTK · Vincent · ERC-8004 → 8273 · AP2 · Inrupt' },
  { href: '/compare/composition', label: 'The composition', sub: 'Every layer has a peer; nobody has all of them' },
  { href: '/compare/honest', label: 'Where we lose', sub: 'And what we refuse to take' },
  { href: '/compare/assemble', label: 'Who could assemble it', sub: 'The horizontal field, three to five months out' },
] as const;
