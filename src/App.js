import React, { useRef, useEffect } from "react";
import "./App.css";
import TaskBox from "./Components/TaskBox";
import InventoryDisplay from "./Components/InventoryDisplay";
import Navigation from "./Components/Navigation";

import { Provider, useSelector } from "react-redux";
import store from "./store";

import taskData from "./data/tasks";
import { useTimer, useTheme } from "./utils/hooks";
import { tick } from "./utils/taskFunctions";
import { timerInterval } from "./utils/globalVariables";
import { saveState, deleteState } from "./utils/localStorage";

function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  const timerRef = useRef();
  const autoSaveTimerRef = useRef();
  const theme = useTheme();
  const unlockedTasks = useSelector((state) => state.gameState.unlockedTasks);
  const tab = useSelector((state) => state.gameState.selectedTab);
  const autoSaveInterval = useSelector(
    (state) => state.settings.autoSaveInterval
  );
  const appStyles = {
    backgroundColor: theme.bgPrimary,
    height: "100%",
  };

  const appTick = () => {
    unlockedTasks.forEach((task) => {
      tick(task, timerInterval);
    });
  };

  timerRef.current = useTimer(() => {
    appTick();
  }, timerInterval);

  //this only needs to be reset if autosave interval changes which my useTimer hook doesn't do (it resets it every game tick causing it to never actually run)
  useEffect(() => {
    autoSaveTimerRef.current = setInterval(() => {
      saveState(store.getState(), "autosave");
    }, autoSaveInterval);
    return () => clearInterval(autoSaveTimerRef.current);
  }, [autoSaveInterval]);

  return (
    <div className="App" style={appStyles}>
      <Navigation></Navigation>
      {taskData.map((item, idx) => {
        return item.unlocked() && item.category === tab ? (
          <TaskBox index={idx} key={idx}></TaskBox>
        ) : null;
      })}
      {tab === "Inventory" ? <InventoryDisplay></InventoryDisplay> : null}
      {
        //move this to settings page later
        //<button onClick={deleteState("autosave")}>Delete Save</button>
      }
    </div>
  );
}

export default AppWrapper;
