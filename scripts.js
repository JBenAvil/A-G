// Obtener el ID del producto desde la URL
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
  }
  
  // Cargar los productos desde productos.json
  async function cargarProducto() {
    const id = getProductIdFromUrl();
  
    try {
      const response = await fetch('productos.json');
      const productos = await response.json();
  
      const producto = productos.find(p => p.id === id);
  
      if (!producto) {
        document.getElementById('producto-info').innerHTML = `<h2>Producto no encontrado</h2>`;
        return;
      }
  
      // Renderizar imagen
      document.getElementById('producto-imagen-container').innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen"/>
      `;
  
      // Renderizar info
      document.getElementById('producto-info').innerHTML = `
        <h2>${producto.nombre}</h2>
        <p>${producto.descripcion}</p>
        <h4>Precio: ${producto.precio}</h4>
        <a class="whatsapp-btn" href="https://wa.me/56976603721?text=Hola,%20quiero%20más%20información%20sobre%20${encodeURIComponent(producto.nombre)}" target="_blank">
          Consultar por WhatsApp
        </a>
      `;
    } catch (error) {
      console.error('Error al cargar el producto:', error);
      document.getElementById('producto-info').innerHTML = `<h2>Error al cargar producto</h2>`;
    }
  }
  
  // Ejecutar al cargar la página
  window.onload = cargarProducto;
  