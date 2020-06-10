import React from "react";
import MachineData from "./MachineData";
import CircularInfo from "./CircularInfo";
import Graphs from "./Graphs";
import UserInfo from "./UserInfo";
import RunningProcessInfo from "./RunningProcessInfo";
import io from "socket.io-client";
import { connect } from "react-redux";
import CryptoJS from "crypto-js";
import firebase from "firebase/app";
import {
  setDynamicData,
  setStaticData,
  resetMonitorData,
} from "../ReduxStore/actions/monitorActions";
class MachineMonitor extends React.Component {
  state = {
    connected: null,
  };
  componentDidMount() {
    const { fingerprint, machine } = this.props;
    const uid = firebase.auth().currentUser.uid;
    const databaseRef = firebase
      .database()
      .ref(`users/${uid}/machines/${machine.mac}`);
    databaseRef.update(
      {
        auth: {
          requester: fingerprint,
          time: firebase.database.ServerValue.TIMESTAMP,
        },
      },
      (err) => {
        if (err) {
          this.setState({ connected: false });
        } else {
          this.socket = io.connect(this.props.url, {
            query: `requester=${fingerprint}`,
          });
          this.socket.on("connect_error", () => {
            this.setState({ connected: false });
          });
          this.socket.on("disconnect", () => {
            this.setState({ connected: false });
          });
          this.socket.on("data", (data) => {
            const decryptedData = this.decryptData(data, fingerprint);
            this.props.setDynamicData(decryptedData);
          });
          this.socket.on("systemData", (data) => {
            const decryptedData = this.decryptData(data, fingerprint);
            this.props.setStaticData(decryptedData);
            this.setState({ connected: true });
          });
        }
      }
    );
  }
  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.props.resetMonitorData();
  }

  decryptData = (data, token) => {
    const bytes = CryptoJS.AES.decrypt(data, token);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };
  render() {
    const { machineData } = this.props;
    if (this.state.connected) {
      return (
        <div>
          <MachineData />
          <CircularInfo
            cpuLoad={machineData.cpuLoad}
            memoryUsage={machineData.memUsage}
            temperature={machineData.temperature}
          />
          <Graphs
            freeMemData={machineData.freeMemData}
            cpuLoadData={machineData.cpuLoadData}
            temperatureData={machineData.temperatureData}
          />
          <UserInfo users={machineData.users} />
          <RunningProcessInfo processes={machineData.processes} />
        </div>
      );
    } else if (this.state.connected === false) {
      return (
        <div className="alert alert-danger mt-1" role="alert">
          Connection cannot be established. Refresh machines and try again
          later.
        </div>
      );
    } else {
      return (
        <>
          <h2 className="text-center mt-5">Establishing Connection...</h2>
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    machineData: state.monitorData,
    fingerprint: state.user.fingerprint,
    machine: state.machines[state.page],
  };
};
export default connect(mapStateToProps, {
  setDynamicData,
  setStaticData,
  resetMonitorData,
})(MachineMonitor);
