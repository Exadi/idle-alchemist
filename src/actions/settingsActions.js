import { CHANGE_THEME } from "./types";

export const changeTheme = (theme) => {
  return {
    type: CHANGE_THEME,
    payload: theme,
  };
};
