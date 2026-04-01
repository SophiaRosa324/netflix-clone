let selectedImage = "imagens/default.png";
let editIndex = localStorage.getItem("editIndex");

if (editIndex !== null) {
  let profiles = JSON.parse(localStorage.getItem("profiles"));
  const profile = profiles[editIndex];

  document.getElementById("name").value = profile.name;
  document.getElementById("preview").src = profile.img;

  selectedImage = profile.img;
}

document.getElementById("imageInput").addEventListener("change", function () {
  const file = this.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    document.getElementById("preview").src = e.target.result;
    selectedImage = e.target.result;
  };

  if (file) reader.readAsDataURL(file);
});

function createProfile() {
  const name = document.getElementById("name").value;

  let profiles = JSON.parse(localStorage.getItem("profiles")) || [];

  if (editIndex !== null) {
    profiles[editIndex] = { name, img: selectedImage };
    localStorage.removeItem("editIndex");
  } else {
    profiles.push({ name, img: selectedImage });
  }

  localStorage.setItem("profiles", JSON.stringify(profiles));
  window.location.href = "index.html";
}

function cancel() {
  localStorage.removeItem("editIndex");
  window.location.href = "index.html";
}