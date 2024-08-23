// src/components/AuthorDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function AuthorDetail() {
    const { id } = useParams();
    const [author, setAuthor] = useState(null);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/authors/${id}`)
            .then(res => res.json())
            .then(data => setAuthor(data));

        fetch(`http://localhost:5000/authors/${id}/blogPosts`)
            .then(res => res.json())
            .then(data => setBlogs(data));
    }, [id]);

    return (
        <Container>
            {author && (
                <>
                    <h1>Nome: {author.nome} {author.cognome}</h1>
                    <p>Email: {author.email}</p>
                    <h3>Blog Posts:</h3>
                    {blogs.map(blog => (
                        <div key={blog._id}>
                            <h4>Titolo: {blog.title}</h4>
                            <p>Contenuti: {blog.content.slice(0, 100)}...</p>
                        </div>
                    ))}
                </>
            )}
        </Container>
    );
}

export default AuthorDetail;
