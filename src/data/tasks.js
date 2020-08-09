import itemData from "./items";
import store from "../store";
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
    unlocked: () => true,
    firstTimeCompleteFunction: () => {},
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
    unlocked: () => store.getState().gameState.completedTasks.includes(0),
    firstTimeCompleteFunction: () => {},
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
    unlocked: () => store.getState().gameState.completedTasks.includes(1),
  },
];

export default taskData;
