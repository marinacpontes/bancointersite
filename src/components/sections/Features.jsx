import { useEffect, useRef, useState } from 'react'
import { Wallet, LineChart, CreditCard, ShieldCheck, Plane, ShoppingBag, Smartphone, Zap, Globe2, Cpu } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { FEATURES } from '../../data/content'

/* ---------- Ilustrações por diferencial ---------- */

function V1() {
  const icons = [Wallet, CreditCard, LineChart, ShieldCheck, Plane, ShoppingBag, Smartphone, Zap, Globe2]
  return (
    <div className="grid grid-cols-3 gap-3">
      {icons.map((Icon, i) => (
        <div
          key={i}
          className={`grid aspect-square place-items-center rounded-3xl ${
            i === 4 ? 'bg-white text-brand-500 shadow-lift' : 'bg-white/10 text-white ring-1 ring-white/15'
          } animate-rise`}
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <Icon className="h-7 w-7" />
        </div>
      ))}
    </div>
  )
}

function V2() {
  const cats = [
    { l: 'Moradia', v: 82 },
    { l: 'Mercado', v: 56 },
    { l: 'Transporte', v: 34 },
    { l: 'Lazer', v: 22 },
  ]
  return (
    <div className="rounded-3xl bg-white p-6 text-ink-900 shadow-lift">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold">Gastos do mês · demo</span>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-600">−12% vs. anterior</span>
      </div>
      <div className="mt-6 space-y-4">
        {cats.map((c, i) => (
          <div key={c.l}>
            <div className="mb-1.5 flex justify-between text-[13px]">
              <span className="text-ink-500">{c.l}</span>
              <span className="font-mono">{c.v}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-ink-100">
              <div
                className="h-full origin-left animate-[progress_1.2s_cubic-bezier(.2,.8,.2,1)_both] rounded-full bg-brand-500"
                style={{ width: `${c.v}%`, animationDelay: `${i * 120}ms`, opacity: 1 - i * 0.18 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function V3() {
  const cities = [
    { n: 'Nova York', x: 22, y: 34 },
    { n: 'Lisboa', x: 48, y: 30 },
    { n: 'Tóquio', x: 84, y: 38 },
    { n: 'São Paulo', x: 34, y: 72 },
  ]
  const sp = cities[3]
  return (
    <div className="relative aspect-[4/3] w-full">
      <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {cities.slice(0, 3).map((c, i) => (
          <path
            key={c.n}
            d={`M${sp.x},${sp.y} Q${(sp.x + c.x) / 2},${Math.min(sp.y, c.y) - 22} ${c.x},${c.y}`}
            fill="none"
            stroke="white"
            strokeOpacity=".7"
            strokeWidth=".5"
            strokeDasharray="1.5 1.5"
            className="animate-rise"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </svg>
      {cities.map((c, i) => (
        <div
          key={c.n}
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-rise"
          style={{ left: `${c.x}%`, top: `${c.y}%`, animationDelay: `${i * 120}ms` }}
        >
          <span className="relative mx-auto block h-3 w-3">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-white" />
            <span className="relative block h-3 w-3 rounded-full bg-white" />
          </span>
          <span className="mt-2 block whitespace-nowrap rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
            {c.n}
          </span>
        </div>
      ))}
    </div>
  )
}

function V4() {
  const nodes = [
    { l: 'Banco', icon: Wallet, a: 0 },
    { l: 'Shop', icon: ShoppingBag, a: 72 },
    { l: 'Viagens', icon: Plane, a: 144 },
    { l: 'Seguros', icon: ShieldCheck, a: 216 },
    { l: 'Invest', icon: LineChart, a: 288 },
  ]
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[360px]">
      <div className="absolute inset-[18%] rounded-full border border-white/20" />
      <div className="absolute inset-[34%] grid place-items-center rounded-full bg-white text-[22px] font-bold tracking-[-0.06em] text-ink-900 shadow-lift">
        inter<span className="text-brand-500">.</span>
      </div>
      {nodes.map(({ l, icon: Icon, a }, i) => {
        const rad = ((a - 90) * Math.PI) / 180
        return (
          <div
            key={l}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 animate-rise flex-col items-center gap-1.5"
            style={{ left: `${50 + Math.cos(rad) * 38}%`, top: `${50 + Math.sin(rad) * 38}%`, animationDelay: `${i * 90}ms` }}
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-[11px] font-medium text-white/80">{l}</span>
          </div>
        )
      })}
    </div>
  )
}

function V5() {
  const lines = [
    ['deploy', 'app@v26.11', 'ok'],
    ['security', 'camadas: 7', 'ok'],
    ['latency', 'p95 · 48ms', 'ok'],
    ['features', '+12 esta semana', 'new'],
  ]
  return (
    <div className="overflow-hidden rounded-3xl bg-ink-900 font-mono text-[12.5px] shadow-card ring-1 ring-white/10">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
        <span className="ml-3 text-[11px] text-ink-500">status.demo</span>
      </div>
      <div className="space-y-2.5 p-5">
        {lines.map(([k, v, s], i) => (
          <div key={k} className="flex animate-rise items-center gap-3" style={{ animationDelay: `${i * 140}ms` }}>
            <span className="text-brand-500">›</span>
            <span className="w-20 text-ink-400">{k}</span>
            <span className="flex-1 text-white">{v}</span>
            <span className={`rounded px-1.5 py-0.5 text-[10px] uppercase ${s === 'new' ? 'bg-brand-500 text-white' : 'bg-emerald-500/15 text-emerald-400'}`}>
              {s}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2 pt-1 text-ink-500">
          <Cpu className="h-3.5 w-3.5" /> sistema ilustrativo
          <span className="ml-1 inline-block h-3.5 w-1.5 animate-pulse bg-brand-500" />
        </div>
      </div>
    </div>
  )
}

const VISUALS = [V1, V2, V3, V4, V5]

export default function Features() {
  const [active, setActive] = useState(0)
  const refs = useRef([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const Visual = VISUALS[active]

  return (
    <section id="diferenciais" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Diferenciais"
          title={
            <>
              Feito para a vida
              <br />
              <span className="serif-accent text-brand-500">real</span> — e global.
            </>
          }
          description="Cinco princípios que guiam cada pixel e cada linha de código do app."
        />

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* Painel sticky */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <div className="grain relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[40px] bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 p-10 shadow-card">
                <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-60" />
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/20" />
                <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/20" />
                <div className="absolute left-8 top-8 font-mono text-[13px] text-white/70">{FEATURES[active].n} / 05</div>
                <div className="absolute right-8 top-8 flex gap-1.5">
                  {FEATURES.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
                    />
                  ))}
                </div>
                <div key={active} className="relative w-full max-w-[380px]">
                  <Visual />
                </div>
              </div>
            </div>
          </div>

          {/* Lista */}
          <ol className="relative">
            {FEATURES.map((f, i) => {
              const V = VISUALS[i]
              const on = i === active
              return (
                <li
                  key={f.n}
                  ref={(el) => (refs.current[i] = el)}
                  data-index={i}
                  className="border-t border-ink-900/10 py-10 last:border-b lg:flex lg:min-h-[52vh] lg:flex-col lg:justify-center lg:py-16"
                >
                  <div className="flex items-baseline gap-5">
                    <span className={`font-mono text-[14px] transition-colors duration-500 ${on ? 'text-brand-500' : 'text-ink-300'}`}>
                      {f.n}
                    </span>
                    <div>
                      <h3
                        className={`text-[34px] font-semibold leading-[1] tracking-[-0.045em] transition-colors duration-500 sm:text-[48px] ${
                          on ? 'text-ink-900' : 'lg:text-ink-300'
                        }`}
                      >
                        {f.title}
                      </h3>
                      <p
                        className={`mt-5 max-w-md text-[17px] leading-relaxed text-ink-500 transition-all duration-500 ${
                          on ? 'lg:opacity-100' : 'lg:opacity-40'
                        }`}
                      >
                        {f.text}
                      </p>
                    </div>
                  </div>
                  {/* Visual inline no mobile */}
                  <div className="mt-8 grid place-items-center overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 p-6 sm:p-10 lg:hidden">
                    <div className="w-full max-w-[360px]">
                      <V />
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
