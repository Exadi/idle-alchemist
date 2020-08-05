import React from "react";
import "./App.css";
import TaskBox from "./Components/TaskBox";
import InventoryDisplay from "./Components/InventoryDisplay";
import ThemeSwitch from "./Components/ThemeSwitch";

import { Provider } from "react-redux";
import store from "./store";

import itemData from "./data/items";
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
  const appStyles = {
    backgroundColor: theme.bgPrimary,
    height: "100%",
  };
  return (
    <div className="App" style={appStyles}>
      {taskData.map((item) => {
        return <TaskBox props={item}></TaskBox>;
      })}
      <InventoryDisplay></InventoryDisplay>

      <ThemeSwitch></ThemeSwitch>
    </div>
  );
}

export default AppWrapper;
