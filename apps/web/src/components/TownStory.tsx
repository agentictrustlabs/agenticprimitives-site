'use client';
// MEET THE TOWN — the player. The scene itself is `@apsite/diagrams` `TownScene`, a pure component driven by a
// `beat` prop; this wrapper is the only client code: it advances the beat on a timer, pauses when the figure is off
// screen or the reader prefers reduced motion, and lets the reader scrub by clicking a beat or using the keyboard.
import { TOWN_BEATS, TownScene, type TownBeat } from '@apsite/diagrams';
import { useCallback, useEffect, useRef, useState } from 'react';

const LAST = (TOWN_BEATS.length - 1) as TownBeat;

export function TownStory({ id = 'town-story', autoplay = true }: { id?: string; autoplay?: boolean }) {
  const [beat, setBeat] = useState<TownBeat>(0);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  // Start when the figure scrolls into view; honour prefers-reduced-motion by starting paused.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(([e]) => {
      const on = !!e?.isIntersecting;
      setVisible(on);
      if (on && autoplay && !reduced && !started.current) { started.current = true; setPlaying(true); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [autoplay]);

  // Advance on a timer while playing and visible. Progress is a cheap per-frame tick for the bar under the figure.
  useEffect(() => {
    if (!playing || !visible) return;
    const dwell = TOWN_BEATS[beat]?.ms ?? 5000;
    const t0 = performance.now();
    let raf = 0;
    const tick = () => { setProgress(Math.min(1, (performance.now() - t0) / dwell)); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    const timer = window.setTimeout(() => setBeat((b) => ((b + 1) % TOWN_BEATS.length) as TownBeat), dwell);
    return () => { window.clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [playing, visible, beat]);

  const go = useCallback((b: TownBeat, keepPlaying = false) => { setProgress(0); setBeat(b); if (!keepPlaying) setPlaying(false); }, []);
  const prev = useCallback(() => go((beat === 0 ? LAST : beat - 1) as TownBeat), [beat, go]);
  const next = useCallback(() => go((beat === LAST ? 0 : beat + 1) as TownBeat), [beat, go]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    else if (e.key === ' ') { e.preventDefault(); setPlaying((p) => !p); }
  };

  const info = TOWN_BEATS[beat]!;

  return (
    <div id={id} ref={rootRef} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]" tabIndex={0} onKeyDown={onKey} aria-roledescription="animated walkthrough" aria-label="Meet the town">
      <div>
        <div className="figure-dark relative">
          <TownScene beat={beat} />
          {/* progress bar */}
          <div className="absolute inset-x-3 bottom-3 h-[3px] overflow-hidden rounded bg-white/10 md:inset-x-5 md:bottom-5">
            <div className="h-full bg-brass" style={{ width: `${((beat + (playing ? progress : 1)) / TOWN_BEATS.length) * 100}%`, transition: playing ? 'none' : 'width .4s ease' }} />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => setPlaying((p) => !p)} className="btn-brass !px-4 !py-2" aria-pressed={playing}>
            {playing ? 'Pause' : beat === LAST && !playing ? 'Replay' : 'Play'}
          </button>
          <button type="button" onClick={prev} className="rounded-md border border-white/15 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5" aria-label="Previous beat">←</button>
          <button type="button" onClick={next} className="rounded-md border border-white/15 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5" aria-label="Next beat">→</button>
          <p className="ml-1 text-xs text-slate-400">{beat + 1} / {TOWN_BEATS.length} · <span className="text-slate-200">{info.title}</span> · ← → to step, space to pause</p>
        </div>
      </div>

      <ol className="flex flex-col gap-1" aria-label="Beats">
        {TOWN_BEATS.map((b, i) => {
          const on = i === beat;
          return (
            <li key={b.id}>
              <button type="button" onClick={() => go(i as TownBeat)} aria-current={on ? 'step' : undefined}
                className={`w-full rounded-lg border px-3.5 py-2.5 text-left transition ${on ? 'border-brass/60 bg-white/[0.06]' : 'border-transparent hover:border-white/10 hover:bg-white/[0.03]'}`}>
                <div className="flex items-baseline gap-2">
                  <span className={`font-mono text-[10px] tracking-[0.14em] ${on ? 'text-brass' : 'text-slate-500'}`}>0{i + 1}</span>
                  <span className={`text-sm font-semibold ${on ? 'text-white' : 'text-slate-300'}`}>{b.title}</span>
                </div>
                <div className={`grid transition-[grid-template-rows] duration-300 ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate-300">{b.caption}</p>
                    <p className="mt-1.5 text-[13px] font-semibold leading-snug text-brass">{b.rule}</p>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
