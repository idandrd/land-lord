import React from "react";
import { FormItem } from "./FormItem";
import { Input, Button } from "antd";

export class AuthForm extends React.Component {
  state = { email: "", password: "" };
  render() {
    return (
      <div>
        <FormItem label="Email">
          <Input
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            type="email"
          />
        </FormItem>
        <FormItem label="Password">
          <Input
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
          />
        </FormItem>
        <Button>Signup</Button>
      </div>
    );
  }
}
