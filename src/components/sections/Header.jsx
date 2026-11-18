import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import { NAV } from '../../data/content'
import { useScrolled } from '../../hooks/useScrolled'

export default function Header({ onLogin }) {
  const scrolled = useScrolled(24)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Faixa de aviso */}
      <div className="bg-ink-900 text-center text-[11px] font-medium tracking-wide text-ink-300">
        <div className="container-x py-1.5">
          Projeto conceitual e não oficial · <span className="text-brand-400">Sem vínculo com o Banco Inter</span>
        </div>
      </div>

      <div className={`container-x transition-all duration-500 ${scrolled ? 'pt-3' : 'pt-5'}`}>
        <nav
          className={`flex items-center justify-between rounded-full pl-5 pr-2 transition-all duration-500 ${
            scrolled ? 'glass h-[60px] shadow-lift ring-1 ring-ink-900/5' : 'h-[64px] bg-transparent'
          }`}
          aria-label="Principal"
        >
          <a href="#topo" aria-label="Inter — início" className="shrink-0">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="group relative rounded-full px-4 py-2 text-[14.5px] font-medium text-ink-600 transition-colors hover:text-ink-900"
                >
                  {item.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-brand-500 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button variant="dark" size="sm" onClick={onLogin} className="hidden sm:inline-flex">
              Acesse sua conta
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              className="grid h-11 w-11 place-items-center rounded-full bg-ink-900 text-white transition-transform active:scale-95 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 top-0 -z-10 bg-ink-900 transition-[clip-path] duration-700 ease-[cubic-bezier(.7,0,.2,1)] lg:hidden ${
          open ? '[clip-path:circle(150%_at_calc(100%-44px)_70px)]' : '[clip-path:circle(0%_at_calc(100%-44px)_70px)]'
        }`}
      >
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-500/30 blur-3xl" />
        <div className="container-x flex h-full flex-col pb-10 pt-32">
          <ul className="flex flex-col">
            {NAV.map((item, i) => (
              <li
                key={item.label}
                className="border-b border-white/10 transition-all duration-500"
                style={{
                  transitionDelay: open ? `${150 + i * 60}ms` : '0ms',
                  opacity: open ? 1 : 0,
                  transform: open ? 'none' : 'translateY(20px)',
                }}
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-5 text-[34px] font-semibold tracking-[-0.04em] text-white"
                >
                  {item.label}
                  <ArrowUpRight className="h-6 w-6 text-brand-500" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3">
            <Button
              size="lg"
              onClick={() => {
                setOpen(false)
                onLogin()
              }}
            >
              Acesse sua conta
            </Button>
            <Button href="#abrir-conta" variant="ghost-dark" size="lg" onClick={() => setOpen(false)}>
              Abra sua conta
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
