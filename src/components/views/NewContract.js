import React, { Component } from "react";
import { ContractForm } from "../ContractForm";
import { ContentFrame } from "../ContentFrame";
import { Routes } from "../../common/constants";

const strings = {
  allContracts: "כל החוזים",
  newContract: "חוזה חדש",
  editContract: "ערוך חוזה"
};

export class NewContract extends Component {
  render() {
    return (
      <div>
        <ContentFrame
          firstNavText={strings.allContracts}
          firstNavRoute={Routes.contracts}
          secondNavText={
            this.props.editContract ? strings.editContract : strings.newContract
          }
        >
          <ContractForm {...this.props} />
        </ContentFrame>
      </div>
    );
  }
}
