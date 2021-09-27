import { createTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "../Header/header.scss";
import { lists, list } from "./NavList";

const Header = () => {
  const user = localStorage.getItem("user_igrisLogin_setUp_adm");
  const getTheme = () => {
    return JSON.parse(localStorage.getItem("theme")) || false;
  };
  const [theme, setTheme] = useState(getTheme());
  const [clicked, setClicked] = useState(false);
  var Lists;
  if (user) {
    Lists = list.map(({ url, name }, index) => {
      return (
        <NavLink to={url} activeClassName="active" key={index}>
          {name}
        </NavLink>
      );
    });
  } else if (!user) {
    Lists = lists.map(({ url, name }, index) => {
      return (
        <NavLink to={url} activeClassName="active" key={index}>
          {name}
        </NavLink>
      );
    });
  }

  const Theme = createTheme({
    palette: {
      type: theme ? "dark" : "light",
    },
  });
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);
  const ClickeHandle = () => {
    setClicked(!clicked);
  };
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline>
        <nav className="container">
          <Link to="/">
            <div className="logo">
              <img
                src="https://www.logolynx.com/images/logolynx/c4/c434ffccd4c5c30f91b10914d2cadfbd.png"
                alt=""
              />
            </div>
          </Link>
          <div className="menu-icons" onClick={ClickeHandle}>
            <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          <div className={clicked ? "menu-list open" : "menu-list"}>
            {Lists}
            <i
              className={theme ? "far fa-moon" : "far fa-sun"}
              onClick={() => setTheme(!theme)}
            />
          </div>
        </nav>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default Header;
