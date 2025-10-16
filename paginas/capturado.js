function Capturados() {
  document.body.style.background = "radial-gradient(circle at top, #101014, #000)";
  const root = document.getElementById("root");
  root.innerHTML = `
    <h1 style="text-align:center; margin-top:20px;">🛒 Productos Capturados</h1>
    <div id="carrito-lista" class="c-contenedor-lista"></div>
  `;

  const lista = document.getElementById("carrito-lista");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    lista.innerHTML = `<p>No hay productos en el carrito.</p>`;
    return;
  }

  carrito.forEach(prod => {
    const div = document.createElement("div");
    div.className = "c-lista-producto";
    div.innerHTML = `
      <img src="${prod.images?.[0] || 'https://via.placeholder.com/100'}" alt="${prod.title}">
      <h3>${prod.title}</h3>
      <p>$${prod.price}</p>
    `;
    lista.appendChild(div);
  });
}
