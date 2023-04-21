import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setToken } from "../feature/auth.slice";
import { fetchLogin } from "../feature/login.slice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.login.error);
  const isLoading = useSelector((state) => state.login.isLoading);
  const handleSubmit = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    const rememberIsChecked = e.target.rememberme.checked;

    dispatch(fetchLogin({ username, password })).then((action) => {
      if (!error && rememberIsChecked) {
        sessionStorage.setItem("token", action.payload.body.token);
        dispatch(setToken(action.payload.body.token));
        dispatch(setAuth(true));
        navigate("/user");
      } else if (!error && !rememberIsChecked) {
        localStorage.setItem("token", action.payload.body.token);
        dispatch(setToken(action.payload.body.token));
        dispatch(setAuth(true));
        navigate("/user");
      }
    });
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </div>
            <div className={error ? "loginError-visible" : "loginError-hide"}>
              The email address or password is incorrect. Please retry...
            </div>
            <div className="input-remember">
              <input type="checkbox" id="rememberme" />
              <label htmlFor="rememberme">Remember me</label>
            </div>
            {/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
            {/* <NavLink to="/user" className="sign-in-button">
                Sign In
              </NavLink> */}
            {/* <a href="./user.html" className="sign-in-button">
                Sign In
              </a> */}
            {/* <!-- SHOULD BE THE BUTTON BELOW --> */}
            <button className="sign-in-button">Sign In</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Login;
