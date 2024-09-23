import { useOutletContext } from "react-router-dom";
import CartTile from "../../components/CartTile";
import styles from "./Cart.module.css/";

function Cart() {
  const { cart, cartChange, cartRemove } = useOutletContext();

  function isEmpty() {
    if (cart.length === 0) {
      return true;
    }
    return false;
  }

  return isEmpty() ? (
    <p className={styles.empty}>No Items In Shopping Cart</p>
  ) : (
    <div className={styles.content}>
      <h2 className={styles.title}>Shopping Cart</h2>
      <div className={styles.list}>
        {cart.map((item) => {
          return (
            <CartTile
              key={item.item.id}
              item={item.item}
              cart={cart}
              cartChange={cartChange}
              cartRemove={cartRemove}
            ></CartTile>
          );
        })}
      </div>
    </div>
  );
}

export default Cart;
