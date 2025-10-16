
let productos = [];

async function conexionLista() {
  try {
    const respuesta = await fetch("https://api.escuelajs.co/api/v1/products");
    if (!respuesta.ok) {
      throw new Error("Error al obtener los productos desde la API");
    }

    const data = await respuesta.json();

    const productosFormateados = data.map(p => ({
      id: p.id,
      name: p.title,
      img: Array.isArray(p.images) ? p.images[0] : "https://via.placeholder.com/150",
      price: p.price
    }));

    return productosFormateados;
  } catch (error) {
    console.error(" Error en la conexión a la API:", error);
    return [];
  }
}

async function General() {
  try {
    if (productos.length === 0) {
      productos = await conexionLista();
    }
    Home(); 
  } catch (error) {
    console.error("❌ Error general al cargar productos:", error);
  }
}
