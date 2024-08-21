import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, url, addToCart, removeFromCart } =
    useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className='food-img-comtainer'>
        <img className='food-item-img' src={url+"/images/"+image  } alt={name} />
        {!cartItems[id] ? (
          <img
            src={assets.add_icon_white}
            className='add'
            onClick={() => addToCart(id)}
            alt=''
          />
        ) : (
          <div className='food-item-counter'>
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=''
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=''
            />
          </div>
        )}
      </div>
      <div className='food-item-info'>
        <div className='food-item-rating'>
          <p>{name}</p>
          <img src={assets.rating_starts} alt='rating' />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
