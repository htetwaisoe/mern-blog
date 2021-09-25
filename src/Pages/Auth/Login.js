import "./login.scss";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
const Login = () => {
  const location = useHistory();
  useEffect(() => {
    const getdata = localStorage.getItem("user");
    if (getdata) {
      // window.location.replace("/blog");
      location.goBack();
    }
  }, []);
  const [data, setData] = useState(" ");
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const { data } = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      setLoading(true);
      setData(data);
      location.goBack();
      localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  console.log(data);

  return (
    <div className="login_container">
      <div className="left_login">
        <img src="image/login.svg" alt="login svg" />
      </div>
      <div className="right_login">
        {error && <h4 style={{ color: "red" }}>Invalid Credential</h4>}
        <form onSubmit={handleLogin}>
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
            {loading ? (
              <Button
                variant="contained"
                disabled
                style={{
                  cursor: "not-allowed",
                }}
                type="submit"
              >
                Login
              </Button>
            ) : (
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            )}
          </div>
        </form>

        {/* <p className="link_signup">
          New user ? go first
          <Link to="/authigrisSignUp">
            <span>, SignUp</span>
          </Link>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
