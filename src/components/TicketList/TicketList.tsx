import React from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { selectTicket, resolveTicket } from 'reducers/tickets'
import { RootState } from 'App';
import { Table, Empty, Tag, Tooltip, Popconfirm, Button } from 'antd';
import moment from 'moment'
import { TicketTagProps, CreatedAtProps, Ticket } from 'shared/interfaces'
import {
    EyeOutlined
} from '@ant-design/icons';
import './TicketList.css';

interface TicketListProps {
    tickets: Ticket[]
}

export const resolveTicketColor = (status?: string, createdAt?: string): string => {

    if (status === 'Resolved') {
        return 'green'
    }

    const ticketDate = moment(createdAt)
    const ticketDuration = moment.duration(moment().diff(ticketDate))

    if (ticketDuration.asDays() < 2) {
        return 'gold'
    }

    return 'red'
}

type PropsFromRedux = TicketListProps & ConnectedProps<typeof connector>

const TicketList = (props: PropsFromRedux) => {


    const onConfirm = (ticket: Ticket): any => {
        props.resolveTicket(ticket)
    }

    const TicketTag = (props: TicketTagProps) => {
        return (
            <>
                {
                    props.status === 'Open' ? (
                        <Popconfirm
                            title="Are you sure resolve this ticket?"
                            onConfirm={() => onConfirm(props.ticket)}
                            placement="left"
                            okText="Yes"
                            cancelText="No"
                        >
                            <Tag className="clickable" color={resolveTicketColor(props.status, props.createdAt)}>{props.status}</Tag>
                        </Popconfirm>
                    ) : (<Tag color={resolveTicketColor(props.status, props.createdAt)}>{props.status}</Tag>
                        )
                }
            </>
        )
    }
    const CreatedAt = (props: CreatedAtProps) => <Tooltip title={moment(props.date).format('MM/DD/YYYY LT')}>{moment(props.date).fromNow()}</Tooltip>

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Submited',
            dataIndex: 'createdAt',
            key: 'createdAt',
            ellipsis: true,
            render: (date: string) => <CreatedAt date={date} />

        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            ellipsis: true,
            render: (status: string, record: Ticket) => <TicketTag status={status} createdAt={record.createdAt} ticket={record} />
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, ticket: Ticket) => {
                return (
                    <span>
                        <Button type="link" onClick={event => props.selectTicket(ticket)}>View</Button>
                    </span>
                )
            }
        }
    ];

return (
    <Table
        className="tickets-table"
        dataSource={props.tickets}
        columns={columns}
        locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No tickets" /> }}
        tableLayout="fixed"
        loading={props.loading}
        pagination={{
            defaultPageSize: 9,
            hideOnSinglePage: true
        }}
    />
)

}

const mapState = (state: RootState) => ({
    loading: state.tickets.loading
})

const mapDispatch = {
    selectTicket,
    resolveTicket
}

const connector = connect(mapState, mapDispatch)
export default connector(TicketList);