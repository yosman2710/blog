import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import axios from "axios";
import "../styles/login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const logger = async () => {
        if (!email || !password) {
            setErrorMessage("Completa todos los campos.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8800/login", {
                email,
                password,
            });

            const { id, name, email: userEmail } = response.data;

            if (id && name && userEmail) {
                login({ id, name, email: userEmail });
                navigate("/posts");
            } else {
                setErrorMessage("Credenciales inválidas");
            }
        } catch (error) {
            setErrorMessage("Error al iniciar sesión. Intenta de nuevo."+ error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Iniciar Sesión</h1>
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

                {errorMessage && <p className="auth-error">{errorMessage}</p>}

                <button type="submit" className="auth-button" onClick={logger}>
                    Iniciar Sesión
                </button>

                <p className="auth-link">
                    ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
