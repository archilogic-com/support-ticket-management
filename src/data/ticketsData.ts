export const tickets = [
    {
        key: '1',
        submitedBy: 'Patrick Alec',
        description: 'Main door is broken',
        createdAt: '2020-03-11 16:40',
        status: 'Open',
        tags: 'Other',
        spaceId: undefined
    },
    {
        key: '2',
        submitedBy: 'Louisa Lexine',
        description: 'A/C wont turn on',
        createdAt: '2020-03-10 12:32',
        status: 'Open',
        tags: 'Heat/Air',
        spaceId: undefined
    },
    {
        key: '6',
        submitedBy: 'Joe',
        description: 'Wall decal in bad condition',
        createdAt: '2020-03-10 12:32',
        status: 'Open',
        tags: 'Maintenance',
        spaceId: undefined
    },
    {
        key: '3',
        submitedBy: 'Patrick Alec',
        description: 'Power outlet not working',
        createdAt: '2020-03-08 10:04',
        status: 'Resolved',
        tags: 'Maintenance',
        spaceId: undefined
    },
    {
        key: '4',
        submitedBy: 'Juio',
        description: 'Power outlet not working',
        createdAt: '2020-03-03 10:04',
        status: 'Resolved',
        tags: 'Maintenance',
        spaceId: undefined
    },
    {
        key: '5',
        submitedBy: 'Pablo',
        description: 'Power outlet not working',
        createdAt: '2020-03-03 10:04',
        status: 'Resolved',
        tags: 'Maintenance',
        spaceId: undefined
    },
    {
        key: '7',
        submitedBy: 'Michaela Van',
        description: 'Toilet don\'t flush',
        createdAt: '2020-03-11 15:00',
        status: 'Open',
        tags: 'Maintenance',
        spaceId: undefined
    },
    {
        key: '8',
        submitedBy: 'Star Mathew',
        description: 'Two chairs missing',
        createdAt: '2020-03-12 15:00',
        status: 'Open',
        tags: 'Maintenance',
        spaceId: undefined
    },
    {
        key: '9',
        submitedBy: 'Star Mathew',
        description: 'A/C wont turn on',
        createdAt: '2020-03-12 15:06',
        status: 'Open',
        tags: 'Heat/Air',
        spaceId: undefined
    },
    {
        key: '10',
        submitedBy: 'Michaela Van',
        description: 'Microwave not working',
        createdAt: '2020-03-12 13:58',
        status: 'Open',
        tags: 'Maintenance',
        spaceId: undefined
    },
    {
        key: '11',
        submitedBy: 'Star Mathew',
        description: 'A/C wont turn on',
        createdAt: '2020-03-13 10:06',
        status: 'Open',
        tags: 'Heat/Air',
        spaceId: undefined
    },
    {
        key: '12',
        submitedBy: 'Chaz Kirk',
        description: 'A/C wont turn on',
        createdAt: '2020-03-13 11:06',
        status: 'Open',
        tags: 'Heat/Air',
        spaceId: undefined
    }
];

export const assignSpacesToTickets = (spaces: any[]) => {
    spaces.forEach((space: any) => {
        const dice = Math.floor(Math.random() * 10)
        if (dice > 0 && (space.usage === 'Work' || space.usage === 'Work' || space.usage === 'Kitchen' || space.usage === 'Common' || space.usage === 'Bathroom')) {
            const ticketsToBeAssigned = tickets.filter(ticket => ticket.spaceId === undefined)
            const randomTicket = ticketsToBeAssigned[Math.floor(Math.random() * ticketsToBeAssigned.length)];

            if (randomTicket) {
                randomTicket['spaceId'] = space.node.id
                if (Math.floor(Math.random() * 10) === 0) {
                    const ticketsToBeAssigned = tickets.filter(ticket => ticket.spaceId === undefined)
                    const randomTicket = ticketsToBeAssigned[Math.floor(Math.random() * ticketsToBeAssigned.length)];
                    if (randomTicket) {
                        randomTicket['spaceId'] = space.node.id
                    }
                }
            }
        }
    })

    return tickets
}