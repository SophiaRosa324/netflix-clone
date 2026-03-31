let profiles = JSON.parse(localStorage.getItem("profiles")) || [
  { name: "Ireni", img: "imagens/IRENE DI ALGO.jpg" },
  { name: "João", img: "imagens/mambo.jpg" }
];

function renderProfiles() {
  const container = document.querySelector(".profiles");
  container.innerHTML = "";

  profiles.forEach((profile, index) => {
    const div = document.createElement("div");
    div.classList.add("profile");

    div.innerHTML = `
      <div class="profile-img">
        <img src="${profile.img}">
        <div class="profile-overlay">
          <button onclick="editProfile(${index})">✏</button>
          <button onclick="deleteProfile(${index})">🗑</button>
        </div>
      </div>
      <p>${profile.name}</p>
    `;

    div.onclick = (e) => {
      if (e.target.tagName === "BUTTON") return;
      selectProfile(index);
    };

    container.appendChild(div);
  });

  const add = document.createElement("div");
  add.classList.add("profile", "add");
  add.innerHTML = `<span>+</span><p>Adicionar</p>`;
  add.onclick = () => window.location.href = "create-profile.html";

  container.appendChild(add);
}

function editProfile(index) {
  localStorage.setItem("editIndex", index);
  window.location.href = "create-profile.html";
}

function deleteProfile(index) {
  if (!confirm("Excluir perfil?")) return;

  profiles.splice(index, 1);
  localStorage.setItem("profiles", JSON.stringify(profiles));
  renderProfiles();
}

function selectProfile(index) {
  localStorage.setItem("currentProfile", JSON.stringify(profiles[index]));
  window.location.href = "home.html";
}

renderProfiles();