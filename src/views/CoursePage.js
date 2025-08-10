import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/style.css'; //import styles

//just hardcoded this because I needed to get "unstuck" and time was ticking
const courses = {
  1: {
    title: "Eat Your Weeds",
    price: 0,
    lessons: [
      { title: "Nettles", url: "https://vimeo.com/1100918662" },
      { title: "Plantain", url: "https://vimeo.com/1100918673" },
      { title: "Self-heal", url: "https://vimeo.com/1100919910" },
    ]
  },
  2: {
    title: "Flower Power",
    price: 0,
    lessons: [
      { title: "Goldenrod", url: "https://vimeo.com/1100918630" },
      { title: "Musk Mallow", url: "https://vimeo.com/1100918653" },
      { title: "Rose", url: "https://vimeo.com/1100918692" },
    ]
  },
  3: {
    title: "Mediterranean Herbs",
    price: 20,
    lessons: [
      { title: "Rosemary", url: "https://vimeo.com/1100919889" },
      { title: "Sage", url: "https://vimeo.com/1100919901" },
      { title: "Wild Marjoram", url: "https://vimeo.com/1100919919" },
    ]
  },
  4: {
    title: "Amazing Leaves",
    price: 20,
    lessons: [
      { title: "Raspberry Leaf", url: "https://vimeo.com/1100918681" },
      { title: "Blackberry Leaf", url: "https://vimeo.com/1100918619" },
      { title: "Mulberry Leaf", url: "https://vimeo.com/1100918642" },
    ]
  }
};

//helper to extract Vimeo video ID
const getVimeoId = (url) => {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
};

const CoursePage = () => {
  const { id } = useParams(); //get course ID from URL
  const course = courses[id]; //look up course info

  //track purchase state
  const [hasPurchased, setHasPurchased] = useState(course?.price === 0);

  //show fallback if invalid course
  if (!course) return <p>Course not found.</p>;

  //simulate a fake purchase
  const handleFakePurchase = () => {
    alert(`Purchased course "${course.title}"!`);
    setHasPurchased(true);
  };

  return (
    <div className="container my-4">
      {/* Back to course list link */}
      <Link to="/courses" className="btn custom-btn mb-3">
        ← Back to Course List
      </Link>

      <h2 className="text-center fw-bold">{course.title}</h2>

      {/*show purchase prompt if course is paid */}
      {!hasPurchased && course.price > 0 ? (
        <div className="alert alert-warning">
          <p>This course requires purchase to access.</p>
          <button onClick={handleFakePurchase} className="btn custom-btn">
            Fake Purchase (€{course.price})
          </button>
        </div>
      ) : (
        <div>
          {/* render all course lessons */}
          {course.lessons.map((lesson, index) => {
            const vimeoId = getVimeoId(lesson.url);
            return (
              <div key={index} className="mb-5 pb-1">
                <h5 className="text-center fw-semibold">
                  Lesson {index + 1}: {lesson.title}
                </h5>

                {/* embed Vimeo video if URL is valid */}
                {vimeoId ? (
                  <div className="video-responsive">
                    <iframe
                      src={`https://player.vimeo.com/video/${vimeoId}`}
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={lesson.title}
                    />
                  </div>
                ) : (
                  <p>Invalid video URL</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CoursePage;

