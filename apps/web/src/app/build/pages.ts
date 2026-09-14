/** The Build area's pages, in order. Plain data — imported by both the client nav and server pages. */
export const BUILD_PAGES = [
  { href: '/build', label: 'Start', sub: 'Say what you want' },
  { href: '/build/point-at', label: 'Point at', sub: 'Repos and endpoints' },
  { href: '/build/demo-people', label: 'Demo people', sub: 'Six agents to test as' },
  { href: '/build/flow', label: 'The flow', sub: 'Six steps, one session' },
  { href: '/build/gates', label: 'The gates', sub: 'What says no' },
] as const;
