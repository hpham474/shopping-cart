import PropTypes from "prop-types";
import SimplifiedTile from "./SimplifiedTile";
import styles from "./SimplifiedList.module.css";

function SimplfiedList({ items, title }) {
  return (
    <div className={styles.list}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.tiles}>
        {items.map((item) => {
          return <SimplifiedTile key={item.id} item={item}></SimplifiedTile>;
        })}
      </div>
    </div>
  );
}

SimplfiedList.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default SimplfiedList;
