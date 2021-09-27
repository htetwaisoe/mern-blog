import React, { useState } from "react";
import "./write.scss";
import axios from "axios";
const Write = () => {
  const getdata = JSON.parse(localStorage.getItem("user_igrisLogin_setUp_adm"));

  const [title, setTitle] = useState([]);
  const [desc, setDesc] = useState([]);
  const [file, setFile] = useState(null);
  const [err, setErr] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(true);
    const newPost = {
      username: getdata.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("https://blog-mern-igris.herokuapp.com/upload", data);
      } catch (err) {
        setErr(true);
      }
    }
    try {
      const res = await axios.post(
        "https://blog-mern-igris.herokuapp.com/posts",
        newPost
      );
      window.location.replace("post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className="form_container">
      <div className="image_container">
        {file && <img src={URL.createObjectURL(file)} />}
      </div>
      {err && (
        <div style={{ textAlign: "center", fontSize: "2em", color: "red" }}>
          {" "}
          Fill all forms
        </div>
      )}
      <div className="form_group">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <textarea
            rows="10"
            cols="38"
            placeholder="description"
            onChange={(e) => setDesc(e.target.value)}
          />
          <br />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button>publish</button>
        </form>
      </div>
    </div>
  );
};

export default Write;
