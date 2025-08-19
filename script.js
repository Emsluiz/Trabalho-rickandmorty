const content = document.getElementById('content');
const paginateDiv = document.getElementById('paginate');
let page = Number(window.location.hash.replace("#", ""));
let maxpage = 0;

async function getCharacters() {
  content.innerHTML = '';

  const response =
    await fetch(`https://rickandmortyapi.com/api/character${isNaN(page) || page < 1 ? '' : '?page=' + page}`);
  const data = await response.json();
  maxpage = data.info.pages;

  const lista = document.createElement('ul');
  let characters = '';
  data.results.forEach(element => {
    characters += `<li>
      <a href="detail.html#${element.id}">
        ${element.name}
        <br />
        <img src="${element.image}" alt="${element.name}"/>
      </a>
    </li>`;
  });
  lista.innerHTML = characters;
  content.appendChild(lista);

  // Criar botões "Voltar" e "Próximo"
  paginateDiv.innerHTML = '';

  if (page > 1) {
    const btnPrev = document.createElement('button');
    btnPrev.textContent = 'Voltar';
    btnPrev.onclick = prev;
    paginateDiv.appendChild(btnPrev);
  }

  if (!page || page < maxpage) {
    const btnNext = document.createElement('button');
    btnNext.textContent = 'Próximo';
    btnNext.onclick = next;
    paginateDiv.appendChild(btnNext);
  }
}

getCharacters();

async function next() {
  const newPage = (!page || page < 1) ? 2 : page + 1;
  window.location.hash = "#" + newPage;
  window.location.reload();
}

function prev() {
  const newPage = (page > 1) ? page - 1 : 1;
  window.location.hash = "#" + newPage;
  window.location.reload();
}
