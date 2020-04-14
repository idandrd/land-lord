import React from "react";
import { Table, Icon } from "antd";
import { strings } from "./TenantForm";
import { Link } from "react-router-dom";

import { Routes } from "../common/constants";

export class OwnerList extends React.Component {
  columns = [
    {
      title: strings.nameLabel,
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length
    },
    {
      title: strings.privateTypeLabel,
      dataIndex: "type",
      sorter: (a, b) => a.type.length - b.type.length
    },
    {
      title: strings.BusinessIdLabel,
      dataIndex: "idNum"
    },
    {
      title: strings.commentsLabel,
      dataIndex: "comments",
      sorter: (a, b) => a.comments.length - b.comments.length
    },
    {
      dataIndex: "id",
      render: ownerId => (
        <div />
        // <Link to={Routes.newOwner.replace(":id", ownerId)}>
        //   <Icon type="edit" />
        // </Link>
      )
    }
  ];

  onChange = (pagination, filters, sorter) => {
    console.log("params", pagination, filters, sorter);
  };

  parseOwners = owners =>
    owners.map((owner, i) => ({
      ...owner,
      key: i
    }));

  render() {
    const owners = this.props.owners || [];
    return (
      <Table
        dataSource={this.parseOwners(owners)}
        columns={this.columns}
        onChange={this.onChange}
      />
    );
  }
}
