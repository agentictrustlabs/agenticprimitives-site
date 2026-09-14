import type { ReactNode } from 'react';

function inline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith('**')) parts.push(<strong key={i++}>{t.slice(2, -2)}</strong>);
    else if (t.startsWith('*')) parts.push(<em key={i++}>{t.slice(1, -1)}</em>);
    else if (t.startsWith('`')) parts.push(<code key={i++} className="kbd">{t.slice(1, -1)}</code>);
    else {
      const lm = t.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (lm) {
        const href = lm[2]!;
        const ext = href.startsWith('http');
        parts.push(
          <a key={i++} href={href} className="text-teal underline-offset-2 hover:underline" {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})}>
            {lm[1]}
          </a>,
        );
      }
    }
    last = m.index + t.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function Markdown({ source }: { source: string }) {
  const blocks = source.replace(/\r\n/g, '\n').split(/\n{2,}/);
  return (
    <div className="prose-ap max-w-none">
      {blocks.map((raw, i) => {
        const b = raw.trim();
        if (!b) return null;
        if (b === '---') return <hr key={i} className="my-10 border-line" />;
        if (b.startsWith('# ')) return <h1 key={i} className="h1 !text-4xl md:!text-5xl">{inline(b.slice(2))}</h1>;
        if (b.startsWith('## ')) return <h2 key={i} className="h2 mt-12 !text-2xl md:!text-3xl">{inline(b.slice(3))}</h2>;
        if (b.startsWith('### ')) return <h3 key={i} className="h3 mt-8">{inline(b.slice(4))}</h3>;
        if (/^[-*] /.test(b) || /^\d+\. /.test(b)) {
          const items = b.split('\n').filter((l) => /^[-*] |\d+\. /.test(l.trim()));
          return (
            <ul key={i} className="my-4 list-disc space-y-2 pl-6 text-slate-700">
              {items.map((l, j) => (
                <li key={j}>{inline(l.replace(/^[-*] |^\d+\. /, ''))}</li>
              ))}
            </ul>
          );
        }
        if (b.startsWith('> ')) {
          return (
            <blockquote key={i} className="my-6 border-l-2 border-amber pl-5 text-lg italic text-navy">
              {inline(b.replace(/^> /gm, ''))}
            </blockquote>
          );
        }
        if (b.startsWith('`#') || /^`#[A-Z]/.test(b)) {
          return <p key={i} className="mt-8 font-mono text-xs text-slate-400">{b.replace(/`/g, '')}</p>;
        }
        return <p key={i} className="my-4 text-[17px] leading-relaxed text-slate-700">{inline(b.replace(/\n/g, ' '))}</p>;
      })}
    </div>
  );
}
