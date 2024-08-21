import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets";
const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orderData, setOrderData] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.post(
      url + "/api/user/getorders",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setOrderData(res.data.data);
    console.log(res.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return <div className="my-orders">
    <h2>My orders</h2>
    <div className="container">
      {orderData.map((order,i)=>(
        <div key={i}>
<img src={assets.parcel_icon} alt="order-icon" />
<p>{order.items.map((item,i)=>{
if(i === order.items.length-1){
  return item.name+" x "+item.quantity
}
})}</p>
        </div>
      ))}
    </div>
  </div>;
};

export default MyOrders;
