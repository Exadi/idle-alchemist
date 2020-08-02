import React, { useState } from "react";
import { useTimer } from "../utils/hooks";

const ProgressBar = (props) => {
  const { fillcolor, bgcolor, timeToFill } = props;
  const [completed, setCompleted] = useState(0);
  const [barFills, setBarFills] = useState(0);
  const [fillTime, setFillTime] = useState(timeToFill);
  const [upgradeCost, setUpgradeCost] = useState(1);
  const timerInterval = 50;

  const upgradeSpeed = () => {
    if (barFills >= upgradeCost) {
      setBarFills(barFills - upgradeCost);
      setUpgradeCost(upgradeCost * 2);
      setFillTime(fillTime / 2);
    }
  };

  useTimer(() => {
    if (completed + timerInterval / fillTime >= 1) {
      setBarFills(barFills + Math.round(completed + timerInterval / fillTime));
      setCompleted(0);
    } else {
      setCompleted(completed + timerInterval / fillTime);
    }
  }, timerInterval);

  const containerStyles = {
    height: 20,
    width: "500px",
    backgroundColor: bgcolor,
    borderRadius: 50,
    margin: 50,
    border: "1px solid black",
  };

  const fillerStyles = {
    height: "100%",
    width: `${Math.min((completed + timerInterval / fillTime) * 100, 100)}%`,
    backgroundColor: fillcolor,
    borderRadius: "inherit",
    transition: `width ${timerInterval / 1000}s`,
  };

  return (
    <>
      Owned: {barFills}
      <br />
      Upgrade Cost: {upgradeCost}
      <div onClick={upgradeSpeed} style={containerStyles}>
        <div style={fillerStyles}></div>
      </div>
    </>
  );
};

export default ProgressBar;
