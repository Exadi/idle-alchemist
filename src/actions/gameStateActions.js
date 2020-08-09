import {
  UNLOCK_TASK,
  CHANGE_TAB,
  COMPLETE_TASK,
  MODIFY_UNLOCKED_TASK,
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
