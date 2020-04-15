import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NewOwner } from "../components/views/NewOwner";
// import { CaseSelectors } from "../redux/reducers/Case";
import { FormActions } from "../redux/actions/ownerForm";

const Container = props => <NewOwner {...props} />;

const mapStateToProps = (state, ownProps) => ({
  editOwner: undefined
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      onSubmit: FormActions.saveOwner
    },
    dispatch
  );
};

export const OwnerFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
