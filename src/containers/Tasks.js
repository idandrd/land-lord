import React from "react";
import { connect } from "react-redux";
import { CaseSelectors } from "../redux/reducers/Case";
import { Tasks } from "../components/views/Tasks";

const Container = props => {
  return <Tasks {...props} />;
};

const mapStateToProps = state => ({
  tasks: CaseSelectors.getPopulatedTasks(state.Case)
});

export const TasksContainer = connect(mapStateToProps)(Container);
