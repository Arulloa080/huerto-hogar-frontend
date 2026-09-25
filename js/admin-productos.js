
//LÓGICA COMPLETA DE PRODUCTOS


document.addEventListener('DOMContentLoaded', function() {
    // Arreglo de productos (simulación de base de datos)
    let productos = [
        { codigo: 'FR001', nombre: 'Manzanas Fuji', categoria: 'Frutas', precio: 1200, stock: 150, stockCritico: 20 },
        { codigo: 'VR001', nombre: 'Zanahorias Orgánicas', categoria: 'Verduras', precio: 900, stock: 15, stockCritico: 20 },
        { codigo: 'PO001', nombre: 'Miel Orgánica Muestra', categoria: 'Orgánicos', precio: 0, stock: 50, stockCritico: 10 }
    ];

    const tablaCuerpo = document.getElementById('cuerpoTablaProductos');
    const alertaStock = document.getElementById('alertaStockCritico');
    const formProducto = document.getElementById('formProducto');
    const modalProductoEl = document.getElementById('modalProducto');
    const modalProducto = modalProductoEl ? new bootstrap.Modal(modalProductoEl) : null;

    // Función para renderizar la tabla
    function renderizarTabla() {
        if (!tablaCuerpo) return;
        
        tablaCuerpo.innerHTML = '';
        let hayStockCritico = false;

        productos.forEach((prod, index) => {
            const fila = document.createElement('tr');
            
            // Verificar stock crítico
            if (prod.stock <= prod.stockCritico) {
                fila.classList.add('table-danger');
                hayStockCritico = true;
            }

            // Formatear precio (FREE si es 0)
            const precioMostrar = prod.precio === 0 ? '<span class="badge bg-success">FREE</span>' : `$${prod.precio.toLocaleString('es-CL')}`;

            fila.innerHTML = `
                <td>${prod.codigo}</td>
                <td>${prod.nombre}</td>
                <td>${prod.categoria}</td>
                <td>${precioMostrar}</td>
                <td>${prod.stock}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editarProducto(${index})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${index})">Eliminar</button>
                </td>
            `;
            
            tablaCuerpo.appendChild(fila);
        });

        // Mostrar/ocultar alerta de stock crítico
        if (alertaStock) {
            alertaStock.style.display = hayStockCritico ? 'flex' : 'none';
        }
    }

    // Agregar nuevo producto
    if (formProducto) {
        formProducto.addEventListener('submit', function(e) {
            e.preventDefault();

            const nuevoProducto = {
                codigo: document.getElementById('codigo').value,
                nombre: document.getElementById('nombre').value,
                categoria: document.getElementById('categoria').value,
                precio: parseFloat(document.getElementById('precio').value) || 0,
                stock: parseInt(document.getElementById('stock').value) || 0,
                stockCritico: parseInt(document.getElementById('stockCritico').value) || 0
            };

            productos.push(nuevoProducto);
            renderizarTabla();
            formProducto.reset();
            
            if (modalProducto) modalProducto.hide();
        });
    }

    // Hacer funciones globales
    window.eliminarProducto = function(index) {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            productos.splice(index, 1);
            renderizarTabla();
        }
    };

    window.editarProducto = function(index) {
        const prod = productos[index];
        document.getElementById('codigo').value = prod.codigo;
        document.getElementById('nombre').value = prod.nombre;
        document.getElementById('categoria').value = prod.categoria;
        document.getElementById('precio').value = prod.precio;
        document.getElementById('stock').value = prod.stock;
        document.getElementById('stockCritico').value = prod.stockCritico;
        
        // Eliminar el producto actual para que al guardar se "actualice"
        productos.splice(index, 1);
        renderizarTabla();
        
        if (modalProducto) modalProducto.show();
    };

    // Renderizar al cargar
    renderizarTabla();
});