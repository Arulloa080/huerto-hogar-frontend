function verificarSesion() {
  var usuario = JSON.parse(localStorage.getItem("currentUser")) || localStorage.getItem("usuarioLogueado");
  var container = document.getElementById("user-nav-container");

  if (!container) return;

  if (usuario) {
    var nombre = typeof usuario === 'object' ? (usuario.nombre || usuario.email) : usuario;
    container.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <span class="text-white small fw-bold">Hola, ${nombre}</span>
        <button type="button" class="btn btn-outline-light btn-sm rounded-pill px-2 py-1" onclick="cerrarSesion()">Salir</button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <button type="button" class="btn btn-warning btn-sm rounded-pill px-3 fw-bold text-dark" data-bs-toggle="modal" data-bs-target="#loginModal">
        👤 Iniciar Sesión
      </button>
    `;
  }
}

function iniciarSesion(event) {
  event.preventDefault();
  
  var emailInput = document.getElementById("login-email");
  var passwordInput = document.getElementById("login-password");
  var alertBox = document.getElementById("login-error-alert");

  var email = emailInput.value.trim();
  var password = passwordInput.value.trim();

  if (alertBox) {
    alertBox.classList.add("d-none");
    alertBox.innerText = "";
  }

  if (!email || !password) {
    mostrarErrorLogin("Por favor, completa todos los campos.");
    return;
  }

  var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    mostrarErrorLogin("Ingresa un correo electrónico válido (ejemplo: usuario@dominio.com).");
    emailInput.focus();
    return;
  }

  var regexPassword = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
  if (!regexPassword.test(password)) {
    mostrarErrorLogin("La contraseña debe tener al menos 6 caracteres e incluir letras y números.");
    passwordInput.focus();
    return;
  }

  var usuarioData = { email: email, nombre: email.split('@')[0] };
  localStorage.setItem("currentUser", JSON.stringify(usuarioData));
  
  emailInput.value = "";
  passwordInput.value = "";

  var modalEl = document.getElementById('loginModal');
  var modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) {
    modal.hide();
  }

  verificarSesion();
  cargarTabla();
}

function mostrarErrorLogin(mensaje) {
  var alertBox = document.getElementById("login-error-alert");
  if (alertBox) {
    alertBox.innerText = mensaje;
    alertBox.classList.remove("d-none");
  } else {
    alert(mensaje);
  }
}

function cerrarSesion() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("usuarioLogueado");
  verificarSesion();
  cargarTabla();
}

function actualizarContador() {
  var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  var totalItems = 0;
  for (var i = 0; i < carrito.length; i++) {
    totalItems += parseInt(carrito[i].cantidad) || 0;
  }
  var badge = document.getElementById("cart-counter");
  if (badge) {
    badge.innerText = totalItems;
  }
}

function cargarTabla() {
  var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  var tabla = document.getElementById("tabla-carrito");
  var subtotalAcumulado = 0;

  if (!tabla) return;

  tabla.innerHTML = "";

  if (carrito.length === 0) {
    tabla.innerHTML = "<tr><td colspan='5' class='text-center py-5 text-muted'>Tu carrito está vacío.</td></tr>";
    if (document.getElementById("subtotal-precio")) document.getElementById("subtotal-precio").innerText = "$0 CLP";
    if (document.getElementById("descuento-precio")) document.getElementById("descuento-precio").innerText = "$0 CLP";
    if (document.getElementById("total-precio")) document.getElementById("total-precio").innerText = "$0 CLP";
    actualizarContador();
    return;
  }

  for (var i = 0; i < carrito.length; i++) {
    var p = carrito[i];
    var subtotalProducto = p.precio * p.cantidad;
    subtotalAcumulado += subtotalProducto;

    tabla.innerHTML += `
      <tr>
        <td class="fw-semibold">${p.nombre}</td>
        <td>$${p.precio}</td>
        <td style="width: 110px;">
          <input type="number" class="form-control form-control-sm text-center rounded-3" min="1" value="${p.cantidad}" onchange="cambiarCantidad('${p.codigo}', this.value)">
        </td>
        <td class="fw-bold text-success">$${subtotalProducto} CLP</td>
        <td>
          <button class="btn btn-outline-danger btn-sm rounded-3 px-3" onclick="eliminarProducto('${p.codigo}')">&times;</button>
        </td>
      </tr>
    `;
  }

  var usuarioActivo = JSON.parse(localStorage.getItem("currentUser")) || localStorage.getItem("usuarioLogueado");
  var descuento = usuarioActivo ? Math.round(subtotalAcumulado * 0.10) : 0;
  var totalFinal = subtotalAcumulado - descuento;

  if (document.getElementById("subtotal-precio")) {
    document.getElementById("subtotal-precio").innerText = "$" + subtotalAcumulado + " CLP";
  }
  if (document.getElementById("descuento-precio")) {
    document.getElementById("descuento-precio").innerText = "-$" + descuento + " CLP" + (usuarioActivo ? " (10% Desc.)" : "");
  }
  if (document.getElementById("total-precio")) {
    document.getElementById("total-precio").innerText = "$" + totalFinal + " CLP";
  }

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
  verificarSesion();
  cargarTabla();
});