import { CHANGE_THEME } from "../actions/types";

//const isEmpty = require("is-empty");
const initialState = {
  theme: 0,
  autoSaveInterval: 5000,
  showUsedUpTasks: true,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
}
