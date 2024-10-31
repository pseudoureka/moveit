import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import useTranslate from "./hooks/useTranslate";

const INITIAL_VALUE = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

function ReviewForm({
  onSubmitSuccess,
  onSubmit,
  initialValue = INITIAL_VALUE,
  initialPreview,
  onCancel,
}) {
  const [value, setValue] = useState(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (name, value) => {
    setValue((prevValue) => ({
      ...prevValue,
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
    formData.append("title", value.title);
    formData.append("rating", value.rating);
    formData.append("content", value.content);
    formData.append("imgFile", value.imgFile);

    let result;

    try {
      setIsSubmitting(true);
      result = await onSubmit(formData);
    } catch (error) {
      setSubmitError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }
    const { review } = result;
    setValue(initialValue);
    onSubmitSuccess(review);
  };

  const t = useTranslate();

  return (
    <form className="ReviewForm">
      <FileInput
        name="imgFile"
        value={value.imgFile}
        onChange={handleChange}
        initialPreview={initialPreview}
      />
      <input name="title" type="text" value={value.title} onChange={handleInputChange}></input>
      <RatingInput name="rating" value={value.rating} onChange={handleChange} />
      <input name="content" type="text" value={value.content} onChange={handleInputChange}></input>
      <button disabled={isSubmitting} type="submit" onClick={handleSubmit}>
        {t("confirm button")}
      </button>
      {onCancel && <button onClick={onCancel}>{t("cancel button")}</button>}
      {submitError?.message && <p>{submitError.message}</p>}
    </form>
  );
}

export default ReviewForm;
