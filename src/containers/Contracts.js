import React from "react";
import { connect } from "react-redux";
import { Contracts } from "../components/views/Contracts";

const Container = props => {
  return <Contracts />;
};

const mapStateToProps = state => ({
  tenants: state.Case.tenants
});

export const ContractsContainer = connect(mapStateToProps)(Container);
