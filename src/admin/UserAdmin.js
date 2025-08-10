import { useEffect, useState } from "react";
import UserAdminForm from "./UserAdminForm";
import { Link } from "react-router-dom";

const UserAdmin = () => {
  //state to hold the list of users fetched from the server
  const [users, setUsers] = useState([]);
  //state to keep track of which user is currently being edited (null if creating new)
  const [editingUser, setEditingUser] = useState(null);
  //state to toggle the visibility of the user form
  const [showForm, setShowForm] = useState(false);

  //fetch users from the server on component mount
  useEffect(() => {
    fetch("/users", { credentials: "include" })  //include credentials for authentication
      .then((res) => res.json())  //parse json response
      .then(setUsers)     //store fetched users in state
      .catch((err) => console.error("Error fetching users:", err));
  }, []);    //empty array so it runs only once on mount

  //handle deletion of a user
  function handleDelete(id) {
    //ask user to confirm deletion
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    fetch(`/users/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          //remove deleted user from local state
          setUsers((prev) => prev.filter((u) => u.id !== id));
        } else {
          alert("Failed to delete user.");
        }
      })
      .catch(() => alert("Error deleting user."));
  }

  //handle deactivating a user account - PATCH request with cookies
  function handleDeactivate(id) {
    fetch(`/users/${id}/deactivate`, {
      method: "PATCH",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to deactivate user");
        //update the users state by mapping over the existing list
        // with all existing properties (...u), but set `active` to false
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, active: false } : u))
        // For all other users, return them unchanged
        );
      })
      .catch((err) => alert(err.message));
  }

  //handle reactivating a user account - PATCH request w/ cookies
  function handleReactivate(id) {
    fetch(`/users/${id}/reactivate`, {
      method: "PATCH",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to reactivate user");
        //update the users state by mapping over the existing list
        // with all existing properties (...u), but set `active` to true        
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, active: true } : u))
        // For all other users, return them unchanged
        );
      })
      .catch((err) => alert(err.message));
  }

  //prepare form for editing an existing user - pre-populate w/ user info
  function handleEdit(user) {
    setEditingUser(user);
    setShowForm(true);
  }

  //prepare form for creating a new user - blank - null
  function handleCreate() {
    setEditingUser(null);
    setShowForm(true);
  }

  //handle successful submission of the user form (both create and update)
  function handleFormSuccess(updatedUser, isEdit = false) {
    if (isEdit) {
      //update the existing user in local state
      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
    } else {
      //add the new user to the beginning of the users list
      setUsers((prev) => [updatedUser, ...prev]);
    }
    //hide the form and reset editing user
    setShowForm(false);
    setEditingUser(null);
  }

  return (
    <div className="container py-4">
      {/* back to Admin Dashboard link */}
      <Link to="/admin" className="btn custom-btn mb-5">
        ← Back to Admin Dashboard
      </Link>
      <h2 className="mb-4">User Manager</h2>

      {/* button to open form for creating a new user */}
      <button className="btn custom-btn mb-4" onClick={handleCreate}>
        Create New User
      </button>

      {/* conditionally render UserAdminForm when showForm is true */}
      {showForm && (
        <UserAdminForm
          user={editingUser}
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* list of users displayed as cards */}
      <div className="row">
        {users.map((user) => (
          <div key={user.id} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{user.username}</h5>
                <p className="card-text mb-1">Email: {user.email}</p>
                <p className="card-text mb-2">
                  Role: {user.admin ? "Admin" : "User"} <br />
                  Status: {user.active ? "Active" : "Inactive"}
                </p>

                {/* action buttons - edit and delete */}
                <div className="d-flex gap-2">

                  {/* edit user button */}
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>

                  {/* delete user button */}
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>

                  {/* button to toggle activation status */}
                  {user.active ? (
                    <button
                      className="btn btn-sm btn-outline-teal"
                      onClick={() => handleDeactivate(user.id)}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleReactivate(user.id)}
                    >
                      Reactivate
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAdmin;
