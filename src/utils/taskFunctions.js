import itemData from "../data/items";
import taskData from "../data/tasks";
import store from "../store";
import { addItem, removeItem } from "../actions/inventoryActions";
import {
  completeTask as completeTaskRedux,
  modifyUnlockedTask,
} from "../actions/gameStateActions";
import { timerInterval } from "../utils/globalVariables";

export const tick = (task) => {
  if (task.active) {
    if (task.completed + timerInterval / getFillTime(task) >= 1) {
      completeTask(task);
    } else {
      store.dispatch(
        modifyUnlockedTask({
          ...task,
          completed: task.completed + timerInterval / getFillTime(task),
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
  } = dbTask;
  let timesCompleted = Math.round(
    task.completed + timerInterval / getFillTime(task)
  );

  if (resultItemsLost) {
    if (!requirementsMet(resultItemsLost)) {
      //TODO probably show some kind of error notification.
      //TASK FAILED due to insufficient items
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
  store.dispatch(modifyUnlockedTask({ ...task, completed: 0 }));

  //if this task has never been completed before, mark it as complete and execute its first time complete function
  if (!store.getState().gameState.completedTasks.includes(task.index)) {
    store.dispatch(completeTaskRedux(task.index));
    if (firstTimeCompleteFunction) firstTimeCompleteFunction();
  }
  if (resultItemsLost && !requirementsMet(resultItemsLost)) {
    //TASK COMPLETED, but can't start again due to insufficient items
    //TODO probably show some kind of error notification.
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
    if (!foundItem || foundItem.count < element.count * multiplier)
      reqMet = false;
  });
  console.log(reqMet);
  return reqMet;
};

export const upgradeCostDisplay = (task) => {
  let array = taskData[task.index].upgradeItems;
  return arrayToString(array, getUpgradeCost(task));
};

export const costDisplay = (task) => {
  let array = taskData[task.index].resultItemsLost;
  return arrayToString(array);
};

const arrayToString = (array, multiplier = 1) => {
  let str = "";
  let index = 0;
  array.forEach((element) => {
    console.log(element);
    str += itemData[element.id].name + "*" + element.count * multiplier;
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

export const getFillTime = (task) => {
  return taskData[task.index].fillTimeFunction(task.upgradeLevel || 0);
};
