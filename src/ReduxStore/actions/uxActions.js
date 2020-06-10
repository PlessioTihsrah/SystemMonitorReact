export const setMessage = (message) => {
  return {
    type: "SET_MESSAGE",
    payload: message,
  };
};

export const removeMessage = () => {
  return { type: "REMOVE_MESSAGE" };
};

export const setLoading = () => {
  return { type: "SET_LOADING" };
};

export const removeLoading = () => {
  return { type: "REMOVE_LOADING" };
};
