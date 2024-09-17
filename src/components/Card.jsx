import PropTypes from "prop-types";
import styles from "./Card.module.css";

function Card({ item }) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={item.image} className={styles.img}></img>
      </div>
      <div className={styles.title}>
        <h2 className={styles.titleText}>{item.title}</h2>
      </div>
    </div>
  );
}

Card.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Card;
