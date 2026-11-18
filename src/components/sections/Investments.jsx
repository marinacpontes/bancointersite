import { useEffect, useMemo, useState } from 'react'
import { Info, ArrowUpRight, ArrowDownRight, ShieldCheck, Layers, Globe2 } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { PORTFOLIO, ALLOCATION, ASSETS } from '../../data/content'
import { useReveal } from '../../hooks/useReveal'
import { useCountUp } from '../../hooks/useCountUp'

const W = 640
const H = 260
const PAD = { t: 20, r: 12, b: 28, l: 12 }
const BASE = 48250 // patrimônio fictício inicial

/* Converte pontos em curva suave (Catmull-Rom → Bézier) */
function smoothPath(pts) {
  if (pts.length < 2) return ''
  let d = `M${pts[0][0]},${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`
  }
  return d
}

const fmtBRL = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function PortfolioChart({ data, period }) {
  const [hover, setHover] = useState(null)
  const [drawn, setDrawn] = useState(false)

  const { pts, line, area } = useMemo(() => {
    const min = Math.min(...data) * 0.98
    const max = Math.max(...data) * 1.01
    const pts = data.map((v, i) => [
      PAD.l + (i / (data.length - 1)) * (W - PAD.l - PAD.r),
      PAD.t + (1 - (v - min) / (max - min)) * (H - PAD.t - PAD.b),
    ])
    const line = smoothPath(pts)
    return { pts, line, area: `${line} L${pts.at(-1)[0]},${H - PAD.b} L${pts[0][0]},${H - PAD.b} Z` }
  }, [data])

  useEffect(() => {
    setDrawn(false)
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setDrawn(true)))
    return () => cancelAnimationFrame(id)
  }, [period])

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * W
    const i = Math.round(((x - PAD.l) / (W - PAD.l - PAD.r)) * (data.length - 1))
    setHover(Math.max(0, Math.min(data.length - 1, i)))
  }

  const hi = hover ?? data.length - 1
  const [hx, hy] = pts[hi]
  const val = (BASE * data[hi]) / 100

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full touch-none overflow-visible"
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
        role="img"
        aria-label={`Gráfico ilustrativo de evolução da carteira no período ${period}`}
      >
        <defs>
          <linearGradient id="inv-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#FF7A00" stopOpacity=".35" />
            <stop offset="1" stopColor="#FF7A00" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="inv-line" x1="0" x2="1">
            <stop offset="0" stopColor="#FFA95C" />
            <stop offset="1" stopColor="#FF7A00" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={0}
            x2={W}
            y1={PAD.t + (i * (H - PAD.t - PAD.b)) / 4}
            y2={PAD.t + (i * (H - PAD.t - PAD.b)) / 4}
            stroke="rgba(255,255,255,.06)"
            strokeDasharray="3 5"
          />
        ))}
        <path d={area} fill="url(#inv-area)" className={`transition-opacity duration-1000 ${drawn ? 'opacity-100' : 'opacity-0'}`} />
        <path
          d={line}
          fill="none"
          stroke="url(#inv-line)"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength="1"
          style={{ '--len': 1 }}
          className={`draw-line ${drawn ? 'is-drawn' : ''}`}
        />
        <line x1={hx} x2={hx} y1={PAD.t} y2={H - PAD.b} stroke="rgba(255,255,255,.25)" strokeDasharray="2 4" />
        <circle cx={hx} cy={hy} r="12" fill="#FF7A00" opacity=".2" />
        <circle cx={hx} cy={hy} r="5.5" fill="#FF7A00" stroke="#0B0B0C" strokeWidth="2.5" />
      </svg>
      <div
        className="pointer-events-none absolute top-0 -translate-x-1/2 -translate-y-[110%] rounded-xl bg-white px-3 py-2 text-ink-900 shadow-lift transition-[left] duration-150"
        style={{ left: `clamp(60px, ${(hx / W) * 100}%, calc(100% - 60px))` }}
      >
        <div className="whitespace-nowrap text-[13px] font-semibold tracking-[-0.02em]">{fmtBRL(val)}</div>
        <div className="text-[10.5px] text-ink-400">Ponto {hi + 1} · fictício</div>
      </div>
    </div>
  )
}

function Donut() {
  const R = 54
  const C = 2 * Math.PI * R
  let acc = 0
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className="flex items-center gap-6">
      <svg viewBox="0 0 140 140" className="h-32 w-32 shrink-0 -rotate-90">
        <circle cx="70" cy="70" r={R} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="16" />
        {ALLOCATION.map((a) => {
          const len = (a.value / 100) * C
          const el = (
            <circle
              key={a.label}
              cx="70"
              cy="70"
              r={R}
              fill="none"
              stroke={a.color}
              strokeWidth="16"
              strokeDasharray={`${visible ? len - 3 : 0} ${C}`}
              strokeDashoffset={-acc}
              className="transition-[stroke-dasharray] duration-[1.4s] ease-out"
            />
          )
          acc += len
          return el
        })}
      </svg>
      <ul className="flex-1 space-y-2.5">
        {ALLOCATION.map((a) => (
          <li key={a.label} className="flex items-center justify-between gap-3 text-[14px]">
            <span className="flex items-center gap-2.5 text-ink-300">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: a.color }} />
              {a.label}
            </span>
            <span className="font-mono text-[13px] text-white">{a.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Spark({ data, up }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 64},${22 - ((v - min) / (max - min || 1)) * 20}`).join(' ')
  return (
    <svg viewBox="0 0 64 24" className="hidden h-6 w-16 sm:block" aria-hidden="true">
      <polyline points={pts} fill="none" stroke={up ? '#FF7A00' : '#6E6E76'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Stat({ value, suffix, decimals = 0, label, start }) {
  const v = useCountUp(value, { start, decimals })
  return (
    <div className="border-t border-white/10 pt-6">
      <div className="text-[44px] font-semibold tracking-[-0.05em] text-white sm:text-[56px]">
        {v.toLocaleString('pt-BR', { minimumFractionDigits: decimals })}
        <span className="text-brand-500">{suffix}</span>
      </div>
      <div className="mt-1 text-[14px] text-ink-400">{label}</div>
    </div>
  )
}

export default function Investments() {
  const [period, setPeriod] = useState('1A')
  const data = PORTFOLIO[period]
  const change = data.at(-1) - 100
  const [statsRef, statsVisible] = useReveal()
  const total = useCountUp((BASE * data.at(-1)) / 100, { start: true, decimals: 2, duration: 1000 })

  return (
    <section id="investimentos" className="grain relative overflow-hidden bg-ink-900 py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0 grid-lines-dark [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[140px]" />

      <div className="container-x relative">
        <SectionHeading
          tone="dark"
          eyebrow="Investimentos"
          title={
            <>
              Faça o seu dinheiro
              <br />
              trabalhar <span className="serif-accent text-brand-500">por você.</span>
            </>
          }
          description="Uma plataforma de investimentos com a clareza de um app de mercado global. Acompanhe, compare e diversifique em tempo real."
          aside={
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-3 py-1.5 text-[12.5px] font-medium text-brand-300 ring-1 ring-brand-500/30">
              <Info className="h-3.5 w-3.5" /> Dados fictícios · apenas demonstração
            </span>
          }
        />

        <Reveal className="mt-16">
          <div className="glass-dark relative overflow-hidden rounded-[36px] p-5 ring-1 ring-white/10 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
              {/* Painel principal */}
              <div>
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[13px] text-ink-400">
                      Patrimônio total
                      <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-ink-300">
                        demo
                      </span>
                    </div>
                    <div className="mt-2 text-[40px] font-semibold tracking-[-0.05em] sm:text-[52px]">{fmtBRL(total)}</div>
                    <div
                      className={`mt-1 inline-flex items-center gap-1 text-[14px] font-medium ${
                        change >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {change >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      {change.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}% no período
                    </div>
                  </div>
                  <div className="flex rounded-full bg-white/5 p-1 ring-1 ring-white/10" role="tablist" aria-label="Período">
                    {Object.keys(PORTFOLIO).map((p) => (
                      <button
                        key={p}
                        role="tab"
                        aria-selected={p === period}
                        onClick={() => setPeriod(p)}
                        className={`relative h-9 rounded-full px-4 text-[13px] font-semibold transition-all duration-300 ${
                          p === period ? 'bg-brand-500 text-white shadow-glow' : 'text-ink-400 hover:text-white'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-12">
                  <PortfolioChart data={data} period={period} />
                </div>
              </div>

              {/* Lateral */}
              <div className="flex flex-col gap-6">
                <div className="rounded-3xl bg-white/[0.03] p-6 ring-1 ring-white/10">
                  <div className="mb-5 text-[13px] font-medium uppercase tracking-[0.14em] text-ink-400">Alocação</div>
                  <Donut />
                </div>
                <div className="rounded-3xl bg-white/[0.03] p-2 ring-1 ring-white/10">
                  {ASSETS.map((a) => (
                    <div
                      key={a.code}
                      className="flex cursor-default items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-white/5"
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 font-mono text-[10px] font-medium text-ink-300 ring-1 ring-white/10">
                        {a.code.split('-')[0]}
                      </span>
                      <div className="min-w-0 flex-1 leading-tight">
                        <div className="truncate text-[14px] font-medium">{a.name}</div>
                        <div className="font-mono text-[11px] text-ink-500">{a.code}</div>
                      </div>
                      <Spark data={a.spark} up={a.up} />
                      <span className={`w-14 text-right font-mono text-[13px] ${a.up ? 'text-emerald-400' : 'text-ink-400'}`}>
                        {a.yield}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div ref={statsRef} className="mt-16 grid gap-8 sm:grid-cols-3">
          <Stat value={1} suffix=" real" label="Para começar a investir (ilustrativo)" start={statsVisible} />
          <Stat value={600} suffix="+" label="Produtos disponíveis (fictício)" start={statsVisible} />
          <Stat value={0} suffix="%" label="Taxa de corretagem (ilustrativo)" start={statsVisible} />
        </div>

        <Reveal className="mt-16 flex flex-col items-start justify-between gap-8 rounded-[28px] bg-white/[0.03] p-6 ring-1 ring-white/10 sm:flex-row sm:items-center sm:p-8">
          <div className="flex flex-wrap gap-6 text-[14px] text-ink-300">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-500" /> Segurança em camadas
            </span>
            <span className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-brand-500" /> Carteiras recomendadas
            </span>
            <span className="flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-brand-500" /> Ativos internacionais
            </span>
          </div>
          <Button href="#abrir-conta" icon>
            Começar a investir
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
