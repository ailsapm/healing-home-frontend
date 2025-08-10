import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/style.css";  //import styles

const RecipeDetail = () => {
  //get the `id` parameter from the URL
  const { id } = useParams();
  //to redirect if needed
  const navigate = useNavigate();
  //state to hold the recipe data
  const [recipe, setRecipe] = useState(null);

  //to fetch recipe data when component mounts or id changes
  useEffect(() => {
    fetch(`/recipes/${id}`)  //fetch recipe by id from backend
      .then((r) => {
        if (!r.ok) throw new Error();  //throw error if response not ok
        return r.json();   //parse JSON response body
      })
      .then(setRecipe)   //store fetched recipe in state
      .catch(() => navigate("/recipes")); //redirect if recipe not found
  }, [id, navigate]);

  //show loading state while recipe data is being fetched
  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="container my-4">
       {/* back button to recipe list */}
      <Link to="/recipes" className="btn custom-btn mb-3">
        ← Back to Healing Apothecary
      </Link>

      {/* recipe title */}
      <h2 className="text-3xl font-bold">{recipe.title}</h2>
      {/* author of recipe */}
      <p className="text-muted mb-2">By {recipe.user.username}</p>

      {/* conditionally render recipe image if available */}
      {recipe.image_url && (
        <img
          src={recipe.image_url}
          alt={recipe.title}   // for accessibility alt text to describe image content
          className="img-fluid w-100 mb-4 blog-post-banner"
        />
      )}

      {/* recipe description with label */}
      <p className="mb-2">
        <strong>Description:</strong> {recipe.description}
      </p>

      {/* ingredients with preformatted styling to preserve line breaks */}
      <p className="mb-2 preformatted">
        <strong>Ingredients:</strong><br />
        {recipe.ingredients}
      </p>

      {/* instructions with preformatted styling to preserve line breaks */}
      <p className="mb-4 preformatted">
        <strong>Instructions:</strong><br />
        {recipe.instructions}
      </p>

      {/* tags associated with recipe */}
      <div className="mb-4">
        <p className="mb-2"><strong>Tags:</strong></p>
        {recipe.tags.map((tag) => (
          <span
            key={tag.name}   // use tag name as unique key for list rendering
            className="badge rounded-pill custom-badge me-1"
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RecipeDetail;

