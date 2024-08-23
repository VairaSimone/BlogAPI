// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/HomePage';
import BlogDetail from './components/BlogDetail';
import AuthorDetail from './components/AuthorDetail';
import BlogForm from './components/BlogForm';
import AuthorForm from './components/AuthorForm';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/authors/:id" element={<AuthorDetail />} />
            <Route path="/create-blog" element={<BlogForm />} />
            <Route path="/create-author" element={<AuthorForm />} />
        </Routes>
    );
}

export default App;
