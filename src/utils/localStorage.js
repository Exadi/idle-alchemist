export const loadState = (slotName) => {
  try {
    const serializedState = localStorage.getItem(slotName);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state, slotName) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(slotName, serializedState);
  } catch {
    // ignore write errors
  }
};
