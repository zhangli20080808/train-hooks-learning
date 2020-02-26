/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo } from "react";
import { connect } from "react-redux";
import cls from "classnames";
import { bindActionCreators } from "redux";
import "./App.css";

import Header from "../common/Header";
import Journey from "./Journey";
import DepartDate from "./DepartDate";
import HighSpeed from "./HighSpeed";
import Submit from "./Submit";
import CitySelector from "../common/CitySelector";
import DateSelector from "../common/DateSelector";

import {h0} from '../common/until'

import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
  showDateSelector,
  hideDateSelector,
  setDepartDate
} from "./actions";

function App(props) {
  const {
    from,
    to,
    dispatch,
    isCitySelectorVisible,
    isDateSelectorVisible,
    isLoadingCityData,
    cityData,
    departDate
  } = props;
  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  const cbs = useMemo(() => {
    return bindActionCreators(
      {
        exchangeFromTo,
        showCitySelector
      },
      dispatch
    );
  }, []);

  const citySelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideCitySelector,
        fetchCityData,
        onSelect: setSelectedCity
      },
      dispatch
    );
  }, []);

  const departDateCbs = useMemo(() => {
    return bindActionCreators(
      {
        onClick: showDateSelector
        // onSelect: setSelectedDate
      },
      dispatch
    );
  }, []);

  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideDateSelector
      },
      dispatch
    );
  }, []);

  const onSelectDate = useCallback((day)=>{
    if(!day) return
    if(day<h0()) return
    dispatch(setDepartDate(day))
    dispatch(hideDateSelector())
  },[])
  return (
    <div>
      <div
        className={cls("header-wrapper", {
          hidden: isCitySelectorVisible || isDateSelectorVisible
        })}
      >
        <Header title="火车票" onBack={onBack} />
        <form action="./query.html" className="form">
          <Journey from={from} to={to} {...cbs} />
          <DepartDate time={departDate} {...departDateCbs} />
          <HighSpeed />
          <Submit />
        </form>
      </div>

      <CitySelector
        cityData={cityData}
        isLoading={isLoadingCityData}
        show={isCitySelectorVisible}
        {...citySelectorCbs}
      />
      <DateSelector time={departDate} onSelect={onSelectDate} show={isDateSelectorVisible} {...dateSelectorCbs} />
    </div>
  );
}

export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch };
  }
)(App);
