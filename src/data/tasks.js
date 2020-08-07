import itemData from "./items";
import store from "../store";
import { unlockTask } from "../actions/gameStateActions";
import taskCategories from "./taskCategories.json";

const taskData = [
  {
    bgColor: "#fff",
    fillColor: "#00ddff",
    taskName: `Harvest ${itemData[0].name}`,
    timeToFill: 2000,
    upgradeable: true,
    upgradeItems: [{ id: 0, count: 1 }],
    upgradeCostFunction: (level) => Math.pow(2, level),
    fillTimeFunction: (level) => 2000 / (level + 1),
    resultItemsGained: [{ id: 0, count: 1 }],
    category: taskCategories.gather,
    unlocked: true,
    firstTimeCompleteFunction: () => {
      store.dispatch(unlockTask(1));
    },
  },
  {
    taskName: `Process ${itemData[0].name}`,
    timeToFill: 2000,
    upgradeable: true,
    upgradeItems: [
      { id: 0, count: 1 },
      { id: 1, count: 2 },
    ],
    upgradeCostFunction: (level) => Math.pow(2, level),
    fillTimeFunction: (level) => 2000 / (level + 1),
    resultItemsGained: [
      { id: 1, count: 1 },
      { id: 2, count: 1 },
    ],
    resultItemsLost: [{ id: 0, count: 1 }],
    category: taskCategories.process,
    unlocked: false,
    firstTimeCompleteFunction: () => {
      store.dispatch(unlockTask(2));
    },
  },
  {
    taskName: `Craft ${itemData[3].name}`,
    timeToFill: 2000,
    upgradeable: true,
    upgradeItems: [
      { id: 0, count: 1 },
      { id: 1, count: 2 },
    ],
    upgradeCostFunction: (level) => Math.pow(2, level),
    fillTimeFunction: (level) => 2000 / (level + 1),
    resultItemsGained: [{ id: 3, count: 1 }],
    resultItemsLost: [
      { id: 1, count: 1 },
      { id: 2, count: 1 },
    ],
    category: taskCategories.craft,
    unlocked: false,
  },
];

export default taskData;
