import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import themeData from "../data/themes";
export const useTimer = (callback, time) => {
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(callback, time);
    return () => clearInterval(timerRef.current);
  }, [callback, time]);
};

export const useTheme = () => {
  return themeData[useSelector((state) => state.settings.theme)];
};
