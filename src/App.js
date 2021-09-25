import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Blog from "./Pages/Blog/Blog";
import About from "./Pages/About/About";
import Notfound from "./Pages/404/Notfound";
import Header from "./Header/Header";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import SinglePage from "./Pages/Blog/SinglePage";
import Logout from "./Pages/Auth/Logout";
import Write from "./Pages/Write/Write";
function App() {
  const user = localStorage.getItem("user");
  return (
    <div
      className="app"
      style={{
        margin: 0,
      }}
    >
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/blog" component={Blog} />
          <Route path="/post/:id" component={SinglePage} />
          <Route path="/authigrisLogin" component={user ? Home : Login} />
          <Route
            path="/authIgrisSignupIsNotAvailable"
            component={user ? Home : SignUp}
          />
          <Route path="/authigrisLogout" component={user ? Logout : Home} />
          <Route path="/authigrisAdminWrite" component={Write} />
          <Route component={Notfound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
