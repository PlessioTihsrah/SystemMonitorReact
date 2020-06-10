export const setStaticData = (data) => {
  return {
    type: "SET_STATIC_DATA",
    payload: { ...data },
  };
};

export const setDynamicData = (data) => {
  return {
    type: "SET_DYNAMIC_DATA",
    payload: { ...data },
  };
};

export const resetMonitorData = () => {
  return {
    type: "REMOVE_MONITOR_DATA",
  };
};
