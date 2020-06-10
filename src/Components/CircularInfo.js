import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularInfo = ({ cpuLoad, temperature, memoryUsage }) => {
  return (
    <div className="row my-4">
      <div className="col-4 col-lg-2 offset-md-1">
        <CircularProgressbar
          value={cpuLoad}
          minValue={0}
          maxValue={100}
          text={`${cpuLoad.toFixed(2)}%`}
          styles={buildStyles({
            pathColor: "#593196",
            textColor: "#593196",
            trailColor: "#d6d6d6",
          })}
        />
        <h5 className="text-center mt-1">CPU</h5>
      </div>
      <div className="col-4 col-lg-2 offset-md-2">
        <CircularProgressbar
          value={temperature}
          minValue={0}
          maxValue={120}
          text={`${temperature}° C`}
          styles={buildStyles({
            pathColor: "#593196",
            textColor: "#593196",
            trailColor: "#d6d6d6",
          })}
        />
        <h5 className="text-center mt-1">CPU Temp</h5>
      </div>
      <div className="col-4 col-lg-2  offset-lg-2">
        <CircularProgressbar
          value={memoryUsage}
          minValue={0}
          maxValue={100}
          text={`${memoryUsage.toFixed(2)}%`}
          styles={buildStyles({
            pathColor: "#593196",
            textColor: "#593196",
            trailColor: "#d6d6d6",
          })}
        />
        <h5 className="text-center mt-1">Memory</h5>
      </div>
    </div>
  );
};

export default CircularInfo;
