import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { NavLink, Link } from 'react-router-dom'

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const strings = {
  tastks: 'משימות',
  assets: 'נכסים',
  tenants: 'שוכרים',
  contracts: 'חוזים',
}

class SideBar extends Component {
  state = {
    collapsed: false,
  }


  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    const { collapsed } = this.state
    return (
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>{strings.tastks}</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>{strings.assets}</span>
          </Menu.Item>
          <Menu.Item key="10">
          <Link to='/tenants'>
            <Icon type="team" />
            <span>{strings.tenants}</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub2"
            title={<span><Icon type="user" /><span>Team</span></span>}
          >
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <Icon type="file" />
            <span>File</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SideBar;
