function cargarTabla() {
  var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  var tabla = document.getElementById("tabla-carrito");
  var totalPrecio = 0;

  if (!tabla) return;

  tabla.innerHTML = "";

  if (carrito.length === 0) {
    tabla.innerHTML = "<tr><td colspan='5' class='text-center py-5 text-muted'>Tu carrito está vacío.</td></tr>";
    document.getElementById("total-precio").innerText = "$0 CLP";
    actualizarContador();
    return;
  }

  for (var i = 0; i < carrito.length; i++) {
    var p = carrito[i];
    var subtotal = p.precio * p.cantidad;
    totalPrecio = totalPrecio + subtotal;

    tabla.innerHTML += `
      <tr>
        <td class="fw-semibold">${p.nombre}</td>
        <td>$${p.precio}</td>
        <td style="width: 110px;">
          <input type="number" class="form-control form-control-sm form-control-custom text-center rounded-3" min="1" value="${p.cantidad}" onchange="cambiarCantidad('${p.codigo}', this.value)">
        </td>
        <td class="fw-bold price-text">$${subtotal} CLP</td>
        <td>
          <button class="btn btn-outline-danger btn-sm rounded-3 px-3" onclick="eliminarProducto('${p.codigo}')">&times;</button>
        </td>
      </tr>
    `;
  }

  document.getElementById("total-precio").innerText = "$" + totalPrecio + " CLP";
  actualizarContador();
}

function cambiarCantidad(codigo, nuevaCantidad) {
  var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].codigo === codigo) {
      carrito[i].cantidad = parseInt(nuevaCantidad) || 1;
      break;
    }
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarTabla();
}

function eliminarProducto(codigo) {
  var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  var nuevoCarrito = [];
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].codigo !== codigo) {
      nuevoCarrito.push(carrito[i]);
    }
  }
  localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  cargarTabla();
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  cargarTabla();
}

function procesarPago() {
  var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (carrito.length === 0) {
    alert("Error: No hay productos en el carrito para procesar el pago.");
  } else {
    alert("¡Gracias por comprar en HuertoHogar! Tu pedido ha sido procesado con éxito.");
    vaciarCarrito();
  }
}

document.addEventListener("DOMContentLoaded", function() {
  cargarTabla();
});