import React, {Component, useState, useRef, useEffect, useCallback} from 'react';

function useCounter(count) {
    const size = useSize()
    return (
        <h1>{count} {size.width} {size.height}</h1>
    )
}

//自定义hook 以use开头 返回值也是自定义的
function useCount(defaultCount) {
    const [count, setCount] = useState(defaultCount)

    let it = useRef()
    useEffect(() => {
        it.current = setInterval(() => {
            setCount(count => count + 1)
        }, 1000)
    }, [])

    useEffect(() => {
        if (count >= 10) {
            clearInterval(it.current)
        }
    })
    return [count, setCount]
}

//获取上一次的props和state

function PreCounter() {
    const [count, setCount] = useState(0)

    const [updater, setUpdater] = useState(0)
    //用这个方法来强制刷新组件
    function forceUpdate() {
        setUpdater(updater => updater + 1)
    }
    const preCountRef = useRef()
    useEffect(() => {
        preCountRef.current = count
    })
    const preCount = preCountRef.current

    return <div>Now: {count} pre:{preCount}</div>
}

//获取窗口尺寸
function useSize() {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    })

    const onResize = useCallback(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height:
            document.documentElement.clientHeight
        })
    }, [])
    useEffect(() => {
        window.addEventListener('resize', onResize, false)
        return () => {
            window.removeEventListener('resize', onResize, false)
        }
    }, [])
    return size
}

function HooksText() {
    const [count, setCount] = useCount(0)
    const Counter = useCounter(count)
    const size = useSize()
    return (
        <div className="App">
            <button type='button' onClick={() => setCount(count + 1)}>
                Click ({count}) {size.width} {size.height}
            </button>
            {Counter}
        </div>
    );
}

export default HooksText;
