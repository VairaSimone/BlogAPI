import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import { authFetch } from '../services/authFetch';

const AuthorDetails = () => {
    const { authorId } = useParams();
    const [author, setAuthor] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const { isAuthenticated, user } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchAuthorDetails = async () => {
            try {
                const authorResponse = await authFetch(`/authors/${authorId}`);
                if (!authorResponse.ok) throw new Error('Errori nella fetch sugli autori.');
                const authorData = await authorResponse.json();
                setAuthor(authorData);

                const blogsResponse = await authFetch('/blogs');
                if (!blogsResponse.ok) throw new Error('Errori nella fetch dei post.');
                const blogsData = await blogsResponse.json();
                const authorBlogs = blogsData.dati.filter(blog => blog.author === authorId);
                setBlogs(authorBlogs);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchAuthorDetails();
    }, [authorId]);

    const handleDeleteBlog = async (blogId) => {
        if (!window.confirm('Sei sicuro che vuoi eliminare questo blog post?')) return;

        try {
            const response = await authFetch(`/blogs/${blogId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setBlogs(blogs.filter(blog => blog._id !== blogId));
                alert('Blog post rimosso');
            } else {
                throw new Error('Errore nella rimozione del post.');
            }
        } catch (err) {
            alert(err.message);
        }
    };

    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!author) return <div>Caricamento...</div>;

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
                                {isAuthenticated && user && user._id === blog.author && (
                                    <>
                                        <button
                                            className="btn btn-warning mr-2"
                                            onClick={() => navigate(`/edit-blog/${blog._id}`)}
                                        >
                                            Modifica
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteBlog(blog._id)}
                                        >
                                            Elimina
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
