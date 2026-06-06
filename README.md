# Pokédex Vue Edition

<p align="center">
  <strong>Aplicación web full stack para explorar, buscar, filtrar y crear Pokémon.</strong>
</p>

<p align="center">
  <a href="https://pi-pokemon-vue.vercel.app">
    <img src="https://img.shields.io/badge/Demo%20Online-Vercel-000000?style=for-the-badge&logo=vercel" alt="Demo online" />
  </a>
  <a href="https://pi-pokemon-vue-api.onrender.com/pokemons">
    <img src="https://img.shields.io/badge/API%20REST-Render-46E3B7?style=for-the-badge&logo=render&logoColor=000000" alt="API REST" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue.js-3-4FC08D?style=flat-square&logo=vuedotjs&logoColor=ffffff" alt="Vue 3" />
  <img src="https://img.shields.io/badge/Pinia-State%20Management-F7D336?style=flat-square" alt="Pinia" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=flat-square&logo=nodedotjs&logoColor=ffffff" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-API%20REST-000000?style=flat-square&logo=express&logoColor=ffffff" alt="Express" />
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat-square&logo=postgresql&logoColor=ffffff" alt="PostgreSQL" />
</p>

---

## Descripción

**Pokédex Vue Edition** es una aplicación web full stack que permite explorar Pokémon obtenidos desde [PokeAPI](https://pokeapi.co/), consultar sus estadísticas, buscar resultados, aplicar filtros y ordenar el listado.

También permite crear Pokémon personalizados, almacenarlos en una base de datos PostgreSQL y eliminarlos posteriormente desde la propia interfaz.

El proyecto fue desarrollado originalmente como una práctica académica con **React** y **Redux**. Posteriormente reconstruí el frontend utilizando **Vue 3** y **Pinia** para practicar la migración entre frameworks, profundizar mis conocimientos de arquitectura frontend y mejorar completamente la experiencia visual.

---

## Demo online

| Servicio           | URL                                              |
| ------------------ | ------------------------------------------------ |
| Aplicación web     | https://pi-pokemon-vue.vercel.app                |
| API REST           | https://pi-pokemon-vue-api.onrender.com          |
| Endpoint de prueba | https://pi-pokemon-vue-api.onrender.com/pokemons |

> La API está alojada en una instancia gratuita de Render. La primera solicitud puede tardar algunos segundos mientras el servicio se reactiva.

---

## Funcionalidades

* Landing page responsive.
* Listado paginado de Pokémon.
* Tarjetas reutilizables con imagen, nombre, tipo, ataque y origen.
* Búsqueda por nombre.
* Filtros por tipo.
* Filtros por origen: API externa o base de datos.
* Ordenamiento alfabético ascendente y descendente.
* Ordenamiento por nivel de ataque.
* Vista de detalle con estadísticas completas.
* Badges identificados visualmente según el tipo del Pokémon.
* Creación de nuevos Pokémon mediante un formulario.
* Validaciones desarrolladas con JavaScript.
* Selección de uno o dos tipos por Pokémon.
* Persistencia de registros en PostgreSQL.
* Eliminación de Pokémon creados por el usuario.
* Estados de carga y mensajes de error.
* Diseño responsive para escritorio, tablet y dispositivos móviles.

---

## Arquitectura

La aplicación utiliza un frontend desacoplado que consume una API REST propia.

```text
Frontend con Vue 3
        ↓
API REST con Node.js y Express
        ↓
┌───────────────────────┬────────────────────────┐
│ PokeAPI               │ PostgreSQL en Neon     │
│ Pokémon externos      │ Pokémon personalizados │
└───────────────────────┴────────────────────────┘
```

El backend combina los Pokémon provenientes de PokeAPI con los registros almacenados en PostgreSQL. Como resultado, ambos tipos de datos aparecen dentro del mismo listado y pueden filtrarse por su origen.

---

## Tecnologías utilizadas

### Frontend actual

| Tecnología | Uso                                              |
| ---------- | ------------------------------------------------ |
| Vue 3      | Construcción de la interfaz mediante componentes |
| Pinia      | Manejo del estado global                         |
| Vue Router | Navegación entre vistas                          |
| Axios      | Comunicación con la API REST                     |
| Vite       | Entorno de desarrollo y compilación              |
| JavaScript | Lógica de la aplicación                          |
| HTML       | Estructura semántica                             |
| CSS        | Diseño visual y responsive                       |

### Backend

| Tecnología | Uso                                            |
| ---------- | ---------------------------------------------- |
| Node.js    | Entorno de ejecución del servidor              |
| Express    | Desarrollo de la API REST                      |
| Sequelize  | ORM para interactuar con PostgreSQL            |
| PostgreSQL | Persistencia de Pokémon creados por el usuario |
| Axios      | Consumo de PokeAPI desde el backend            |
| Dotenv     | Variables de entorno                           |
| CORS       | Comunicación segura entre frontend y backend   |
| Morgan     | Registro de solicitudes HTTP                   |

### Servicios externos y deploy

| Servicio | Uso                                 |
| -------- | ----------------------------------- |
| PokeAPI  | Fuente de datos de Pokémon          |
| Vercel   | Deploy del frontend                 |
| Render   | Deploy del backend                  |
| Neon     | Base de datos PostgreSQL en la nube |

---

## Estructura del repositorio

```text
PI-Pokemon/
├── api/          # Backend con Node.js, Express y Sequelize
├── client/       # Frontend original con React y Redux
└── client-vue/   # Frontend actual con Vue 3 y Pinia
```

La carpeta `client/` conserva la primera implementación desarrollada con React y Redux.

La carpeta `client-vue/` contiene la nueva versión creada con Vue 3, que es la aplicación desplegada actualmente.

---

## Endpoints principales

| Método   | Endpoint               | Descripción                                                 |
| -------- | ---------------------- | ----------------------------------------------------------- |
| `GET`    | `/pokemons`            | Obtiene Pokémon externos y registros creados por el usuario |
| `GET`    | `/pokemons/:id`        | Obtiene el detalle de un Pokémon                            |
| `GET`    | `/pokemons/name?name=` | Busca un Pokémon por nombre                                 |
| `POST`   | `/pokemons`            | Crea un nuevo Pokémon                                       |
| `DELETE` | `/pokemons/:id`        | Elimina un Pokémon creado por el usuario                    |
| `GET`    | `/types`               | Obtiene los tipos disponibles                               |

---

## Migración de React a Vue

La primera versión del proyecto fue construida con React y Redux. Posteriormente desarrollé un nuevo cliente con Vue 3 manteniendo el backend existente.

La migración me permitió trabajar con equivalencias entre ambos ecosistemas:

| React                           | Vue                            |
| ------------------------------- | ------------------------------ |
| React Router                    | Vue Router                     |
| Redux                           | Pinia                          |
| `useState()`                    | `ref()` y `reactive()`         |
| `useEffect()`                   | `onMounted()`                  |
| `.map()` en JSX                 | `v-for`                        |
| renderizado condicional         | `v-if`, `v-else-if` y `v-else` |
| props                           | `defineProps()`                |
| eventos desde componentes hijos | `defineEmits()`                |

---

## Ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/MarianoMasondo/PI-Pokemon.git
cd PI-Pokemon
```

### 2. Configurar el backend

```bash
cd api
npm install
```

Crear un archivo `.env` dentro de `api/`:

```env
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pokemon
```

Ejecutar el backend en modo desarrollo:

```bash
npm run dev
```

La API estará disponible en:

```text
http://localhost:3001
```

### 3. Configurar el frontend Vue

Abrir otra terminal:

```bash
cd client-vue
npm install
```

Crear un archivo `.env` dentro de `client-vue/`:

```env
VITE_API_URL=http://localhost:3001
```

Ejecutar el frontend:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

---

## Variables de entorno utilizadas en producción

### Backend en Render

```env
DATABASE_URL=postgresql://...
CLIENT_URL=https://pi-pokemon-vue.vercel.app
```

### Frontend en Vercel

```env
VITE_API_URL=https://pi-pokemon-vue-api.onrender.com
```

> Las credenciales reales no se almacenan dentro del repositorio.

---

## Aprendizajes principales

Durante el desarrollo y la migración trabajé especialmente en:

* Separación entre frontend y backend.
* Creación y consumo de una API REST.
* Migración de una SPA entre frameworks.
* Manejo de estado global con Pinia.
* Componentización con Vue.
* Formularios controlados y validaciones.
* Comunicación entre componentes mediante props y eventos.
* Integración de una API externa con una base de datos propia.
* Relaciones muchos a muchos mediante Sequelize.
* Normalización de datos provenientes de distintas fuentes.
* Estados de carga y manejo de errores.
* Diseño responsive con CSS Grid, Flexbox y media queries.
* Deploy desacoplado con Vercel, Render y Neon.

---

## Autor

**Mariano Masondo**

* GitHub: [github.com/MarianoMasondo](https://github.com/MarianoMasondo)
* LinkedIn: [linkedin.com/in/mariano-masondo](https://www.linkedin.com/in/mariano-masondo/)

---

<p align="center">
  Desarrollado como práctica de migración frontend y arquitectura full stack.
</p>
