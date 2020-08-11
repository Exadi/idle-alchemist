import React, { useRef, useEffect } from "react";
import "./App.css";
import TaskBox from "./Components/TaskBox";
import InventoryDisplay from "./Components/InventoryDisplay";
import Navigation from "./Components/Navigation";

import { Provider, useSelector } from "react-redux";
import store from "./store";

import taskData from "./data/tasks";
import { useTimer, useTheme } from "./utils/hooks";
import { tick, taskIsCompleted } from "./utils/taskFunctions";
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
  //only here to cause re-render of the component when a task runs out. Otherwise, its box remains visible until clicked again.
  const completedTasks = useSelector((state) => state.gameState.completedTasks);

  const { showDepletedButRecoverableTasks } = useSelector(
    (state) => state.settings
  );
  const autoSaveInterval = useSelector(
    (state) => state.settings.autoSaveInterval
  );
  const appStyles = {
    backgroundColor: theme.bgPrimary,
    height: "100%",
    color: theme.textPrimary,
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

  let visibleTasks = taskData
    .map((item, idx) => {
      const unlocked = item.unlocked === undefined || item.unlocked();
      const unlockedTask = unlockedTasks.find((task) => task.index === idx);
      //if limit is not 0 and it's either not a one time task or it hasn't been completed, it is available
      const showIfDepleted =
        item.limitRecoverable && showDepletedButRecoverableTasks;
      const limitAvailable =
        (unlockedTask === undefined ||
          unlockedTask.limit !== 0 ||
          showIfDepleted) &&
        (!item.oneTimeOnly || !taskIsCompleted(idx));

      const visible = unlocked && limitAvailable && item.category === tab;

      return visible ? <TaskBox index={idx} key={idx}></TaskBox> : null;
    })
    .filter((task) => task !== null);

  return (
    <div className="App" style={appStyles}>
      <Navigation></Navigation>
      {visibleTasks.length > 0 ? (
        visibleTasks
      ) : (
        <div>No available tasks in this category.</div>
      )}
      {tab === "Inventory" ? <InventoryDisplay></InventoryDisplay> : null}
      {
        //TODO move this to settings page later
        <button
          onClick={() => {
            clearInterval(autoSaveTimerRef.current);
            deleteState("autosave");
          }}
        >
          Delete Save
        </button>
      }
    </div>
  );
}

export default AppWrapper;
