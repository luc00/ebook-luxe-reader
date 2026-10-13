import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: [
    { title: "Privacy Policy — Lucasebooks" },
    { name: "description", content: "Informativa provvisoria sul trattamento dei dati personali durante la consultazione di Lucasebooks." },
    { property: "og:title", content: "Privacy Policy — Lucasebooks" },
    { property: "og:description", content: "Dati di navigazione, salvataggio della lettura e diritti dei visitatori." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <PolicyPage title="Privacy Policy">
    <section><h2>1. Titolare del trattamento</h2><p>Questa informativa riguarda Lucasebooks, accessibile tramite eebooks.online e www.eebooks.online. Nome o ragione sociale, indirizzo e recapito per le richieste privacy del titolare non sono ancora stati forniti. L’informativa deve essere completata con questi dati.</p></section>
    <section><h2>2. Dati e finalità</h2><ul><li><strong>Consultazione del sito:</strong> i fornitori di hosting e distribuzione dei contenuti possono trattare indirizzo IP, dati del browser, richieste e log tecnici per erogare il sito e proteggerlo.</li><li><strong>Scelta privacy:</strong> la scelta e la data sono conservate localmente per rispettare le preferenze del visitatore.</li><li><strong>Ripresa della lettura:</strong> previo consenso viene conservato localmente il numero della pagina per libro. La funzione non sincronizza dati fra dispositivi e non invia questi segnalibri al gestore.</li></ul><p className="mt-3">Il catalogo non richiede un account e non contiene moduli per raccogliere nomi, email o dati di pagamento.</p></section>
    <section><h2>3. Basi giuridiche</h2><p>Il salvataggio facoltativo della lettura si basa sul consenso, revocabile dalle preferenze. La memoria della scelta è necessaria a rispettare la decisione del visitatore. Per i dati tecnici trattati dai fornitori, il titolare deve confermare la base giuridica applicabile alle finalità di erogazione, sicurezza ed eventuali obblighi di legge, documentando il legittimo interesse ove utilizzato.</p></section>
    <section><h2>4. Destinatari e trasferimenti</h2><p>L’erogazione del sito coinvolge Lovable e l’infrastruttura di hosting e distribuzione dei contenuti. I caratteri vengono richiesti a Google Fonts. I fornitori ricevono i dati tecnici necessari alle richieste. Il titolare deve verificare ruoli, accordi sul trattamento, ubicazione dei dati e, per eventuali trasferimenti fuori dallo Spazio economico europeo, la base di trasferimento e le garanzie applicabili. Non è dichiarata una localizzazione esclusivamente europea.</p></section>
    <section><h2>5. Conservazione</h2><p>La scelta privacy è valida per 180 giorni. Le pagine salvate restano sul browser fino alla revoca o alla cancellazione dei dati locali. I tempi di conservazione dei log di hosting non sono stati verificati e devono essere specificati dal titolare.</p></section>
    <section><h2>6. Diritti dei visitatori</h2><p>Nei casi previsti dal GDPR puoi chiedere accesso, rettifica, cancellazione, limitazione, portabilità e opporti al trattamento. Puoi revocare il consenso senza pregiudicare la liceità del trattamento precedente e presentare reclamo al Garante per la protezione dei dati personali o alla competente autorità di controllo. Le richieste al titolare richiedono il recapito privacy ancora da completare. I dati locali possono essere cancellati direttamente dal browser.</p></section>
    <section><h2>7. Aggiornamenti</h2><p>L’informativa deve essere aggiornata quando cambiano servizi o trattamenti. Questo documento descrive le funzioni attualmente presenti nel codice e non costituisce una certificazione di conformità legale.</p></section>
  </PolicyPage>,
});