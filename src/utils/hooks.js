import { useEffect, useRef } from "react";
export const useTimer = (callback, time) => {
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(callback, time);
    return () => clearInterval(timerRef.current);
  }, [callback, time]);
};
