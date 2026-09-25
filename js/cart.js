document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('cart-table-body');
  const totalSpan = document.getElementById('cart-total');
  const modalTotal = document.getElementById('modal-pay-total');
  const clearBtn = document.getElementById('clear-cart-btn');
  const checkoutBtn = document.getElementById('checkout-btn');
  const paymentForm = document.getElementById('payment-form');

  function renderCarrito() {
    if (!tableBody) return;
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    tableBody.innerHTML = '';

    if (carrito.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-secondary">El carrito está vacío.</td></tr>';
      if (totalSpan) totalSpan.textContent = '$0';
      if (modalTotal) modalTotal.textContent = '$0';
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    if (checkoutBtn) checkoutBtn.disabled = false;
    let total = 0;

    carrito.forEach((item, index) => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;

      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td class="fw-bold">${item.nombre} <span class="badge bg-secondary ms-1">${item.id}</span></td>
        <td>$${item.precio.toLocaleString('es-CL')}</td>
        <td>
          <input type="number" min="1" class="form-control form-control-sm w-auto d-inline quantity-input" data-index="${index}" value="${item.cantidad}">
        </td>
        <td class="fw-bold text-emerald">$${subtotal.toLocaleString('es-CL')}</td>
        <td>
          <button class="btn btn-sm btn-outline-danger delete-item-btn" data-index="${index}">Eliminar</button>
        </td>
      `;

      tableBody.appendChild(tr);
    });

    const totalFormateado = `$${total.toLocaleString('es-CL')}`;
    if (totalSpan) totalSpan.textContent = totalFormateado;
    if (modalTotal) modalTotal.textContent = totalFormateado;

    // Eventos de cantidad
    document.querySelectorAll('.quantity-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const idx = e.target.getAttribute('data-index');
        const val = parseInt(e.target.value);
        if (val > 0) {
          carrito[idx].cantidad = val;
          localStorage.setItem('carrito', JSON.stringify(carrito));
          renderCarrito();
        }
      });
    });

    // Eventos de eliminar
    document.querySelectorAll('.delete-item-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        carrito.splice(idx, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderCarrito();
      });
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      localStorage.removeItem('carrito');
      renderCarrito();
    });
  }

  if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Gracias por tu compra en HuertoHogar! Tu pedido ha sido procesado exitosamente.');
      localStorage.removeItem('carrito');
      const modalEl = document.getElementById('paymentModal');
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) modal.hide();
      renderCarrito();
    });
  }

  renderCarrito();
});
