import React from 'react'
import { Routes, Route } from 'react-router-dom'
import VerificarImagenes from '../Componentes/VerificarImagenes/VerificarImagenes'
import VerificarVideos from '../Componentes/VerificarVideos/VerificarVideos'


export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/VerificarImagenes" element={<VerificarImagenes/>}/>
            <Route path="/VerificarVideos" element={<VerificarVideos/>}/>
        </Routes>

    </>

  )
}

export default AppRouter;

