import { useState, useEffect } from "react";
import Card from "../../components/Card";

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShoppingItems = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=5"
        );
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShoppingItems();
  }, []);

  return (
    <div>
      <p>Home</p>
      {items.map((item) => {
        return <Card key={item.id} item={item}></Card>;
      })}
    </div>
  );
}

export default Home;
