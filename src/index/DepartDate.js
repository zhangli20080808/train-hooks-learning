import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { h0 } from "../common/until";
import dayjs from "dayjs";
import "./DepartDate.css";

const propTypes = {
  time: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

const defaultProps = {};
//日期转化可能比较复杂 占用的资源会比较多 我们可以优化 我们处理time 是一直变化的 我们要去掉后面的时分秒

//这个地方需不需要用memo 来做组件的重渲染优化呢  这个地方的数据并不是只从props取得 还有h0 系统获取的时间
export default function DepartDate(props) {
  const { time, onClick } = props;
  const h0OfDepart = h0(time);
  const departDate = new Date(h0OfDepart)

  const weekString = '周' + ['日','一','二','三','四','五','六'][departDate.getDay()]

  const isToday = h0OfDepart === h0();
  const departDateString = useMemo(() => {
    return dayjs(h0OfDepart).format("YYYY-MM-DD");
  }, [h0OfDepart]);

  return (
    <div className="depart-date" onClick={onClick}>
      <input type="hidden" value={departDateString} name="date" />{departDateString}
      <span className='date-week'>{weekString} {isToday && '(今天)'}</span>
    </div>
  );
}

DepartDate.propTypes = propTypes;
DepartDate.defaultProps = defaultProps;
