import { useState, useEffect } from "react";
import styles from "../../styles/CategoryPage.module.css";
import DetailedTile from "../../components/DetailedTile";

function Jewelery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJewelery = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/category/jewelery"
        );

        const data = await response.json();

        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJewelery();
  }, []);

  return loading ? (
    <p className={styles.loading}>Loading items...</p>
  ) : (
    <div className={styles.content}>
      <h2 className={styles.title}>Jewelery</h2>
      <div className={styles.list}>
        {items.map((item) => {
          return <DetailedTile key={item.id} item={item}></DetailedTile>;
        })}
      </div>
    </div>
  );
}

export default Jewelery;
