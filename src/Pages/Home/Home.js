import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../loaing.scss";
import "./home.scss";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const latestPost = async () => {
    const res = await axios.get(
      "https://blog-mern-igris.herokuapp.com/latestPost"
    );
    setPosts(res.data);
    setLoading(true);
  };
  useEffect(() => {
    latestPost();
  }, []);

  const post_data = posts.map(({ _id, photo, title, desc }, index) => {
    return (
      <div className="item__" key={index}>
        <Link
          to={`post/${_id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="image__">
            <img
              src={`https://blog-mern-igris.herokuapp.com/images/${photo}`}
              alt=""
            />
          </div>
          <div className="text2__">
            <h1>{title}</h1>
            <p>{desc.substring(0, 100)}...</p>
          </div>
        </Link>
      </div>
    );
  });
  return (
    <div className="main__">
      <div className="top__">
        <div className="text__">
          <h1>igris...</h1>
          <p>lorem ipsum bla bla bla good job ..... </p>
        </div>
        <div className="btn1__">
          <Link to="about">
            <button>About Me</button>
          </Link>
        </div>
      </div>
      {loading ? (
        <div className="bottom__">
          <div className="blog_items__">{post_data}</div>

          <div className="btn1__">
            <Link to={`blog`}>
              <button>All Blogs</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
};

export default Home;
