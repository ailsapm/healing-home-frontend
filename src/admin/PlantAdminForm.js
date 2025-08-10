import { useState, useEffect } from "react";

//default form field values
const initialState = {
  common_name: "",
  scientific_name: "",
  family: "",
  description: "",
  growing_harvesting: "",
  photo_url: "",
  parts_used: "",
  physiological_actions: "",
  energetics: "",
  ways_to_use: "",
  uses: "",
  cautions: "",
  history: "",
  magical: "",
  is_sample: false,
};

const PlantAdminForm = ({ plant, onSuccess, onCancel }) => {
  //set up state for form data, initialized with default values
  const [formData, setFormData] = useState(initialState);

  //check if form is in edit mode (i.e. a plant was passed in)
  const isEditing = !!plant;

  //when component mounts or the plant prop changes, update form state
  useEffect(() => {
    //populate form with plant data that has been passed || or initial empty values if creating new
    setFormData(plant || initialState);
  }, [plant]);    //dependency array so it re-runs only when plant changes

  //handle input changes, including checkboxes, called every time input/textarea changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;  //get values from the event target - whichever field triggered the event
    setFormData({
      ...formData,    //spread the existing form values
      //update relevant field in formdata, if checkbox use true/false, otherwise use text value
      [name]: type === "checkbox" ? checked : value,
    });
  };

  //handle form submission (create or update)
  const handleSubmit = (e) => {
    e.preventDefault();

    const method = plant ? "PATCH" : "POST";
    const url = plant ? `/plants/${plant.id}` : "/plants";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => onSuccess(data, !!plant)); //alcl parent callback with result and edit flag
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>{isEditing ? "Edit Plant" : "Add New Plant"}</h4>

      {/* input: Common Name (required) */}
      <div className="mb-2">
        <input
          name="common_name"
          placeholder="Common Name"
          className="form-control"
          value={formData.common_name}
          onChange={handleChange}
          required
        />
      </div>

      {/* input: Scientific Name */}
      <div className="mb-2">
        <input
          name="scientific_name"
          placeholder="Scientific Name"
          className="form-control"
          value={formData.scientific_name}
          onChange={handleChange}
        />
      </div>

      {/* input: Family */}
      <div className="mb-2">
        <input
          name="family"
          placeholder="Family"
          className="form-control"
          value={formData.family}
          onChange={handleChange}
        />
      </div>

      {/* textarea: Description */}
      <div className="mb-2">
        <textarea
          name="description"
          placeholder="Description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      {/* textarea: Growing & Harvesting */}
      <div className="mb-2">
        <textarea
          name="growing_harvesting"
          placeholder="Growing & Harvesting"
          className="form-control"
          value={formData.growing_harvesting}
          onChange={handleChange}
        />
      </div>

      {/* input: Image URL */}
      <div className="mb-2">
        <input
          name="photo_url"
          placeholder="Image URL"
          className="form-control"
          value={formData.photo_url}
          onChange={handleChange}
        />
      </div>

      {/* input: Parts Used */}
      <div className="mb-2">
        <input
          name="parts_used"
          placeholder="Parts Used"
          className="form-control"
          value={formData.parts_used}
          onChange={handleChange}
        />
      </div>

      {/* input: Physiological Actions */}
      <div className="mb-2">
        <input
          name="physiological_actions"
          placeholder="Physiological Actions"
          className="form-control"
          value={formData.physiological_actions}
          onChange={handleChange}
        />
      </div>

      {/* input: Energetics */}
      <div className="mb-2">
        <input
          name="energetics"
          placeholder="Energetics"
          className="form-control"
          value={formData.energetics}
          onChange={handleChange}
        />
      </div>

      {/* textarea: Ways to Use */}
      <div className="mb-2">
        <textarea
          name="ways_to_use"
          placeholder="Ways to Use"
          className="form-control"
          value={formData.ways_to_use}
          onChange={handleChange}
        />
      </div>

      {/* textarea: Uses */}
      <div className="mb-2">
        <textarea
          name="uses"
          placeholder="Uses"
          className="form-control"
          value={formData.uses}
          onChange={handleChange}
        />
      </div>

      {/* textarea: Cautions */}
      <div className="mb-2">
        <textarea
          name="cautions"
          placeholder="Cautions"
          className="form-control"
          value={formData.cautions}
          onChange={handleChange}
        />
      </div>

      {/* textarea: History */}
      <div className="mb-2">
        <textarea
          name="history"
          placeholder="History"
          className="form-control"
          value={formData.history}
          onChange={handleChange}
        />
      </div>

      {/* textarea: Magical */}
      <div className="mb-3">
        <textarea
          name="magical"
          placeholder="Magical"
          className="form-control"
          value={formData.magical}
          onChange={handleChange}
        />
      </div>

      {/* checkbox to mark as sample */}
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          name="is_sample"
          checked={formData.is_sample}
          onChange={handleChange}
          id="is_sample"
        />
        <label className="form-check-label" htmlFor="is_sample">
          Mark as Sample
        </label>
      </div>

      {/* submit and cancel buttons */}
      <div className="d-flex gap-2">
        <button type="submit" className="btn custom-btn">
          {isEditing ? "Update" : "Create"}
        </button>
        {onCancel && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default PlantAdminForm;
