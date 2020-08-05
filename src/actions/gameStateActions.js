import { UNLOCK_TAB, UNLOCK_TASK, CHANGE_TAB, COMPLETE_TASK } from "./types";

export const unlockTab = (tabData) => {
  return {
    type: UNLOCK_TAB,
    payload: tabData,
  };
};

export const unlockTask = (taskData) => {
  return {
    type: UNLOCK_TASK,
    payload: taskData,
  };
};

export const completeTask = (taskData) => {
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
