import { useEffect, useState } from "react";
import CourseAdminForm from "./CourseAdminForm";
import { Link } from "react-router-dom";
import "../styles/style.css";

const CourseAdmin = () => {
  //state to hold list of all courses fetched from server
  const [courses, setCourses] = useState([]);

  //state to hold the course currently being edited (null if none)
  const [editingCourse, setEditingCourse] = useState(null);

  //state to control whether the course form is visible or not
  const [showForm, setShowForm] = useState(false);

  //fetch all courses once when component mounts
  useEffect(() => {
    fetch("/courses", { credentials: "include" })
      .then((res) => res.json()) //parse JSON response
      .then(setCourses) //save fetched courses into state
      .catch((err) => console.error("Error fetching courses:", err)); //log fetch errors
  }, []); //empty dependency array to make sure it runs only once on mount

  //handle deleting a course by id
  function handleDelete(id) {
    //confirm user action before deleting
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    //send DELETE request to server with credentials included
    fetch(`/courses/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          //if deletion successful, remove course from state to update UI
          setCourses(courses.filter((course) => course.id !== id));
        } else {
          //alert user if deletion failed on server
          alert("Failed to delete course.");
        }
      })
      .catch(() => alert("Error deleting course.")); //alert user if there are network or other errors
  }

  //handle clicking the Edit button for a course
  function handleEdit(course) {
    setEditingCourse(course); //set the selected course in state for editing
    setShowForm(true); //show the form for editing
  }

  //handle clicking the Create New Course button
  function handleCreate() {
    setEditingCourse(null); //clear any course being edited (new course mode)
    setShowForm(true); //show the form for creating a new course
  }

  //callback to handle successful create or update from the form
  // updatedCourse -  course object returned from backend after save
  // isEdit -  boolean, true if editing an existing course, false if creating new
  function handleFormSuccess(updatedCourse, isEdit = false) {
    if (isEdit) {
      //if editing, update the course in state by replacing the old one
      setCourses((prev) =>
        prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c))
      );
    } else {
      //if creating, add the new course to the beginning of the courses list
      setCourses((prev) => [updatedCourse, ...prev]);
    }

    //hide the form and clear editing state after success
    setShowForm(false);
    setEditingCourse(null);
  }

  return (
    <div className="container py-4">
      {/* link to return back to Admin Dashboard */}
      <Link to="/admin" className="btn custom-btn mb-5">
        ← Back to Admin Dashboard
      </Link>

      {/* page title */}
      <h2 className="mb-4">Course Manager</h2>

      {/* button to create a new course */}
      <button className="btn custom-btn mb-4" onClick={handleCreate}>
        Create New Course
      </button>

      {/* conditionally render the form for creating/editing */}
      {showForm && (
        <CourseAdminForm
          course={editingCourse} // Pass course to edit or null for new
          onSuccess={handleFormSuccess} // Callback when form submits successfully
          onCancel={() => setShowForm(false)} // Callback to hide form without saving
        />
      )}

      {/* list all courses in a responsive grid */}
      <div className="row">
        {courses.map((course) => (
          <div key={course.id} className="col-md-6 mb-4">
            <div className="card h-100">
              {/* show course image if available */}
              {course.image_url && (
                <img
                  src={course.image_url}
                  alt={course.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}

              <div className="card-body">
                {/* course title */}
                <h5 className="card-title">{course.title}</h5>

                {/* course description */}
                <p className="card-text">{course.description}</p>

                {/* edit and delete buttons */}
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleEdit(course)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(course.id)}
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

export default CourseAdmin;
