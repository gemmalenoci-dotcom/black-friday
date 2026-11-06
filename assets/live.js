/* live.html · iscrizione alla live del 26/11 e fasi della pagina (prima, in diretta, finita)
   Modulo MailerLite «Landing live 26/11 · Tutti uguali con l'AI» (203424156300084984, senza doppia conferma) → gruppo «Live 26/11 · Tutti uguali con l'AI» (203424150021211987)
   ENDPOINT vuoto = prova: il modulo non manda niente e fa vedere il «Sei dentro»
   Per provare le fasi: ?t=2026-11-26T18:45:00+01:00 */
(function () {
  var ENDPOINT = 'https://assets.mailerlite.com/jsonp/2697895/forms/203424156300084984/subscribe';
  var EVENTO = 'https://club.unlikeacademy.it/c/dirette/tutti-uguali-con-l-ai';
  var INIZIO = Date.parse('2026-11-26T19:30:00+01:00');
  var FINE = Date.parse('2026-11-26T20:30:00+01:00');
  var CHIAVE = 'live-2027-iscritto';

  var fake = new URLSearchParams(location.search).get('t');
  if (fake) fake = fake.replace(' ', '+');
  var off = fake && !isNaN(Date.parse(fake)) ? Date.parse(fake) - Date.now() : 0;
  function fase() { var n = Date.now() + off; return n < INIZIO ? 'prima' : (n < FINE ? 'durante' : 'dopo'); }
  function aggiorna() { document.body.dataset.fase = fase(); }
  aggiorna();
  setInterval(aggiorna, 10000);

  document.querySelectorAll('[data-evento]').forEach(function (a) { a.href = EVENTO; });

  var card = document.querySelector('.card-form');
  function fatto() {
    card.classList.add('fatto');
    try { localStorage.setItem(CHIAVE, '1'); } catch (x) {}
  }
  try { if (localStorage.getItem(CHIAVE)) card.classList.add('fatto'); } catch (x) {}

  document.querySelectorAll('form.iscrizione').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var errore = form.querySelector('.errore');
      var bottone = form.querySelector('button');
      var nome = form.nome.value.trim();
      var email = form.email.value.trim();
      if (!nome) { errore.textContent = 'Scrivi il tuo nome'; form.nome.focus(); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { errore.textContent = 'Controlla la mail: ti serve per ricevere il link'; form.email.focus(); return; }
      if (!form.consenso.checked) { errore.textContent = 'Spunta la casella per ricevere il link per mail'; return; }
      errore.textContent = '';
      if (!ENDPOINT) { fatto(); return; }
      bottone.disabled = true; bottone.textContent = 'Un attimo';
      var dati = new FormData();
      dati.append('fields[email]', email);
      dati.append('fields[name]', nome);
      dati.append('ml-submit', '1');
      dati.append('anticsrf', 'true');
      fetch(ENDPOINT, { method: 'POST', body: dati, mode: 'no-cors' }).then(fatto).catch(function () {
        bottone.disabled = false; bottone.textContent = 'Iscriviti alla live';
        errore.textContent = 'Non è partito, riprova tra un attimo';
      });
    });
  });
})();
