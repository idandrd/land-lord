import React, { Component } from "react";
import PropTypes from "prop-types";
import { TenantList } from "../TenantList";
import { ContentFrame } from "../ContentFrame";
import { Routes } from "../../common/constants";

const strings = {
  modalTitle: "שוכר חדש",
  modalOkText: "שמור",
  modalCancelText: "ביטול",
  allTenantas: "כל השוכרים"
};

export class Tenants extends Component {
  render() {
    const tenants = this.props.tenants || [];
    return (
      <ContentFrame
        firstNavText={strings.allTenantas}
        buttonText={strings.modalTitle}
        buttonRoute={Routes.newTenant}
      >
        <TenantList tenants={tenants} />
      </ContentFrame>
    );
  }
}

Tenants.propTypes = {
  tenants: PropTypes.array
};
