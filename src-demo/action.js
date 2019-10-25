export function createSet(payload) {
    return {
        type: 'set',
        payload
    }
}

//{
//     addTodo:createAdd,
//     removeTodo: createRemove()
// }
// addTodo = payload=> dispatch(createAdd(payload))
//
// {
//     addTodo:createAdd,
//     removeTodo: createRemove()
// }


export function createAdd(payload) {
    return {
        type: 'add',
        payload
    }
}
export function createRemove(payload) {
    return {
        type: 'remove',
        payload
    }
}
export function createtoggle(payload) {
    return {
        type: 'toggle',
        payload
    }
}

