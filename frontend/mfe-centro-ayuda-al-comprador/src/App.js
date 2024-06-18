import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ComponenteArticulo from './components/componenteArticulo';
import ComponenteArticuloPresentado from './components/componenteArticuloPresentado';
import ComponenteBoton from './components/componenteBoton';
import ComponenteBuscador from './components/componenteBuscador';
import ComponenteCabecera from './components/componenteCabecera';
import ComponenteCategoria from './components/componenteCategoria';
import ComponenteGeneral from './components/componenteGeneral';
import ComponenteNoEncuentra from './components/componenteNoEncuentra';
import ComponenteTemasPopulares from './components/componenteTemasPopulares';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/ComponenteArticulo" element={<ComponenteArticulo />} />
        <Route path="/ComponenteArticuloPresentado" element={<ComponenteArticuloPresentado />} />
        <Route path="/ComponenteBoton" element={<ComponenteBoton />} />
        <Route path="/ComponenteBuscador" element={<ComponenteBuscador />} />
        <Route path="/ComponenteCabecera" element={<ComponenteCabecera />} />
        <Route path="/ComponenteCategoria" element={<ComponenteCategoria />} />
        <Route path="/ComponenteGeneral" element={<ComponenteGeneral />} />
        <Route path="/ComponenteNoEncuentra" element={<ComponenteNoEncuentra />} />
        <Route path="/ComponenteTemasPopulares" element={<ComponenteTemasPopulares />} />

      </Routes>
    </Router>
  );
};

export default App;
