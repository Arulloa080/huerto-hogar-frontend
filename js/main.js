document.addEventListener('DOMContentLoaded', () => {
  const productsContainer = document.getElementById('products-container');

  // Catálogo oficial de productos del PDF
  const productos = [
    {
      id: 'FR001',
      nombre: 'Manzanas Fuji',
      precio: 1200,
      unidad: 'kilo',
      descripcion: 'Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule.',
      imagen: 'img/manzanas.jpg'
    },
    {
      id: 'FR002',
      nombre: 'Naranjas Valencia',
      precio: 1000,
      unidad: 'kilo',
      descripcion: 'Jugosas y ricas en vitamina C, ideales para zumos frescos y refrescantes.',
      imagen: 'img/naranjas.jpg'
    },
    {
      id: 'VR001',
      nombre: 'Zanahorias Orgánicas',
      precio: 900,
      unidad: 'kilo',
      descripcion: 'Zanahorias crujientes cultivadas sin pesticidas en la Región de O\'Higgins.',
      imagen: 'img/zanahorias.jpg'
    },
    {
      id: 'PO001',
      nombre: 'Miel Orgánica',
      precio: 5000,
      unidad: 'frasco',
      descripcion: 'Miel pura y orgánica producida por apicultores locales. Frasco de 500g.',
      imagen: 'img/miel.jpg'
    }
  ];

  function renderProductos() {
    if (!productsContainer) return;
    productsContainer.innerHTML = '';

    productos.forEach(prod => {
      const col = document.createElement('div');
      col.className = 'col-md-6 col-lg-4';

      const card = document.createElement('div');
      card.className = 'card h-100 shadow-sm border-0';

      const img = document.createElement('img');
      img.src = prod.imagen;
      img.className = 'card-img-top product-img';
      img.alt = prod.nombre;
      img.onerror = () => { img.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(prod.nombre)}`; };

      const cardBody = document.createElement('div');
      cardBody.className = 'card-body d-flex flex-column';

      const badge = document.createElement('span');
      badge.className = 'badge bg-success w-auto align-self-start mb-2';
      badge.textContent = prod.id;

      const title = document.createElement('h5');
      title.className = 'card-title fw-bold';
      title.textContent = prod.nombre;

      const desc = document.createElement('p');
      desc.className = 'card-text text-secondary small flex-grow-1';
      desc.textContent = prod.descripcion;

      const footerDiv = document.createElement('div');
      footerDiv.className = 'd-flex justify-content-between align-items-center mt-3';

      const price = document.createElement('span');
      price.className = 'fw-bold text-emerald';
      price.textContent = `$${prod.precio.toLocaleString('es-CL')} / ${prod.unidad}`;

      const btn = document.createElement('button');
      btn.className = 'btn btn-yellow btn-sm px-3 add-to-cart-btn';
      btn.textContent = 'Agregar';
      btn.addEventListener('click', () => agregarAlCarrito(prod));

      footerDiv.appendChild(price);
      footerDiv.appendChild(btn);

      cardBody.appendChild(badge);
      cardBody.appendChild(title);
      cardBody.appendChild(desc);
      cardBody.appendChild(footerDiv);

      card.appendChild(img);
      card.appendChild(cardBody);
      col.appendChild(card);

      productsContainer.appendChild(col);
    });
  }

  function agregarAlCarrito(prod) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const index = carrito.findIndex(item => item.id === prod.id);

    if (index !== -1) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push({
        id: prod.id,
        nombre: prod.nombre,
        precio: prod.precio,
        unidad: prod.unidad,
        imagen: prod.imagen,
        cantidad: 1
      });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${prod.nombre} fue añadido al carrito`);
  }

  renderProductos();
});
