import { Ticket } from "shared/interfaces";
import axios from "axios";
import moment from "moment";

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

// THIS IS ONLY FOR DEMO PURPOSE 
export const assignSpacesToTickets = (spaces: any[], reloadWhenDone = false) => {
    spaces.forEach((space: any) => {
        const dice = Math.floor(Math.random() * 10)
        if (dice > 0 && (space.usage === 'Work' || space.usage === 'work' || space.usage === 'meetingRoom' || space.usage === 'closeWorkspace' || space.usage === 'operate' || space.usage === 'Kitchen' || space.usage === 'kitchen' || space.usage === 'common' || space.usage === 'Common' || space.usage === 'Bathroom'|| space.usage === 'bathroom')) {
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

                randomTicket['createdAt'] = moment().subtract(getRandomInt(2) + 1, 'days').format('YYYY-MM-DD LT')

            }

        }
    })

    const requests = tickets.filter((ticket: Ticket) => { return ticket.spaceId !== undefined}).map( (ticket: Ticket) => {
       return axios.put(`/v2/space/${ticket.spaceId}/custom-field/properties.customFields.tickets`, {tickets: [ticket]})
    })

    axios.all(requests).then(axios.spread( (reponse) => {
        if(reloadWhenDone){
            window.location.reload()
        }
    }));
}

const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
  }