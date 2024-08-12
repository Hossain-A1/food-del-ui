import React, { useState } from "react";
import Navbar from "./components/navbar/navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoaginPopup from "./components/LoginPopup/LoaginPopup";

const App = () => {
  const [loginModal, setLoginModal] = useState(false);
  return (
    <>
      {loginModal ? <LoaginPopup setLoginModal={setLoginModal} /> : <></>}
      <div className='app'>
        <Navbar setLoginModal={setLoginModal} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
