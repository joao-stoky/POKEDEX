async function carregarTop5() {
  const container = document.getElementById('top5-container');
  container.innerHTML = ''; 

  try {
    const response = await fetch('relatorio_top5_experiencia.csv');
    const csvText = await response.text();

    const linhas = csvText.trim().split('\n');
    const cabecalho = linhas[0].split(',');

    const dados = linhas.slice(1).map(linha => {
      // corrigir virgula pra não dar BO no código
      const regex = /(".*?"|[^",]+)(?=\s*,|\s*$)/g;
      const matches = linha.match(regex);
      const obj = {};
      cabecalho.forEach((col, i) => {
        let val = matches[i].trim();

        // Remove aspas duplas
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.slice(1, -1);
        }

        obj[col.trim()] = val;
      });
      return obj;
    });

    dados.forEach(pokemon => {
  const idLimpo = pokemon.ID.replace(/^0+/, '').trim();

  let tipos = pokemon['Tipos']
    .replace(/[\[\]'"]/g, '')
    .split(',')
    .map(t => t.trim())
    .filter(Boolean)
    .join(', ');

  const card = document.createElement('div');
  card.className = 'card';

  const img = document.createElement('img');
  img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idLimpo}.png`;
  img.alt = pokemon.Nome;
  img.width = 120;
  img.height = 120;
  img.loading = "lazy";
  img.style.filter = 'drop-shadow(0 4px 4px rgba(0,0,0,0.3))';
  img.style.display = "block";
  img.style.margin = "10px auto";

  card.innerHTML = `
    <h2>${pokemon.Nome}</h2>
  `;

  card.appendChild(img);

  const info = document.createElement('div');
  info.innerHTML = `
    <p><strong>Experiência Base:</strong> ${pokemon['Experiência Base']}</p>
    <p><strong>HP:</strong> ${pokemon.HP}</p>
    <p><strong>Ataque:</strong> ${pokemon.Ataque}</p>
    <p><strong>Defesa:</strong> ${pokemon.Defesa}</p>
    <p><strong>Tipos:</strong> ${tipos}</p>
  `;

  card.appendChild(info);
  container.appendChild(card);
});


  } catch (error) {
    container.innerHTML = `<p>Erro ao carregar os dados.</p>`;
    console.error('Erro ao carregar CSV:', error);
  }
}

window.onload = carregarTop5;
