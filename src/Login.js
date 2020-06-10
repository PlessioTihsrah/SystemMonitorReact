import React from "react";
import { connect } from "react-redux";
import {
  removeLoading,
  removeMessage,
  setLoading,
  setMessage,
} from "./ReduxStore/actions/uxActions";

import { auth } from "./ReduxStore/actions/authActions";
import firebase from "firebase/app";
class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };
  handleAuth = (type) => {
    if (!this.checkValidity()) {
      this.props.setMessage("Invalid Inputs");
    } else {
      this.props.setLoading();
      const { email, password } = this.state;
      this.props.auth(email, password, type);
    }
  };

  resetPass = () => {
    this.props.setLoading();
    if (!this.emailRef.checkValidity()) {
      this.props.setMessage("Invalid Email");
    } else {
      const { email } = this.state;
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          this.props.setMessage("Reset Mail Sent");
        })
        .catch((e) => {
          this.props.setMessage(e.message);
        });
    }
  };

  checkValidity = () => {
    return this.emailRef.checkValidity() && this.passwordRef.checkValidity();
  };

  handleChange = (e) => {
    this.setState(
      { [e.target.name]: e.target.value },
      this.props.removeMessage
    );
  };
  render() {
    return (
      <div className="container mt-5">
        <div className="col-12 col-md-6 offset-md-3">
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              value={this.state.email}
              name="email"
              onChange={this.handleChange}
              required
              ref={(ref) => {
                if (!this.emailRef) {
                  this.emailRef = ref;
                }
              }}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              name="password"
              onChange={this.handleChange}
              required
              ref={(ref) => {
                if (!this.passwordRef) {
                  this.passwordRef = ref;
                }
              }}
            />
          </div>
          <div className="text-danger text-center mb-2">
            {this.props.message}
          </div>
          {!this.props.loading && (
            <div className="row">
              <div className="col-12 col-md mt-1">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => this.handleAuth("login")}
                >
                  Login
                </button>
              </div>
              <div className="col-12 col-md mt-1">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => this.handleAuth("signup")}
                >
                  Signup
                </button>
              </div>
              <div className="col-12 col-md mt-1">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={this.resetPass}
                >
                  Reset Password
                </button>
              </div>
            </div>
          )}

          {this.props.loading && (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { message, loading } = state.ux;
  return {
    message,
    loading,
  };
};
export default connect(mapStateToProps, {
  setLoading,
  removeLoading,
  setMessage,
  removeMessage,
  auth,
})(Login);
