import React, { Component } from "react";
import { ContentFrame } from "../ContentFrame";
import { Routes } from "../../common/constants";
import { ContractList } from "../ContractList";
import { PopulatedContract } from "../../types";

const strings = {
  buttonTitle: "חוזה חדש",
  modalCancelText: "ביטול",
  allContracts: "כל החוזים"
};

export class Contracts extends Component<{
  contracts: PopulatedContract[];
}> {
  render() {
    return (
      <ContentFrame
        firstNavText={strings.allContracts}
        buttonText={strings.buttonTitle}
        buttonRoute={Routes.newContract}
      >
        <ContractList contracts={this.props.contracts} />
      </ContentFrame>
    );
  }
}
