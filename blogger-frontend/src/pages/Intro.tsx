import { FileText, Users, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/introduccion.css';
import API from '../api'; // Asegúrate que la ruta sea correcta

const Intro = () => {
    const navigate = useNavigate();

    const probarAPI = async () => {
        try {
            const res = await API.get('/');
            alert('✅ Conexión con el backend: ' + res.data);
            console.log('🟢 API respondió:', res.data);
        } catch (error) {
            console.log('conexion fallida:', error);
        }
    };

    return (
        <div className="index-container">
            <div className="index-content">
                <div className="index-welcome-section">
                    <h1 className="index-title">Comparte tus ideas con el mundo</h1>
                    <p className="index-subtitle">
                        Blog Espel es una plataforma moderna para blogueros donde puedes escribir, leer y conectar con una comunidad apasionada por el contenido de calidad.
                    </p>
                    <div className="index-button-container">
                        <button onClick={() => navigate('/register')} className="boton-registro">
                            Comienza Gratis
                        </button>
                        <button onClick={() => navigate('/login')} className="boton-inicio-sesion">
                            Iniciar Sesión
                        </button>
                        <button onClick={probarAPI} className="boton-inicio-sesion">
                            Probar conexión API
                        </button>
                    </div>
                </div>

                <div className="index-caracteristicas-section">
                    <div className="index-caracteristica">
                        <div className="index-caracteristica-icon write">
                            <Edit3 size={24} />
                        </div>
                        <h3 className="index-caracteristica-title">Escribe</h3>
                        <p className="index-caracteristica-description">Crea contenido increíble con nuestro editor intuitivo</p>
                    </div>

                    <div className="index-caracteristica">
                        <div className="index-caracteristica-icon read">
                            <FileText size={24} />
                        </div>
                        <h3 className="index-caracteristica-title">Lee</h3>
                        <p className="index-caracteristica-description">Descubre historias fascinantes de autores talentosos</p>
                    </div>

                    <div className="index-caracteristica">
                        <div className="index-caracteristica-icon connect">
                            <Users size={24} />
                        </div>
                        <h3 className="index-caracteristica-title">Conecta</h3>
                        <p className="index-caracteristica-description">Únete a una comunidad de escritores y lectores</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Intro;

