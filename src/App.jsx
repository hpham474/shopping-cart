import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./routes/NavBar/NavBar";
import Alert from "./components/Alert";

import "./styles/App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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
    sendAlert("Updated Cart");
    setCart(newCart);
  }

  function cartRemove(item) {
    const itemIndex = alreadyInCart(item);
    if (itemIndex != -1) {
      const newCart = [
        ...cart.slice(0, itemIndex),
        ...cart.slice(itemIndex + 1),
      ];
      sendAlert("Removed Item");
      setCart(newCart);
      return;
    }

    sendAlert("Error Removing Item");
  }

  function alreadyInCart(item) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].item.id === item.id) {
        return i;
      }
    }
    return -1;
  }

  function checkOut() {
    sendAlert("Check out not yet implemented");
  }

  function sendAlert(message) {
    setAlertMessage(message);
    setAlert(true);

    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }

  return (
    <>
      <NavBar></NavBar>
      <Outlet context={{ cart, cartChange, cartRemove, checkOut }}></Outlet>
      {alert && <Alert message={alertMessage}></Alert>}
    </>
  );
}

export default App;
