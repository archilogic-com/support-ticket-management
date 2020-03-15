import moment from 'moment'

import {
    INIT_TICKETS,
    SET_TICKETS,
    FILTER_BY_SPACE_ID,
    SELECT_TICKET,
    FILTER_TICKETS_BY_STATUS,
    RESOLVE_TICKET,
    FILTER_TICKET_BY_DAYS_RANGE
} from './actions'
import { Ticket } from 'shared/interfaces'
import { assignSpacesToTickets } from 'data/ticketsData'

export interface TicketsState {
    originalTickets: Ticket[]
    tickets: Ticket[]
    ticketSelected: Ticket | null
    filterApplied: boolean
    status: string
    loading: boolean,
    daysRangeFilter?: string 
}

interface Action {
    type: string
    spaces: any[]
    tickets: Ticket[]
    spaceId: string
    ticket: Ticket
    status: string
    days: any
}

const initialState: TicketsState = {
    originalTickets: [],
    tickets: [],
    ticketSelected: null,
    filterApplied: false,
    status: 'all',
    daysRangeFilter: undefined,
    loading: true
}

const sortCriteria = (a: Ticket, b: Ticket) => (a.status > b.status) ? 1 : (a.status === b.status) ? ((moment(b.createdAt).isBefore(moment(a.createdAt))) ? 1 : -1) : -1

const tickets = (state = initialState, action: Action) => {
    switch (action.type) {
        case INIT_TICKETS:
            const tickets = assignSpacesToTickets(action.spaces).sort(sortCriteria)
            return {
                ...state,
                tickets: tickets,
                originalTickets: tickets,
                loading: false
            }
        case SET_TICKETS:
            return {
                ...state,
                tickets: action.tickets,
                filterApplied: false,
                daysRangeFilter:undefined,
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
        case FILTER_TICKET_BY_DAYS_RANGE:
            const hoursRange = action.days.split('-')
            return {
                ...state,
                tickets: state.originalTickets.filter((ticket) => {
                    const ticketDuration = moment.duration(moment().diff(ticket.createdAt))
                    const ticketDurationInHours = Math.floor(ticketDuration.asHours())
                    return ticketDurationInHours >= hoursRange[0] && ticketDurationInHours <= hoursRange[1]
                }),
                filterApplied: true,
                daysRangeFilter: action.days
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

const markTicketAsResolved = (tickets: Ticket[], key: string) => {
    return tickets.map((ticket: Ticket) => {
        if (ticket.key === key) {
            ticket.status = 'Resolved'
        }
        return ticket
    })
}


export const initTickets = (spaces: any[]) => {
    return { type: INIT_TICKETS, spaces }
}

export const setTickets = (tickets: Ticket[]) => {
    return { type: SET_TICKETS, tickets }
}

export const selectTicket = (ticket: Ticket | null) => {
    return { type: SELECT_TICKET, ticket }
}

export const filterTicketsBySpaceId = (spaceId: string) => {
    return { type: FILTER_BY_SPACE_ID, spaceId }
}

export const filterByStatus = (status: string) => {
    return { type: FILTER_TICKETS_BY_STATUS, status }

}

export const filterByDaysRange = (days: any) => {
    return {type:FILTER_TICKET_BY_DAYS_RANGE, days}
}

export const resolveTicket = (ticket: Ticket | null) => {
    return { type: RESOLVE_TICKET, ticket }
}



export default tickets