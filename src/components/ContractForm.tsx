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
    return (
      <div style={{ direction: "rtl" }}>
        <FormItem label={strings.tenant}>
          <CaseItemSelect
            options={tenants}
            onChange={actions.setContractTenantId}
          />
        </FormItem>
        <FormItem label={strings.asset}>
          <UnitSelect
            assets={assets}
            // onChange={actions.setContractAssetId}
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
        {/* <FormItem label={strings.signingDate}>
          <DatePicker
            onChange={(_, date) => actions.setContractSigningDate(date)}
          />
        </FormItem> */}
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
  onchange?: (val: string) => void;
  onRemove?: () => void;
  onNew?: () => void;
}) => {
  const units = flatten(
    props.assets.map(asset =>
      asset.units.map((unit, index) => ({
        key: `${asset.id}.${index}`,
        name: `${asset.name}, ${unit.name || ""}, ${asset.city}`
      }))
    )
  );
  return (
    <Select style={{ width: "100%" }}>
      {units.map(unit => (
        <Option key={unit.key} value={unit.key}>
          {unit.name}
        </Option>
      ))}
    </Select>
  );
};
