import moment from 'moment'

import {
    INIT_TICKETS, SET_TICKETS, FILTER_BY_SPACE_ID
} from './actions'

export interface TicketsState {
    originalTickets: any[]
    tickets: any[]

}

const initialState: TicketsState = {
    originalTickets: [],
    tickets: [],
}

const tickets = (state = initialState, action: { type: string, tickets: any[], spaceId: string }) => {
    switch (action.type) {
        case INIT_TICKETS:
            const tickets = action.tickets.sort((a, b) => (a.status > b.status) ? 1 : (a.status === b.status) ? ((moment(b.createdAt).isBefore(moment(a.createdAt))) ? 1 : -1) : -1)
            return {
                ...state,
                tickets: tickets,
                originalTickets: tickets,
            }
        case SET_TICKETS:
            return {
                ...state,
                tickets: action.tickets,
            }
        case FILTER_BY_SPACE_ID:
            return {
                ...state,
                tickets: state.originalTickets.filter((ticket) => ticket.spaceId === action.spaceId),
            }
        default:
            return state
    }
}


export const initTickets = (tickets: any[]) => {
    return { type: INIT_TICKETS, tickets }
}

export const setTickets = (tickets: any[]) => {
    return { type: SET_TICKETS, tickets }
}


export const filterTicketsBySpaceId = (spaceId: string) => {
    return { type: FILTER_BY_SPACE_ID, spaceId }
}






export default tickets