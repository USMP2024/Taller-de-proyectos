import React, { useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./Header.css";

export const Header = () => {  
    const[menuOpen, setMenuOpen] = useState(false)
    return (
    <nav>
        <Link to="/" className='title'>Inti Pacha Artes - Admin</Link>

        <div className='menu' onClick={() =>{
            setMenuOpen(!menuOpen);
        }}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        
        <ul className={menuOpen? "open" : ""}>
            <li>
                <NavLink to="/Usuario">Gestionar Usuarios</NavLink>
            </li>
            <li>
                <NavLink to="/Solicitud">Gestionar Solicitudes</NavLink>
            </li>
            <li>
                <NavLink to="/Devolucion">Gestionar Devoluciones</NavLink>
            </li>
        </ul>
    </nav>
    )
}
