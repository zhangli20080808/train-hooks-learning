import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import ctx from "classnames";
import { h0 } from "../common/until";
// import './DateSelector.css'

const propTypes = {
  show: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  time:PropTypes.number.isRequired
};

const defaultProps = {};

// 组件划分  每个月份一个组件 一周7天 一个组件 一周内的每一天 一个组件
// 月份组件
// 每个月的0时0分0秒代表这个月 获取最近三个月的每一个月的 0时0分0秒

function Day(props) {
  const { day, onSelect,time } = props;

  // 思考 便捷判断 null 我们渲染特殊
  if (!day) {
    return <div className="datepicker_dayitem"></div>;
  }
  const now = h0();
  //   周日 周六 我们飘红

  const classes = ["datepicker_dayitem"];

  if (day < now) {
    classes.push("disabled");
  }

  if (h0(time) === h0(day)) {
    classes.push("today");
  }

  const previewText = day > new Date().getTime() +60 * 60 * 1000 * 24 * 30 && day<new Date().getTime() +60 * 60 * 1000 * 24 * 60

  //   if ([6, 0].includes(new Date(day).getDay())) {
  //     classes.push("weekend");
  //   }
  //判断是不是今天
  const dateString = h0(now) === h0(day) ? "今天" : new Date(day).getDate();
  return (
    <div className={ctx(classes)} onClick={() => onSelect(day)}>
      <div>{dateString}</div>
      {previewText &&  <div className='preview'>预约</div>}
    </div>
  );
}

function Week(props) {
  const { days, onSelect ,time} = props;
  return (
    <div className="week">
      {days.map((day, idx) => (
        <Day day={day} key={idx} time={time} onSelect={onSelect} />
      ))}
    </div>
  );
}

function Month(props) {
  const { startingTimeInMonth, onSelect,time } = props;
  // 这个月第一天的零时刻 代表这一天 startingTimeInMonth
  // 获取一个月的所有日期 渲染出来 递增日期的date只到month

  const startDay = new Date(startingTimeInMonth);
  const currentDay = new Date(startingTimeInMonth);

  let days = [];

  while (currentDay.getMonth() === startDay.getMonth()) {
    // 每次遍历  记录下当前这一天的零时刻
    days.push(currentDay.getTime());
    currentDay.setDate(currentDay.getDate() + 1);
  }
  // 每7天 1号不是星期1 前面要补一些空白 后面可能也要补齐 比如是星期三 补齐2个 星期日 需6个
  // ES6为Array增加了fill()函数，使用制定的元素填充数组，其实就是用默认内容初始化数组。
  // 前面补齐操作
  days = new Array(startDay.getDay() ? startDay.getDay() : 7)
    .fill(null)
    .concat(days);
  // 后面补齐操作  最后一天是星期几  我们就 7 -这个数字

  const lastDay = new Date(days[days.length - 1]);
  days = days.concat(
    new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null)
  );

  // 分组之后
  const weeks = [];
  for (let row = 0; row < days.length / 7; row++) {
    const week = days.slice(row * 7, (row + 1) * 7);
    const isArrayNull = week.every(val => val === null);
    if (!isArrayNull) {
      weeks.push(week);
    }
  }
  return (
    <div>
      <div className="datepicker_monthcontainer">
        <div className="title">
          {startDay.getFullYear()} 年 {startDay.getMonth() + 1} 月
        </div>

        <div>
          {weeks.map((item, idx) => (
            <Week key={idx} days={item} time={time} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DateSelector(props) {
  const { show, onSelect, onBack,time } = props;
  // 获取当前月的
  const now = new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setMilliseconds(0);
  now.setDate(1); //将日期重置为当前的1号  当前月0时刻 now.getTime()

  const monthSequence = [now.getTime()];

  // 因为每个月的天数不一样 不能单独的去加 31
  // 技巧 只需要setMonth 当前月+1就行  设置一个月的某一天  setDate 如果遇到跨年 年份的值也会自动加一 不用担心溢出

  now.setMonth(now.getMonth() + 1);
  monthSequence.push(now.getTime());

  now.setMonth(now.getMonth() + 1);
  monthSequence.push(now.getTime());
  return (
    <div className={ctx("date-selector", { hidden: !show })}>
      <Header title="日期选择" onBack={onBack}></Header>
      <div className="date-selector-tables">
        <div className="datepicker_weekbanner">
          <span>日</span>
          <span>一</span>
          <span>二</span>
          <span>三</span>
          <span>四</span>
          <span>五</span>
          <span>六</span>
        </div>
        {monthSequence.map(month => {
          return (
            <Month
              key={month}
              onSelect={onSelect}
              time={time}
              startingTimeInMonth={month}
            />
          );
        })}
      </div>
    </div>
  );
}

DateSelector.propTypes = propTypes;
DateSelector.defaultProps = defaultProps;
Week.propTypes = {
  days: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
};

Month.propTypes = {
  startingTimeInMonth: PropTypes.number.isRequired
};
Day.propTypes = {
  day: PropTypes.number,
  onSelect: PropTypes.func.isRequired
};
