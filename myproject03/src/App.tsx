// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// ¡Ya no importamos Container aquí!

// Importa tus componentes de página
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import ContactPage from './pages/ContactPage';
import EpisodesPage from './pages/EpisodesPage';
import LocationsPage from './pages/LocationsPage';

// Importa los componentes comunes
import AppNavbar from './components/common/Navbar';
import Footer from './components/common/Footer';

function App() {
  return (
    <BrowserRouter>
      <AppNavbar />

      {/* REEMPLAZAMOS EL CONTAINER POR UN DIV SIMPLE */}
      {/* Esto permite que las páginas usen todo el ancho */}
      <div style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lista" element={<ListPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/episodios" element={<EpisodesPage />} />
          <Route path="/ubicaciones" element={<LocationsPage />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
