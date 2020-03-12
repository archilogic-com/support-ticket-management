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

    const TicketTag = (props: TicketTagProps) => <Tag color={statusColor[props.status]}>{props.status}</Tag>
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
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => <CreatedAt date={date} />
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => <TicketTag status={status} />
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