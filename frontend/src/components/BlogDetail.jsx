// src/components/BlogDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/blogs/${id}`)
            .then(res => res.json())
            .then(data => {
                setBlog(data);
                if (data.author) {
                    fetch(`http://localhost:5000/authors/${data.author}`)
                        .then(res => res.json())
                        .then(authorData => setAuthor(authorData));
                }
            });
    }, [id]);

    return (
        <Container>
            {blog && (
                <>
                    <h1>{blog.title}</h1>
                    <p>{blog.content}</p>
                    {author && (
                        <>
                            <h3>Autore: {author.nome} {author.cognome}</h3>
                            <p>Email: {author.email}</p>
                        </>
                    )}
                </>
            )}
        </Container>
    );
}

export default BlogDetail;
