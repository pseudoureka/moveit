import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";

const INITIAL_VALUE = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

function ReviewForm() {
  const [values, setValues] = useState(INITIAL_VALUE);

  const handleChange = (name, value, type) => {
    setValues((prevValues) => ({
      ...prevValues,
      // [name]: value,
      [name]: sanitize(type, value),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, value, type);
  };

  function sanitize(type, value) {
    switch (type) {
      case "number":
        return Number(value) || 0;

      default:
        return value;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    console.log(typeof values["rating"]);
    setValues(INITIAL_VALUE);
  };

  const isFormValid = values.title && values.rating && values.content;

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput name="imgFile" value={values.imgFile} onChange={handleChange} />
      <input name="title" value={values.title} onChange={handleInputChange} />
      <input name="rating" min={0} max={5} type="number" value={values.rating} onChange={handleInputChange} />
      <textarea name="content" value={values.content} onChange={handleInputChange} />
      <button type="submit" disabled={!isFormValid}>
        확인
      </button>
    </form>
  );
}

export default ReviewForm;
