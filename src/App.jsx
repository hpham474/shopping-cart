import { useState } from "react";
import NavBar from "./routes/NavBar/NavBar";
import { Outlet } from "react-router-dom";

import "./styles/App.css";

function App() {
  const [cart, setCart] = useState([]);

  function cartChange(item, quantity) {
    const itemIndex = alreadyInCart(item);
    const newCart = cart;
    if (itemIndex === -1) {
      newCart.push({
        item: item,
        quantity: quantity,
      });
    } else {
      newCart[itemIndex].quantity = newCart[itemIndex].quantity + quantity;
    }

    setCart(newCart);
  }

  function alreadyInCart(item) {
    for (let i = 0; i < cart.length; i++) {
      if (cart.item.id === item.id) {
        return i;
      }
    }
    return -1;
  }

  return (
    <>
      <NavBar></NavBar>
      <Outlet context={{ cart, cartChange }}></Outlet>
    </>
  );
}

export default App;
