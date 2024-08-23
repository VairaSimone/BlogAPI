// src/components/Homepage.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BlogList from '../components/BlogList';
import AuthorList from '../components/AuthorList';

function Homepage() {
    const [blogs, setBlogs] = useState([]);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        // Fetch all blogs
        fetch('http://localhost:5000/blogs')
            .then(res => res.json())
            .then(data => setBlogs(data.dati));

        // Fetch all authors
        fetch('http://localhost:5000/authors')
            .then(res => res.json())
            .then(data => setAuthors(data.dati));
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <BlogList blogs={blogs} />
                </Col>
                <Col>
                    <AuthorList authors={authors} />
                </Col>
            </Row>
        </Container>
    );
}

export default Homepage;
