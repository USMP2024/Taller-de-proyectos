import React from 'react';
import ReactDOM from 'react-dom/client';
import {Toaster} from "react-hot-toast";
import { AppRouter } from './router/AppRouter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

      <AppRouter />
      <Toaster/>

  </React.StrictMode>
);

