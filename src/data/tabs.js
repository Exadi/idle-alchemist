import taskData from "./tasks";
import taskCategories from "./taskCategories.json";

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
];

export default tabsData;
