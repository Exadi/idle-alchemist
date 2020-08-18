import React from "react";
import { useSelector } from "react-redux";
import Navigation from "./Navigation";
import { useTheme } from "../utils/hooks";

export function TopBar() {
  const mana = useSelector((state) => state.gameState.mana);
  const theme = useTheme();

  const topBarStyles = {
    color: theme.textPrimary,
    backgroundColor: theme.bgSecondary,
    borderBottom: `1px solid black`,
    marginBottom: "10px",
    height: "30px",
    position: "relative",
  };
  const resourceStyles = {
    position: "absolute",
    right: "1vw",
  };
  return (
    <div style={topBarStyles}>
      <Navigation></Navigation>
      <span style={resourceStyles}>{`${mana} Mana`}</span>
    </div>
  );
}

export default TopBar;
