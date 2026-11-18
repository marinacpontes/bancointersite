import { useState } from 'react'
import { Wallet, CreditCard, LineChart, HandCoins, ShoppingBag, Globe2, ArrowUpRight, Zap, Check } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import BankCard from '../ui/BankCard'
import { useSpotlight } from '../../hooks/useSpotlight'

/* Shell reutilizável para cada card de produto */
function ProductCard({ icon: Icon, title, text, tone = 'light', spot, className = '', iconClass = '', children, delay = 0 }) {
  const onMove = useSpotlight()
  const tones = {
    light: 'bg-white text-ink-900 ring-ink-900/[0.06]',
    dark: 'bg-ink-900 text-white ring-white/[0.06]',
    orange: 'bg-brand-500 text-white ring-white/10',
    cream: 'bg-brand-50 text-ink-900 ring-brand-500/10',
    gray: 'bg-ink-100 text-ink-900 ring-ink-900/[0.04]',
  }
  const muted = tone === 'dark' ? 'text-ink-300' : tone === 'orange' ? 'text-white/80' : 'text-ink-500'
  return (
    <Reveal delay={delay} className={className}>
      <article
        onPointerMove={onMove}
        style={{ '--spot': spot }}
        className={`spotlight group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-[32px] p-7 ring-1 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-lift sm:p-9 ${tones[tone]}`}
      >
        <div className="relative z-10 flex items-start justify-between">
          <span className={`grid h-12 w-12 place-items-center rounded-2xl ${iconClass}`}>
            <Icon className="h-[22px] w-[22px]" />
          </span>
          <a
            href="#abrir-conta"
            aria-label={`Saiba mais sobre ${title}`}
            className={`grid h-11 w-11 place-items-center rounded-full ring-1 transition-all duration-500 group-hover:rotate-45 ${
              tone === 'dark' || tone === 'orange'
                ? 'ring-white/20 group-hover:bg-white group-hover:text-ink-900'
                : 'ring-ink-900/10 group-hover:bg-ink-900 group-hover:text-white'
            }`}
          >
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>
        <div className="relative z-10 mt-6 max-w-sm">
          <h3 className="text-[28px] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[32px]">{title}</h3>
          <p className={`mt-3 text-[15.5px] leading-relaxed ${muted}`}>{text}</p>
        </div>
        <div className="relative mt-auto pt-8">{children}</div>
      </article>
    </Reveal>
  )
}

/* ---------- Visuais de cada produto ---------- */

function DigitalVisual() {
  const items = [
    { label: 'Pix', sub: 'Ilimitado e gratuito' },
    { label: 'TED', sub: 'Sem tarifa' },
    { label: 'Boletos', sub: 'Pague com 1 toque' },
  ]
  return (
    <div className="grid gap-4 sm:grid-cols-[1.2fr_1fr]">
      <div className="relative overflow-hidden rounded-3xl bg-ink-50 p-5 ring-1 ring-ink-900/5">
        <div className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink-400">Transferência · demo</div>
        <div className="mt-3 flex items-baseline gap-1 text-[44px] font-semibold tracking-[-0.05em]">
          <span className="text-[20px] text-ink-400">R$</span>1.500<span className="text-ink-300">,00</span>
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-soft">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-500 text-white">
            <Zap className="h-5 w-5" />
          </span>
          <div className="flex-1 leading-tight">
            <div className="text-[13px] font-semibold">Enviado via Pix</div>
            <div className="text-[12px] text-ink-400">em 2 segundos</div>
          </div>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-500 text-white transition-transform duration-500 group-hover:scale-110">
            <Check className="h-4 w-4" strokeWidth={3} />
          </span>
        </div>
      </div>
      <ul className="flex flex-col justify-end gap-2">
        {items.map((it, i) => (
          <li
            key={it.label}
            className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 ring-1 ring-ink-900/[0.06] transition-all duration-500 group-hover:translate-x-1"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <span className="text-[15px] font-semibold">{it.label}</span>
            <span className="text-[13px] text-ink-400">{it.sub}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CardsVisual() {
  return (
    <div className="relative h-48">
      <div className="absolute left-1/2 top-4 w-[240px] -translate-x-1/2 transition-all duration-700 ease-out group-hover:-translate-x-[70%] group-hover:-rotate-[10deg]">
        <BankCard theme="black" last4="1180" />
      </div>
      <div className="absolute left-1/2 top-10 w-[240px] -translate-x-1/2 transition-all duration-700 ease-out group-hover:-translate-x-[30%] group-hover:rotate-[8deg] group-hover:translate-y-2">
        <BankCard theme="platinum" last4="9934" />
      </div>
    </div>
  )
}

function InvestVisual() {
  const d = 'M0 90 C 30 80, 40 85, 60 70 S 100 72, 120 55 S 160 50, 180 38 S 220 30, 260 12'
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[12px] uppercase tracking-[0.14em] text-ink-400">Rentabilidade · demo</div>
          <div className="mt-1 text-[40px] font-semibold tracking-[-0.05em] text-white">
            +18,2<span className="text-brand-500">%</span>
          </div>
        </div>
        <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[12px] font-medium text-emerald-400">12 meses</span>
      </div>
      <svg viewBox="0 0 260 100" className="mt-4 h-28 w-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="pv-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#FF7A00" stopOpacity=".45" />
            <stop offset="1" stopColor="#FF7A00" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${d} L260 100 L0 100 Z`} fill="url(#pv-fill)" />
        <path d={d} fill="none" stroke="#FF7A00" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="260" cy="12" r="5" fill="#FF7A00" className="animate-pulse" />
      </svg>
    </div>
  )
}

function LoanVisual() {
  const [value, setValue] = useState(15000)
  const pct = ((value - 1000) / (50000 - 1000)) * 100
  return (
    <div className="rounded-3xl bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between text-[12px] font-medium uppercase tracking-[0.14em] text-ink-400">
        <span>Simulação ilustrativa</span>
        <span>24x</span>
      </div>
      <div className="mt-2 text-[34px] font-semibold tracking-[-0.05em]">
        R$ {value.toLocaleString('pt-BR')}
      </div>
      <input
        type="range"
        min={1000}
        max={50000}
        step={500}
        value={value}
        onChange={(e) => setValue(+e.target.value)}
        aria-label="Valor ilustrativo do empréstimo"
        className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-ink-100 accent-brand-500 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-500 [&::-webkit-slider-thumb]:shadow-glow"
        style={{ background: `linear-gradient(90deg,#FF7A00 ${pct}%,#ECECEF ${pct}%)` }}
      />
      <div className="mt-3 text-[13px] text-ink-400">Valores meramente ilustrativos, sem simulação real.</div>
    </div>
  )
}

function ShopVisual() {
  const tiles = [
    { name: 'Tech', cb: '6%', bg: 'bg-ink-900 text-white' },
    { name: 'Moda', cb: '4%', bg: 'bg-white' },
    { name: 'Viagem', cb: '8%', bg: 'bg-brand-500 text-white' },
    { name: 'Casa', cb: '3%', bg: 'bg-white' },
  ]
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {tiles.map((t, i) => (
        <div
          key={t.name}
          className={`flex aspect-[1.25] flex-col justify-between rounded-2xl p-3.5 shadow-soft ring-1 ring-ink-900/5 transition-transform duration-500 group-hover:-translate-y-1 ${t.bg}`}
          style={{ transitionDelay: `${i * 50}ms` }}
        >
          <ShoppingBag className="h-4 w-4 opacity-60" />
          <div className="leading-tight">
            <div className="text-[13px] font-semibold">{t.name}</div>
            <div className="text-[11px] opacity-60">{t.cb} cashback</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function GlobalVisual() {
  const currencies = [
    { c: 'USD', v: '1.240,00', f: 'US$' },
    { c: 'EUR', v: '860,50', f: '€' },
    { c: 'GBP', v: '415,20', f: '£' },
  ]
  return (
    <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
      <div className="flex flex-wrap gap-3">
        {currencies.map((cur, i) => (
          <div
            key={cur.c}
            className="glass-dark flex min-w-[170px] items-center gap-3 rounded-2xl p-3 pr-5 ring-1 ring-white/10 transition-transform duration-500 group-hover:-translate-y-1"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-[15px] font-semibold text-white">
              {cur.f}
            </span>
            <span className="leading-tight">
              <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-ink-400">{cur.c} · demo</span>
              <span className="block text-[17px] font-semibold tracking-[-0.02em] text-white">{cur.v}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Globe() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="gl" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#FFA95C" />
          <stop offset=".45" stopColor="#FF7A00" />
          <stop offset="1" stopColor="#3D1C00" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="170" fill="url(#gl)" />
      <g fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="1">
        {[0.25, 0.5, 0.75, 1].map((k) => (
          <ellipse key={`v${k}`} cx="200" cy="200" rx={170 * k} ry="170" />
        ))}
        {[-120, -60, 0, 60, 120].map((y) => (
          <ellipse key={`h${y}`} cx="200" cy={200 + y} rx={Math.sqrt(170 ** 2 - y ** 2)} ry={Math.sqrt(170 ** 2 - y ** 2) * 0.16} />
        ))}
      </g>
      <g className="origin-center animate-spin-slow" style={{ transformOrigin: '200px 200px' }}>
        <ellipse cx="200" cy="200" rx="196" ry="60" fill="none" stroke="rgba(255,255,255,.5)" strokeDasharray="2 6" transform="rotate(-20 200 200)" />
        <circle cx="390" cy="160" r="6" fill="#fff" />
      </g>
    </svg>
  )
}

export default function Products() {
  return (
    <section id="produtos" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Produtos e serviços"
          title={
            <>
              Tudo em um app.
              <br />
              <span className="serif-accent text-brand-500">Nada</span> de complicação.
            </>
          }
          description="Seis frentes, uma experiência. Cada produto foi desenhado para funcionar sozinho — e ficar ainda melhor junto com os outros."
        />

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          <ProductCard
            className="md:col-span-2"
            icon={Wallet}
            title="Conta digital"
            text="Conta gratuita com Pix, TED e boletos sem tarifa. Abra em minutos, direto pelo celular."
            iconClass="bg-brand-500 text-white"
          >
            <DigitalVisual />
          </ProductCard>

          <ProductCard
            icon={CreditCard}
            title="Cartões de crédito"
            text="Sem anuidade, com cashback e controle total pelo app."
            tone="orange"
            spot="rgba(255,255,255,.22)"
            iconClass="bg-white text-brand-500"
            delay={80}
          >
            <CardsVisual />
          </ProductCard>

          <ProductCard
            icon={LineChart}
            title="Investimentos"
            text="De renda fixa a ações globais, com curadoria e zero burocracia."
            tone="dark"
            spot="rgba(255,122,0,.22)"
            iconClass="bg-white/10 text-brand-500"
          >
            <InvestVisual />
          </ProductCard>

          <ProductCard
            icon={HandCoins}
            title="Empréstimos"
            text="Crédito transparente, com taxas claras e parcelas que cabem no bolso."
            tone="gray"
            iconClass="bg-ink-900 text-white"
            delay={80}
          >
            <LoanVisual />
          </ProductCard>

          <ProductCard
            icon={ShoppingBag}
            title="Inter Shop"
            text="Compre nas suas lojas favoritas e receba parte do valor de volta na conta."
            tone="cream"
            iconClass="bg-brand-500 text-white"
            delay={160}
          >
            <ShopVisual />
          </ProductCard>

          <Reveal className="md:col-span-2 lg:col-span-3">
            <article className="group relative overflow-hidden rounded-[32px] bg-ink-900 p-7 text-white ring-1 ring-white/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift sm:p-10 lg:p-12">
              <div className="pointer-events-none absolute inset-0 grid-lines-dark [mask-image:linear-gradient(90deg,#000,transparent_70%)]" />
              <div className="pointer-events-none absolute -bottom-32 -right-20 h-[380px] w-[380px] opacity-90 transition-transform duration-[1.2s] ease-out group-hover:rotate-12 group-hover:scale-105 sm:-bottom-40 sm:right-0 sm:h-[520px] sm:w-[520px] lg:-bottom-24 lg:right-10">
                <Globe />
              </div>
              <div className="relative z-10 max-w-xl">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-500 text-white">
                    <Globe2 className="h-[22px] w-[22px]" />
                  </span>
                  <span className="eyebrow-dark">Conta Global</span>
                </div>
                <h3 className="display mt-8 text-[44px] sm:text-[64px]">
                  O mundo inteiro
                  <br />
                  <span className="serif-accent text-brand-500">na sua conta.</span>
                </h3>
                <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-300">
                  Conta em dólar, cartão internacional e câmbio transparente. Viaje, compre e invista lá fora como se
                  estivesse em casa.
                </p>
                <div className="mt-10 pb-40 sm:pb-24 lg:pb-0">
                  <GlobalVisual />
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
