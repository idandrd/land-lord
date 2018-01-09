import React, { Component } from 'react';
import './App.css';
import { Layout} from 'antd';
import SideBar from './components/SideBar'
import ContactsTable from './components/ContactsTable'

const { Header, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideBar/>
        <Layout>
          <Header style={{ background: '#ffd', padding: 0 }}>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            Welcome to LandLord
            <ContactsTable/>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
