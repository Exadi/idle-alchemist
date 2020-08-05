import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTimer } from "../utils/hooks";
import { changeTheme } from "../actions/settingsActions";
import themeData from "../data/themes";

export default function ThemeSwitch() {
  const dispatch = useDispatch();
  return (
    <select onChange={(e) => dispatch(changeTheme(e.target.value))}>
      {themeData.map((item, idx) => {
        return <option value={idx}>{item.name}</option>;
      })}
    </select>
  );
}
