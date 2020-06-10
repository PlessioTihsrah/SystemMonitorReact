import React from "react";
import firebase from "firebase/app";
export default class ChangePassword extends React.Component {
  state = {
    show: false,
    oldPassword: "",
    newPassword: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { oldPassword, newPassword } = this.state;
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      oldPassword
    );
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        return user.updatePassword(newPassword);
      })
      .then(() => {
        alert("Password updated Successfully");
        this.setState({ show: false, oldPassword: "", newPassword: "" });
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { show, oldPassword, newPassword } = this.state;
    return (
      <div className="card">
        <div
          className="card-header"
          style={{ cursor: "pointer" }}
          onClick={() => this.setState({ show: !show })}
        >
          Change Password
        </div>
        {show && (
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <label
                  htmlFor="oldPassword"
                  className="col-sm-2 col-form-label"
                >
                  Old Password
                </label>
                <div className="col-sm-10">
                  <input
                    type="password"
                    className="form-control"
                    id="oldPassword"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="newPassword"
                  className="col-sm-2 col-form-label"
                >
                  New Password
                </label>
                <div className="col-sm-10">
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Change
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}
