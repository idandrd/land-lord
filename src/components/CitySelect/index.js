import React from "react";
import { cities } from "./cities";
import { Select } from "antd";
const Option = Select.Option;

export class CitySelect extends React.Component {
  render() {
    return (
      <Select
        mode="combobox"
        filterOption={true}
        optionFilterProp="children"
        showSearch
        {...this.props}
      >
        {cities.map((city, i) => <Option key={i} value={city}>{city}</Option>)}
      </Select>
    );
  }
}
