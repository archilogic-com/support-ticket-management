import React, { useEffect, useState } from 'react';
import FloorPlan from 'components/FloorPlan/FloorPlan'
import './App.css';
import { Row, Col, Layout, Select, Button, Divider } from 'antd';
import TicketList from 'components/TicketList/TicketList';
import moment from 'moment'
import { tickets, assignSpacesToTickets } from 'data/ticketsData'
const { Header, Footer, Content } = Layout;
const { Option } = Select


function App() {
  const [spaceSelected, setSpaceSelected] = useState<any>(undefined)
  const [ticketsFiltered, setTicketsFiltered] = useState<any[]>([])
  const [tickets, setTickets] = useState<any[]>([])
  const [sceneId, setSceneId] = useState<any>()
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const scene = urlParams.get('scene');
    const demoSceneId = scene || '415a1828-3aab-4559-a060-55713a1360c8'; //a9aaafdf-d5b6-4b4a-82a0-9efb6d5b155a

    console.log(demoSceneId)
    setSceneId(demoSceneId)
  }, [])

  useEffect(() => {
    tickets.sort((a, b) => (a.status > b.status) ? 1 : (a.status === b.status) ? ((moment(b.createdAt).isBefore(moment(a.createdAt))) ? 1 : -1) : -1)
    setTicketsFiltered(tickets)
  }, [tickets])

  useEffect(() => {
    if (!spaceSelected) {
      return
    }
    const spaceTickets = tickets.filter((space) => space.spaceId === spaceSelected.id)
    setTicketsFiltered(spaceTickets)
  }, [spaceSelected])

  const onSpaceSelected = (space: any) => {
    setSpaceSelected(space)
  }

  const onClearFilters = () => {
    setTicketsFiltered(tickets)
    setSpaceSelected(undefined)
  }

  const disableClearFilters = (): boolean => {
    return spaceSelected === undefined
  }

  const onSpacesLoaded = (spaces: any[]) => {
    const tickets = assignSpacesToTickets(spaces)
    setTickets(tickets)
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo">Ticket Management</div>
      </Header>
      <Content className="content">
        <Row style={{ height: '100%' }} gutter={[0, 0]}>

          <Col span={16} style={{ height: '100%' }} >
            {sceneId &&
              <FloorPlan
                sceneId={sceneId}
                onSpaceSelected={onSpaceSelected}
                spaceSelected={spaceSelected}
                tickets={ticketsFiltered}
                onSpacesLoaded={onSpacesLoaded}
              />
            }
          </Col>

          <Col span={8} className="side">
            <Row>
              <Col span={24} className="filters-container">
                <Select style={{ width: 120 }} placeholder="Show" size="small" >
                  <Option value="all">All</Option>
                  <Option value="open">Open</Option>
                  <Option value="resolved">Resolved</Option>
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
                <Button size="small" danger onClick={onClearFilters} disabled={disableClearFilters()}>Clear Filters</Button>
              </Col>
              <Col span={24}>
                <TicketList tickets={ticketsFiltered} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
      <Footer></Footer>
    </Layout>

  );
}

export default App;
