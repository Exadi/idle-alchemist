import { combineReducers } from "redux";
import inventoryReducers from "./inventoryReducers";
import settingsReducers from "./settingsReducers";
export default combineReducers({
  inventory: inventoryReducers,
  settings: settingsReducers,
});
