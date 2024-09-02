// pages/CreateBlogPost.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import { authFetch } from '../services/authFetch';

const CreateBlogPost = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [readTime, setReadTime] = useState({ value: '', unit: 'min' });
    const [cover, setCover] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCreatePost = async (e) => {
        e.preventDefault();

        if (!title || !content || !category || !readTime.value) {
            setError('All fields except cover are required.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        formData.append('readTime.value', readTime.value);
        formData.append('readTime.unit', readTime.unit);

        if (cover) {
            formData.append('cover', cover);
        }

        try {
            const response = await authFetch('/blogs', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                navigate('/home');
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to create the blog post.');
            }
        } catch (err) {
            console.error('Error creating blog post:', err);
            setError('An error occurred while creating the blog post.');
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Create New Blog Post</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleCreatePost}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        className="form-control"
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                    <div className="row">
                        <div className="col-8">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Read Time"
                                value={readTime.value}
                                onChange={(e) => setReadTime({ ...readTime, value: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-4">
                            <select
                                className="form-control"
                                value={readTime.unit}
                                onChange={(e) => setReadTime({ ...readTime, unit: e.target.value })}
                            >
                                <option value="min">Minutes</option>
                                <option value="hours">Hours</option>
                            </select>
                        </div>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        value={cover}
                        onChange={(e) => setCover(e.target.value)}

                    />
                    <button type="submit" className="btn btn-primary btn-block mt-4">Create Post</button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlogPost;
