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
          bgColor={"#fff"}
          fillColor={"#00ddff"}
          taskName={"Harvest Item 0"}
          timeToFill={2000}
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
