import { Apple, Play } from 'lucide-react'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import BankCard from '../ui/BankCard'

export default function CTA({ onOpen }) {
  return (
    <section id="abrir-conta" className="relative pb-24 sm:pb-32">
      <div className="container-x">
        <Reveal>
          <div className="grain relative overflow-hidden rounded-[40px] bg-brand-500 px-6 py-16 text-white shadow-glow sm:px-12 sm:py-20 lg:px-20 lg:py-24">
            <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-50 [mask-image:linear-gradient(90deg,transparent,#000)]" />
            <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-white/15 blur-3xl" />
            <div className="relative grid items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <h2 className="display text-[52px] sm:text-[80px] lg:text-[96px]">
                  Abra sua conta.
                  <br />
                  <span className="serif-accent text-ink-900">Em minutos.</span>
                </h2>
                <p className="mt-6 max-w-md text-[18px] leading-relaxed text-white/85">
                  Gratuita, completa e 100% digital. Baixe o app e descubra um jeito mais leve de cuidar do seu dinheiro.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Button variant="dark" size="lg" onClick={onOpen}>
                    <Apple className="h-5 w-5" /> App Store
                  </Button>
                  <Button variant="light" size="lg" onClick={onOpen}>
                    <Play className="h-5 w-5 fill-current" /> Google Play
                  </Button>
                </div>
                <p className="mt-5 text-[12.5px] text-white/70">Botões demonstrativos — este site conceitual não direciona para lojas reais.</p>
              </div>
              <div className="relative mx-auto h-[300px] w-full max-w-[420px] sm:h-[360px]">
                <div className="absolute left-0 top-0 w-[78%] animate-float-slow">
                  <BankCard theme="black" last4="2026" style={{ transform: 'rotate(-12deg)' }} />
                </div>
                <div className="absolute bottom-0 right-0 w-[78%] animate-float [animation-delay:-2s]">
                  <BankCard theme="global" last4="0101" style={{ transform: 'rotate(8deg)' }} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
