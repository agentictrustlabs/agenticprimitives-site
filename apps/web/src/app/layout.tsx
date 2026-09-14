import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { SITE } from '@apsite/content';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { JsonLd, orgGraph } from '@/lib/seo';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description:
    'One substrate for agentic applications: identity, authority and evidence designed as one system. Smart Agents for people, organizations and services; scoped, revocable grants; receipts the owner carries. Open source.',
  keywords: [
    'Agentic Primitives',
    'Smart Agent',
    'ERC-7710',
    'ERC-4337',
    'agent identity',
    'agent authority',
    'mandate',
    'A2A',
    'MCP',
    'PROV-O',
    'agent harness',
  ],
  authors: [{ name: SITE.author }],
  creator: SITE.author,
  publisher: SITE.org,
  alternates: { canonical: SITE.url, types: { 'application/rss+xml': `${SITE.url}/rss.xml` } },
  openGraph: { type: 'website', siteName: SITE.name, url: SITE.url, locale: 'en_US', images: [{ url: '/og.png', width: 1200, height: 630, alt: SITE.name }] },
  twitter: { card: 'summary_large_image', title: `${SITE.name} — ${SITE.tagline}`, images: ['/og.png'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  icons: { icon: [{ url: '/icon.svg', type: 'image/svg+xml' }, { url: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' }], apple: '/brand/apple-touch-icon.png' },
  category: 'technology',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans">
        <JsonLd data={orgGraph()} />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
