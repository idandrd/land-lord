import React from "react";
import PropTypes from "prop-types";
import { Button, DatePicker } from "antd";
import { FormItem } from "./FormItem";
import { Select } from "antd";
const Option = Select.Option;

const strings = {
  signingDate: "נחתם בתאריך",
  tenant: "השוכר",
  asset: "הנכס",
  submit: "שמור"
};

export class ContractForm extends React.Component {
  render() {
    const { asset, actions } = this.props;
    return (
      <div style={{ direction: "rtl" }}>
        <FormItem label={strings.signingDate}>
          <DatePicker />
        </FormItem>
        <FormItem label={strings.tenant}>
          <CaseItemSelect options={this.props.tenants} />
        </FormItem>
        <FormItem label={strings.asset}>
          <CaseItemSelect options={this.props.assets} />
        </FormItem>
        <Button type="primary" onClick={() => actions.onSubmit(asset)}>
          {strings.submit}
        </Button>
      </div>
    );
  }
}

const CaseItemSelect = props => (
  <Select style={{ width: "100%" }}>
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
