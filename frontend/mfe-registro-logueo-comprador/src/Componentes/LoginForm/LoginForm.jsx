import React from "react";
import "./LoginForm.css";
import { FaRegUser, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const LoginForm = () => {
    const {register, formState: { errors }, handleSubmit,} = useForm();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        //Función axios Form-Login
        axios.post("urlback",data).then(()=>{
            navigate('/index')
        })
        .catch((error)=>{
            console.log(error)
        })
        
        console.log(data);

    };
    //Formulario Inicio Sesión
    return (
        <div className="body">
            <div className="wrapper">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Iniciar Sesión</h1>

                    <h2>Bienvenido a </h2>
                    <h2>Inti Pacha Artes</h2>

                    <div className="input-box">
                        <FaRegUser className="icon" />
                        <input
                            type="email" 
                            placeholder="Email"
                            //Validacion del campo email
                            {...register("email", {
                                required: true,
                                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            })}
                        />
                        {errors.email?.type === "pattern" && (
                            <p>El formato de email es incorrecto</p>
                        )}
                        {errors.email?.type === "required" && <p>Se requiere un email</p>}
                    </div>

                    <div className="input-box">
                        <FaLock className="icon" />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            //Validacion del campo Contraseña
                            {...register("password", {
                                required: true,
                            })}
                        />
                        {errors.password?.type === "required" && (
                            <p>Se requiere una contraseña</p>
                        )}
                    </div>

                    <button type="submit" value="Enviar">
                        Iniciar Sesión
                    </button>

                    <div className="register-link">
                        <p>
                            ¿Aún no tiene una cuenta?{" "}
                            <Link
                                to="/register"
                                style={{ color: "black", textDecoration: "none" }}
                            >
                                Registrate
                            </Link>
                        </p>
                    </div>
                    
                </form>
            </div>
        </div>
        
    );
};

export default LoginForm;
