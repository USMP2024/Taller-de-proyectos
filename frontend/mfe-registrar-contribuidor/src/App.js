import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginArtista from './components/LoginArtista';
import RegistroArtista from './components/RegistroArtista';


const App = () => {
  return (
    <Router basename="/">
      <Routes>
        
        <Route path="/LoginArtista" element={<LoginArtista />} />
        <Route path="/RegistroArtista" element={<RegistroArtista />} />
        
        
      </Routes>
    </Router>
  );
};

export default App;