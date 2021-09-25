import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const CardItem = () => {
  const URL_PHOTO = "http://localhost:5000/images/";
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:5000/latestPost");
      setPosts(res.data);
    };
    fetch();
  }, []);
  console.log(posts.data);

  const datas = posts.map(({ _id, photo, title, desc }, index) => {
    return (
      <Link
        to={`post/${_id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="item" key={index}>
          <img src={URL_PHOTO + photo} alt="" />
          <p>{title}</p>
          <p>{desc.substring(0, 100)} ... </p>
        </div>
      </Link>
    );
  });
  return <>{datas}</>;
};
export default CardItem;
