import React from "react";

const DashboardCard = ({ title, subTitle, content }) => {
  let src;
  if (title.toLowerCase().includes("intel")) {
    src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Intel-logo.svg/248px-Intel-logo.svg.png";
  } else if (title.toLowerCase().includes("amd")) {
    src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/AMD_Logo.svg/330px-AMD_Logo.svg.png";
  } else if (title.toLowerCase().includes("nvidia")) {
    src =
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/Nvidia_image_logo.svg/300px-Nvidia_image_logo.svg.png";
  }
  return (
    <div className="col-12 col-lg mt-1">
      <div className="card" style={{ height: "128px" }}>
        <div className="card-body">
          <h5 className="card-title">{title.slice(0, 30)}</h5>
          <div className="row">
            <div className="col-9">
              <h6 className="card-subtitle mb-2 text-muted">{subTitle}</h6>
            </div>
            <div className="col-3">
              <img className="img-fluid" src={src} alt="" />
            </div>
          </div>

          <p className="card-text">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
