const AdminDashboard = () => (
  <div className="container mt-5">
    <h2 className="mb-4 text-center">Panel de Administración</h2>
    <div className="row">
      <div className="col-md-4 mb-3">
        <div className="card text-white bg-primary shadow-sm border-0">
          <div className="card-body text-center">
            <h5 className="card-title">Ventas del Mes</h5>
            <h2 className="display-6">1,234</h2>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="card text-white bg-success shadow-sm border-0">
          <div className="card-body text-center">
            <h5 className="card-title">Productos</h5>
            <h2 className="display-6">400</h2>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="card text-dark bg-warning shadow-sm border-0">
          <div className="card-body text-center">
            <h5 className="card-title">Usuarios</h5>
            <h2 className="display-6">890</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;