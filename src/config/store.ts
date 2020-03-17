import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk';

import tickets from 'reducers/tickets'
import spaces from 'reducers/spaces'
import floor from 'reducers/floor'

declare var window:any
const reducers = combineReducers({tickets, spaces, floor})
export const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    )
