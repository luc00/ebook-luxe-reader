import { ChevronLeft, ChevronRight, Download, Minus, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import type { Book } from "@/lib/books";

export function PdfReader({ book, onClose }: { book: Book; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState(0);
  const [error, setError] = useState(false);
  const [document, setDocument] = useState<import("pdfjs-dist").PDFDocumentProxy | null>(null);

  useEffect(() => {
    const oldOverflow = window.document.body.style.overflow;
    window.document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const observer = new ResizeObserver(() => setWidth(frame.clientWidth));
    observer.observe(frame);
    setWidth(frame.clientWidth);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let active = true;
    let task: import("pdfjs-dist").PDFDocumentLoadingTask | undefined;
    setDocument(null);
    setTotal(0);
    setPage(1);
    setError(false);
    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
        pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
        task = pdfjs.getDocument({ url: book.pdf });
        const pdf = await task.promise;
        if (active) {
          setDocument(pdf);
          setTotal(pdf.numPages);
          const saved = Number(window.localStorage.getItem(`ebooks:page:${book.slug}`));
          if (saved >= 1 && saved <= pdf.numPages) setPage(Math.floor(saved));
        } else {
          await task.destroy();
        }
      } catch (reason) {
        console.error("Unable to open PDF", reason);
        if (active) setError(true);
      }
    })();
    return () => {
      active = false;
      void task?.destroy();
    };
  }, [book.pdf, book.slug]);

  useEffect(() => {
    if (!document) return;
    try {
      window.localStorage.setItem(`ebooks:page:${book.slug}`, String(page));
    } catch {
      /* storage unavailable */
    }
  }, [book.slug, document, page]);

  useEffect(() => {
    if (!document || !width || !canvasRef.current) return;
    let active = true;
    let renderTask: import("pdfjs-dist").RenderTask | undefined;
    (async () => {
      try {
        const pdfPage = await document.getPage(page);
        if (!active) return;
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context) return;
        const base = pdfPage.getViewport({ scale: 1 });
        const scale = Math.min((width - 24) / base.width, 1.5) * zoom;
        const viewport = pdfPage.getViewport({ scale });
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        renderTask = pdfPage.render({ canvasContext: context, viewport, transform: [pixelRatio, 0, 0, pixelRatio, 0, 0] });
        await renderTask.promise;
        pdfPage.cleanup();
      } catch (reason) {
        if (active) console.error("Unable to render PDF page", reason);
        if (active && !(reason instanceof Error && reason.name === "RenderingCancelledException")) setError(true);
      }
    })();
    return () => {
      active = false;
      renderTask?.cancel();
    };
  }, [document, page, width, zoom]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background text-foreground" role="dialog" aria-modal="true" aria-label={`Lettura di ${book.title}`}>
      <div className="flex min-h-16 items-center gap-2 border-b border-border bg-primary px-3 text-primary-foreground sm:px-6">
        <div className="min-w-0 flex-1"><p className="truncate font-display text-sm font-semibold sm:text-base">{book.title}</p><p className="truncate text-xs text-primary-foreground/70">{book.author}</p></div>
        <Button asChild variant="ghost" size="small"><a href={book.pdf} download={`${book.slug}.pdf`} title="Scarica PDF"><Download className="size-4" /><span className="hidden sm:inline">Scarica</span></a></Button>
        <Button variant="icon" size="icon" onClick={onClose} aria-label="Chiudi lettore" title="Chiudi lettore"><X className="size-5" /></Button>
      </div>
      <div ref={frameRef} className="min-h-0 flex-1 overflow-auto bg-muted p-3 text-center sm:p-6">
        {error ? <p className="mx-auto mt-12 max-w-md text-sm">Non è stato possibile aprire il libro. Puoi comunque scaricare il PDF.</p> : null}
        {!document && !error ? <p className="mt-12 text-sm text-muted-foreground">Caricamento del libro…</p> : null}
        <canvas ref={canvasRef} className={`mx-auto max-w-none shadow-lg ${document && !error ? "block" : "hidden"}`} aria-label={`Pagina ${page} di ${total} di ${book.title}`} role="img" />
      </div>
      {total > 0 && !error ? <div className="flex min-h-14 items-center justify-center gap-1 border-t border-border bg-card px-2 sm:gap-3">
        <Button variant="outline" size="icon" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1} aria-label="Pagina precedente" title="Pagina precedente"><ChevronLeft className="size-4" /></Button>
        <span className="min-w-20 text-center text-xs font-semibold tabular-nums sm:text-sm">{page} / {total}</span>
        <Button variant="outline" size="icon" onClick={() => setPage((value) => Math.min(total, value + 1))} disabled={page === total} aria-label="Pagina successiva" title="Pagina successiva"><ChevronRight className="size-4" /></Button>
        <span className="mx-1 h-6 border-l border-border" />
        <Button variant="outline" size="icon" onClick={() => setZoom((value) => Math.max(0.6, +(value - 0.2).toFixed(1)))} disabled={zoom <= 0.6} aria-label="Riduci zoom" title="Riduci zoom"><Minus className="size-4" /></Button>
        <Button variant="outline" size="icon" onClick={() => setZoom((value) => Math.min(2, +(value + 0.2).toFixed(1)))} disabled={zoom >= 2} aria-label="Aumenta zoom" title="Aumenta zoom"><Plus className="size-4" /></Button>
      </div> : null}
    </div>
  );
}