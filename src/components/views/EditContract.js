import React, { Component } from "react";
import { ContractForm } from "../ContractForm";
import { ContentFrame } from "../ContentFrame";
import { Routes } from "../../common/constants";

const strings = {
  allContracts: "כל החוזים",
  newContract: "חוזה חדש"
};

export class NewContract extends Component {
  render() {
    return (
      <div>
        <ContentFrame
          firstNavText={strings.allContracts}
          firstNavRoute={Routes.contracts}
          secondNavText={strings.newContract}
        >
          <ContractForm {...this.props} />
        </ContentFrame>
      </div>
    );
  }
}
