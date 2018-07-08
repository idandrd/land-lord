import React from "react";
import { connect } from "react-redux";
import { Tasks } from "../components/views/Tasks";

const Container = props => {
  return <Tasks />;
};

const mapStateToProps = state => ({
  
});

export const TasksContainer = connect(mapStateToProps)(Container);
