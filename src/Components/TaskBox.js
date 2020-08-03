import React, { useState, useRef } from "react";
import { useTimer } from "../utils/hooks";

const TaskBox = (props) => {
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
  const [timesCompleted, setTimesCompleted] = useState(0);
  const [fillTime, setFillTime] = useState(timeToFill);

  //upgrades
  const [upgradeLevel, setUpgradeLevel] = useState(0);
  const [upgradeCost, setUpgradeCost] = useState(1);

  const timerRef = useRef();
  const timerInterval = 50;

  const upgradeSpeed = () => {
    if (timesCompleted >= upgradeCost) {
      setTimesCompleted(timesCompleted - upgradeCost);
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
        setTimesCompleted(
          timesCompleted + Math.round(completed + timerInterval / fillTime)
        );
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
    "z-index": "1",
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
    "z-index": "2",
  };

  const contentStyles = {
    position: "relative",
    "z-index": "3",
  };

  return (
    <>
      <div style={containerStyles}>
        <div style={fillerStyles}></div>
        <div style={contentStyles}>
          <h2>{taskName}</h2>
          Owned: {timesCompleted}
          <br />
          {upgradeable ? (
            <button
              disabled={timesCompleted >= upgradeCost ? "" : "disabled"}
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
