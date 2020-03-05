import { ORDER_DEPART, ORDER_DURATION } from "./constants";
import { h0 } from "../common/until";

export const ACTION_SET_FROM = "ACTION_SET_FROM";
export const ACTION_SET_TO = "ACTION_SET_TO";
export const ACTION_SET_DEPARTDATE = "ACTION_SET_DEPARTDATE";
export const ACTION_SET_HIGHSPEED = "ACTION_SET_HIGHSPEED";
export const ACTION_SET_TRAINLIST = "ACTION_SET_TRAINLIST";
export const ACTION_SET_ORDERTYPE = "ACTION_SET_ORDERTYPE";
export const ACTION_SET_ONLYTICKETS = "ACTION_SET_ONLYTICKETS";
export const ACTION_SET_TICKET_TYPES = "ACTION_SET_TICKET_TYPES";
export const ACTION_SET_CHECKEDTICKET_TYPES = "ACTION_SET_CHECKEDTICKET_TYPES";
export const ACTION_SET_TRAIN_TYPES = "ACTION_SET_TRAIN_TYPES";
export const ACTION_SET_CHECKEDTRAIN_TYPES = "ACTION_SET_CHECKEDTRAIN_TYPES";
export const ACTION_SET_DEPARTSTATIONS = "ACTION_SET_DEPARTSTATIONS";
export const ACTION_SET_CHECKEDDEPARTSTATIONS =
  "ACTION_SET_CHECKEDDEPARTSTATIONS";
export const ACTION_SET_ARRIVESTATION = "ACTION_SET_ARRIVESTATION";
export const ACTION_SET_CHECKEDARRIVESTATION =
  "ACTION_SET_CHECKEDARRIVESTATION";
export const ACTION_SET_DEPARTTIMESTART = "ACTION_SET_DEPARTTIMESTART";
export const ACTION_SET_DEPARTTIMEEND = "ACTION_SET_DEPARTTIMEEND";
export const ACTION_SET_ARRIVETIMESTART = "ACTION_SET_ARRIVETIMESTART";
export const ACTION_SET_ARRIVETIMEEND = "ACTION_SET_ARRIVETIMEEND";
export const ACTION_SET_ISFILTERVISIBLE = "ACTION_SET_ISFILTERVISIBLE";
export const ACTION_SET_SEARCHPARSED = "ACTION_SET_SEARCHPARSED";

export function setFrom(from) {
  return {
    type: ACTION_SET_FROM,
    payload: from
  };
}
export function setTo(to) {
  return {
    type: ACTION_SET_TO,
    payload: to
  };
}
export function setDepartDate(departDate) {
  return {
    type: ACTION_SET_DEPARTDATE,
    payload: departDate
  };
}
export function setHighSpeed(highSpeed) {
  return {
    type: ACTION_SET_HIGHSPEED,
    payload: highSpeed
  };
}

export function toggleHighSpeed() {
  return (dispatch, getState) => {
    const { highSpeed } = getState();
    dispatch(setHighSpeed(!highSpeed));
  };
}

export function setTrainList(trainList) {
  return {
    type: ACTION_SET_TRAINLIST,
    payload: trainList
  };
}
export function toggleOrderType() {
  return (dispatch, getState) => {
    const { orderType } = getState();
    if (orderType === ORDER_DEPART) {
      dispatch({
        tyep: ACTION_SET_ORDERTYPE,
        payload: ORDER_DURATION
      });
    } else {
      dispatch({
        type: ACTION_SET_ORDERTYPE,
        payload: orderType
      });
    }
  };
}
export function toggleOnlyTickets() {
  return (dispatch, getState) => {
    const { onlyTickets } = getState();
    dispatch({
      type: ACTION_SET_ONLYTICKETS,
      payload: !onlyTickets
    });
  };
}

export function setTicketTypes(ticketTypes) {
  return {
    type: ACTION_SET_TICKET_TYPES,
    payload: ticketTypes
  };
}
export function setCheckedTicketTypes(checkedTicketTypes) {
  return {
    type: ACTION_SET_CHECKEDTICKET_TYPES,
    payload: checkedTicketTypes
  };
}
export function setTrainTypes(trainTypes) {
  return {
    type: ACTION_SET_TRAIN_TYPES,
    payload: trainTypes
  };
}
export function setCheckedTrainTypes(checkedTrainTypes) {
  return {
    type: ACTION_SET_CHECKEDTICKET_TYPES,
    payload: checkedTrainTypes
  };
}
export function setDepartStations(departStations) {
  return {
    type: ACTION_SET_DEPARTSTATIONS,
    payload: departStations
  };
}
export function setCheckedDepartStations(checkedDepartStations) {
  return {
    type: ACTION_SET_CHECKEDDEPARTSTATIONS,
    payload: checkedDepartStations
  };
}
export function setArriveStation(arriveStation) {
  return {
    type: ACTION_SET_ARRIVESTATION,
    payload: arriveStation
  };
}
export function setCheckedArriveStation(checkedArriveStation) {
  return {
    type: ACTION_SET_CHECKEDARRIVESTATION,
    payload: checkedArriveStation
  };
}
export function setDepartTimeStart(departTimeStart) {
  return {
    type: ACTION_SET_DEPARTTIMESTART,
    payload: departTimeStart
  };
}
export function setDepartTimeEnd(departTimeEnd) {
  return {
    type: ACTION_SET_DEPARTTIMEEND,
    payload: departTimeEnd
  };
}
export function setArriveTimeStart(arriveTimeStart) {
  return {
    type: ACTION_SET_ARRIVETIMESTART,
    payload: arriveTimeStart
  };
}
export function setArriveTimeEnd(arriveTimeEnd) {
  return {
    type: ACTION_SET_ARRIVETIMEEND,
    payload: arriveTimeEnd
  };
}
export function setIsFilterVisible() {
  return (dispatch, getState) => {
    const { isFilterVisible } = getState();
    dispatch({
      type: ACTION_SET_ISFILTERVISIBLE,
      payload: !isFilterVisible
    });
  };
}
export function setSearchParsed(searchParsed) {
  return {
    type: ACTION_SET_SEARCHPARSED,
    payload: searchParsed
  };
}

//前一天
export function preDay() {
  return (dispatch, getState) => {
    const { departDate } = getState();
    dispatch(setDepartDate(h0(departDate) - 60 * 60 * 1000 * 24));
  };
}

//后一天
export function nextDay() {
  return (dispatch, getState) => {
    const { departDate } = getState();
    dispatch(setDepartDate(h0(departDate) + 60 * 60 * 1000 * 24));
  };
}
