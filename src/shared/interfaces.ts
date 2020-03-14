export interface StatusColor {
    [key: string]: string;
}

export interface TicketTagProps {
    status: string
    createdAt: string,
    ticket: Ticket
}

export interface CreatedAtProps {
    date: string
}

export interface Ticket {
    key: string,
    submitedBy: string,
    description: string,
    createdAt: string,
    status: string,
    tags: string,
    spaceId: string | undefined
}