/**
 * Wordmark estilizado e conceitual — não é o logotipo oficial.
 */
export default function Logo({ className = '', tone = 'dark', compact = false }) {
  const text = tone === 'light' ? 'text-white' : 'text-ink-900'
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative grid h-8 w-8 place-items-center rounded-[10px] bg-brand-500 shadow-glow">
        <svg viewBox="0 0 32 32" className="h-[18px] w-[18px]" aria-hidden="true">
          <circle cx="10" cy="7.5" r="3" fill="#fff" />
          <rect x="7" y="13" width="6" height="13" rx="3" fill="#fff" />
          <path d="M18 26V18.5a4.5 4.5 0 0 1 9 0V26" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        </svg>
      </span>
      {!compact && (
        <span className={`text-[22px] font-bold tracking-[-0.06em] ${text}`}>
          inter<span className="text-brand-500">.</span>
        </span>
      )}
    </span>
  )
}
