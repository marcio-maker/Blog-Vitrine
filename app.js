/* ============================================================
   HairOS — app.js
   ============================================================ */

const ML_LINKS = {
  kerastase:    "https://meli.la/1MwSY7v",
  joico:        "https://meli.la/2x9xqBe",
  keune:        "https://meli.la/1GbiW7M",
  inoa:         "https://meli.la/28LpPj2",
  expert:       "https://meli.la/2nmeunk",
  igora:        "https://meli.la/1MBhptD",
  moroccanoil:  "https://meli.la/2djh4z5",
  schwarzkopf:  "https://meli.la/2jyNSj5",
  livingproof:  "https://meli.la/34fZAEp",
  davines:      "https://meli.la/2sHyDUk",
  redken:       "https://meli.la/181L92o",
  ferramentas:  "https://meli.la/2H5F4mn",
  kitNoiva:     "https://meli.la/1H35KAT",
  mac:          "https://meli.la/1Zs9Ncu"
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

  function abrir(){
    drawer.classList.add('aberto');
    overlay.classList.add('ativo');
    drawer.removeAttribute('inert');
    toggle.setAttribute('aria-expanded','true');
  }
  function fecharDrawer(){
    drawer.classList.remove('aberto');
    overlay.classList.remove('ativo');
    drawer.setAttribute('inert','');
    toggle.setAttribute('aria-expanded','false');
  }
  toggle.addEventListener('click', abrir);
  fechar.addEventListener('click', fecharDrawer);
  overlay.addEventListener('click', fecharDrawer);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', fecharDrawer));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') fecharDrawer(); });
})();

/* BOTÃO PINTEREST */
(function(){
  document.querySelectorAll('.pin-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const url   = encodeURIComponent(btn.dataset.pinUrl || location.href);
      const media = encodeURIComponent(btn.dataset.pinMedia || '');
      const desc  = encodeURIComponent(btn.dataset.pinDescription || document.title);
      const pinUrl = `https://www.pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${desc}`;
      window.open(pinUrl, '_blank', 'noopener,width=750,height=550');
    });
  });
})();

/* FORMULÁRIO DE CONTATO */
(function(){
  const form = document.getElementById('contatoForm');
  if(!form) return;
  const st = document.getElementById('contatoStatus');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nome = document.getElementById('contatoNome').value.trim();
    const email = document.getElementById('contatoEmail').value.trim();
    const msg = document.getElementById('contatoMensagem').value.trim();
    if(!nome || !email || !msg){ st.textContent = 'Preencha nome, e-mail e mensagem.'; return; }
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ st.textContent = 'Confira o e-mail digitado.'; return; }
    st.textContent = 'Abrindo seu app de e-mail…';
    const assunto = encodeURIComponent('HairOS · Mensagem de ' + nome);
    const corpo   = encodeURIComponent('Nome: ' + nome + '\nE-mail: ' + email + '\n\nMensagem:\n' + msg);
    window.location.href = 'mailto:hairbymarciostylist@gmail.com?subject=' + assunto + '&body=' + corpo;
  });
})();

/* ANO NO FOOTER */
(function(){
  const y = document.getElementById('anoAtual');
  if(y) y.textContent = new Date().getFullYear();
})();

/* BUSCADOR (apenas na página inicial) */
(function(){
  const input = document.getElementById('buscaInput');
  const grid = document.getElementById('gridArtigos');
  const vazia = document.getElementById('buscaVazia');
  if(!input || !grid || !vazia) return;

  input.addEventListener('input', () => {
    const termo = input.value.toLowerCase().trim();
    const cards = grid.querySelectorAll('.card');
    let encontrou = false;

    cards.forEach(card => {
      // Pega o título salvo no atributo data-titulo
      const titulo = (card.dataset.titulo || '').toLowerCase();
      
      if (titulo.includes(termo)) {
        card.style.display = ''; // mostra
        encontrou = true;
      } else {
        card.style.display = 'none'; // esconde
      }
    });

    // Mostra ou esconde a mensagem de "nada encontrado"
    vazia.style.display = encontrou ? 'none' : 'block';
  });
})();