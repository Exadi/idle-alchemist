import {
  CHANGE_TAB,
  UNLOCK_TASK,
  COMPLETE_TASK,
  MODIFY_UNLOCKED_TASK,
  MODIFY_ALL_UNLOCKED_TASKS,
  ADD_MANA,
  REMOVE_MANA,
} from "../actions/types";
import taskCategories from "../data/taskCategories.json";

const initialState = {
  unlockedTasks: [{ index: 0 }],
  selectedTab: taskCategories.gather,
  completedTasks: [],
  maxTasks: 1,
  mana: null,
};
export default function (state = initialState, action) {
  let unlockedTasks = [...state.unlockedTasks];
  switch (action.type) {
    case UNLOCK_TASK:
      let task = action.payload;
      if (Number.isInteger(task)) {
        task = { index: action.payload };
      }

      unlockedTasks.push(task);
      return {
        ...state,
        unlockedTasks,
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
    case MODIFY_ALL_UNLOCKED_TASKS:
      return {
        ...state,
        unlockedTasks: action.payload,
      };
    case COMPLETE_TASK:
      let completedTasks = [...state.completedTasks];
      completedTasks.push(action.payload);
      return {
        ...state,
        completedTasks,
      };
    case CHANGE_TAB:
      return {
        ...state,
        selectedTab: action.payload,
      };
    case ADD_MANA:
      return {
        ...state,
        mana: (state.mana || 0) + action.payload,
      };
    case REMOVE_MANA:
      return {
        ...state,
        mana: (state.mana || 0) - action.payload,
      };
    default:
      return state;
  }
}
