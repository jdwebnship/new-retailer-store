// src/utils/sessionStorage.js
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn("Load state error:", err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    console.warn("Save state error:", err);
  }
};

export const clearState = () => {
  try {
    localStorage.removeItem("reduxState");
  } catch (err) {
    console.warn("Clear state error:", err);
  }
};
