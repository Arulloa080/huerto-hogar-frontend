document.addEventListener('DOMContentLoaded', () => {
  const productsContainer = document.getElementById('products-container');
  const categoryFilters = document.getElementById('category-filters');

  const productos = [
    {
      id: 'FR001',
      categoria: 'Frutas Frescas',
      nombre: 'Manzanas Fuji',
      precio: 1200,
      unidad: 'kilo',
      descripcion: 'Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule.',
      imagen: 'img/manzana.jpg'
    },
    {
      id: 'FR002',
      categoria: 'Frutas Frescas',
      nombre: 'Naranjas Valencia',
      precio: 1000,
      unidad: 'kilo',
      descripcion: 'Jugosas y ricas en vitamina C, ideales para zumos frescos y refrescantes.',
      imagen: 'img/naranja.jpg'
    },
    {
      id: 'FR003',
      categoria: 'Frutas Frescas',
      nombre: 'Plátanos Cavendish',
      precio: 1100,
      unidad: 'kilo',
      descripcion: 'Plátanos maduros, dulces y cremosos, ricos en potasio.',
      imagen: 'img/platano.jpg'
    },
    {
      id: 'VR001',
      categoria: 'Verduras Orgánicas',
      nombre: 'Zanahorias Orgánicas',
      precio: 900,
      unidad: 'kilo',
      descripcion: 'Zanahorias crujientes cultivadas sin pesticidas en la Región de O\'Higgins.',
      imagen: 'img/zanahoria.jpg'
    },
    {
      id: 'VR002',
      categoria: 'Verduras Orgánicas',
      nombre: 'Espinacas Frescas',
      precio: 850,
      unidad: 'atado',
      descripcion: 'Hojas seleccionadas de espinaca, ricas en hierro y nutrientes.',
      imagen: 'img/espinaca.jpg'
    },
    {
      id: 'VR003',
      categoria: 'Verduras Orgánicas',
      nombre: 'Pimientos Tricolores',
      precio: 1500,
      unidad: 'malla 3 un',
      descripcion: 'Pimientos rojos, verdes y amarillos frescos de cultivo hidropónico.',
      imagen: 'img/pimientos.jpg'
    },
    {
      id: 'PO001',
      categoria: 'Productos Orgánicos',
      nombre: 'Miel Orgánica',
      precio: 5000,
      unidad: 'frasco 500g',
      descripcion: 'Miel pura y orgánica producida por apicultores locales.',
      imagen: 'img/miel.jpg'
    },
    {
      id: 'PO003',
      categoria: 'Productos Orgánicos',
      nombre: 'Quinua Orgánica',
      precio: 3200,
      unidad: 'bolsa 500g',
      descripcion: 'Grano ancestral andino rico en proteínas, libre de gluten.',
      imagen: 'img/quinua.jpg'
    },
    {
      id: 'PL001',
      categoria: 'Productos Lácteos',
      nombre: 'Leche Entera',
      precio: 1100,
      unidad: 'litro',
      descripcion: 'Leche fresca de libre pastoreo, pasteurizada en origen.',
      imagen: 'img/leche.jpg'
    }
  ];

  function renderProductos(filtroCat = 'Todas') {
    if (!productsContainer) return;
    productsContainer.innerHTML = '';

    const filtrados = filtroCat === 'Todas' 
      ? productos 
      : productos.filter(p => p.categoria === filtroCat);

    filtrados.forEach(prod => {
      const col = document.createElement('div');
      col.className = 'col-md-6 col-lg-4';

      const card = document.createElement('div');
      card.className = 'card h-100 shadow-sm border-0';

      const img = document.createElement('img');
      img.src = prod.imagen;
      img.className = 'card-img-top product-img';
      img.alt = prod.nombre;
      img.onerror = () => { 
        if (img.src.endsWith('.jpg')) {
          img.src = prod.imagen.replace('.jpg', '.png');
        } else {
          img.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(prod.nombre)}`;
        }
      };

      const cardBody = document.createElement('div');
      cardBody.className = 'card-body d-flex flex-column';

      const headerDiv = document.createElement('div');
      headerDiv.className = 'd-flex justify-content-between align-items-center mb-2';

      const badge = document.createElement('span');
      badge.className = 'badge bg-success';
      badge.textContent = prod.id;

      const catBadge = document.createElement('span');
      catBadge.className = 'badge bg-light text-dark border';
      catBadge.textContent = prod.categoria;

      headerDiv.appendChild(badge);
      headerDiv.appendChild(catBadge);

      const title = document.createElement('h5');
      title.className = 'card-title fw-bold';
      title.textContent = prod.nombre;

      const desc = document.createElement('p');
      desc.className = 'card-text text-secondary small flex-grow-1';
      desc.textContent = prod.descripcion;

      const price = document.createElement('div');
      price.className = 'fw-bold text-emerald mb-3';
      price.textContent = `$${prod.precio.toLocaleString('es-CL')} / ${prod.unidad}`;

      const actionDiv = document.createElement('div');
      actionDiv.className = 'd-flex align-items-center gap-2';

      const qtyInput = document.createElement('input');
      qtyInput.type = 'number';
      qtyInput.min = '1';
      qtyInput.value = '1';
      qtyInput.className = 'form-control form-control-sm w-25';

      const btn = document.createElement('button');
      btn.className = 'btn btn-yellow btn-sm flex-grow-1';
      btn.textContent = 'Agregar';
      btn.addEventListener('click', () => {
        const cant = parseInt(qtyInput.value) || 1;
        agregarAlCarrito(prod, cant);
      });

      actionDiv.appendChild(qtyInput);
      actionDiv.appendChild(btn);

      cardBody.appendChild(headerDiv);
      cardBody.appendChild(title);
      cardBody.appendChild(desc);
      cardBody.appendChild(price);
      cardBody.appendChild(actionDiv);

      card.appendChild(img);
      card.appendChild(cardBody);
      col.appendChild(card);

      productsContainer.appendChild(col);
    });
  }

  function setupFiltros() {
    if (!categoryFilters) return;
    const categorias = ['Todas', 'Frutas Frescas', 'Verduras Orgánicas', 'Productos Orgánicos', 'Productos Lácteos'];
    
    categoryFilters.innerHTML = '';
    categorias.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `btn btn-sm me-2 mb-2 ${cat === 'Todas' ? 'btn-success' : 'btn-outline-success'}`;
      btn.textContent = cat;
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('#category-filters button').forEach(b => {
          b.className = 'btn btn-sm me-2 mb-2 btn-outline-success';
        });
        e.target.className = 'btn btn-sm me-2 mb-2 btn-success';
        renderProductos(cat);
      });
      categoryFilters.appendChild(btn);
    });
  }

  function agregarAlCarrito(prod, cantidad = 1) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const index = carrito.findIndex(item => item.id === prod.id);

    if (index !== -1) {
      carrito[index].cantidad += cantidad;
    } else {
      carrito.push({
        id: prod.id,
        nombre: prod.nombre,
        precio: prod.precio,
        unidad: prod.unidad,
        imagen: prod.imagen,
        cantidad: cantidad
      });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    if (typeof updateCartBadge === 'function') updateCartBadge();

    // Actualizar texto y mostrar la notificación flotante (Toast)
    const toastName = document.getElementById('toast-product-name');
    if (toastName) {
      toastName.textContent = `${cantidad} x ${prod.nombre}`;
    }

    const toastEl = document.getElementById('cartToast');
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
      toast.show();
    }
  }

  setupFiltros();
  renderProductos();
});
