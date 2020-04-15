import React, { Component } from "react";
import { OwnerForm } from "../OwnerForm";
import { ContentFrame } from "../ContentFrame";
import { Routes } from "../../common/constants";

const strings = {
  allOwners: "בעלי נכסים",
  NewOwner: "בעלים חדש",
  editOwner: "ערוך בעלים"
};

export class NewOwner extends Component {
  render() {
    return (
      <div>
        <ContentFrame
          firstNavText={strings.allOwners}
          firstNavRoute={Routes.owners}
          secondNavText={
            this.props.editOwner ? strings.editOwner : strings.NewOwner
          }
        >
          <OwnerForm {...this.props} />
        </ContentFrame>
      </div>
    );
  }
}
