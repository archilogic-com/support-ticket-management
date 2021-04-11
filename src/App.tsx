import {
  Button, Col,
  Divider, Layout,
  Modal, Row,
  Select,
  Tag
} from 'antd';
import axios from 'axios';
import FloorPlan from 'components/FloorPlan/FloorPlan';
import TicketList, { resolveTicketColor } from 'components/TicketList/TicketList';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { fetchFloor, FloorState } from 'reducers/floor';
import { selectSpace, SpacesState } from 'reducers/spaces';
import {
  fetchTicketsFromSpaces, filterByDaysRange, filterByStatus, filterTicketsBySpaceId, initTickets,
  resolveTicket, selectTicket, setTickets, TicketsState
} from 'reducers/tickets';
import './App.css';

const { Header, Footer, Content } = Layout;
const { Option } = Select

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const App = (props: Props) => {
  const [sceneId, setSceneId] = useState<any>()
  const [token, setToken] = useState<string>()

  useLayoutEffect(() => {

    // get temporary token
    let tempToken: null | string = null
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/temp-token`).then(response => {
      tempToken = response?.data?.authorization
      if (!tempToken) return;

      setToken(tempToken)

      axios.interceptors.request.use((config) => {
        config.params = config.params || {};

        if (tempToken) {
          config.headers.common['Authorization'] = tempToken;
        }
        return config;
      }, (error) => {
        console.log(error)
        return Promise.reject(error);
      });
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (!token) return
    const urlParams = new URLSearchParams(window.location.search);
    const scene = urlParams.get('sceneId');
    const demoSceneId = scene || 'b6aa6096-bb77-4872-be25-4886a9e5bf06';
    setSceneId(demoSceneId)
  }, [token])

  useEffect(() => {
    if (!sceneId) {
      return
    }
    props.fetchFloor(sceneId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneId])


  useEffect(() => {
    if (props.selectedSpace === null) {
      return
    }
    props.setTickets(props.originalTickets)
    props.filterTicketsBySpaceId(props.selectedSpace.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedSpace])

  const onClearFilters = () => {
    props.setTickets(props.originalTickets)
    props.selectSpace(null)
  }

  const onStatusChange = (value: string) => {
    if (value === 'all') {
      props.setTickets(props.originalTickets)
      return
    }
    props.filterByStatus(value)

  }
  const onDaysFilterChange = (value: string) => {
    props.filterByDaysRange(value)
  }

  const onSpacesLoaded = (spaces: any[]) => {
    props.fetchTicketsFromSpaces(sceneId, spaces)
    //assignSpacesToTickets(spaces)
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo">Ticket Management {props.floorName}</div>
      </Header>
      <Content className="content">
        <Row className="floorplan-row" gutter={[0, 0]}>
          <Col xs={24} sm={24} lg={16} style={{ height: '100%' }} >
            {sceneId &&
              <FloorPlan
                sceneId={sceneId}
                tickets={props.daysRangeFilter ? props.tickets : props.originalTickets}
                onSpacesLoaded={onSpacesLoaded}
              />
            }
          </Col>
          <Col xs={24} sm={24} lg={8} className="side">
            <Row>
              <Col xs={24} lg={24} className="filters-container">
                <Select style={{ width: 100 }} value={props.status} defaultValue="all" placeholder="Show" onChange={onStatusChange} size="small" >
                  <Option value="all">All</Option>
                  <Option value="Open">Open</Option>
                  <Option value="Resolved">Resolved</Option>
                </Select>
                <Divider type="vertical" />
                <Select style={{ width: 120 }} value={props.daysRangeFilter} placeholder="Time range" onChange={onDaysFilterChange} size="small" >
                  <Option value="0-24">0 - 24 hours</Option>
                  <Option value="24-36">24 - 36 hours</Option>
                  <Option value="36-48">36 - 48 hours</Option>
                  <Option value="48-72">48 - 72 hours</Option>
                  <Option value="72-0"> 72 hours</Option>
                </Select>
                <Divider type="vertical" />
                <Button size="small" danger onClick={onClearFilters} disabled={!props.filterApplied}>Clear</Button>
              </Col>
              <Col lg={24}>
                <TicketList tickets={props.tickets} />
                {props.ticketSelected &&
                  <Modal
                    title={props.ticketSelected?.title}
                    visible={props.ticketSelected !== null}
                    onCancel={() => props.selectTicket(null)}
                    className="ticket-modal"
                    footer={[
                      <Button key="back" onClick={() => props.selectTicket(null)}>
                        Close
                      </Button>,
                      <Button key="submit" type="primary" onClick={() => {
                        if (props.ticketSelected) {
                          props.resolveTicket(props.ticketSelected, props.originalTickets)
                          props.selectTicket(null)
                        }
                      }}>
                        Resolve
                      </Button>,
                    ]}
                  >
                    <p><span>Submited by: </span>{props.ticketSelected?.submitedBy}</p>
                    <p><span>Description: </span>{props.ticketSelected?.description}</p>
                    <p><span>Submited: </span>{moment(props.ticketSelected?.createdAt).format('MM/DD/YYYY')} ({moment(props.ticketSelected?.createdAt).fromNow()})</p>
                    <p><span>Status: </span>{<Tag color={resolveTicketColor(props.ticketSelected?.status, props.ticketSelected?.createdAt)}>{props.ticketSelected?.status}</Tag>}</p>
                    <p>{props.ticketSelected?.tags.split(',').map((tag: string, index: number) => <Tag key={index} color="blue">{tag}</Tag>)}</p>
                  </Modal>
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
      <Footer></Footer>
    </Layout>
  );
}

export interface RootState {
  tickets: TicketsState
  spaces: SpacesState
  floor: FloorState
}

const mapState = (state: RootState) => ({
  tickets: state.tickets.tickets,
  originalTickets: state.tickets.originalTickets,
  selectedSpace: state.spaces.selectedSpace,
  ticketSelected: state.tickets.ticketSelected,
  filterApplied: state.tickets.filterApplied,
  status: state.tickets.status,
  daysRangeFilter: state.tickets.daysRangeFilter,
  floorName: state.floor.name
})

const mapDispatch = {
  initTickets,
  setTickets,
  filterTicketsBySpaceId,
  selectSpace,
  selectTicket,
  filterByStatus,
  resolveTicket,
  filterByDaysRange,
  fetchFloor,
  fetchTicketsFromSpaces
}

const connector = connect(mapState, mapDispatch)
export default connector(App);
