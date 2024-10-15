import { getReviews } from "../api";
import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";

const LIMIT = 6;

function App() {
  const [order, setOrder] = useState("createdAt");
  const [items, setItems] = useState([]);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const handleRatingClick = () => setOrder("rating");
  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    const { reviews } = await getReviews(options);
    setItems(reviews);
  };

  useEffect(() => {
    handleLoad({ order, offset: 6, limit: LIMIT });
  }, [order]);

  const handleLoadMore = () => {};

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleRatingClick}>평점순</button>
      </div>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
      <button>더보기</button>
    </div>
  );
}

export default App;
