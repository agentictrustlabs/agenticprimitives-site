import { Arrow, Box, Brandline, C, Frame, Kicker, Label, Pill } from './primitives';

/**
 * THE ANATOMY OF A GRANT. A delegation names who grants, who receives, and the caveats that bound it; each caveat is
 * an enforcer contract that runs at redemption. A mandate is a delegation with one more caveat: the digest of the
 * exact intent it authorizes. Revocation is one transaction; verification is per request; nothing is cached.
 */
export function MandateAnatomy() {
  const id = 'mandate';
  const W = 1120, H = 560;
  return (
    <Frame id={id} w={W} h={H} title="Anatomy of a delegation and a mandate: delegator, delegate, caveats with enforcers, intent digest, signature, revocation">
      <rect x={32} y={40} width={660} height={460} rx={16} fill={C.amberSoft} stroke={C.amber} strokeWidth={1.5} />
      <Kicker x={52} y={68} text="Delegation · ERC-7710 · EIP-712 signed" tone="amber" />

      <Box x={52} y={86} w={306} h={56} title="delegator" variant="header" tone="amber" titleMono lines={['alice.treasury — whose authority this is']} lineSize={11.5} titleSize={12} />
      <Box x={366} y={86} w={306} h={56} title="delegate" variant="header" tone="amber" titleMono lines={['pokernight.treasury — who may redeem it']} lineSize={11.5} titleSize={12} />
      <Box x={52} y={154} w={620} h={50} title="authority" titleMono lines={['ROOT — or the hash of a parent delegation: attenuation is a chain, never a function']} tone="paper" lineSize={11.5} titleSize={12} />

      <Kicker x={52} y={232} text="caveats[] — each an ENFORCER contract + terms; all must pass at redemption" tone="ink" />
      {[
        ['TimestampEnforcer', 'notBefore · notAfter', 'valid 30 days'],
        ['AllowedTargets', 'only the SHQ token', 'contract'],
        ['AllowedMethods', 'transfer(address,uint256)', 'and nothing else'],
        ['ValueEnforcer', '≤ 2,000 SHQ', 'per redemption'],
        ['PaymentEnforcer', 'payee pinned to', 'the house treasury'],
        ['DigestBinding ★', 'sha256 of the exact intent —', 'this caveat makes it a MANDATE'],
      ].map(([t, a, b], i) => {
        const col = i % 3, row = Math.floor(i / 3);
        const star = i === 5;
        return <Box key={t} x={52 + col * 212} y={244 + row * 78} w={196} h={66} title={t} variant="header" tone={star ? 'amber' : 'paper'} titleMono lines={[a!, b!]} lineSize={10.5} titleSize={11.5} solid={false} />;
      })}

      <Box x={52} y={408} w={306} h={56} title="salt · signature" titleMono lines={['single-use nonce · ERC-1271 by alice.me']} tone="paper" lineSize={11.5} titleSize={12} />
      <Box x={366} y={408} w={306} h={56} title="revocation" variant="header" tone="rose" titleMono lines={['DelegationManager.revoke(hash) — one tx, final']} lineSize={11.5} titleSize={12} />
      <Label x={52} y={486} text="Compare: an OAuth token is a cached verdict — valid until it expires, whatever happens in between." size={11} italic />

      {/* Lifecycle */}
      <Kicker x={724} y={68} text="Lifecycle" tone="ink" />
      {[
        ['1  Minted at the Home', 'the custodian signs; the preview is the caveats in words', 'navy'],
        ['2  Presented per request', 'live? unrevoked? delegate = actor? selector = this step?', 'paper'],
        ['3  Redeemed on chain', 'every enforcer runs again; the nonce is spent once', 'teal'],
        ['4  Receipted', 'intent · mandate · step · playbook digest · tx → owner’s vault', 'teal'],
        ['5  Revoked — when the owner says', 'no expiry to wait out; no cache to flush; refused at the next gate', 'rose'],
      ].map(([t, l, tone], i) => (
        <g key={t}>
          <Box x={724} y={86 + i * 74} w={364} h={56} title={t} variant="header" tone={tone as 'navy'} lines={[l!]} lineSize={11} titleSize={12} />
          {i < 4 && <Arrow id={id} d={`M 906 ${142 + i * 74} V ${158 + i * 74}`} tone={i === 3 ? 'rose' : 'ink'} width={1.5} />}
        </g>
      ))}
      <Pill x={724} y={462} text="Checked once is cached. Checked every time is authority." tone="amber" solid />
      <Brandline w={W} h={H} />
    </Frame>
  );
}
