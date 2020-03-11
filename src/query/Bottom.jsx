import React, { memo, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { ORDER_DEPART } from "./constants";
import ctx from "classnames";
import "./Bottom.css";

const propTypes = {};

const defaultProps = {};

const Filter = memo(function Filter(props) {
  const { name, checked, toggle, value } = props;
  return (
    <li onClick={() => toggle(value)} className={ctx({ checked })}>
      {name}
    </li>
  );
});

const Option = memo(function Option(props) {
  const { title, options, checkedMap = {}, update } = props;
  const toggle = useCallback(
    value => {
      const newCheckMap = { ...checkedMap };
      if (value in checkedMap) {
        delete newCheckMap[value];
      } else {
        newCheckMap[value] = true;
      }
      update(newCheckMap);
    },
    [checkedMap, update]
  );
  return (
    <div className="option">
      <h3>{title}</h3>
      <ul>
        {options.map(option => {
          return (
            <Filter
              key={option.value}
              {...option}
              toggle={toggle}
              checked={option.value in checkedMap}
            />
          );
        })}
      </ul>
    </div>
  );
});

Option.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  checkedMap: PropTypes.object,
  update: PropTypes.func
};

const BottomModal = memo(function BottomModal(props) {
  const {
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStation,
    ticketTypes,
    trainTypes,
    departStations,
    arriveStation,

    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStation,
    toggleIsFilterVisible
  } = props;

  //创建四个类型的值  延迟初始化state 函数 第一次初始化的时候执行
  const [localCheckedTicketTypes, setLocalCheckedTicketTypes] = useState(() => {
    return {
      ...checkedTicketTypes
    };
  });
  const [localCheckedTrainTypes, setLocalCheckedTrainTypes] = useState(() => {
    return {
      ...checkedTrainTypes
    };
  });
  const [localCheckedDepartStations, setLocalCheckedDepartStations] = useState(
    () => {
      return {
        ...checkedDepartStations
      };
    }
  );
  const [localCheckedArriveStation, setLocalCheckedArriveStation] = useState(
    () => {
      return {
        ...checkedArriveStation
      };
    }
  );

  //数据结构  设置缓存区  利用 state
  const optionGroup = [
    {
      title: "坐席类型",
      options: ticketTypes,
      checkedMap: localCheckedTicketTypes,
      update: setLocalCheckedTicketTypes
    },
    {
      title: "车次类型",
      options: trainTypes,
      checkedMap: localCheckedTrainTypes,
      update: setLocalCheckedTrainTypes
    },
    {
      title: "出发车站",
      options: departStations,
      checkedMap: localCheckedDepartStations,
      update: setLocalCheckedDepartStations
    },
    {
      title: "到达车站",
      options: arriveStation,
      checkedMap: localCheckedArriveStation,
      update: setLocalCheckedArriveStation
    }
  ];

  // 是否可以重置
  const isResetDisabled = useMemo(() => {
    return (
      Object.keys(localCheckedTicketTypes).length === 0 &&
      Object.keys(localCheckedTrainTypes).length === 0 &&
      Object.keys(localCheckedDepartStations).length === 0 &&
      Object.keys(localCheckedArriveStation).length === 0
    );
  }, [
    localCheckedArriveStation,
    localCheckedDepartStations,
    localCheckedTicketTypes,
    localCheckedTrainTypes
  ]);

  const sure = () => {
    setCheckedTicketTypes(localCheckedTicketTypes);
    setCheckedTrainTypes(localCheckedTrainTypes);
    setCheckedDepartStations(localCheckedDepartStations);
    setCheckedArriveStation(localCheckedArriveStation);
    toggleIsFilterVisible();
  };

  const reset = () => {
    if (isResetDisabled) {
      return;
    }
    setLocalCheckedTicketTypes({});
    setLocalCheckedTrainTypes({});
    setLocalCheckedDepartStations({});
    setLocalCheckedArriveStation({});
  };

  return (
    <div className="bottom-modal">
      <div className="bottom-dialog">
        <div className="bottom-dialog-content">
          <div className="title">
            <span
              className={ctx("reset", {
                disabled: isResetDisabled
              })}
              onClick={reset}
            >
              重置
            </span>
            <span className="ok" onClick={sure}>
              确定
            </span>
          </div>
          <div className="options">
            {optionGroup.map(item => {
              return <Option key={item.title} {...item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default function Bottom(props) {
  const {
    highSpeed,
    orderType,
    onlyTickets,
    toggleOrderType,
    toggleHighSpeed,
    toggleOnlyTickets,
    toggleIsFilterVisible,
    isFilterVisible,
    ticketTypes,
    trainTypes,
    departStations,
    arriveStation,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStation,
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStation
  } = props;

  // 是否可以重置
  const noChecked = useMemo(() => {
    return (
      Object.keys(checkedTicketTypes).length === 0 &&
      Object.keys(checkedTrainTypes).length === 0 &&
      Object.keys(checkedDepartStations).length === 0 &&
      Object.keys(checkedArriveStation).length === 0
    );
  }, [
    checkedArriveStation,
    checkedDepartStations,
    checkedTicketTypes,
    checkedTrainTypes
  ]);

  return (
    <div className="bottom">
      <div className="bottom-filters">
        <span className="item" onClick={toggleOrderType}>
          <i className="icon">&#xf065;</i>
          {orderType === ORDER_DEPART ? "出发 早->晚" : "耗时 短->长"}
        </span>
        <span
          className={ctx("item", {
            "item-on": highSpeed
          })}
          onClick={toggleHighSpeed}
        >
          <i className="icon">{highSpeed ? "\uf43f" : "\uf43e"}</i>
          只看高铁动车
        </span>
        <span
          className={ctx("item", {
            "item-on": onlyTickets
          })}
          onClick={toggleOnlyTickets}
        >
          <i className="icon">{onlyTickets ? "\uf43d" : "\uf43c"}</i>
          只看有票
        </span>
        <span
          className={ctx("item", {
            "item-on": isFilterVisible || !noChecked
          })}
          onClick={toggleIsFilterVisible}
        >
          <i className="icon">{noChecked ? "\uf0f7" : "\uf446"}</i>
          只看高铁动车
        </span>
      </div>
      {isFilterVisible && (
        <BottomModal
          setCheckedTicketTypes={setCheckedTicketTypes}
          setCheckedTrainTypes={setCheckedTrainTypes}
          setCheckedDepartStations={setCheckedDepartStations}
          setCheckedArriveStation={setCheckedArriveStation}
          ticketTypes={ticketTypes}
          trainTypes={trainTypes}
          departStations={departStations}
          arriveStation={arriveStation}
          checkedTicketTypes={checkedTicketTypes}
          checkedTrainTypes={checkedTrainTypes}
          checkedDepartStations={checkedDepartStations}
          checkedArriveStation={checkedArriveStation}
          toggleIsFilterVisible={toggleIsFilterVisible}
        />
      )}
    </div>
  );
}

Bottom.propTypes = propTypes;
Bottom.defaultProps = defaultProps;
