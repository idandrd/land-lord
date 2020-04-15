import React from "react";
import { connect } from "react-redux";
import { Owners } from "../components/views/Owners";

const Container = props => {
  return <Owners owners={props.owners} />;
};

const mapStateToProps = state => ({
  owners: state.Case.owners
});

export const OwnersContainer = connect(mapStateToProps)(Container);
