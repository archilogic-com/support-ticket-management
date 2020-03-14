export interface StatusColor {
    [key: string]: string;
}

export interface TicketTagProps {
    status: string
    createdAt: string,
    ticket: any
}

export interface CreatedAtProps {
    date: string
}
