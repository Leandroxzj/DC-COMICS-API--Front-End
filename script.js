/* script.js - DC Themed (Local Assets Version) */

const cardsContainer = document.getElementById('cardsContainer');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const topBtn = document.getElementById('topBtn');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

// Carregará os heróis de um arquivo JSON externo
let heroes = [];

// Função que busca os dados do arquivo JSON
function loadHeroes() {
  fetch('heroes.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar heroes.json');
      }
      return response.json();
    })
    .then(data => {
      heroes = data;
      renderCards(heroes);
      console.log('Heróis carregados via fetch:', heroes.map(h => h.name));
    })
    .catch(error => {
      console.error('Erro no fetch:', error);
      showError('Não foi possível carregar os heróis.');
    });
}


// Função para exibir erro
function showError(msg) {
  errorEl.hidden = false;
  errorEl.textContent = msg;
}

function hideError() {
  errorEl.hidden = true;
  errorEl.textContent = '';
}

// Cria os cards
function createCard(hero) {
  const card = document.createElement('article');
  card.className = 'card';
  card.setAttribute('aria-label', hero.name);

  const img = document.createElement('img');
  img.className = 'card-img';
  img.src = `assets/${hero.file}`;
  img.alt = hero.name;

  const content = document.createElement('div');
  content.className = 'card-content';

  const title = document.createElement('h3');
  title.className = 'card-title';
  title.textContent = hero.name;

  const sub = document.createElement('p');
  sub.className = 'card-sub';
  sub.innerHTML = `<span>${hero.publisher}</span> <span class="badge">${hero.alignment}</span>`;

  content.appendChild(title);
  content.appendChild(sub);
  card.appendChild(img);
  card.appendChild(content);

  card.addEventListener('click', () => openModal(hero));
  return card;
}

// Modal
function openModal(hero) {
  modal.hidden = false;
  modal.style.display = 'flex';
  modalBody.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'modal-body';

  const img = document.createElement('img');
  img.src = `assets/${hero.file}`;
  img.alt = hero.name;

  const info = document.createElement('div');
  info.className = 'modal-info';

  const title = document.createElement('h2');
  title.textContent = hero.name;

  const list = document.createElement('ul');
  list.style.lineHeight = '1.7';
  list.style.marginTop = '12px';
  list.innerHTML = `
    <li><strong>Nome completo:</strong> ${hero.fullName || '—'}</li>
    <li><strong>Primeira aparição:</strong> ${hero.firstAppearance || '—'}</li>
    <li><strong>Publisher:</strong> ${hero.publisher || '—'}</li>
    <li><strong>Alinhamento:</strong> ${hero.alignment || '—'}</li>
  `;

  info.appendChild(title);
  info.appendChild(list);

  wrapper.appendChild(img);
  wrapper.appendChild(info);
  modalBody.appendChild(wrapper);
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.hidden = true;
  modal.style.display = 'none';
  modalBody.innerHTML = '';
  document.body.style.overflow = '';
}

// Renderiza cards
function renderCards(list) {
  cardsContainer.innerHTML = '';
  list.forEach(hero => {
    const card = createCard(hero);
    cardsContainer.appendChild(card);
  });
}

// Busca local
searchBtn.addEventListener('click', () => {
  hideError();
  const q = searchInput.value.trim().toLowerCase();
  if (!q) {
    showError('Digite um nome para buscar.');
    return;
  }
  const filtered = heroes.filter(h => h.name.toLowerCase().includes(q));
  if (filtered.length > 0) {
    renderCards(filtered);
  } else {
    showError('Personagem não encontrado.');
  }
});

loadMoreBtn.addEventListener('click', () => renderCards(heroes));
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

// Busca uma frase heroica para exibir na página
const quoteEl = document.getElementById('heroQuote');

fetch('https://api.quotable.io/random?tags=inspirational')
  .then(response => response.json())
  .then(data => {
    quoteEl.textContent = `"${data.content}" — ${data.author}`;
  })
  .catch(error => {
    console.error('Erro ao buscar citação:', error);
    quoteEl.textContent = 'Nem todos os heróis usam capas...';
  });

console.log("DC Comics local script carregado com sucesso!");
window.addEventListener('DOMContentLoaded', loadHeroes);
