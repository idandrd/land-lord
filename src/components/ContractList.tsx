import React from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";

import { Routes } from "../common/constants";
import { PopulatedContract } from "../types";

const strings = {
  tenantColumn: "השוכר",
  assetColumn: "הנכס",
  signinDateColumn: "תאריך חתימה",
  startLeaseDateColumn: "תאריך תחילת השכרה",
  leaseLengthColumn: "משך החוזה"
};

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    render: contractId => (
      <Link to={Routes.editContract.replace(":id", contractId)}>
        {contractId}
      </Link>
    )
  },
  {
    title: strings.tenantColumn,
    dataIndex: "tenant",
    render: tenant => tenant.name
  },
  {
    title: strings.assetColumn,
    dataIndex: "asset",
    render: asset => asset.name
  },
  {
    title: strings.signinDateColumn,
    dataIndex: "signingDate"
  },
  {
    title: strings.startLeaseDateColumn,
    dataIndex: "startLeaseDate"
  },
  {
    title: strings.leaseLengthColumn,
    dataIndex: "leaseLength",
    render: (leaseLength: number) => `${leaseLength} חודשים`
  }
];

export class ContractList extends React.Component<{
  contracts: PopulatedContract[];
}> {
  componentDidUpdate() {
    console.log(this.props.contracts);
  }
  parseContracts = () => {
    const { contracts } = this.props;
    return contracts.map(contract => {
      return {
        id: contract.id,
        tenant: contract.tenant,
        asset: contract.asset,
        signingDate: contract.signingDate,
        leaseLength: contract.leaseLength,
        startLeaseDate: contract.startLeaseDate,
        key: contract.id
      };
    });
  };
  render() {
    return (
      <div>
        <Table columns={columns} dataSource={this.parseContracts()} />
      </div>
    );
  }
}
