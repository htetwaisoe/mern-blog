import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router";

const Logout = () => {
  const getdata = localStorage.getItem("user_igrisLogin_setUp_adm");
  const location = useHistory();

  !getdata && location.goBack();
  useEffect(() => {
    const choice = window.confirm("Are you sure want to logout ?");
    if (choice) {
      localStorage.removeItem("user_igrisLogin_setUp_adm");
      window.location.replace("/");
    } else {
      location.goBack();
    }
  });
  return <div></div>;
};

export default Logout;
