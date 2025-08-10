import { useEffect, useState } from "react";
import RecipeAdminForm from "./RecipeAdminForm";
import { Link } from "react-router-dom";
import "../styles/style.css";

const RecipeAdmin = () => {
  const [recipes, setRecipes] = useState([]); //stores list of all recipes
  const [editingRecipe, setEditingRecipe] = useState(null); //currently selected recipe for editing
  const [showForm, setShowForm] = useState(false); //toggles visibility of form

  //fetch recipes from the server when the component first mounts
  useEffect(() => {
    fetch("/recipes", { credentials: "include" })
      .then((res) => res.json())   //parse json response
      .then(setRecipes)            //update state with fetched recipes
      .catch((err) => console.error("Error fetching recipes:", err));  //handle network or parsing errors
  }, []);  //empty dependency array so it only runs once on mount

  //handle deletion of a recipe
  function handleDelete(id) {
    //confirm user wants to delete
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    //send delete request for relevant id, include cookies
    fetch(`/recipes/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          //remove deleted recipe from state
          setRecipes(recipes.filter((r) => r.id !== id));
        } else {
          alert("Failed to delete recipe.");
        }
      })
      .catch(() => alert("Error deleting recipe."));
  }

  //open form with pre-populated recipe data for editing
  function handleEdit(recipe) {
    setEditingRecipe(recipe);
    setShowForm(true);
  }

  //open empty form for creating a new recipe
  function handleCreate() {
    setEditingRecipe(null);
    setShowForm(true);
  }

  //handle successful form submission (either create or edit)
  function handleFormSuccess(updatedRecipe, isEdit = false) {
    if (isEdit) {
      //replace the updated recipe in the list
      setRecipes((prev) =>
        prev.map((r) => (r.id === updatedRecipe.id ? updatedRecipe : r))
      );
    } else {
      //add newly created recipe to the top of the list
      setRecipes((prev) => [updatedRecipe, ...prev]);
    }
    setShowForm(false); // close form
  }

  return (
    <div className="container py-4">
      <Link to="/admin" className="btn custom-btn mb-5">
        ← Back to Admin Dashboard
      </Link>

      <h2 className="mb-4">Recipe Manager</h2>

      {/* button to open the form for creating a new recipe */}
      <button className="btn custom-btn mb-4" onClick={handleCreate}>
        Add New Recipe
      </button>

      {/* conditionally render the form for editing or creating */}
      {showForm && (
        <RecipeAdminForm
          recipe={editingRecipe}
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* display list of recipes in a grid */}
      <div className="row">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col-md-6 mb-4">
            <div className="card h-100">
              {/* render image if available */}
              {recipe.image_url && (
                <img
                  src={recipe.image_url}
                  alt={recipe.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text text-muted">{recipe.description}</p>

                {/* edit/delete buttons */}
                <div className="d-flex gap-2 mb-2">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleEdit(recipe)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(recipe.id)}
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

export default RecipeAdmin;

