// pages/Profile.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { authFetch } from '../services/authFetch';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const { logout } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUserData = async () => {
            const response = await authFetch('/authors/me');  // We will implement this route next
            if (response.ok) {
                const data = await response.json();
                setUser(data);

                // Fetch the user's blogs after successfully getting the user data
                const fetchUserBlogs = async () => {
                    const blogsResponse = await authFetch('/blogs');
                    if (blogsResponse.ok) {
                        const blogsData = await blogsResponse.json();
                        setBlogs(blogsData.dati.filter(blog => blog.author === data._id));
                    } else {
                        setError('Failed to fetch blogs.');
                    }
                };

                fetchUserBlogs();
            } else {
                setError('Failed to fetch user data.');
            }
        };

        fetchUserData();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const response = await authFetch(`/authors/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            alert('Profile updated successfully');
        } else {
            alert('Failed to update profile.');
        }
    };

    const handleDeleteBlog = async (blogId) => {
        if (!window.confirm('Are you sure you want to delete this blog post?')) return;

        const response = await authFetch(`/blogs/${blogId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setBlogs(blogs.filter(blog => blog._id !== blogId));
            alert('Blog post deleted successfully.');
        } else {
            alert('Failed to delete blog post.');
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="container">
            <h2>My Profile</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="First Name"
                    value={user.nome}
                    onChange={(e) => setUser({ ...user, nome: e.target.value })}
                    required
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Last Name"
                    value={user.cognome}
                    onChange={(e) => setUser({ ...user, cognome: e.target.value })}
                    required
                />
                <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    required
                />
                <button type="submit" className="btn btn-primary">Update Profile</button>
            </form>

            <h3 className="mt-4">My Blog Posts</h3>
            <div className="row">
                {blogs.map(blog => (
                    <div key={blog._id} className="col-md-4">
                        <div className="card mb-4">
                            <img src={blog.cover} className="card-img-top" alt={blog.title} />
                            <div className="card-body">
                                <h5 className="card-title">{blog.title}</h5>
                                <p className="card-text">{blog.content}</p>
                                <button className="btn btn-warning mr-2" onClick={() => navigate(`/edit-blog/${blog._id}`)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
