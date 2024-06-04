import React, { useEffect, useState } from 'react';
import "./devolucion.css";
import axios from "axios";

const Devolucion = () => {
    
    const [devoluciones, setDevoluciones] = useState([]);
    const [devolucionesFiltradas, setDevolucionesFiltradas] = useState([]);
    const [estadoFiltro, setEstadoFiltro] = useState('');

    useEffect(() => {
        const fetchDevoluciones = async () => {
            // const response = await axios.get("/devoluciones.json");
            const response = [
                {
                    "_idDevo": "1",
                    "idCliente": "A1",
                    "nombre": "Juan",
                    "apellido": "Pérez",
                    "codigo_compra": "COMP001",
                    "precio_producto": 100,
                    "motivo": "Producto defectuoso",
                    "estado": "Pendiente"
                },
                {
                    "_idDevo": "2",
                    "idCliente": "A2",
                    "nombre": "Ana",
                    "apellido": "Gómez",
                    "codigo_compra": "COMP002",
                    "precio_producto": 200,
                    "motivo": "No era lo que esperaba",
                    "estado": "Pendiente"
                },
                {
                    "_idDevo": "3",
                    "idCliente": "A3",
                    "nombre": "Carlos",
                    "apellido": "Lopez",
                    "codigo_compra": "COMP003",
                    "precio_producto": 150,
                    "motivo": "Cambio de opinión",
                    "estado": "Pendiente"
                }
              ];
            // Cambiar cuando se tenga el link del back
            //   setDevoluciones(response.data);
            //   setDevolucionesFiltradas(response.data);
            setDevoluciones(response);
            setDevolucionesFiltradas(response); // Inicialmente mostramos todas las devoluciones
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

