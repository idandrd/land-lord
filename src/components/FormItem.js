import React from "react";
import PropTypes from "prop-types";

export class FormItem extends React.Component {
  render() {
    const { label, children } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 10,
          alignItems: "center"
        }}
      >
        <div style={{ width: 80, marginLeft: 20 }}>{`${label}:`}</div>
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    );
  }
}

FormItem.propTypes = {
  label: PropTypes.string,
  children: PropTypes.element
};
