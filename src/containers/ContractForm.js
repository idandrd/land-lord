import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NewContract } from "../components/views/NewContract";
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
    contract: props.contarct,
    actions,
    tenants: props.tenants,
    assets: props.assets
  };
  return <NewContract {...formProps} />;
};

const mapStateToProps = state => ({
  contract: state.ContractForm,
  tenants: state.Case.tenants,
  assets: state.Case.assets
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      ...ContractActions,
      onSubmit: FormActions.saveAsset
    },
    dispatch
  );
};

export const ContractFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
