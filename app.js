/* ============================================================
   HairOS — app.js (Completo e sem o bug de duplicação)
   ============================================================ */

/* Lida com o erro de imagem sem quebrar o layout */
function _imgErro(el) {
  try {
    if (!el.getAttribute('src')) return;
    const wrap = el.parentElement;
    if (!wrap) return;
    const nome = el.getAttribute('alt') || 'Imagem';
    wrap.classList.add('img-erro');
    wrap.setAttribute('data-nome', nome);
    el.style.opacity = '0';
  } catch (e) {}
}
window._imgErro = _imgErro;

/* MENU MOBILE (Abrir e Fechar) */
(function() {
  const toggle = document.querySelector('.menu-btn');
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('drawerOverlay');
  const fechar = document.getElementById('drawerFechar');
  
  if (!toggle || !drawer || !overlay || !fechar) return;

  function abrir() {
    drawer.classList.add('aberto');
    overlay.classList.add('ativo');
    drawer.removeAttribute('inert');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function fecharDrawer() {
    drawer.classList.remove('aberto');
    overlay.classList.remove('ativo');
    drawer.setAttribute('inert', '');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', abrir);
  fechar.addEventListener('click', fecharDrawer);
  overlay.addEventListener('click', fecharDrawer);
  
  // Fecha o menu se clicar em um link
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', fecharDrawer));
  
  // Fecha com a tecla Esc
  document.addEventListener('keydown', e => { 
    if (e.key === 'Escape') fecharDrawer(); 
  });
})();

/* BOTÃO PINTEREST */
(function() {
  document.querySelectorAll('.pin-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const url = encodeURIComponent(btn.dataset.pinUrl || location.href);
      const media = encodeURIComponent(btn.dataset.pinMedia || '');
      const desc = encodeURIComponent(btn.dataset.pinDescription || document.title);
      const pinUrl = `https://www.pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${desc}`;
      window.open(pinUrl, '_blank', 'noopener,width=750,height=550');
    });
  });
})();

/* ANO NO FOOTER */
(function() {
  const y = document.getElementById('anoAtual');
  if (y) y.textContent = new Date().getFullYear();
})();