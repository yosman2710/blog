import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/registro.css';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // 🛑 Nuevo estado para errores

    const navigate = useNavigate();

    const createUser = async () => {
        try {
          await axios.post('http://localhost:8800/register', {
                Name: name,
                email: email,
                password: password,
            });

            console.log('✅ Usuario registrado');
            setErrorMessage(''); // Limpia el error si todo salió bien
            navigate('/login');
        } catch (error) {
                setErrorMessage('Ocurrió un error inesperado. Intenta de nuevo.'+ error);
        }
    };

    return (
        <div className="registro-container">
            <div className="registro-card">
                <h1 className="registro-title">Crear una Cuenta</h1>

                {errorMessage && (
                    <div className="auth-error-message">
                        ⚠️ {errorMessage}
                    </div>
                )}

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

                <button type="submit" className="auth-button" onClick={createUser}>
                    Crear Cuenta
                </button>

                <p className="auth-link">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
