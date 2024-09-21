import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "../../styles/CategoryPage.module.css";
import DetailedTile from "../../components/DetailedTile";

function WomensClothing() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartChange } = useOutletContext();

  useEffect(() => {
    const fetchWomensClothingItems = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/category/women's clothing"
        );

        const data = await response.json();

        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWomensClothingItems();
  }, []);

  return loading ? (
    <p className={styles.loading}>Loading items...</p>
  ) : (
    <div className={styles.content}>
      <h2 className={styles.title}>Women&apos;s Clothing</h2>
      <div className={styles.list}>
        {items.map((item) => {
          return (
            <DetailedTile
              key={item.id}
              item={item}
              cartChange={cartChange}
            ></DetailedTile>
          );
        })}
      </div>
    </div>
  );
}

export default WomensClothing;
