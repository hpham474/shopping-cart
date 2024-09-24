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

  function totalPrice() {
    let totalCost = 0;
    for (let i = 0; i < cart.length; i++) {
      totalCost = totalCost + cart[i].item.price * cart[i].quantity;
    }

    return totalCost;
  }

  return isEmpty() ? (
    <p className={styles.empty}>No Items In Shopping Cart</p>
  ) : (
    <div className={styles.content}>
      <h2 className={styles.title}>Shopping Cart</h2>
      <div className={styles.shoppingCart}>
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
        <div className={styles.footer}>
          <div className={styles.checkOut}>
            <div className={styles.price}>
              Total: ${parseFloat(totalPrice()).toFixed(2)}
            </div>
            <button className={styles.checkOutButton}>Check Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
