'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { getBookingProvider } from '@/lib/booking'

const schema = z
  .object({
    checkIn: z.string().min(1, 'Please choose an arrival date'),
    checkOut: z.string().min(1, 'Please choose a departure date'),
    guests: z.coerce.number().min(1).max(12, 'The villa sleeps up to 12 guests'),
    name: z.string().min(2, 'Please tell us your name'),
    email: z.string().email('Please enter a valid email'),
    message: z.string().optional(),
  })
  .refine((d) => !d.checkIn || !d.checkOut || d.checkOut > d.checkIn, {
    message: 'Departure must be after arrival',
    path: ['checkOut'],
  })

type FormValues = z.input<typeof schema>

const provider = getBookingProvider()
const IS_MOCK = provider.kind === 'mock'

export function BookingForm() {
  const [submitted, setSubmitted] = useState<null | { url: string; name: string }>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { guests: 12 },
  })

  const onSubmit = async (raw: FormValues) => {
    const parsed = schema.safeParse(raw)
    if (!parsed.success) return
    const d = parsed.data
    // Build a handoff URL to the real external enquiry engine. We do NOT claim a booking.
    const url = provider.buildEnquiryUrl({
      checkIn: d.checkIn,
      checkOut: d.checkOut,
      guests: d.guests,
    })
    setSubmitted({ url, name: d.name })
  }

  if (submitted) {
    return (
      <div className="border border-gold/30 bg-sand-black/60 p-8 md:p-10">
        <p className="eyebrow mb-3">Enquiry ready</p>
        <h3 className="font-serif text-3xl text-bone">Thank you, {submitted.name}.</h3>
        <p className="mt-4 text-sm leading-relaxed text-stone">
          The Ylang Ylang takes reservations through the Elite Havens reservations team, who
          will confirm availability and finalise your stay. Continue to their secure
          availability page to complete your enquiry — your dates and party size are carried
          across.
        </p>
        <a
          href={submitted.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-7"
        >
          Continue to availability
        </a>
        <button
          onClick={() => setSubmitted(null)}
          className="mt-4 block text-xs uppercase tracking-wide2 text-stone underline-offset-4 hover:text-bone hover:underline"
        >
          Edit my enquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {IS_MOCK && (
        <p className="border border-gold/40 bg-gold/10 px-4 py-2 text-xs uppercase tracking-wide2 text-gold-soft">
          Demo mode — availability shown is sample data, not live
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Arrival" error={errors.checkIn?.message}>
          <input type="date" {...register('checkIn')} className={inputCls} />
        </Field>
        <Field label="Departure" error={errors.checkOut?.message}>
          <input type="date" {...register('checkOut')} className={inputCls} />
        </Field>
      </div>

      <Field label="Guests" error={errors.guests?.message}>
        <input type="number" min={1} max={12} {...register('guests')} className={inputCls} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input type="text" autoComplete="name" {...register('name')} className={inputCls} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input type="email" autoComplete="email" {...register('email')} className={inputCls} />
        </Field>
      </div>

      <Field label="Anything we should know? (optional)" error={undefined}>
        <textarea rows={3} {...register('message')} className={inputCls} />
      </Field>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
        {isSubmitting ? 'Preparing…' : 'Request availability'}
      </button>
      <p className="text-center text-xs text-stone">
        No payment is taken here. This sends an enquiry to the reservations team.
      </p>
    </form>
  )
}

const inputCls =
  'w-full border border-white/15 bg-sand-black/40 px-4 py-3 text-bone placeholder-stone/50 outline-none transition-colors focus:border-gold [color-scheme:dark]'

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.7rem] uppercase tracking-wide2 text-stone">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-gold-soft">{error}</span>}
    </label>
  )
}
