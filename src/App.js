import React, { useEffect } from "react";
import "./App.css";
import TaskBox from "./Components/TaskBox";
import InventoryDisplay from "./Components/InventoryDisplay";
import ThemeSwitch from "./Components/ThemeSwitch";

import { Provider, useSelector } from "react-redux";
import store from "./store";

import itemData from "./data/items";

import { createTheming } from "@callstack/react-theme-provider";

import themeData from "./data/themes";

const { ThemeProvider, withTheme, useTheme } = createTheming(themeData[0]);

function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  const themeId = useSelector((state) => state.settings.theme);
  const theme = themeData[themeId];
  const appStyles = {
    backgroundColor: theme.bgPrimary,
    height: "100%",
  };
  return (
    <ThemeProvider>
      <div className="App" style={appStyles}>
        <TaskBox
          bgColor={"#fff"}
          fillColor={"#00ddff"}
          taskName={`Harvest ${itemData[0].name}`}
          timeToFill={2000}
          upgradeable={true}
          upgradeItems={[
            { id: 0, count: 1 },
            { id: 1, count: 2 },
          ]}
          upgradeCostFunction={(level) => Math.pow(2, level)}
          resultItemsGained={[{ id: 0, count: 1 }]}
        ></TaskBox>
        <TaskBox
          bgColor={"#fff"}
          fillColor={"#00ddff"}
          taskName={`Process ${itemData[0].name}`}
          timeToFill={2000}
          upgradeable={true}
          upgradeItems={[
            { id: 0, count: 1 },
            { id: 1, count: 2 },
          ]}
          upgradeCostFunction={(level) => Math.pow(2, level)}
          resultItemsGained={[
            { id: 1, count: 1 },
            { id: 2, count: 1 },
          ]}
          resultItemsLost={[{ id: 0, count: 1 }]}
        ></TaskBox>
        <TaskBox
          bgColor={"#fff"}
          fillColor={"#00ddff"}
          taskName={`Craft ${itemData[3].name}`}
          timeToFill={2000}
          upgradeable={true}
          upgradeItems={[
            { id: 0, count: 1 },
            { id: 1, count: 2 },
          ]}
          upgradeCostFunction={(level) => Math.pow(2, level)}
          resultItemsGained={[{ id: 3, count: 1 }]}
          resultItemsLost={[
            { id: 1, count: 1 },
            { id: 2, count: 1 },
          ]}
        ></TaskBox>
        <InventoryDisplay></InventoryDisplay>

        <ThemeSwitch></ThemeSwitch>
      </div>
    </ThemeProvider>
  );
}

export default AppWrapper;
