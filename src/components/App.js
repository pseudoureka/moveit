import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";
import { getReviews } from "../api";

const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestButton = () => setOrder("createdAt");
  const handleBestButton = () => setOrder("rating");

  const handleLoad = async (options) => {
    let results = await getReviews(options);
    console.log(results);
    const { reviews, paging } = results;

    setItems(reviews);
  };

  useEffect(() => {
    handleLoad({ order, offset: 6, limit: LIMIT });
  }, [order]);

  return (
    <div>
      <button onClick={handleNewestButton}>최신순</button>
      <button onClick={handleBestButton}>평점순</button>
      <ReviewList items={sortedItems} />
    </div>
  );
}

export default App;
