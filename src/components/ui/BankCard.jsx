import { Wifi } from 'lucide-react'

/**
 * Cartão bancário 100% em CSS. Dados ilustrativos.
 */
export const CARD_THEMES = {
  orange: {
    label: 'Gold',
    bg: 'linear-gradient(135deg, #FF9A3D 0%, #FF7A00 42%, #E85D00 100%)',
    text: 'text-white',
    sub: 'text-white/70',
    pattern: 'rgba(255,255,255,.16)',
  },
  black: {
    label: 'Black',
    bg: 'linear-gradient(140deg, #2A2A2E 0%, #0B0B0C 55%, #000 100%)',
    text: 'text-white',
    sub: 'text-white/50',
    pattern: 'rgba(255,122,0,.35)',
  },
  platinum: {
    label: 'Platinum',
    bg: 'linear-gradient(135deg, #F4F4F6 0%, #CFCFD4 40%, #EDEDF0 62%, #A9A9B0 100%)',
    text: 'text-ink-900',
    sub: 'text-ink-500',
    pattern: 'rgba(11,11,12,.12)',
  },
  win: {
    label: 'Win',
    bg: 'radial-gradient(120% 140% at 100% 0%, #FF7A00 0%, #7A3700 28%, #131315 62%)',
    text: 'text-white',
    sub: 'text-white/55',
    pattern: 'rgba(255,169,92,.35)',
  },
  global: {
    label: 'Global',
    bg: 'linear-gradient(135deg, #FFFFFF 0%, #FFF4EA 55%, #FFE4CC 100%)',
    text: 'text-ink-900',
    sub: 'text-ink-400',
    pattern: 'rgba(255,122,0,.25)',
  },
}

function Chip() {
  return (
    <div className="relative h-8 w-11 overflow-hidden rounded-md bg-gradient-to-br from-[#F6D28A] via-[#D9A94B] to-[#B9822A] shadow-inner">
      <div className="absolute inset-x-0 top-1/2 h-px bg-black/25" />
      <div className="absolute inset-y-0 left-1/3 w-px bg-black/25" />
      <div className="absolute inset-y-0 right-1/3 w-px bg-black/25" />
      <div className="absolute left-1/3 right-1/3 top-[30%] bottom-[30%] rounded-sm border border-black/25" />
    </div>
  )
}

export default function BankCard({ theme = 'orange', name = 'SEU NOME AQUI', last4 = '0000', className = '', style }) {
  const t = CARD_THEMES[theme]
  return (
    <div
      className={`relative aspect-[1.586] w-full overflow-hidden rounded-[22px] shadow-card ${t.text} ${className}`}
      style={{ background: t.bg, ...style }}
    >
      {/* Padrão gráfico */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 252" preserveAspectRatio="none" aria-hidden="true">
        <circle cx="360" cy="-30" r="150" fill="none" stroke={t.pattern} strokeWidth="1" />
        <circle cx="360" cy="-30" r="200" fill="none" stroke={t.pattern} strokeWidth="1" />
        <circle cx="360" cy="-30" r="250" fill="none" stroke={t.pattern} strokeWidth="1" />
        <circle cx="360" cy="-30" r="300" fill="none" stroke={t.pattern} strokeWidth="1" />
      </svg>
      {/* Reflexo que acompanha o tilt (--gx/--gy) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay"
        style={{
          background: 'radial-gradient(60% 80% at var(--gx,30%) var(--gy,0%), rgba(255,255,255,.65), transparent 60%)',
        }}
      />
      <div className="relative flex h-full flex-col justify-between p-[7%]">
        <div className="flex items-start justify-between">
          <span className="text-[20px] sm:text-[22px] font-bold tracking-[-0.06em]">
            inter<span className={theme === 'orange' ? 'text-ink-900' : 'text-brand-500'}>.</span>
          </span>
          <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${t.sub}`}>{t.label}</span>
        </div>
        <div className="flex items-center gap-3">
          <Chip />
          <Wifi className={`h-5 w-5 rotate-90 ${t.sub}`} strokeWidth={2.2} />
        </div>
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className={`font-mono text-[11px] tracking-[0.18em] ${t.sub}`}>•••• •••• •••• {last4}</div>
            <div className="mt-1 truncate text-[12px] font-medium uppercase tracking-[0.12em]">{name}</div>
          </div>
          <div className="flex -space-x-2.5" aria-hidden="true">
            <span className="h-7 w-7 rounded-full bg-white/80 mix-blend-soft-light ring-1 ring-black/5" />
            <span className="h-7 w-7 rounded-full bg-brand-500/90 mix-blend-normal ring-1 ring-black/5" />
          </div>
        </div>
      </div>
    </div>
  )
}
