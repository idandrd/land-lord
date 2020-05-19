import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Layout } from "antd";
import { getStore } from "./redux/configureStore";
import "./App.css";
import SideBar from "./components/SideBar";
import { Spin } from "antd";

import { TasksContainer } from "./containers/Tasks";

import { TenantsContainer } from "./containers/Tenants";
import { TenantFormContainer } from "./containers/TenantForm";

import { AssetsContainer } from "./containers/Assets";
import { AssetFormContainer } from "./containers/AssetForm";

import { ContractsContainer } from "./containers/Contracts";
import { ContractFormContainer } from "./containers/ContractForm";
import { ContractViewContainer } from "./containers/ContractView";

import { OwnersContainer } from "./containers/Owners";
import { OwnerFormContainer } from "./containers/OwnerForm";

import { AuthForm } from "./components/AuthForm";

import { AppActions } from "./redux/actions/app";
import { Routes } from "./common/constants";
import { firebaseService } from "./service/fireBase";

const store = getStore();
const { Header, Content } = Layout;

class App extends Component {
  state = { loggedIn: false, loadingAuth: true };

  componentDidMount() {
    const action = AppActions.initFirebase();
    store.dispatch(action);
    firebaseService.onAuthStateChanged((user) =>
      this.setState({ loggedIn: user != null, loadingAuth: false })
    );
  }

  render() {
    return (
      <Router>
        {this.state.loadingAuth ? (
          <Spin size="large" />
        ) : (
          <Provider store={store as any}>
            <div>{this.state.loggedIn ? <AppMain /> : <AuthForm />}</div>
          </Provider>
        )}
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
          minHeight: 280,
        }}
      >
        <Switch>
          <Route exact path="/" render={() => <h1>Welcome to LandLord!</h1>} />
          <Route path={Routes.tasks} component={TasksContainer} />
          <Route path={Routes.viewContract} component={ContractViewContainer} />

          <Route path={Routes.newTenant} component={TenantFormContainer} />
          <Route path={Routes.newAsset} component={AssetFormContainer} />
          <Route path={Routes.newContract} component={ContractFormContainer} />
          <Route path={Routes.newOwner} component={OwnerFormContainer} />

          <Route path={Routes.editTenant} component={TenantFormContainer} />
          <Route path={Routes.editAsset} component={AssetFormContainer} />
          <Route path={Routes.editContract} component={ContractFormContainer} />

          <Route path={Routes.tenants} component={TenantsContainer} />
          <Route path={Routes.assets} component={AssetsContainer} />
          <Route path={Routes.contracts} component={ContractsContainer} />
          <Route path={Routes.owners} component={OwnersContainer} />

        </Switch>
      </Content>
    </Layout>
  </Layout>
);

export default App;
