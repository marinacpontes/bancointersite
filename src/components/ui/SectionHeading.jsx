import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, description, tone = 'light', align = 'left', aside }) {
  const dark = tone === 'dark'
  return (
    <div
      className={`flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between ${
        align === 'center' ? 'items-center text-center lg:flex-col lg:items-center' : ''
      }`}
    >
      <div className={align === 'center' ? 'max-w-3xl' : 'max-w-3xl'}>
        {eyebrow && (
          <Reveal>
            <span className={dark ? 'eyebrow-dark' : 'eyebrow'}>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              {eyebrow}
            </span>
          </Reveal>
        )}
        <Reveal delay={80}>
          <h2
            className={`display mt-6 text-[44px] sm:text-[60px] lg:text-[76px] ${dark ? 'text-white' : 'text-ink-900'}`}
          >
            {title}
          </h2>
        </Reveal>
      </div>
      {(description || aside) && (
        <Reveal delay={160} className={`max-w-md ${align === 'center' ? '' : 'lg:pb-3'}`}>
          {description && (
            <p className={`text-[17px] leading-relaxed ${dark ? 'text-ink-300' : 'text-ink-500'}`}>{description}</p>
          )}
          {aside}
        </Reveal>
      )}
    </div>
  )
}
