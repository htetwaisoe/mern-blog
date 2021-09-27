import React, { useState, useEffect } from "react";
import "./login.scss";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";
const SignUp = () => {
  const location = useHistory();
  useEffect(() => {
    const getdata = localStorage.getItem("user_igrisLogin_setUp_adm");
    if (getdata) {
      location.goBack();
    }
  }, []);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(
        "https://blog-mern-igris.herokuapp.com/users/register",
        {
          username,
          email,
          password,
        }
      );
      console.log(res.data);
      res.data && window.location.replace("/authigrisLogin");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="login_container">
      <div className="left_login">
        <img src="image/signup.svg" alt="login svg" />
      </div>
      <div className="right_login">
        {error && (
          <span style={{ color: "red", fontSize: "1.5em" }}>
            Invalid Format...
          </span>
        )}
        <form onSubmit={handleSubmit}>
          <div className="username">
            <i className="fas fa-user"></i>
            <TextField
              id="standard-basic"
              label="username"
              variant="standard"
              className="textfield"
              onChange={(e) => setUsername(e.target.value)}
              InputLabelProps={{
                className: "textfield__color",
              }}
            />
          </div>
          <div className="email">
            <i className="fas fa-envelope"></i>
            <TextField
              id="standard-basic"
              label="email"
              variant="standard"
              className="textfield"
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{
                className: "textfield__color",
              }}
            />
          </div>
          <div className="password">
            <i className="fas fa-unlock"></i>
            <TextField
              id="standard-basic"
              label="password"
              variant="standard"
              type="password"
              className="textfield"
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{
                className: "textfield__color",
              }}
            />
          </div>

          <div className="btn">
            <Button variant="contained" color="primary" type="submit">
              SignUp
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
