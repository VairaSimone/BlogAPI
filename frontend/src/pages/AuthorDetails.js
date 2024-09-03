// pages/AuthorDetails.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import { authFetch } from '../services/authFetch';

const AuthorDetails = () => {
    const { authorId } = useParams();
    const [author, setAuthor] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const { isAuthenticated, user } = useContext(AuthContext);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAuthorDetails = async () => {
            const authorResponse = await authFetch(`/authors/${authorId}`);
            if (authorResponse.ok) {
                const authorData = await authorResponse.json();
                setAuthor(authorData);
            } else {
                setError('Failed to fetch author details.');
            }

            const blogsResponse = await authFetch('/blogs');
            if (blogsResponse.ok) {
                const blogsData = await blogsResponse.json();
                const authorBlogs = blogsData.dati.filter(blog => blog.author === authorId);
                setBlogs(authorBlogs);
            } else {
                setError('Failed to fetch blog posts.');
            }
        };

        fetchAuthorDetails();
    }, [authorId]);

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

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!author) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h2>{author.nome} {author.cognome}</h2>
            <p><strong>Email:</strong> {author.email}</p>

            <h3 className="mt-4">Blog Posts</h3>
            <div className="row">
                {blogs.map(blog => (
                    <div key={blog._id} className="col-md-4">
                        <div className="card mb-4">
                            <img src={blog.cover} className="card-img-top" alt={blog.title} />
                            <div className="card-body">
                                <h5 className="card-title">{blog.title}</h5>
                                <p className="card-text">{blog.content}</p>
                                {/* Only show Edit and Delete buttons if the logged-in user is the author */}
                                {isAuthenticated && user && user._id === blog.author && (
                                    <>
                                        <button
                                            className="btn btn-warning mr-2"
                                            onClick={() => navigate(`/edit-blog/${blog._id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteBlog(blog._id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuthorDetails;
