import itemData from "../data/items";
import taskData from "../data/tasks";
import store from "../store";
import { addItem, removeItem, setItemCount } from "../actions/inventoryActions";
import {
  completeTask as completeTaskRedux,
  modifyUnlockedTask,
} from "../actions/gameStateActions";
import { timerInterval } from "../utils/globalVariables";
import { store as notifStore } from "react-notifications-component";

export const tick = (task) => {
  if (task.active) {
    if (task.completed + getFillSpeed(task) >= 1) {
      completeTask(task);
    } else {
      store.dispatch(
        modifyUnlockedTask({
          ...task,
          completed: task.completed + getFillSpeed(task),
        })
      );
    }
  }
};

const completeTask = (task) => {
  let dbTask = taskData[task.index];
  let {
    resultItemsLost,
    resultItemsGained,
    firstTimeCompleteFunction,
    oneTimeOnly,
  } = dbTask;
  let { limit } = task;
  //don't complete the task more times than the remaining limit
  let timesCompleted = Math.min(
    Math.round(task.completed + getFillSpeed(task)),
    limit || 1
  );

  if (resultItemsLost) {
    if (!requirementsMet(resultItemsLost)) {
      notify({
        title: "You can't do that!",
        message: `You don't have the required items to finish ${task.taskName}. It has been cancelled.`,
        type: "danger",
      });
      store.dispatch(modifyUnlockedTask({ ...task, active: false }));
      return;
    }
    resultItemsLost.forEach((item) =>
      store.dispatch(
        removeItem({
          id: item.id,
          count: item.count * timesCompleted,
        })
      )
    );
  }
  if (resultItemsGained) {
    resultItemsGained.forEach((item) =>
      store.dispatch(
        addItem({
          id: item.id,
          count: item.count * timesCompleted,
        })
      )
    );
  }
  const newLimit = limit !== undefined ? limit - timesCompleted : undefined;
  const active = (newLimit === undefined || newLimit > 0) && !oneTimeOnly;
  store.dispatch(
    modifyUnlockedTask({ ...task, completed: 0, limit: newLimit, active })
  );

  //if this task has never been completed before, mark it as complete and execute its first time complete function
  if (!store.getState().gameState.completedTasks.includes(task.index)) {
    let unlockedBefore = taskData.map((item) => item.unlocked());
    store.dispatch(completeTaskRedux(task.index));
    let unlockedAfter = taskData.map((item) => item.unlocked());
    //iterate through the before/after arrays to see what changed
    for (let i = 0; i < unlockedBefore.length; i++) {
      if (unlockedBefore[i] !== unlockedAfter[i] && unlockedAfter[i] === true) {
        notify({
          title: "Content unlocked",
          message: `You can now ${taskData[i].taskName} on the ${taskData[i].category} tab.`,
          dismiss: { duration: 0 },
        });
        console.log(taskData[i].taskName + " unlocked!");
      }
    }
    if (firstTimeCompleteFunction) firstTimeCompleteFunction();
  }
  if (
    resultItemsLost &&
    !requirementsMet(resultItemsLost) &&
    !taskData[task.index].oneTimeOnly
  ) {
    //TASK COMPLETED, but can't start again due to insufficient items
    notify({
      title: "You can't do that!",
      message: `You don't have the required items to do ${
        taskData[task.index].taskName
      } again. It has been cancelled.`,
      type: "danger",
    });
    store.dispatch(modifyUnlockedTask({ ...task, active: false }));
  }
};

export const requirementsMet = (array, multiplier = 1) => {
  const inventory = store.getState().inventory;
  let reqMet = true;
  //for each item required for upgrading
  array.forEach((element) => {
    //try to find the item in inventory
    let foundItem = inventory.items.find((x) => x.id === element.id);
    if (!foundItem) {
      reqMet = false;
      return;
    }
    //fix NaN items
    if (isNaN(foundItem.count)) {
      store.dispatch(setItemCount({ id: element.id, count: 0 }));
      reqMet = false;
      return;
    }
    if (foundItem.count < element.count * multiplier) {
      reqMet = false;
      return;
    }
  });
  return reqMet;
};

export const upgradeCostDisplay = (task) => {
  let array = taskData[task.index].upgradeItems;
  return costArrayToString(array, getUpgradeCost(task));
};

export const costDisplay = (task) => {
  let array = taskData[task.index].resultItemsLost;
  return costArrayToString(array);
};

export const speedDisplay = (task) => {
  let fillSpeed = (getFillSpeed(task) / (timerInterval / 1000)) * 100;
  if (fillSpeed >= 100) {
    fillSpeed /= 100;
    return `Speed: ${fillSpeed.toFixed(2)}/s`;
  } else {
    return timeRemainingDisplay(task);
  }
};

export const timeRemainingDisplay = (task) => {
  let fillSpeed = (getFillSpeed(task) / (timerInterval / 1000)) * 100;
  let completedPercent = (task.completed || 0) * 100;
  let incompletePercent = 100 - completedPercent;

  let timeRemaining = incompletePercent / fillSpeed;

  let hours = Math.floor(timeRemaining / 3600);
  let minutes = Math.floor((timeRemaining - hours * 3600) / 60);
  let seconds = timeRemaining - hours * 3600 - minutes * 60;

  if (hours == 0 && minutes <= 1 && timeRemaining <= 60) {
    //don't turn 60s into 1 minute
    return `${timeRemaining.toFixed(2)}s`;
  } else if (hours == 0) {
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds.toFixed(0) : seconds.toFixed(0)
    }`;
  } else
    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds.toFixed(0) : seconds.toFixed(0)}`;
};

const costArrayToString = (array, multiplier = 1) => {
  let str = "";
  let index = 0;
  array.forEach((element) => {
    let count = element.count * multiplier;
    str += `${count} ${
      count !== 1 ? itemData[element.id].plural : itemData[element.id].name
    }`;
    if (index < array.length - 1) {
      str += ", ";
    }
    index++;
  });
  return str;
};

export const getUpgradeCost = (task) => {
  if (task)
    return taskData[task.index].upgradeCostFunction(task.upgradeLevel || 0);
};

export const getFillSpeed = (task) => {
  //TODO apply upgrades from global modifiers etc. here
  //multiply by timerInterval/1000 to make it progress per second
  return (
    taskData[task.index].fillSpeedFunction(task.upgradeLevel || 0) *
    (timerInterval / 1000)
  );
};

export const taskIsCompleted = (taskIndex) => {
  return store.getState().gameState.completedTasks.includes(taskIndex);
};

export const notify = ({
  title,
  message,
  type = "success",
  dismiss = { duration: 5000, onScreen: true },
}) => {
  notifStore.addNotification({
    title,
    message,
    type,
    insert: "bottom",
    container: "bottom-center",
    dismiss,
  });
};
