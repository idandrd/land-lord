import React from "react";
import { Table, Icon } from "antd";
import { strings } from "./TenantForm";
import { Link } from "react-router-dom";

import { Routes } from "../common/constants";

export class TenantList extends React.Component {
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
      title: strings.isBusinessLabel,
      dataIndex: "isBusiness"
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
      render: tenantId => (
        <Link to={Routes.editTenant.replace(":id", tenantId)}>
          <Icon type="edit" />
        </Link>
      )
    }
  ];

  onChange = (pagination, filters, sorter) => {
    console.log("params", pagination, filters, sorter);
  };

  parseTenants = tenants =>
    tenants.map((tenant, i) => ({
      ...tenant,
      key: i,
      isBusiness: tenant.isBusiness
        ? strings.businessRadio
        : strings.privateRadio
    }));

  render() {
    const tenants = this.props.tenants || [];
    return (
      <Table
        dataSource={this.parseTenants(tenants)}
        columns={this.columns}
        onChange={this.onChange}
        expandedRowRender={tenant => <ContactsTable tenant={tenant} />}
      />
    );
  }
}

class ContactsTable extends React.Component {
  columns = [
    { title: strings.nameLabel, dataIndex: "name" },
    { title: strings.roleLabel, dataIndex: "role" },
    { title: strings.phoneLabel, dataIndex: "phone" },
    { title: strings.otherPhoneLabel, dataIndex: "otherPhone" },
    { title: strings.emailLabel, dataIndex: "email" },
    { title: strings.faxLabel, dataIndex: "fax" }
  ];

  render() {
    const { tenant } = this.props;
    return (
      <Table
        columns={this.columns}
        dataSource={tenant.contacts.map((c, i) => ({ ...c, key: i }))}
        pagination={false}
        bordered={true}
      />
    );
  }
}
