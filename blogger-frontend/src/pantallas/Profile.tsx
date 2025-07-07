
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../Nueva carpeta/components/Navbar";
import "../styles/profile.css";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email });
    alert("Perfil actualizado correctamente");
  };

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-content">
        <h1 className="profile-title">Mi Perfil</h1>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="profile-field">
            <label htmlFor="name" className="profile-label">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="profile-input"
            />
          </div>
          <div className="profile-field">
            <label htmlFor="email" className="profile-label">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="profile-input"
              disabled
            />
          </div>
          <button type="submit" className="profile-button">
            Actualizar Perfil
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
