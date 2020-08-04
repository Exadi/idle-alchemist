import React from "react";
import "./App.css";
import TaskBox from "./Components/TaskBox";
import InventoryDisplay from "./Components/InventoryDisplay";

import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TaskBox
          bgcolor={"#fff"}
          fillcolor={"#00ddff"}
          timeToFill={2000}
          taskName={"Task Name"}
          upgradeable={true}
          upgradeItem={0}
          upgradeCostFunction={(level) => Math.pow(2, level)}
          addItem={{ id: 0, count: 1 }}
        ></TaskBox>
        <InventoryDisplay></InventoryDisplay>
      </div>
    </Provider>
  );
}

export default App;
