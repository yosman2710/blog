import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.tsx"; // asegúrate que esté separado del provider
import Navbar from "../components/Navbar";
import "../styles/profile.css";
import axios from "axios";

const Profile = () => {
  const { user, login } = useAuth(); // usamos login para actualizar el context global
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || ""); // email es solo lectura
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8800/posts/uptadeName", {
        id: user?.id,
        newUsername: name,
      });

      if (response.status === 200) {
        // Actualiza el usuario en el contexto
        login({ id: user!.id, name, email });

        setMessage("Nombre actualizado correctamente ✅");
      }
    } catch (error) {
      setMessage("Error al actualizar el nombre ❌");
    }
  };

  return (
      <div className="profile-container">
        <Navbar />
        <div className="profile-content">
          <h1 className="profile-title">Mi Perfil</h1>
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="profile-field">
              <label htmlFor="name" className="profile-label">Nombre</label>
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
              <label htmlFor="email" className="profile-label">Correo electrónico</label>
              <input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="profile-input"
              />
            </div>

            <button type="submit" className="profile-button">Actualizar Perfil</button>
            {message && <p className="profile-message">{message}</p>}
          </form>
        </div>
      </div>
  );
};

export default Profile;

