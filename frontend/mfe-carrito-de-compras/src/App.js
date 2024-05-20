import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarritoDetalle from './components/CarritoDetalle';
import CarritoCompra from './components/CarritoCompra';
import Pago from './components/Pago';
import PopUpPago from './components/PopUpPago';
import PagoPaypal from './components/PagoPaypal';
import PagoMercadoPago from './components/PagoMercadoPago';
import DatosMercadoPago from './components/DatosMercadoPago';
import RevisionMercadoPago from './components/RevisionMercadoPago';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/CarritoCompra" element={<CarritoCompra />} />
        <Route path="/CarritoDetalle" element={<CarritoDetalle />} />
        <Route path="/Pago" element={<Pago />} />
        <Route path="/PopUpPago" element={<PopUpPago />} />
        <Route path="/PagoPaypal" element={<PagoPaypal />} />
        <Route path="/PagoMercadoPago" element={<PagoMercadoPago />} />
        <Route path="/DatosMercadoPago" element={<DatosMercadoPago />} />
        <Route path="/RevisionMercadoPago" element={<RevisionMercadoPago />} />

      </Routes>
    </Router>
  );
};

export default App;
