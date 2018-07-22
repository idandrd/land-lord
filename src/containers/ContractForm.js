import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NewContract } from "../components/views/NewContract";
import { AssetActions, FormActions } from "../redux/actions/assetForm";

const Container = props => {
  const actions = {
    setAssetName: props.setAssetName,
    setAssetCity: props.setAssetCity,
    setAssetAddress: props.setAssetAddress,
    setAssetYear: props.setAssetYear,
    setAssetFloors: props.setAssetFloors,
    onSubmit: props.onSubmit
  };

  const formProps = {
    asset: props.asset,
    actions,
    tenants: props.tenants,
    assets: props.assets
  };
  return <NewContract {...formProps} />;
};

const mapStateToProps = state => ({
  asset: state.AssetForm.asset,
  tenants: state.Case.tenants,
  assets: state.Case.assets
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setAssetName: AssetActions.setAssetName,
      setAssetCity: AssetActions.setAssetCity,
      setAssetAddress: AssetActions.setAssetAddress,
      setAssetYear: AssetActions.setAssetYear,
      setAssetFloors: AssetActions.setAssetFloors,

      onSubmit: FormActions.saveAsset
    },
    dispatch
  );
};

export const ContractFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
