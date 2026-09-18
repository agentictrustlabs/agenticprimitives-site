// Published assessments. The Markdown is the document as written; the PDF is the same document typeset. Both are
// copied verbatim from the source repository's docs/audits/public — edit there, then copy.

export interface Audit {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  head: string;
  status: string;
  verdict: string;
  summary: string;
  file: string;
  pdf: string;
  numbers: readonly { k: string; v: string }[];
}

export const AUDITS: readonly Audit[] = [
  {
    slug: 'production-readiness-2026-09-18',
    title: 'Production Readiness Assessment',
    subtitle: 'Packages · Contracts · Estate · Capability areas against the field',
    date: '2026-09-18',
    head: '2c711e01',
    status: 'Self-assessment by the maintainers, from the repository’s own evidence. Not a third-party audit.',
    verdict: 'Pre-production, honestly labelled. GO for testnet pilots and demonstrations on our own chain. NO-GO for a real person’s private data, for real value under delegated payments, and for a public mainnet — each with named, dated closing conditions.',
    summary:
      'What we would hand a senior third-party auditor or a technical due-diligence team today: the verdict, what held and what did not, every package by capability area, the contracts, the estate, thirteen capability areas measured against the field, and the open findings register with its remediation order.',
    file: '2026-09-18-production-readiness-assessment.md',
    pdf: '/audits/2026-09-18-production-readiness-assessment.pdf',
    numbers: [
      { k: 'Packages', v: '77 · 97k lines of TypeScript · 76/77 with tests' },
      { k: 'Contracts', v: '50 sources · 939 / 939 Foundry tests green · 7 symbolic proofs' },
      { k: 'Gates', v: '131 in CI · 57 live nightly · A2A 1.0 TCK green' },
      { k: 'Open findings', v: '54 · 2 Critical · 5 High · 30 Medium · 16 Low' },
      { k: 'Hardening', v: '30 of 34 findings raised 17 Sep closed in source by 18 Sep' },
      { k: 'Next full review', v: 'Close of Wave R4 or 17 November 2026, whichever is first' },
    ],
  },
];

export function auditBySlug(slug: string): Audit | undefined {
  return AUDITS.find((a) => a.slug === slug);
}
