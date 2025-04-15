import React from 'react';
import Post from './Post';
import UserBlog from "./UserBlog.module.css";

const BlogPosts = ({ posts }) => {
    return (
        <div className={UserBlog.blog-posts}>
            <h3>Latest Blogs</h3>
            {posts.map((post, index) => (
                <Post key={index} title={post.title} content={post.content} />
            ))}
        </div>
    );
};

export default BlogPosts;