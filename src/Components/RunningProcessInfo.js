import React from "react";
const RunningProcessInfo = ({ processes }) => {
  return (
    <div className="card my-2">
      <div className="card-header bg-primary text-light rounded-top">
        Running Processes
      </div>
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th>Process Id</th>
            <th>Name</th>
            <th>State</th>
            <th>Memory Used(MB)</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((process) => (
            <tr key={process.pid}>
              <td>{process.pid}</td>
              <td>{process.name}</td>
              <td>{process.state}</td>
              <td>{process.mem.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RunningProcessInfo;
