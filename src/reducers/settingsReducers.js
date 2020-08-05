import { CHANGE_THEME } from "../actions/types";
import { taskCategories } from "../data/tasks.js";
//const isEmpty = require("is-empty");
const initialState = {
  theme: 0,
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
