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
        upgradeable={true}
        upgradeCostFunction={(level) => Math.pow(2, level)}
      ></TaskBox>
    </div>
  );
}

export default App;
