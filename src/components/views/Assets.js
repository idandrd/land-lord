import React, { Component } from "react";
import PropTypes from "prop-types";
import { AssetList } from "../AssetList";
import { ContentFrame } from "../ContentFrame";
import { Routes } from "../../common/constants";

const strings = {
  allAssets: "כל הנכסים",
  newAsset: "נכס חדש"
};

export class Assets extends Component {
  render() {
    const assets = this.props.assets || [];
    return (
      <ContentFrame
        firstNavText={strings.allAssets}
        buttonText={strings.newAsset}
        buttonRoute={Routes.newAsset}
      >
        <AssetList assets={assets} />
      </ContentFrame>
    );
  }
}

Assets.propTypes = {
  assets: PropTypes.array
};
