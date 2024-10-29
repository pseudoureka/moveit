import ReviewList from "./ReviewList";
import mockItems from "../mock.json";
import { useState } from "react";

function App() {
  const [order, setOrder] = useState("createdAt");

  const sortedItems = mockItems.sort((a, b) => b[order] - a[order]);

  const handleNewestButton = () => setOrder("createdAt");
  const handleBestButton = () => setOrder("rating");

  return (
    <div>
      <button onClick={handleNewestButton}>최신순</button>
      <button onClick={handleBestButton}>평점순</button>
      <ReviewList items={sortedItems} />
    </div>
  );
}

export default App;
