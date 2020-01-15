import React, { Component } from "react";
import { AssetForm } from "../AssetForm";
import { ContentFrame } from "../ContentFrame";
import { Routes } from "../../common/constants";

const strings = {
  allAssets: "כל הנכסים",
  newAsset: "נכס חדש",
  editAsset: "ערוך נכס"
};

export class NewAsset extends Component {
  render() {
    return (
      <div>
        <ContentFrame
          firstNavText={strings.allAssets}
          firstNavRoute={Routes.assets}
          secondNavText={
            this.props.editAsset ? strings.editAsset : strings.newAsset
          }
        >
          <AssetForm {...this.props} />
        </ContentFrame>
      </div>
    );
  }
}
