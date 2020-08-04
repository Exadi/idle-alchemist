import React from "react";
import { useSelector } from "react-redux";

const InventoryDisplay = (props) => {
  const inventory = useSelector((state) => state.inventory);
  return (
    <>
      {inventory.items.map((item) => {
        return (
          <div>
            {item.id} count {item.count}
          </div>
        );
      })}
    </>
  );
};

export default InventoryDisplay;
