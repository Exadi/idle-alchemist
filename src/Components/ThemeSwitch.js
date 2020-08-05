import React from "react";
import { useDispatch } from "react-redux";
import { changeTheme } from "../actions/settingsActions";
import themeData from "../data/themes";

export default function ThemeSwitch() {
  const dispatch = useDispatch();
  return (
    <select onChange={(e) => dispatch(changeTheme(e.target.value))}>
      {themeData.map((item, idx) => {
        return (
          <option key={idx} value={idx}>
            {item.name}
          </option>
        );
      })}
    </select>
  );
}
