document.addEventListener('DOMContentLoaded', () => {
  const productsContainer = document.getElementById('products-container');
  const categoryFilters = document.getElementById('category-filters');

  // Inventario completo oficial HuertoHogar
  const productos = [
    // Frutas Frescas
    {
      id: 'FR001',
      categoria: 'Frutas Frescas',
      nombre: 'Manzanas Fuji',
      precio: 1200,
      unidad: 'kilo',
      descripcion: 'Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule.',
      imagen: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&q=80'
    },
    {
      id: 'FR002',
      categoria: 'Frutas Frescas',
      nombre: 'Naranjas Valencia',
      precio: 1000,
      unidad: 'kilo',
      descripcion: 'Jugosas y ricas en vitamina C, ideales para zumos frescos y refrescantes.',
      imagen: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500&q=80'
    },
    {
      id: 'FR003',
      categoria: 'Frutas Frescas',
      nombre: 'Plátanos Cavendish',
      precio: 1100,
      unidad: 'kilo',
      descripcion: 'Plátanos maduros, dulces y cremosos, ricos en potasio.',
      imagen: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&q=80'
    },
    // Verduras Orgánicas
    {
      id: 'VR001',
      categoria: 'Verduras Orgánicas',
      nombre: 'Zanahorias Orgánicas',
      precio: 900,
      unidad: 'kilo',
      descripcion: 'Zanahorias crujientes cultivadas sin pesticidas en la Región de O\'Higgins.',
      imagen: 'https://images.unsplash.com/photo-1598170845058-12ef4a457939?w=500&q=80'
    },
    {
      id: 'VR002',
      categoria: 'Verduras Orgánicas',
      nombre: 'Espinacas Frescas',
      precio: 850,
      unidad: 'atado',
      descripcion: 'Hojas seleccionadas de espinaca, ricas en hierro y nutrientes.',
      imagen: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&q=80'
    },
    {
      id: 'VR003',
      categoria: 'Verduras Orgánicas',
      nombre: 'Pimientos Tricolores',
      precio: 1500,
      unidad: 'malla 3 un',
      descripcion: 'Pimientos rojos, verdes y amarillos frescos de cultivo hidropónico.',
      imagen: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&q=80'
    },
    // Productos Orgánicos
    {
      id: 'PO001',
      categoria: 'Productos Orgánicos',
      nombre: 'Miel Orgánica',
      precio: 5000,
      unidad: 'frasco 500g',
      descripcion: 'Miel pura y orgánica producida por apicultores locales.',
      imagen: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&q=80'
    },
    {
      id: 'PO003',
      categoria: 'Productos Orgánicos',
      nombre: 'Quinua Orgánica',
      precio: 3200,
      unidad: 'bolsa 500g',
      descripcion: 'Grano ancestral andino rico en proteínas, libre de gluten.',
      imagen: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80'
    },
    // Productos Lácteos
    {
      id: 'PL001',
      categoria: 'Productos Lácteos',
      nombre: 'Leche Entera',
      precio: 1100,
      unidad: 'litro',
      descripcion: 'Leche fresca de libre pastoreo, pasteurizada en origen.',
      imagen: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80'
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
      img.onerror = () => { img.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(prod.nombre)}`; };

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

      const footerDiv = document.createElement('div');
      footerDiv.className = 'd-flex justify-content-between align-items-center mt-3';

      const price = document.createElement('span');
      price.className = 'fw-bold text-emerald';
      price.textContent = `$${prod.precio.toLocaleString('es-CL')} / ${prod.unidad}`;

      const btn = document.createElement('button');
      btn.className = 'btn btn-yellow btn-sm px-3';
      btn.textContent = 'Agregar';
      btn.addEventListener('click', () => agregarAlCarrito(prod));

      footerDiv.appendChild(price);
      footerDiv.appendChild(btn);

      cardBody.appendChild(headerDiv);
      cardBody.appendChild(title);
      cardBody.appendChild(desc);
      cardBody.appendChild(footerDiv);

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
    alert(`${prod.nombre} agregado al carrito`);
  }

  setupFiltros();
  renderProductos();
});
