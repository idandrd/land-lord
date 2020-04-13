import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NewOwner } from "../components/views/NewOwner";
import { CaseSelectors } from "../redux/reducers/Case";
import { ContractActions, FormActions } from "../redux/actions/contractForm";

const Container = props => {
  const actions = {
    setContractTenantId: props.setContractTenantId,
    setContractAssetId: props.setContractAssetId,
    setContractUnitId: props.setContractUnitId,
    setContractSigningDate: props.setContractSigningDate,
    setContractFirstCheckDate: props.setContractFirstCheckDate,
    setContractAmountOfChecksRecieved: props.setContractAmountOfChecksRecieved,
    onSubmit: props.onSubmit
  };

  const formProps = {
    contract: props.contract,
    actions,
    tenants: props.tenants,
    assets: props.assets,
    editContract: props.editContract
  };

  return <NewOwner {...formProps} />;
};

const mapStateToProps = (state, ownProps) => {
  return {
    contract: state.ContractForm,
    tenants: state.Case.tenants,
    assets: state.Case.assets,
    editContract: CaseSelectors.getContract(state.Case, ownProps.match.params.id)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      ...ContractActions,
      onSubmit: FormActions.saveContract
    },
    dispatch
  );
};

export const OwnerFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
