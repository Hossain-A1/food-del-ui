import React, { useContext, useEffect, useState } from "react";
import "./LoaginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const LoaginPopup = ({ setLoginModal }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const valueChanger = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    let newUrl = url;

    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const res = await axios.post(newUrl, data);

    if (res) {
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);

      setData({
        name: "",
        email: "",
        password: "",
      });
      toast.success("Login Successfully✅")
      setLoginModal(false);
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={handleLoginSubmit} className='login-popup-contailer'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img
            onClick={() => setLoginModal(false)}
            src={assets.cross_icon}
            alt='corse-icon'
          />
        </div>

        <div className='login-popup-inputs'>
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name='name'
              onChange={valueChanger}
              value={data.name}
              type='text'
              placeholder='Name'
              required
            />
          )}

          <input
            name='email'
            onChange={valueChanger}
            value={data.email}
            type='email'
            placeholder='Email'
            required
          />
          <input
            name='password'
            onChange={valueChanger}
            value={data.password}
            type='password'
            placeholder='Password'
            required
          />
        </div>
        <button type='submit'>
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className='login-popup-condition'>
          <input type='checkbox' required />
          <p>By continuing, i agree to terms of use & privicy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign up")}>Cleck here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoaginPopup;
