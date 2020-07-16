import React, { Component } from "react";
import { ContentFrame } from "../ContentFrame";
import { ViewContract } from "../ContractView";
import { Routes } from "../../common/constants";
import { Spin } from "antd";

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
          {this.props.contract ? (
            <ViewContract contract={this.props.contract} />
          ) : (
            <Spin size="large" />
          )}
        </ContentFrame>
      </div>
    );
  }
}
