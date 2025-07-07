import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { useAuth } from "../contexts/AuthContext"// Asegúrate que la ruta sea correcta

const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (await login(email, password)) {
            navigate("/posts");
        } else {
            alert("Credenciales incorrectas");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Iniciar Sesión</h1>
                <form onSubmit={handleSubmit}>
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
                        Iniciar Sesión
                    </button>
                </form>

                <p className="auth-link">
                    ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
