import { useState } from "react";
import "./ReviewForm.css";

const INITIAL_VALUE = {
  title: "",
  rating: 0,
  content: "",
};

function ReviewForm() {
  const [values, setValues] = useState(INITIAL_VALUE);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      // [name]: value,
      [name]: sanitize(type, value),
    }));
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
      <input name="title" value={values.title} onChange={handleChange} />
      <input name="rating" min={0} max={5} type="number" value={values.rating} onChange={handleChange} />
      <textarea name="content" value={values.content} onChange={handleChange} />
      <button type="submit" disabled={!isFormValid}>
        확인
      </button>
    </form>
  );
}

export default ReviewForm;
