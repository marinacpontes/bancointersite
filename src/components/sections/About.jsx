import { useEffect, useRef, useState } from 'react'
import Reveal from '../ui/Reveal'

const MANIFESTO =
  'Acreditamos que um banco não deveria parecer um banco. Deveria parecer o seu app favorito: rápido, bonito, transparente — e pronto para levar você a qualquer lugar do mundo.'

/** Palavras acendem conforme a seção é rolada. */
export default function About() {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)
  const words = MANIFESTO.split(' ')

  useEffect(() => {
    let raf
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const vh = window.innerHeight
        const p = (vh * 0.85 - r.top) / (r.height + vh * 0.35)
        setProgress(Math.max(0, Math.min(1, p)))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const lit = Math.round(progress * words.length)

  return (
    <section id="sobre" className="relative py-24 sm:py-36">
      <div className="container-x">
        <Reveal>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Sobre nós
          </span>
        </Reveal>
        <p ref={ref} className="mt-10 max-w-[1100px] text-[34px] font-semibold leading-[1.08] tracking-[-0.045em] sm:text-[52px] lg:text-[64px]">
          {words.map((w, i) => {
            const accent = /banco|mundo\.?|app/i.test(w)
            return (
              <span
                key={i}
                className={`transition-colors duration-300 ${
                  i < lit ? (accent ? 'text-brand-500' : 'text-ink-900') : 'text-ink-200'
                }`}
              >
                {w}{' '}
              </span>
            )
          })}
        </p>

        <div className="mt-20 grid gap-px overflow-hidden rounded-[28px] bg-ink-900/10 ring-1 ring-ink-900/10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['2026', 'Ano deste conceito'],
            ['100%', 'Digital, do cadastro ao suporte'],
            ['24/7', 'Atendimento (ilustrativo)'],
            ['∞', 'Possibilidades no super app'],
          ].map(([n, l], i) => (
            <Reveal key={l} delay={i * 80} className="bg-[#FAFAF9] p-8 transition-colors hover:bg-white">
              <div className="text-[48px] font-semibold tracking-[-0.05em]">{n}</div>
              <div className="mt-1 text-[14px] text-ink-500">{l}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
