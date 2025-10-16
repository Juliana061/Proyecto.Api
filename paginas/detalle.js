

async function Detalle(id) {
  document.body.style.background = "radial-gradient(circle at top, #101014, #000)";
  const root = document.getElementById("root");

  try {
    const respuesta = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
    const prod = await respuesta.json();

    root.innerHTML = `
      <div class="detalle-producto" style="text-align:center; padding:40px;">
        <img src="${prod.images?.[0] || 'https://via.placeholder.com/200'}" width="200">
        <h2>${prod.title}</h2>
        <p>${prod.description}</p>
        <h3>💲${prod.price}</h3>
        <button onclick="agregarFavorito(${id})">⭐ Agregar a Favoritos</button>
        <button onclick="agregarCarrito(${id})">🛒 Agregar al Carrito</button>
        <br><br>
        <button onclick="Home()">⬅ Volver</button>
      </div>
    `;
  } catch (error) {
    root.innerHTML = `<p>Error al cargar el detalle del producto.</p>`;
  }
}

async function agregarFavorito(id) {
  const respuesta = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
  const prod = await respuesta.json();
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  if (!favoritos.find(p => p.id === prod.id)) favoritos.push(prod);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  alert("✅ Producto agregado a favoritos");
}

async function agregarCarrito(id) {
  const respuesta = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
  const prod = await respuesta.json();
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (!carrito.find(p => p.id === prod.id)) carrito.push(prod);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("🛒 Producto agregado al carrito");
}
