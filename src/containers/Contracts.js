import React from "react";
import { connect } from "react-redux";
import { CaseSelectors } from "../redux/reducers/Case";
import { Contracts } from "../components/views/Contracts";

const Container = props => {
  return <Contracts {...props}/>;
};

const mapStateToProps = state => ({
  contracts: CaseSelectors.getPopulatedContracts(state.Case)
});

export const ContractsContainer = connect(mapStateToProps)(Container);
