import taskData from "./tasks";
import taskCategories from "./taskCategories.json";
import store from "../store";

const checkUnlockedInCategory = (category) => {
  return (
    taskData.find((task) => {
      const unlocked = task.unlocked === undefined || task.unlocked();
      return unlocked && task.category === category;
    }) !== undefined
  );
};

let tabsData = [
  {
    name: "Inventory",
    unlocked: () => true,
  },
  {
    name: taskCategories.gather,
    unlocked: () => true,
  },
  {
    name: taskCategories.process,
    //unlock this if any task in its category is unlocked
    unlocked: () => checkUnlockedInCategory(taskCategories.process),
  },
  {
    name: taskCategories.craft,
    unlocked: () => checkUnlockedInCategory(taskCategories.craft),
  },
  {
    name: taskCategories.magic,
    unlocked: () => checkUnlockedInCategory(taskCategories.magic),
  },
  {
    name: "Alchemy",
    unlocked: () => {
      let completedTasks = store.getState().gameState.completedTasks;
      return completedTasks.includes(6);
    },
  },
];

export default tabsData;
