import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
const Navbar = ({ setLoginModal }) => {
  const navigate = useNavigate()
  const { totalCartAmount, token, logOut } = useContext(StoreContext);
  const [menu, setMenu] = useState("home");
  return (
    <div className='navbar'>
      <Link to='/'>
      <p className="logo">Yummys<span>D</span>oor</p>
      </Link>
      <ul className='navbar-menu'>
        <Link
          to='/'
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home{" "}
        </Link>
        <a
          href='#explore-menu'
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href='#app-download'
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href='#footer'
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          cntact us
        </a>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt='' className='' />
        <div className='navbar-search-icon'>
          <Link to='/cart'>
            <img src={assets.basket_icon} alt='basket-icon' />
          </Link>

          <div className={totalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setLoginModal(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt='profile-icon' />
            <ul className=' nav-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}>
                <img src={assets.bag_icon} alt='bag-icon' /> <p>Orders</p>
              </li>
              <hr />
              <li onClick={logOut}>
                {" "}
                <img src={assets.logout_icon} alt='logout-icon' /> <p>Logout</p>
              </li>{" "}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
