import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";
import { createReview, deleteReview, getReviews, updateReview } from "../api";
import ReviewForm from "./ReviewForm";
import LocaleSelect from "./LocaleSelect";
import useAsync from "./hooks/useAsync";
import { useCallback } from "react";

const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, loadingError, getReviewsAsync] = useAsync(getReviews);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestButton = () => setOrder("createdAt");
  const handleBestButton = () => setOrder("rating");

  const handleLoad = useCallback(
    async (options) => {
      let results = await getReviewsAsync(options);
      if (!results) return;

      const { reviews, paging } = results;

      if (options.offset === 0) {
        setItems(reviews);
      } else {
        setItems((prevItems) => [...prevItems, ...reviews]);
      }
      setOffset(options.offset + reviews.length);
      setHasNext(paging.hasNext);
    },
    [getReviewsAsync]
  );

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order, handleLoad]);

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  const handleDelete = async (id) => {
    const result = await deleteReview(id);
    if (!result) return;

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCreateSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
  };

  const handleUpdateSuccess = (review) => {
    const splitIdx = items.findIndex((item) => item.id === review.id);
    setItems((prevItems) => [
      ...prevItems.slice(0, splitIdx),
      review,
      ...prevItems.slice(splitIdx + 1),
    ]);
  };

  return (
    <div>
      <LocaleSelect />
      <ReviewForm onSubmitSuccess={handleCreateSuccess} onSubmit={createReview} />
      <button onClick={handleNewestButton}>최신순</button>
      <button onClick={handleBestButton}>평점순</button>
      <ReviewList
        items={sortedItems}
        onDelete={handleDelete}
        onUpdateSuccess={handleUpdateSuccess}
        onUpdate={updateReview}
      />
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
