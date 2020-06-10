import firebase from "firebase/app";
import "firebase/auth";

export const login = (user) => {
  return { type: "LOGIN", payload: user };
};
export const logout = () => async (dispatch) => {
  const user = firebase.auth().currentUser;
  if (user) {
    firebase.auth().signOut();
  } else {
    dispatch({ type: "LOGOUT" });
  }
};

export const setFingerprint = (components) => {
  let a = "";
  components.forEach(({ value }) => {
    a += value;
  });
  return {
    type: "LOGIN",
    payload: { fingerprint: btoa(a).slice(0, 64) },
  };
};

export const auth = (email, password, type) => async (dispatch) => {
  if (type === "login") {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((e) => {
        dispatch({
          type: "SET_MESSAGE",
          payload: e.message,
        });
      });
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        dispatch({
          type: "SET_MESSAGE",
          payload: err.message,
        });
      });
  }
};

export const sendEmailVerification = () => async (dispatch) => {
  const user = firebase.auth().currentUser;
  if (user) {
    user
      .sendEmailVerification()
      .then(() => {
        dispatch({
          type: "SET_MESSAGE",
          payload: "Email Sent. Please confirm it",
        });
      })
      .catch((e) => {
        dispatch({
          type: "SET_MESSAGE",
          payload: e.message,
        });
      });
  } else {
    return {
      type: "LOGOUT",
    };
  }
};
