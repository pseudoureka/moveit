import "./ReviewList.css";

function ReviewListItem({ item }) {
  const { title, rating, createdAt, content, imgUrl } = item;

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={imgUrl} alt={title} />
      <div>
        <h1>{title}</h1>
        <p>{rating}</p>
        <p>{createdAt}</p>
        <p>{content}</p>
      </div>
    </div>
  );
}

function ReviewList({ items }) {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <ReviewListItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewList;
