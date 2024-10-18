const typeColors = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dark: '#705848',
  dragon: '#7038F8',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
  normal: '#A8A878'
};

let cuentaAtras = 30;
let countCuentaAtras;

/* Fetch para mostrar Pokémon aleatorio */
async function fetchPokemon() {
  const random = Math.floor(Math.random() * 151) + 1;

  document.getElementById("cargando-datos").style.display = "block";
  document.getElementById("pokemon-carta").style.display = "none";

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`);
    const pokemon = await response.json();

    document.getElementById("cargando-datos").style.display = "none";
    document.getElementById("pokemon-carta").style.display = "block";

    document.getElementById("pokemon-imagen").src = pokemon.sprites.front_default;
    document.getElementById("pokemon-hover-imagen").src = pokemon.sprites.front_default;
    document.getElementById("pokemon-nombre").textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    document.getElementById("pokemon-number").textContent = `#${String(pokemon.id).padStart(4, '0')}`;

    const types = pokemon.types.map(typeInfo => typeInfo.type.name);
    const pokemonTypeElement = document.getElementById('pokemon-tipo');
    pokemonTypeElement.innerHTML = '';

    types.forEach(type => {
      const typeBadge = document.createElement('span');
      typeBadge.textContent = type.charAt(0).toUpperCase() + type.slice(1);
      typeBadge.classList.add('tipo-badge');
      typeBadge.style.backgroundColor = typeColors[type] || '#000';
      pokemonTypeElement.appendChild(typeBadge);
    });

    const abilities = pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(", ");
    document.getElementById("pokemon-habilidades").textContent = `Habilidades: ${abilities}`;

    cuentaAtras = 30;

  } catch (error) {
    console.error("Error al obtener el Pokémon:", error);
    document.getElementById("cargando-datos").textContent = "Error al cargar el Pokémon.";
  }
}

/* Función de cuenta regresiva para cambiar Pokémon automáticamente */
function actualizarCuentaAtras() {
  document.getElementById('contador-tiempo').textContent = cuentaAtras;
  cuentaAtras--;

  if (cuentaAtras < 0) {
    console.log("Cuenta atrás ha llegado a 0, obteniendo nuevo Pokémon");
    fetchPokemon();
    cuentaAtras = 30;
  }
}

/* Configuración inicial */
document.addEventListener('DOMContentLoaded', function() {
  const fetchPokemonButton = document.getElementById("fetch-pokemon");
  if (fetchPokemonButton) {

      fetchPokemon();

      countCuentaAtras = setInterval(actualizarCuentaAtras, 1000);

      fetchPokemonButton.addEventListener("click", () => {
          clearInterval(countCuentaAtras);
          fetchPokemon();
          cuentaAtras = 30;
          countCuentaAtras = setInterval(actualizarCuentaAtras, 1000);
      });
  }

  const pokemonCardsContainer = document.getElementById('pokemon-cards');
  if (pokemonCardsContainer) {
      fetchSavedPokemons();
  }
});

/* Guardar Pokémon en la base de datos */
document.getElementById("save-pokemon")?.addEventListener("click", function() {
  const pokemonData = {
      name: document.getElementById("pokemon-nombre").textContent,
      number: parseInt(document.getElementById("pokemon-number").textContent.replace("#", ""), 10),
      type: document.getElementById("pokemon-tipo").textContent.replace("Tipo: ", ""),
      abilities: document.getElementById("pokemon-habilidades").textContent.replace("Habilidades: ", "").split(", "),
      image: document.getElementById("pokemon-imagen").src 
  };

  fetch('http://localhost:8000/api/pokemons', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify(pokemonData),
  })
  .then(response => {
      if (response.status === 201) {
          return response.json();
      } else {
          throw new Error('Error al guardar el Pokémon');
      }
  })
  .then(data => {
      showAlert('Pokémon guardado correctamente', 'success');
  })
  .catch(error => {
      console.error('Error:', error);
      showAlert('Error al guardar el Pokémon', 'danger');
  });
});

/* Mostrar alertas */
function showAlert(message, type) {
  const alertId = `alert-${Date.now()}`;
  
  const alertHTML = `
    <div id="${alertId}" class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `;
  
  document.getElementById('alert-container').insertAdjacentHTML('beforeend', alertHTML);
  
  setTimeout(() => {
    const alertElement = document.getElementById(alertId);
    if (alertElement) {
      alertElement.classList.remove('show');
      alertElement.classList.add('hide');
      setTimeout(() => alertElement.remove(), 500); 
    }
  }, 8000);
}

/* Obtener Pokémon guardados */
function fetchSavedPokemons() {
  console.log("Obteniendo los Pokémon guardados...");

  fetch('http://localhost:8000/api/pokemons', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      }
  })
  .then(response => response.json())
  .then(data => {
      const pokemonCardsContainer = document.getElementById('pokemon-cards');
      
      if (!pokemonCardsContainer) {
          console.error("El contenedor con ID 'pokemon-cards' no se encontró en el DOM.");
          return;
      }

      pokemonCardsContainer.innerHTML = '';

      data.forEach((pokemon) => {
          const abilities = JSON.parse(pokemon.abilities).join(", ");

          const types = pokemon.type.split(", ");

          let typeBadgesHTML = '';
          types.forEach(type => {
              const typeBadgeColor = typeColors[type.toLowerCase()] || '#000'; 
              typeBadgesHTML += `<span class="tipo-badge" style="background-color: ${typeBadgeColor}; color: white; padding: 0.2em 0.6em; margin-right: 5px;">${type.charAt(0).toUpperCase() + type.slice(1)}</span>`;
          });

          // Crear una carta para cada Pokémon guardado
          const card = `
              <div class="col-md-4">
                  <div class="card pokemon-cards mx-auto mt-3" style="width: 18rem;">
                      <img src="${pokemon.image}" class="card-img-top" alt="Imagen de ${pokemon.name}">
                      <div class="card-body">
                          <h6 class="card-title">#${pokemon.number}</h6>
                          <h5 class="card-title">${pokemon.name}</h5>
                          <p class="card-text"><strong>Tipo:</strong> ${typeBadgesHTML}</p>
                          <p class="card-text"><strong>Habilidades:</strong> ${abilities}</p>
                          <button class="btn btn-danger" onclick="deletePokemon(${pokemon.id})">Eliminar</button>
                      </div>
                  </div>
              </div>
          `;
          pokemonCardsContainer.insertAdjacentHTML('beforeend', card);
      });
  })
  .catch(error => {
      console.error('Error al obtener los Pokémon guardados:', error);
      showAlert('Error al obtener los Pokémon guardados', 'danger');
  });
}

/* Eliminar Pokémon */
function deletePokemon(pokemonId) {
  fetch(`http://localhost:8000/api/pokemons/${pokemonId}`, {
      method: 'DELETE',
      headers: {
          'Accept': 'application/json',
      }
  })
  .then(response => {
      if (response.status === 200) {
          showAlert('Pokémon eliminado correctamente', 'success');
          fetchSavedPokemons();
      } else {
          showAlert('Error al eliminar el Pokémon', 'danger');
      }
  })
  .catch(error => {
      console.error('Error al eliminar el Pokémon:', error);
      showAlert('Error al eliminar el Pokémon', 'danger');
  });
}

/* Modo oscuro */
function toggleTheme() {
  const body = document.body;
  const themeButton = document.getElementById('toggle-theme');

  body.classList.toggle('dark-mode');
  
  if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      themeButton.textContent = 'Claro';
  } else {
      localStorage.setItem('theme', 'light');
      themeButton.textContent = 'Oscuro';
  }
}

function loadTheme() {
  const theme = localStorage.getItem('theme');
  const body = document.body;
  const themeButton = document.getElementById('toggle-theme');

  if (themeButton) {
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      themeButton.textContent = 'Claro';
    } else {
      body.classList.add('light-mode');
      themeButton.textContent = 'Oscuro';
    }
  }
}


loadTheme();
document.getElementById('toggle-theme')?.addEventListener('click', toggleTheme);
