import React, { memo, useState, useCallback, useMemo ,useContext} from "react";
import PropTypes from "prop-types";
import URI from "urijs";
import dayjs from 'dayjs'
import {TrainContext} from './context'
import "./Candidate.css";

const propTypes = {};

const defaultProps = {};

const Channels = memo(function Channels(props) {
  const { name, desc, type } = props;

  const {trainNumber,departStation,arriveStation,departDate} = useContext(TrainContext)

  //trainNumber 这些值都存在于redux的stroe中 而且这个组件的层级还比较深
  const src = useMemo(() => {
    return new URI("order.html")
      .setSearch("trainNumber", trainNumber)
      .setSearch("dStation", departStation)
      .setSearch("aStation", arriveStation)
      .setSearch("type", type)
      .setSearch("date", dayjs(departDate).format("YYYY-MM-DD"))
      .toString();
  }, [arriveStation, departDate, departStation, trainNumber, type]);
  return (
    <div className="channel">
      <div className="middle">
        <div className="name">{name}</div>
        <div className="desc">{desc}</div>
      </div>
      <a href={src} className="buy-wrapper">
        <div className="buy">买票</div>
      </a>
    </div>
  );
});

const Seat = memo(function Seat(props) {
  const {
    type,
    priceMsg,
    ticketsLeft,
    channels,
    expanded,
    toggle,
    idx
  } = props;
  return (
    <li>
      <div className="bar" onClick={() => toggle(idx)}>
        <span className="seat">{type}</span>
        <span className="price">{priceMsg}</span>
        <span className="btn">{expanded ? "预定" : "收起"}</span>
        <span className="num">{ticketsLeft}</span>
      </div>
      <div
        className="channels"
        style={{ height: expanded ? channels.length * 55 + "px" : 0 }}
      >
        {channels.map(item => {
          return <Channels key={item.name} {...item} type={type} />;
        })}
      </div>
    </li>
  );
});

const Candidate = memo(function Candidate(props) {
  const { tickets } = props;

  const [expendedIndex, setExpendedIndex] = useState(-1);

  const toggle = useCallback(
    idx => {
      setExpendedIndex(expendedIndex === idx ? -1 : idx);
    },
    [expendedIndex]
  );
  return (
    <React.Fragment>
      <div className="candidate">
        {tickets.map((ticket, idx) => {
          return (
            <Seat
              toggle={toggle}
              expanded={expendedIndex === idx}
              {...ticket}
              idx={idx}
              key={ticket.type}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
});

Candidate.propTypes = propTypes;
Candidate.defaultProps = defaultProps;

export default Candidate;
