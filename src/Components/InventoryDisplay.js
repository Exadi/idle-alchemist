import React from "react";
import { useSelector } from "react-redux";
import itemData from "../data/items";

const InventoryDisplay = (props) => {
  const inventory = useSelector((state) => state.inventory);
  return (
    <>
      {inventory.items.map((item, idx) => {
        return (
          <div key={idx}>
            {itemData[item.id].name} count {item.count}
          </div>
        );
      })}
    </>
  );
};

export default InventoryDisplay;
