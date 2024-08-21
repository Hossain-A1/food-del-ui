import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const navigate = useNavigate();
  const [food_list, setFoodList] = useState([]);

  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState({});

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/home");
  };

  const getAllFoods = async () => {
    const res = await axios.get(url + "/api/food/list");
    setFoodList(res.data.data);
  };

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Assuming the token is a Bearer token
          },
        }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(
        url + `/api/cart/remove`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Assuming the token is a Bearer token
          },
        }
      );
    }
  };

  const loadAllCartData = async (t) => {
    const carts = await axios.get(url + "/api/cart/get", {
      headers: {
        Authorization: `Bearer ${t}`,
      },
    });
    setCartItems(carts.data.cartData);
  };

  const totalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);

        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    async function loadData() {
      await getAllFoods();

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken); // You can store this token for further use
        await loadAllCartData(storedToken); // Directly pass the stored token here
      }
    }

    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    totalCartAmount,
    url,
    token,
    setToken,
    logOut,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
