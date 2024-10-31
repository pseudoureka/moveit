import { useState } from "react";
import Rating from "./Rating";
import "./ReviewList.css";
import ReviewForm from "./ReviewForm";
import useTranslate from "./hooks/useTranslate";

function format(value) {
  const date = new Date(value);

  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function ReviewListItem({ item, onDelete, onEdit }) {
  const { title, rating, createdAt, content, imgUrl } = item;

  const handleDeleteClick = () => onDelete(item.id);
  const handleEditClick = () => onEdit(item.id);

  const t = useTranslate();

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={imgUrl} alt={title} />
      <div>
        <h1>{title}</h1>
        <Rating value={rating} />
        <p>{format(createdAt)}</p>
        <p>{content}</p>
        <button onClick={handleDeleteClick}>{t("delete button")}</button>
        <button onClick={handleEditClick}>{t("edit button")}</button>
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
          const handleUpdatedSuccess = (review) => {
            onUpdateSuccess(review);
            setEditingId();
          };
          const handleCancel = () => setEditingId();

          return (
            <li key={item.id}>
              <ReviewForm
                initialValue={initialValue}
                initialPreview={imgUrl}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleUpdatedSuccess}
                onCancel={handleCancel}
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
