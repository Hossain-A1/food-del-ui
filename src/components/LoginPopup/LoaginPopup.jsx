import React, { useState } from "react";
import "./LoaginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
const LoaginPopup = ({ setLoginModal }) => {
  const [currState, setCurrState] = useState("Sign Up");
  return (
    <div className='login-popup'>
      <form className='login-popup-contailer'>
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
            <input type='text' placeholder='Name' required />
          )}

          <input type='email' placeholder='Email' required />
          <input type='password' placeholder='Password' required />
        </div>
        <button>{currState === "Sign Up" ? "Create account" : "Login"}</button>

        <div className='login-popup-condition'>
          <input type='checkbox' required />
          <p>By continuing, i agree to terms of use & privicy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account? <span onClick={()=>setCurrState("Sign up")}>Cleck here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoaginPopup;
