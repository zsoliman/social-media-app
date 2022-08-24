import { legacy_createStore as createStore } from 'redux'

// createStore takes in 2 arguments
// 1: reducer function that will automatically fire later ;)
// 2: initial *global* state

// the reducer function has the state (being the CURRENT STATE)
// and the action object as the current parameter

// an action is a plain javascript object that tells the reducer what to do next 
// and with what data. ALL ACTIONS MUST HAVE A type key

// Example of an object: {type: 'counter/multiply'}
// Example of an object: {type: 'user/login', user: data}

const reducer = (state, action) => {
    switch (action.type) {
        case 'counter/incremented':
            return { value: state.value + 1 }
        case 'counter/decremented':
            return { value: state.value - 1 }
        case 'user/login':
            return { ...state, currentUser: action.user }
        default:
            return state
    }
}

const store = createStore(reducer, { value: 0, currentUser: null })

export default store

/* a store object has 2 functions that we can call on it anywhere:

store.dispatch()
--> This accepts a single JS object with at least a type key/value. And will automatically fire the reducer function initially passed to the store.

store.getState()
--> This is how we read data frin the global store.
--> ex: store.getState().currentUser

*/