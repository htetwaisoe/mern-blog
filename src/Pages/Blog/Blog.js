import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import Carditem from "./CardItem";
import "./blog.scss";
import axios from "axios";
//import Category from "./Category";
import { useLocation } from "react-router";
import "../../loaing.scss";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  //search
  const filterData = posts.filter((post) => {
    return Object.values(post)
      .toString()
      .toLowerCase()
      .includes(searchTerm.toString().toLowerCase());
  });
  useEffect(() => {
    const getPosts = async () => {
      const response = await axios
        .get("https://blog-mern-igris.herokuapp.com/posts" + search)
        .catch((err) => console.log(err));
      console.log(response.data);
      setPosts(response.data);
      setLoading(true);
    };
    getPosts();
  }, [search]);
  return loading ? (
    <div className="container_home">
      <div className="search">
        <input
          type="text"
          placeholder="search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fas fa-search" />
      </div>
      <div className="blog_items">
        <Carditem posts={searchTerm.length > 0 ? filterData : posts} />
      </div>
      <div className="footer">all right reserved</div>
    </div>
  ) : (
    <div className="loader"></div>
  );
};

export default Home;
