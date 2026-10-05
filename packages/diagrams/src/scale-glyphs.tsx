// SCALE GLYPHS. One small picture per scale, drawn with the estate kit so the brand reads the same at every size:
// bedrock for the substrate, one property for the estate, a street for the town, two towns and a road for the
// federation. Used on cards for readers who will never open a repository.
import { Building, Plot } from './estate-kit';
import { C } from './primitives';

export type ScaleId = 'substrate' | 'estate' | 'town' | 'federation';

const W = 240, H = 150;

function Svg({ id, children, title }: { id: string; children: React.ReactNode; title: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-labelledby={`${id}-t`} xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <title id={`${id}-t`}>{title}</title>
      {children}
    </svg>
  );
}

export function ScaleGlyph({ id }: { id: ScaleId }) {
  switch (id) {
    case 'substrate':
      return (
        <Svg id="g-substrate" title="The substrate: packages and contracts, the ground everything stands on">
          <rect x={16} y={96} width={208} height={34} rx={6} fill={C.faint} stroke={C.line} strokeWidth={1.5} />
          <rect x={30} y={74} width={60} height={22} rx={4} fill={C.paper} stroke={C.line} strokeWidth={1.25} />
          <rect x={96} y={74} width={60} height={22} rx={4} fill={C.paper} stroke={C.line} strokeWidth={1.25} />
          <rect x={162} y={74} width={48} height={22} rx={4} fill={C.paper} stroke={C.line} strokeWidth={1.25} />
          <Building kind="chain" x={70} y={26} w={100} h={48} name="" roofH={14} />
          <text x={120} y={118} textAnchor="middle" fontSize={10} fontFamily="ui-monospace, Menlo, monospace" fill={C.muted} letterSpacing={1}>PACKAGES · CONTRACTS</text>
        </Svg>
      );
    case 'estate':
      return (
        <Svg id="g-estate" title="An estate: one property with a Home, agents, a vault and a gate">
          <Plot x={14} y={18} w={212} h={118} caption="" tone="navy" />
          <Building kind="home" x={30} y={52} w={54} h={66} name="" roofH={16} />
          <Building kind="runtime" x={92} y={58} w={44} h={60} name="" roofH={12} />
          <Building kind="vault" x={144} y={58} w={36} h={60} name="" roofH={12} />
          <Building kind="edge" x={188} y={52} w={26} h={66} name="" roofH={14} />
          <circle cx={57} cy={40} r={6} fill={C.navy} />
          <path d="M 47 50 a 10 8 0 0 1 20 0" fill={C.navy} />
        </Svg>
      );
    case 'town':
      return (
        <Svg id="g-town" title="A town: several estates on one street, sharing an address book and a notice board">
          <Plot x={10} y={14} w={220} h={122} caption="" tone="teal" />
          <Building kind="home" x={22} y={70} w={34} h={48} name="" roofH={12} />
          <Building kind="home" x={62} y={70} w={34} h={48} name="" roofH={12} />
          <Building kind="home" x={102} y={70} w={34} h={48} name="" roofH={12} />
          <Building kind="naming" x={150} y={44} w={30} h={74} name="" roofH={10} />
          <Building kind="graph" x={186} y={56} w={34} h={62} name="" roofH={18} />
          <rect x={20} y={124} width={200} height={4} rx={2} fill={C.teal} opacity={0.5} />
        </Svg>
      );
    case 'federation':
      return (
        <Svg id="g-federation" title="A federation: towns on different ground, joined by public roads">
          <Plot x={8} y={30} w={92} h={100} caption="" tone="amber" solid />
          <Building kind="home" x={18} y={74} w={26} h={44} name="" roofH={10} />
          <Building kind="home" x={50} y={74} w={26} h={44} name="" roofH={10} />
          <Plot x={140} y={30} w={92} h={100} caption="" tone="amber" solid />
          <Building kind="home" x={150} y={74} w={26} h={44} name="" roofH={10} />
          <Building kind="home" x={182} y={74} w={26} h={44} name="" roofH={10} />
          <Building kind="ground" x={100} y={48} w={40} h={44} name="" roofH={12} dashed />
          <path d="M 100 112 H 140" stroke={C.line} strokeWidth={2.5} strokeDasharray="5 4" fill="none" />
          <path d="M 100 92 V 112 M 140 92 V 112" stroke={C.line} strokeWidth={1.25} strokeDasharray="3 3" fill="none" />
        </Svg>
      );
  }
}
