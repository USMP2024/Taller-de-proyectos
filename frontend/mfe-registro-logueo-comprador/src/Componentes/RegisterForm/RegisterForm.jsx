import React from "react";
import './RegisterForm.css';
import { FaRegUser, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm =()=>{
   
    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const navigate=useNavigate()
    const onSubmit = (data) => {
        // Crear un nuevo objeto con los campos que se enviaran
        const payload = {
            nombre: data.nombre,
            apellidos: data.apellidos,
            email: data.email,
            password: data.password1 
        };

        // Enviar los datos a la API
        axios.post("https://c5nft1fhh1.execute-api.us-east-1.amazonaws.com/Prod/Autenticacion/RegistroComprador", payload)
            .then(() => {
                navigate('/index');
            })
            .catch((error) => {
                console.log(error);
            });

        console.log(payload);
    }; 

    //Formulario Registro
    return(
        
        <div className="body">
            <div className="wrapper">
                <form onSubmit={handleSubmit(onSubmit)} >

                    <h1>Formulario de Registro</h1>

                    <div className="input-box">
                        <FaRegUser className='icon' />
                        <input type="text" placeholder="Nombre" {...register('nombre', {
                            //Validacion del campo Nombre
                            required: true,
                            minLength: 2,
                            })} 
                        />
                        {errors.nombre?.type === 'required' && <p>Se requiere un nombre</p>}
                        {errors.nombre?.type === 'minLength' && <p>Nombre minimo con 2 caracteres</p>}
                    </div>

                    <div className="input-box">
                        <FaRegUser className='icon' />
                        <input type="text" placeholder="Apellidos" {...register('apellidos', {
                            //Validacion del campo Apellido
                            required: true,
                            minLength: 2,                           
                            })} 
                        />
                        {errors.apellidos?.type === 'required' && <p>Se requiere apellidos</p>}
                        {errors.apellidos?.type === 'minLength' && <p>Apellido minimo con 2 caracteres</p>}
                    </div>

                    <div className="input-box">
                        <FaRegUser className='icon' />
                        <input type="email" placeholder="Email" {...register('email', {
                            //Validacion del campo Email
                            required: true,
                            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            })} 
                        />
                        {errors.email?.type === 'pattern' && <p>El formato de email es incorrecto</p>}
                        {errors.email?.type === 'required' && <p>Se requiere un email</p>}
                    </div>

                    <div className="input-box">
                        <FaLock className='icon'/>
                        <input type="password" placeholder="Contraseña" {...register('password1', {
                            //Validacion del campo Validar Contraseña
                            required: true,
                            minLength: 8,
                            })} 
                        />  
                        {errors.password1?.type === 'required' && <p>Se requiere una contraseña</p>}   
                        {errors.password1?.type === 'minLength' && <p>Ingrese una contraseña de 8 caracteres </p> }    
                    </div>
                    <div className="input-box">
                        <FaLock className='icon'/>
                        <input type="password" placeholder="Contraseña" {...register('password2', {
                            //Validacion del campo Validar Contraseña
                            required: true,
                            validate: (value) => value === watch('password1') || 'Las contraseñas no coinciden',
                            })} 
                        />  
                        {errors.password2?.type === 'required' && <p>Se requiere confirmar la contraseña</p>}
                        {errors.password2?.type === 'validate' && <p>Las contraseñas no coinciden</p>}      
                    </div>                              
                    <button  type="submit" value="Enviar" >Registrarse</button>               


                    <div className="terminos">
                            <input type="checkbox" {...register('terminos', {
                                //Validacion del campo Terminos y Condiciones
                            required: true
                            })} /> 
                            {errors.terminos?.type === 'required' && <p>Para registrarce, acepte los terminos y condiciones</p>}
                            <Link to="/terminos" style={{ color: 'black', textDecoration: 'none' }} target="_blank">Terminos y Condiciones</Link>
                    </div>

                    <div className="register-link">
                        <p>¿Ya tienes una cuenta? <Link to="/login" style={{ color: 'black', textDecoration: 'none' }}>Inicia Sesión</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;