import React from 'react';
import UserBlog from "./UserBlog.module.css";

const Post = ({ title, content }) => {
    return (
        <div className={UserBlog.post}>
            <div className={UserBlog.post-title}>{title}</div>
            <div className={UserBlog.post-content}>{content}</div>
        </div>
    );
};

export default Post;