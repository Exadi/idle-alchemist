import React from "react";
import "./App.css";
import TaskBox from "./Components/TaskBox";

function App() {
  return (
    <div className="App">
      <TaskBox
        bgcolor={"#fff"}
        fillcolor={"#00ddff"}
        timeToFill={2000}
        taskName={"Task Name"}
      ></TaskBox>
    </div>
  );
}

export default App;
