import React from "react";
import { Table, Icon } from "antd";
import { FormItem } from "./FormItem";
import { strings as formStrings } from "./ContractForm";
import { Link } from "react-router-dom";

import { PopulatedContract } from "../types";

const strings = {};

const stringFields = [{ fieldKey: "" }];

export class ViewContract extends React.Component<{
  contract: PopulatedContract;
}> {
  render() {
    const { tenant, asset, ...contract } = this.props.contract;
    return (
      <div style={{ direction: "rtl" }}>
        <FormItem label={formStrings.tenant}>{tenant.name}</FormItem>
        <FormItem label={formStrings.asset}>{`${asset.address}, ${asset.city}`}</FormItem>
        <FormItem label={formStrings.signingDate}>{contract.signingDate}</FormItem>
        <FormItem label={formStrings.startLeaseDate}>{contract.startLeaseDate}</FormItem>
      </div>
    );
  }
}
