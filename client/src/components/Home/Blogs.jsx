import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link, Switch} from 'react-router-dom'

const Blogs = ({url}) => {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${url ? url : "http://localhost:5000"}/api/v1/blogs`
      });
      console.log(res.data);
      if (res.data.status == "200") {
        setBlogs(res.data.blogs);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getBlogs();
  }, [])

  return (
    <div className="blogs-container">
      <div className="blog-nav">
        <h3>Posts</h3>
        <nav>
          <div className="blog-nav-link">feed</div>
          <div className="blog-nav-link">latest</div>
        </nav>
      </div>
      <div className="blog-list">
        {blogs && blogs.map((blog, index) => {
            return (
              <div className="card" key={index}>
                <div className="blog-card-author">
                  <img src={blog.authorPhotoURL} alt={blog.authorName} />
                  <div>
                    <h5>{blog.authorName}</h5>
                    <p className="muted-text">{new Date(blog.createdAt).toDateString()}</p>
                  </div>
                </div>
                <div className="blog-card-body">
                  <Link to={`/blog/${blog._id}`}>
                    <h1>{blog.title}</h1>
                  </Link>
                  <div className="tags-container">
                    {blog.tags && blog.tags.map((tag) => (
                      <span className="tag muted-text">#{tag}</span>
                    ))}
                  </div>
                  <div className="blog-card-like-comment">
                    <span>{blog.likes && blog.likes.length} likes</span>
                    <span>{blog.comments && blog.comments.length} comments</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Blogs;
