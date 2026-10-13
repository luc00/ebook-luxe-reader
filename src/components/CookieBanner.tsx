import * as Dialog from "@radix-ui/react-dialog";
import * as Switch from "@radix-ui/react-switch";
import { Link } from "@tanstack/react-router";
import { Cookie, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { readPreferences, savePreferences } from "@/lib/cookie-preferences";

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [reading, setReading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const saved = readPreferences();
    setReading(saved?.reading ?? false);
    setOpen(!saved);
  }, []);
  function choose(value: boolean) {
    if (!savePreferences(value)) { setError(true); return; }
    setReading(value);
    setError(false);
    setOpen(false);
  }
  return <>
    <div className="border-t border-border bg-background px-5 py-5">
      <nav aria-label="Informative e privacy" className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
        <Link to="/privacy-policy" className="underline underline-offset-4">Privacy Policy</Link>
        <Link to="/cookie-policy" className="underline underline-offset-4">Cookie Policy</Link>
        <Button variant="outline" size="small" onClick={() => { setReading(readPreferences()?.reading ?? false); setOpen(true); }}> <Cookie className="size-4" />Preferenze cookie</Button>
      </nav>
    </div>
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-foreground/40" />
        <Dialog.Content onOpenAutoFocus={(event) => { event.preventDefault(); }} className="fixed left-1/2 top-1/2 z-[61] max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-border bg-card p-6 text-card-foreground shadow-xl sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <Cookie className="size-7 text-accent" aria-hidden="true" />
            <Dialog.Close asChild><Button variant="outline" size="icon" aria-label="Chiudi senza accettare" title="Chiudi senza accettare"><X className="size-4" /></Button></Dialog.Close>
          </div>
          <Dialog.Title className="mt-4 font-display text-2xl font-semibold">La tua privacy, la tua scelta</Dialog.Title>
          <Dialog.Description className="mt-3 text-sm leading-relaxed text-muted-foreground">Lucasebooks conserva la tua scelta su questo browser. Solo con il tuo consenso ricorda anche la pagina raggiunta nei libri. Nel codice del sito non sono presenti cookie pubblicitari o strumenti di analisi dei visitatori.</Dialog.Description>
          <div className="mt-5 border-y border-border py-4 text-sm">
            <div className="flex items-center justify-between gap-4"><span className="font-semibold">Memoria della scelta</span><span className="text-xs text-muted-foreground">Sempre attiva</span></div>
            <div className="mt-4 flex items-center justify-between gap-4"><label htmlFor="reading-consent" className="font-semibold">Ricorda la pagina dei libri</label><Switch.Root id="reading-consent" checked={reading} onCheckedChange={setReading} className="h-6 w-11 shrink-0 rounded-full bg-muted ring-1 ring-border data-[state=checked]:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><Switch.Thumb className="block size-5 translate-x-0.5 rounded-full bg-card transition-transform data-[state=checked]:translate-x-[22px]" /></Switch.Root></div>
            <p className="mt-2 text-xs text-muted-foreground">Facoltativo. Puoi leggere e scaricare anche senza attivarlo.</p>
          </div>
          <p className="mt-4 text-xs text-muted-foreground"><Link to="/cookie-policy" onClick={() => setOpen(false)} className="underline">Cookie Policy</Link> · <Link to="/privacy-policy" onClick={() => setOpen(false)} className="underline">Privacy Policy</Link></p>
          {error ? <p role="alert" className="mt-3 text-sm text-destructive">Il browser non consente il salvataggio. Nessuna preferenza è stata memorizzata; puoi chiudere e continuare senza salvataggio della pagina.</p> : null}
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <Button variant="outline" onClick={() => choose(false)}>Solo necessari</Button>
            <Button variant="outline" onClick={() => choose(reading)}>Salva preferenze</Button>
            <Button className="sm:col-span-2" onClick={() => choose(true)}>Accetta anche il salvataggio</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </>;
}