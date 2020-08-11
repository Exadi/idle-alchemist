import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../actions/inventoryActions";
import { unlockTask, modifyUnlockedTask } from "../actions/gameStateActions";
import { useTheme } from "../utils/hooks";
import taskData from "../data/tasks";
import {
  requirementsMet,
  upgradeCostDisplay,
  costDisplay,
  getUpgradeCost,
  getFillTime,
} from "../utils/taskFunctions";
import { timerInterval } from "../utils/globalVariables";

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
  const { unlockedTasks, maxTasks, completedTasks } = useSelector(
    (state) => state.gameState
  );

  //if this is not in the unlockedTasks array, add it.
  //TODO unlockedTasks is no longer an appropriate name
  if (!unlockedTasks.find((task) => task.index === props.index))
    dispatch(unlockTask(props.index));

  //if this is not in the unlockedTasks array, use a default object with index only to fetch task data
  const foundTask = unlockedTasks.find((task) => task.index === props.index);
  const thisTask = foundTask
    ? {
        ...foundTask,
        //get these from database/props if not found since they need to be loaded before anything is done with the task
        index: foundTask.index !== undefined ? foundTask.index : props.index,
        limit:
          foundTask.limit !== undefined
            ? foundTask.limit
            : taskData[props.index].limit,
      }
    : { index: props.index };

  const {
    taskName,
    upgradeable,
    upgradeItems,
    resultItemsLost,
    oneTimeOnly,
  } = taskData[thisTask.index];

  const upgradeSpeed = (e) => {
    e.stopPropagation();
    let upgradeCost = getUpgradeCost(thisTask);
    if (requirementsMet(upgradeItems, upgradeCost)) {
      upgradeItems.forEach((item) => {
        dispatch(removeItem({ id: item.id, count: item.count * upgradeCost }));
      });
      let nextUpgradeLevel = (thisTask.upgradeLevel || 0) + 1;
      dispatch(
        modifyUnlockedTask({
          ...thisTask,
          upgradeLevel: nextUpgradeLevel,
          timeToFill: thisTask.timeToFill / nextUpgradeLevel,
        })
      );
    } else {
      //TODO probably show some kind of error notification.
    }
  };

  const toggle = () => {
    let active = thisTask.active;
    if (!active) {
      if (resultItemsLost && !requirementsMet(resultItemsLost)) {
        //TODO show insufficient items notification.
        return;
      }
      let activeTasks = unlockedTasks.filter((task) => task.active);
      if (activeTasks && activeTasks.length >= maxTasks) {
        //TODO show can't do any more tasks notification.
        console.log("Can't do any more tasks.");
        return;
      }

      if (thisTask.limit == 0) {
        //TODO show can't do any more of this task notification.
        console.log("Limit is at 0.");
        return;
      }
    }
    dispatch(
      modifyUnlockedTask({ ...thisTask, active: !active, completed: 0 })
    );
  };

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
            (thisTask.completed + timerInterval / getFillTime(thisTask)) * 100,
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
                requirementsMet(upgradeItems, getUpgradeCost(thisTask))
                  ? ""
                  : "disabled"
              }
              onClick={upgradeSpeed}
            >
              Upgrade: {upgradeCostDisplay(thisTask)}
            </button>
          ) : null}
          {resultItemsLost ? "Costs " + costDisplay(thisTask) : null}
          <div>
            {oneTimeOnly ? "One time only." : null}
            {thisTask.limit ? `${thisTask.limit} remaining.` : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskBox;
