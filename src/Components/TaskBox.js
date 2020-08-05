import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTimer } from "../utils/hooks";
import { addItem, removeItem } from "../actions/inventoryActions";
import itemData from "../data/items";
import { useTheme } from "../utils/hooks";

/* PROPERTIES:
taskName: Name of the task as it should be displayed in the box
timeToFill: time in milliseconds to complete this task at level 0 //TODO replace with function of level and replace with speed instead of time so I can do upgrades like "increase all task speed by 20%" more easily
upgradeable: whether you can spend resources to upgrade this task (controls display of upgrade button)
upgradeItems: the item id required to upgrade
upgradeCostFunction: a function of level that controls how much the next upgrade costs
resultItemsGained: which item will be added (id and count) when this task finishes
resultItemsLost: which item will be removed (id and count) when this task finishes
*/
const TaskBox = (props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const inventory = useSelector((state) => state.inventory);
  /*const upgradeItems = inventory.items.find(
    (item) => item.id == props.upgradeItem
  );*/

  const {
    timeToFill,
    taskName,
    upgradeable,
    upgradeCostFunction,
    upgradeItems,
    resultItemsGained,
    resultItemsLost,
  } = props.props;
  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [fillTime, setFillTime] = useState(timeToFill);

  //upgrades
  const [upgradeLevel, setUpgradeLevel] = useState(0);
  const [upgradeCost, setUpgradeCost] = useState(1);

  const timerRef = useRef();
  const timerInterval = 50;

  const requirementsDisplay = (array) => {
    let str = "";
    let index = 0;
    array.forEach((element) => {
      str += itemData[element.id].name + "*" + element.count * upgradeCost;
      if (index < array.length - 1) {
        str += ", ";
      }
      index++;
    });

    return str;
  };
  const requirementsMet = (array, multiplier = 1) => {
    let reqMet = true;
    //for each item required for upgrading
    array.forEach((element) => {
      //try to find the item in inventory
      let foundItem = inventory.items.find((x) => x.id === element.id);
      if (!foundItem || foundItem.count < element.count * multiplier)
        reqMet = false;
    });
    return reqMet;
  };

  const upgradeSpeed = (e) => {
    e.stopPropagation();
    if (requirementsMet(upgradeItems, upgradeCost)) {
      upgradeItems.forEach((item) => {
        dispatch(removeItem({ id: item.id, count: item.count * upgradeCost }));
      });
      let nextUpgradeLevel = upgradeLevel + 1;
      setUpgradeLevel(nextUpgradeLevel);
      setUpgradeCost(upgradeCostFunction(nextUpgradeLevel));
      setFillTime(timeToFill / nextUpgradeLevel);
    }
  };

  const toggle = () => {
    if (!active && resultItemsLost && !requirementsMet(resultItemsLost)) {
      //TODO probably show some kind of error notification.
      return; //don't activate if you don't have the required items to complete it
    }
    setActive(!active);
    setCompleted(0);
  };

  timerRef.current = useTimer(() => {
    if (active) {
      if (completed + timerInterval / fillTime >= 1) {
        let timesCompleted = Math.round(completed + timerInterval / fillTime);

        if (resultItemsLost) {
          if (!requirementsMet(resultItemsLost)) {
            //TODO probably show some kind of error notification.
            setActive(false);
            return;
          }
          resultItemsLost.forEach((item) =>
            dispatch(
              removeItem({
                id: item.id,
                count: item.count * timesCompleted,
              })
            )
          );
        }
        if (resultItemsGained) {
          resultItemsGained.forEach((item) =>
            dispatch(
              addItem({
                id: item.id,
                count: item.count * timesCompleted,
              })
            )
          );
        }
        setCompleted(0);

        if (resultItemsLost && !requirementsMet(resultItemsLost)) {
          //TODO probably show some kind of error notification.
          setActive(false);
        }
      } else {
        setCompleted(completed + timerInterval / fillTime);
      }
    }
  }, timerInterval);

  const containerStyles = {
    height: "10vw",
    width: "30vw",
    backgroundColor: theme.bgSecondary,
    color: theme.textPrimary,
    borderRadius: 10,
    border: "1px solid black",
    position: "relative",
    zIndex: "1",
  };

  const fillerStyles = {
    height: "100%",
    width: `${
      active ? Math.min((completed + timerInterval / fillTime) * 100, 100) : 0
    }%`,
    backgroundImage: theme.gradientPrimary,
    borderRadius: "inherit",
    transition: `width ${active ? timerInterval / 1000 : 0}s`,
    position: "absolute",
    top: "0px",
    zIndex: "2",
    backgroundSize: "30vw",
  };

  const contentStyles = {
    position: "relative",
    zIndex: "3",
  };

  return (
    <>
      <div onClick={toggle} style={containerStyles}>
        <div style={fillerStyles}></div>
        <div style={contentStyles}>
          <h2>{taskName}</h2>
          <br />
          {upgradeable ? (
            <button
              disabled={requirementsMet(upgradeItems) ? "" : "disabled"}
              onClick={upgradeSpeed}
            >
              Upgrade: {requirementsDisplay(upgradeItems)}
            </button>
          ) : null}
          {resultItemsLost
            ? "Costs " + requirementsDisplay(resultItemsLost)
            : null}
        </div>
      </div>
    </>
  );
};

export default TaskBox;
