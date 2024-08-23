// src/components/BlogList.js
import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function BlogList({ blogs }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBlogs, setFilteredBlogs] = useState(blogs);

    useEffect(() => {
        // Applicare il filtro ogni volta che searchTerm cambia
        const filtered = blogs.filter(blog => 
            blog.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBlogs(filtered);
    }, [searchTerm, blogs]); // Dipendenze: quando searchTerm o blogs cambiano

    return (
        <div>
            <Form.Control 
                type="text" 
                placeholder="Search by title" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            {filteredBlogs.map(blog => (
                <Card key={blog._id} style={{ margin: '10px' }}>
                    <Card.Img variant="top" src={blog.cover} />
                    <Card.Body>
                        <Card.Title>{blog.title}</Card.Title>
                        <Card.Text>{blog.content.slice(0, 100)}...</Card.Text>
                        <Link to={`/blogs/${blog._id}`}>
                            <Button variant="primary">Leggi di più</Button>
                        </Link>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default BlogList;
