import { createStore, combineReducers, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";

export default createStore(
  combineReducers(reducers),
  {
    // 出发日期 到达日期 出发车站 到达车站
    detail: {
      arriveDate: Date.now(),
      departTimeStr: null,
      arriveTimeStr: null,
      durationStr: null,
      tickets: []
    },

    departDate: Date.now(),
    departStation: null,
    arriveStation: null,
    trainNumber: null,

    isScheduleVisible: false,
    searchParsed: false
  },

  applyMiddleware(thunk)
);
