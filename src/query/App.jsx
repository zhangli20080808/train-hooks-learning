import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Nav from "../common/Nav";
import List from "./List";
import Bottom from "./Bottom";
import Header from "../common/Header";
import URI from "urijs";
import dayjs from "dayjs";

import { h0 } from "../common/until";
// 获取参数 相当于操作了组件之外的东西 是个副作用

import {
  setFrom,
  setTo,
  setHighSpeed,
  setDepartDate,
  setSearchParsed,
  setTrainList,
  setTicketTypes,
  setTrainTypes,
  setArriveStation,
  setDepartStations
} from "./action";
const propTypes = {};

const defaultProps = {};

function App(props) {
  const {
    from,
    to,
    searchParsed,
    highSpeed,
    departDate,
    dispatch,
    orderType,
    onlyTickets,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStation,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd
  } = props;
  const onBack = useCallback(() => {
    window.history.back();
  }, []);
  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    const { from, to, highSpeed, date } = queries;
    dispatch(setFrom(from));
    dispatch(setTo(to));
    dispatch(setHighSpeed(highSpeed === "true"));
    dispatch(setDepartDate(dayjs(h0(dayjs(date).valueOf()))));
    dispatch(setSearchParsed(true));
  }, [dispatch]);

  useEffect(() => {
    if (!searchParsed) {
      return;
    }
    //请求的参数作为我们副作用的依赖
    const url = new URI("/rest/query")
      .setSearch("from", from)
      .setSearch("to", to)
      .setSearch(
        "date",
        dayjs(departDate)
          .format("YYYY-MM-DD")
          .valueOf()
      )
      .setSearch("highSpeed", highSpeed)
      .setSearch("orderType", orderType)
      .setSearch("onlyTickets", onlyTickets)
      .setSearch("checkedTicketTypes", Object.keys(checkedTicketTypes).join())
      .setSearch("checkedTrainTypes", Object.keys(checkedTrainTypes).join())
      .setSearch(
        "checkedDepartStations",
        Object.keys(checkedDepartStations).join()
      )
      .setSearch(
        "checkedArriveStation",
        Object.keys(checkedArriveStation).join()
      )
      .setSearch("departTimeStart", departTimeStart)
      .setSearch("departTimeEnd", departTimeEnd)
      .setSearch("arriveTimeStart", arriveTimeStart)
      .setSearch("arriveTimeEnd", arriveTimeEnd)
      .toString(); //返回字符串型形式的url

    fetch(url)
      .then(response => response.json())
      .then(
        result => {
          const {
            dataMap: {
              directTrainInfo: {
                trains = [],
                filter: { ticketType, trainType, depStation, arrStation }
              }
            }
          } = result;
          dispatch(setTrainList(trains));
          dispatch(setTicketTypes(ticketType));
          dispatch(setTrainTypes(trainType));
          dispatch(setArriveStation(arrStation));
          dispatch(setDepartStations(depStation));
        },
        [
          from,
          to,
          departDate,
          highSpeed,
          orderType,
          onlyTickets,
          checkedTicketTypes,
          checkedTrainTypes,
          checkedDepartStations,
          checkedArriveStation,
          departTimeStart,
          departTimeEnd,
          arriveTimeStart,
          arriveTimeEnd,
          searchParsed
        ]
      );
  });

  if (!searchParsed) {
    return null;
  }
  return (
    <div>
      <div className="header-wraper">
        <Header title={`${from} ⇀ ${to}`} onBack={onBack} />
      </div>
      <Nav />
      <List />
      <Bottom />
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
