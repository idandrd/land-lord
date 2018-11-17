import React from "react";
import { Select } from "antd";
const Option = Select.Option;

export const COMBINED = "משולב";

export const unitTypes = {
  living: "מגורים",
  shop: "מסחר",
  parking: "חניון",
  industrial: "תעשייה",
  hall: "אולם",
  other: "אחר"
};

export const unitOwners = {
  amir: "אמיר",
  amirsDad: "אבא של אמיר",
  amirsBro: "אח של אמיר"
};

export const UnitTypeSelect = props => (
  <UnitSelectField options={unitTypes} {...props} />
);

export const UnitOwnerSelect = props => (
  <UnitSelectField options={unitOwners} {...props} />
);

const UnitSelectField = props => {
  const options = props.ofAsset
    ? { ...props.options, combined: COMBINED }
    : props.options;
  return (
    <Select style={{ width: 120 }} {...props}>
      {Object.values(options).map(option => (
        <Option value={option} key={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};
