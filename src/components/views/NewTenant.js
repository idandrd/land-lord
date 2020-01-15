import React, { Component } from "react";
import { TenantForm } from "../TenantForm";
import { ContentFrame } from "../ContentFrame";
import { Routes } from "../../common/constants";

const strings = {
  allTenantas: "כל השוכרים",
  newTenant: "שוכר חדש",
  editTenant: "ערוך שוכר"
};

export class NewTenant extends Component {
  render() {
    return (
      <div>
        <ContentFrame
          firstNavText={strings.allTenantas}
          firstNavRoute={Routes.tenants}
          secondNavText={
            this.props.editTenant ? strings.editTenant : strings.newTenant
          }
        >
          <TenantForm {...this.props} />
        </ContentFrame>
      </div>
    );
  }
}
