import itemData from "./items";
import store from "../store";
import { unlockTask, unlockTab } from "../actions/gameStateActions";

export const taskCategories = {
  gather: "Gather",
  process: "Process",
  craft: "Craft",
};

const taskData = [
  {
    bgColor: "#fff",
    fillColor: "#00ddff",
    taskName: `Harvest ${itemData[0].name}`,
    timeToFill: 2000,
    upgradeable: true,
    upgradeItems: [
      { id: 0, count: 1 },
      { id: 1, count: 2 },
    ],
    upgradeCostFunction: (level) => Math.pow(2, level),
    resultItemsGained: [{ id: 0, count: 1 }],
    category: taskCategories.gather,
    unlocked: true,
    firstTimeCompleteFunction: () => {
      console.log("Harvest completed!");
      store.dispatch(unlockTask(1));
      store.dispatch(unlockTab(taskCategories.process));
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
    resultItemsGained: [
      { id: 1, count: 1 },
      { id: 2, count: 1 },
    ],
    resultItemsLost: [{ id: 0, count: 1 }],
    category: taskCategories.process,
    unlocked: false,
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
