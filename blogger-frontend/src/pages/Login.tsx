import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import "../styles/login.css";
import ResetPassword from "./forgotPassword/resetPassword.tsx";
import ForgotPasswordEmail from "./forgotPassword/verifiqueEmail.tsx";
import ForgotPasswordCode from "./forgotPassword/sendCode.tsx";

type LoginStep = "login" | "forgot-email" | "forgot-code" | "reset-password";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [currentStep, setCurrentStep] = useState<LoginStep>("login");
    const [recoveryEmail, setRecoveryEmail] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    // 🔐 Inicio de sesión
    const handleLogin = async () => {
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
                setErrorMessage("");
                navigate("/posts");
            } else {
                setErrorMessage("Credenciales inválidas");
            }
        } catch (error) {
            setErrorMessage("Error al iniciar sesión. Intenta de nuevo. " + error);
        }
    };

    // 👁 Mostrar/ocultar contraseña
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    //  Enviar email de recuperación
    const handleEmailSubmit = async (email: string) => {
        try {
            console.log("Email recibido:", email); // 👀
            await axios.post("http://localhost:8800/send-code", { email });
            setRecoveryEmail(email);
            setCurrentStep('forgot-code');
        } catch (err) {
            alert(err)
        }
    };


    // 🔢 Verificar código
    const handleCodeSubmit = async () => {
        setCurrentStep("reset-password");
    };

    // 🔒 Resetear contraseña
    const handlePasswordReset = async (newPassword: string) => {

        try {
            await axios.post("http://localhost:8800/reset-password", {
                email: recoveryEmail,
                newPassword: newPassword,
            });

            alert("Contraseña actualizada exitosamente");
            setCurrentStep("login");
            setRecoveryEmail("");
        } catch (err) {
            alert("Error al actualizar contraseña: " + err);
        }
    };


    // 🔁 Reenviar código
    const handleResendCode = async () => {
        try {
            await axios.post("http://localhost:8800/send-code", {
                email: recoveryEmail,
            });
            alert("Código reenviado");
        } catch (err) {
            alert("Error al reenviar el código: " + err);
        }
    };

    // 🔙 Volver al login
    const handleBackToLogin = () => {
        setCurrentStep("login");
        setRecoveryEmail("");
    };

    // 🧾 Render condicional por paso
    if (currentStep === "forgot-email") {
        return (
            <div className="login-container">
                <ForgotPasswordEmail
                    onSubmit={handleEmailSubmit}
                    onBack={handleBackToLogin}
                />
            </div>
        );
    }

    if (currentStep === "forgot-code") {
        return (
            <div className="login-container">
                <ForgotPasswordCode
                    email={recoveryEmail}
                    onSubmit={handleCodeSubmit}
                    onBack={() => setCurrentStep("forgot-email")}
                    onResend={handleResendCode}
                />
            </div>
        );
    }

    if (currentStep === "reset-password") {
        return (
            <div className="login-container">
                <ResetPassword
                    email={recoveryEmail}
                    onSubmit={handlePasswordReset}
                    onBack={() => setCurrentStep("forgot-code")}
                />
            </div>
        );
    }

    // 🧾 Pantalla principal de login
    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="login-title">Iniciar Sesión</h1>

                {errorMessage && (
                    <div className="auth-error-message">{errorMessage}</div>
                )}

                <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        Correo electrónico
                    </label>
                    <div className="input-wrapper">
                        <Mail className="input-icon" size={20} />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            placeholder="correo@ejemplo.com"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">
                        Contraseña
                    </label>
                    <div className="input-wrapper">
                        <Lock className="input-icon" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="password-toggle"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <div className="forgot-password-wrapper">
                    <button
                        type="button"
                        onClick={() => setCurrentStep("forgot-email")}
                        className="forgot-password-link"
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>

                <button type="submit" className="auth-button" onClick={handleLogin}>
                    Iniciar
                </button>

                <p className="auth-link">
                    ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
                </p>
            </div>
        </div>
    );
};

export default Login;