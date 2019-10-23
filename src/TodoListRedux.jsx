import React, {useState, useRef, useEffect, useCallback, memo} from 'react';
import {
    createSet,
    createAdd,
    createRemove,
    createtoggle
} from './action'

let idSeq = new Date()

function bindActionCreators(actionCreators, dispatch) {
    let ret = {}
    for (let key in actionCreators) {
        ret[key] = function (...arg) {
            const actionCreator = actionCreators[key]
            const action = actionCreator(...arg)
            dispatch(action)
        }
    }
    return ret
}

//总结   推导dispatch action actionCreator bindActionCreators
// 先创建action对象 统一经过dispatch处理action   我们把四个行为封装成了一个dispatch 既然函数统一了 就要用参数去区分 我们把参数叫做action
// 由一个代表行为的 type字段和代表数据的payload字段 由于每次都需要创建action给dispatch用 索性我们就把创建action的行为封装成了函数 叫做actionCreator
// actionCreator创建的action 还是要给dispatch用 所以我们就创建了一个 bindActionCreators 把 actionCreator和 dispatch 绑定到一起给组件调用 最后组件并没有改变什么，
// 但是更新数据的路径已经完全改变了 location

const Control = memo(function Control(props) {
    const {addTodo} = props
    const inputRef = useRef()

    const onSubmit = (e) => {
        e.preventDefault()
        const newText = inputRef.current.value.trim();
        if (newText.length === 0) return
        // addTodo({
        //     id: ++idSeq,
        //     text: newText,
        //     complete: false
        // })

        addTodo({
            id: ++idSeq,
            text: newText,
            complete: false
        })
        // dispatch(createAdd({
        //     id: ++idSeq,
        //     text: newText,
        //     complete: false
        // }))
        inputRef.current.value = ''
    }
    return (
        <div className='control'>
            <h1>todos</h1>
            <form onSubmit={onSubmit}>
                <input type="text" ref={inputRef} className='new-todo' placeholder='What needs to be done ?'/>
            </form>
        </div>
    )
})

const TodoItem = memo(function TodoItem(props) {
    const {toggleTodo, removeTodo, todo: {text, complete, id}} = props;
    const onchange = () => {
        // dispatch(createtoggle(id))
        toggleTodo(id)
    };
    const onRemove = () => {
        // dispatch(createRemove(id))
        removeTodo(id)
    };
    return (
        <li className='todo-item'>
            <input type="checkbox" onChange={onchange} checked={complete}/>
            <label className={complete ? 'complete' : ''}>{text}</label>
            <button onClick={onRemove}>x</button>
        </li>
    )
})


const Todos = memo(function Todos(props) {
    const {removeTodo, toggleTodo, todos} = props
    return (
        <ul>
            {
                todos.map(todo => {
                    return (<TodoItem
                        key={todo.id}
                        todo={todo}
                        removeTodo={removeTodo}
                        toggleTodo={toggleTodo}
                    >
                    </TodoItem>)
                })
            }
        </ul>
    )
})

let TD_KEY = '_$todo_'

function TodoList() {
    const [todos, setTodos] = useState([])
    // dispach({type:'',payload})
    const dispatch = useCallback((action) => {
            const {type, payload} = action
            switch (type) {
                case 'set':
                    setTodos(payload)
                    break;
                case 'add':
                    setTodos(todos => [...todos, payload])
                    break;
                case 'remove':
                    setTodos(todos => todos.filter(todo => {
                        return todo.id !== payload
                    }))
                    break
                case 'toggle':
                    setTodos(todos => todos.map(todo => {
                        return todo.id === payload
                            ? {...todo, complete: !todo.complete}
                            : todo
                    }))
                    break
                default:
            }
        }, []
    )
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem(TD_KEY) || '[]')
        dispatch(createSet(todos))
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem(TD_KEY, JSON.stringify(todos))
    }, [todos]);


    return <div className='todo-list'>
        {/*<Control dispatch={dispatch}/>*/}
        <Control
            {
                ...bindActionCreators({
                    addTodo: createAdd
                }, dispatch)
            }
        />
        <Todos
            {
                ...bindActionCreators({
                    toggleTodo: createtoggle,
                    removeTodo: createRemove
                }, dispatch)
            }

            todos={todos}/>
    </div>
}

//用函数的方式可以避免对这个变量的依赖
//需要传递到子组件中 我们用useCallback

export default TodoList;