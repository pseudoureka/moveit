import "./Rating.css";

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selected = false, rating, onSelect, onHover }) {
  const className = `Rating-star ${selected ? "selected" : ""}`;

  const handleSelect = onSelect ? () => onSelect(rating) : undefined;
  const handleMouseOver = onHover ? () => onHover(rating) : undefined;

  return (
    <span className={className} onMouseOver={handleMouseOver} onClick={handleSelect}>
      ★
    </span>
  );
}

function Rating({ value = 0, className, onSelect, onHover, onMouseOut }) {
  return (
    <div className={className} onMouseOut={onMouseOut}>
      {RATINGS.map((rating) => (
        <Star
          key={rating}
          selected={value >= rating}
          onSelect={onSelect}
          onHover={onHover}
          rating={rating}
        />
      ))}
    </div>
  );
}

export default Rating;
