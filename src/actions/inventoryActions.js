import { ADD_ITEM, REMOVE_ITEM, SET_ITEM_COUNT } from "./types";

export const addItem = (itemData) => {
  return {
    type: ADD_ITEM,
    payload: itemData,
  };
};

export const removeItem = (itemData) => {
  return {
    type: REMOVE_ITEM,
    payload: itemData,
  };
};

export const setItemCount = (itemData) => {
  return {
    type: SET_ITEM_COUNT,
    payload: itemData,
  };
};
