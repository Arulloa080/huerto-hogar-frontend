import { useState, useEffect } from 'react';
import { getProductos, initDB } from '../data/db';

const Home = () => {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    initDB(); // Aseguramos que la BD exista
    setDestacados(getProductos().slice(0, 3)); 
  }, []);

  return (
    <div className="home-container">
      <div className="p-5 mb-4 bg-light rounded-3 text-center shadow-sm">
        <h1 className="display-5 fw-bold" style={{ color: '#8B4513' }}>Bienvenido a Huerto Hogar</h1>
        <p className="col-md-8 mx-auto fs-4 text-muted">Todo lo que necesitas para tu jardín urbano.</p>
      </div>

      <div className="container">
        <h2 className="mb-4 text-center">Productos Destacados</h2>
        <div className="row">
          {destacados.map(producto => (
            <div className="col-md-4 mb-3" key={producto.id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text fw-bold fs-5 text-success">${producto.precio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;