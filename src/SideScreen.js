import React from "react";
import MachineMonitor from "./Components/MachineMonitor";
import { connect } from "react-redux";
import { logout } from "./ReduxStore/actions/authActions";
import { getMachines } from "./ReduxStore/actions/machineActions";
import { setLoading, removeLoading } from "./ReduxStore/actions/uxActions";
import { sendEmailVerification } from "./ReduxStore/actions/authActions";
import ChangePassword from "./Components/ChangePassword";

const SideScreen = ({
  machineData,
  user,
  machines,
  logout,
  getMachines,
  loading,
  setLoading,
  sendEmailVerification,
  message,
}) => {
  if (machineData.name === "Dashboard") {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2">
            <div className="card rounded-top">
              <div className="card-header h4 text-center bg-primary text-light rounded-top">
                User Profile
              </div>
              <div className="card-body ">
                <div className="card-title text-center">
                  <h5>Email: {user.email}</h5>
                  <button className="btn btn-danger mr-2" onClick={logout}>
                    Logout
                  </button>
                  <a
                    href="https://sourceforge.net/projects/realtimesystemmonitor/files"
                    className="btn btn-success"
                    target="_blank"
                  >
                    Download Desktop App
                  </a>
                </div>
                <ChangePassword />
                <hr />
                {!user.emailVerified && (
                  <div className="card-title">
                    <h2 className="text-center">Please Verify Email</h2>
                    <div className="text-center">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setLoading();
                          sendEmailVerification();
                        }}
                      >
                        Resend Verification Email
                      </button>
                      <div>{message}</div>
                    </div>
                  </div>
                )}
                {user.emailVerified && (
                  <div className="card-title">
                    <h2 className="text-center">Machines</h2>
                    <ol>
                      {machines.slice(1).map((machine) => (
                        <li key={machine.mac}>{machine.name}</li>
                      ))}
                    </ol>
                    <div className="text-center">
                      {!loading && (
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setLoading();
                            getMachines(user.token);
                          }}
                        >
                          Refresh
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else return <MachineMonitor url={machineData.url} />;
};

const mapStateToProps = (state) => {
  return {
    machineData: state.machines[state.page],
    machines: state.machines,
    user: state.user,
    loading: state.ux.loading,
    message: state.ux.message,
  };
};

export default connect(mapStateToProps, {
  logout,
  getMachines,
  setLoading,
  removeLoading,
  sendEmailVerification,
})(SideScreen);
