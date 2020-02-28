import { createStore, combineReducers, applyMiddleware } from "redux";

import reducers from "./reducers";
import thunk from "redux-thunk";
import { h0 } from "../common/until";
import { ORDER_DEPART } from "./constants";

export default createStore(
  combineReducers(reducers),
  {
    // 业务状态
    from: null,
    to: null,
    departDate: h0(Date.now()),
    highSpeed: false,
    trainList: [],
    // 耗时
    orderType: ORDER_DEPART,
    // 只看有票
    onlyTickets: false,
    // 坐席类型
    ticketTypes: [],
    checkedTicketTypes: {},
    // 车次类型
    trainTypes: [],
    checkedTrainTypes: {},
    // 出发车站
    departStations: [],
    checkedDepartStations: {},
    // 到达车站
    arriveStation: [],
    checkedArriveStation: {},
    // 出发时间
    departTimeStart: 0,
    departTimeEnd: 24,
    // 到达时间
    arriveTimeStart: 0,
    arriveTimeEnd: 24,
    isFilterVisible: false,
    // 标识地址栏参数是否已经解析完成
    searchParsed: false
  },
  applyMiddleware(thunk)
);
