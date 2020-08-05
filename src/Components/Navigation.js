import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTab } from "../actions/gameStateActions";

export default function Navigation() {
  const dispatch = useDispatch();
  const unlockedTabs = useSelector((state) => state.gameState.unlockedTabs);
  return (
    <div>
      {unlockedTabs.map((item, idx) => {
        return (
          <a key={idx} onClick={() => dispatch(changeTab(item))}>
            {item}
          </a>
        );
      })}
    </div>
  );
}
