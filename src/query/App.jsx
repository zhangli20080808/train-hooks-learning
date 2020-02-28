import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import Nav from '../common/Nav'
import List from './List'
import Bottom from './Bottom'

const propTypes = {};

const defaultProps = {};

function App(props) {
    return (
      <div>
          <Nav/>
          <List/>
          <Bottom/>
      </div>
    );
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default connect(
    function mapStateToProps(state) {
      return state;
    },
    function mapDispatchToProps(dispatch) {
      return { dispatch };
    }
  )(App);