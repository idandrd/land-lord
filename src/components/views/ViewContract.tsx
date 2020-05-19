import React, { Component } from "react";
import { ContentFrame } from "../ContentFrame";
import { Routes } from "../../common/constants";

const strings = {
  allContracts: "כל החוזים",
  viewContract: "צפיה בחוזה"
};

export class ContractView extends Component<any, any> {
  render() {
    console.log(this.props)
    return (
      <div>
        <ContentFrame
          firstNavText={strings.allContracts}
          firstNavRoute={Routes.contracts}
          secondNavText={strings.viewContract}
        >
          hello world!
          {this.props.contract && this.props.contract.id}
          {/* <ContractForm {...this.props} /> */}
        </ContentFrame>
      </div>
    );
  }
}
