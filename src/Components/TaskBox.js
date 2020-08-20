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
  gainDisplay,
  getUpgradeCost,
  getFillSpeed,
  speedDisplay,
} from "../utils/taskFunctions";
import { timerInterval } from "../utils/globalVariables";
import { notify } from "../utils/taskFunctions";

import ReactTooltip from "react-tooltip";
import HelpIcon from "@material-ui/icons/Help";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import TimerIcon from "@material-ui/icons/Timer";

const TaskBox = (props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { unlockedTasks, maxTasks } = useSelector((state) => state.gameState);

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
    resultItemsGained,
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
    }
  };

  const toggle = () => {
    let active = thisTask.active;
    let taskName = taskData[thisTask.index].taskName();
    if (!active) {
      if (resultItemsLost && !requirementsMet(resultItemsLost())) {
        notify({
          title: "You can't do that!",
          message: `You don't have the required items for ${taskName}.`,
          type: "danger",
        });
        return;
      }
      let activeTasks = unlockedTasks.filter((task) => task.active);
      if (activeTasks && activeTasks.length >= maxTasks) {
        //TODO make this say you can only do one thing at a time if you haven't unlocked the ability to do more and add a better message for if you have
        notify({
          title: "You can't do that!",
          message: `You can't do any more tasks at one time. Click a task to stop doing it.`,
          type: "danger",
        });
        console.log("Can't do any more tasks.");
        return;
      }

      if (thisTask.limit === 0) {
        notify({
          title: "You can't do that!",
          message: `There aren't any more.`,
          type: "danger",
        });
        return;
      }
    }
    dispatch(
      modifyUnlockedTask({ ...thisTask, active: !active, completed: 0 })
    );
  };

  const containerStyles = {
    height: "140px",
    width: "410px",
    backgroundColor: theme.bgSecondary,
    color: theme.textPrimary,
    borderRadius: 10,
    border: "1px solid black",
    position: "relative",
    zIndex: "1",
    boxSizing: "border-box",
    userSelect: "none",
  };

  const fillerStyles = {
    height: "100%",
    width: `${
      thisTask.active
        ? Math.min((thisTask.completed + getFillSpeed(thisTask)) * 100, 100)
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
    padding: "10px",
    textShadow: theme.textShadow,
  };

  const description = taskData[thisTask.index].description;
  const helpIconStyles = {
    position: "absolute",
    top: "0",
    right: "0",
  };

  const costGainAreaStyles = {
    height: "48px",
  };
  const costStyles = {
    color: theme.textNegative,
  };

  const gainStyles = {
    color: theme.textPositive,
  };

  const limitStyles = { position: "absolute" };
  const timeStyles = {
    border: `1px solid ${theme.textPrimary}`,
    backgroundColor: `${theme.bgPrimary}`,
    width: "max-content",
    padding: "2px",
    position: "absolute",
    right: "2px",
    bottom: "0",
  };

  return (
    <>
      <ReactTooltip />
      <div onClick={toggle} style={containerStyles}>
        <div style={fillerStyles}></div>
        <div style={contentStyles}>
          <h2>{taskName()}</h2>
          {description ? (
            <div
              data-tip={taskData[thisTask.index].description()}
              style={helpIconStyles}
            >
              <HelpIcon />
            </div>
          ) : null}
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

          <div style={costGainAreaStyles}>
            {resultItemsLost ? (
              <div style={costStyles}>
                <RemoveOutlinedIcon
                  titleAccess="Lose"
                  style={{ verticalAlign: "bottom" }}
                />
                {costDisplay(thisTask)}
              </div>
            ) : null}
            {resultItemsGained ? (
              <div style={gainStyles}>
                <AddOutlinedIcon
                  titleAccess="Gain"
                  style={{ verticalAlign: "bottom" }}
                />
                {gainDisplay(thisTask)}
              </div>
            ) : null}
          </div>

          <div style={timeStyles}>
            <TimerIcon
              style={{ verticalAlign: "bottom" }}
              titleAccess="Time to complete:"
            />{" "}
            {speedDisplay(thisTask)}
          </div>
          <div style={limitStyles}>
            {oneTimeOnly ? "One time only." : null}
            {thisTask.limit ? `${thisTask.limit} remaining.` : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskBox;
