import { Ticket } from "shared/interfaces";

export const tickets: Ticket[] = [
    {
        key: '1',
        submitedBy: 'Patrick Alec',
        title: 'Main door is broken',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lobortis pharetra nisl, vitae vulputate est auctor et. Quisque finibus aliquam dapibus',
        createdAt: '2020-03-14 16:40',
        status: 'Open',
        tags: 'Other',
        spaceId: undefined
    },
    {
        key: '2',
        submitedBy: 'Louisa Lexine',
        title: 'A/C wont turn on',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lobortis pharetra nisl, vitae vulputate est auctor et. Quisque finibus aliquam dapibus',
        createdAt: '2020-03-14 12:32',
        status: 'Open',
        tags: 'Heat/Air',
        spaceId: undefined
    },
    {
        key: '6',
        submitedBy: 'Joe',
        title: 'Wall decal in bad condition',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lobortis pharetra nisl, vitae vulputate est auctor et. Quisque finibus aliquam dapibus',
        createdAt: '2020-03-15 12:32',
        status: 'Open',
        tags: 'Maintenance,Decoration',
        spaceId: undefined
    },
    {
        key: '3',
        submitedBy: 'Patrick Alec',
        title: 'Power outlet not working',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lobortis pharetra nisl, vitae vulputate est auctor et. Quisque finibus aliquam dapibus',
        createdAt: '2020-03-11 10:04',
        status: 'Resolved',
        tags: 'Maintenance,Electrical',
        spaceId: undefined
    },
    {
        key: '4',
        submitedBy: 'Juio',
        title: 'Power outlet not working',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lobortis pharetra nisl, vitae vulputate est auctor et. Quisque finibus aliquam dapibus',
        createdAt: '2020-03-11 10:04',
        status: 'Resolved',
        tags: 'Maintenance,Electrical',
        spaceId: undefined
    },
    {
        key: '5',
        submitedBy: 'Pablo',
        title: 'Power outlet not working',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lobortis pharetra nisl, vitae vulputate est auctor et. Quisque finibus aliquam dapibus',
        createdAt: '2020-03-13 10:04',
        status: 'Resolved',
        tags: 'Maintenance,Electrical',
        spaceId: undefined
    },
    {
        key: '7',
        submitedBy: 'Michaela Van',
        title: 'Toilet don\'t flush',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lobortis pharetra nisl, vitae vulputate est auctor et. Quisque finibus aliquam dapibus',
        createdAt: '2020-03-14 15:00',
        status: 'Open',
        tags: 'Maintenance,Plumbing',
        spaceId: undefined
    },
    {
        key: '8',
        submitedBy: 'Star Mathew',
        title: 'Two chairs missing',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lobortis pharetra nisl, vitae vulputate est auctor et. Quisque finibus aliquam dapibus',
        createdAt: '2020-03-15 15:00',
        status: 'Open',
        tags: 'Maintenance,Furniture',
        spaceId: undefined
    },
    {
        key: '9',
        submitedBy: 'Star Mathew',
        title: 'A/C wont turn on',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lobortis pharetra nisl, vitae vulputate est auctor et. Quisque finibus aliquam dapibus',
        createdAt: '2020-03-13 15:06',
        status: 'Open',
        tags: 'Heat/Air,Maintenance',
        spaceId: undefined
    },
    {
        key: '10',
        submitedBy: 'Michaela Van',
        title: 'Microwave not working',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lobortis pharetra nisl, vitae vulputate est auctor et. Quisque finibus aliquam dapibus',
        createdAt: '2020-03-14 13:58',
        status: 'Open',
        tags: 'Maintenance,Eectrical',
        spaceId: undefined
    },
    {
        key: '11',
        submitedBy: 'Star Mathew',
        title: 'A/C wont turn on',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lobortis pharetra nisl, vitae vulputate est auctor et. Quisque finibus aliquam dapibus',
        createdAt: '2020-03-12 10:06',
        status: 'Open',
        tags: 'Heat/Air,Maintenance',
        spaceId: undefined
    },
    {
        key: '12',
        submitedBy: 'Chaz Kirk',
        title: 'A/C wont turn on',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lobortis pharetra nisl, vitae vulputate est auctor et. Quisque finibus aliquam dapibus',
        createdAt: '2020-03-13 11:06',
        status: 'Open',
        tags: 'Heat/Air,Maintenance',
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