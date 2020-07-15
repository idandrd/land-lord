import React, { Component } from "react";
import { ContentFrame } from "../ContentFrame";
import { Routes } from "../../common/constants";

const strings = {
  allContracts: "כל החוזים",
  viewContract: "צפיה בחוזה",
};

export class ContractView extends Component<any, any> {
  render() {
    console.log(this.props);
    return (
      <div>
        <ContentFrame
          firstNavText={strings.allContracts}
          firstNavRoute={Routes.contracts}
          secondNavText={strings.viewContract}
        >
          hello world!
          <br />
          {this.props.contract && this.props.contract.id}
          <br />
          {this.props.contract && this.props.contract.tenant.name}
          <br />
          {this.props.contract && JSON.stringify(this.props.contract)}
          {/* <ContractForm {...this.props} /> */}
        </ContentFrame>
      </div>
    );
  }
}
