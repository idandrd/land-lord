import React, { Component } from "react";
import { ContentFrame } from "../ContentFrame";
import { Routes } from "../../common/constants";
import { ContractList } from "../ContractList";

const strings = {
  buttonTitle: "חוזה חדש",
  modalCancelText: "ביטול",
  allContracts: "כל החוזים"
};

export class Contracts extends Component {
  render() {
    console.log("contracts: ", this.props.contracts);
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

Contracts.propTypes = {};
