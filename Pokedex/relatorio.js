const tipoCores = {
  Normal: '#A8A77A',
  Fire: '#EE8130',
  Water: '#6390F0',
  Electric: '#F7D02C',
  Grass: '#7AC74C',
  Ice: '#96D9D6',
  Fighting: '#C22E28',
  Poison: '#A33EA1',
  Ground: '#E2BF65',
  Flying: '#A98FF3',
  Psychic: '#F95587',
  Bug: '#A6B91A',
  Rock: '#B6A136',
  Ghost: '#735797',
  Dragon: '#6F35FC',
  Dark: '#705746',
  Steel: '#B7B7CE',
  Fairy: '#D685AD'
};

const tipoEmojis = {
  Normal: '⭐',
  Fire: '🔥',
  Water: '💧',
  Electric: '⚡',
  Grass: '🌿',
  Ice: '❄️',
  Fighting: '🥊',
  Poison: '☠️',
  Ground: '🌍',
  Flying: '🌪️',
  Psychic: '🔮',
  Bug: '🐞',
  Rock: '🪨',
  Ghost: '👻',
  Dragon: '🐉',
  Dark: '🌑',
  Steel: '⚙️',
  Fairy: '🧚'
};

// deixar o csv como array de objetos
function parseCSV(csv) {
  const lines = csv.split('\n').filter(line => line.trim() !== '');
  const headers = lines[0].split(',').map(h => h.trim());
  const data = lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const entry = {};
    headers.forEach((header, i) => {
      entry[header] = values[i];
    });
    return entry;
  });
  return data;
}

// criar card
function createRelatorioCard(tipo) {
  const card = document.createElement('div');
  card.className = 'pokemon-card';

 const tipoNome = tipo.Tipos;
const cor = tipoCores[tipoNome] || '#CCCCCC';
const emoji = tipoEmojis[tipoNome] || '❓';

const type = document.createElement('div');
type.className = 'pokemon-name';
type.textContent = `${emoji} ${tipoNome}`;


  const stats = document.createElement('div');
  stats.className = 'pokemon-stats';
  stats.innerHTML = `
    <strong>Ataque médio:</strong> ${parseFloat(tipo["Ataque"]).toFixed(1)}<br/>
    <strong>Defesa média:</strong> ${parseFloat(tipo["Defesa"]).toFixed(1)}<br/>
    <strong>HP médio:</strong> ${parseFloat(tipo["HP"]).toFixed(1)}
  `;

  card.appendChild(type);
  card.appendChild(stats);

  return card;
}

// carrega e exibe os dados
async function loadRelatorio() {
  try {
    const response = await fetch('relatorio_medias_por_tipo.csv');
    const text = await response.text();
    const data = parseCSV(text);

    const container = document.getElementById('relatorio-container');
    data.forEach(tipo => {
      const card = createRelatorioCard(tipo);
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar relatório:", error);
  }
}

loadRelatorio();
