import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/posts.css";

interface Post {
  id: number;
  title: string;
  image_url: string;
  author_name: string;
  created_at: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/posts");
        console.log("Respuesta del backend:", res.data);
        setPosts(res.data);

      } catch (err) {
        console.error("Error al obtener los posts:", err);
      }
    };

    fetchPosts().then(r => {
      console.log(r);
    });
  }, []);

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
                      src={post.image_url}
                      alt={post.title}
                      className="post-image"
                  />
                  <div className="post-content">
                    <h3 className="post-title">{post.title}</h3>
                    <div className="post-meta">
                      <span>Por {post.author_name}</span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
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
