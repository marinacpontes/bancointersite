import { useCallback, useRef } from 'react'
import { ArrowDownRight, ArrowUpRight, Zap, QrCode, Barcode, TrendingUp, CreditCard, Percent, Globe2, Star } from 'lucide-react'
import Button from '../ui/Button'
import BankCard from '../ui/BankCard'
import { TICKER } from '../../data/content'

/* Camada com parallax controlado por --px / --py (definidas no container) */
function Layer({ depth = 20, className = '', style, children }) {
  return (
    <div
      className={`absolute transition-transform duration-[400ms] ease-out will-change-transform ${className}`}
      style={{
        transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px), 0)`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function FloatingChip({ icon: Icon, title, value, accent = false, className = '' }) {
  return (
    <div
      className={`glass flex items-center gap-3 rounded-2xl py-2.5 pl-2.5 pr-4 shadow-lift ring-1 ring-white/60 ${className}`}
    >
      <span
        className={`grid h-9 w-9 place-items-center rounded-xl ${
          accent ? 'bg-brand-500 text-white' : 'bg-ink-900 text-white'
        }`}
      >
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="leading-tight">
        <span className="block text-[11px] font-medium text-ink-400">{title}</span>
        <span className="block text-[14px] font-semibold tracking-[-0.02em] text-ink-900">{value}</span>
      </span>
    </div>
  )
}

function PhoneApp() {
  const actions = [
    { icon: Zap, label: 'Pix' },
    { icon: Barcode, label: 'Pagar' },
    { icon: TrendingUp, label: 'Investir' },
    { icon: CreditCard, label: 'Cartões' },
  ]
  const bars = [38, 52, 44, 68, 58, 80, 72, 94]
  return (
    <div className="relative h-[560px] w-[272px] rounded-[48px] bg-ink-900 p-[10px] shadow-card ring-1 ring-white/10 sm:h-[600px] sm:w-[292px]">
      <div className="absolute -left-[3px] top-28 h-14 w-[3px] rounded-l bg-ink-700" />
      <div className="absolute -right-[3px] top-36 h-20 w-[3px] rounded-r bg-ink-700" />
      <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-[#FAFAF9]">
        {/* Status bar + island */}
        <div className="flex items-center justify-between px-7 pt-3.5 text-[11px] font-semibold text-ink-900">
          <span>9:41</span>
          <span className="h-[26px] w-[86px] rounded-full bg-ink-900" />
          <span className="flex gap-1">
            <span className="h-2.5 w-4 rounded-[3px] border border-ink-900">
              <span className="block h-full w-3/4 bg-ink-900" />
            </span>
          </span>
        </div>

        {/* Header do app */}
        <div className="relative mx-3 mt-3 overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-400 via-brand-500 to-brand-600 p-5 text-white">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-white/20" />
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full border border-white/20" />
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-white/80">Olá, visitante</span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-[11px] font-bold">VS</span>
          </div>
          <div className="mt-6 text-[11px] uppercase tracking-[0.14em] text-white/70">Saldo · demo</div>
          <div className="mt-1 text-[30px] font-semibold tracking-[-0.04em]">
            R$ 12.480<span className="text-white/60">,32</span>
          </div>
          <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-medium">
            <ArrowUpRight className="h-3 w-3" /> +2,4% este mês
          </div>
        </div>

        {/* Ações rápidas */}
        <div className="mx-3 mt-4 grid grid-cols-4 gap-2">
          {actions.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-ink-900 shadow-soft">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-[10.5px] font-medium text-ink-500">{label}</span>
            </div>
          ))}
        </div>

        {/* Mini gráfico */}
        <div className="mx-3 mt-4 rounded-[22px] bg-white p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-ink-900">Investimentos</span>
            <span className="text-[11px] font-medium text-emerald-600">+18,2%</span>
          </div>
          <div className="mt-3 flex h-16 items-end gap-1.5">
            {bars.map((h, i) => (
              <span
                key={i}
                className={`flex-1 origin-bottom animate-rise rounded-md ${
                  i === bars.length - 1 ? 'bg-brand-500' : 'bg-ink-100'
                }`}
                style={{ height: `${h}%`, animationDelay: `${900 + i * 70}ms` }}
              />
            ))}
          </div>
        </div>

        {/* Lista */}
        <div className="mx-3 mt-3 space-y-2">
          {[
            { t: 'Pix recebido', s: 'Hoje, 09:12', v: '+ R$ 250,00', pos: true },
            { t: 'Cashback', s: 'Inter Shop', v: '+ R$ 18,40', pos: true },
          ].map((r) => (
            <div key={r.t} className="flex items-center justify-between rounded-2xl bg-white px-3.5 py-2.5 shadow-soft">
              <div className="leading-tight">
                <div className="text-[12px] font-semibold text-ink-900">{r.t}</div>
                <div className="text-[10.5px] text-ink-400">{r.s}</div>
              </div>
              <div className="text-[12px] font-semibold text-emerald-600">{r.v}</div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-2 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-ink-900/80" />
      </div>
    </div>
  )
}

function HeroVisual() {
  return (
    <div className="relative mx-auto h-[600px] w-full max-w-[600px] sm:h-[680px]">
      {/* Órbitas e brilho */}
      <Layer depth={-10} className="inset-0">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,122,0,.45),rgba(255,122,0,.08)_45%,transparent_70%)] blur-2xl" />
        <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-brand-500/30" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink-900/10" />
        <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow [animation-duration:22s]">
          <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500 shadow-glow" />
        </div>
      </Layer>

      {/* Cartões atrás do telefone */}
      <Layer depth={34} className="left-[-6%] top-[14%] w-[300px] sm:left-[-2%] sm:w-[340px]">
        <div className="animate-[rise_1s_.45s_cubic-bezier(.2,.7,.2,1)_both]">
          <div className="animate-float-slow">
            <BankCard theme="black" last4="4821" style={{ transform: 'rotate(-16deg)' }} />
          </div>
        </div>
      </Layer>
      <Layer depth={44} className="right-[-8%] bottom-[16%] w-[280px] sm:right-[-4%] sm:w-[320px]">
        <div className="animate-[rise_1s_.6s_cubic-bezier(.2,.7,.2,1)_both]">
          <div className="animate-float [animation-delay:-2s]">
            <BankCard theme="orange" last4="0742" style={{ transform: 'rotate(12deg)' }} />
          </div>
        </div>
      </Layer>

      {/* Telefone */}
      <Layer depth={14} className="left-1/2 top-1/2">
        <div className="-translate-x-1/2 -translate-y-1/2">
          <div className="animate-[rise_1.1s_.25s_cubic-bezier(.2,.7,.2,1)_both]">
            <div style={{ transform: 'perspective(1400px) rotateY(-14deg) rotateX(6deg) rotateZ(2deg)' }}>
              <PhoneApp />
            </div>
          </div>
        </div>
      </Layer>

      {/* Chips flutuantes */}
      <Layer depth={60} className="right-[2%] top-[10%] sm:right-[4%]">
        <div className="animate-[rise_.9s_.9s_cubic-bezier(.2,.7,.2,1)_both]">
          <FloatingChip icon={Zap} title="Pix recebido" value="+ R$ 250,00" accent className="animate-float" />
        </div>
      </Layer>
      <Layer depth={70} className="left-[-2%] bottom-[8%] sm:left-[-4%]">
        <div className="animate-[rise_.9s_1.05s_cubic-bezier(.2,.7,.2,1)_both]">
          <FloatingChip icon={Percent} title="Cashback" value="até 5% de volta" className="animate-float [animation-delay:-3s]" />
        </div>
      </Layer>
      <Layer depth={52} className="left-[-2%] top-[48%] hidden sm:block">
        <div className="animate-[rise_.9s_1.2s_cubic-bezier(.2,.7,.2,1)_both]">
          <FloatingChip icon={Globe2} title="Conta Global" value="US$ 1.240,00" className="animate-float-slow" />
        </div>
      </Layer>

      {/* Moeda 3D */}
      <Layer depth={80} className="right-[10%] top-[40%] hidden sm:block">
        <div className="animate-[rise_.9s_1.3s_cubic-bezier(.2,.7,.2,1)_both]">
          <div className="animate-float [animation-delay:-1s]">
            <div className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-brand-300 via-brand-500 to-brand-700 shadow-glow">
              <div className="absolute inset-[6px] rounded-full border-2 border-white/40" />
              <Star className="h-8 w-8 fill-white text-white" />
            </div>
          </div>
        </div>
      </Layer>
    </div>
  )
}

function Ticker() {
  const items = [...TICKER, ...TICKER]
  return (
    <div className="relative overflow-hidden border-y border-ink-900/10 bg-white/60 py-5 backdrop-blur [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div className="flex w-max animate-marquee gap-10">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap text-[15px] font-medium tracking-[-0.01em] text-ink-500">
            {t}
            <span className="h-1.5 w-1.5 rotate-45 bg-brand-500" />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Hero({ onLogin }) {
  const ref = useRef(null)

  const onPointerMove = useCallback((e) => {
    if (e.pointerType === 'touch' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
    ref.current.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
  }, [])

  const onPointerLeave = useCallback(() => {
    ref.current?.style.setProperty('--px', 0)
    ref.current?.style.setProperty('--py', 0)
  }, [])

  return (
    <section id="topo" className="relative overflow-hidden pt-[120px]" ref={ref} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      {/* Fundo */}
      <div className="pointer-events-none absolute inset-0 grid-lines [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000,transparent)]" />
      <div className="pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-brand-200/50 blur-[120px]" />

      <div className="container-x relative grid items-center gap-6 pb-16 pt-8 lg:grid-cols-[1.05fr_1fr] lg:gap-4 lg:pb-24 lg:pt-14">
        <div className="relative z-10">
          <div className="animate-rise">
            <span className="eyebrow">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-500" />
                <span className="relative h-2 w-2 rounded-full bg-brand-500" />
              </span>
              Inter Reimagined · Conceito 2026
            </span>
          </div>

          <h1 className="display mt-7 whitespace-nowrap text-[clamp(44px,13vw,56px)] sm:text-[80px] lg:text-[76px] xl:text-[92px] 2xl:text-[100px]">
            <span className="block animate-[rise_.9s_.1s_cubic-bezier(.2,.7,.2,1)_both]">O seu dinheiro.</span>
            <span className="block animate-[rise_.9s_.2s_cubic-bezier(.2,.7,.2,1)_both]">
              O seu <span className="serif-accent text-brand-500">mundo.</span>
            </span>
            <span className="relative block animate-[rise_.9s_.3s_cubic-bezier(.2,.7,.2,1)_both] text-ink-300">
              Sem limites
              <span className="text-brand-500">.</span>
            </span>
          </h1>

          <p className="mt-8 max-w-[520px] animate-[rise_.9s_.4s_cubic-bezier(.2,.7,.2,1)_both] text-[18px] leading-relaxed text-ink-500 sm:text-[19px]">
            Conta, cartão, investimentos e compras em um único super app. Um banco pensado para quem vive sem
            fronteiras — <span className="text-ink-900">simples, global e gratuito</span>.
          </p>

          <div className="mt-10 flex animate-[rise_.9s_.5s_cubic-bezier(.2,.7,.2,1)_both] flex-col gap-3 sm:flex-row">
            <Button href="#abrir-conta" size="lg" icon>
              Abra sua conta
            </Button>
            <Button href="#produtos" variant="ghost" size="lg">
              Conheça o Inter
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </Button>
          </div>

          <div className="mt-12 flex animate-[rise_.9s_.6s_cubic-bezier(.2,.7,.2,1)_both] items-center gap-6">
            <div className="flex -space-x-3">
              {['#FF7A00', '#0B0B0C', '#FFA95C', '#45454B'].map((c, i) => (
                <span
                  key={c}
                  className="grid h-10 w-10 place-items-center rounded-full text-[12px] font-bold text-white ring-[3px] ring-[#FAFAF9]"
                  style={{ background: c }}
                >
                  {['A', 'M', 'J', 'R'][i]}
                </span>
              ))}
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1 text-brand-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
                <span className="ml-1 text-[14px] font-semibold text-ink-900">4,8</span>
              </div>
              <div className="mt-1 text-[13px] text-ink-400">Avaliação ilustrativa · demo</div>
            </div>
            <div className="hidden h-10 w-px bg-ink-900/10 sm:block" />
            <div className="hidden items-center gap-2 text-[13px] text-ink-400 sm:flex">
              <QrCode className="h-9 w-9 rounded-lg bg-white p-1.5 text-ink-900 shadow-soft" />
              <span className="leading-tight">
                Baixe o app
                <br />
                <span className="text-ink-900">iOS e Android</span>
              </span>
            </div>
          </div>
        </div>

        <div className="relative -mx-5 sm:mx-0">
          <div className="-mb-[110px] origin-top scale-[0.82] sm:mb-0 sm:scale-100">
            <HeroVisual />
          </div>
        </div>
      </div>

      <Ticker />
    </section>
  )
}
