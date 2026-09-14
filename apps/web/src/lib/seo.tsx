import type { Metadata } from 'next';
import { SITE } from '@apsite/content';

export function pageMeta({
  title,
  description,
  path,
  type = 'website',
  image = '/og.png',
  published,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  published?: string;
  noIndex?: boolean;
}): Metadata {
  const url = path === '/' ? SITE.url : `${SITE.url}${path}`;
  const absImage = image.startsWith('http') ? image : `${SITE.url}${image}`;
  return {
    title: path === '/' ? { absolute: title } : title,
    description,
    authors: [{ name: SITE.author }],
    creator: SITE.author,
    publisher: SITE.org,
    alternates: { canonical: url, types: { 'application/rss+xml': `${SITE.url}/rss.xml` } },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type,
      siteName: SITE.name,
      title,
      description,
      url,
      images: [{ url: absImage, width: 1200, height: 630, alt: title }],
      locale: 'en_US',
      ...(published && type === 'article' ? { publishedTime: published, authors: [SITE.author] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, images: [absImage] },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function orgGraph() {
  const orgId = `${SITE.url}/#org`;
  const siteId = `${SITE.url}/#website`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': orgId,
      name: SITE.name,
      legalName: SITE.org,
      url: SITE.url,
      logo: `${SITE.url}/icon.svg`,
      sameAs: [SITE.github, SITE.npm],
      foundingDate: '2025',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': siteId,
      url: SITE.url,
      name: SITE.name,
      description: SITE.tagline,
      publisher: { '@id': orgId },
      inLanguage: 'en-US',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: SITE.name,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      url: SITE.url,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'Open-source trust substrate for agentic applications: Smart Agent identity, ERC-7710 delegations and mandates, an authority-aware harness, and owner-held receipts.',
      author: { '@id': orgId },
    },
  ];
}

export const HOME_FAQ = [
  {
    q: 'What is Agentic Primitives?',
    a: 'A trust substrate for agentic applications. Identity, authority and evidence are one system: every person, organization and service is a Smart Agent; permission is a scoped, revocable grant; every protected act leaves a receipt the owner carries.',
  },
  {
    q: 'How is this different from sandboxing or supervising an agent?',
    a: 'Containment bounds what an agent can reach; supervision watches what it does; platform governance fences it inside one vendor. None can say under whose authority an act happened. Agentic Primitives bounds authority itself: a grant the principal signs, caveats that are enforcer code, verification on every step outside the model, revocation in one transaction, and a receipt the owner carries.',
  },
  {
    q: 'How is this different from stitching Auth0, Safe, LangGraph and a tracing vendor?',
    a: 'Stitched stacks give each layer its own identity model and permission shape. Agentic Primitives uses one Smart Agent address, one grant mechanism (ERC-7710 delegations and mandates), and one evidence trail. Revoke once, refused everywhere.',
  },
  {
    q: 'Does a planner or LLM authorize actions?',
    a: 'No. Intelligence may be probabilistic; authority must not be. The planner proposes. A live mandate authorizes. The executor acts. A receipt proves. A hijacked planner cannot exceed the caveats.',
  },
  {
    q: 'Where do I start as a developer?',
    a: 'The public kit is github.com/agentictrustlabs/agentic-primitives. Install @agenticprimitives packages, point at any EVM, and sign people in through a Home. Game Night is a complete third-party example.',
  },
  {
    q: 'Is it production-ready?',
    a: 'Ready for test and pre-production. A live estate has run people, organizations, treasuries, agents, mandates and receipts. Full production waits on an external audit and remaining readiness items. Every finding is public.',
  },
] as const;
