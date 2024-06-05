import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';
import "./add.css"

const Add = () => {

    const users = {
        fname:"",
        lname:"",
        emal:"",
        password:"",
        rol:"",
    }

    const [user, setUser] = useState(users);
    const [isloading, setIsloading] = useState(false);
    const navigate = useNavigate();

    const inputHandler =(e) =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value});
    }

    const submitForm = async(e)=>{
        
        e.preventDefault();
        setIsloading(true)
        await axios.post("http://localhost:8000/api/create", user)
        .then((response)=>{
            // toast.success(response.data.msg, {position:"top-right"})
            toast.success("Usuario Creado", {position:"top-right"})
            navigate("/")
            setIsloading(false)
        })
        .catch(error => console.log(error))
    }


  return (
    <div className='addUser'>
        <Link to={"/"}>Volver</Link>
        <h3>Registro de Usuario</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className='inputGroup'>
                <label htmlFor="fname">Nombre</label>
                <input type="text" onChange={inputHandler} id="fname" name="fname" autoComplete='off' placeholder='Nombre' />
            </div>
            <div className='inputGroup'>
                <label htmlFor="lname">Apellido</label>
                <input type="text" onChange={inputHandler} id="lname" name="lname" autoComplete='off' placeholder='Apellido' />
            </div>
            <div className='inputGroup'>
                <label htmlFor="email">Email</label>
                <input type="email" onChange={inputHandler} id="email" name="email" autoComplete='off' placeholder='Email' />
            </div>
            <div className='inputGroup'>
                <label htmlFor="password">Contraseña</label>
                <input type="password" onChange={inputHandler} id="password" name="password" autoComplete='off' placeholder='Contraseña' />
            </div>
            <div className='inputGroup'>
                <label htmlFor="rol">Rol</label>
                <input type="rol" onChange={inputHandler} id="rol" name="rol" autoComplete='off' placeholder='Rol' />
            </div>
            <div className='inputGroup'>
                <button type="submit" className={`${isloading ? 'disabled' : ''} `} disabled={isloading}>Registrar Usuario</button>
            </div>
        </form>
    </div>
  )
}

export default Add