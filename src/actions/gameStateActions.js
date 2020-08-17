import {
  UNLOCK_TASK,
  CHANGE_TAB,
  COMPLETE_TASK,
  MODIFY_UNLOCKED_TASK,
  ADD_MANA,
  REMOVE_MANA,
} from "./types";

export const unlockTask = (taskData) => {
  return {
    type: UNLOCK_TASK,
    payload: taskData,
  };
};

export const modifyUnlockedTask = (taskData) => {
  return {
    type: MODIFY_UNLOCKED_TASK,
    payload: taskData,
  };
};

export const completeTask = (taskData) => {
  console.log("Marking task as complete: ");
  console.log(taskData);
  return {
    type: COMPLETE_TASK,
    payload: taskData,
  };
};

export const changeTab = (tabData) => {
  return {
    type: CHANGE_TAB,
    payload: tabData,
  };
};

export const addMana = (count) => {
  return {
    type: ADD_MANA,
    payload: count,
  };
};

export const removeMana = (count) => {
  return {
    type: REMOVE_MANA,
    payload: count,
  };
};
