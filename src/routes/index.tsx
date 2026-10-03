import { createFileRoute } from "@tanstack/react-router";
import { Download, Monitor, Search, Smartphone, Tablet, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { books, type Book } from "@/lib/books";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ebooks — Biblioteca gratuita da leggere e scaricare" },
      { name: "description", content: "Scopri ebook gratuiti da leggere online o scaricare in PDF su computer, tablet, telefono e Kindle." },
      { property: "og:title", content: "ebooks — Biblioteca gratuita" },
      { property: "og:description", content: "Leggi online o scarica gratuitamente una selezione di ebook in PDF." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"Tutti" | "Narrativa" | "Saggistica">("Tutti");
  const [reading, setReading] = useState<Book | null>(null);
  const shown = useMemo(() => books.filter((book) => {
    const matchesText = `${book.title} ${book.author}`.toLocaleLowerCase("it").includes(query.toLocaleLowerCase("it"));
    return matchesText && (filter === "Tutti" || book.category === filter);
  }), [filter, query]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto max-w-[1200px] px-5 pb-10 pt-7 sm:px-10">
        <div className="flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5" aria-label="ebooks, torna all'inizio">
            <span className="grid size-8 place-items-center rounded-full bg-primary font-display text-sm font-semibold text-primary-foreground">e</span>
            <span className="font-display text-lg font-semibold">ebooks</span>
          </a>
          <nav className="flex items-center gap-5 text-sm" aria-label="Navigazione principale">
            <a href="#catalogo" className="hidden transition-colors hover:text-accent sm:inline">Catalogo</a>
            <a href="#come-funziona" className="transition-colors hover:text-accent">Come funziona</a>
          </nav>
        </div>
        <div id="top" className="mt-12">
          <p className="mb-3 text-xs font-semibold uppercase text-accent">Biblioteca digitale gratuita</p>
          <h1 className="font-display text-6xl font-semibold leading-none sm:text-7xl lg:text-8xl">ebooks</h1>
          <p className="mt-5 max-w-[48ch] text-pretty text-lg text-muted-foreground">Dieci storie da portare ovunque. Leggi ogni titolo qui sul sito oppure scarica il PDF su computer, tablet, telefono e Kindle.</p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <label className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-full bg-card px-5 ring-1 ring-border">
            <Search className="size-4 text-muted-foreground" aria-hidden="true" />
            <span className="sr-only">Cerca titolo o autore</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Cerca un titolo o un autore…" />
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {(["Tutti", "Narrativa", "Saggistica"] as const).map((item) => (
              <Button key={item} size="large" variant={filter === item ? "primary" : "outline"} onClick={() => setFilter(item)}>{item}</Button>
            ))}
          </div>
        </div>
      </header>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-10 sm:py-16">
          <p className="text-xs font-semibold uppercase text-highlight">In primo piano</p>
          <div className="mt-3 flex items-end justify-between gap-6">
            <h2 className="max-w-xl font-display text-3xl font-semibold sm:text-4xl">Tre titoli per iniziare subito</h2>
            <a href="#catalogo" className="hidden text-sm font-semibold text-highlight hover:text-accent sm:inline">Vedi tutti →</a>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.slice(0, 3).map((book, index) => <FeaturedCard key={book.slug} book={book} tone={["bg-blue", "bg-coral", "bg-green"][index] ?? "bg-blue"} onRead={setReading} />)}
          </div>
        </div>
      </section>

      <main id="catalogo" className="mx-auto max-w-[1200px] px-5 py-14 sm:px-10 sm:py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase text-accent">La collezione</p>
            <h2 className="mt-2 font-display text-3xl font-semibold">Tutto il catalogo</h2>
          </div>
          <p className="text-sm text-muted-foreground">{shown.length} {shown.length === 1 ? "titolo" : "titoli"}</p>
        </div>
        {shown.length ? (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-7">
            {shown.map((book) => <BookCard key={book.slug} book={book} onRead={setReading} />)}
          </div>
        ) : <p className="mt-14 border-y border-border py-12 text-center text-muted-foreground">Nessun libro corrisponde alla ricerca.</p>}
      </main>

      <section id="come-funziona" className="mx-auto max-w-[1200px] px-5 pb-16 sm:px-10">
        <div className="bg-card px-5 py-8 ring-1 ring-border sm:px-8">
          <h2 className="font-display text-2xl font-semibold">Leggi dove vuoi</h2>
          <p className="mt-2 max-w-[52ch] text-sm text-muted-foreground">Apri ogni libro nel lettore del sito oppure scarica il PDF. Su Kindle puoi inviarlo con Send to Kindle o trasferirlo via USB.</p>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[[Monitor,"Computer","PDF nel browser"],[Tablet,"Tablet","Lettura a schermo"],[Smartphone,"Telefono","Sempre con te"],[Download,"Kindle","Invio o USB"]].map(([Icon,title,copy]) => {
              const DeviceIcon = Icon as typeof Monitor;
              return <div key={String(title)} className="bg-background p-4 ring-1 ring-border"><DeviceIcon className="size-5 text-accent" /><p className="mt-4 text-sm font-semibold">{String(title)}</p><p className="text-xs text-muted-foreground">{String(copy)}</p></div>;
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-5 py-8 text-center sm:flex-row sm:px-10 sm:text-left">
          <span className="font-display text-sm font-semibold">ebooks</span>
          <p className="text-xs text-muted-foreground">Biblioteca gratuita · 10 titoli · lettura e download senza registrazione</p>
        </div>
      </footer>

      {reading ? <Reader book={reading} onClose={() => setReading(null)} /> : null}
    </div>
  );
}

function Cover({ book, priority = false }: { book: Book; priority?: boolean }) {
  return <img src={book.cover} alt={`Copertina di ${book.title}`} width={1024} height={1536} loading={priority ? "eager" : "lazy"} className="book-cover aspect-[2/3] w-full object-cover" />;
}

function FeaturedCard({ book, tone, onRead }: { book: Book; tone: string; onRead: (book: Book) => void }) {
  return <article className={`book-card flex flex-col p-5 ${tone}`}>
    <Cover book={book} priority />
    <h3 className="mt-5 min-h-14 font-display text-xl font-semibold leading-tight">{book.title}</h3>
    <p className="text-sm text-primary-foreground/75">{book.author}</p>
    <div className="mt-5 grid gap-2">
      <Button variant="sunny" onClick={() => onRead(book)}>Leggi ora</Button>
      <Button asChild variant="ghost"><a href={book.pdf} download={`${book.slug}.pdf`}><Download className="size-4" />Scarica PDF</a></Button>
    </div>
  </article>;
}

function BookCard({ book, onRead }: { book: Book; onRead: (book: Book) => void }) {
  return <article className="book-card flex min-w-0 flex-col">
    <Cover book={book} />
    <p className="mt-4 text-[11px] font-semibold uppercase text-accent">{book.category} · {book.language}</p>
    <h3 className="mt-1 line-clamp-2 min-h-12 font-display text-base font-semibold leading-snug sm:text-lg">{book.title}</h3>
    <p className="text-sm text-muted-foreground">{book.author}</p>
    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
      <Button size="small" onClick={() => onRead(book)}>Leggi ora</Button>
      <Button asChild size="small" variant="outline"><a href={book.pdf} download={`${book.slug}.pdf`}><Download className="size-4" />PDF</a></Button>
    </div>
  </article>;
}

function Reader({ book, onClose }: { book: Book; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 flex flex-col bg-primary text-primary-foreground" role="dialog" aria-modal="true" aria-label={`Lettura di ${book.title}`}>
    <div className="flex h-16 items-center gap-3 border-b border-primary-foreground/15 px-4 sm:px-6">
      <div className="min-w-0 flex-1"><p className="truncate font-display font-semibold">{book.title}</p><p className="truncate text-xs text-primary-foreground/60">{book.author}</p></div>
      <Button asChild variant="ghost" size="small"><a href={book.pdf} download={`${book.slug}.pdf`}><Download className="size-4" /><span className="hidden sm:inline">Scarica</span></a></Button>
      <Button variant="icon" size="icon" onClick={onClose} aria-label="Chiudi lettore"><X className="size-5" /></Button>
    </div>
    <iframe src={`${book.pdf}#view=FitH`} title={`Lettore PDF: ${book.title}`} className="min-h-0 flex-1 bg-card" />
  </div>;
}
