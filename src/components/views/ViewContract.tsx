import React, { Component } from "react";
import { ContentFrame } from "../ContentFrame";
import { Routes } from "../../common/constants";

const strings = {
  allContracts: "כל החוזים",
  viewContract: "צפיה בחוזה"
};

export class ContractView extends Component {
  render() {
    return (
      <div>
        <ContentFrame
          firstNavText={strings.allContracts}
          firstNavRoute={Routes.contracts}
          secondNavText={strings.viewContract}
        >
          hello world!
          {/* <ContractForm {...this.props} /> */}
        </ContentFrame>
      </div>
    );
  }
}
