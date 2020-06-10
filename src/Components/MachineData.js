import React from "react";
import DashboardCard from "./DashboardCard";
import { connect } from "react-redux";

const MachineData = (props) => {
  return (
    <div className="row">
      <DashboardCard
        title={props.manufacturer}
        subTitle={props.model}
        content={`${props.platform} ${props.distro} ${props.release}`}
        width={3}
      />
      <DashboardCard
        title={`${props.cpuManufacturer} ${props.cpuBrand}`}
        subTitle={`${props.physicalCores} Cores, ${props.threads} Threads`}
        content={`Clock Speed Min ${props.cpuMinSpeed} Max ${props.cpuMaxSpeed}`}
      />
      {props.graphics.map((graphicCard, i) => (
        <DashboardCard
          key={graphicCard.model + i}
          title={`${graphicCard.vendor}`}
          subTitle={`${graphicCard.model}`}
          content={`${graphicCard.bus}, Memory: ${graphicCard.vram}`}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    manufacturer,
    model,
    cpuManufacturer,
    cpuBrand,
    threads,
    physicalCores,
    cpuMaxSpeed,
    cpuMinSpeed,
    platform,
    distro,
    release,
    kernel,
    arch,
    deviceName,
    graphics,
  } = state.monitorData;
  return {
    manufacturer,
    model,
    cpuManufacturer,
    cpuBrand,
    threads,
    physicalCores,
    cpuMaxSpeed,
    cpuMinSpeed,
    platform,
    distro,
    release,
    kernel,
    arch,
    deviceName,
    graphics,
  };
};
export default connect(mapStateToProps)(MachineData);
