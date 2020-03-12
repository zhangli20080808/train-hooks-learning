import {
  ACTION_SET_DEPARTDATE,
  ACTION_SET_DEPARTSTATION,
  ACTION_SET_ARRIVESTATION,
  ACTION_SET_TRAINNUMBER,
  ACTION_SET_ISSCHEDULEVISIBLE,
  ACTION_SET_SEARCHPARSED,
  ACTION_SET_DETAIL
} from "./action";

const filterDetail = result => {
  const {
    detail: { departTimeStr, arriveTimeStr, arriveDate, durationStr },
    candidates
  } = result;
  return {
    departTimeStr,
    arriveTimeStr,
    arriveDate,
    durationStr,
    tickets: candidates
  };
};

export default {
  detail(state = {}, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_DETAIL:
        return { ...filterDetail(payload) };
      default:
    }
    return state;
  },

  departDate(state = Date.now(), action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_DEPARTDATE:
        return payload;
      default:
    }
    return state;
  },
  departStation(state = null, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_DEPARTSTATION:
        return payload;
      default:
    }
    return state;
  },
  arriveStation(state = null, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_ARRIVESTATION:
        return payload;
      default:
    }
    return state;
  },
  trainNumber(state = null, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_TRAINNUMBER:
        return payload;
      default:
    }
    return state;
  },
  isScheduleVisible(state = false, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_ISSCHEDULEVISIBLE:
        return payload;
      default:
    }
    return state;
  },
  searchParsed(state = false, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_SEARCHPARSED:
        return payload;
      default:
    }
    return state;
  }
};
