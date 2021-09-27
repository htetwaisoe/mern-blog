import React, { useEffect, useState } from "react";
import "./singleBlog.scss";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../loaing.scss";
const SinglePage = () => {
  const getdata = JSON.parse(localStorage.getItem("user_igrisLogin_setUp_adm"));
  const PF = "https://blog-mern-igris.herokuapp.com/images/";
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const handleDelete = async () => {
    const sure = window.confirm("Are u sure ?");
    if (sure) {
      try {
        await axios.delete(
          `https://blog-mern-igris.herokuapp.com/posts/${post._id}`,
          {
            data: { username: getdata.username },
          }
        );
        window.location.replace("/blog");
      } catch (error) {}
    }
  };
  useEffect(() => {
    const post = async () => {
      const response = await axios.get(
        `https://blog-mern-igris.herokuapp.com/posts/${path}`
      );
      setPost(response.data);
      setLoading(true);
      setTitle(response.data.title);
      setDesc(response.data.desc);
    };
    post();
  }, [path]);
  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://blog-mern-igris.herokuapp.com/posts/${post._id}`,
        {
          username: getdata.username,
          title,
          desc,
        }
      );
      window.location.reload();
    } catch (error) {}
  };
  return loading ? (
    <div className="Container">
      <div className="singlePage" key={post.id}>
        <Link
          to="/blog"
          style={{
            textDecoration: "none",
            color: "inherit",
            fontSize: "2em",
            width: "3em",
            marginLeft: "2rem",
            marginTop: "1rem",
            padding: "0px 5px",
          }}
        >
          <i className="fas fa-arrow-circle-left"></i>
        </Link>
        <div className="single_img">
          {post.photo && <img src={PF + post.photo} alt="" />}
        </div>
        <div className="single_title">
          {getdata && (
            <button
              className="btn_admin"
              onClick={() => setUpdateMode(!updateMode)}
            >
              <i className="far fa-edit"></i>
            </button>
          )}
          {!updateMode ? (
            " "
          ) : (
            <button className="btn_admin1" onClick={handleUpdate}>
              submit
            </button>
          )}
          {getdata && !updateMode ? (
            <button className="btn_admin" onClick={handleDelete}>
              <i class="far fa-trash-alt"></i>
            </button>
          ) : (
            <div></div>
          )}

          <br />
          {updateMode ? (
            <input
              className="Dataupdate"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1>{post.title} </h1>
          )}

          <p className="P">
            <h3 color="black">
              Author:
              <Link
                to={`/blog/?name=${post.username}`}
                style={{
                  padding: "0px 10px",
                  textDecoration: "none",
                  color: "blue",
                }}
              >
                {post.username}
              </Link>
            </h3>
          </p>
          <p>Published at - {new Date(post.createdAt).toLocaleDateString()}</p>
          {updateMode ? (
            <textarea
              rows="100"
              cols="40"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="DataUpdateDesc"
            />
          ) : (
            <p className="desc">{post.desc}</p>
          )}
        </div>
      </div>
      <div className="footer">all right reserved</div>;
    </div>
  ) : (
    <div className="loader" />
  );
};

export default SinglePage;
