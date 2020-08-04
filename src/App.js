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
          upgradeItems={[
            { id: 0, count: 1 },
            { id: 1, count: 2 },
          ]}
          upgradeCostFunction={(level) => Math.pow(2, level)}
          resultItemsGained={[
            { id: 0, count: 1 },
            { id: 1, count: 2 },
          ]}
        ></TaskBox>
        <TaskBox
          bgColor={"#fff"}
          fillColor={"#00ddff"}
          taskName={"Craft Item 2"}
          timeToFill={2000}
          upgradeable={true}
          upgradeItems={[
            { id: 0, count: 1 },
            { id: 1, count: 2 },
          ]}
          upgradeCostFunction={(level) => Math.pow(2, level)}
          resultItemsGained={[{ id: 2, count: 1 }]}
          resultItemsLost={[
            { id: 0, count: 1 },
            { id: 1, count: 1 },
          ]}
        ></TaskBox>
        <InventoryDisplay></InventoryDisplay>
      </div>
    </Provider>
  );
}

export default App;
