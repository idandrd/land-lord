import React from "react";
import { connect } from "react-redux";
import { Tenants } from "../components/views/Tenants";

const Container = props => {
  return <Tenants tenants={props.tenants} />;
};

const mapStateToProps = state => ({
  tenants: state.Case.tenants
});

export const TenantsContainer = connect(mapStateToProps)(Container);
