import React, {useState, useRef, useEffect, useCallback, memo} from 'react';

let idSeq = new Date()

const Control = memo(function Control(props) {
    const {addTodo} = props
    const inputRef = useRef()

    const onSubmit = (e) => {
        e.preventDefault()
        const newText = inputRef.current.value.trim();
        if (newText.length === 0) return
        addTodo({
            id: ++idSeq,
            text: newText,
            complete: false
        })

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
    const {removeTodo, toggleTodo, todo: {text, complete, id}} = props
    const onchange = () => {
        toggleTodo(id)
    }
    const onRemove = () => {
        removeTodo(id)
    }
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

    const addTodo = useCallback((todo) => {
        setTodos(todos => [...todos, todo])
    })

    const removeTodo = useCallback((id) => {

        setTodos(todos => todos.filter(todo => {
            return todo.id !== id
        }))
    }, [])
    const toggleTodo = useCallback((id) => {
        setTodos(todos => todos.map(todo => {
            return todo.id === id
                ? {...todo, complete: !todo.complete}
                : todo
        }))
    }, []);

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem(TD_KEY) || '[]')
        setTodos(todos)
    }, [])

    useEffect(() => {
        localStorage.setItem(TD_KEY, JSON.stringify(todos))
    }, [todos])


    return <div className='todo-list'>
        <Control addTodo={addTodo}/>
        <Todos removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos}/>
    </div>
}

//用函数的方式可以避免对这个变量的依赖
//需要传递到子组件中 我们用useCallback

export default TodoList;
