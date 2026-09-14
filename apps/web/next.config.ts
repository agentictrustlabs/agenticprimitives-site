import type { NextConfig } from 'next';

const GITHUB = 'https://github.com/agentictrustlabs/agenticprimitives';

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
      // The ontology namespace IRIs (`https://agenticprimitives.dev/ns/<module>#Term`) must never 404 under a
      // marketing deploy: resolve each module to its T-box source until a content-negotiated server lands.
      { source: '/ns/:module', destination: `${GITHUB}/blob/master/packages/ontology/tbox/:module.ttl`, permanent: false },
      { source: '/schemas/:path*', destination: `${GITHUB}/blob/master/scripts/schemas/:path*`, permanent: false },
      { source: '/contexts/:path*', destination: `${GITHUB}/blob/master/packages/ontology/context.jsonld`, permanent: false },
    ];
  },
};

export default config;
