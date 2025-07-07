import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../Nueva carpeta/components/Navbar.tsx";
import "../styles/post-detail.css";

// Mock data para los posts
const posts = [
  {
    id: 1,
    title: "Introducción a React",
    content: "React es una biblioteca de JavaScript para construir interfaces de usuario. Fue desarrollada por Facebook y se ha convertido en una de las herramientas más populares para el desarrollo frontend.\n\nEn este artículo exploraremos los conceptos básicos de React, incluyendo componentes, props, estado y el ciclo de vida de los componentes.\n\nReact utiliza un enfoque declarativo para construir interfaces, lo que significa que describes cómo debería verse tu UI en lugar de cómo lograr que se vea así.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    author: "Juan Pérez",
    date: "2024-01-15"
  },
  {
    id: 2,
    title: "Guía Completa de Next.js",
    content: "Next.js es un framework de React para la producción. Ofrece características como renderizado del lado del servidor, generación de sitios estáticos y enrutamiento fácil.\n\nCon Next.js, puedes construir aplicaciones web rápidas y optimizadas para SEO. Además, facilita la creación de APIs y la integración con bases de datos.",
    image: "https://images.unsplash.com/photo-1654072144954-8afc7988a477?w=800&h=400&fit=crop",
    author: "María García",
    date: "2024-02-01"
  },
  {
    id: 3,
    title: "Desarrollo de APIs con Node.js y Express",
    content: "Node.js es un entorno de tiempo de ejecución de JavaScript que permite ejecutar JavaScript en el lado del servidor. Express es un framework para Node.js que facilita la creación de APIs RESTful.\n\nEn este tutorial, aprenderás cómo construir una API RESTful completa utilizando Node.js y Express, incluyendo la gestión de rutas, middleware y bases de datos.",
    image: "https://images.unsplash.com/photo-1516110881467-ca90749ca8ca?w=800&h=400&fit=crop",
    author: "Carlos López",
    date: "2024-02-15"
  }
];

const PostDetail = () => {
  const { id } = useParams();
  const post = posts.find(p => p.id === parseInt(id || '0'));

  if (!post) {
    return (
      <div className="post-detail-container">
        <Navbar />
        <div className="post-detail-content">
          <p>Post no encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      <Navbar />
      <div className="post-detail-content">
        <img 
          src={post.image} 
          alt={post.title}
          className="post-detail-image"
        />
        <div className="post-detail-body">
          <Link to="/posts" className="post-detail-back">
            <ArrowLeft size={16} />
            Volver a Posts
          </Link>
          
          <h1 className="post-detail-title">{post.title}</h1>
          
          <div className="post-detail-meta">
            <span>Por {post.author}</span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          
          <div className="post-detail-content-text">
            {post.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
