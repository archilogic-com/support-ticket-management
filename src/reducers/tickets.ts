import moment from 'moment'

import {
    INIT_TICKETS, SET_TICKETS, FILTER_BY_SPACE_ID, SELECT_TICKET, FILTER_TICKETS_BY_STATUS, RESOLVE_TICKET
} from './actions'

export interface TicketsState {
    originalTickets: any[]
    tickets: any[]
    ticketSelected?: any
    filterApplied: boolean
    status: string
}

const initialState: TicketsState = {
    originalTickets: [],
    tickets: [],
    ticketSelected: null,
    filterApplied: false,
    status: 'all'
}

const sortCriteria = (a: any, b: any) => (a.status > b.status) ? 1 : (a.status === b.status) ? ((moment(b.createdAt).isBefore(moment(a.createdAt))) ? 1 : -1) : -1

const tickets = (state = initialState, action: { type: string, tickets: any[], spaceId: string, ticket?: any, status: string }) => {
    switch (action.type) {
        case INIT_TICKETS:
            const tickets = action.tickets.sort(sortCriteria)
            return {
                ...state,
                tickets: tickets,
                originalTickets: tickets,
            }
        case SET_TICKETS:
            return {
                ...state,
                tickets: action.tickets,
                filterApplied: false,
                status: 'all'
            }
        case FILTER_BY_SPACE_ID:
            return {
                ...state,
                tickets: state.originalTickets.filter((ticket) => ticket.spaceId === action.spaceId),
                filterApplied: true,
                status: 'all'
            }
        case FILTER_TICKETS_BY_STATUS:
            return {
                ...state,
                tickets: state.originalTickets.filter((ticket) => ticket.status === action.status),
                filterApplied: true,
                status: action.status
            }
        case SELECT_TICKET:
            return {
                ...state,
                ticketSelected: action.ticket,
            }
        case RESOLVE_TICKET:
            return {
                ...state,
                tickets: markTicketAsResolved(state.tickets, action.ticket.key).sort(sortCriteria),
                originalTickets: markTicketAsResolved(state.originalTickets, action.ticket.key).sort(sortCriteria)
            }
        default:
            return state
    }
}

const markTicketAsResolved = (tickets: any[], key: string) => {
    return tickets.map((ticket: any) => {
        if (ticket.key === key) {
            ticket.status = 'Resolved'
        }
        return ticket
    })
}


export const initTickets = (tickets: any[]) => {
    return { type: INIT_TICKETS, tickets }
}

export const setTickets = (tickets: any[]) => {
    return { type: SET_TICKETS, tickets }
}

export const selectTicket = (ticket?: any) => {
    return { type: SELECT_TICKET, ticket }
}

export const filterTicketsBySpaceId = (spaceId: string) => {
    return { type: FILTER_BY_SPACE_ID, spaceId }
}

export const filterByStatus = (status: string) => {
    return { type: FILTER_TICKETS_BY_STATUS, status }

}

export const resolveTicket = (ticket: any) => {
    return { type: RESOLVE_TICKET, ticket}
}



export default tickets