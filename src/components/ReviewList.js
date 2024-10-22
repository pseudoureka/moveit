import { useState } from "react";
import Rating from "./Rating";
import "./ReviewList.css";
import ReviewForm from "./ReviewForm";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function ReviewListItem({ item, onDelete, onEdit }) {
  const { title, rating, createdAt, content, imgUrl } = item;
  const handleDeleteClick = () => onDelete(item.id);

  const handleEditingClick = () => onEdit(item.id);

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={imgUrl} alt={title} />
      <div>
        <h1>{title}</h1>
        <Rating value={rating} />
        <p>{formatDate(createdAt)}</p>
        <p>{content}</p>
        <button onClick={handleEditingClick}>수정</button>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
    </div>
  );
}

function ReviewList({ items, onDelete }) {
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => setEditingId(null);

  return (
    <ul>
      {items.map((item) => {
        if (item.id === editingId) {
          const { imgUrl, title, rating, content } = item;
          const initialValues = { title, rating, content };

          return (
            <li key={item.title}>
              <ReviewForm
                initialValues={initialValues}
                onCancel={handleCancel}
                initialPreview={imgUrl}
              />
            </li>
          );
        }
        return (
          <li key={item.title}>
            <ReviewListItem item={item} onDelete={onDelete} onEdit={setEditingId} />
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewList;
