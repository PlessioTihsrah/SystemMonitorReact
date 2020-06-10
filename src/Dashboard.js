import React from "react";

import SidePanel from "./SidePanel";
import SideScreen from "./SideScreen";
import Header from "./Header";
import Fingerprint2 from "fingerprintjs2";
import { connect } from "react-redux";
import { setFingerprint } from "./ReduxStore/actions/authActions";
import { getMachines } from "./ReduxStore/actions/machineActions";
class Dashboard extends React.Component {
  componentDidMount() {
    Fingerprint2.get(this.props.setFingerprint);
    this.props.getMachines(this.props.token);
  }

  render() {
    return (
      <>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <SidePanel />
            <div className="col-12 col-md-10 mt-3">
              <SideScreen />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(null, { getMachines, setFingerprint })(Dashboard);
