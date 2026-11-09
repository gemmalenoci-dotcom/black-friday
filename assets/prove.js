/* Ingrandisce i messaggi veri nella sezione delle prove · si chiude con X, clic fuori o Esc */
(function () {
  var z = document.getElementById('zoom');
  if (!z) return;
  var im = z.querySelector('img');
  function chiudi() {
    z.classList.remove('on');
    document.body.style.overflow = '';
    im.removeAttribute('src');
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-zoom]');
    if (b) {
      im.src = b.getAttribute('data-zoom');
      im.alt = b.getAttribute('data-alt') || '';
      z.classList.add('on');
      document.body.style.overflow = 'hidden';
      return;
    }
    if (e.target === z || e.target.closest('.zoom-x')) chiudi();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && z.classList.contains('on')) chiudi();
  });
})();
