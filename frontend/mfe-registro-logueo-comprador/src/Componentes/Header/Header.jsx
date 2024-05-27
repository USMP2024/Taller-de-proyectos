import React, { useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./Header.css";

export const Header = () => {  
    const[menuOpen, setMenuOpen] = useState(false)
    return (
    //Encabezado Inicio Sesión - Registrarse
    <nav>
        <Link to="/" className='title'>Inti Pacha Artes</Link>

        <div className='menu' onClick={() =>{
            setMenuOpen(!menuOpen);
        }}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        
        <ul className={menuOpen? "open" : ""}>

            <li>
                <NavLink to="/login">Iniciar Sesión</NavLink>
            </li>
            <li>
                <NavLink to="/register">Registrarse</NavLink>
            </li>
        </ul>
    </nav>
  )
}
