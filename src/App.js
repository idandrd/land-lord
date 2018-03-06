import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Layout } from "antd";
import { getStore } from "./redux/configureStore";
import "./App.css";
import SideBar from "./components/SideBar";
import Tenants from "./containers/Tenants";

const store = getStore();
const { Header, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
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
                  <Route
                    exact
                    path="/"
                    render={() => <h1>Welcome to LandLord!</h1>}
                  />
                  <Route path="/tenants" component={Tenants} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Provider>
      </Router>
    );
  }
}

export default App;
