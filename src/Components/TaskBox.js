import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTimer } from "../utils/hooks";
import { addItem, removeItem } from "../actions/inventoryActions";

/* PROPERTIES:
taskName: Name of the task as it should be displayed in the box
bgColor: background color of the box
fillColor: color of the progress bar
timeToFill: time in milliseconds to complete this task at level 0 //TODO replace with function of level and replace with speed instead of time so I can do upgrades like "increase all task speed by 20%" more easily
upgradeable: whether you can spend resources to upgrade this task (controls display of upgrade button)
upgradeItem: the item id required to upgrade //TODO make it possible to require multiple items
upgradeCostFunction: a function of level that controls how much the next upgrade costs
addItem: which item will be added (id and count) when this task finishes
removeItem: which item will be removed (id and count) when this task finishes
*/
const TaskBox = (props) => {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory);
  const upgradeItems = inventory.items.find(
    (item) => item.id == props.upgradeItem
  );

  const {
    fillColor,
    bgColor,
    timeToFill,
    taskName,
    upgradeable,
    upgradeCostFunction,
  } = props;
  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [fillTime, setFillTime] = useState(timeToFill);

  //upgrades
  const [upgradeLevel, setUpgradeLevel] = useState(0);
  const [upgradeCost, setUpgradeCost] = useState(1);

  const timerRef = useRef();
  const timerInterval = 50;

  const upgradeSpeed = (e) => {
    e.stopPropagation();
    if (upgradeItems.count >= upgradeCost) {
      dispatch(removeItem({ id: props.upgradeItem, count: upgradeCost }));
      let nextUpgradeLevel = upgradeLevel + 1;
      setUpgradeLevel(nextUpgradeLevel);
      setUpgradeCost(upgradeCostFunction(nextUpgradeLevel));
      setFillTime(timeToFill / nextUpgradeLevel);
    }
  };

  const toggle = () => {
    setActive(!active);
    setCompleted(0);
  };

  timerRef.current = useTimer(() => {
    if (active) {
      if (completed + timerInterval / fillTime >= 1) {
        let timesCompleted = Math.round(completed + timerInterval / fillTime);
        if (props.addItem) {
          dispatch(
            addItem({
              id: props.addItem.id,
              count: props.addItem.count * timesCompleted,
            })
          );
        }
        setCompleted(0);
      } else {
        setCompleted(completed + timerInterval / fillTime);
      }
    }
  }, timerInterval);

  const containerStyles = {
    height: "10vw",
    width: "30vw",
    backgroundColor: bgColor,
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
    backgroundColor: fillColor,
    borderRadius: "inherit",
    transition: `width ${active ? timerInterval / 1000 : 0}s`,
    position: "absolute",
    top: "0px",
    zIndex: "2",
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
              disabled={
                upgradeItems && upgradeItems.count >= upgradeCost
                  ? ""
                  : "disabled"
              }
              onClick={upgradeSpeed}
            >
              Upgrade: {upgradeCost}
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default TaskBox;
