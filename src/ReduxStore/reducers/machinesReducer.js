const machinesReducer = (
  state = [{ mac: "dummy", name: "Dashboard" }],
  action
) => {
  switch (action.type) {
    case "ADD_MACHINES":
      return [{ mac: "dummy", name: "Dashboard" }, ...action.payload];
    case "REMOVE_MACHINES":
      return [{ mac: "dummy", name: "Dashboard" }];
    default:
      return state;
  }
};

export default machinesReducer;
