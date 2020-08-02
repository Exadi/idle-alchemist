import React from "react";
import "./App.css";
import ProgressBar from "./Components/ProgressBar";

function App() {
  return (
    <div className="App">
      <ProgressBar
        bgcolor={"#fff"}
        fillcolor={"#00ddff"}
        timeToFill={2000}
      ></ProgressBar>
    </div>
  );
}

export default App;
