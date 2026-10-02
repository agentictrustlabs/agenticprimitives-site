'use client';

import { useEffect, useId, useRef, useState } from 'react';

/** Renders one Mermaid diagram. The chart source stays in the page if the library fails to draw it. */
export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, '');
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancel = false;
    setFailed(false);
    void import('mermaid')
      .then(async (m) => {
        m.default.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'neutral', fontFamily: 'inherit' });
        const { svg } = await m.default.render(`diagram-${id}`, chart);
        if (!cancel && ref.current) ref.current.innerHTML = svg;
      })
      .catch(() => {
        if (!cancel) setFailed(true);
      });
    return () => {
      cancel = true;
    };
  }, [chart, id]);

  if (failed) {
    return (
      <pre className="my-6 overflow-x-auto rounded-lg border border-line bg-cream px-4 py-3 font-mono text-[13px] leading-relaxed text-slate-700">
        <code>{chart}</code>
      </pre>
    );
  }

  return <div ref={ref} className="my-8 overflow-x-auto rounded-lg border border-line bg-white p-4" />;
}
