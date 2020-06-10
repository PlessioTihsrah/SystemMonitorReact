const initialState = {
  cpuLoadData: [],
  freeMemData: [],
  temperatureData: [],
  memUsage: 0,
  battery: 0,
  cpuLoad: 0,
  temperature: 0,
  users: [],
  processes: [],
};

const monitorDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_STATIC_DATA":
      return { ...state, ...action.payload };
    case "SET_DYNAMIC_DATA":
      const { cpuLoadData, freeMemData, temperatureData } = state;
      const {
        cpuLoad,
        freeMem,
        totalMem,
        temperature,
        batteryPercentage,
        users,
        processes,
      } = action.payload;
      return {
        ...state,
        cpuLoadData: [...cpuLoadData, cpuLoad],
        freeMemData: [...freeMemData, (totalMem - freeMem) / 1024 ** 3],
        temperatureData: [...temperatureData, temperature],
        memUsage: (100 * (totalMem - freeMem)) / totalMem,
        temperature,
        cpuLoad,
        batteryPercentage,
        users,
        processes,
      };

    case "REMOVE_MONITOR_DATA":
      return initialState;
    default:
      return initialState;
  }
};

export default monitorDataReducer;
