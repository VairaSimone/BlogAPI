import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AuthorList({ authors = [] }) {  // Inizializza authors come array vuoto

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAuthors, setFilteredAuthors] = useState(authors);

    useEffect(() => {
        setFilteredAuthors(authors); // Aggiorna i filtri quando authors cambia
    }, [authors]);

    const handleSearch = () => {
        const filtered = authors.filter(author => 
            author.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            author.cognome.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAuthors(filtered);
    };

    return (
        <div>
            <Form.Control 
                type="text" 
                placeholder="Search by name" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                onKeyUp={handleSearch} 
            />
            {filteredAuthors.length > 0 ? (
                filteredAuthors.map(author => (
                    <Card key={author._id} style={{ margin: '10px' }}>
                        <Card.Img variant="top" src={author.avatar} alt={`${author.nome} ${author.cognome}`} />
                        <Card.Body>
                            <Card.Title>{author.nome} {author.cognome}</Card.Title>
                            <Card.Text>{author.email}</Card.Text>
                            <Link to={`/authors/${author._id}`}>
                                <Button variant="primary">Leggi di più</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p>Nessun autore trovato</p>
            )}
        </div>
    );
}

export default AuthorList;
