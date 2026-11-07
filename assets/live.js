/* live.html · fasi della pagina (prima, in diretta, finita) e link all'evento
   7/11 (Gemma): niente modulo, il bottone «Iscriviti alla live» porta al link d'invito Free di Circle
   «LIVE 26/11 · Tutti uguali con l'AI (free, dalla landing)» (id 210299, etichetta da-landing-live-26, apre lo spazio Dirette gratuite)
   La mail arriva su MailerLite con lo script notturno Circle → MailerLite
   Per provare le fasi: ?t=2026-11-26T18:45:00+01:00 */
(function () {
  var EVENTO = 'https://club.unlikeacademy.it/c/dirette/tutti-uguali-con-l-ai';
  var INIZIO = Date.parse('2026-11-26T19:30:00+01:00');
  var FINE = Date.parse('2026-11-26T20:30:00+01:00');

  var fake = new URLSearchParams(location.search).get('t');
  if (fake) fake = fake.replace(' ', '+');
  var off = fake && !isNaN(Date.parse(fake)) ? Date.parse(fake) - Date.now() : 0;
  function fase() { var n = Date.now() + off; return n < INIZIO ? 'prima' : (n < FINE ? 'durante' : 'dopo'); }
  function aggiorna() { document.body.dataset.fase = fase(); }
  aggiorna();
  setInterval(aggiorna, 10000);

  document.querySelectorAll('[data-evento]').forEach(function (a) { a.href = EVENTO; });
})();
