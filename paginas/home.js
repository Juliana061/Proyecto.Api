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
    var root = document.getElementById("root");
    root.innerHTML = "";

    // Crear buscador (igual que en el código Pokémon)
    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text";
    buscador.placeholder = "Buscar producto...";
    
    // Contenedor de filtros por categoría (como los tipos Pokémon)
    const contenedorFiltro = document.createElement("div");
    contenedorFiltro.classList.add("tipos-container");

    // Contenedor de lista de productos
    const contenedorLista = document.createElement("div");
    contenedorLista.classList.add("c-contenedor-lista");
    contenedorLista.id = "la-lista";

    // Agregar elementos al root
    root.appendChild(buscador);
    root.appendChild(contenedorFiltro);
    root.appendChild(contenedorLista);

    try {
        // Traer los productos de la API
        const respuesta = await fetch("https://api.escuelajs.co/api/v1/products");
        let productos = await respuesta.json();

        // Limpiar productos vacíos o defectuosos
        productos = productos.filter(p =>
            p.title && p.title !== "string" &&
            p.title.trim().length > 2 &&
            p.images && p.images.length > 0 &&
            p.images[0].startsWith("http")
        );

        // Mostrar lista inicial
        mostrarProductos(productos);

        // Obtener categorías únicas
        const categorias = [...new Set(productos.map(p => p.category.name))];

        // Crear botones de filtro (como tipos Pokémon)
        for (let i = 0; i < categorias.length; i++) {
            const btn = document.createElement("button");
            btn.textContent = categorias[i];

            // Evento click → filtra por categoría
            btn.addEventListener("click", () => {
                const filtrados = productos.filter(p => p.category.name === categorias[i]);
                mostrarProductos(filtrados);
            });

            contenedorFiltro.appendChild(btn);
        }

        // Buscador → filtra por nombre
        buscador.addEventListener("input", () => {
            buscadorFuncion(buscador.value, productos);
        });

    } catch (error) {
        console.error("Error al cargar los productos:", error);
        contenedorLista.innerHTML = `<p>Error al cargar los productos 🛠️</p>`;
    }
}

// Función de búsqueda (similar al código Pokémon)
function buscadorFuncion(texto, productos) {
    const lista = document.getElementById("la-lista");
    if (texto.length >= 3) {
        const filtrados = productos.filter(p => 
            p.title.toLowerCase().includes(texto.toLowerCase())
        );
        mostrarProductos(filtrados);
    } else {
        mostrarProductos(productos);
    }
}

// Función para mostrar las tarjetas (como generarLista)
function mostrarProductos(listaProductos) {
    const lista = document.getElementById("la-lista");
    lista.innerHTML = "";
    for (let i = 0; i < listaProductos.length; i++) {
        lista.appendChild(crearCard(listaProductos[i]));
    }
}
