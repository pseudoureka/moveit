import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";
import { deleteReview, getReviews } from "../api";
import ReviewForm from "./ReviewForm";

const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestButton = () => setOrder("createdAt");
  const handleBestButton = () => setOrder("rating");

  const handleLoad = async (options) => {
    let results;

    try {
      setIsLoading(true);
      setLoadingError(null);
      results = await getReviews(options);
    } catch (e) {
      setLoadingError(e);
      return;
    } finally {
      setIsLoading(false);
    }

    const { reviews, paging } = results;

    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]);
    }
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  const handleDelete = async (id) => {
    const result = await deleteReview(id);
    if (!result) return;

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleSubmit = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
  };

  return (
    <div>
      <ReviewForm onSubmit={handleSubmit} />
      <button onClick={handleNewestButton}>최신순</button>
      <button onClick={handleBestButton}>평점순</button>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더보기
        </button>
      )}
      {loadingError?.message && <p>{loadingError.message}</p>}
    </div>
  );
}

export default App;
