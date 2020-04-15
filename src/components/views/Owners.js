import React, { Component } from "react";
import PropTypes from "prop-types";
import { OwnerList } from "../OwnerList";
import { ContentFrame } from "../ContentFrame";
import { Routes } from "../../common/constants";

const strings = {
  modalTitle: "בעלים חדש",
  modalOkText: "שמור",
  modalCancelText: "ביטול",
  allOwners: "בעלי נכסים"
};

export class Owners extends Component {
  render() {
    const owners = this.props.owners || [];
    return (
      <ContentFrame
        firstNavText={strings.allOwners}
        buttonText={strings.modalTitle}
        buttonRoute={Routes.newOwner}
      >
        <OwnerList owners={owners} />
      </ContentFrame>
    );
  }
}

Owners.propTypes = {
  owners: PropTypes.array
};
