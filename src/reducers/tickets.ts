import moment from 'moment'
import axios from 'axios'
import {
    INIT_TICKETS,
    SET_TICKETS,
    FILTER_BY_SPACE_ID,
    SELECT_TICKET,
    FILTER_TICKETS_BY_STATUS,
    RESOLVE_TICKET,
    FILTER_TICKET_BY_DAYS_RANGE,
    START_RESOLVE_TICKET,
    END_RESOLVE_TICKET
} from './actions'
import { Ticket } from 'shared/interfaces'
import { assignSpacesToTickets } from 'data/ticketsData'
import { Modal } from 'antd'
const { confirm } = Modal;

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
            const tickets = action.tickets.sort(sortCriteria)
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
                daysRangeFilter: undefined,
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
                tickets: state.originalTickets.filter((ticket: Ticket) => {
                    const ticketDuration = moment.duration(moment().diff(ticket.createdAt))
                    const ticketDurationInHours = Math.floor(ticketDuration.asHours())
                    let condition = hoursRange[1] > 0 ? ticketDurationInHours >= hoursRange[0] && ticketDurationInHours <= hoursRange[1] : ticketDurationInHours >= hoursRange[0]
                    return condition
                }),
                filterApplied: true,
                daysRangeFilter: action.days
            }
        case SELECT_TICKET:
            return {
                ...state,
                ticketSelected: action.ticket,
            }
        case START_RESOLVE_TICKET:
            return {
                ...state,
                loading: true
            }
        case END_RESOLVE_TICKET:
            return {
                ...state,
                loading: false
            }
        case RESOLVE_TICKET:
            return {
                ...state,
                tickets: updateTicketStatus(state.tickets, action.ticket.key, 'Resolved').sort(sortCriteria),
                originalTickets: updateTicketStatus(state.originalTickets, action.ticket.key, 'Resolved').sort(sortCriteria)
            }
        default:
            return state
    }
}

const updateTicketStatus = (tickets: Ticket[], key: string, status: string) => {
    return tickets.map((ticket: Ticket) => {
        if (ticket.key === key) {
            ticket.status = status
        }
        return ticket
    })
}

export const initTickets = (tickets: Ticket[]) => {
    return { type: INIT_TICKETS, tickets }
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
    return { type: FILTER_TICKET_BY_DAYS_RANGE, days }
}

export const flagTicketAsResolved = (ticket: Ticket) => {
    return { type: RESOLVE_TICKET, ticket }
}

export const startResolvingTicket = () => {
    return { type: START_RESOLVE_TICKET }
}

export const endResolvingTicket = () => {
    return { type: END_RESOLVE_TICKET }
}

export const resolveTicket = (ticket: Ticket, tickets: Ticket[]) => (dispatch: any) => {
    dispatch(startResolvingTicket())
    let spaceTickets = tickets.filter((t) => t.spaceId === ticket.spaceId)
    spaceTickets = updateTicketStatus(spaceTickets, ticket.key, 'Resolved')
    axios.put(`/v1/space/${ticket.spaceId}/custom-field/properties.customFields.tickets`, { tickets: spaceTickets }).then((response: any) => {
        dispatch(flagTicketAsResolved(ticket))
    }).finally(() => {
        dispatch(endResolvingTicket())
    })
}

export const fetchTicketsFromSpaces = (floorId: string, spaces: any[]) => (dispatch: any) => {
    return axios.get(`/v1/space?floorId=${floorId}`).then(response => {
        const tickets = response.data.features.flatMap((feature: any) => {
            //  axios.delete(`/v1/space/${feature.id}/custom-field/properties.customFields.tickets`)
            if (feature.properties.customFields && feature.properties.customFields.tickets) {
                return feature.properties.customFields.tickets.tickets.map((ticket: Ticket) => {
                    ticket['spaceId'] = feature.id
                    return ticket
                })
            }
        }).filter((data: any[]) => data !== undefined)
        if (tickets.length == 0) {
            confirm({
                title: 'Generate tickets for this floorplan?',
                content: 'Page will reload after the process is done',
                onOk() {
                    assignSpacesToTickets(spaces, true)
                },
                onCancel() {
                    // Do nothing
                },
            });
        }

        dispatch(initTickets(tickets))
    }).catch(error => {
        console.log(error)
    })
}


export default tickets