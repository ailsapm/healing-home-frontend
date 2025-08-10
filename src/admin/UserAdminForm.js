import { useState } from "react";

//form for creating or editing a user 
const UserAdminForm = ({ user = null, onSuccess, onCancel }) => {
  //initialise form fields with user data if editing, or default values if creating new
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const [password, setPassword] = useState(""); // optional for editing
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const isEditing = !!user; // determine if form is in edit mode

  //handle form submission for both creating and updating users
  function handleSubmit(e) {
    e.preventDefault();

    //create payload object with required fields to send to backend
    const payload = {
      username,
      email,
      admin,
    };

    //include password fields in payload object only if password was entered
    if (password) {
      payload.password = password;
      payload.password_confirmation = passwordConfirmation;
    }

    //determine method and endpoint based on edit/create mode
    const method = isEditing ? "PATCH" : "POST";
    const url = isEditing ? `/users/${user.id}` : "/users";

    //send data to the server w/ cookies
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ user: payload }), // wrap payload in user key
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save user");
        //parse the response body as json
        return res.json();
      })
      .then((data) => {
        //notify parent of success, passing updated/created user
        onSuccess?.(data, isEditing);
      })
      .catch((err) => alert(err.message)); //handle any errors
  }

  return (
    //form to handle user editing or creation
    <form onSubmit={handleSubmit} className="mb-4">
      {/* username field */}
      <div className="mb-3">
        <label className="form-label">Username</label>
        {/* onChange updates the state when the user types */}
        <input
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      {/* email field */}
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* admin checkbox */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="adminCheck"
          checked={admin}
          onChange={(e) => setAdmin(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="adminCheck">
          Admin User
        </label>
      </div>

      {/* password field (optional if editing) */}
      <div className="mb-3">
        <label className="form-label">
          Password {isEditing && "(optional)"}
        </label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* password confirmation field */}
      <div className="mb-3">
        <label className="form-label">Password Confirmation</label>
        <input
          type="password"
          className="form-control"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>

      {/* action buttons edit and delete */}
      <div className="d-flex gap-2">
        <button type="submit" className="btn custom-btn">
          {isEditing ? "Update" : "Create"} User
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserAdminForm;

