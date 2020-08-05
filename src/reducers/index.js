import { combineReducers } from "redux";
import inventoryReducers from "./inventoryReducers";
import settingsReducers from "./settingsReducers";
import gameStateReducers from "./gameStateReducers";
export default combineReducers({
  inventory: inventoryReducers,
  settings: settingsReducers,
  gameState: gameStateReducers,
});
