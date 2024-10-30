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
  const [value, setValue] = useState(INITIAL_VALUE);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(value);
  };

  return (
    <form className="ReviewForm">
      <FileInput name="imgFile" value={value.imgFile} onChange={handleChange} />
      <input name="title" type="text" value={value.title} onChange={handleInputChange}></input>
      <input name="rating" type="number" value={value.rating} onChange={handleInputChange}></input>
      <input name="content" type="text" value={value.content} onChange={handleInputChange}></input>
      <button type="submit" onClick={handleSubmit}>
        확인
      </button>
    </form>
  );
}

export default ReviewForm;
