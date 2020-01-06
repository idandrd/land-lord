import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NewTenant } from "../components/views/NewTenant";
import {
  TenantActions,
  ContactActions,
  FormActions
} from "../redux/actions/tenantForm";

const Container = props => {
  const contacts = [
    ...props.tenant.contacts.map((v, k) => ({ ...v, id: k })).values()
  ];
  const tenant = { ...props.tenant, contacts };

  const actions = {
    setTenantIsBusiness: props.setTenantIsBusiness,
    setTenantName: props.setTenantName,
    setTenantNum: props.setTenantNum,
    setTenantType: props.setTenantType,
    setTenantComments: props.setTenantComments,
    addContact: props.addContact,
    onSubmit: props.onSubmit
  };

  const contactActions = {
    setContactName: props.setContactName,
    setContactRole: props.setContactRole,
    setContactPhone: props.setContactPhone,
    setContactEmail: props.setContactEmail,
    removeContact: props.removeContact
  };

  const formProps = { tenant, actions, contactActions };
  return <NewTenant {...formProps} />;
};

const mapStateToProps = (state, ownProps) => {
  return { tenant: state.TenantForm.tenant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setTenantIsBusiness: TenantActions.setTenantIsBusiness,
      setTenantName: TenantActions.setTenantName,
      setTenantNum: TenantActions.setTenantNum,
      setTenantType: TenantActions.setTenantType,
      setTenantComments: TenantActions.setTenantComments,

      addContact: TenantActions.addContact,
      removeContact: ContactActions.removeContact,

      setContactName: ContactActions.setContactName,
      setContactRole: ContactActions.setContactRole,
      setContactPhone: ContactActions.setContactPhone,
      setContactEmail: ContactActions.setContactEmail,

      onSubmit: FormActions.saveTenant
    },
    dispatch
  );
};

export const TenantFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
