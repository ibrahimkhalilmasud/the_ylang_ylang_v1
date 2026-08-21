import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="container-luxe flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-serif text-4xl text-bone md:text-6xl">This path leads elsewhere</h1>
      <p className="mt-5 max-w-md text-sm text-stone">
        The page you were looking for isn’t here — but the villa is waiting.
      </p>
      <Link href="/" className="btn-primary mt-8">Return home</Link>
    </section>
  )
}
