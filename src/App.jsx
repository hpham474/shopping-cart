import { useState } from "react";
import NavBar from "./routes/NavBar/NavBar";
import { Outlet } from "react-router-dom";

import "./styles/App.css";

function App() {
  const [cart, setCart] = useState([]);

  function cartChange(item, quantity) {
    const itemIndex = alreadyInCart(item);
    const newCart = [...cart];
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

  function cartRemove(item) {
    const itemIndex = alreadyInCart(item);
    if (itemIndex != -1) {
      const newCart = [
        ...cart.slice(0, itemIndex),
        ...cart.slice(itemIndex + 1),
      ];
      setCart(newCart);
    }
  }

  function alreadyInCart(item) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].item.id === item.id) {
        return i;
      }
    }
    return -1;
  }

  return (
    <>
      <NavBar></NavBar>
      <Outlet context={{ cart, cartChange, cartRemove }}></Outlet>
    </>
  );
}

export default App;
