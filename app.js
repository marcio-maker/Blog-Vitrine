/* ============================================================
   HairOS — app.js
   ============================================================ */

const ML_LINKS = {
  kerastase: "https://meli.la/1MwSY7v", joico: "https://meli.la/2x9xqBe",
  keune: "https://meli.la/1GbiW7M", inoa: "https://meli.la/28LpPj2"
};

function _imgErro(el){
  try{
    if(!el.getAttribute('src')) return;
    const wrap = el.parentElement;
    if(!wrap) return;
    const nome = el.getAttribute('alt') || 'Imagem';
    wrap.classList.add('img-erro');
    wrap.setAttribute('data-nome', nome);
    el.style.opacity = '0';
  }catch(e){}
}
window._imgErro = _imgErro;

/* MENU MOBILE */
(function(){
  const toggle = document.querySelector('.menu-toggle');
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('drawerOverlay');
  const fechar = document.getElementById('drawerFechar');
  if(!toggle || !drawer || !overlay || !fechar) return;

  toggle.addEventListener('click', () => {
    drawer.classList.add('aberto');
    overlay.classList.add('ativo');
    drawer.removeAttribute('inert');
    toggle.setAttribute('aria-expanded','true');
  });
  
  const fecharMenu = () => {
    drawer.classList.remove('aberto');
    overlay.classList.remove('ativo');
    drawer.setAttribute('inert','');
    toggle.setAttribute('aria-expanded','false');
  };
  
  fechar.addEventListener('click', fecharMenu);
  overlay.addEventListener('click', fecharMenu);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', fecharMenu));
})();

/* BOTÃO PINTEREST */
(function(){
  document.querySelectorAll('.pin-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const url = encodeURIComponent(btn.dataset.pinUrl || location.href);
      const media = encodeURIComponent(btn.dataset.pinMedia || '');
      const desc = encodeURIComponent(btn.dataset.pinDescription || document.title);
      window.open(`https://www.pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${desc}`, '_blank', 'noopener,width=750,height=550');
    });
  });
})();

/* BUSCADOR (Apenas na Index) */
(function(){
  const input = document.getElementById('buscaInput');
  const grid = document.getElementById('gridArtigos');
  const vazia = document.getElementById('buscaVazia');
  if(!input || !grid || !vazia) return;

  input.addEventListener('input', () => {
    const termo = input.value.toLowerCase().trim();
    let encontrou = false;
    
    grid.querySelectorAll('.card').forEach(card => {
      const titulo = (card.dataset.titulo || '').toLowerCase();
      if (titulo.includes(termo)) {
        card.style.display = '';
        encontrou = true;
      } else {
        card.style.display = 'none';
      }
    });
    vazia.style.display = encontrou ? 'none' : 'block';
  });
})();

/* FORMULÁRIO DE CONTATO */
(function(){
  const form = document.getElementById('contatoForm');
  if(!form) return;
  const st = document.getElementById('contatoStatus');
  form.addEventListener('submit', e => {
    e.preventDefault();
    st.textContent = 'Abrindo seu app de e-mail…';
    const nome = document.getElementById('contatoNome').value;
    const email = document.getElementById('contatoEmail').value;
    const msg = document.getElementById('contatoMensagem').value;
    window.location.href = `mailto:hairbymarciostylist@gmail.com?subject=Mensagem de ${nome}&body=Nome: ${nome}%0AE-mail: ${email}%0A%0A${msg}`;
  });
})();

/* ANO NO FOOTER */
(function(){
  const y = document.getElementById('anoAtual');
  if(y) y.textContent = new Date().getFullYear();
})();