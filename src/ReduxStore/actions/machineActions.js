import firebase from "firebase/app";
export const removeMachines = () => ({
  type: "REMOVE_MACHINES",
});

export const getMachines = () => async (dispatch) => {
  const database = firebase.database();
  const user = firebase.auth().currentUser;
  database
    .ref(`users/${user.uid}/machines`)
    .once("value")
    .then(function (snapshot) {
      const machines = snapshot.val();
      const machineData = [];
      for (let mac in machines) {
        const { url, name } = machines[mac];
        machineData.push({ mac, url, name });
      }
      dispatch({
        type: "ADD_MACHINES",
        payload: machineData,
      });
      dispatch({
        type: "REMOVE_LOADING",
      });
    })
    .catch((err) => {
      dispatch({
        type: "SET_MESSAGE",
        payload: err.message || "Something went wrong",
      });
    });
};
