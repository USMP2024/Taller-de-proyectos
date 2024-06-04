import { createBrowserRouter } from "react-router-dom";
import Add from "../components/GestionUsuarios/adduser/Add";
import Edit from "../components/GestionUsuarios/updateuser/Edit";
import App from "../App";
import Solicitud from "../components/GestionSolicitudes/getSolicitudes/Solicitud";
import User from "../components/GestionUsuarios/getuser/User";
import Devolucion from "../components/GestionDevoluciones/getDevoluciones/Devolucion";

const route = createBrowserRouter([
  {
    path: '/mi-aplicacion',
    element: <App />,
    children: [
      {
        path: '/Usuario',
        element: <User />,
      },
      {
        path:"/Solicitud",
        element: <Solicitud/> ,
      },
      {
        path:"/Devolucion",
        element: <Devolucion/> ,
      },
    ],
  },
    {
      path:"/add",
      element: <Add/>,
    },
    {
      path:"/edit/:id",
      element: <Edit/> ,
    },
    
  ])

export default route