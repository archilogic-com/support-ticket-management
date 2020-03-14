import { createStore } from 'redux'
import ticketsApp from 'reducers/tickets'
declare var window:any
export const store = createStore(
    ticketsApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())