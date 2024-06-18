import './App.css';
import { Outlet } from 'react-router-dom';
// import { Header } from './components/GestionUsuarios/header/Header';
import User from './components/GestionUsuarios/getuser/User';
import AppRouter from './router/AppRouter';

function App() {

  return (
    <div className="App">
      {/* <Header/> */}
      {/* <User/>
      <Outlet /> */}
      {/* <AppRouter/> */}
      <User></User>
    </div>
  );
}

export default App;
