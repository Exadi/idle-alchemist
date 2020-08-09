import taskData from "./tasks";
import taskCategories from "./taskCategories.json";

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
    unlocked: () =>
      taskData.find(
        (task) => task.unlocked() && task.category === taskCategories.process
      ) !== undefined,
  },
  {
    name: taskCategories.craft,
    unlocked: () =>
      taskData.find(
        (task) => task.unlocked() && task.category === taskCategories.craft
      ) !== undefined,
  },
];

export default tabsData;
