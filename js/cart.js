document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const tbody = document.getElementById("cart-table-body");

  tbody.innerHTML = "";

  if (cart.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">El carrito está vacío.</td></tr>`;
    updateSummary(0);
    return;
  }

  let subtotal = 0;

  cart.forEach((item, index) => {
    const itemSubtotal = item.precio * item.cantidad;
    subtotal += itemSubtotal;

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <div class="d-flex align-items-center gap-3">
          <img class="cart-img-thumb" src="${item.imagen || 'img/logo.png'}" alt="${item.nombre}">
          <span class="fw-semibold">${item.nombre}</span>
        </div>
      </td>
      <td>$${item.precio.toLocaleString()}</td>
      <td>
        <input type="number" class="form-control form-control-sm form-control-custom cart-qty-input" min="1" value="${item.cantidad}">
      </td>
      <td class="fw-bold">$${itemSubtotal.toLocaleString()}</td>
      <td class="text-center">
        <button class="btn btn-outline-danger btn-sm btn-delete">Eliminar</button>
      </td>
    `;

    const qtyInput = row.querySelector("input");
    qtyInput.addEventListener("change", (e) => updateQuantity(index, e.target.value));

    const btnDelete = row.querySelector(".btn-delete");
    btnDelete.addEventListener("click", () => deleteItem(index));

    tbody.appendChild(row);
  });

  updateSummary(subtotal);
}

function updateSummary(subtotal) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const subtotalEl = document.getElementById("cart-subtotal");
  const discountRow = document.getElementById("discount-row");
  const discountEl = document.getElementById("cart-discount");
  const totalEl = document.getElementById("cart-total");

  subtotalEl.textContent = `$${subtotal.toLocaleString()}`;

  let discount = 0;
  if (currentUser) {
    discount = subtotal * 0.10;
    discountRow.classList.remove("d-none");
    discountEl.textContent = `-$${discount.toLocaleString()}`;
  } else {
    discountRow.classList.add("d-none");
  }

  const total = subtotal - discount;
  totalEl.textContent = `$${total.toLocaleString()}`;
}

function updateQuantity(index, newQty) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const qty = parseInt(newQty);
  if (qty > 0) {
    cart[index].cantidad = qty;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

function deleteItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}