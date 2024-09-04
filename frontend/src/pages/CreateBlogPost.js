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
    const [cover, setCover] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCreatePost = async (e) => {
        e.preventDefault();

        if (!title || !content || !category || !readTime.value) {
            setError('I campi sono obbligatori.');
            return;
        }

        try {
            const userResponse = await authFetch('/authors/me');
            if (!userResponse.ok) {
                setError('Errore caricamento profilo');
                return;
            }
            const user = await userResponse.json();

            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('category', category);
            formData.append('readTime.value', readTime.value);
            formData.append('readTime.unit', readTime.unit);
            formData.append('author', user._id); 

            if (cover) {
                formData.append('cover', cover);
            }

            const response = await authFetch('/blogs', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                navigate('/home');
            } else {
                const data = await response.json();
                setError(data.message || 'Errore nella creazione di blog post.');
            }
        } catch (err) {
            console.error('Errore creando il blog post:', err);
            setError('Diversi errori durante la creazione del post.');
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
                        placeholder="Titolo"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        className="form-control"
                        placeholder="Contenuto"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Categoria"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                    <div className="row">
                        <div className="col-8">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Tempo lettura"
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
                                <option value="min">Minuti</option>
                                <option value="hours">Ora</option>
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
