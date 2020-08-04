import { ADD_ITEM, REMOVE_ITEM } from "../actions/types";
//const isEmpty = require("is-empty");
const initialState = {
  items: [],
};
export default function (state = initialState, action) {
  let newItems = [...state.items];
  let item;
  switch (action.type) {
    case ADD_ITEM:
      item = newItems.find((element) => element.id === action.payload.id);
      if (item) {
        item.count += action.payload.count;
      } else {
        newItems.push({ id: action.payload.id, count: action.payload.count });
      }
      return {
        ...state,
        items: newItems,
      };
    case REMOVE_ITEM:
      item = newItems.find((element) => element.id === action.payload.id);
      if (item) {
        item.count -= action.payload.count;
      }
      return {
        ...state,
        items: newItems,
      };
    default:
      return state;
  }
}
