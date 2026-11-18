import { ArrowUpRight } from 'lucide-react'

const variants = {
  primary:
    'bg-brand-500 text-white shadow-glow hover:bg-brand-600 hover:shadow-[0_0_0_1px_rgba(255,122,0,.4),0_22px_60px_-12px_rgba(255,122,0,.7)]',
  dark: 'bg-ink-900 text-white hover:bg-ink-700 shadow-lift',
  light: 'bg-white text-ink-900 hover:bg-ink-50 shadow-soft',
  ghost: 'bg-transparent text-ink-900 ring-1 ring-inset ring-ink-900/15 hover:ring-ink-900/40 hover:bg-white/60',
  'ghost-dark': 'bg-white/5 text-white ring-1 ring-inset ring-white/15 hover:bg-white/10 hover:ring-white/30',
}

const sizes = {
  sm: 'h-10 px-4 text-[14px]',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-7 text-[16px]',
}

/**
 * Botão reutilizável. Renderiza <a> quando recebe href.
 */
export default function Button({
  as,
  href,
  variant = 'primary',
  size = 'md',
  icon = false,
  className = '',
  children,
  ...props
}) {
  const Tag = as || (href ? 'a' : 'button')
  return (
    <Tag
      href={href}
      className={`group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-[-0.01em] transition-all duration-300 ease-out active:scale-[0.97] ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {variant === 'primary' && (
        <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/35 to-transparent group-hover:animate-shine" />
      )}
      <span className="relative inline-flex items-center gap-2">{children}</span>
      {icon && (
        <span className="relative -mr-1 grid h-6 w-6 place-items-center overflow-hidden rounded-full bg-white/15">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" />
        </span>
      )}
    </Tag>
  )
}
