import React from "react";

const UserInfo = ({ users }) => {
  return (
    <div className="card">
      <div className="card-header bg-primary text-light rounded-top">
        Users Logged In
      </div>
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Login</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.name}>
              <td>{user.name}</td>
              <td>{user.login}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserInfo;
