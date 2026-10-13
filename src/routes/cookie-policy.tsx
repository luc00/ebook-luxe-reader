import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({ meta: [
    { title: "Cookie Policy — Lucasebooks" },
    { name: "description", content: "Informazioni sulla memoria locale, sul salvataggio della lettura e sulle preferenze di Lucasebooks." },
    { property: "og:title", content: "Cookie Policy — Lucasebooks" },
    { property: "og:description", content: "Tecnologie utilizzate e gestione delle preferenze di privacy." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <PolicyPage title="Cookie Policy">
    <section><h2>1. Cookie e tecnologie simili</h2><p>I cookie sono piccoli file salvati dal browser. Il sito utilizza la memoria locale (localStorage), una tecnologia distinta dai cookie, per conservare la scelta privacy e, se autorizzato, la pagina di lettura. Questi valori non vengono automaticamente inviati al server come avviene con i cookie.</p></section>
    <section><h2>2. Memoria utilizzata dal sito</h2><ul>
      <li><strong>ebooks:consent:v1 — necessaria:</strong> conserva la scelta e la data, su questo browser. La scelta viene considerata valida per 180 giorni; alla successiva visita dopo la scadenza viene richiesta nuovamente. Il valore viene sostituito al nuovo salvataggio.</li>
      <li><strong>ebooks:page:[identificativo del libro] — facoltativa:</strong> conserva il numero della pagina per ciascun ebook, solo dopo il consenso. Non ha una scadenza automatica: resta fino alla revoca della preferenza o alla cancellazione dei dati del browser. Dopo la scadenza del consenso non viene letta o aggiornata finché non viene nuovamente autorizzata.</li>
    </ul><p className="mt-3">Nel codice della vetrina non sono integrati cookie di marketing, profilazione o statistiche. Eventuali tecnologie aggiunte dalla piattaforma di hosting richiedono una verifica separata sul sito pubblicato.</p></section>
    <section><h2>3. Scelta e revoca</h2><p>Puoi scegliere «Solo necessari», abilitare il salvataggio della pagina o salvare le preferenze selezionate. Chiudere il pop-up non equivale ad accettare: il salvataggio facoltativo rimane disattivato in assenza di consenso valido. Puoi riaprire «Preferenze cookie» in fondo a ogni pagina. Disattivare il salvataggio e confermare elimina le pagine precedentemente memorizzate. La lettura e il download restano disponibili.</p></section>
    <section><h2>4. Servizi esterni</h2><p>Il sito carica i caratteri da Google Fonts e copertine e PDF tramite l’infrastruttura di hosting e distribuzione dei file. Queste richieste possono comunicare indirizzo IP e dati tecnici del browser ai fornitori, anche senza cookie. Le loro modalità di trattamento, eventuali trasferimenti e tecnologie di tracciamento devono essere verificate dal titolare. Il banner non controlla tecnologie introdotte esternamente al codice dell’applicazione.</p></section>
    <section><h2>5. Impostazioni del browser</h2><p>Puoi eliminare cookie e dati del sito tramite le impostazioni del browser. La cancellazione rimuove anche le preferenze e le pagine salvate. Se la memoria locale è bloccata, il sito resta consultabile ma non può conservare queste scelte.</p></section>
  </PolicyPage>,
});