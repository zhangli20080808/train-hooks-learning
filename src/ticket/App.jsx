import React, { useEffect, useCallback, useMemo, Suspense, lazy } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import URI from "urijs";
import dayjs from "dayjs";
import {
  setDepartDate,
  setDepartStation,
  setArriveStation,
  setTrainNumber,
  setSearchParsed,
  setDetail,
  prevDate,
  nextDate,
  toggleIsScheduleVisible
} from "./action";

import { TrainContext } from "./context";

import { h0 } from "../common//until";
import Header from "../common/Header";
import Nav from "../common/Nav";
import Detail from "../common/Detail";
import Canidate from "./Candidate";
import useNav from "../common/useNav";
import { bindActionCreators } from "redux";

//返回一个promise
const Schedule = lazy(() => import("./Schedule.jsx"));

const propTypes = {};

const defaultProps = {};

function App(props) {
  const {
    detail,
    departDate,
    departStation,
    arriveStation,
    trainNumber,
    isScheduleVisible,
    searchParsed,
    dispatch
  } = props;

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    const { trainNumber, aStation, dStation, date } = queries;

    dispatch(setDepartStation(dStation));
    dispatch(setArriveStation(aStation));
    dispatch(setDepartDate(h0(dayjs(date).valueOf())));
    dispatch(setTrainNumber(trainNumber));
    dispatch(setSearchParsed(true));
  }, [dispatch]);

  useEffect(() => {
    document.title = trainNumber;
  }, [trainNumber]);

  useEffect(() => {
    if (!searchParsed) {
      return;
    }
    const url = new URI("/rest/ticket")
      .setSearch("date", dayjs(departDate).format("YYYY-MM-DD"))
      .setSearch("trainNumber", trainNumber)
      .toString();

    fetch(url)
      .then(res => res.json())
      .then(result => {
        dispatch(setDetail(result));
      });
  }, [departDate, dispatch, searchParsed, trainNumber]);

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  const { isPrevDisabled, isNextDisabled, prev, next } = useNav(
    departDate,
    dispatch,
    prevDate,
    nextDate
  );

  const detailCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggleIsScheduleVisible
      },
      dispatch
    );
  }, [dispatch]);

  if (!searchParsed) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="app">
        <div className="header-wrapper">
          <Header title={trainNumber} onBack={onBack} />
          <div className="nav-wrapper">
            <Nav
              date={departDate}
              isPrevDisabled={isPrevDisabled}
              isNextDisabled={isNextDisabled}
              prev={prev}
              next={next}
            />
          </div>
          <Detail
            {...detail}
            departDate={departDate}
            trainNumber={trainNumber}
            departStation={departStation}
            arriveStation={arriveStation}
            {...detailCbs}
          />
        </div>
        <TrainContext.Provider
          value={{ trainNumber, departStation, arriveStation, departDate }}
        >
          <Canidate tickets={detail.tickets} />
        </TrainContext.Provider>

        {isScheduleVisible && (
          <div
            className="mask"
            onClick={() => dispatch(toggleIsScheduleVisible())}
          >
            {/* Suspense 就是实现所谓的延迟加载效果，既然要实现延迟的效果，就必然
 要有一个提醒的组件，这就是它的属性fallback，这个属性当然可以是一个组件。
 这比我们以前去写一个一个的loading组件便捷的很多。但是这个组件有个确定，目前只支持组件的加载，对于网络数据的请求，暂不支持。 */}

            <Suspense fallback={<div>loading</div>}>
              <Schedule
                date={departDate}
                trainNumber={trainNumber}
                departStation={departStation}
                arriveStation={arriveStation}
              />
            </Suspense>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return {
      dispatch
    };
  }
)(App);
