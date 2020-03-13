import React, { useEffect, useState } from 'react';
import FloorPlan from 'components/FloorPlan/FloorPlan'
import './App.css';
import { Row, Col, Layout, Select, Button, Divider } from 'antd';
import TicketList from 'components/TicketList/TicketList';
import moment from 'moment'
const { Header, Footer, Content } = Layout;
const { Option } = Select

const tickets = [
  {
    key: '1',
    submitedBy: 'Mike',
    description: 'Main door is broken',
    createdAt: '2020-03-11 16:40',
    status: 'Open',
    tags: 'Other',
    spaceId: '4a021d39-8d92-46d5-a293-ea976ff53167'
  },
  {
    key: '2',
    submitedBy: 'Rick',
    description: 'A/C wont turn on',
    createdAt: '2020-03-10 12:32',
    status: 'Open',
    tags: 'Heat/Air',
    spaceId: '4e74850a-a61e-46b2-91b3-bbe1014db5cb'
  },
  {
    key: '6',
    submitedBy: 'Joe',
    description: 'Wall decal in bad condition',
    createdAt: '2020-03-10 12:32',
    status: 'Open',
    tags: 'Maintenance',
    spaceId: '4e74850a-a61e-46b2-91b3-bbe1014db5cb'
  },
  {
    key: '3',
    submitedBy: 'Mike',
    description: 'Power outlet not working',
    createdAt: '2020-03-08 10:04',
    status: 'Resolved',
    tags: 'Maintenance',
    spaceId: '2a6e9ba8-7fa3-4da6-b1f6-798e8ff06257'
  },
  {
    key: '4',
    submitedBy: 'Juio',
    description: 'Power outlet not working',
    createdAt: '2020-03-03 10:04',
    status: 'Resolved',
    tags: 'Maintenance',
    spaceId: '4a021d39-8d92-46d5-a293-ea976ff53167'
  },
  {
    key: '5',
    submitedBy: 'Pablo',
    description: 'Power outlet not working',
    createdAt: '2020-03-03 10:04',
    status: 'Resolved',
    tags: 'Maintenance',
    spaceId: '016b6ccc-22b1-4ef7-833c-d20a086bbd68'
  },
  {
    key: '7',
    submitedBy: 'Paul',
    description: 'Toilet don\'t flush',
    createdAt: '2020-03-11 15:00',
    status: 'Open',
    tags: 'Maintenance',
    spaceId: '93f2a7e6-3954-4ed8-b125-91cc24e2f3b0'
  },
  {
    key: '8',
    submitedBy: 'Ben',
    description: 'Two chairs missing',
    createdAt: '2020-03-12 15:00',
    status: 'Open',
    tags: 'Maintenance',
    spaceId: 'f254dc04-e2b8-4624-8e29-ac5387717216'
  },
  {
    key: '9',
    submitedBy: 'Ben',
    description: 'A/C wont turn on',
    createdAt: '2020-03-12 15:06',
    status: 'Open',
    tags: 'Heat/Air',
    spaceId: 'f254dc04-e2b8-4624-8e29-ac5387717216'
  },
  {
    key: '10',
    submitedBy: 'Ben',
    description: 'Microwave not working',
    createdAt: '2020-03-12 13:58',
    status: 'Open',
    tags: 'Maintenance',
    spaceId: 'e18a297b-086f-4c02-bf32-416b2a142c94'
  }
];

function App() {
  const [spaceSelected, setSpaceSelected] = useState<any>(undefined)
  const [ticketsFiltered, setTicketsFiltered] = useState<any>([])

  useEffect(() => {
    tickets.sort((a, b) => (a.status > b.status) ? 1 : (a.status === b.status) ? ((moment(a.createdAt).isBefore(moment(b.createdAt))) ? 1 : -1) : -1 )
    setTicketsFiltered(tickets)
  }, [])


  useEffect(() => {
    if(!spaceSelected){
      return
    }
    const spaceTickets = tickets.filter( (space) => space.spaceId === spaceSelected.id)
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

  return (
    <Layout>
      <Header className="header">
        <div className="logo">Ticket Management</div>
      </Header>
      <Content className="content">
        <Row style={{ height: '100%' }} gutter={[0, 0]}>

          <Col span={16} style={{ height: '100%' }} >
            <FloorPlan
              sceneId="415a1828-3aab-4559-a060-55713a1360c8"
              onSpaceSelected={onSpaceSelected}
              spaceSelected={spaceSelected}
              tickets={ticketsFiltered}
            />
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
