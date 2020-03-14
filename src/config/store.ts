import { createStore } from 'redux'
import { combineReducers } from 'redux'

import tickets from 'reducers/tickets'
import spaces from 'reducers/spaces'
declare var window:any
const reducers = combineReducers({tickets, spaces})
export const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())