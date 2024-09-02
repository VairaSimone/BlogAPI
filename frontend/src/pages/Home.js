import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from '../components/Logout';
import { authFetch } from '../services/authFetch';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await authFetch('/blogs');
            if (response.ok) {
                const data = await response.json();
                setBlogs(data.dati);
                setFilteredBlogs(data.dati);
            }
        };

        fetchBlogs();
    }, []);

    useEffect(() => {
        const filterBlogs = () => {
            let updatedBlogs = blogs;

            if (searchTitle) {
                updatedBlogs = updatedBlogs.filter(blog =>
                    blog.title.toLowerCase().includes(searchTitle.toLowerCase())
                );
            }

            if (searchCategory) {
                updatedBlogs = updatedBlogs.filter(blog =>
                    blog.category.toLowerCase().includes(searchCategory.toLowerCase())
                );
            }

            setFilteredBlogs(updatedBlogs);
        };

        filterBlogs();
    }, [searchTitle, searchCategory, blogs]);

    const handleReadMore = (blogId) => {
        navigate(`/blogs/${blogId}`);
    };

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark">
                <a className="navbar-brand" href="/">Blog Platform</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Logout />
                        </li>
                    </ul>
                </div>
            </nav>

            <h2 className="my-4">Blog Posts</h2>

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Search by Title"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Category"
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                />
            </div>

            <div className="row">
                {filteredBlogs.map((blog) => (
                    <div key={blog._id} className="col-md-4">
                        <div className="card mb-4">
                            <img src={blog.cover} className="card-img-top" alt={blog.title} />
                            <div className="card-body">
                                <h5 className="card-title">{blog.title}</h5>
                                <p className="card-text">{blog.content}</p>
                                <button className="btn btn-primary" onClick={() => handleReadMore(blog._id)}>Read More</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
