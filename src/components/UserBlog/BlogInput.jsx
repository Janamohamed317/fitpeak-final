import React, { useState } from 'react';
import UserBlog from "./UserBlog.module.css";

const BlogInput = ({ onAddPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        if (title.trim() === '' || content.trim() === '') {
            alert('Please enter both title and content.');
            return;
        }
        onAddPost( title, content );
        setTitle('');
        setContent('');
    };

    return (
        <div className={UserBlog.blog-input}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Blog Title"
            />
            <textarea
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog here..."
            ></textarea>
            <button onClick={handleSubmit}>Post</button>
        </div>
    );
};

export default BlogInput;