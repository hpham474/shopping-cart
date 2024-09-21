import { useOutletContext } from "react-router-dom";

function Cart() {
  const { cart } = useOutletContext();

  return (
    <div>
      <p>Cart</p>
      {cart.map((cartItem, index) => (
        <li key={index}>
          {cartItem.item.title} - Quantity: {cartItem.quantity}
        </li>
      ))}
    </div>
  );
}

export default Cart;
