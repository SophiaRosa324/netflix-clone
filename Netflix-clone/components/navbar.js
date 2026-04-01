async function loadNavbar() {
  const res = await fetch("../components/navbar.html");
  const data = await res.text();

  document.getElementById("navbar").innerHTML = data;

  const profile = JSON.parse(localStorage.getItem("currentProfile"));

  if (profile) {
    document.getElementById("nav-user").innerText = profile.name;
  }
}

// IR PRA HOME
function goHome() {
  window.location.href = "home.html";
}

// LOGOUT
function logout() {
  localStorage.removeItem("currentProfile");
  window.location.href = "index.html";
}

// SCROLL SUAVE
function scrollToSection(id) {
  const section = document.getElementById(id);

  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth"
  });
}