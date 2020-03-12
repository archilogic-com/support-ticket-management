import React, { useEffect, useState } from 'react';
import FloorPlan from 'components/FloorPlan/FloorPlan'
import './App.css';
import { Row, Col, Layout, Empty } from 'antd';
import TicketList from 'components/TicketList/TicketList';
const { Header, Footer, Sider, Content } = Layout;

const dataSource = [
  {
    key: '1',
    submitedBy: 'Mike',
    description: 'Main door is broken',
    createdAt: '2020-03-11 16:40',
    status: 'Open',
  },
  {
    key: '2',
    submitedBy: 'Rick',
    description: 'A/C wont turn on',
    createdAt: '2020-03-10 12:32',
    status: 'Open',
  },
  {
    key: '6',
    submitedBy: 'Joe',
    description: 'Wall decal in bad condition',
    createdAt: '2020-03-10 12:32',
    status: 'Open',
  },
  {
    key: '3',
    submitedBy: 'Mike',
    description: 'Power outlet not working',
    createdAt: '2020-03-08 10:04',
    status: 'Resolved',
  },
  {
    key: '4',
    submitedBy: 'Juio',
    description: 'Power outlet not working',
    createdAt: '2020-03-03 10:04',
    status: 'Resolved',
  },
  {
    key: '5',
    submitedBy: 'Pablo',
    description: 'Power outlet not working',
    createdAt: '2020-03-03 10:04',
    status: 'Resolved',
  },
];

function App() {
  const [spaceSelected, setSpaceSelected] = useState<any>(undefined)

  const onSpaceSelected = (space: any) => {
    setSpaceSelected(space)
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo">Ticket Management</div>
      </Header>
      <Content className="content">
        <Row style={{ height: '100%' }} gutter={[0, 0]}>

          <Col span={16} style={{ height: '100%' }} >
            <FloorPlan onSpaceSelected={onSpaceSelected} spaceSelected={spaceSelected} />
          </Col>

          <Col span={8}>
            {spaceSelected ? (
              <TicketList tickets={dataSource} />
            ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Select a space to start"
                  style={{ height: '300px', margin: '10px', paddingTop: '20px', backgroundColor: '#fff' }}
                />
              )
            }
          </Col>

        </Row>
      </Content>
      <Footer></Footer>
    </Layout>

  );
}

export default App;
