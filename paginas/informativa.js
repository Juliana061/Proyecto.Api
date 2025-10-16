function Informativa() {
  // Cambiar fondo o estilo general
  document.body.style.background = "radial-gradient(circle at top, #1c1c1c, #000)";
  document.body.style.color = "#f5f5f5";
  document.body.style.fontFamily = "Poppins, sans-serif";

  const root = document.getElementById("root");
  root.innerHTML = `
    <section class="c-informativa">
      <div class="informativa-overlay"></div>
      <div class="informativa-contenido">
        <h1>EscuelaJS API</h1>
        <h2>Angie Juliana Tapias Rodríguez</h2>
        <h3>Productos Escolares y Catalogación</h3>
        <img src="./Logo.jpg" alt="Logo EscuelasJS" class="informativa-logo">
        <p>Esta aplicación utiliza la API real de Escuelajs para mostrar productos escolares, con funcionalidades de favoritos y carrito.</p>
        <p>URL oficial utilizada: <code>http://api.escuelajs.co/api/v1/products</code></p>
        <p><a href="https://github.com/Juliana061" target="_blank" class="informativa-link">https://github.com/Juliana061</a></p>
        <a href="http://api.escuelajs.co/api/v1/products" target="_blank" class="informativa-link">Ver Productos API 🛍️</a>
        <p class="informativa-version">v 1.0.0</p>
      </div>
    </section>
  `;
}
