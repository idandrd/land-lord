import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { TenantForm } from "../components/TenantForm";
import { Actions } from "../actions/tenantForm";

const Container = props => {
  const fields = {
    isBusiness: {
      value: props.tenantIsBusiness,
      onChange: props.setTenantIsBusiness
    },
    name: {
      value: props.tenantName,
      onChange: props.setTenantName
    },
    num: {
      value: props.tenantNum,
      onChange: props.setTenantNum
    },
    type: {
      value: props.tenantType,
      onChange: props.setTenantType
    },
    comments: {
      value: props.tenantComments,
      onChange: props.setTenantComments
    }
  };
  return <TenantForm fields={fields} />;
};

const mapStateToProps = state => ({
  tenantIsBusiness: state.TenantForm.tenantIsBusiness,
  tenantName: state.TenantForm.tenantName,
  tenantNum: state.TenantForm.tenantNum,
  tenantType: state.TenantForm.tenantType,
  tenantComments: state.TenantForm.tenantComments
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setTenantIsBusiness: Actions.setTenantIsBusiness,
      setTenantName: Actions.setTenantName,
      setTenantNum: Actions.setTenantNum,
      setTenantType: Actions.setTenantType,
      setTenantComments: Actions.setTenantComments
    },
    dispatch
  );
};

export const TenantFormContainer = connect(mapStateToProps, mapDispatchToProps)(
  Container
);
