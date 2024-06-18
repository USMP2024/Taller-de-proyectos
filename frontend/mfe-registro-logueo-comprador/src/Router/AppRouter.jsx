import React from 'react'
import { Routes, Route, useLocation  } from 'react-router-dom'
import LoginForm from '../Componentes/LoginForm/LoginForm'
import RegisterForm from '../Componentes/RegisterForm/RegisterForm'
import { Header } from '../Componentes/Header/Header'
import { TerminosCondiciones } from '../Componentes/TerminosCondiciones/TerminosCondiciones'


export const AppRouter = () => {

  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Header />}
        <Routes>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/register" element={<RegisterForm/>}/>
            <Route path="/terminos" element={<TerminosCondiciones/>}/>
        </Routes>

    </>

  )
}

export default AppRouter;



