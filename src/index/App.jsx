/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo } from "react";
import { connect } from "react-redux";
import cls from "classnames";
import { bindActionCreators } from "redux";
import "./App.css";

import Header from "../common/Header";
import Journey from "./Journey";
import DepartDate from "./DepartDate";
import HighSpeed from "./HighSpeed";
import Submit from "./Submit";
import CitySelector from "../common/CitySelector";
import DateSelector from "../common/DateSelector";

import { h0 } from "../common/until";

import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
  showDateSelector,
  hideDateSelector,
  setDepartDate,
  toggleHighSpeed,
} from "./actions";

function App(props) {
  const {
    from,
    to,
    dispatch,
    isCitySelectorVisible,
    isDateSelectorVisible,
    isLoadingCityData,
    cityData,
    departDate,
    highSpeed
  } = props;
  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  const cbs = useMemo(() => {
    return bindActionCreators(
      {
        exchangeFromTo,
        showCitySelector
      },
      dispatch
    );
  }, []);

  const citySelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideCitySelector,
        fetchCityData,
        onSelect: setSelectedCity
      },
      dispatch
    );
  }, []);

  const departDateCbs = useMemo(() => {
    return bindActionCreators(
      {
        onClick: showDateSelector,
      },
      dispatch
    );
  }, []);

  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideDateSelector
      },
      dispatch
    );
  }, []);

  const onSelectDate = useCallback(day => {
    if (!day) return;
    if (day < h0()) return;
    console.log(day,'day');
    dispatch(setDepartDate(day));
    dispatch(hideDateSelector());
  }, []);

  const highSpeedCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggle: toggleHighSpeed
      },
      dispatch
    );
  }, []);

  return (
    <div>
      <div
        className={cls("header-wrapper", {
          hidden: isCitySelectorVisible || isDateSelectorVisible
        })}
      >
        <Header title="火车票" onBack={onBack} />
        <form action="./query.html" className="form">
          <Journey from={from} to={to} {...cbs} />
          <DepartDate time={departDate} {...departDateCbs} />
          <HighSpeed highSpeed={highSpeed} {...highSpeedCbs} />
          <Submit />
        </form>
      </div>

      <CitySelector
        cityData={cityData}
        isLoading={isLoadingCityData}
        show={isCitySelectorVisible}
        {...citySelectorCbs}
      />
      <DateSelector
        time={departDate}
        onSelect={onSelectDate}
        show={isDateSelectorVisible}
        {...dateSelectorCbs}
      />
    </div>
  );
}

export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch };
  }
)(App);

// const fnA = useCallback(fnB, [a])
// 上面的useCallback会将我们传递给它的函数fnB返回，并且将这个结果缓存；
// 当依赖a变更时，会返回新的函数。既然返回的是函数，我们无法很好的判断返回的函数是否变更

// useCallback 使用场景举例
//  有一个父组件，其中包含子组件，子组件接收一个函数作为props,通常而言，如果父组件更新了，子组件也会执行更新
// 但是大多数场景下，更新是没有必要的，我们可以借助useCallback来返回函数，然后把这个函数作为props传递给子组件；这样，子组件就能避免不必要的更新

// import React, { useState, useCallback, useEffect } from 'react';
// function Parent() {
//     const [count, setCount] = useState(1);
//     const [val, setVal] = useState('');

//     const callback = useCallback(() => {
//         return count;
//     }, [count]);
//     return <div>
//         <h4>{count}</h4>
//         <Child callback={callback}/>
//         <div>
//             <button onClick={() => setCount(count + 1)}>+</button>
//             <input value={val} onChange={event => setVal(event.target.value)}/>
//         </div>
//     </div>;
// }

// function Child({ callback }) {
//     const [count, setCount] = useState(() => callback());
//     useEffect(() => {
//         setCount(callback());
//     }, [callback]);
//     return <div>
//         {count}
//     </div>
// 不仅是上面的例子，所有依赖本地状态或props来创建函数，需要使用到缓存函数的地方，都是useCallback的应用场景。

// useCallback跟useMemo比较类似，但它返回的是缓存的函数。
// 使用useMemo来执行昂贵的计算，然后将计算值返回
// 上面我们可以看到，使用useMemo来执行昂贵的计算，然后将计算值返回，并且将count作为依赖值传递进去
// 这样，就只会在count改变的时候触发expensive执行，在修改val的时候，返回上一次缓存的值。
// export default function WithMemo() {
//   const [count, setCount] = useState(1);
//   const [val, setValue] = useState('');
//   const expensive = useMemo(() => {
//       console.log('compute');
//       let sum = 0;
//       for (let i = 0; i < count * 100; i++) {
//           sum += i;
//       }
//       return sum;
//   }, [count]);

//   return <div>
//       <h4>{count}-{expensive}</h4>
//       {val}
//       <div>
//           <button onClick={() => setCount(count + 1)}>+c1</button>
//           <input value={val} onChange={event => setValue(event.target.value)}/>
//       </div>
//   </div>;

// useEffect、useMemo、useCallback都是自带闭包的。
// 也就是说，每一次组件的渲染，其都会捕获当前组件函数上下文中的状态(state, props)
// 所以每一次这三种hooks的执行，反映的也都是当前的状态，你无法使用它们来捕获上一次的状态。对于这种情况，我们应该使用ref来访问。

// 搜索结果页面  1.视觉组件拆分 2.redux store 状态设计 3.redux action/reducer设计
//  日期导航 搜索结果item  底部筛选组件
