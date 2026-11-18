import { useEffect, useRef } from 'react'
import { X, ShieldCheck, Sparkles } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'

/**
 * Modal informativo. NÃO coleta dados e NÃO simula autenticação.
 */
export default function DemoModal({ open, onClose, title = 'Este é um site conceitual' }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center p-4 transition-all duration-500 ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
    >
      <button aria-label="Fechar" onClick={onClose} className="absolute inset-0 bg-ink-900/60 backdrop-blur-md" />
      <div
        className={`relative w-full max-w-md overflow-hidden rounded-[32px] bg-white p-8 shadow-card transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
          open ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'
        }`}
      >
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand-500/20 blur-3xl" />
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-ink-50 text-ink-600 transition hover:bg-ink-100"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>
        <Logo />
        <h3 id="demo-modal-title" className="mt-8 text-[30px] font-semibold leading-[1.05] tracking-[-0.04em]">
          {title}
        </h3>
        <p className="mt-4 text-[15.5px] leading-relaxed text-ink-500">
          Esta página é uma releitura de design <strong className="text-ink-900">não oficial</strong>, criada para uma
          trend criativa. Não há login, cadastro nem operações financeiras aqui.
        </p>
        <ul className="mt-6 space-y-3 text-[14.5px] text-ink-600">
          <li className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
            Nunca informe dados bancários em sites que não sejam os canais oficiais do seu banco.
          </li>
          <li className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
            Todos os valores e cartões exibidos são fictícios.
          </li>
        </ul>
        <Button onClick={onClose} className="mt-8 w-full" size="lg">
          Entendi, continuar explorando
        </Button>
      </div>
    </div>
  )
}
