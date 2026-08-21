import { Reveal } from './Reveal'

interface Props {
  eyebrow?: string
  title: string
  intro?: string
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionHeading({ eyebrow, title, intro, align = 'left', light }: Props) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <Reveal>
          <p className="eyebrow mb-4">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className={`font-serif text-3xl leading-tight md:text-5xl ${light ? 'text-bone' : 'text-bone'}`}>
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-stone md:text-base">{intro}</p>
        </Reveal>
      )}
    </div>
  )
}
