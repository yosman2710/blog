import { useState } from 'react';
import { Link} from 'react-router-dom';
import '../styles/registro.css';
import { useAuth } from "../contexts/AuthContext"
import {useNavigate} from "react-router-dom";

const Registro = () => {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (await register(name, email, password)) {
            navigate("/posts");
        } else {
            alert("Error al registrar usuario");
        }
    };
        return (
            <div className="registro-container">
                <div className="registro-card">
                    <h1 className="registro-title">Crear una Cuenta</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="auth-field">
                            <label htmlFor="name" className="auth-label">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                className="auth-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="auth-field">
                            <label htmlFor="email" className="auth-label">Correo electrónico</label>
                            <input
                                type="email"
                                id="email"
                                className="auth-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="auth-field">
                            <label htmlFor="password" className="auth-label">Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                className="auth-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="auth-button">
                            Crear Cuenta
                        </button>
                    </form>

                    <p className="auth-link">
                        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                    </p>
                </div>
            </div>
        );
    };


export default Registro;
