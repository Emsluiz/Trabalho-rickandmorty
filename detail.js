const content = document.getElementById('detail');
const id = Number(window.location.hash.replace("#", ""));

async function getCharacterDetail() {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const data = await response.json();

  const locationResponse = await fetch(data.location.url);
  const locationData = await locationResponse.json();

  const detailHTML = `
    <h2>${data.name}</h2>
    <img src="${data.image}" alt="${data.name}" />
    <ul>
      <li><strong>Espécie:</strong> ${data.species}</li>
      <li><strong>Gênero:</strong> ${data.gender}</li>
      <li><strong>Dimensão:</strong> ${locationData.dimension || "Desconhecida"}</li>
      <li><strong>Status:</strong> ${data.status}</li>
    </ul>
    <a href="index.html">Voltar à lista</a>
  `;

  content.innerHTML = detailHTML;
}

getCharacterDetail();
