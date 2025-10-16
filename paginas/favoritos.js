function Favoritos() {
  document.body.style.background = "radial-gradient(circle at top, #101014, #000)";
  const root = document.getElementById("root");
  root.innerHTML = `
    <h1 style="text-align:center; margin-top:20px;">⭐ Mis Favoritos</h1>
    <div id="favoritos-lista" class="c-contenedor-lista"></div>
  `;

  const lista = document.getElementById("favoritos-lista");
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (favoritos.length === 0) {
    lista.innerHTML = `<p>No tienes productos favoritos aún.</p>`;
    return;
  }

  favoritos.forEach(prod => {
    const div = document.createElement("div");
    div.className = "c-lista-producto";
    div.innerHTML = `
      <img src="${prod.images?.[0] || 'https://via.placeholder.com/100'}" alt="${prod.title}">
      <h3>${prod.title}</h3>
      <p>$${prod.price}</p>
      <button class="btn-eliminar-fav" data-id="${prod.id}">Eliminar</button>
    `;
    lista.appendChild(div);
  });

  document.querySelectorAll(".btn-eliminar-fav").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = parseInt(e.target.dataset.id);
      const nuevosFav = favoritos.filter(p => p.id !== id);
      localStorage.setItem("favoritos", JSON.stringify(nuevosFav));
      Favoritos(); // recargar vista
    });
  });
}
