const apiKey = "562f19efed6f6900df44bd9bb0d35c3f";

const movie = JSON.parse(localStorage.getItem("movie"));

if (!movie) window.location.href = "home.html";

// preencher dados
document.getElementById("title").innerText = movie.title;
document.getElementById("desc").innerText = movie.overview;

// TRAILER
async function loadTrailer() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`
  );

  const data = await res.json();

  const trailer = data.results.find(
    v => v.type === "Trailer" && v.site === "YouTube"
  );

  if (trailer) {
    document.getElementById("trailer").innerHTML = `
      <iframe 
        src="https://www.youtube.com/embed/${trailer.key}?autoplay=1"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen>
      </iframe>
    `;
  } else {
    document.getElementById("trailer").innerHTML = "<p>Trailer não disponível</p>";
  }
}

loadTrailer();

// FAVORITO
function addFavorite() {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favs.find(f => f.id === movie.id)) {
    favs.push(movie);
    localStorage.setItem("favorites", JSON.stringify(favs));
    alert("Adicionado aos favoritos ⭐");
  }
}

// SURPREENDA-ME 2.0
async function tryAnother() {
  const btn = event.target;
  btn.innerText = "🔄 Buscando...";

  const randomPage = Math.floor(Math.random() * 10) + 1;

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${randomPage}`
  );

  const data = await res.json();

  const movies = data.results;
  const randomMovie = movies[Math.floor(Math.random() * movies.length)];

  localStorage.setItem("movie", JSON.stringify(randomMovie));

  location.reload();
}