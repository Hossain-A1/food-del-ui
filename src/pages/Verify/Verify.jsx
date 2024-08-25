import React, { useContext, useEffect } from "react";
import "./Verify.css";

import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
const Verify = () => {
  const { url } = useContext(StoreContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    const res = await axios.post(url + "/api/user/verify", {
      success,
      orderId,
    });

    if (res.data) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className='verify'>
      <div className='spinner'></div>
    </div>
  );
};

export default Verify;
