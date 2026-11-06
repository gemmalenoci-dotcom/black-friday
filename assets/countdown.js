/* Conto alla rovescia del Black Friday · si ferma da solo alla scadenza
   Orari in ora italiana (CET, +01:00 a novembre e dicembre)
   Per provare: aggiungi alla pagina ?t=2026-11-28T10:00:00+01:00 */
(function () {
  var fake = new URLSearchParams(location.search).get('t');
  if (fake) fake = fake.replace(' ', '+');
  var off = fake && !isNaN(Date.parse(fake)) ? Date.parse(fake) - Date.now() : 0;
  function adesso() { return Date.now() + off; }
  function due(n) { return (n < 10 ? '0' : '') + n; }
  function parti(s) {
    return { d: Math.floor(s / 86400), h: due(Math.floor(s % 86400 / 3600)), m: due(Math.floor(s % 3600 / 60)), s: due(s % 60) };
  }
  function fase(apre, chiude, n) { return n < apre ? 'prima' : (n < chiude ? 'durante' : 'dopo'); }

  function grande(el) {
    var apre = el.dataset.apre ? Date.parse(el.dataset.apre) : 0;
    var chiude = Date.parse(el.dataset.chiude);
    var n = adesso(), f = fase(apre, chiude, n);
    el.dataset.fase = f;
    el.classList.toggle('chiuso', f === 'dopo');
    var lab = el.querySelector('.cd-label');
    var testo = el.dataset['label' + f.charAt(0).toUpperCase() + f.slice(1)];
    if (f === 'dopo' && el.dataset.fine && n >= Date.parse(el.dataset.fine) && el.dataset.labelFine) testo = el.dataset.labelFine;
    if (lab && testo) lab.textContent = testo;
    if (f === 'dopo') return;
    var p = parti(Math.max(0, Math.floor(((f === 'prima' ? apre : chiude) - n) / 1000)));
    ['d', 'h', 'm', 's'].forEach(function (k) {
      var b = el.querySelector('[data-k="' + k + '"]');
      if (b) b.textContent = p[k];
    });
  }

  function mini(el) {
    var chiude = Date.parse(el.dataset.chiude), n = adesso();
    if (n >= chiude) { el.textContent = 'chiuso'; return; }
    var p = parti(Math.floor((chiude - n) / 1000));
    el.textContent = 'mancano ' + p.d + 'g ' + p.h + ':' + p.m + ':' + p.s;
  }

  function carta(el) {
    var apre = el.dataset.apre ? Date.parse(el.dataset.apre) : 0;
    var chiude = Date.parse(el.dataset.chiude);
    var f = fase(apre, chiude, adesso());
    el.classList.toggle('chiuso', f === 'dopo');
    el.classList.toggle('prima', f === 'prima');
    var b = el.querySelector('.btn[data-acquisto]');
    if (b) {
      if (!b.dataset.testo) b.dataset.testo = b.innerHTML;
      if (f === 'prima' && b.dataset.testoPrima) { b.innerHTML = b.dataset.testoPrima; b.classList.add('disabled'); b.setAttribute('aria-disabled', 'true'); }
      else { b.innerHTML = b.dataset.testo; b.classList.remove('disabled'); b.removeAttribute('aria-disabled'); }
    }
  }

  function giro() {
    document.querySelectorAll('.cd').forEach(grande);
    document.querySelectorAll('.cd-mini').forEach(mini);
    document.querySelectorAll('.card[data-chiude]').forEach(carta);
  }
  giro();
  setInterval(giro, 1000);
})();
