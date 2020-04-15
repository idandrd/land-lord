import React from "react";
import { Select, Input } from "antd";
const Option = Select.Option;

export const COMBINED = "משולב";
export const OTHER = "אחר";

export const unitTypes = {
  living: "מגורים",
  shop: "מסחר",
  parking: "חניון",
  industrial: "תעשייה",
  hall: "אולם",
  other: OTHER,
};

export const unitOwners = {
  amir: "אמיר",
  amirsDad: "אבא של אמיר",
  amirsBro: "אח של אמיר",
};

export const UnitTypeSelect = (props) => (
  <UnitSelectField options={unitTypes} {...props} />
);

export const UnitOwnerSelect = (props) => {
  const { owners } = props;
  const options = owners.map((owner) => `${owner.name}, ${owner.idNum}`);
  return <UnitSelectField options={options} {...props} />;
};

class UnitSelectField extends React.Component {
  state = {
    selectValue: "",
    inputValue: "",
  };

  onSelectChange = (value) => {
    this.setState({ selectValue: value });
    if (value === OTHER) {
      this.props.onChange(this.state.inputValue);
    } else {
      this.props.onChange(value);
    }
  };

  onInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
    this.props.onChange(e.target.value);
  };

  render() {
    const options = this.props.ofAsset
      ? { ...this.props.options, combined: COMBINED }
      : this.props.options;
    const { value, onChange, ...restProps } = this.props;
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Select
          style={{ width: "100%" }}
          value={this.state.selectValue}
          onChange={this.onSelectChange}
          {...restProps}
        >
          {Object.values(options).map((option) => (
            <Option value={option} key={option}>
              {option}
            </Option>
          ))}
        </Select>
        {this.state.selectValue === OTHER && (
          <Input
            style={{ marginRight: 10 }}
            value={this.state.inputValue}
            onChange={this.onInputChange}
          />
        )}
      </div>
    );
  }
}
