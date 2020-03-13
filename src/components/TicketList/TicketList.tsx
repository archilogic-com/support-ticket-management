import React, { useEffect, useState } from 'react';
import { Table, Empty, Tag, Tooltip } from 'antd';
import moment from 'moment'
import { StatusColor, TicketTagProps, CreatedAtProps } from 'shared/interfaces'
import './TicketList.css';

interface TicketListProps {
    tickets: any[]
}

const TicketList = (props: TicketListProps) => {
        
    const statusColor: StatusColor = {
        "Open": 'red',
        "Resolved": 'green'
    }

    const resolveTicketColor = (status: string, createdAt: string): string => {
//statusColor[props.status]

        if(status === 'Resolved'){
            return 'green'
        }

        const ticketDate = moment(createdAt)
        const oneDayAfter = moment().add(1, 'day')

        const ticketDuration = moment.duration(moment().diff(ticketDate))

        if(ticketDuration.asDays() < 2){
            return 'gold'
        }

        return 'red'
    }

    const TicketTag = (props: TicketTagProps) => <Tag color={resolveTicketColor(props.status, props.createdAt)}>{props.status}</Tag>
    const CreatedAt = (props: CreatedAtProps) => <Tooltip title={moment(props.date).format('MM/DD/YYYY LT')}>{moment(props.date).fromNow()}</Tooltip>

    const columns = [
        {
            title: 'Submited By',
            dataIndex: 'submitedBy',
            key: 'submitedBy',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Submited',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => <CreatedAt date={date} />
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string, record: any) => <TicketTag status={status} createdAt={record.createdAt} />
        },
    ];

    return (
        <Table
            className="tickets-table"
            dataSource={props.tickets}
            columns={columns}
            pagination={false}
            locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No tickets" /> }}
        />
    )

}

export default TicketList;