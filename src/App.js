import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './contexts/UserContext'; // import context

import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';

import LandingPage from './views/LandingPage';
import HomePage from './views/HomePage';
import AboutPage from './views/About';
import HealingMoments from './views/HealingMoments';
import PlantDirectory from './views/PlantDirectory';
import PlantDetail from './views/PlantDetail';
import CoursesPage from './views/CoursesPage';
import CoursePage from './views/CoursePage';
import BlogPostsList from './views/BlogPostsList';
import BlogPostDetail from './views/BlogPostDetail';
import UserProfile from './views/UserProfile';
import RecipeList from './views/RecipeList';
import RecipeDetail from './views/RecipeDetail';

import AdminDashboard from "./admin/AdminDashboard";
import BlogAdmin from './admin/BlogAdmin';
import PlantAdmin from './admin/PlantAdmin';
import RecipeAdmin from './admin/RecipeAdmin';
import CourseAdmin from './admin/CourseAdmin';
import UserAdmin from './admin/UserAdmin';

function App() {
  const { user, handleLogout, loading } = useContext(UserContext);

  if (loading) return <p>Loading...</p>; // optional loading state

  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      {/* header component */}
      <Header user={user} onLogout={handleLogout} />

      {/* navbar component */}
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/home" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/home" />}
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage user={user} />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
              <AboutPage />
          }
        />
        <Route
          path="/healing-moments"
          element={
            <PrivateRoute>
              <HealingMoments />
            </PrivateRoute>
            }
          /> 
         <Route
          path="/plants"
          element={
            <PrivateRoute>
              <PlantDirectory />
            </PrivateRoute>
            }
          />        
        <Route
          path="/plants/:id"
          element={
            <PrivateRoute>
              <PlantDetail />
            </PrivateRoute> 
            }
          />
        <Route
          path="/courses"
          element={
            <PrivateRoute>
              <CoursesPage />
            </PrivateRoute>
            }
          />
        <Route
          path="/courses/:id"
          element={
            <PrivateRoute>
              <CoursePage />
            </PrivateRoute>
              }
          />

        <Route 
        path="/blog" 
        element={
          <PrivateRoute>
            <BlogPostsList />
          </PrivateRoute>
              } 
          />

        <Route 
        path="/blog/:id" 
        element={
          <PrivateRoute>
            <BlogPostDetail />
          </PrivateRoute>
              } 
          />

        <Route 
        path="/profile" 
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
              } 
          />

        <Route 
        path="/recipes" 
        element={
          <PrivateRoute>
            <RecipeList />
          </PrivateRoute>
              } 
          />

        <Route 
        path="/recipes/:id" 
        element={
          <PrivateRoute>
            <RecipeDetail /> 
          </PrivateRoute> 
              }   
          />

        {/*admin routes */}

        <Route 
        path="/admin" 
        element={
          <PrivateRoute>
            <AdminDashboard /> 
          </PrivateRoute> 
              }   
          />        

        <Route 
        path="/admin/blog-posts" 
        element={
          <PrivateRoute>
            <BlogAdmin /> 
          </PrivateRoute> 
              }   
          />

        <Route 
        path="/admin/plants" 
        element={
          <PrivateRoute>
            <PlantAdmin /> 
          </PrivateRoute> 
              }   
          />

        <Route 
        path="/admin/recipes" 
        element={
          <PrivateRoute>
            <RecipeAdmin /> 
          </PrivateRoute> 
              }   
          />

        <Route 
        path="/admin/courses" 
        element={
          <PrivateRoute>
            <CourseAdmin /> 
          </PrivateRoute> 
              }   
          />

        <Route 
        path="/admin/users" 
        element={
          <PrivateRoute>
            <UserAdmin /> 
          </PrivateRoute> 
              }   
          />

      </Routes>

      {/* footer component */}
      <Footer />
    </Router>
  );
}

export default App;

