import {
  UNLOCK_TAB,
  CHANGE_TAB,
  UNLOCK_TASK,
  COMPLETE_TASK,
} from "../actions/types";
import taskData, { taskCategories } from "../data/tasks.js";

const initialState = {
  unlockedTabs: ["Inventory", taskCategories.gather],
  unlockedTasks: [0],
  selectedTab: taskCategories.gather,
  completedTasks: [],
};
export default function (state = initialState, action) {
  let unlockedTabs = [...state.unlockedTabs];
  switch (action.type) {
    case UNLOCK_TASK:
      let unlockedTasks = [...state.unlockedTasks];
      let taskCategory = taskData[action.payload].category;
      console.log(taskCategory);

      if (!unlockedTabs.includes(taskCategory)) unlockedTabs.push(taskCategory);
      unlockedTasks.push(action.payload);
      return {
        ...state,
        unlockedTasks,
        unlockedTabs,
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
