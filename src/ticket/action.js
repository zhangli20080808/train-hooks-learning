import {h0} from '../common/until'
export const ACTION_SET_DEPARTDATE = "ACTION_SET_DEPARTDATE";
export const ACTION_SET_DEPARTSTATION = "ACTION_SET_DEPARTSTATION";
export const ACTION_SET_ARRIVESTATION = "ACTION_SET_ARRIVESTATION";
export const ACTION_SET_TRAINNUMBER = "ACTION_SET_TRAINNUMBER";
export const ACTION_SET_ISSCHEDULEVISIBLE = "ACTION_SET_ISSCHEDULEVISIBLE";
export const ACTION_SET_SEARCHPARSED = "ACTION_SET_SEARCHPARSED";
export const ACTION_SET_DETAIL = "ACTION_SET_DETAIL";


export function setDetail(detail) {
    return {
      type: ACTION_SET_DETAIL,
      payload: detail
    };
  }
export function setDepartDate(departDate) {
  return {
    type: ACTION_SET_DEPARTDATE,
    payload: departDate
  };
}
export function setDepartStation(departStation) {
  return {
    type: ACTION_SET_DEPARTSTATION,
    payload: departStation
  };
}
export function setArriveStation(arriveStation) {
  return {
    type: ACTION_SET_ARRIVESTATION,
    payload: arriveStation
  };
}
export function setTrainNumber(trainNumber) {
  return {
    type: ACTION_SET_TRAINNUMBER,
    payload: trainNumber
  };
}
export function setIsScheduleVisible(isScheduleVisible) {
  return {
    type: ACTION_SET_ISSCHEDULEVISIBLE,
    payload: isScheduleVisible
  };
}

export function toggleIsScheduleVisible() {
  return (dispatch, getState) => {
    const { isScheduleVisible } = getState();
    dispatch(setIsScheduleVisible(!isScheduleVisible));
  };
}


export function setSearchParsed(searchParsed) {
  return {
    type: ACTION_SET_SEARCHPARSED,
    payload: searchParsed
  };
}

export function nextDate() {
    return (dispatch, getState) => {
        const { departDate } = getState();

        dispatch(setDepartDate(h0(departDate) + 86400 * 1000));
    };
}
export function prevDate() {
    return (dispatch, getState) => {
        const { departDate } = getState();

        dispatch(setDepartDate(h0(departDate) - 86400 * 1000));
    };
}
