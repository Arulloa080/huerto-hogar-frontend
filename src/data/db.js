export const initDB = () => {
    if (!localStorage.getItem('productos')) {
        const productosIniciales = [
            { id: 1, nombre: "Semillas de Tomate", precio: 2500, stock: 50 },
            { id: 2, nombre: "Tierra de Hojas 5kg", precio: 4000, stock: 20 },
            { id: 3, nombre: "Maceta de Greda", precio: 6500, stock: 15 }
        ];
        localStorage.setItem('productos', JSON.stringify(productosIniciales));
    }
};

export const getProductos = () => JSON.parse(localStorage.getItem('productos')) || [];

export const addProducto = (producto) => {
    const productos = getProductos();
    producto.id = new Date().getTime();
    productos.push(producto);
    localStorage.setItem('productos', JSON.stringify(productos));
};

export const updateProducto = (id, nuevosDatos) => {
    let productos = getProductos();
    productos = productos.map(p => p.id === id ? { ...p, ...nuevosDatos } : p);
    localStorage.setItem('productos', JSON.stringify(productos));
};

export const deleteProducto = (id) => {
    let productos = getProductos();
    productos = productos.filter(p => p.id !== id);
    localStorage.setItem('productos', JSON.stringify(productos));
};