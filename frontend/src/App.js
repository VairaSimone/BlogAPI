import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './components/AuthContext';
import Navbar from './components/NavBar.js';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import BlogDetails from './pages/BlogDetails';
import CreateBlogPost from './pages/CreateBlogPost';
import Profile from './pages/Profile';
import EditBlogPost from './pages/EditBlogPost';
import AuthorsList from './pages/AuthorList.js';
import AuthorDetails from './pages/AuthorDetails.js';
import GoogleCallbackPage from './pages/GoogleCallbackPage.js';

function App() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Router>
            {isAuthenticated && <Navbar />}
            <div className="content">
                <Routes>
                    <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />
                    <Route path="/login-google-callback" element={<GoogleCallbackPage />} />
                    <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/home" />} />
                    <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                    <Route path="/blogs/:blogId" element={isAuthenticated ? <BlogDetails /> : <Navigate to="/login" />} />
                    <Route path="/create-post" element={isAuthenticated ? <CreateBlogPost /> : <Navigate to="/login" />} />
                    <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
                    <Route path="/edit-blog/:blogId" element={isAuthenticated ? <EditBlogPost /> : <Navigate to="/login" />} />
                    <Route path="/authors" element={isAuthenticated ? <AuthorsList /> : <Navigate to="/login" />} />
                    <Route path="/authors/:authorId" element={isAuthenticated ? <AuthorDetails /> : <Navigate to="/login" />} />
                    <Route path="/" element={<Navigate to="/home" />} />
                </Routes>
            </div>
            {isAuthenticated && <Footer />}
        </Router>
    );
}

export default function WrappedApp() {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
}
