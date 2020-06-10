import React from "react";
import { connect } from "react-redux";
import { setPage } from "./ReduxStore/actions/pageActions";

const getPanel = (machines, page, setPage) => {
  return machines.map(({ mac, name }, i) => {
    if (i === page) {
      return (
        <button
          className="btn btn-block btn-light button-active my-3"
          key={mac}
        >
          {name}
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-block btn-primary my-3"
          key={mac}
          onClick={() => {
            setPage(i);
          }}
        >
          {name}
        </button>
      );
    }
  });
};
const SidePanel = ({ machines, page, setPage }) => {
  return (
    <>
      <div
        className="d-none d-md-block col-md-2 bg-primary"
        style={{ minHeight: "100vh" }}
      >
        {getPanel(machines, page, setPage)}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    page: state.page,
    machines: state.machines,
  };
};
export default connect(mapStateToProps, { setPage })(SidePanel);
