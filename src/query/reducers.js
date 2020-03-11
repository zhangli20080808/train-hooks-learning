import {
  ACTION_SET_FROM,
  ACTION_SET_TO,
  ACTION_SET_DEPARTDATE,
  ACTION_SET_HIGHSPEED,
  ACTION_SET_TRAINLIST,
  ACTION_SET_ORDERTYPE,
  ACTION_SET_ONLYTICKETS,
  ACTION_SET_TICKET_TYPES,
  ACTION_SET_CHECKEDTICKET_TYPES,
  ACTION_SET_TRAIN_TYPES,
  ACTION_SET_CHECKEDTRAIN_TYPES,
  ACTION_SET_DEPARTSTATIONS,
  ACTION_SET_CHECKEDDEPARTSTATIONS,
  ACTION_SET_ARRIVESTATION,
  ACTION_SET_CHECKEDARRIVESTATION,
  ACTION_SET_DEPARTTIMESTART,
  ACTION_SET_DEPARTTIMEEND,
  ACTION_SET_ARRIVETIMESTART,
  ACTION_SET_ARRIVETIMEEND,
  ACTION_SET_ISFILTERVISIBLE,
  ACTION_SET_SEARCHPARSED
} from "./action";

import { ORDER_DEPART } from "./constants";

export default {
  from(state = null, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_FROM:
        return payload;
      default:
    }
    return state;
  },
  to(state = null, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_TO:
        return payload;
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
  highSpeed(state = false, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_HIGHSPEED:
        return payload;

      case ACTION_SET_CHECKEDTRAIN_TYPES:
        const checkedTypes = payload;
        return Boolean(checkedTypes[1] && checkedTypes[5]);
      default:
    }
    return state;
  },
  trainList(state = [], action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_TRAINLIST:
        return payload;
      default:
    }
    return state;
  },
  orderType(state = ORDER_DEPART, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_ORDERTYPE:
        return payload;
      default:
    }
    return state;
  },
  onlyTickets(state = false, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_ONLYTICKETS:
        return payload;
      default:
    }
    return state;
  },
  ticketTypes(state = [], action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_TICKET_TYPES:
        return payload;
      default:
    }
    return state;
  },
  checkedTicketTypes(state = {}, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_CHECKEDTICKET_TYPES:
        return payload;
      default:
    }
    return state;
  },
  trainTypes(state = [], action) {
    const { type, payload } = action;

    switch (type) {
      case ACTION_SET_TRAIN_TYPES:
        return payload;
      default:
    }
    return state;
  },
  checkedTrainTypes(state = {}, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_CHECKEDTRAIN_TYPES:
        return payload;
      case ACTION_SET_HIGHSPEED:
        const highSpeed = payload;
        const newCheckedTrainTypes = { ...state };
        if (highSpeed) {
          newCheckedTrainTypes[1] = true;
          newCheckedTrainTypes[5] = true;
        } else {
          delete newCheckedTrainTypes[1];
          delete newCheckedTrainTypes[5];
        }
        return newCheckedTrainTypes;
      default:
    }
    return state;
  },
  departStations(state = [], action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_DEPARTSTATIONS:
        return payload;
      default:
    }
    return state;
  },
  checkedDepartStations(state = {}, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_CHECKEDDEPARTSTATIONS:
        return payload;
      default:
    }
    return state;
  },
  arriveStation(state = [], action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_ARRIVESTATION:
        return payload;
      default:
    }
    return state;
  },
  checkedArriveStation(state = {}, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_CHECKEDARRIVESTATION:
        return payload;
      default:
    }
    return state;
  },
  departTimeStart(state = 0, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_DEPARTTIMESTART:
        return payload;
      default:
    }
    return state;
  },
  departTimeEnd(state = 24, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_DEPARTTIMEEND:
        return payload;
      default:
    }
    return state;
  },
  arriveTimeStart(state = 0, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_ARRIVETIMESTART:
        return payload;
      default:
    }
    return state;
  },
  arriveTimeEnd(state = 24, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_ARRIVETIMEEND:
        return payload;
      default:
    }
    return state;
  },
  isFilterVisible(state = false, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_ISFILTERVISIBLE:
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
