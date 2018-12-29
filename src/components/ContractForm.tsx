import React from "react";
import { Button, DatePicker, InputNumber } from "antd";
import { FormItem } from "./FormItem";
import { BaseContract, Asset } from "../types";
import { Select } from "antd";
import { flatten } from "lodash";
const Option = Select.Option;

const strings = {
  signingDate: "נחתם בתאריך",
  tenant: "השוכר",
  asset: "הנכס",
  submit: "שמור",
  firstCheck: "תאריך הצ'ק הראשון",
  checksAmount: "כמות צ'קים שהתקבלו"
};

interface ContractFormProps {
  tenants: any;
  assets: Asset[];
  contract: any;
  actions: any;
}
interface ContractFormState extends BaseContract {}

const initialState: ContractFormState = {
  tenantId: "",
  assetId: "",
  unitIds: [],
  signingDate: "",
  startLeaseDate: "",
  leaseLength: 12,
  gracePeriodLength: 0,
  optionPeriods: [],
  paymentEveryMonths: 1,
  paymentAmount: 0
};

export class ContractForm extends React.Component<
  ContractFormProps,
  ContractFormState
> {
  state = { ...initialState };

  render() {
    const { tenants, assets, contract, actions } = this.props;
    console.log(this.state);
    return (
      <div style={{ direction: "rtl" }}>
        <FormItem label={strings.tenant}>
          <CaseItemSelect
            options={tenants}
            value={this.state.tenantId}
            onChange={tenantId => this.setState({ tenantId })}
          />
        </FormItem>
        <FormItem label={strings.asset}>
          <CaseItemSelect
            options={assets}
            value={this.state.assetId}
            onChange={assetId => this.setState({ assetId })}
          />
        </FormItem>
        <FormItem label={strings.asset}>
          <UnitSelect
            assets={assets}
            assetId={this.state.assetId}
            onChange={(unitIds: string[]) => this.setState({ unitIds })}
            value={this.state.unitIds}
          />
        </FormItem>
        <FormItem label={strings.firstCheck}>
          <DatePicker
            onChange={(_, date) => actions.setContractFirstCheckDate(date)}
          />
        </FormItem>
        <FormItem label={strings.checksAmount}>
          <InputNumber
            min={1}
            onChange={actions.setContractAmountOfChecksRecieved}
          />
        </FormItem>
        <Button type="primary" onClick={() => actions.onSubmit(contract)}>
          {strings.submit}
        </Button>
      </div>
    );
  }
}

const CaseItemSelect = props => (
  <Select {...props} style={{ width: "100%" }}>
    {props.options.map((item, index) => (
      <Option key={index} value={item.id}>
        {item.name}
      </Option>
    ))}
  </Select>
);

const UnitSelect = (props: {
  assets: Asset[];
  assetId?: string;
  onChange: (unitIds: string[]) => void;
  value: string[];
}) => {
  const asset = props.assets.find(asset => asset.id === props.assetId);
  return (
    <Select
      mode="multiple"
      onChange={props.onChange}
      style={{ width: "100%" }}
    >
      {asset &&
        asset.units.map((unit, index) => (
          <Option key={index} value={index}>
            {unit.name}
          </Option>
        ))}
    </Select>
  );
};
