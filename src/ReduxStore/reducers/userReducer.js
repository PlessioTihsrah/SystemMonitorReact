const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, login: true, ...action.payload };
    case "LOGOUT":
      return { login: false };
    default:
      return state;
  }
};

export default userReducer;
