import { combineReducers } from "redux";
import inventoryReducers from "./inventoryReducers";
export default combineReducers({
  inventory: inventoryReducers,
});
