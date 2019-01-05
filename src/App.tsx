import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Layout } from "antd";
import { getStore } from "./redux/configureStore";
import "./App.css";
import SideBar from "./components/SideBar";

import { TasksContainer } from "./containers/Tasks";

import { TenantsContainer } from "./containers/Tenants";
import { TenantFormContainer } from "./containers/TenantForm";

import { AssetsContainer } from "./containers/Assets";
import { AssetFormContainer } from "./containers/AssetForm";

import { ContractsContainer } from "./containers/Contracts";
import { ContractFormContainer } from "./containers/ContractForm";

import { AuthForm } from "./components/AuthForm";

import { AppActions } from "./redux/actions/app";
import { Routes } from "./common/constants";

const store = getStore();
const { Header, Content } = Layout;

class App extends Component {
  componentDidMount() {
    const action = AppActions.initFirebase();
    store.dispatch(action);
  }

  render() {
    return (
      <Router>
        <Provider store={store}>
          <Switch>
            <Route path="/auth" component={AuthForm} />
            <Route path="/" component={AppMain} />
          </Switch>
        </Provider>
      </Router>
    );
  }
}

const AppMain = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <SideBar />
    <Layout>
      <Header style={{ background: "#fff", padding: 0 }} />
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          background: "#fff",
          minHeight: 280
        }}
      >
        <Switch>
          <Route exact path="/" render={() => <h1>Welcome to LandLord!</h1>} />
          <Route path={Routes.tasks} component={TasksContainer} />
          <Route path={Routes.newTenant} component={TenantFormContainer} />
          <Route path={Routes.newAsset} component={AssetFormContainer} />
          <Route path={Routes.newContract} component={ContractFormContainer} />
          <Route path={Routes.tenants} component={TenantsContainer} />
          <Route path={Routes.assets} component={AssetsContainer} />
          <Route path={Routes.contracts} component={ContractsContainer} />
        </Switch>
      </Content>
    </Layout>
  </Layout>
);

export default App;
