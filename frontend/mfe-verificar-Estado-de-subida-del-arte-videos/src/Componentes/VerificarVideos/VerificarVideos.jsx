// import React from 'react';
// import React, { useEffect, useState } from 'react'
// import { Link, useLocation } from 'react-router-dom';
// import './verificarvideos.css';
// import axios from "axios";


// const VerificarVideos = () => {
//   const location = useLocation();

//   const [users, setUsers] = useState([]);
//     useEffect(()=>{

//     const fetchData = async()=>{
//     const response = await axios.get("")
//     setUsers(response.data);
//     }
//     fetchData();

//     },[])


//   return (
//     <div className='contenido'>
//       <div className='h1'>
//         <br/>
//         <h1>Estado del Portafolio</h1>
//       </div>
      
//       <br />
//       <div className="redirec">
//         <div className='btns'>
//           <Link to="/VerificarImagenes">
//             <button 
//               className={`Imagenes ${location.pathname === '/VerificarImagenes' ? 'selected' : ''}`}
//             >
//               Imagenes
//             </button>
//           </Link>
//           {"   -   "}
//           <button 
//             className={`Videos ${location.pathname === '/VerificarVideos' ? 'selected' : ''}`}
//           >
//             Videos
//           </button>
//         </div>

//         <div className='estadoTable'>
//           <table border={0} cellPadding={0} cellSpacing={0} >
//             <thead>
//               <tr>
//                 <th>Estado</th>
//                 <th>N. Estados</th>
//               </tr>
//             </thead>
//             <tbody>
//                 <td>
//                   <tr>No se envió</tr>
//                   <tr>Aprobación pendiente</tr>
//                   <tr>Revisión reciente</tr>
//                   <tr>------------------------</tr>
//                   <tr>Cartera de Videos</tr>
//                 </td>
//                 {
//                   users.map((user, index)=>{
//                     return(
//                       <td key={user.id_Portafolio}>
//                         <tr>{user.no_se_envio}</tr>
//                         <tr>{user.aprobacion_pendiente}</tr>
//                         <tr>{user.revision_reciente}</tr>
//                         <tr>----</tr>
//                         <tr>{user.cartera}</tr>
//                       </td>                
//                     )
//                   })
//                 }
//               </tbody>


//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerificarVideos;





import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './verificarvideos.css';
import axios from 'axios';

const VerificarVideos = () => {
  const location = useLocation();
  const [videoStatuses, setVideoStatuses] = useState([]);
  // const [videoStatuses, setVideoStatuses] = useState({
  //   no_se_envio: 0,
  //   aprobacion_pendiente: 0,
  //   revision_reciente: 0,
  //   cartera: 0
  // });

  useEffect(() => {
    const fetchVideoStatuses = async () => {
      try {
        const response = await axios.get('/VerificarVideos.json');
        setVideoStatuses(response.data);
      } catch (error) {
        console.error('Error fetching video statuses:', error);
      }
    };

    fetchVideoStatuses();
  }, []);

  return (
    <div className='contenido'>
      <div className='h1'>
        <br />
        <h1>Estado del Portafolio</h1>
      </div>

      <br />
      <div className="redirec">
        <div className='btns'>
          <Link to="/VerificarImagenes">
            <button
              className={`Imagenes ${location.pathname === '/VerificarImagenes' ? 'selected' : ''}`}
            >
              Imagenes
            </button>
          </Link>
          {"   -   "}
          <button
            className={`Videos ${location.pathname === '/VerificarVideos' ? 'selected' : ''}`}
          >
            Videos
          </button>
        </div>

        <div className='estadoTable'>
          <table border={0} cellPadding={0} cellSpacing={0}>
            <thead>
              <tr>
                <th>Estado</th>
                <th>N. Estados</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>No se envió</td>
                <td>{videoStatuses.no_se_envio}</td>
              </tr>
              <tr>
                <td>Aprobación pendiente</td>
                <td>{videoStatuses.aprobacion_pendiente}</td>
              </tr>
              <tr>
                <td>Revisión reciente</td>
                <td>{videoStatuses.revision_reciente}</td>
              </tr>
              <tr>
                <td>------------------------</td>
                <td>----</td>
              </tr>
              <tr>
                <td>Cartera de Videos</td>
                <td>{videoStatuses.cartera}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VerificarVideos;

