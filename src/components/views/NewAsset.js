import React, { Component } from "react";
import { AssetForm } from "../AssetForm";
import { ContentFrame } from "../ContentFrame";
import { Routes } from "../../common/constants";

const strings = {
  allAssets: "כל הנכסים",
  newAsset: "נכס חדש"
};

export class NewAsset extends Component {
  render() {
    return (
      <div>
        <ContentFrame
          firstNavText={strings.allAssets}
          firstNavRoute={Routes.assets}
          secondNavText={strings.newAsset}
        >
          <AssetForm {...this.props} />
        </ContentFrame>
      </div>
    );
  }
}
