const initialState = {
  message: "",
  loading: false,
};
const uxReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return { message: action.payload, loading: false };
    case "REMOVE_MESSAGE":
      return { message: "", loading: false };
    case "SET_LOADING":
      return { loading: true, message: "" };
    case "REMOVE_LOADING":
      return { loading: false, message: "" };
    default:
      return state;
  }
};

export default uxReducer;
