
function parseCSV(csv) {
  const lines = csv.split('\n').filter(line => line.trim() !== '');
  const headers = lines[0].split(',').map(h => h.trim());

  const data = lines.slice(1).map(line => {
    const regex = /(".*?"|[^",]+)(?=\s*,|\s*$)/g;
    const matches = line.match(regex) || [];
    const values = matches.map(v => v.replace(/^"|"$|^'|'$/g, '').trim());

    const entry = {};
    headers.forEach((header, i) => {
      entry[header] = values[i];
    });
    return entry;
  });

  return data;
}

function createCard(pokemon) {
  const card = document.createElement('div');
  card.className = 'pokemon-card';

  // limpar o ID
  const idLimpo = pokemon.ID.replace(/^0+/, '').trim();

  // tipos
  const typeList = (pokemon.Tipos || '')
    .replace(/[\[\]"']/g, '')
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);
  const tipoPrincipal = typeList[0] || "Normal";

  card.setAttribute("data-tipo", tipoPrincipal); // usado no CSS por tipo

  // Cabeçalho com nome + HP
  const header = document.createElement('div');
  header.className = 'card-header';
  header.innerHTML = `
    <span class="card-nome">${pokemon.Nome}</span>
    <span class="card-hp">${pokemon.HP} HP</span>
  `;

  // Imagem
  const img = document.createElement('img');
  img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idLimpo}.png`;
  img.alt = pokemon.Nome;
  img.loading = "lazy";

  const imgWrapper = document.createElement('div');
  imgWrapper.className = 'card-img';
  imgWrapper.appendChild(img);

  // Tipos
  const types = document.createElement('div');
  types.className = 'pokemon-types';
  typeList.forEach(type => {
    const span = document.createElement('span');
    span.className = 'pokemon-type';
    span.textContent = type;
    types.appendChild(span);
  });

  // Info
  const info = document.createElement('div');
  info.className = 'card-info';
  info.innerHTML = `
    <p><strong>Ataque:</strong> ${pokemon.Ataque}</p>
    <p><strong>Defesa:</strong> ${pokemon.Defesa}</p>
    <p><strong>XP:</strong> ${pokemon["Experiência Base"]}</p>
  `;

  card.appendChild(header);
  card.appendChild(imgWrapper);
  card.appendChild(types);
  card.appendChild(info);

  return card;
}


let todosPokemons = [];
let pokemonsPorPagina = 20;
let paginaAtual = 0;

function parseCSV(csv) {
  const lines = csv.split('\n').filter(line => line.trim() !== '');
  const headers = lines[0].split(',').map(h => h.trim());

  const data = lines.slice(1).map(line => {
    const regex = /(".*?"|[^",]+)(?=\s*,|\s*$)/g;
    const matches = line.match(regex) || [];
    const values = matches.map(v => v.replace(/^"|"$|^'|'$/g, '').trim());

    const entry = {};
    headers.forEach((header, i) => {
      entry[header] = values[i];
    });
    return entry;
  });

  return data;
}

function mostrarPokemons() {
  const container = document.getElementById('pokemon-container');
  const inicio = paginaAtual * pokemonsPorPagina;
  const fim = inicio + pokemonsPorPagina;

  const pokemonsParaMostrar = todosPokemons.slice(inicio, fim);

  pokemonsParaMostrar.forEach(pokemon => {
    const card = createCard(pokemon);
    container.appendChild(card);
  });

  paginaAtual++;

  // Oculta botão se não houver mais pokémons
  if (paginaAtual * pokemonsPorPagina >= todosPokemons.length) {
    document.getElementById('carregar-mais').style.display = 'none';
  }
}

async function loadCSVAndDisplay() {
  const response = await fetch('pokemons_100.csv');
  const text = await response.text();
  todosPokemons = parseCSV(text);
  mostrarPokemons(); // mostra os 20 primeiros
}

document.getElementById('carregar-mais').addEventListener('click', mostrarPokemons);

loadCSVAndDisplay();


