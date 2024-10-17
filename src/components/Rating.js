import "./Rating.css";

function Star({ selected = false, onSelect, rating, onHover }) {
  const className = `Rating-star ${selected ? "selected" : ""}`;

  const handleClick = onSelect ? () => onSelect(rating) : undefined;

  const handleMouseOver = onHover ? () => onHover(rating) : undefined;

  return (
    <span className={className} onClick={handleClick} onMouseOver={handleMouseOver}>
      ★
    </span>
  );
}

const RATINGS = [1, 2, 3, 4, 5];

function Rating({ className, value = 0, rating, onSelect, onHover, onMouseOut }) {
  return (
    <div className={className} onMouseOut={onMouseOut}>
      {RATINGS.map((rating) => (
        <Star key={rating} selected={value >= rating} rating={rating} onSelect={onSelect} onHover={onHover} />
      ))}
    </div>
  );
}

export default Rating;
