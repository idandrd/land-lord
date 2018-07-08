import React, { Component } from "react";
import PropTypes from "prop-types";
import { ContentFrame } from "../ContentFrame";
import { Routes } from "../../common/constants";

const strings = {
  buttonTitle: "חוזה חדש",
  modalCancelText: "ביטול",
  allContracts: "כל החוזים"
};

export class Contracts extends Component {
  render() {
    return (
      <ContentFrame
        firstNavText={strings.allContracts}
        buttonText={strings.buttonTitle}
        buttonRoute={Routes.newContract}
      >
      [Contract list goes here]
      </ContentFrame>
    );
  }
}

Contracts.propTypes = {
};
