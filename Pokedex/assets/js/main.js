const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  const modalId = `modalDialog-${pokemon.number}`;
  return `
    <li class="pokemon ${pokemon.type}">
      <span class="number">#${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>

      <div class="detail">
        <ol class="types">
          ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>

        <img src="${pokemon.photo}" alt="${pokemon.name}">
      </div>
      <button class="showMoreButtons" data-modal-target="${modalId}">Show More</button>
      <dialog id="${modalId}" class="modalDialog">
        
      <div class="pokemon ${pokemon.type}">
      <span class="number">#${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>
      <ol class="typesModal">
        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
      </ol>
      <img src="${pokemon.photo}" alt="${pokemon.name}">
            <div class="fundoW"> 

      <span class="info">Peso: ${pokemon.weight}</span>
      <span class="info">HP: ${pokemon.hp}</span>
      <span class="info">Defesa: ${pokemon.defense}</span>
      <span class="info">Ataque Especial: ${pokemon.specialAttack}</span>
      <span class="info">Defesa Especial: ${pokemon.specialDefense}</span>
      <span class="info">Velocidade: ${pokemon.speed}</span>







        <button class="closeModalButton">Close</button>
        </div>
      </dialog>
    </li>
  `;
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.showModal();
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.close();
  }
}

pokemonList.addEventListener('click', (e) => {
  const target = e.target;

  if (target.classList.contains('showMoreButtons')) {
    const modalId = target.getAttribute('data-modal-target');
    openModal(modalId);
  } else if (target.classList.contains('closeModalButton')) {
    const modalId = target.closest('.modalDialog').id;
    closeModal(modalId);
  }
});

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join('');
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  const qtdRecordsWithNextPage = offset + limit;

  if (qtdRecordsWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
