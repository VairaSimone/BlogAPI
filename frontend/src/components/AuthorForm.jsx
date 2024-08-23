// src/components/AuthorForm.js
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function AuthorForm() {
    const [formData, setFormData] = useState({
        nome: '',
        cognome: '',
        email: '',
        avatar: '',
        dataNascita: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/authors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formCognome">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control
                        type="text"
                        name="cognome"
                        value={formData.cognome}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formAvatar">
                    <Form.Label>Avatar URL</Form.Label>
                    <Form.Control
                        type="text"
                        name="avatar"
                        value={formData.avatar}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formDataNascita">
                    <Form.Label>Data di Nascita</Form.Label>
                    <Form.Control
                        type="date"
                        name="dataNascita"
                        value={formData.dataNascita}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default AuthorForm;
