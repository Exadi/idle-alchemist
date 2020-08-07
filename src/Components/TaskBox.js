import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTimer } from "../utils/hooks";
import { addItem, removeItem } from "../actions/inventoryActions";
import {
  completeTask as completeTaskRedux,
  modifyUnlockedTask,
} from "../actions/gameStateActions";
import itemData from "../data/items";
import { useTheme } from "../utils/hooks";
import taskData from "../data/tasks";

/* PROPERTIES:
taskName: Name of the task as it should be displayed in the box
timeToFill: time in milliseconds to complete this task at level 0 //TODO replace with function of level and replace with speed instead of time so I can do upgrades like "increase all task speed by 20%" more easily
upgradeable: whether you can spend resources to upgrade this task (controls display of upgrade button)
upgradeItems: the item id required to upgrade
upgradeCostFunction: a function of level that controls how much the next upgrade costs
resultItemsGained: which item will be added (id and count) when this task finishes
resultItemsLost: which item will be removed (id and count) when this task finishes
*/
const TaskBox = (props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const completedTasks = useSelector((state) => state.gameState.completedTasks);
  const unlockedTasks = useSelector((state) => state.gameState.unlockedTasks);
  const thisTask = unlockedTasks.find((task) => task.index == props.index);
  const inventory = useSelector((state) => state.inventory);

  const {
    taskName,
    upgradeable,
    upgradeCostFunction,
    fillTimeFunction,
    upgradeItems,
    resultItemsGained,
    resultItemsLost,
    firstTimeCompleteFunction,
  } = taskData[thisTask.index];

  const timerRef = useRef();
  const timerInterval = 50;

  const requirementsDisplay = (array) => {
    let str = "";
    let index = 0;
    array.forEach((element) => {
      str += itemData[element.id].name + "*" + element.count * getUpgradeCost();
      if (index < array.length - 1) {
        str += ", ";
      }
      index++;
    });

    return str;
  };
  const requirementsMet = (array, multiplier = 1) => {
    let reqMet = true;
    //for each item required for upgrading
    array.forEach((element) => {
      //try to find the item in inventory
      let foundItem = inventory.items.find((x) => x.id === element.id);
      if (!foundItem || foundItem.count < element.count * multiplier)
        reqMet = false;
    });
    return reqMet;
  };

  const getUpgradeCost = () => {
    return upgradeCostFunction(thisTask.upgradeLevel || 0);
  };

  const getFillTime = () => {
    return fillTimeFunction(thisTask.upgradeLevel || 0);
  };

  const upgradeSpeed = (e) => {
    e.stopPropagation();
    let upgradeCost = getUpgradeCost();
    console.log(upgradeCost);
    if (requirementsMet(upgradeItems, upgradeCost)) {
      upgradeItems.forEach((item) => {
        dispatch(removeItem({ id: item.id, count: item.count * upgradeCost }));
      });
      console.log("Current upgrade level: " + thisTask.upgradeLevel || 0);
      console.log((thisTask.upgradeLevel || 0) + 1);
      let nextUpgradeLevel = (thisTask.upgradeLevel || 0) + 1;
      console.log("Next upgrade level: " + nextUpgradeLevel);
      dispatch(
        modifyUnlockedTask({
          ...thisTask,
          upgradeLevel: nextUpgradeLevel,
          timeToFill: thisTask.timeToFill / nextUpgradeLevel,
        })
      );
    } else {
      //console.log("Requirements not met!");
    }
  };

  const toggle = () => {
    let active = thisTask.active;
    if (!active && resultItemsLost && !requirementsMet(resultItemsLost)) {
      //TODO probably show some kind of error notification.
      return; //don't activate if you don't have the required items to complete it
    }
    dispatch(
      modifyUnlockedTask({ ...thisTask, active: !active, completed: 0 })
    );
  };

  const completeTask = () => {
    let timesCompleted = Math.round(
      thisTask.completed + timerInterval / getFillTime()
    );

    if (resultItemsLost) {
      if (!requirementsMet(resultItemsLost)) {
        //TODO probably show some kind of error notification.
        //TASK FAILED due to insufficient items
        dispatch(modifyUnlockedTask({ ...thisTask, active: false }));
        return;
      }
      resultItemsLost.forEach((item) =>
        dispatch(
          removeItem({
            id: item.id,
            count: item.count * timesCompleted,
          })
        )
      );
    }
    if (resultItemsGained) {
      resultItemsGained.forEach((item) =>
        dispatch(
          addItem({
            id: item.id,
            count: item.count * timesCompleted,
          })
        )
      );
    }
    dispatch(modifyUnlockedTask({ ...thisTask, completed: 0 }));

    //if this task has never been completed before, mark it as complete and execute its first time complete function
    if (!completedTasks.includes(props.index)) {
      dispatch(completeTaskRedux(props.index));
      if (firstTimeCompleteFunction) firstTimeCompleteFunction();
    }
    if (resultItemsLost && !requirementsMet(resultItemsLost)) {
      //TASK COMPLETED, but can't start again due to insufficient items
      //TODO probably show some kind of error notification.
      dispatch(modifyUnlockedTask({ ...thisTask, active: false }));
    }
  };
  timerRef.current = useTimer(() => {
    if (thisTask.active) {
      if (thisTask.completed + timerInterval / getFillTime() >= 1) {
        completeTask();
      } else {
        dispatch(
          modifyUnlockedTask({
            ...thisTask,
            completed: thisTask.completed + timerInterval / getFillTime(),
          })
        );
        //setCompleted(completed + timerInterval / fillTime);
      }
    }
  }, timerInterval);

  const containerStyles = {
    height: "10vw",
    width: "30vw",
    backgroundColor: theme.bgSecondary,
    color: theme.textPrimary,
    borderRadius: 10,
    border: "1px solid black",
    position: "relative",
    zIndex: "1",
  };

  const fillerStyles = {
    height: "100%",
    width: `${
      thisTask.active
        ? Math.min(
            (thisTask.completed + timerInterval / getFillTime()) * 100,
            100
          )
        : 0
    }%`,
    backgroundImage: theme.gradientPrimary,
    borderRadius: "inherit",
    transition: `width ${thisTask.active ? timerInterval / 1000 : 0}s`,
    position: "absolute",
    top: "0px",
    zIndex: "2",
    backgroundSize: "30vw",
  };

  const contentStyles = {
    position: "relative",
    zIndex: "3",
  };

  return (
    <>
      <div onClick={toggle} style={containerStyles}>
        <div style={fillerStyles}></div>
        <div style={contentStyles}>
          <h2>{taskName}</h2>
          <br />
          {upgradeable ? (
            <button
              disabled={
                requirementsMet(upgradeItems, getUpgradeCost())
                  ? ""
                  : "disabled"
              }
              onClick={upgradeSpeed}
            >
              Upgrade: {requirementsDisplay(upgradeItems)}
            </button>
          ) : null}
          {resultItemsLost
            ? "Costs " + requirementsDisplay(resultItemsLost)
            : null}
        </div>
      </div>
    </>
  );
};

export default TaskBox;
