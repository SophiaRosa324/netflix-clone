const apiKey = "562f19efed6f6900df44bd9bb0d35c3f";

const profile = JSON.parse(localStorage.getItem("currentProfile"));
if (!profile) window.location.href = "index.html";

document.getElementById("username").innerText = profile.name;

// FAVORITOS
function showFavorites() {
  const container = document.getElementById("favorites");
  const favs = JSON.parse(localStorage.getItem("favorites")) || [];

  favs.forEach(movie => createCard(movie, container));
}

async function searchMovies(query) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
  );

  const data = await res.json();

  const container = document.getElementById("searchResults");
  container.innerHTML = "";

  data.results.forEach(movie => createCard(movie, container));
}

async function filterByGenre(genreId) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
  );

  const data = await res.json();

  const container = document.getElementById("searchResults");
  container.innerHTML = "";

  data.results.forEach(movie => createCard(movie, container));
}

// CATEGORIAS
async function getCategory(url, id) {
  const res = await fetch(url);
  const data = await res.json();

  const container = document.getElementById(id);
  data.results.forEach(movie => createCard(movie, container));
}

// TRAILER
async function getTrailer(id) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`);
  const data = await res.json();

  const trailer = data.results.find(v => v.type === "Trailer");
  return trailer ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1` : null;
}

// CARD
function createCard(movie, container) {
  const card = document.createElement("div");
  card.classList.add("movie-card");

  card.innerHTML = `
    <div class="movie-inner">
      <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}">
      <div class="movie-info">
        <h4>${movie.title}</h4>
      </div>
      <div class="trailer"></div>
    </div>
  `;

  let timeout;

  card.addEventListener("mouseenter", () => {
    timeout = setTimeout(async () => {
      const url = await getTrailer(movie.id);
      if (url) {
        card.querySelector(".trailer").innerHTML =
          `<iframe src="${url}" allow="autoplay"></iframe>`;
      }
    }, 800);
  });

  card.addEventListener("mouseleave", () => {
    clearTimeout(timeout);
    card.querySelector(".trailer").innerHTML = "";
  });

  card.onclick = () => openMovie(movie);

  container.appendChild(card);
}

function openMovie(movie) {
  localStorage.setItem("movie", JSON.stringify(movie));
  window.location.href = "movie.html";
}

const searchInput = document.getElementById("searchInput");
const genreSelect = document.getElementById("genreSelect");

// busca por texto
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();

  if (query.length > 2) {
    searchMovies(query);
  }
});

// filtro por categoria
genreSelect.addEventListener("change", () => {
  const genre = genreSelect.value;

  if (genre) {
    filterByGenre(genre);
  }
});

// LOAD
showFavorites();

getCategory(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`, "trending");
getCategory(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35`, "comedy");
getCategory(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28`, "action");