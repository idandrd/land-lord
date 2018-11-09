import React from "react";
import { Select } from "antd";
const Option = Select.Option;

export const unitTypes = {
  living: "מגורים",
  shop: "מסחר",
  parking: "חניון",
  industrial: "תעשייה",
  hall: "אולם",
  other: "אחר"
};

export const UnitType = props => (
  <Select style={{ width: 120 }} {...props}>
    {Object.values(unitTypes).map(type => (
      <Option value={type} key={type}>
        {type}
      </Option>
    ))}
  </Select>
);
