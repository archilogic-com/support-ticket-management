import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux'
import FloorPlan from 'components/FloorPlan/FloorPlan'
import './App.css';
import { Row, Col, Layout, Select, Button, Divider, Drawer } from 'antd';
import TicketList from 'components/TicketList/TicketList';
import { TicketsState, initTickets, setTickets, filterTicketsBySpaceId, selectTicket, filterByStatus } from 'reducers/tickets';
import { SpacesState, selectSpace } from 'reducers/spaces';
const { Header, Footer, Content } = Layout;
const { Option } = Select

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const App = (props: Props) => {
  const [sceneId, setSceneId] = useState<any>()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const scene = urlParams.get('scene');
    const demoSceneId = scene || '415a1828-3aab-4559-a060-55713a1360c8';
    setSceneId(demoSceneId)
  }, [])


  useEffect(() => {
    if (props.selectedSpace === null) {
      return
    }
    props.setTickets(props.originalTickets)
    props.filterTicketsBySpaceId(props.selectedSpace.id)
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

  const onSpacesLoaded = (spaces: any[]) => {
    props.initTickets(spaces)
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo">Ticket Management</div>
      </Header>
      <Content className="content">
        <Row className="floorplan-row"  gutter={[0, 0]}>
          <Col xs={24} sm={24} lg={16} style={{ height: '100%' }} >
            {sceneId &&
              <FloorPlan
                sceneId={sceneId}
                tickets={props.originalTickets}
                onSpacesLoaded={onSpacesLoaded}
              />
            }
          </Col>
          <Col xs={24} sm={24} lg={8} className="side">
            <Row>
              <Col xs={24} lg={24} className="filters-container">
                <Select style={{ width: 120 }} value={props.status} defaultValue="all" placeholder="Show" onChange={onStatusChange} size="small" >
                  <Option value="all">All</Option>
                  <Option value="Open">Open</Option>
                  <Option value="Resolved">Resolved</Option>
                </Select>
                <Divider type="vertical" />
                <Select style={{ width: 120 }} placeholder="Time range" size="small" >
                  <Option value="0-24">0 - 24 hours</Option>
                  <Option value="24-36">24 - 36 hours</Option>
                  <Option value="36-48">36 - 48 hours</Option>
                  <Option value="48-72">48 - 72 hours</Option>
                  <Option value="72-more">> 72 hours</Option>
                </Select>
                <Divider type="vertical" />
                <Button size="small" danger onClick={onClearFilters} disabled={!props.filterApplied}>Clear</Button>
              </Col>
              <Col lg={24}>
                <TicketList tickets={props.tickets} />
                <Drawer
                  title="Basic Drawer"
                  placement="right"
                  visible={/*props.ticketSelected !== null*/false}
                  onClose={() => props.selectTicket(null)}
                >
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </Drawer>
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
}

const mapState = (state: RootState) => ({
  tickets: state.tickets.tickets,
  originalTickets: state.tickets.originalTickets,
  selectedSpace: state.spaces.selectedSpace,
  ticketSelected: state.tickets.ticketSelected,
  filterApplied: state.tickets.filterApplied,
  status: state.tickets.status,
})

const mapDispatch = {
  initTickets,
  setTickets,
  filterTicketsBySpaceId,
  selectSpace,
  selectTicket,
  filterByStatus
}

const connector = connect(mapState, mapDispatch)
export default connector(App);
