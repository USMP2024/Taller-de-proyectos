import React, { useEffect, useState } from 'react';
import "./user.css";
import { Link } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

const User = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filterRole, setFilterRole] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8000/api/getall");
            setUsers(response.data);
            setFilteredUsers(response.data); // Inicialmente mostramos todos los usuarios
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (filterRole) {
            setFilteredUsers(users.filter(user => user.rol === filterRole));
        } else {
            setFilteredUsers(users);
        }
    }, [filterRole, users]);

    const deleteUser = async (userId) => {
        await axios.delete(`http://localhost:8000/api/delete/${userId}`)
            .then((response) => {
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
                toast.success("Usuario Eliminado", { position: 'top-right' });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className='userTable'>
            <div className="titulo">
                <h1>Gestión de Usuarios</h1>
            </div>
            <br />
            <div className='btns'>
                <button className='Clientes' onClick={() => setFilterRole('Cliente')}>Clientes</button>
                {"   -   "}
                <button className='Artista' onClick={() => setFilterRole('Artista')}>Artista</button>
                {"   -   "}
                <button className='Todos' onClick={() => setFilterRole('')}>Todos</button>
            </div>
            <br />
            
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>N. Orden</th>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredUsers.map((user, index) => {
                            return (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user._id}</td>
                                    <td>{user.fname} {user.lname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.rol}</td>
                                    <td className='actionButtons'>
                                        <button onClick={() => deleteUser(user._id)}>x</button>
                                        <Link to={`/edit/${user._id}`}>Editar</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default User;
