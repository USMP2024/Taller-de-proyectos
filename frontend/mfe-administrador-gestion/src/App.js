import './App.css';
import { Outlet } from 'react-router-dom';
import { Header } from './components/GestionUsuarios/header/Header';
import User from './components/GestionUsuarios/getuser/User';

function App() {

  return (
    <div className="App">
      <Header/>
      <User/>
      <Outlet />

    </div>
  );
}

export default App;
