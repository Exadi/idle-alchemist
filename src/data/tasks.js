import itemData from "./items";
import store from "../store";
import taskCategories from "./taskCategories.json";

const defaults = {
  upgradeCostFunction: (level) => Math.pow(2, level),
  fillTimeFunction: (level) => 2000 / (level + 1),
  unlocked: () => true,
  firstTimeCompleteFunction: () => {},
};

const taskData = [
  {
    ...defaults,
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
  },
  {
    ...defaults,
    taskName: `Process ${itemData[0].name}`,
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
    ...defaults,
    taskName: `Craft ${itemData[3].name}`,
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
  {
    ...defaults,
    taskName: `Gather ${itemData[4].name}`,
    category: taskCategories.gather,
    upgradeable: false,
    fillTimeFunction: (level) => 4000 / (level + 1),
    oneTimeOnly: true,
  },
  {
    ...defaults,
    taskName: `Gather ${itemData[4].name} 2`,
    category: taskCategories.gather,
    upgradeable: false,
    fillTimeFunction: (level) => 4000 / (level + 1),
    limit: 5,
  },
];

export default taskData;
