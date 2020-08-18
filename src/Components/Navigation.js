import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTab } from "../actions/gameStateActions";
import { useTheme } from "../utils/hooks";

import tabsData from "../data/tabs";

export default function Navigation() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const selectedTab = useSelector((state) => state.gameState.selectedTab);

  const tabStyles = {
    backgroundColor: theme.bgPrimary,
    color: theme.textSecondary,
    padding: "4px",
    cursor: "pointer",
  };

  const selectedTabStyles = {
    ...tabStyles,
    color: theme.textPrimary,
    borderBottom: `1px solid ${theme.textPrimary}`,
  };
  return (
    <span>
      {tabsData.map((item, idx) => {
        return item.unlocked() ? (
          <a
            key={idx}
            onClick={() => dispatch(changeTab(item.name))}
            style={item.name === selectedTab ? selectedTabStyles : tabStyles}
          >
            {item.name}
          </a>
        ) : null;
      })}
    </span>
  );
}
