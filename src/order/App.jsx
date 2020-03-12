import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const propTypes = {};

const defaultProps = {};

function App(props) {
  return <React.Fragment></React.Fragment>;
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default connect(
  function mapStateToProps(state) {},
  function mapDispatchToProps(dispatch) {}
)(App);
