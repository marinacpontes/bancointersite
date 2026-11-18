import { Instagram, Linkedin, Youtube, Twitter, ArrowUp } from 'lucide-react'
import Logo from '../ui/Logo'
import { FOOTER_LINKS } from '../../data/content'

const SOCIAL = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Twitter, label: 'X' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Youtube, label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-900 pt-20 text-white">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[400px] w-[900px] -translate-x-1/2 rounded-full bg-brand-500/15 blur-[140px]" />
      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink-400">
              Uma releitura conceitual de um banco digital brasileiro — imaginada como se uma agência premium tivesse
              redesenhado tudo do zero.
            </p>
            <div className="mt-8 flex gap-2">
              {SOCIAL.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#topo"
                  aria-label={`${label} (link ilustrativo)`}
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/5 text-ink-300 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-500 hover:text-white hover:ring-brand-500"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {FOOTER_LINKS.map((col) => (
              <div key={col.title}>
                <h4 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-500">{col.title}</h4>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#topo" className="text-[15px] text-ink-300 transition-colors hover:text-brand-400">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 rounded-[24px] bg-white/[0.03] p-6 text-[13px] leading-relaxed text-ink-400 ring-1 ring-white/10 sm:grid-cols-3">
          <div>
            <div className="font-semibold text-ink-200">Atendimento (fictício)</div>
            <div className="mt-1">0800 000 0000 · 24h</div>
          </div>
          <div>
            <div className="font-semibold text-ink-200">Ouvidoria (fictícia)</div>
            <div className="mt-1">0800 000 0001 · dias úteis, 9h às 18h</div>
          </div>
          <div>
            <div className="font-semibold text-ink-200">Endereço (fictício)</div>
            <div className="mt-1">Av. Exemplo, 1000 · Cidade Imaginária · BR</div>
          </div>
        </div>

        <p className="mt-8 max-w-4xl text-[12.5px] leading-relaxed text-ink-500">
          <strong className="text-ink-300">Aviso:</strong> este é um projeto independente, conceitual e não oficial,
          criado para fins de estudo e de uma trend de design. Não possui qualquer vínculo com o Banco Inter S.A. ou
          empresas do grupo. Todos os números, cartões, telefones, endereços e valores exibidos são fictícios. Nenhum dado
          é coletado e nenhuma operação financeira é realizada neste site.
        </p>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-white/10 py-8 sm:flex-row sm:items-center">
          <span className="text-[13px] text-ink-500">© 2026 Inter Reimagined · Projeto conceitual</span>
          <a
            href="#topo"
            className="group inline-flex items-center gap-2 text-[13px] font-medium text-ink-300 transition-colors hover:text-white"
          >
            Voltar ao topo
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 transition-all group-hover:-translate-y-0.5 group-hover:bg-brand-500">
              <ArrowUp className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>

        {/* Wordmark gigante */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <div className="-mb-[0.22em] text-center text-[34vw] font-bold leading-[0.8] tracking-[-0.08em] text-white/[0.04]">
          inter<span className="text-brand-500/40">.</span>
        </div>
      </div>
    </footer>
  )
}
