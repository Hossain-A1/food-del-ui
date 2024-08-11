import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/frontend_assets/assets";
const AppDownload = () => {
  return (
    <div className='app-download' id="app-download">
      <p>
        For Better Experience Download <br /> OneShop App
      </p>
      <div className='app-dl-platform'>
        <img src={assets.play_store} alt='playStore-icon' />
        <img src={assets.app_store} alt='appStore-icon' />
      </div>
    </div>
  );
};

export default AppDownload;
