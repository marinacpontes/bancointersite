import { useReveal } from '../../hooks/useReveal'

/** Envolve conteúdo com animação de entrada ao rolar. */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...props }) {
  const [ref, visible] = useReveal()
  return (
    <Tag
      ref={ref}
      style={{ '--d': `${delay}ms` }}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
