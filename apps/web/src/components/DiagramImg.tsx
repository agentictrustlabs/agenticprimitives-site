// A pre-rendered brand diagram as an <img>. Use this for heavy static figures on long pages: an inline server-
// rendered SVG is shipped twice (HTML + React flight payload); an <img> is one tag and one cacheable file.
// Files come from `scripts/render-diagrams.mts` (`<name>.svg` light, `<name>-dark.svg` dark).
export function DiagramImg({ name, alt, dark = false, width, height, priority = false }: { name: string; alt: string; dark?: boolean; width: number; height: number; priority?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static SVG, no optimisation pass wanted
    <img src={`/architecture/${name}${dark ? '-dark' : ''}.svg`} alt={alt} width={width} height={height} loading={priority ? 'eager' : 'lazy'} decoding="async" style={{ width: '100%', height: 'auto', display: 'block' }} />
  );
}
