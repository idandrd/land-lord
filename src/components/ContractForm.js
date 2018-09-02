import React from "react";
import PropTypes from "prop-types";
import { Button, DatePicker, InputNumber } from "antd";
import { FormItem } from "./FormItem";
import { Select } from "antd";
const Option = Select.Option;

const strings = {
  signingDate: "נחתם בתאריך",
  tenant: "השוכר",
  asset: "הנכס",
  submit: "שמור",
  firstCheck: "תאריך הצ'ק הראשון",
  checksAmount: "כמות צ'קים שהתקבלו"
};

export class ContractForm extends React.Component {
  render() {
    const { contract, actions } = this.props;
    return (
      <div style={{ direction: "rtl" }}>
        <FormItem label={strings.signingDate}>
          <DatePicker
            onChange={(_, date) => actions.setContractSigningDate(date)}
          />
        </FormItem>
        <FormItem label={strings.tenant}>
          <CaseItemSelect
            options={this.props.tenants}
            onChange={actions.setContractTenantId}
          />
        </FormItem>
        <FormItem label={strings.asset}>
          <CaseItemSelect
            options={this.props.assets}
            onChange={actions.setContractAssetId}
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

ContractForm.propTypes = {
  asset: PropTypes.shape({
    name: PropTypes.string,
    city: PropTypes.string,
    address: PropTypes.string,
    year: PropTypes.string,
    floors: PropTypes.number
  }),
  actions: PropTypes.shape({
    setAssetName: PropTypes.func,
    setAssetCity: PropTypes.func,
    setAssetAddress: PropTypes.func,
    setAssetYear: PropTypes.func,
    setAssetFloors: PropTypes.func,
    onSubmit: PropTypes.func
  }),
  assets: PropTypes.array,
  tenants: PropTypes.array
};
