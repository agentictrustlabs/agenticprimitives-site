import { Arrow, Box, C, Frame, Label, Pill } from './primitives';

/**
 * THE ANATOMY OF A GRANT. A delegation names who grants, who receives, and the caveats that bound it; each caveat is
 * an enforcer contract that runs at redemption. A mandate is a delegation with one more caveat: the digest of the
 * exact intent it authorizes. Revocation is one transaction; verification is per request; nothing is cached.
 */
export function MandateAnatomy() {
  const id = 'mandate';
  const W = 1100, H = 540;
  return (
    <Frame id={id} w={W} h={H} title="Anatomy of a delegation and a mandate: delegator, delegate, caveats with enforcers, intent digest, signature, revocation">
      <rect x={40} y={40} width={620} height={440} rx={14} fill={C.amberSoft} stroke={C.amber} strokeWidth={1.5} />
      <Label x={60} y={68} text="Delegation  (ERC-7710, EIP-712 signed)" size={13} weight={700} tone="amber" mono />

      <Box x={60} y={86} w={280} h={54} title="delegator" lines={['alice.treasury — whose authority this is']} tone="paper" titleMono lineSize={10.5} />
      <Box x={360} y={86} w={280} h={54} title="delegate" lines={['pokernight.treasury — who may redeem it']} tone="paper" titleMono lineSize={10.5} />
      <Box x={60} y={152} w={580} h={48} title="authority" lines={['ROOT — or the hash of a parent delegation: attenuation is a chain, never a function']} tone="paper" titleMono lineSize={10.5} />

      <Label x={60} y={224} text="caveats[]  — each an ENFORCER contract + terms; all must pass at redemption" size={11} weight={700} tone="ink" mono />
      <Box x={60} y={234} w={180} h={62} title="TimestampEnforcer" lines={['notBefore · notAfter', 'valid 30 days']} tone="paper" titleMono lineSize={10} titleSize={11.5} />
      <Box x={260} y={234} w={180} h={62} title="AllowedTargets" lines={['only the SHQ token', 'contract']} tone="paper" titleMono lineSize={10} titleSize={11.5} />
      <Box x={460} y={234} w={180} h={62} title="AllowedMethods" lines={['transfer(address,uint256)', 'and nothing else']} tone="paper" titleMono lineSize={10} titleSize={11.5} />
      <Box x={60} y={308} w={180} h={72} title="ValueEnforcer" lines={['≤ 2,000 SHQ', 'per redemption']} tone="paper" titleMono lineSize={10} titleSize={11.5} />
      <Box x={260} y={308} w={180} h={72} title="PaymentEnforcer" lines={['payee pinned to', 'the house treasury']} tone="paper" titleMono lineSize={10} titleSize={11.5} />
      <Box x={460} y={308} w={180} h={72} title="DigestBinding ★" lines={['sha256 of the exact intent', '— this caveat makes it', 'a MANDATE']} tone="amber" titleMono lineSize={10} titleSize={11.5} />

      <Box x={60} y={394} w={280} h={54} title="salt · signature" lines={['single-use nonce · ERC-1271 by alice.me']} tone="paper" titleMono lineSize={10.5} />
      <Box x={360} y={394} w={280} h={54} title="revocation" lines={['DelegationManager.revoke(hash) — one tx, final']} tone="rose" titleMono lineSize={10.5} />

      {/* Right: the lifecycle */}
      <Label x={700} y={68} text="Lifecycle" size={13} weight={700} tone="ink" />
      <Box x={700} y={86} w={360} h={54} title="1  Minted at the Home" lines={['the custodian signs; the preview is the caveats in words']} tone="navy" lineSize={10.5} />
      <Arrow id={id} d="M 880 140 V 156" tone="ink" />
      <Box x={700} y={158} w={360} h={54} title="2  Presented per request" lines={['live? unrevoked? delegate = actor? selector = this step?']} tone="paper" lineSize={10.5} />
      <Arrow id={id} d="M 880 212 V 228" tone="ink" />
      <Box x={700} y={230} w={360} h={54} title="3  Redeemed on chain" lines={['every enforcer runs again; the nonce is spent once']} tone="teal" lineSize={10.5} />
      <Arrow id={id} d="M 880 284 V 300" tone="ink" />
      <Box x={700} y={302} w={360} h={54} title="4  Receipted" lines={['intent · mandate · step · playbook digest · tx → owner\'s vault']} tone="teal" lineSize={10.5} />
      <Arrow id={id} d="M 880 356 V 372" tone="rose" />
      <Box x={700} y={374} w={360} h={54} title="5  Revoked — whenever the owner says" lines={['no expiry to wait out; no cache to flush; refused at the next gate']} tone="rose" lineSize={10.5} />

      <Pill x={700} y={446} text="Checked once is cached. Checked every time is authority." tone="amber" />
      <Label x={60} y={510} text="Compare: an OAuth token is a cached verdict — valid until it expires, whatever happens in between. A scope is a string; an enforcer is code that runs." size={10.5} italic />
      <Label x={W - 40} y={H - 12} text="agenticprimitives.dev" size={9.5} anchor="end" mono />
    </Frame>
  );
}
