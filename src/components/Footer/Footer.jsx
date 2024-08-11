import React from "react";
import "./Footer.css";
import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <footer className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
          <img src={assets.logo} alt='logo' />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
            placeat odit velit vero atque maxime fugiat. Cum magnam tenetur
            debitis provident similique nulla molestiae reiciendis, error,
            officia a nobis repellat.
          </p>

          <div className='footer-social-icons'>
            <img src={assets.facebook_icon} alt='facebook icon' />
            <img src={assets.twitter_icon} alt='facebook icon' />
            <img src={assets.linkedin_icon} alt='facebook icon' />
          </div>
        </div>
        <div className='footer-content-center'>
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className='footer-content-right'>
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+88-013-004-16147</li>
            <li>contact@oneshop.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='copyright'>Copyright {new Date().getFullYear()} © oneshop.com - All Right Reserved.</p>
    </footer>
  );
};

export default Footer;
