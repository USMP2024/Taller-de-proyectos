// import React, { useEffect, useState } from 'react';
// import "./devolucion.css";
// import axios from "axios";

// const Devolucion = () => {
    
//     const [solicitudes, setSolicitudes] = useState([]);
//     const [filteredSolicitudes, setFilteredSolicitudes] = useState([]);
//     const [estadoFiltro, setEstadoFiltro] = useState('');

//     useEffect(() => {
//         const fetchSolicitudes = async () => {
//             const response = await axios.get("/devoluciones.json");
//             setSolicitudes(response.data);
//             setFilteredSolicitudes(response.data); // Inicialmente mostramos todos los estados
//         }

//         fetchSolicitudes();
//     }, []);




//     useEffect(() => {
//         if (estadoFiltro) {
//             setFilteredSolicitudes(solicitudes.filter(solicitud => solicitud.estado === estadoFiltro));
//         } else {
//             setFilteredSolicitudes(solicitudes);
//         }
//     }, [estadoFiltro, solicitudes]);

//     const handleEstadoChange = (id, nuevoEstado) => {

//         const updatedSolicitudes = solicitudes.map(solicitud => 
//             solicitud._idSoli === id ? { ...solicitud, estado: nuevoEstado } : solicitud       
//         );
//         setSolicitudes(updatedSolicitudes);
        
//         //Cambio estado para backend
//         // try {
//         //     // Enviar la actualización al backend
//         //     await axios.put(`http://localhost:8000/api/solicitudes/${id}`, { estado: nuevoEstado });
//         // } catch (error) {
//         //     console.error("Error al actualizar el estado:", error);
//         //     // Revertir el cambio local en caso de error
//         //     const revertedSolicitudes = solicitudes.map(solicitud => 
//         //         solicitud._idSoli === id ? { ...solicitud, estado: solicitud.estado } : solicitud
//         //     );
//         //     setSolicitudes(revertedSolicitudes);
//         // }
//     };

//     return (
//         <div className='userTable'>
//             <div className="titulo">
//                 <h1>Gestión de Solicitudes</h1>
//             </div>
//             <br />
//             <br />
            
//             <div className='btns'>
//                 <button className='Pendiente' onClick={() => setEstadoFiltro('Pendiente')}>Pendiente</button>
//                 {"   -   "}
//                 <button className='Aprobado' onClick={() => setEstadoFiltro('Aprobado')}>Aprobado</button>
//                 {"   -   "}
//                 <button className='Rechazado' onClick={() => setEstadoFiltro('Rechazado')}>Rechazado</button>
//                 {"   -   "}
//                 <button className='Todos' onClick={() => setEstadoFiltro('')}>Todos</button>
//             </div>

//             <br />
//             <br />
        
//             <table border={1} cellPadding={10} cellSpacing={0}>
//                 <thead>
//                     <tr>
//                         <th>N. Orden</th>
//                         <th>ID-Soli</th>
//                         <th>ID-Artista</th>
//                         <th>Nombre Artista</th>
//                         <th>Código Arte</th>
//                         <th>Precio Inicial</th>
//                         <th>Precio Final</th>
//                         <th>Aprobación</th>
//                         <th>Estado</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         filteredSolicitudes.map((solicitud, index) => {
//                             return (
//                                 <tr key={solicitud._idSoli}>
//                                     <td>{index + 1}</td>
//                                     <td>{solicitud._idSoli}</td>
//                                     <td>{solicitud.idArtista}</td>
//                                     <td>{solicitud.nombre} {solicitud.apellido}</td>
//                                     <td>{solicitud.codigo_arte}</td>
//                                     <td>{solicitud.precio_inicial}</td>
//                                     <td>{solicitud.precio_final}</td>
//                                     <td className='actionButtons'>
//                                         <button 
//                                             className='Rechazado' 
//                                             onClick={() => handleEstadoChange(solicitud._idSoli, 'Rechazado')}
//                                         >
//                                             <i className="fa-solid fa-x"></i>
//                                         </button> - 
//                                         <button 
//                                             className='Aprobado' 
//                                             onClick={() => handleEstadoChange(solicitud._idSoli, 'Aprobado')}
//                                         >
//                                             <i className="fa-solid fa-check"></i>
//                                         </button>
//                                     </td>
//                                     <td><button className='Estado'>{solicitud.estado}</button></td>
//                                 </tr>
//                             )
//                         })
//                     }
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default Devolucion;


import React, { useEffect, useState } from 'react';
import "./devolucion.css";
import axios from "axios";

const Devolucion = () => {
    
    const [devoluciones, setDevoluciones] = useState([]);
    const [devolucionesFiltradas, setDevolucionesFiltradas] = useState([]);
    const [estadoFiltro, setEstadoFiltro] = useState('');

    useEffect(() => {
        const fetchDevoluciones = async () => {
            const response = await axios.get("/devoluciones.json");
            setDevoluciones(response.data);
            setDevolucionesFiltradas(response.data); // Inicialmente mostramos todas las devoluciones
        }

        fetchDevoluciones();
    }, []);

    useEffect(() => {
        if (estadoFiltro) {
            setDevolucionesFiltradas(devoluciones.filter(devolucion => devolucion.estado === estadoFiltro));
        } else {
            setDevolucionesFiltradas(devoluciones);
        }
    }, [estadoFiltro, devoluciones]);

    const actualizarEstadoDevolucion = async (id, nuevoEstado) => {
        const devolucionesActualizadas = devoluciones.map(devolucion => 
            devolucion._idDevo === id ? { ...devolucion, estado: nuevoEstado } : devolucion       
        );
        setDevoluciones(devolucionesActualizadas);
        
        //Cambio de estado en el backend
        // try {
        //     await axios.put(`http://localhost:8000/api/devoluciones/${id}`, { estado: nuevoEstado });
        // } catch (error) {
        //     console.error("Error al actualizar el estado:", error);
        //     // Revertir el cambio local en caso de error
        //     setDevoluciones(devoluciones);
        // }
    };

    return (
        <div className='userTable'>
            <div className="titulo">
                <h1>Gestión de Devoluciones</h1>
            </div>
            <br /> 
            <div className='btns'>
                <button className='Pendiente' onClick={() => setEstadoFiltro('Pendiente')}>Pendiente</button>
                {"   -   "}
                <button className='Aprobado' onClick={() => setEstadoFiltro('Aprobado')}>Aprobado</button>
                {"   -   "}
                <button className='Rechazado' onClick={() => setEstadoFiltro('Rechazado')}>Rechazado</button>
                {"   -   "}
                <button className='Todos' onClick={() => setEstadoFiltro('')}>Todos</button>
            </div>

            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>N. Orden</th>
                        <th>ID-Devo</th>
                        <th>ID-Cliente</th>
                        <th>Nombre Cliente</th>
                        <th>Código Compra</th>
                        <th>Precio Producto</th>
                        <th>Motivo</th>
                        <th>Aprobación</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        devolucionesFiltradas.map((devolucion, index) => {
                            return (
                                <tr key={devolucion._idDevo}>
                                    <td>{index + 1}</td>
                                    <td>{devolucion._idDevo}</td>
                                    <td>{devolucion.idCliente}</td>
                                    <td>{devolucion.nombre} {devolucion.apellido}</td>
                                    <td>{devolucion.codigo_compra}</td>
                                    <td>{devolucion.precio_producto}</td>
                                    <td>{devolucion.motivo}</td>
                                    <td className='actionButtons'>
                                        <button 
                                            className='Rechazado' 
                                            onClick={() => actualizarEstadoDevolucion(devolucion._idDevo, 'Rechazado')}
                                        >
                                            <i className="fa-solid fa-x"></i>
                                        </button> - 
                                        <button 
                                            className='Aprobado' 
                                            onClick={() => actualizarEstadoDevolucion(devolucion._idDevo, 'Aprobado')}
                                        >
                                            <i className="fa-solid fa-check"></i>
                                        </button>
                                    </td>
                                    {/* <td><button className='Estado'>{devolucion.estado}</button></td> */}
                                    <td><button className='Estado' style={{backgroundColor: devolucion.estado === 'Pendiente' ? '#214164' : devolucion.estado === 'Aprobado' ? '#069C54' : '#D53B3B'}}>{devolucion.estado}</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Devolucion;

