import React, { useRef } from "react";
import "./App.css";
import TaskBox from "./Components/TaskBox";
import InventoryDisplay from "./Components/InventoryDisplay";
import Navigation from "./Components/Navigation";

import { Provider, useSelector } from "react-redux";
import store from "./store";

import taskData from "./data/tasks";
import { useTimer, useTheme } from "./utils/hooks";
import { tick } from "./utils/taskFunctions";

function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  const timerInterval = 50;
  const timerRef = useRef();
  const theme = useTheme();
  const unlockedTasks = useSelector((state) => state.gameState.unlockedTasks);
  const tab = useSelector((state) => state.gameState.selectedTab);
  const appStyles = {
    backgroundColor: theme.bgPrimary,
    height: "100%",
  };

  timerRef.current = useTimer(() => {
    unlockedTasks.forEach((task) => {
      tick(task, timerInterval);
    });
  }, timerInterval);

  return (
    <div className="App" style={appStyles}>
      <Navigation></Navigation>
      {taskData.map((item, idx) => {
        return unlockedTasks.find((task) => task.index === idx) &&
          item.category === tab ? (
          <TaskBox index={idx} key={idx}></TaskBox>
        ) : null;
      })}
      {tab === "Inventory" ? <InventoryDisplay></InventoryDisplay> : null}
    </div>
  );
}

export default AppWrapper;
