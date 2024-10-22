import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import { createReview } from "../api";

const INITIAL_VALUE = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

function ReviewForm({ onSubmitSuccess, initialValues = INITIAL_VALUE, initialPreview }) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);

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

    let result;

    try {
      setIsSubmitting(true);
      setSubmittingError(null);
      result = await createReview(formData);
    } catch (e) {
      setSubmittingError(e);
      return;
    } finally {
      setIsSubmitting(false);
    }
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
      <button type="submit" disabled={!isFormValid || isSubmitting}>
        확인
      </button>
      {submittingError?.message && <p>{submittingError.message}</p>}
    </form>
  );
}

export default ReviewForm;
