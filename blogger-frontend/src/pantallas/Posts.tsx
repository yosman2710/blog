import { Link } from "react-router-dom";
import Navbar from "../Nueva carpeta/components/Navbar";
import "../styles/posts.css";

// Mock data para los posts
const posts = [
  {
    id: 1,
    title: "Introducción a React",
    content: "React es una biblioteca de JavaScript para construir interfaces de usuario...",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop",
    author: "Juan Pérez",
    date: "2024-01-15"
  },
  {
    id: 2,
    title: "El Futuro de la Inteligencia Artificial",
    content: "La IA está transformando nuestro mundo de maneras increíbles. Descubre las tendencias más importantes y cómo nos afectarán...",
    author: "Carlos López",
    date: "2024-01-12",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop"
  },
  {
    id: 3,
    title: "Mejores Prácticas en UX/UI Design",
    content: "Un diseño efectivo puede hacer la diferencia entre el éxito y el fracaso de un producto. Aquí tienes los principios fundamentales...",
    author: "María Rodríguez",
    date: "2024-01-10",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop"
  },
  {
    id: 4,
    title: "Productividad para Desarrolladores",
    content: "Consejos prácticos para maximizar tu productividad como desarrollador, desde la gestión del tiempo hasta las herramientas esenciales...",
    author: "Juan Martín",
    date: "2024-01-08",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop"
  },
  {
    id: 5,
    title: "Tendencias en Desarrollo Mobile",
    content: "El mundo mobile evoluciona constantemente. Descubre las últimas tendencias en desarrollo de aplicaciones móviles...",
    author: "Laura Fernández",
    date: "2024-01-05",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop"
  }
];

const Posts = () => {
  return (
    <div className="posts-container">
      <Navbar />
      <div className="posts-content">
        <div className="posts-header">
          <h1 className="posts-title">Últimos Posts</h1>
          <p className="posts-subtitle">Descubre contenido increíble de nuestra comunidad</p>
        </div>
        
        <div className="posts-grid">
          {posts.map((post) => (
            <Link key={post.id} to={`/post/${post.id}`} className="post-card">
              <img 
                src={post.image} 
                alt={post.title}
                className="post-image"
              />
              <div className="post-content">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-excerpt">
                  {post.content.substring(0, 150)}...
                </p>
                <div className="post-meta">
                  <span>Por {post.author}</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
