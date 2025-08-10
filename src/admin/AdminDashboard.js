import { Link } from 'react-router-dom';
import "../styles/style.css"; //import styles

const AdminDashboard = () => {
  return (
    <div className="container py-5">
      {/* page Title */}
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* admin Section Cards */}
      <div className="row g-4">

        {/* blog manager */}
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Manage Blog Posts</h5>
              <p className="card-text">Create, edit, or delete journal entries.</p>
              <Link to="/admin/blog-posts" className="btn custom-btn mt-auto">
                Go to Blog Manager
              </Link>
            </div>
          </div>
        </div>

        {/* plant manager */}
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Manage Healing Plants</h5>
              <p className="card-text">Update the Materia Medica database.</p>
              <Link to="/admin/plants" className="btn custom-btn mt-auto">
                Go to Plant Manager
              </Link>
            </div>
          </div>
        </div>

        {/* recipe manager */}
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Manage Recipes</h5>
              <p className="card-text">Add, edit or remove recipes from the apothecary.</p>
              <Link to="/admin/recipes" className="btn custom-btn mt-auto">
                Go to Recipe Manager
              </Link>
            </div>
          </div>
        </div>

        {/* course manager */}
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Manage Courses</h5>
              <p className="card-text">Edit course content and access levels.</p>
              <Link to="/admin/courses" className="btn custom-btn mt-auto">
                Go to Course Manager
              </Link>
            </div>
          </div>
        </div>

        {/* user management */}
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">User Management</h5>
              <p className="card-text">
                View users, upgrade access, and deactivate/reactivate accounts.
              </p>
              <Link to="/admin/users" className="btn custom-btn mt-auto">
                Manage Users
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;

