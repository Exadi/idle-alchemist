import React from "react";
import "./App.css";
import TaskBox from "./Components/TaskBox";
import InventoryDisplay from "./Components/InventoryDisplay";

import { Provider } from "react-redux";
import store from "./store";

import itemData from "./data/items";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TaskBox
          bgColor={"#fff"}
          fillColor={"#00ddff"}
          taskName={`Harvest ${itemData[0].name}`}
          timeToFill={2000}
          upgradeable={true}
          upgradeItems={[
            { id: 0, count: 1 },
            { id: 1, count: 2 },
          ]}
          upgradeCostFunction={(level) => Math.pow(2, level)}
          resultItemsGained={[{ id: 0, count: 1 }]}
        ></TaskBox>
        <TaskBox
          bgColor={"#fff"}
          fillColor={"#00ddff"}
          taskName={`Process ${itemData[0].name}`}
          timeToFill={2000}
          upgradeable={true}
          upgradeItems={[
            { id: 0, count: 1 },
            { id: 1, count: 2 },
          ]}
          upgradeCostFunction={(level) => Math.pow(2, level)}
          resultItemsGained={[
            { id: 1, count: 1 },
            { id: 2, count: 1 },
          ]}
          resultItemsLost={[{ id: 0, count: 1 }]}
        ></TaskBox>
        <TaskBox
          bgColor={"#fff"}
          fillColor={"#00ddff"}
          taskName={`Craft ${itemData[3].name}`}
          timeToFill={2000}
          upgradeable={true}
          upgradeItems={[
            { id: 0, count: 1 },
            { id: 1, count: 2 },
          ]}
          upgradeCostFunction={(level) => Math.pow(2, level)}
          resultItemsGained={[{ id: 3, count: 1 }]}
          resultItemsLost={[
            { id: 1, count: 1 },
            { id: 2, count: 1 },
          ]}
        ></TaskBox>
        <InventoryDisplay></InventoryDisplay>
      </div>
    </Provider>
  );
}

export default App;
