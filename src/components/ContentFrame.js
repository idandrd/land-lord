import React from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "antd";
import { Link } from "react-router-dom";

export class ContentFrame extends React.Component {
  render() {
    const {
      firstNavText,
      firstNavRoute,
      secondNavText,
      buttonText,
      buttonRoute
    } = this.props;
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {firstNavRoute ? (
            <Link to={firstNavRoute}>
              <span>{firstNavText}</span>
            </Link>
          ) : (
            <span>{firstNavText}</span>
          )}
          {secondNavText && (
            <div>
              <Icon type="right" />
              <span>{secondNavText}</span>
            </div>
          )}
          <div style={{ flex: 1 }} />
          {buttonText && (
            <Button type="primary">
              <Link to={buttonRoute}>{buttonText}</Link>
            </Button>
          )}
        </div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

ContentFrame.propTypes = {
  firstNavText: PropTypes.string,
  firstNavRoute: PropTypes.string,
  secondNavText: PropTypes.string,
  buttonText: PropTypes.string,
  buttonRoute: PropTypes.string,
  children: PropTypes.element
};
