import {
  UNLOCK_TAB,
  CHANGE_TAB,
  UNLOCK_TASK,
  COMPLETE_TASK,
  MODIFY_UNLOCKED_TASK,
} from "../actions/types";
import taskData from "../data/tasks.js";
import taskCategories from "../data/taskCategories.json";

const initialState = {
  unlockedTabs: ["Inventory", taskCategories.gather],
  unlockedTasks: [{ index: 0 }],
  selectedTab: taskCategories.gather,
  completedTasks: [],
};
export default function (state = initialState, action) {
  let unlockedTasks = [...state.unlockedTasks];
  let unlockedTabs = [...state.unlockedTabs];
  switch (action.type) {
    case UNLOCK_TASK:
      let task = action.payload;
      if (Number.isInteger(task)) {
        task = { index: action.payload };
      }
      let taskCategory = taskData[task.index].category;

      if (!unlockedTabs.includes(taskCategory)) unlockedTabs.push(taskCategory);
      unlockedTasks.push(task);
      return {
        ...state,
        unlockedTasks,
        unlockedTabs,
      };
    case MODIFY_UNLOCKED_TASK:
      unlockedTasks = unlockedTasks.map((task) => {
        if (action.payload.index === task.index) return action.payload;
        else return task;
      });

      return {
        ...state,
        unlockedTasks,
      };
    case COMPLETE_TASK:
      let completedTasks = [...state.unlockedTasks];
      completedTasks.push(action.payload);
      return {
        ...state,
        completedTasks,
      };
    case UNLOCK_TAB:
      unlockedTabs.push(action.payload);
      return {
        ...state,
        unlockedTabs,
      };
    case CHANGE_TAB:
      return {
        ...state,
        selectedTab: action.payload,
      };
    default:
      return state;
  }
}
