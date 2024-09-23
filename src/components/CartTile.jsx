import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./CartTile.module.css";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";

function CartTile({ item, cart, cartChange, cartRemove }) {
  const [value, setValue] = useState(cart[getIndex(item)].quantity);

  const handleChange = (e) => {
    let quantityValue = e.target.value.replace(/\D/g, "");

    if (quantityValue !== "") {
      quantityValue = Math.max(1, Math.min(99, Number(quantityValue)));
    }

    setValue(quantityValue);
  };

  function getIndex(cartItem) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].item.id === cartItem.id) {
        return i;
      }
    }
    return -1;
  }

  function increment() {
    const newValue = value + 1;
    cartChange(item, 1);
    setValue(newValue);
  }

  function decrement() {
    const newValue = value - 1;
    if (newValue != 0) {
      cartChange(item, -1);
      setValue(newValue);
    }
  }

  function update() {
    cartChange(item, value - cart[getIndex(item)].quantity);
  }

  function remove() {
    cartRemove(item);
  }

  return (
    <div className={styles.tile}>
      <div className={styles.image}>
        <img src={item.image} className={styles.img}></img>
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{item.title}</h2>
        <div className={styles.addToCart}>
          <div className={styles.input}>
            <label className={styles.label} htmlFor="quantity">
              Qty:{" "}
            </label>
            <input
              id="quantity"
              name="quantity"
              value={value}
              type="tele"
              min="1"
              max="99"
              onChange={handleChange}
              className={styles.quantityInput}
              required
            ></input>
          </div>
          <div>
            <button className={styles.decrement} onClick={decrement}>
              -
            </button>
            <button className={styles.increment} onClick={increment}>
              +
            </button>
          </div>
          <button className={styles.updateButton} onClick={update}>
            Update Quantity
          </button>
        </div>
        <p className={styles.price}>${parseFloat(item.price).toFixed(2)}</p>
      </div>
      <button aria-label="remove" className={styles.remove} onClick={remove}>
        <Icon path={mdiTrashCanOutline} color="white" size="100%" />
      </button>
    </div>
  );
}

CartTile.propTypes = {
  item: PropTypes.object.isRequired,
  cart: PropTypes.array.isRequired,
  cartChange: PropTypes.func.isRequired,
  cartRemove: PropTypes.func.isRequired,
};

export default CartTile;
