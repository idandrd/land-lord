import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { Routes } from "../common/constants";
import { firebaseService } from "../service/fireBase";

const { Sider } = Layout;

const strings = {
  tastks: "משימות",
  assets: "נכסים",
  tenants: "שוכרים",
  contracts: "חוזים",
  owners: "בעלים",
  settings: "הגדרות",
  logout: "התנתק"
};

class SideBar extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <div className="logo">
          <img
            style={{ width: 30, marginLeft: 10 }}
            src="https://cdn4.iconfinder.com/data/icons/fashion-vol-2/72/84-512.png"
            alt="landlord icon"
          />
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key={strings.tastks}>
            <Link to={Routes.tasks}>
              <Icon type="rocket" />
              <span>{strings.tastks}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key={strings.contracts}>
            <Link to={Routes.contracts}>
              <Icon type="copy" />
              <span>{strings.contracts}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={Routes.assets}>
              <Icon type="home" />
              <span>{strings.assets}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="10">
            <Link to={Routes.tenants}>
              <Icon type="team" />
              <span>{strings.tenants}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="11">
            <Link to={Routes.owners}>
              <Icon type="idcard" />
              <span>{strings.owners}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="12">
            <Link to={Routes.tenants}>
              <Icon type="setting" />
              <span>{strings.settings}</span>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <div
              onClick={() => {
                firebaseService.logout();
              }}
            >
              <Icon type="logout" />
              <span>{strings.logout}</span>
            </div>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SideBar;
