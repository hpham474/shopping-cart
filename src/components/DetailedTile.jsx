import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./DetailedTile.module.css";

function DetailedTile({ item }) {
  const [value, setValue] = useState(1);

  const handleChange = (e) => {
    let quantityValue = e.target.value.replace(/\D/g, "");

    if (quantityValue !== "") {
      quantityValue = Math.max(1, Math.min(99, Number(quantityValue)));
    }

    setValue(quantityValue);
  };

  function increment() {
    const newValue = value + 1;
    setValue(newValue);
  }

  function decrement() {
    const newValue = value - 1;
    setValue(newValue);
  }

  function addToCart() {
    console.log("add");
  }

  return (
    <div className={styles.tile}>
      <div className={styles.image}>
        <img src={item.image} className={styles.img}></img>
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.price}>${parseFloat(item.price).toFixed(2)}</p>
        <p className={styles.description}>{item.description}</p>
        <div className={styles.addToCart}>
          <button className={styles.decrement} onClick={decrement}>
            -
          </button>
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
          <button className={styles.increment} onClick={increment}>
            +
          </button>
          <button className={styles.add} onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

DetailedTile.propTypes = {
  item: PropTypes.object.isRequired,
};

export default DetailedTile;
