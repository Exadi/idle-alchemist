import React from "react";
import { useSelector } from "react-redux";
import itemData from "../data/items";
import { useTheme } from "../utils/hooks";

const InventoryDisplay = (props) => {
  const theme = useTheme();
  const inventory = useSelector((state) => state.inventory);

  const inventoryStyles = {
    color: theme.textPrimary,
    backgroundColor: theme.bgSecondary,
    border: `1px solid ${theme.textPrimary}`,
    padding: "5px;",
  };

  const itemStyles = {};
  return (
    <div style={inventoryStyles}>
      {inventory.items.map((item, idx) => {
        return (
          <div key={idx} style={itemStyles}>
            {itemData[item.id].name} count {item.count}
          </div>
        );
      })}
    </div>
  );
};

export default InventoryDisplay;
