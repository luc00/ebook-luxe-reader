import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PolicyPage({ title, children }: { title: string; children: ReactNode }) {
  return <main className="mx-auto min-h-[70dvh] max-w-3xl px-5 py-10 sm:px-10">
    <Link to="/" className="text-sm font-semibold text-accent">← Lucasebooks</Link>
    <h1 className="mt-8 font-display text-4xl font-semibold">{title}</h1>
    <p className="mt-3 text-sm text-muted-foreground">Ultimo aggiornamento: 13 ottobre 2026</p>
    <p className="mt-6 border-l-2 border-accent pl-4 text-sm leading-relaxed">Informativa provvisoria: i dati identificativi e il recapito privacy del titolare devono essere completati e le informazioni sui servizi di hosting verificate prima di considerare il documento definitivo.</p>
    <div className="mt-8 space-y-7 text-sm leading-relaxed [&_h2]:mb-2 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">{children}</div>
  </main>;
}