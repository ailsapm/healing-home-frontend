import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

const BlogPostsList = () => {
  //state to hold all blog posts fetched from the backend
  const [posts, setPosts] = useState([]);

  //fetch posts on component mount
  useEffect(() => {
    fetch("/blog_posts", { credentials: "include" })
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Journal Entries</h2>

      {/* bootstrap responsive grid: 1 column on small, 2 on medium, 3 on large screens */}
      <div className="row">
        {posts.map(post => (
          <div key={post.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              
              {/* post image */}
              {post.image_url && (
                <img
                  src={post.image_url}
                  className="card-img-top blog-post-card-img"
                  alt={post.title}
                />
              )}

              {/* post title and link */}
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <Link to={`/blog/${post.id}`} className="btn btn-sm custom-btn">
                  View More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPostsList;


