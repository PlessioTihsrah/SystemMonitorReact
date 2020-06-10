import React from "react";

import Login from "./Login";
import Dashboard from "./Dashboard";
import { connect } from "react-redux";
import { login, logout } from "./ReduxStore/actions/authActions";
import { removeLoading } from "./ReduxStore/actions/uxActions";
import firebase from "firebase/app";

class App extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { email, emailVerified } = user;
        this.props.login({ email, emailVerified });
        this.props.removeLoading();
      } else {
        this.props.logout();
      }
    });
  }

  render() {
    switch (this.props.user.login) {
      case true:
        return <Dashboard verified={this.props.user.emailVerified} />;
      case false:
        return <Login />;
      default:
        return <div className="text-center h1 mt-5">Loading...</div>;
    }
  }
}
const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, {
  login,
  logout,
  removeLoading,
})(App);
