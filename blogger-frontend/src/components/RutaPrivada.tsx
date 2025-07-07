import { Navigate } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
}

const RutaPrivada = ({ children }: Props) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default RutaPrivada;