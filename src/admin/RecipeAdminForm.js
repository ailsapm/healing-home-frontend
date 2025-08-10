import { useState } from "react";

const RecipeAdminForm = ({ recipe, onSuccess, onCancel }) => {
  //initialize form state with either existing recipe data (for editing) or empty defaults (for creating)
  const [formData, setFormData] = useState({
    title: recipe?.title || "",
    description: recipe?.description || "",
    ingredients: recipe?.ingredients || "",
    instructions: recipe?.instructions || "",
    image_url: recipe?.image_url || "",
    is_remedy: recipe?.is_remedy || false, //boolean checkbox value
  });

  //state to hold error messages during form submission
  const [error, setError] = useState(null);

  //handle changes to input fields and checkbox
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      //use checked value if checkbox, otherwise text input value
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  //handle form submission for creating or updating a recipe
  function handleSubmit(e) {
    e.preventDefault();

    //use PATCH if editing an existing recipe, otherwise POST for new recipe
    const method = recipe ? "PATCH" : "POST";
    //endpoint depends on whether editing or creating
    const url = recipe ? `/recipes/${recipe.id}` : "/recipes";

    fetch(url, {
      method,
      credentials: "include", //include cookies
      headers: { "Content-Type": "application/json" },
      //wrap form data in a recipe key to match backend expected params
      body: JSON.stringify({ recipe: formData }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save recipe");
        return res.json();
      })
      //call onSuccess callback with the new/updated recipe and a boolean indicating if it is edit mode
      .then((data) => onSuccess(data, !!recipe))
      //set error message to display in UI if request fails
      .catch((err) => setError(err.message));
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 border p-4 rounded">
      <h4>{recipe ? "Edit Recipe" : "New Recipe"}</h4>

      {/* display error message if any */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* title input */}
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* description textarea */}
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={2}
        />
      </div>

      {/* ingredients textarea */}
      <div className="mb-3">
        <label className="form-label">Ingredients</label>
        <textarea
          className="form-control"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          rows={3}
        />
      </div>

      {/* instructions textarea */}
      <div className="mb-3">
        <label className="form-label">Instructions</label>
        <textarea
          className="form-control"
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          rows={4}
        />
      </div>

      {/* image URL input */}
      <div className="mb-3">
        <label className="form-label">Image URL</label>
        <input
          className="form-control"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
        />
      </div>

      {/* checkbox for marking recipe as a remedy */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="is_remedy"
          name="is_remedy"
          checked={formData.is_remedy}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="is_remedy">
          Is Remedy
        </label>
      </div>

      {/* submit and cancel buttons */}
      <div className="d-flex gap-2">
        <button type="submit" className="btn custom-btn">
          {recipe ? "Update Recipe" : "Create Recipe"}
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RecipeAdminForm;
