import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

const PlaceOrder = () => {
  const { totalCartAmount, food_list, cartItems, token, url } =
    useContext(StoreContext);
const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemData = item;
        itemData["quantity"] = cartItems[item._id];

        orderItems.push(itemData);
      }
    });

    let orderData = {
      address: formData,
      items: orderItems,
      amount: totalCartAmount() + 2,
    };

    let res = await axios.post(url + "/api/user/order", orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data) {
      const { session_url } = res.data;
      window.location.replace(session_url);
    }else{
      alert("Error")
    }
  };

  useEffect(()=>{
    if(!token){
navigate('/cart')
toast.error("Login please to get access")
    }else if(totalCartAmount()===0){
      navigate('/cart')
      toast.error("No cart item add,Add now!")
    }
  })

  return (
    <form onSubmit={handlePlaceOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>

        <div className='multi-fields'>
          <input
            required
            name='firstName'
            onChange={onChangeData}
            value={formData.firstName}
            type='text'
            placeholder='First name'
          />
          <input
            required
            name='lastName'
            onChange={onChangeData}
            value={formData.lastName}
            type='text'
            placeholder='Last name'
          />
        </div>
        <input
          required
          name='email'
          onChange={onChangeData}
          value={formData.email}
          type='email'
          placeholder='Email address'
        />
        <input
          required
          name='street'
          onChange={onChangeData}
          value={formData.street}
          type='text'
          placeholder='Street'
        />

        <div className='multi-fields'>
          <input
            required
            name='city'
            onChange={onChangeData}
            value={formData.city}
            type='text'
            placeholder='City'
          />
          <input
            required
            name='state'
            onChange={onChangeData}
            value={formData.state}
            type='text'
            placeholder='State'
          />
        </div>
        <div className='multi-fields'>
          <input
            name='zipCode'
            onChange={onChangeData}
            value={formData.zipCode}
            type='text'
            placeholder='Zip code'
          />
          <input
            required
            name='country'
            onChange={onChangeData}
            value={formData.country}
            type='text'
            placeholder='Country'
          />
        </div>
        <input
          required
          name='phone'
          onChange={onChangeData}
          value={formData.phone}
          type='tel'
          placeholder='Phone'
        />
      </div>

      <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>${totalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery fee</p>
              <p>${totalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Total</p>
              <p>${totalCartAmount() === 0 ? 0 : totalCartAmount() + 2}</p>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
