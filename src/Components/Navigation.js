import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTab } from "../actions/gameStateActions";
import { useTheme } from "../utils/hooks";
export default function Navigation() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const selectedTab = useSelector((state) => state.gameState.selectedTab);
  const unlockedTabs = useSelector((state) => state.gameState.unlockedTabs);

  const navigationStyles = {
    color: theme.textPrimary,
    backgroundColor: theme.bgSecondary,
    borderBottom: `1px solid black`,
    marginBottom: "10px",
    height: "30px",
  };

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
    <div style={navigationStyles}>
      {unlockedTabs.map((item, idx) => {
        return (
          <a
            key={idx}
            onClick={() => dispatch(changeTab(item))}
            style={item == selectedTab ? selectedTabStyles : tabStyles}
          >
            {item}
          </a>
        );
      })}
    </div>
  );
}
