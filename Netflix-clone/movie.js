const movie = JSON.parse(localStorage.getItem("movie"));

document.getElementById("title").innerText = movie.title;
document.getElementById("image").src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
document.getElementById("desc").innerText = movie.overview;

function addFavorite() {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];

  favs.push(movie);

  localStorage.setItem("favorites", JSON.stringify(favs));

  alert("Adicionado aos favoritos!");
}

