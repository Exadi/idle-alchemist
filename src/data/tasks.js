import itemData from "./items";
import store from "../store";
import taskCategories from "./taskCategories.json";

/* PROPERTIES:
taskName: Name of the task as it should be displayed in the box
category: Which tab this task will be displayed under (may interact with upgrades later)
fillSpeedFunction: Returns progress/second, where 1 is complete. e.g. 1/60 means it will take 60 seconds to complete
upgradeable: whether you can spend resources to upgrade this task (controls display of upgrade button)
upgradeItems: the item id required to upgrade
upgradeCostFunction: a function of level that controls how much the next upgrade costs (multiplies the upgradeItems by the result)
resultItemsGained: which item will be added (id and count) when this task finishes
resultItemsLost: which item will be removed (id and count) when this task finishes
unlocked: Function that determines whether this task is unlocked.
oneTimeOnly: true if this task can only ever be done once.
limit: How many times this task can be done.
limitRecoverable: set to true if there are ways to recover the above limit. Otherwise, the task will disappear forever when limit is depleted.
firstTimeCompleteFunction: a function that executes when completing this task for the first time. Not sure if this will be used now that tasks unlock in a different way.
*/

const defaults = {
  upgradeCostFunction: (level) => Math.pow(2, level),
  fillSpeedFunction: (level) => 0.5 + 0.005 * level,
  unlocked: () => true,
  firstTimeCompleteFunction: () => {},
};
const taskData = [
  //0
  {
    ...defaults,
    taskName: () => `Harvest ${itemData[0].plural}`,
    description: () =>
      "The seeds of this magical flower contain a metal that is easy to work with.",
    category: taskCategories.gather,
    fillSpeedFunction: () => 1 / 2,
    resultItemsGained: () => [{ id: 0, count: 1 }],
  },
  //1
  {
    ...defaults,
    taskName: () => `Process ${itemData[0].plural}`,
    category: taskCategories.process,
    resultItemsGained: () => [
      { id: 1, count: 1 },
      { id: 2, count: 1 },
    ],
    resultItemsLost: () => [{ id: 0, count: 1 }],
    unlocked: () => {
      let completedTasks = store.getState().gameState.completedTasks;
      return completedTasks.includes(5);
    },
  },
  //2
  {
    ...defaults,
    taskName: () => {
      let completedTasks = store.getState().gameState.completedTasks;
      return completedTasks.includes(6)
        ? "Bulk Brew Ironflower Tea"
        : "Brew Ironflower Tea";
    },
    description: () => {
      let completedTasks = store.getState().gameState.completedTasks;
      return completedTasks.includes(6)
        ? "Now that you have a cauldron, you can brew tea in bulk. Strangely, your body seems to have no limit to how much it can drink."
        : "Brew a refreshing cup of tea. Consumed immediately, granting 1 mana.";
    },
    category: taskCategories.craft,
    fillSpeedFunction: () => 1 / 30,
    resultItemsGained: () => {
      let completedTasks = store.getState().gameState.completedTasks;
      return completedTasks.includes(6)
        ? [{ mana: true, count: 10 }]
        : [{ mana: true, count: 1 }];
    },
    resultItemsLost: () => {
      let completedTasks = store.getState().gameState.completedTasks;
      return completedTasks.includes(6)
        ? [{ id: 1, count: 10 }]
        : [{ id: 1, count: 1 }];
    },
    unlocked: () => {
      let completedTasks = store.getState().gameState.completedTasks;
      return completedTasks.includes(1);
    },
  },
  //3
  {
    ...defaults,
    taskName: () => `Gather ${itemData[4].plural}`,
    category: taskCategories.gather,
    resultItemsGained: () => [{ id: 4, count: 1 }],
    fillSpeedFunction: () => 1 / 4,
    limit: 10,
  },
  //4
  {
    ...defaults,
    taskName: () => `Gather ${itemData[5].plural}`,
    category: taskCategories.gather,
    resultItemsGained: () => [{ id: 5, count: 1 }],
    fillSpeedFunction: () => 1 / 4,
    limit: 10,
  },
  //5
  {
    ...defaults,
    taskName: () => `Build Campfire`,
    description: () =>
      "A campfire will give you a place to rest and enough heat to do some basic processing.",
    category: taskCategories.craft,
    resultItemsLost: () => [
      { id: 4, count: 10 },
      { id: 5, count: 10 },
    ],
    fillSpeedFunction: () => 1 / 60,
    oneTimeOnly: true,
    unlocked: () => {
      let completedTasks = store.getState().gameState.completedTasks;
      return completedTasks.includes(3) && completedTasks.includes(4);
    },
  },
  //6
  {
    ...defaults,
    taskName: () => `Craft Crude Cauldron`,
    description: () =>
      `Use mana to coerce ${itemData[2].name} into the shape of a cauldron.`,
    category: taskCategories.magic,
    resultItemsLost: () => [
      {
        mana: true,
        count: 10,
      },
      { id: 2, count: 10 },
    ],
    fillSpeedFunction: () => 1 / 60,
    unlocked: () => {
      let completedTasks = store.getState().gameState.completedTasks;
      return completedTasks.includes(2);
    },
    oneTimeOnly: true,
  },
];

export default taskData;
