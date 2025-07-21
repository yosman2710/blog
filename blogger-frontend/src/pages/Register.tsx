import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/register.css';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
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
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="registro-container">
            <div className="registro-card">
                <div className="registro-title">Crear una Cuenta</div>
                {errorMessage && <div className="auth-error-message">{errorMessage}</div>}
                <div className="auth-field">
                    <label className="auth-label">Nombre</label>
                    <div className="input-wrapper">
                        <User className="input-icon" />
                        <input
                            className="auth-input form-input"
                            type="text"
                            placeholder="Ingresa tu nombre completo"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="auth-field">
                    <label className="auth-label">Correo electrónico</label>
                    <div className="input-wrapper">
                        <Mail className="input-icon" />
                        <input
                            className="auth-input form-input"
                            type="email"
                            placeholder="correo@ejemplo.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="auth-field">
                    <label className="auth-label">Contraseña</label>
                    <div className="input-wrapper">
                        <Lock className="input-icon" />
                        <input
                            className="auth-input form-input"
                            type={showPassword ? "text" : "password"}
                            placeholder="Crea una contraseña segura"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>
                </div>
                <button className="auth-button" onClick={createUser}>Crear Cuenta</button>
                <div className="auth-link">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </div>
            </div>
        </div>

    );
};

export default Register;
