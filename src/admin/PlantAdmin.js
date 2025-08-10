import { useEffect, useState } from "react";
import PlantAdminForm from "./PlantAdminForm";
import { Link } from "react-router-dom";
import "../styles/style.css";

const PlantAdmin = () => {
  //state to store list of plants fetched from backend
  const [plants, setPlants] = useState([]);

  //state to hold the plant currently being edited, or null if none
  const [editingPlant, setEditingPlant] = useState(null);

  //state to control visibility of the plant form (create/edit)
  const [showForm, setShowForm] = useState(false);

  //fetch plants once on component mount
  useEffect(() => {
    fetch("/plants", { credentials: "include" }) //include credentials for authentication
      .then((res) => res.json()) //parse JSON response
      .then(setPlants) //save plants into state
      .catch((err) => console.error("Error fetching plants:", err)); //log fetch errors
  }, []); //empty dependency array to make sure it runs only once

  //delete a plant by id after confirmation
  function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this plant?")) return;

    //send delete request to backend including cookies
    fetch(`/plants/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          //remove deleted plant from state to update UI
          setPlants(plants.filter((plant) => plant.id !== id));
        } else {
          alert("Failed to delete plant.");
        }
      })
      .catch(() => alert("Error deleting plant."));
  }

  //set a plant for editing and show the form
  function handleEdit(plant) {
    setEditingPlant(plant);
    setShowForm(true);
  }

  //clear editing plant and show form for creating new plant
  function handleCreate() {
    setEditingPlant(null);
    setShowForm(true);
  }

  //handle success callback from form after creating or updating a plant
  //updatedPlant - the plant object returned from backend
  //isEdit - boolean flag indicating if this was an edit (true) or new creation (false)
  function handleFormSuccess(updatedPlant, isEdit = false) {
    if (isEdit) {
      //replace the updated plant in the list
      setPlants((prev) =>
        prev.map((p) => (p.id === updatedPlant.id ? updatedPlant : p))
      );
    } else {
      //add the new plant to the beginning of the list
      setPlants((prev) => [updatedPlant, ...prev]);
    }
    //hide the form and clear editing state
    setShowForm(false);
    setEditingPlant(null);
  }

  return (
    <div className="container py-4">
      {/* link back to Admin Dashboard */}
      <Link to="/admin" className="btn custom-btn mb-5">
        ← Back to Admin Dashboard
      </Link>

      {/* page title */}
      <h2 className="mb-4">Plant Manager</h2>

      {/* button to open form to add new plant */}
      <button className="btn custom-btn mb-4" onClick={handleCreate}>
        Add New Plant
      </button>

      {/* conditionally render form for editing/creating plants */}
      {showForm && (
        <PlantAdminForm
          plant={editingPlant} //pass plant to edit or null for new
          onSuccess={handleFormSuccess} //callback for successful save
          onCancel={() => setShowForm(false)} //callback to close form without saving
        />
      )}

      {/* display plants in a responsive grid */}
      <div className="row">
        {plants.map((plant) => (
          <div key={plant.id} className="col-md-6 mb-4">
            <div className="card h-100">
              {/* show plant photo if available */}
              {plant.photo_url && (
                <img
                  src={plant.photo_url}
                  alt={plant.common_name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}

              <div className="card-body">
                {/* common name */}
                <h5 className="card-title">{plant.common_name}</h5>

                {/* scientific name in italics */}
                <p className="card-text">
                  <em>{plant.scientific_name}</em>
                </p>

                {/* buttons to edit or delete plant */}
                <div className="d-flex gap-2 mb-2">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleEdit(plant)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(plant.id)}
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

export default PlantAdmin;
