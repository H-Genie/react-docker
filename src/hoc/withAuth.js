import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (Component, auth) => (props) => {
  // auth === true : 로그인한 유저만 출입가능
  // auth === false : 아무나 출입가능

  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const token = window.sessionStorage.getItem("token");

  useEffect(() => {
    if (auth === true) token ? setCheck(true) : navigate("/login");
    else {
      if (token) navigate("/");
      else setCheck(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return check && <Component {...props} token={token} />;
};

export default withAuth;
