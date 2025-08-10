import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";  //import styles


const UserProfile = () => {
  //get user data and functions from context
  const { user, setUser, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();

  //set initial form fields with user data or empty strings
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  //status message to show success or error notifications
  const [status, setStatus] = useState({ type: "", message: "" });

  //when the update form is submitted
  const handleUpdate = (e) => {
    e.preventDefault();

    //send PATCH request to update username and email
    fetch("/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", //send cookies for authentication
      body: JSON.stringify({
        user: { username, email },
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update profile");
        return res.json();
      })
      .then((data) => {
        //update user context with new data and show success message
        setUser(data);
        setStatus({ type: "success", message: "Profile updated!" });
      })
      .catch(() =>
        //show error message if update failed
        setStatus({ type: "danger", message: "Failed to update profile." })
      );
  };

  //handle account deactivation when user clicks button
  const handleDeactivate = () => {
    //ask for confirmation before soft-deleting (deactivating) account
    if (!window.confirm("Are you sure you want to deactivate your account?")) return;

    //send DELETE request to deactivate account
    fetch("/deactivate", {
      method: "DELETE",
      credentials: "include",  //send cookies
    })
      .then((res) => {
        if (!res.ok) throw new Error("Deactivation failed");
        //clear user data and logout, then redirect home
        setUser(null);
        handleLogout();
        navigate("/");
      })
      .catch(() =>
        //show error message if deactivation failed
        setStatus({ type: "danger", message: "Failed to deactivate account." })
      );
  };

  //show loading message while user data is not yet loaded
  if (!user) return <div>Loading user...</div>;

  return (
    //container with max-width set by CSS class
    <div className="container user-profile-container">
      <h2>User Profile</h2>
      <br />
      
      {/* show status message if there is one */}
      {status.message && (
        <div className={`alert alert-${status.type}`} role="alert">
          {status.message}
        </div>
      )}

      {/* form to update username and email */}
      <form onSubmit={handleUpdate}>
        {/* username input */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            className="form-control custom-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength="3"
            maxLength="20"
            required
          />
        </div>

        {/* email input */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-control custom-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        {/* submit button for updating profile */}
        <button type="submit" className="btn custom-btn me-3">
          Update Profile
        </button>

        {/* button to deactivate account */}
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={handleDeactivate}
        >
          Deactivate Account
        </button>
      </form>

      <br /><br />
      {/* extra space to push footer lower, will remove when page is fully built */}
    </div>
  );
};

export default UserProfile;

