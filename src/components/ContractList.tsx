import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";

import { PopulatedContract } from "../types";

const strings = {
  tenantColumn: "השוכר",
  assetColumn: "הנכס",
  signinDateColumn: "תאריך חתימה",
  startLeaseDateColumn: "תאריך תחילת השכרה",
  leaseLengthColumn: "תאריך הצ'ק הראשון"
};

const columns = [
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
