import React from "react";
import "./App.css";
import TaskBox from "./Components/TaskBox";
import InventoryDisplay from "./Components/InventoryDisplay";
import ThemeSwitch from "./Components/ThemeSwitch";
import Navigation from "./Components/Navigation";

import { Provider, useSelector } from "react-redux";
import store from "./store";

import taskData from "./data/tasks";
import { useTheme } from "./utils/hooks";

function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  const theme = useTheme();
  const unlockedTasks = useSelector((state) => state.gameState.unlockedTasks);
  const tab = useSelector((state) => state.gameState.selectedTab);
  const appStyles = {
    backgroundColor: theme.bgPrimary,
    height: "100%",
  };
  return (
    <div className="App" style={appStyles}>
      <Navigation></Navigation>
      {taskData.map((item, idx) => {
        return unlockedTasks.find((task) => task.index == idx) &&
          item.category == tab ? (
          <TaskBox index={idx}></TaskBox>
        ) : null;
      })}
      {tab === "Inventory" ? <InventoryDisplay></InventoryDisplay> : null}
    </div>
  );
}

export default AppWrapper;
