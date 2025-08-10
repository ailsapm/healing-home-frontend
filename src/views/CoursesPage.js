import { useEffect, useState } from 'react';   
import { Link } from 'react-router-dom';  //to navigate between pages w/o full refresh
import '../styles/style.css';

const CoursesPage = () => {
  //state to hold the list of courses fetched from the backend, initialise as empty array
  const [courses, setCourses] = useState([]);

  //fetch course data when the component mounts
  useEffect(() => {
    fetch('/courses')
      .then(res => res.json())
      .then(setCourses);
  }, []);

  //separate courses into free and paid categories
  const freeCourses = courses.filter(c => !c.requires_purchase);
  const paidCourses = courses.filter(c => c.requires_purchase);

  //render course card
  const renderCourseCard = (course) => (
    <div className="col-md-4 mb-4" key={course.id}>
      <div className="card h-100 shadow-sm">
        {course.image_url && (
          <img
            src={course.image_url}
            className="card-img-top course-card-img"
            alt={course.title}
          />
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{course.title}</h5>
          <p className="card-text">{course.description}</p>
          <p>
            <span className="badge custom-badge">
              {course.requires_purchase
                ? `€${parseFloat(course.price).toFixed(2)}`
                : 'Free'}
            </span>
          </p>
          <Link to={`/courses/${course.id}`} className="btn custom-btn mt-auto">
            View Course
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container py-4">
      <h2 className="mb-4">Free Courses</h2>
      <div className="row">{freeCourses.map(renderCourseCard)}</div>

      <h2 className="mb-4 mt-5">Premium Courses (€20)</h2>
      <div className="row">{paidCourses.map(renderCourseCard)}</div>
    </div>
  );
};

export default CoursesPage;

