import React from "react";
import { connect } from "react-redux";
import { Assets } from "../components/views/Assets";

const Container = props => {
  return <Assets assets={props.assets} />;
};

const mapStateToProps = state => ({
  assets: state.Case.assets
});

export const AssetsContainer = connect(mapStateToProps)(Container);
