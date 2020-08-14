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
  //0
  {
    ...defaults,
    bgColor: "#fff",
    fillColor: "#00ddff",
    taskName: `Harvest ${itemData[0].plural}`,
    timeToFill: 2000,
    upgradeable: true,
    upgradeItems: [{ id: 0, count: 1 }],
    upgradeCostFunction: (level) => Math.pow(2, level),
    fillTimeFunction: (level) => 2000 / (level + 1),
    resultItemsGained: [{ id: 0, count: 1 }],
    category: taskCategories.gather,
  },
  //1
  {
    ...defaults,
    taskName: `Process ${itemData[0].plural}`,
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
    unlocked: () => store.getState().gameState.completedTasks.includes(5),
    firstTimeCompleteFunction: () => {},
  },
  //2 - Craft ironflower tea
  {
    ...defaults,
    taskName: `Craft ${itemData[3].plural}`,
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
  //3
  {
    ...defaults,
    taskName: `Gather ${itemData[4].plural}`,
    category: taskCategories.gather,
    resultItemsGained: [{ id: 4, count: 1 }],
    upgradeable: false,
    fillTimeFunction: (level) => 4000,
    limit: 10,
  },
  //4
  {
    ...defaults,
    taskName: `Gather ${itemData[5].plural}`,
    resultItemsGained: [{ id: 5, count: 1 }],
    category: taskCategories.gather,
    upgradeable: false,
    fillTimeFunction: (level) => 4000,
    limit: 10,
  },
  //5
  {
    ...defaults,
    taskName: `Build Campfire`,
    category: taskCategories.craft,
    upgradeable: false,
    resultItemsLost: [
      { id: 4, count: 10 },
      { id: 5, count: 10 },
    ],
    fillTimeFunction: () => 60000,
    oneTimeOnly: true,
    unlocked: () =>
      store.getState().gameState.completedTasks.includes(3) &&
      store.getState().gameState.completedTasks.includes(4),
  },
];

export default taskData;
