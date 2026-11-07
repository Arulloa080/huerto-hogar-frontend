const Contacto = () => (
  <div className="container mt-5">
    <h2 className="text-center mb-4" style={{ color: '#8B4513' }}>Contáctanos</h2>
    <div className="row justify-content-center">
      <div className="col-md-6">
        <form className="bg-light p-4 rounded shadow-sm border-0">
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" placeholder="Ej: Juan Pérez" />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input type="email" className="form-control" placeholder="juan@correo.com" />
          </div>
          <div className="mb-3">
            <label className="form-label">Mensaje</label>
            <textarea className="form-control" rows="3"></textarea>
          </div>
          <button className="btn btn-success w-100">Enviar Mensaje</button>
        </form>
      </div>
    </div>
  </div>
);

export default Contacto;