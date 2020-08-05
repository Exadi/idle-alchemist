import {
  UNLOCK_TAB,
  CHANGE_TAB,
  UNLOCK_TASK,
  COMPLETE_TASK,
} from "../actions/types";
import { taskCategories } from "../data/tasks.js";
const initialState = {
  unlockedTabs: [taskCategories.gather],
  unlockedTasks: [0],
  selectedTab: taskCategories.gather,
  completedTasks: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case UNLOCK_TASK:
      let unlockedTasks = [...state.unlockedTasks];
      unlockedTasks.push(action.payload);
      return {
        ...state,
        unlockedTasks: unlockedTasks,
      };
    case COMPLETE_TASK:
      let completedTasks = [...state.unlockedTasks];
      completedTasks.push(action.payload);
      return {
        ...state,
        completedTasks: completedTasks,
      };
    case UNLOCK_TAB:
      let unlockedTabs = [...state.unlockedTabs];
      unlockedTabs.push(action.payload);
      return {
        ...state,
        unlockedTabs: unlockedTabs,
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
