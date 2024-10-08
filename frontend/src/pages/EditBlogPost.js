import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authFetch } from '../services/authFetch';

const EditBlogPost = () => {
    const { blogId } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            const response = await authFetch(`/blogs/${blogId}`);
            if (response.ok) {
                const data = await response.json();
                setBlog(data);
            } else {
                setError('Erori nella chiamata blog.');
            }
        };

        fetchBlog();
    }, [blogId]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const response = await authFetch(`/blogs/${blog._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blog),
        });

        if (response.ok) {
            alert('Blog post aggiornato!');
            navigate('/profile');
        } else {
            alert('Erore nel caricamento blog post.');
        }
    };

    if (!blog) return <div>Loading...</div>;

    return (
        <div className="container">
            <div className="form-container">
                <h2>Edit Blog Post</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Titolo"
                        value={blog.title}
                        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                        required
                    />
                    <textarea
                        className="form-control mb-2"
                        placeholder="Contenuto"
                        value={blog.content}
                        onChange={(e) => setBlog({ ...blog, content: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Categoria"
                        value={blog.category}
                        onChange={(e) => setBlog({ ...blog, category: e.target.value })}
                        required
                    />
                    <button type="submit" className="btn btn-primary btn-block">Update Post</button>
                </form>
            </div>
        </div>
    );
};

export default EditBlogPost;
