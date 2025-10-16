function crearCard(producto) {
  const card = document.createElement("div");
  card.className = "c-lista-producto";

  const imagen = (producto.images && producto.images.length > 0 && producto.images[0].startsWith("http"))
    ? producto.images[0]
    : "https://via.placeholder.com/600x400";

  card.innerHTML = `
    <img src="${imagen}" alt="${producto.title}">
    <h3>${producto.title}</h3>
    <p>$${producto.price}</p>
  `;

  card.onclick = () => Detalle(producto.id);

  return card;
}

async function Home() {
  document.body.style.background = "radial-gradient(circle at top, #101014, #000)";
  
  const root = document.getElementById("root");
  root.innerHTML = `
    <input type="text" id="buscar" placeholder="Buscar producto..." class="input-buscar">
    <div id="lista" class="c-contenedor-lista"></div>
  `;

  const lista = document.getElementById("lista");
  const inputBuscar = document.getElementById("buscar");

  try {
    const respuesta = await fetch("https://api.escuelajs.co/api/v1/products");
    let productos = await respuesta.json();

    productos = productos.filter(p => 
      p.title && p.title !== "string" && 
      p.title.trim().length > 2 &&
      p.images && p.images.length > 0 &&
      p.images[0].startsWith("http")
    );

    mostrarProductos(productos);

    inputBuscar.addEventListener("input", e => {
      const texto = e.target.value.toLowerCase();
      const filtrados = productos.filter(p =>
        p.title.toLowerCase().includes(texto)
      );
      mostrarProductos(filtrados);
    });

    function mostrarProductos(listaProductos) {
      lista.innerHTML = "";
      listaProductos.forEach(prod => lista.appendChild(crearCard(prod)));
    }

  } catch (error) {
    console.error("Error al cargar los productos:", error);
    lista.innerHTML = `<p>Error al cargar los productos 🛠️</p>`;
  }
}
