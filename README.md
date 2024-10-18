<p align="center"><img src="frontend/components/img/Pokédex_logo.png" width="400" alt="Pokédex Logo"></p>

# Pokédex Project

Este proyecto es una Pokédex web que permite mostrar información de Pokémon, almacenarlos en una base de datos y eliminarlos. El proyecto está dividido en dos partes principales: el **frontend**, que es una aplicación estática en HTML, CSS y JavaScript, y el **backend**, que es una API REST creada con Laravel para manejar la lógica del servidor y la base de datos.

## Frontend

- **Lenguajes/tecnologías utilizadas**: HTML, CSS, JavaScript, bootstrap.
- **Descripción**:
  - El frontend es una aplicación estática que se conecta al backend para mostrar, guardar y eliminar Pokémon.
  - **index.html**: Página principal donde se puede mostrar un Pokémon aleatorio cada 30 segundos o cuando se presiona el botón. Incluye un temporizador y la opción de modo oscuro.
  - **guardados.html**: Página donde se muestran los Pokémon almacenados en la base de datos. Los usuarios pueden eliminarlos desde esta vista.

- **Funciones implementadas**:
  - **Mostrar Pokémon aleatorio**: Cada 30 segundos o al presionar un botón, se realiza una consulta a la API de Pokémon para mostrar un Pokémon aleatorio.
  - **Guardar Pokémon**: Al presionar un botón, el Pokémon mostrado se guarda en la base de datos.
  - **Ver Pokémon guardados**: En la página `guardados.html`, los Pokémon guardados se muestran en forma de cartas.
  - **Eliminar Pokémon**: En `guardados.html`, se puede eliminar un Pokémon guardado al presionar el botón "Eliminar".
  - **Modo Oscuro**: Se implementó la funcionalidad de modo oscuro en ambas páginas.

## Backend

- **Framework**: Laravel
- **Descripción**:
  - El backend es una API REST que se encarga de manejar la lógica del servidor y el almacenamiento de datos en la base de datos.
  - La API se comunica con el frontend para recibir solicitudes de guardar, eliminar y listar Pokémon.

- **Rutas de la API**:
  - `GET /api/pokemons`: Obtiene todos los Pokémon guardados en la base de datos.
  - `POST /api/pokemons`: Guarda un nuevo Pokémon en la base de datos.
  - `DELETE /api/pokemons/{id}`: Elimina un Pokémon por su ID.

- **Funciones implementadas**:
  - **Guardar Pokémon**: El backend recibe datos del Pokémon desde el frontend y los almacena en la base de datos.
  - **Listar Pokémon guardados**: Devuelve una lista de todos los Pokémon guardados en la base de datos en formato JSON.
  - **Eliminar Pokémon**: Permite eliminar un Pokémon de la base de datos por su ID.

---

Este proyecto combina un frontend estático con una API REST en Laravel para crear una Pokédex completamente funcional.
