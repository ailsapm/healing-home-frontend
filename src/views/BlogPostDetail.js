import React, { useEffect, useState, useContext } from "react";  //usecontext to get user info
import { useParams, Link } from "react-router-dom";  //useparams to get URL parameters
import { UserContext } from "../contexts/UserContext";  //to get current user info for conditional rendering
import "../styles/style.css"; //importing styles

const BlogPostDetail = () => {
  //get blog post ID from URL parameters
  const { id } = useParams();
  
  //access current user from context
  const { user } = useContext(UserContext);

  //state variables
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingBody, setEditingBody] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [alert, setAlert] = useState({ type: "", message: "" });

  //fetch blog post and its comments when component mounts
  useEffect(() => {
    fetch(`/blog_posts/${id}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setPost(data));

    fetch(`/comments?commentable_type=BlogPost&commentable_id=${id}`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setComments(data));
  }, [id]);

  //show alert message for a few seconds
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: "", message: "" }), 3000);
  };

  //submit a new comment
  const handleAddComment = () => {
    fetch("/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        comment: {
          body,
          commentable_type: "BlogPost",
          commentable_id: id,
        },
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to add comment");
        return res.json();
      })
      .then(newComment => {
        setComments(prev => [...prev, newComment]);
        setBody("");
        showAlert("success", "Comment added!");
      })
      .catch(() => showAlert("danger", "Could not add comment"));
  };

  //handle delete flow
  const confirmDelete = commentId => setDeleteTarget(commentId);
  const cancelDelete = () => setDeleteTarget(null);

  //delete a comment
  const handleDelete = () => {
    fetch(`/comments/${deleteTarget}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(res => {
        if (!res.ok) throw new Error();
        setComments(prev => prev.filter(c => c.id !== deleteTarget));
        setDeleteTarget(null);
        showAlert("success", "Comment deleted");
      })
      .catch(() => showAlert("danger", "Failed to delete comment"));
  };

  //start editing a comment
  const startEdit = comment => {
    setEditingCommentId(comment.id);
    setEditingBody(comment.body);
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditingBody("");
  };

  //submit edited comment
  const handleEditSubmit = commentId => {
    fetch(`/comments/${commentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ comment: { body: editingBody } }),
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(updatedComment => {
        setComments(prev =>
          prev.map(c => (c.id === commentId ? updatedComment : c))
        );
        cancelEdit();
        showAlert("success", "Comment updated");
      })
      .catch(() => showAlert("danger", "Failed to update comment"));
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      {/* back link */}
      <Link to="/blog" className="btn custom-btn mb-3">
        ← Back to Healing Home Journal
      </Link>

      {/* flash alert msg */}
      {alert.message && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}

      {/* blog post content */}
      <img
        src={post.image_url}
        alt={post.title}
        className="img-fluid blog-post-banner"
      />
      <h2 className="blog-post-title">{post.title}</h2>
      <p className="text-muted blog-post-author">by {post.user.username}</p>
      <div
        className="blog-post-body"
        dangerouslySetInnerHTML={{ __html: post.body }}
      ></div>

      <hr />
      <h4 className="mt-5">Comments</h4>

      {/* comment list */}
      {comments.map(comment => {
        const canModify = user?.admin || user?.id === comment.user_id;

        return (
          <div key={comment.id} className="mb-3 border-bottom pb-2">
            {editingCommentId === comment.id ? (
              <>
                <textarea
                  className="form-control mb-2"
                  value={editingBody}
                  onChange={e => setEditingBody(e.target.value)}
                />
                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => handleEditSubmit(comment.id)}
                >
                  Save
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p className="mb-1">{comment.body}</p>
                <small className="text-muted">by {comment.user.username}</small>
                {canModify && (
                  <div className="mt-1">
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => startEdit(comment)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => confirmDelete(comment.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}

      {/* add comment box */}
      <div className="mt-4 comment-box p-3 rounded">
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          className="form-control"
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment} className="btn custom-btn mt-2">
          Submit
        </button>
      </div>

      {/* delete confirmation modal */}
      {deleteTarget && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cancelDelete}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this comment?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cancelDelete}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostDetail;
