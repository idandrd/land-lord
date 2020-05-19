import React from "react";
import { connect } from "react-redux";
import { CaseSelectors } from "../redux/reducers/Case";
import { ContractView } from "../components/views/ViewContract";

const Container = (props) => {
  return <ContractView {...props} />;
};

const mapStateToProps = (state, ownProps) => ({
  contract: CaseSelectors.getPopulatedContract(
    state.Case,
    ownProps.match.params.id
  ),
});

export const ContractViewContainer = connect(mapStateToProps)(Container);
