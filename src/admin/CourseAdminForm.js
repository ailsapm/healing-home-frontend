import { useState } from "react";

//form for creating or editing a course
//if course object provided, form is in edit mode with fields pre-filled; otherwise it's for creating a new course
//onSuccess -  callback when course is successfully created, updated, or deleted
//onCancel - callback to close the form without saving
const CourseAdminForm = ({ course = null, onSuccess, onCancel }) => {

  //initialize state fields with existing course data if editing, or defaults if creating new
  const [title, setTitle] = useState(course?.title || "");
  const [description, setDescription] = useState(course?.description || "");
  const [imageUrl, setImageUrl] = useState(course?.image_url || "");
  const [requiresPurchase, setRequiresPurchase] = useState(course?.requires_purchase || false);
  const [price, setPrice] = useState(course?.price || "0.0");

  //boolean flag to check if form is in edit mode (course exists)
  const isEditing = !!course;

  //handle form submission for both creating and updating courses
  function handleSubmit(e) {
    e.preventDefault(); //prevent default form submission reloading page

    //determine HTTP method and endpoint based on editing or creating
    const method = isEditing ? "PATCH" : "POST";
    const url = isEditing ? `/courses/${course.id}` : "/courses";

    //send form data as JSON to backend with credentials included
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title,
        description,
        image_url: imageUrl,
        requires_purchase: requiresPurchase,
        price,
      }),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Error saving course"); //throw error if request failed
        return r.json(); //parse response JSON
      })
      .then((data) => {
        onSuccess?.(data, isEditing); //call success callback with returned course and edit flag
      })
      .catch((err) => alert(err.message)); //show error alert on failure
  }

  //handle deleting the course (only allowed if editing)
  function handleDelete() {
    //confirm user action before deleting
    if (!isEditing || !window.confirm("Are you sure you want to delete this course?")) return;

    //send DELETE request to backend with credentials included
    fetch(`/courses/${course.id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((r) => {
        if (!r.ok) throw new Error("Error deleting course"); //throw error if delete failed
        onSuccess?.(null); //call success callback with null indicating deletion
      })
      .catch((err) => alert(err.message)); //show error alert on failure
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {/* title input field (required) */}
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* description textarea (required) */}
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* image URL input field */}
      <div className="mb-3">
        <label className="form-label">Image URL</label>
        <input
          className="form-control"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      {/* checkbox to toggle whether the course requires purchase */}
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="requiresPurchase"
          checked={requiresPurchase}
          onChange={(e) => setRequiresPurchase(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="requiresPurchase">
          Requires Purchase
        </label>
      </div>

      {/* price input field with step for cents */}
      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      {/* buttons for submit, delete (only if editing), and cancel */}
      <div className="d-flex gap-2">
        <button type="submit" className="btn custom-btn">
          {isEditing ? "Update" : "Create"} Course
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

export default CourseAdminForm;

