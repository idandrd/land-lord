import React from "react";
import { FormItem } from "./FormItem";
import { Input, Button } from "antd";
import { firebaseService } from "../service/fireBase";
import { StyledFirebaseAuth } from "react-firebaseui";

export class AuthForm extends React.Component {
  render() {
    const fb = firebaseService.getInstance();
    const uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebaseService.getInstance().auth.GoogleAuthProvider.PROVIDER_ID
      ]
    };
    return (
      <div>
        <h1>Welcome to Land Lord</h1>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fb.auth()} />
      </div>
    );
  }
}
