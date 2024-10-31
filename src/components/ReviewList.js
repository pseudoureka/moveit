import { useState } from "react";
import Rating from "./Rating";
import "./ReviewList.css";
import ReviewForm from "./ReviewForm";

function format(value) {
  const date = new Date(value);

  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function ReviewListItem({ item, onDelete, onEdit }) {
  const { title, rating, createdAt, content, imgUrl } = item;

  const handleDeleteClick = () => onDelete(item.id);
  const handleEditClick = () => onEdit(item.id);

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={imgUrl} alt={title} />
      <div>
        <h1>{title}</h1>
        <Rating value={rating} />
        <p>{format(createdAt)}</p>
        <p>{content}</p>
        <button onClick={handleDeleteClick}>삭제</button>
        <button onClick={handleEditClick}>수정</button>
      </div>
    </div>
  );
}

function ReviewList({ items, onDelete, onUpdateSuccess, onUpdate }) {
  const [editingId, setEditingId] = useState();

  return (
    <ul>
      {items.map((item) => {
        if (editingId === item.id) {
          const { id, title, rating, content, imgUrl } = item;
          const initialValue = { title, rating, content, imgFile: null };

          const handleSubmit = (formData) => onUpdate(id, formData);

          return (
            <li key={item.id}>
              <ReviewForm
                initialValue={initialValue}
                initialPreview={imgUrl}
                onSubmit={handleSubmit}
                onSubmitSuccess={onUpdateSuccess}
              />
            </li>
          );
        }

        return (
          <li key={item.id}>
            <ReviewListItem item={item} onDelete={onDelete} onEdit={setEditingId} />
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewList;
