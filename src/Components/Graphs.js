import React from "react";
import LoadGraph from "./LoadGraph";
const Graphs = ({ cpuLoadData, temperatureData, freeMemData }) => {
  return (
    <div className="row">
      <div className="col-12 col-lg-4">
        <LoadGraph loadData={cpuLoadData} title="CPU Usage (Percentage)" />
      </div>
      {temperatureData && temperatureData[0] > 0 && (
        <div className="col-12 col-lg-4">
          <LoadGraph loadData={temperatureData} title="Temperature (Celsius)" />
        </div>
      )}
      <div className="col-12 col-lg-4">
        <LoadGraph loadData={freeMemData} title="RAM Usage (GB)" />
      </div>
    </div>
  );
};
export default Graphs;
