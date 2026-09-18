import type { NextConfig } from 'next';

const GITHUB = 'https://github.com/agentictrustlabs/agentic-primitives';

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@apsite/diagrams', '@apsite/content'],
  images: { unoptimized: true },
  async redirects() {
    return [
      // agenticprimitives.io → the canonical .dev host (one brand hostname).
      {
        source: '/:path*',
        has: [{ type: 'host', value: '(www\\.)?agenticprimitives\\.io' }],
        destination: 'https://agenticprimitives.dev/:path*',
        permanent: true,
      },
      // www.agenticprimitives.dev → apex.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www\\.agenticprimitives\\.dev' }],
        destination: 'https://agenticprimitives.dev/:path*',
        permanent: true,
      },
      // Public kit is agentic-primitives (main). T-box TTL is not in that repo yet — land /ns on the kit
      // until a content-negotiated ontology server exists. Schemas live at /schemas in the kit.
      { source: '/ns/:module', destination: `${GITHUB}`, permanent: false },
      { source: '/schemas/:path*', destination: `${GITHUB}/blob/main/schemas/:path*`, permanent: false },
      { source: '/contexts/:path*', destination: `${GITHUB}`, permanent: false },
      // Days 18 and 21 of the series were retitled when the LinkedIn articles went up.
      { source: '/writing/behaviour-generated-authority-never', destination: '/writing/dont-build-your-app-twice', permanent: true },
      { source: '/writing/what-we-owe', destination: '/writing/rails-not-throttles-day-21', permanent: true },
    ];
  },
};

export default config;
