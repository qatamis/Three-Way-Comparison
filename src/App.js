import React from "react";
import ThreeWayComparison from "./components/ThreeWayComparison/ThreeWayComparison";

function App() {
  return (
    <div>
      <ThreeWayComparison
        imageA="/image1.jpg"
        imageB="/image2.jpg"
        imageC="/image3.jpg"
      />
    </div>
  );
}

export default App;
