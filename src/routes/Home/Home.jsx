import { useState, useEffect } from "react";
import Card from "../../components/Card";
import SimplfiedList from "../../components/SimplifiedList";
import styles from "./Home.module.css";

function Home() {
  const [trendingItems, setTrendingItems] = useState([]);
  const [topPicks, setTopPicks] = useState([]);
  const [continueShopping, setContinueShopping] = useState([]);
  const [buyAgain, setBuyAgain] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          trendingResponse,
          topPicksResponse,
          continueShoppingResponse,
          buyAgainResponse,
        ] = await Promise.all([
          fetch("https://fakestoreapi.com/products?limit=10"),
          fetch("https://fakestoreapi.com/products?limit=4"),
          fetch("https://fakestoreapi.com/products?limit=4"),
          fetch("https://fakestoreapi.com/products?limit=4"),
        ]);

        const [trendingData, topPicksData, continueShoppingData, buyAgainData] =
          await Promise.all([
            trendingResponse.json(),
            topPicksResponse.json(),
            continueShoppingResponse.json(),
            buyAgainResponse.json(),
          ]);

        setTrendingItems(trendingData);
        setTopPicks(topPicksData);
        setContinueShopping(continueShoppingData);
        setBuyAgain(buyAgainData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return loading ? (
    <p className={styles.loading}>Loading items...</p>
  ) : (
    <div className={styles.home}>
      <h2 className={styles.title}>Shopping Site</h2>
      <div className={styles.trending}>
        <h3 className={styles.trendingTitle}>Trending Deals</h3>
        <div className={styles.cards}>
          {trendingItems.map((item) => {
            return <Card key={item.id} item={item}></Card>;
          })}
        </div>
      </div>
      <div className={styles.section}>
        <SimplfiedList
          items={topPicks}
          title={"Top Picks For You"}
        ></SimplfiedList>
        <SimplfiedList
          items={continueShopping}
          title={"Keep Shopping For"}
        ></SimplfiedList>
        <SimplfiedList items={buyAgain} title={"Buy Again"}></SimplfiedList>
      </div>
    </div>
  );
}

export default Home;
