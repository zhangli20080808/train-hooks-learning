import React, { useCallback,useMemo } from 'react'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import './App.css';

import Header from '../common/Header';
import Journey from './Journey';
import DepartDate from './DepartDate';
import HighSpeed from './HighSpeed';
import Submit from './Submit';
import CitySelector from '../common/CitySelector'

import {
    exchangeFromTo,
    showCitySelector,
    hideCitySelector,
} from './actions'

function App(props) {
    const { from, to, dispatch ,isCitySelectorVisible} = props
    const onBack = useCallback(() => {
        window.history.back()
    }, [])
    const cbs = useMemo(()=>{
        return bindActionCreators({
            exchangeFromTo,
            showCitySelector
        },dispatch)
    })

    const citySelectorCbs = useMemo(()=>{
        return bindActionCreators({
            onBack: hideCitySelector
        },dispatch)
    })
    return (
        <div>
            <div className="header-wrapper">
                <Header title="火车票" onBack={onBack} />
            </div>
            <form action="./query.html" className="form">
                <Journey from={from} to={to} {...cbs} />
                <DepartDate/>
                <HighSpeed/>
                <Submit />
            </form>
            <CitySelector show={isCitySelectorVisible} {...citySelectorCbs}/>
        </div>
    )
}

export default connect(
    function mapStateToProps(state) {
        return state;
    },
    function mapDispatchToProps(dispatch) {
        return { dispatch };
    }
)(App);