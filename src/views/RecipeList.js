import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/style.css"; //import CSS styles

const RecipeList = () => {
  //state to hold all recipes fetched from the server
  const [recipes, setRecipes] = useState([]);

  //state to store what the user types into the search box
  const [search, setSearch] = useState("");

  //fetch all recipes once when the component first loads
  useEffect(() => {
    fetch("/recipes")
      .then((r) => r.json()) //parse JSON from the response
      .then(setRecipes); //save the data in state
  }, []);

  //function to search for recipes by ingredient when user clicks Search
  function handleSearch() {
    fetch(`/recipes/search?ingredient=${search}`)
      .then((r) => {
        if (r.ok) return r.json(); //if search worked, parse JSON
        throw new Error("No recipes found"); //otherwise throw error
      })
      .then(setRecipes) //update recipes shown with the search results
      .catch(() => alert("No recipes found")); //show alert if nothing found
  }

  return (
    <div className="container py-4">
      {/* page title */}
      <h2 className="mb-4">All Recipes</h2>

      {/* search input and button container */}
      <div className="mb-4 d-flex flex-column flex-sm-row align-items-start search-bar">
      {/* 
      manual search: this input only updates local state and does not trigger a search request while 
      typing - I've been trying out dynamic search in PlantDirectory.js, but here, the search happens 
      only when the search button below is clicked.  
      */}
      <input
        className="form-control custom-input me-sm-2 mb-2 mb-sm-0 recipe-input"
        placeholder="Enter ingredient to search for recipes"
        value={search}
        onChange={(e) => setSearch(e.target.value)} //update search state
      />
      <button onClick={handleSearch} className="btn custom-btn">
        Search
      </button>
    </div>

    {/* list of recipe cards */}
    <div className="row">
      {recipes.map((recipe) => (
        <div className="col-12 col-md-6 col-lg-4 mb-4" key={recipe.id}>
          <div className="card h-100 shadow-sm">
            {/* show image if available */}
            {recipe.image_url && (
              <img
                src={recipe.image_url}
                className="card-img-top"
                alt={recipe.title} //describe the image with alt text for accessibilty
              />
            )}
            <div className="card-body">
              {/* recipe title */}
              <h5 className="card-title">{recipe.title}</h5>

              {/* link to view full recipe details */}
              <Link to={`/recipes/${recipe.id}`} className="btn btn-sm custom-btn">
                View Recipe
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
 );
};

export default RecipeList;