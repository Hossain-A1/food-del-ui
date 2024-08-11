import React from "react";

import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        Explore our food menu" to discover a variety of delicious dishes,
        catering to all tastes and preferences. Enjoy a culinary journey from
        appetizers to desserts.
      </p>

      <div className='explore-menu-list'>
        {menu_list.map((item, i) => (
          <div
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            className='explore-menu-list-item'
            key={i}
          >
            <img
              className={category === item.menu_name ? "active" : ""}
              src={item.menu_image}
              alt={item.menu_name}
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
