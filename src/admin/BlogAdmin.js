import { useEffect, useState } from "react";
import BlogAdminForm from "./BlogAdminForm";
import { Link } from "react-router-dom";
import "../styles/style.css"; // import styles

const BlogAdmin = () => {
  //store all blog posts from the server
  const [posts, setPosts] = useState([]);

  //track the post being edited (if any)
  const [editingPost, setEditingPost] = useState(null);

  //control whether the form is shown
  const [showForm, setShowForm] = useState(false);

  //send a GET request to fetch all blog posts from the server - include cookies
  useEffect(() => {
    fetch("/blog_posts", { credentials: "include" })
      // When the server responds, parse the response as JSON
      .then((res) => res.json())
      //update the state with fetched post data
      .then(setPosts)
      //log errors in console
      .catch((err) => console.error("Error fetching posts:", err));
      //[] to make sure it only runs once on page load
  }, []);

  //handle deleting a post
  function handleDelete(id) {
    //ask user to confirm before deleting post
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    //send a DELETE request to the backend
    fetch(`/blog_posts/${id}`, {
      method: "DELETE",
      credentials: "include",  //include cookies
    })
      .then((res) => {
        if (res.ok) {
          //remove deleted post from state
          setPosts(posts.filter((post) => post.id !== id));
        } else {
          alert("Failed to delete post.");
        }
      })
      .catch(() => alert("Error deleting post."));
  }

  //start editing a post
  function handleEdit(post) {
    setEditingPost(post);
    setShowForm(true);
  }

  //start creating a new post
  function handleCreate() {
    setEditingPost(null);
    setShowForm(true);
  }

  //update the post list when a post is added or edited
  function handleFormSuccess(updatedPost, isEdit = false) {
    if (isEdit) {
      // update the existing post in the list
      setPosts((prev) =>
        prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
      );
    } else {
      //add new post to the top of the list
      setPosts((prev) => [updatedPost, ...prev]);
    }

    //close the form after success
    setShowForm(false);
    setEditingPost(null);
  }

  return (
    <div className="container py-4">
      {/* back button to admin dashboard */}
      <Link to="/admin" className="btn custom-btn mb-5">
        ← Back to Admin Dashboard
      </Link>

      {/* page title */}
      <h2 className="mb-4">Blog Manager</h2>

      {/* button to start creating new post */}
      <button className="btn custom-btn mb-4" onClick={handleCreate}>
        Create New Post
      </button>

      {/* form appears for editing or creating */}
      {showForm && (
        <BlogAdminForm
          post={editingPost}
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* display list of blog posts */}
      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-md-6 mb-4">
            <div className="card h-100">
              {/* show image if available */}
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}

              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>

                {/* edit & delete buttons */}
                <div className="d-flex gap-2 mb-2">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogAdmin;

