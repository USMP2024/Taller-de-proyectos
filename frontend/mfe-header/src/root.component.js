// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

export default function Root(props) {
  return (
  <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Header />} />
        </Routes>
        </div>
    </Router>);
}
