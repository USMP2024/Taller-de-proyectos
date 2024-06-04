import React, { useEffect, useState } from 'react';
import "./solicitud.css";
import axios from "axios";

const Solicitud = () => {
    
    const [solicitudes, setSolicitudes] = useState([]);
    const [filteredSolicitudes, setFilteredSolicitudes] = useState([]);
    const [estadoFiltro, setEstadoFiltro] = useState('');

    useEffect(() => {
        const fetchSolicitudes = async () => {
            // const response = await axios.get("./solicitudes.json");
            const response = [
                {
                  "_idSoli": "1",
                  "idArtista": "A1",
                  "nombre": "Juan",
                  "apellido": "Pérez",
                  "codigo_arte": "ART001",
                  "precio_inicial": 100,
                  "precio_final": 150,
                  "estado": "Pendiente"
                },
                {
                  "_idSoli": "2",
                  "idArtista": "A2",
                  "nombre": "Ana",
                  "apellido": "Gómez",
                  "codigo_arte": "ART002",
                  "precio_inicial": 200,
                  "precio_final": 250,
                  "estado": "Pendiente"
                },
                {
                  "_idSoli": "3",
                  "idArtista": "A3",
                  "nombre": "Carlos",
                  "apellido": "Lopez",
                  "codigo_arte": "ART003",
                  "precio_inicial": 150,
                  "precio_final": 180,
                  "estado": "Pendiente"
                }
              ];
            // setSolicitudes(response.data);
            // setFilteredSolicitudes(response.data); 
            setSolicitudes(response);
            setFilteredSolicitudes(response); 
        }

        fetchSolicitudes();
    }, []);




    useEffect(() => {
        if (estadoFiltro) {
            setFilteredSolicitudes(solicitudes.filter(solicitud => solicitud.estado === estadoFiltro));
        } else {
            setFilteredSolicitudes(solicitudes);
        }
    }, [estadoFiltro, solicitudes]);

    const handleEstadoChange = (id, nuevoEstado) => {

        const updatedSolicitudes = solicitudes.map(solicitud => 
            solicitud._idSoli === id ? { ...solicitud, estado: nuevoEstado } : solicitud       
        );
        setSolicitudes(updatedSolicitudes);
        
        //Cambio estado para backend
        // try {
        //     // Enviar la actualización al backend
        //     await axios.put(`http://localhost:8000/api/solicitudes/${id}`, { estado: nuevoEstado });
        // } catch (error) {
        //     console.error("Error al actualizar el estado:", error);
        //     // Revertir el cambio local en caso de error
        //     const revertedSolicitudes = solicitudes.map(solicitud => 
        //         solicitud._idSoli === id ? { ...solicitud, estado: solicitud.estado } : solicitud
        //     );
        //     setSolicitudes(revertedSolicitudes);
        // }
    };

    return (
        <div className='userTable'>
            <div className="titulo">
                <h1>Gestión de Solicitudes</h1>
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
                        <th>ID-Soli</th>
                        <th>ID-Artista</th>
                        <th>Nombre Artista</th>
                        <th>Código Arte</th>
                        <th>Precio Inicial</th>
                        <th>Precio Final</th>
                        <th>Aprobación</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredSolicitudes.map((solicitud, index) => {
                            return (
                                <tr key={solicitud._idSoli}>
                                    <td>{index + 1}</td>
                                    <td>{solicitud._idSoli}</td>
                                    <td>{solicitud.idArtista}</td>
                                    <td>{solicitud.nombre} {solicitud.apellido}</td>
                                    <td>{solicitud.codigo_arte}</td>
                                    <td>{solicitud.precio_inicial}</td>
                                    <td>{solicitud.precio_final}</td>
                                    <td className='actionButtons'>
                                        <button 
                                            className='Rechazado' 
                                            onClick={() => handleEstadoChange(solicitud._idSoli, 'Rechazado')}
                                        >
                                            <i className="fa-solid fa-x"></i>
                                        </button> - 
                                        <button 
                                            className='Aprobado' 
                                            onClick={() => handleEstadoChange(solicitud._idSoli, 'Aprobado')}
                                        >
                                            <i className="fa-solid fa-check"></i>
                                        </button>
                                    </td>
                                    {/* <td><button className='Estado'>{solicitud.estado}</button></td> */}
                                    <td><button className='Estado' style={{backgroundColor: solicitud.estado === 'Pendiente' ? '#214164' : solicitud.estado === 'Aprobado' ? '#069C54' : '#D53B3B'}}>{solicitud.estado}</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Solicitud;

