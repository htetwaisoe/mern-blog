import { Link } from "react-router-dom";
import "./carditem.scss";
import React from "react";
const CardItem = ({ posts }) => {
  const PF = "https://blog-mern-igris.herokuapp.com/images/";
  const data = posts.map((p) => {
    return (
      <Link
        key={p._id}
        to={`/post/${p._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="items">
          <div className="item__body">
            {p.categories.map((c) => {
              return <h6>{c.name}</h6>;
            })}
            {p.photo && <img src={PF + p.photo} alt="" />}
            {/* <h5>{new Date(p.createdAt).toDateString()}</h5> */}
            <p className="title">{p.title}</p>
            <p className="desc">{p.desc.substring(0, 100) + " ..."}</p>
          </div>
        </div>
      </Link>
    );
  });
  return (
    <>
      {data.length > 0 ? (
        data
      ) : (
        <div
          style={{
            textAlign: "center",
            fontSize: "1.5em",
            marginTop: "5em",
          }}
        >
          Oops....no post found .
        </div>
      )}
    </>
  );
};

export default CardItem;
