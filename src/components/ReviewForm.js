import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import useAsync from "./hooks/useAsync";
import useTranslate from "./hooks/useTranslate";

const INITIAL_VALUE = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

function ReviewForm({
  onSubmitSuccess,
  initialValues = INITIAL_VALUE,
  initialPreview,
  onCancel,
  onSubmit,
}) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);
  const t = useTranslate();

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);

    let result = await onSubmitAsync(formData);
    if (!result) return;

    const { review } = result;
    onSubmitSuccess(review);
    setValues(initialValues);
  };

  const isFormValid = values.title && values.rating && values.content;

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
        initialPreview={initialPreview}
      />
      <input name="title" value={values.title} onChange={handleInputChange} />
      <RatingInput name="rating" value={values.rating} onChange={handleChange} />
      <textarea name="content" value={values.content} onChange={handleInputChange} />
      {onCancel && <button onClick={onCancel}>{t("cancel button")}</button>}
      <button type="submit" disabled={!isFormValid || isSubmitting}>
        {t("confirm button")}
      </button>
      {submittingError?.message && <p>{submittingError.message}</p>}
    </form>
  );
}

export default ReviewForm;
