import React from "react";
import { connect } from "react-redux";
import { setPage } from "./ReduxStore/actions/pageActions";
class Header extends React.Component {
  state = {
    open: false,
  };

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  getNavbarClass = () => {
    if (this.state.open) {
      return "collapse navbar-collapse show";
    } else {
      return "collapse navbar-collapse";
    }
  };
  render() {
    const { machines, page, setPage } = this.props;
    return (
      <nav className="navbar d-md-none navbar-dark bg-primary">
        <span className="navbar-brand">{machines[page].name}</span>
        <button
          className="navbar-toggler"
          type="button"
          onClick={this.toggleOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={this.getNavbarClass()} id="navbarNav">
          <ul className="navbar-nav">
            {machines.map((panel, i) => (
              <li
                key={panel.mac}
                className="nav-item"
                onClick={() => {
                  this.toggleOpen();
                  setPage(i);
                }}
              >
                <span className="nav-link">{panel.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    page: state.page,
    machines: state.machines,
  };
};
export default connect(mapStateToProps, { setPage })(Header);
