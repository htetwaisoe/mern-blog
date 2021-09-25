import React from "react";
import { Link } from "react-router-dom";
import Carditem from "./CardItem";
import "./home.scss";

const Home = () => {
  return (
    <div className="container_home">
      <div>
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: "150px",
            position: "absolute",
            opacity: "0.5",
          }}
        >
          <path
            fill="#9EF0F0"
            d="M63.8,-23.8C68.3,-6.8,47.7,15.3,25.3,30.6C2.8,46,-21.6,54.6,-36.8,44.9C-52,35.2,-58,7.2,-50.3,-14.1C-42.7,-35.4,-21.3,-49.9,4.1,-51.3C29.6,-52.6,59.2,-40.7,63.8,-23.8Z"
            transform="translate(100 100)"
          />
        </svg>
        <h1 style={{ textAlign: "center" }}>
          <span>igris...</span>portfilo
        </h1>

        <p>
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit..."
        </p>

        <div className="button_about" style={{ textAlign: "center" }}>
          <Link to="/about">
            <button>About me</button>
          </Link>
        </div>
      </div>

      <div className="blog_item">
        <Carditem />
      </div>
      <div className="button_about" style={{ textAlign: "center" }}>
        <Link to="/blog">
          <button>View All Blogs </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
