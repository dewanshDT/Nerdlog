import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {Link, useHistory, useParams} from 'react-router-dom'
import '../markdown.css'

const Blog = ({ user, url }) => {
    const { id } = useParams();
    const [blog, setBlog] = useState({});
    const history = useHistory();

    const getBlog = async () => {
        try {
            const res = await axios({
                method:"GET",
                url:`${url ? url : "http://localhost:5000"}/api/v1/blogs/${id}`,
            });
            console.log(res.data);
            if(res.data.status === 200) {
                setBlog(res.data.blog);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const deleteBlog = async () => {
      try {
        const res = await axios({
          method:"DELETE",
          url:`${url ? url : "http://localhost:5000"}/api/v1/blogs/${id}`,
          data: {
            userID: user.uid,
          }
      });
      history.push("/");
      console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    }

    useEffect(() => {
        getBlog();
    }, []);

  return (
    <>
    <div className="card">
      <h1 className="title">{blog && blog.title}</h1>
      <div className="markdown-body">
        <ReactMarkdown>{blog && blog.markdown}</ReactMarkdown>
      </div>
    </div>
    <div className="sidebar blog">
      {(user && (user.uid === blog.authorID)) && (
      <div className="button-group-coloumn">
      <Link to={`/blog/edit/${blog && blog._id}`} className="btn">Edit</Link>
      <button type="button" className="btn" onClick={deleteBlog}>Delete</button>
      </div>)}
    </div>
    </>
  );
};

export default Blog;
