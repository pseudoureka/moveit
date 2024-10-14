import ReviewList from "./ReviewList";
import mockItems from "../mock.json";

function App() {
  return (
    <div>
      <ReviewList items={mockItems} />
    </div>
  );
}

export default App;
