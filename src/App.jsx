import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Home from './views/Home';
import Nosotros from './views/Nosotros';
import Blog from './views/Blog';
import Contacto from './views/Contacto';
import AdminDashboard from './views/AdminDashboard';

function App() {
  return (
    <Router>
      <Navbar /> 
      <main className="container-fluid p-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Rutas pendientes para Personas B y C */}
          <Route path="/productos" element={<h2 className="text-center mt-5">Productos (Persona B)</h2>} />
          <Route path="/checkout" element={<h2 className="text-center mt-5">Checkout (Persona B)</h2>} />
          <Route path="/login" element={<h2 className="text-center mt-5">Login (Persona C)</h2>} />
          <Route path="/registro" element={<h2 className="text-center mt-5">Registro (Persona C)</h2>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;