export const tickets = [
    {
        key: '1',
        submitedBy: 'Mike',
        description: 'Main door is broken',
        createdAt: '2020-03-11 16:40',
        status: 'Open',
        tags: 'Other',
        spaceId: undefined
    },
    {
        key: '2',
        submitedBy: 'Rick',
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
        submitedBy: 'Mike',
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
        submitedBy: 'Paul',
        description: 'Toilet don\'t flush',
        createdAt: '2020-03-11 15:00',
        status: 'Open',
        tags: 'Maintenance',
        spaceId: undefined
    },
    {
        key: '8',
        submitedBy: 'Ben',
        description: 'Two chairs missing',
        createdAt: '2020-03-12 15:00',
        status: 'Open',
        tags: 'Maintenance',
        spaceId: undefined
    },
    {
        key: '9',
        submitedBy: 'Ben',
        description: 'A/C wont turn on',
        createdAt: '2020-03-12 15:06',
        status: 'Open',
        tags: 'Heat/Air',
        spaceId: undefined
    },
    {
        key: '10',
        submitedBy: 'Ben',
        description: 'Microwave not working',
        createdAt: '2020-03-12 13:58',
        status: 'Open',
        tags: 'Maintenance',
        spaceId: undefined
    },
    {
        key: '11',
        submitedBy: 'Ben',
        description: 'A/C wont turn on',
        createdAt: '2020-03-13 10:06',
        status: 'Open',
        tags: 'Heat/Air',
        spaceId: undefined
    },
    {
        key: '12',
        submitedBy: 'Alice',
        description: 'A/C wont turn on',
        createdAt: '2020-03-13 11:06',
        status: 'Open',
        tags: 'Heat/Air',
        spaceId: undefined
    },
    // {
    //     key: '13',
    //     submitedBy: 'Amy',
    //     description: 'Power outlet not working',
    //     createdAt: '2020-03-12 10:06',
    //     status: 'Open',
    //     tags: 'Heat/Air',
    //     spaceId: undefined
    // },

];

export const assignSpacesToTickets = (spaces: any[]) => {
    spaces.forEach((space: any) => {
        const dice = Math.floor(Math.random() * 10)
        if (dice > 0 && space.usage == 'Work' || space.usage == 'Work' || space.usage == 'Kitchen' || space.usage == 'Common' || space.usage == 'Bathroom') {
            const ticketsToBeAssigned = tickets.filter(ticket => ticket.spaceId === undefined)
            const randomTicket = ticketsToBeAssigned[Math.floor(Math.random() * ticketsToBeAssigned.length)];

            if (randomTicket) {
                randomTicket['spaceId'] = space.node.id
                if (Math.floor(Math.random() * 10) == 0) {
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




  //   export const tickets = [
//     {
//       key: '1',
//       submitedBy: 'Mike',
//       description: 'Main door is broken',
//       createdAt: '2020-03-11 16:40',
//       status: 'Open',
//       tags: 'Other',
//       spaceId: '4a021d39-8d92-46d5-a293-ea976ff53167'
//     },
//     {
//       key: '2',
//       submitedBy: 'Rick',
//       description: 'A/C wont turn on',
//       createdAt: '2020-03-10 12:32',
//       status: 'Open',
//       tags: 'Heat/Air',
//       spaceId: '4e74850a-a61e-46b2-91b3-bbe1014db5cb'
//     },
//     {
//       key: '6',
//       submitedBy: 'Joe',
//       description: 'Wall decal in bad condition',
//       createdAt: '2020-03-10 12:32',
//       status: 'Open',
//       tags: 'Maintenance',
//       spaceId: '4e74850a-a61e-46b2-91b3-bbe1014db5cb'
//     },
//     {
//       key: '3',
//       submitedBy: 'Mike',
//       description: 'Power outlet not working',
//       createdAt: '2020-03-08 10:04',
//       status: 'Resolved',
//       tags: 'Maintenance',
//       spaceId: '2a6e9ba8-7fa3-4da6-b1f6-798e8ff06257'
//     },
//     {
//       key: '4',
//       submitedBy: 'Juio',
//       description: 'Power outlet not working',
//       createdAt: '2020-03-03 10:04',
//       status: 'Resolved',
//       tags: 'Maintenance',
//       spaceId: '4a021d39-8d92-46d5-a293-ea976ff53167'
//     },
//     {
//       key: '5',
//       submitedBy: 'Pablo',
//       description: 'Power outlet not working',
//       createdAt: '2020-03-03 10:04',
//       status: 'Resolved',
//       tags: 'Maintenance',
//       spaceId: '016b6ccc-22b1-4ef7-833c-d20a086bbd68'
//     },
//     {
//       key: '7',
//       submitedBy: 'Paul',
//       description: 'Toilet don\'t flush',
//       createdAt: '2020-03-11 15:00',
//       status: 'Open',
//       tags: 'Maintenance',
//       spaceId: '93f2a7e6-3954-4ed8-b125-91cc24e2f3b0'
//     },
//     {
//       key: '8',
//       submitedBy: 'Ben',
//       description: 'Two chairs missing',
//       createdAt: '2020-03-12 15:00',
//       status: 'Open',
//       tags: 'Maintenance',
//       spaceId: 'f254dc04-e2b8-4624-8e29-ac5387717216'
//     },
//     {
//       key: '9',
//       submitedBy: 'Ben',
//       description: 'A/C wont turn on',
//       createdAt: '2020-03-12 15:06',
//       status: 'Open',
//       tags: 'Heat/Air',
//       spaceId: 'f254dc04-e2b8-4624-8e29-ac5387717216'
//     },
//     {
//       key: '10',
//       submitedBy: 'Ben',
//       description: 'Microwave not working',
//       createdAt: '2020-03-12 13:58',
//       status: 'Open',
//       tags: 'Maintenance',
//       spaceId: 'e18a297b-086f-4c02-bf32-416b2a142c94'
//     }
//   ];
