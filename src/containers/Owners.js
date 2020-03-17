import React from "react";
import { connect } from "react-redux";
import { Owners } from "../components/views/Owners";

const Container = props => {
  return <Owners owners={props.tenants} />;
};

const mapStateToProps = state => ({
  tenants: state.Case.owners
});

export const OwnersContainer = connect(mapStateToProps)(Container);
