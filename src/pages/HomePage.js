import React from "react";
import style from "../styles/Form.module.css";
import Button from "../components/ButtonComponent";
import { Link } from "react-router-dom";
import classes from "../styles/App.module.css";

function HomePage() {
  const loginHandler = () => {
    console.log("login");
  };

  const registerHandler = () => {
    console.log("register");
  };

  return (
    <div className={classes.App}>
      <h1 className={style.title}>Hello World, Welcome!</h1>
      <div>
        <Link to="/login">
          <Button onClick={loginHandler} text="Login" />
        </Link>
        <Link to="/register">
          <Button onClick={registerHandler} text="Sign Up" />
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
