import PropTypes from "prop-types";
import styles from "./DetailedTile.module.css";

function DetailedTile({ item }) {
  return (
    <div className={styles.tile}>
      <div className={styles.image}>
        <img src={item.image} className={styles.img}></img>
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.price}>${item.price}</p>
      </div>
    </div>
  );
}

DetailedTile.propTypes = {
  item: PropTypes.object.isRequired,
};

export default DetailedTile;
