import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import "../styles/post-detail.css";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  content: string;
  image_url: string;
  author_name: string;
  created_at: string;
}

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.log("Error al obtener el post:" +err);
      }
    };

    if (id) fetchPost().then(r => {
      console.log("error: "+ r);
    });
  }, [id]);

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
              src={post.image_url}
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
              <span>Por {post.author_name}</span>
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>

            <div className="post-detail-content-text">
              {post.content.split("\n").map((line, index) => (
                  <span key={index}>
      {line}
                    <br />
    </span>
              ))}
            </div>

          </div>
        </div>
      </div>
  );
};

export default PostDetail;
