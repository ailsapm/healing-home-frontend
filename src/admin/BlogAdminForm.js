import { useState } from 'react';

// to handle both creating and editing blog posts
// if post object is provided, form is in edit mode; otherwise it's for creating a new post
// onSuccess is callback to run when the post is saved or deleted.
// onCancel is callback to close the form without saving.

const BlogAdminForm = ({ post = null, onSuccess, onCancel }) => {
  //initialize state fields with existing post values (if editing), or defaults
  const [title, setTitle] = useState(post?.title || '');
  const [imageUrl, setImageUrl] = useState(post?.image_url || '');
  const [body, setBody] = useState(post?.body || '');

  //determine if the form is in edit mode by checking if a post object exists
  const isEditing = !!post; 

  //handle form submission (create or update post)
  function handleSubmit(e) {
    e.preventDefault(); //prevent full  page reload on submit

    //determine the method and endpoint depending on whether editing or creating
    const method = isEditing ? 'PATCH' : 'POST';
    const url = isEditing ? `/blog_posts/${post.id}` : '/blog_posts';

    //send the form data to the server
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', //include cookies
      body: JSON.stringify({ title, image_url: imageUrl, body }),
    })
      .then((r) => {
        if (!r.ok) throw new Error('Error saving post'); //if server returns error status
        return r.json(); //parse JSON response
      })
      .then((data) => {
        onSuccess?.(data, isEditing); //call success callback with the new or updated post
      })
      .catch((err) => alert(err.message)); //show error if something goes wrong
  }

  //handle deletion of a post (only available in edit mode)
  function handleDelete() {
    //confirm user wants to delete
    if (!isEditing || !window.confirm('Are you sure you want to delete this post?')) return;

    fetch(`/blog_posts/${post.id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((r) => {
        if (!r.ok) throw new Error('Error deleting post');
        onSuccess?.(null); //notify parent that post was deleted
      })
      .catch((err) => alert(err.message));
  }

  //render the form UI
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {/* title input */}
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* image URL input */}
      <div className="mb-3">
        <label className="form-label">Image URL</label>
        <input
          className="form-control"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      {/* body textarea */}
      <div className="mb-3">
        <label className="form-label">Body (HTML)</label>
        <textarea
          className="form-control"
          rows="10"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>

      {/* buttons: submit, delete (if editing), and cancel */}
      <div className="d-flex gap-2">
        <button type="submit" className="btn custom-btn">
          {isEditing ? 'Update' : 'Create'} Post
        </button>
        {isEditing && (
          <button type="button" className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        )}
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BlogAdminForm;

