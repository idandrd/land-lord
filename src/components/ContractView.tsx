import React from "react";
import { Table, Icon } from "antd";
import { FormItem } from "./FormItem";
import { strings as formStrings } from "./ContractForm";
import { Link } from "react-router-dom";

import { PopulatedContract, Unit } from "../types";

const strings = {
  owner: "בעלים"
};

const stringFields = [{ fieldKey: "" }];

export class ViewContract extends React.Component<{
  contract: PopulatedContract;
}> {
  render() {
    const { tenant, asset, ...contract } = this.props.contract;
    const units = getRelevantUnits(asset.units, contract.unitIds);
    return (
      <div style={{ direction: "rtl" }}>
        <FormItem label={formStrings.tenant}>{tenant.name}</FormItem>
        <FormItem label={formStrings.asset}>{`${asset.address}, ${asset.city}`}</FormItem>
        <FormItem label={formStrings.signingDate}>{contract.signingDate}</FormItem>
        <FormItem label={formStrings.startLeaseDate}>{contract.startLeaseDate}</FormItem>
        <FormItem label={formStrings.unit}>{units.map(unit => unit.name).join()}</FormItem>
      </div>
    );
  }
}

function getRelevantUnits(units: Unit[], unitIds: string[]) {
  const unitsWithId = units.map((unit, index) => (unit.id ? {...unit} : {...unit, id: index}))
  return unitsWithId.filter(unit => unitIds.includes(unit.id as any))
}