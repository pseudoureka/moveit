import "./Rating.css";

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selected = false, onSelect, onHover, rating }) {
  const className = `Rating-star ${selected ? "selected" : ""}`;

  const handleClick = onSelect ? () => onSelect(rating) : undefined;
  const handleMouseOver = onHover ? () => onHover(rating) : undefined;

  return (
    <span className={className} onClick={handleClick} onMouseOver={handleMouseOver}>
      ★
    </span>
  );
}

function Rating({ value = 0, onSelect, onHover, onMouseOut, className }) {
  return (
    <div className={className} onMouseOut={onMouseOut}>
      {RATINGS.map((rating) => (
        <Star
          key={rating}
          rating={rating}
          selected={value >= rating}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </div>
  );
}

export default Rating;
