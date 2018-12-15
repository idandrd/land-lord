import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";

const strings = {
  tenantColumn: "השוכר",
  assetColumn: "הנכס",
  signinDateColumn: "תאריך חתימה",
  firstCheckDateColumn: "תאריך הצ'ק הראשון"
};

const columns = [
  {
    title: strings.tenantColumn,
    dataIndex: "tenant",
    render: tenant => tenant.name,
    sorter: (a, b) => a.name.length - b.name.length
  },
  {
    title: strings.assetColumn,
    dataIndex: "asset",
    render: asset => asset.name,
    sorter: (a, b) => a.type.length - b.type.length
  },
  {
    title: strings.signinDateColumn,
    dataIndex: "signingDate",
    sorter: (a, b) => a.comments.length - b.comments.length
  },
  {
    title: strings.firstCheckDateColumn,
    dataIndex: "firstCheckDate",
    sorter: (a, b) => a.comments.length - b.comments.length
  }
];

export class ContractList extends React.Component {
  render() {
    const { contracts } = this.props;
    return <div>contracts page here</div>;
  }
}
