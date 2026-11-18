import { useEffect, useState } from 'react'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import BankCard from '../ui/BankCard'
import { CARDS } from '../../data/content'
import { useTilt } from '../../hooks/useTilt'

const STACK = [
  { x: 0, y: 0, z: 0, r: -8, s: 1, o: 1 },
  { x: 7, y: -15, z: -80, r: -4, s: 0.93, o: 0.95 },
  { x: 14, y: -29, z: -160, r: 0, s: 0.86, o: 0.8 },
  { x: 21, y: -42, z: -240, r: 4, s: 0.79, o: 0.6 },
]

function CardStage({ active, onSelect }) {
  const tilt = useTilt({ max: 18, scale: 1.03 })
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px] [perspective:1600px]">
      {/* Halo */}
      <div className="absolute inset-[12%] rounded-full bg-[conic-gradient(from_180deg,#FF7A00,#FFE4CC,#FF7A00,#0B0B0C,#FF7A00)] opacity-25 blur-3xl" />
      <div className="absolute inset-[6%] animate-spin-slow rounded-full border border-dashed border-ink-900/10" />
      {/* Sombra no chão */}
      <div className="absolute bottom-[14%] left-1/2 h-10 w-[60%] -translate-x-1/2 rounded-[50%] bg-ink-900/25 blur-2xl" />

      <div className="preserve-3d absolute inset-0 grid place-items-center pt-[22%] pr-[8%]">
        {CARDS.map((c, i) => {
          const pos = (i - active + CARDS.length) % CARDS.length
          const p = STACK[pos]
          const isFront = pos === 0
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`Ver ${c.name}`}
              tabIndex={isFront ? -1 : 0}
              className="absolute w-[72%] transition-all duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)]"
              style={{
                transform: `translate3d(${p.x}%, ${p.y}%, ${p.z}px) rotate(${p.r}deg) scale(${p.s})`,
                opacity: p.o,
                zIndex: 10 - pos,
                cursor: isFront ? 'default' : 'pointer',
              }}
            >
              <div
                ref={isFront ? tilt.ref : undefined}
                onPointerMove={isFront ? tilt.onPointerMove : undefined}
                onPointerLeave={isFront ? tilt.onPointerLeave : undefined}
                className="transition-transform duration-300 ease-out"
              >
                <BankCard theme={c.id} last4={['0742', '9934', '1180', '7777'][i]} />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function Cards() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const card = CARDS[active]

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % CARDS.length), 5000)
    return () => clearInterval(id)
  }, [paused])

  const go = (d) => setActive((a) => (a + d + CARDS.length) % CARDS.length)

  return (
    <section id="cartoes" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-brand-100/70 blur-[120px]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Cartões"
          title={
            <>
              Um cartão para
              <br />
              cada <span className="serif-accent text-brand-500">momento.</span>
            </>
          }
          description="Do primeiro cartão ao mais exclusivo: todos sem burocracia, com cashback e controle total no app."
        />

        <div
          className="mt-14 grid items-center gap-10 lg:mt-20 lg:grid-cols-[1fr_1.15fr] lg:gap-16"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          <Reveal className="order-2 lg:order-1">
            <div className="flex flex-col gap-2" role="tablist" aria-label="Modelos de cartão">
              {CARDS.map((c, i) => {
                const on = i === active
                return (
                  <button
                    key={c.id}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(i)}
                    className={`group relative overflow-hidden rounded-3xl p-5 text-left transition-all duration-500 sm:p-6 ${
                      on ? 'bg-white shadow-lift ring-1 ring-ink-900/5' : 'hover:bg-white/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-[12px] text-ink-300">0{i + 1}</span>
                        <span
                          className={`text-[24px] font-semibold tracking-[-0.04em] transition-colors sm:text-[28px] ${
                            on ? 'text-ink-900' : 'text-ink-300 group-hover:text-ink-600'
                          }`}
                        >
                          {c.name}
                        </span>
                      </div>
                      <span
                        className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${on ? 'scale-100 bg-brand-500' : 'scale-0 bg-ink-200'}`}
                      />
                    </div>
                    <div
                      className={`grid transition-all duration-500 ease-out ${on ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="overflow-hidden pl-9">
                        <p className="text-[15px] text-ink-500">{c.tagline}</p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {c.perks.map((perk) => (
                            <li
                              key={perk}
                              className="inline-flex items-center gap-1.5 rounded-full bg-ink-50 px-3 py-1.5 text-[13px] font-medium text-ink-700"
                            >
                              <Check className="h-3.5 w-3.5 text-brand-500" strokeWidth={3} />
                              {perk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {/* Barra de progresso do autoplay */}
                    {on && !paused && (
                      <span key={active} className="absolute bottom-0 left-0 h-[3px] w-full origin-left animate-[progress_5s_linear] bg-brand-500" />
                    )}
                  </button>
                )
              })}
            </div>
            <div className="mt-8 flex items-center gap-3 pl-1">
              <Button href="#abrir-conta" variant="dark" icon>
                Peça o seu {card.name.replace('Inter ', '')}
              </Button>
              <button
                onClick={() => go(-1)}
                aria-label="Cartão anterior"
                className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-ink-900/15 transition hover:bg-white hover:ring-ink-900/30"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Próximo cartão"
                className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-ink-900/15 transition hover:bg-white hover:ring-ink-900/30"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </Reveal>

          <Reveal delay={120} className="order-1 lg:order-2">
            <CardStage active={active} onSelect={setActive} />
            <p className="mt-2 text-center text-[12px] text-ink-400">
              Cartões ilustrativos · passe o mouse para inclinar
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
