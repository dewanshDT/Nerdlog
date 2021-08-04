import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const BlogEditor = ({user, method, url}) => {
  const [preview, setPreview] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  const getBlog = async () => {
    try {
        const res = await axios({
            method:"GET",
            url:`${url ? url : "http://localhost:5000"}/api/v1/blogs/${id}`
        });
        if(res.data.blog.authorID !== user.uid) return history.push(`/blog/${id}`);
        setMarkdown(res.data.blog.markdown);
        setTitle(res.data.blog.title);
        setTags(res.data.blog.tags);
        if(res.data.status === 200) {
        }
    } catch (e) {
        console.error(e);
    }
}

  useEffect(() => {
    console.log(method)
    if(user && method=== "update") {
      getBlog();
    } 
  }, [user]);

  return (
    <>
      <div className="new-blog-nav">
        <h3>New Blog</h3>
        <button
          className={`btn btn-transparent btn-left ${preview ? "" : "active"}`}
          onClick={() => setPreview(false)}
        >
          Editor
        </button>
        <button
          className={`btn btn-transparent btn-left ${!preview ? "" : "active"}`}
          onClick={() => setPreview(true)}
        >
          Preview
        </button>
      </div>
      <div className="card blog-form">
        {preview ? (
          <MarkdownPreview markdown={markdown} title={title} />
        ) : (
          <Form
            markdown={markdown}
            setMarkdown={setMarkdown}
            title={title}
            setTitle={setTitle}
            tags={tags}
            setTags={setTags}
            user={user}
            method={method}
            id={id}
            url={url}
          />
        )}
      </div>
    </>
  );
};

const Form = ({
  markdown,
  setMarkdown,
  title,
  setTitle,
  tags,
  setTags,
  user,
  method,
  id,
  url
}) => {
  const [tag, setTag] = useState();
  const history = useHistory();

  function resetForm() {
    setTitle("");
    setMarkdown("");
    setTags([]);
    setTag("");
  }

  async function submitHandler(e) {
    e.preventDefault();
    console.log("submitted");
    history.push("/");
    try { 
      if(method === "new") {
      const res = await axios({
        method: "POST",
        url: `${url ? url : "http://localhost:5000"}/api/v1/blogs`,
        data: {
          title: title,
          tags: tags,
          markdown: markdown,
          authorName: user.displayName,
          authorPhotoURL: user.photoURL,
          authorID: user.uid,
        },
      });
      console.log(res.data);
      }
      if(method === "update") {
        const res = await axios({
          method: "PUT",
          url: `${url ? url : "http://localhost:5000"}/api/v1/blogs/${id}`,
          data: {
            title: title,
            tags: tags,
            markdown: markdown,
            userID: user.uid,
          }
        })
      }
      resetForm();
    } catch (e) {
      console.error(e);
    }
  }

  const addTag = () => {
    if (tags.length <= 4 && tag) {
      setTags(previousState => { setTags([...previousState, tag])})
      setTag("");
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        className="title-input"
        type="text"
        name="title"
        placeholder="Your blog's title here...."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        autoComplete="off"
      />
      {tags && (
        <div className="blog-card-tags">
          {tags.map((tag) => (
            <span className="tag muted-text">#{tag}</span>
          ))}
        </div>
      )}
      <div className="input-group">
      <input
        type="text"
        className="tag-input"
        name="tags"
        placeholder="add upto four tags"
        value={tag}
        onChange={e => setTag(e.target.value)}
      />
      <button type="button" className="btn" onClick={addTag}>add</button>
      </div>
      <textarea
        name="markdown"
        className="markdown-editor"
        placeholder="Use Markdown to write the blog content"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        required
      ></textarea>
      <div className="button-group">
        <a href="/">
          <button className="btn btn-secondry" type="button">
            Cancel
          </button>
        </a>
        <button type="submit" className="btn">
          save
        </button>
      </div>
    </form>
  );
};

const MarkdownPreview = ({ markdown, title }) => {
  return (
    <>
      <h1 className="title">{title}</h1>
      <div className="markdown-body">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </>
  );
};

export default BlogEditor;
