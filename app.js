function _imgErro(el) {
  try {
    if (!el.getAttribute('src')) return;
    const wrap = el.parentElement;
    if (!wrap) return;
    wrap.classList.add('img-erro');
    wrap.setAttribute('data-nome', el.getAttribute('alt') || 'Erro');
    el.style.opacity = '0';
  } catch (e) {}
}
window._imgErro = _imgErro;

(function() {
  const toggle = document.querySelector('.menu-toggle');
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('drawerOverlay');
  const fechar = document.getElementById('drawerFechar');
  if (!toggle || !drawer || !overlay || !fechar) return;

  toggle.addEventListener('click', () => {
    drawer.classList.add('aberto');
    overlay.classList.add('ativo');
    drawer.removeAttribute('inert');
    toggle.setAttribute('aria-expanded', 'true');
  });

  const fecharMenu = () => {
    drawer.classList.remove('aberto');
    overlay.classList.remove('ativo');
    drawer.setAttribute('inert', '');
    toggle.setAttribute('aria-expanded', 'false');
  };

  fechar.addEventListener('click', fecharMenu);
  overlay.addEventListener('click', fecharMenu);
})();

(function() {
  document.querySelectorAll('.pin-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const url = encodeURIComponent(btn.dataset.pinUrl || location.href);
      const media = encodeURIComponent(btn.dataset.pinMedia || '');
      const desc = encodeURIComponent(btn.dataset.pinDescription || document.title);
      window.open('https://www.pinterest.com/pin/create/button/?url=' + url + '&media=' + media + '&description=' + desc, '_blank');
    });
  });
})();

(function() {
  const y = document.getElementById('anoAtual');
  if (y) y.textContent = new Date().getFullYear();
})();