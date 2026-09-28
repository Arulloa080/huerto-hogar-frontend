var productos = [
  { codigo: "FR001", nombre: "Manzanas Fuji", precio: 1200, unidad: "kilo", origen: "Valle del Maule", imagen: "img/manzana.jpg" },
  { codigo: "FR002", nombre: "Naranjas Valencia", precio: 1000, unidad: "kilo", origen: "Zona Central", imagen: "img/naranja.jpg" },
  { codigo: "FR003", nombre: "Plátanos Cavendish", precio: 800, unidad: "kilo", origen: "Norte Chico", imagen: "img/platano.jpg" },
  { codigo: "VR001", nombre: "Zanahorias Orgánicas", precio: 900, unidad: "kilo", origen: "Región de O'Higgins", imagen: "img/zanahoria.jpg" },
  { codigo: "VR002", nombre: "Espinacas Frescas", precio: 700, unidad: "bolsa 500g", origen: "Valle Maipo", imagen: "img/espinaca.jpg" },
  { codigo: "VR003", nombre: "Pimientos Tricolores", precio: 1500, unidad: "kilo", origen: "Arica", imagen: "img/pimientos.jpg" },
  { codigo: "PO001", nombre: "Miel Orgánica", precio: 5000, unidad: "frasco 500g", origen: "Bosque Nativo", imagen: "img/miel.jpg" }
];

function actualizarContador() {
  var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  var total = 0;
  for (var i = 0; i < carrito.length; i++) {
    total = total + carrito[i].cantidad;
  }
  var contadorEl = document.getElementById("cart-count");
  if (contadorEl) {
    contadorEl.innerText = total;
  }
}

function agregarAlCarrito(codigo) {
  var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  var encontrado = false;

  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].codigo === codigo) {
      carrito[i].cantidad = carrito[i].cantidad + 1;
      encontrado = true;
      break;
    }
  }

  if (!encontrado) {
    for (var j = 0; j < productos.length; j++) {
      if (productos[j].codigo === codigo) {
        carrito.push({
          codigo: productos[j].codigo,
          nombre: productos[j].nombre,
          precio: productos[j].precio,
          cantidad: 1
        });
        break;
      }
    }
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
  alert("Producto agregado al carrito con éxito.");
}

document.addEventListener("DOMContentLoaded", function() {
  actualizarContador();

  var contenedor = document.getElementById("home-products");
  if (contenedor) {
    for (var i = 0; i < productos.length; i++) {
      var p = productos[i];
      contenedor.innerHTML += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <div class="card product-card h-100">
            <div class="position-relative overflow-hidden">
              <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
              <span class="position-absolute top-0 end-0 m-2 badge badge-origen rounded-pill">${p.origen}</span>
            </div>
            <div class="card-body d-flex flex-column p-4">
              <h5 class="fw-bold mb-2">${p.nombre}</h5>
              <p class="price-text fs-5 mb-3">$${p.precio} <span class="fs-6 text-muted fw-normal">/ ${p.unidad}</span></p>
              <button class="btn btn-yellow rounded-3 py-2 w-100 mt-auto" onclick="agregarAlCarrito('${p.codigo}')">
                Añadir al Carrito
              </button>
            </div>
          </div>
        </div>
      `;
    }
  }
});