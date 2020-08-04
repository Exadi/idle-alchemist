import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTimer } from "../utils/hooks";
import { addItem, removeItem } from "../actions/inventoryActions";

const TaskBox = (props) => {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory);
  const upgradeItems = inventory.items.find(
    (item) => item.id == props.upgradeItem
  );

  const {
    fillcolor,
    bgcolor,
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

  const upgradeSpeed = () => {
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
    backgroundColor: bgcolor,
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
    backgroundColor: fillcolor,
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
      <div style={containerStyles}>
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
          <button onClick={toggle}>{active ? "Stop" : "Start"}</button>
        </div>
      </div>
    </>
  );
};

export default TaskBox;
