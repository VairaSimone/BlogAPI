// pages/BlogDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { authFetch } from '../services/authFetch';

const BlogDetails = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState(null);
    const [author, setAuthor] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [user, setUser] = useState(null); // Store the logged-in user's info

    useEffect(() => {
        const fetchBlog = async () => {
            const response = await authFetch(`/blogs/${blogId}`);
            if (response.ok) {
                const data = await response.json();
                setBlog(data);

                // Fetch author details
                const authorResponse = await authFetch(`/authors/${data.author}`);
                if (authorResponse.ok) {
                    const authorData = await authorResponse.json();
                    setAuthor(authorData);
                }
            }
        };

        const fetchComments = async () => {
            const response = await authFetch(`/blogs/${blogId}/comments`);
            if (response.ok) {
                const data = await response.json();
                setComments(Array.isArray(data) ? data : []);
            }
        };

        const fetchUserProfile = async () => {
            const response = await authFetch('/authors/me');
            if (response.ok) {
                const userData = await response.json();
                setUser(userData); // Set the logged-in user's data
            }
        };

        fetchBlog();
        fetchComments();
        fetchUserProfile();
    }, [blogId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('You need to be logged in to comment.');
            return;
        }

        const response = await authFetch(`/blogs/${blogId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: newComment,
                author: user._id, // Include the author ID when submitting the comment
            }),
        });

        if (response.ok) {
            const data = await response.json();
            setComments([...comments, data]);
            setNewComment('');
        } else {
            const errorData = await response.json();
            console.error('Failed to post comment:', errorData.message);
            alert('Failed to post comment.');
        }
    };

    if (!blog) return <div>Loading...</div>;

    return (
        <div className="container">
            <div className="card my-4">
                <img src={blog.cover} className="card-img-top" alt={blog.title} />
                <div className="card-body">
                    <h3 className="card-title">{blog.title}</h3>
                    <p className="card-text">{blog.content}</p>
                    <p><strong>Category:</strong> {blog.category}</p>
                    <p><strong>Read Time:</strong> {blog.readTime?.value} {blog.readTime?.unit}</p>
                </div>
                {author && (
                    <div className="card-footer blog-author">
                        <p><strong>Author:</strong> {author.nome} {author.cognome}</p>
                        <p><strong>Email:</strong> {author.email}</p>
                    </div>
                )}
            </div>

            <div className="comments my-4">
                <h4>Comments</h4>
                {comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    <ul className="list-group">
                        {comments.map((comment) => (
                            <li key={comment._id} className="list-group-item">
                                {comment.content}
                            </li>
                        ))}
                    </ul>
                )}
                <form className="my-4" onSubmit={handleCommentSubmit}>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            placeholder="Add a comment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default BlogDetails;
