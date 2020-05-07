import React, { useState } from "react";
import { Button, InputNumber, Input, DatePicker, Select, Checkbox } from "antd";
import { Collateral, CollateralType } from "../types";
import { FormItem } from "./FormItem";
const Option = Select.Option;

const strings = {
  addCollateral: "הוסף בטחונות",
  collateralType: "סוג בטחונות",
  amount: "סכום",
  expirationDate: "תקף עד לתאריך",
  description: "תיאור",
  openCheck: "צ'ק פתוח",
};

const collateralTypes: { name: CollateralType; label: string }[] = [
  { name: CollateralType.bankCollateral, label: "ערבות בנקאית" },
  { name: CollateralType.bankCheck, label: "צ'ק בנקאי" },
  { name: CollateralType.personalCheck, label: "צ'ק אישי" },
  { name: CollateralType.deposit, label: "פיקדון" },
  { name: CollateralType.other, label: "אחר" },
];

const emptyCollateral: Collateral = {
  type: CollateralType.bankCollateral,
  amount: 0,
  expirationDate: "2020-05-01",
};

export interface CollateralFormProps {
  collaterals: Collateral[];
  onChange: (val: Collateral[]) => void;
}

export interface SingleCollateralProps {
  collateral: Collateral;
  onChange: (newCollateral: Collateral) => void;
  onRemove: () => void;
}

export function CollateralForm(props: CollateralFormProps) {
  function getOnCollateralChange(index: number) {
    return function onCollateralChange(newCollateral: Collateral) {
      const newCollaterals = props.collaterals.map((collateral, i) =>
        i == index ? newCollateral : collateral
      );
      props.onChange(newCollaterals);
    };
  }

  function removeCollateral(index: number) {
    const newCollaterals = props.collaterals.filter((_, i) => i !== index);
    props.onChange(newCollaterals);
  }

  function addCollateral() {
    const newCollaterals = [...props.collaterals, { ...emptyCollateral }];
    props.onChange(newCollaterals);
  }

  return (
    <div>
      {props.collaterals.map((collateral, i) => (
        <SingleCollateral
          key={`${i}_${collateral.type}`}
          collateral={collateral}
          onChange={getOnCollateralChange(i)}
          onRemove={() => removeCollateral(i)}
        />
      ))}
      <Button onClick={addCollateral}>{strings.addCollateral}</Button>
    </div>
  );
}

function SingleCollateral(props: SingleCollateralProps) {
  const [openCheck, setOpenCheck] = useState(false);

  function updateCollateral(fields: object) {
    console.log("*** NEW INFO ***", fields);
    const newCollateral = getCollateral({
      ...props.collateral,
      ...fields,
    });
    props.onChange(newCollateral);
  }

  function getCollateral(newCollateral) {
    const { type, amount, expirationDate, description } = newCollateral;
    switch (type) {
      case CollateralType.bankCollateral:
        return { type, amount, expirationDate };
      case CollateralType.other:
        return { type, amount, description };
      default:
        return { type, amount };
    }
  }

  function handleCheckboxClick(event) {
    const { checked } = event.target;
    setOpenCheck(checked);
    updateCollateral({ amount: 0 });
  }

  const collateralFields = {
    type: "bankCollateral",
    amount: 0,
    expirationDate: "2020-05-01",
    description: "",
    ...props.collateral,
  };

  return (
    <div style={{ border: "1px dashed", width: "80%", padding: 9, margin: 4 }}>
      <FormItem label={strings.collateralType}>
        <Select
          defaultValue={collateralFields.type}
          onChange={(type: CollateralType) => updateCollateral({ type })}
          style={{ width: "100%" }}
        >
          {collateralTypes.map((option, i) => (
            <Option key={i} value={option.name}>
              {option.label}
            </Option>
          ))}
        </Select>
      </FormItem>

      {collateralFields.type == CollateralType.personalCheck && (
        <FormItem label={strings.openCheck}>
          <Checkbox onChange={handleCheckboxClick} />
        </FormItem>
      )}

      {(openCheck && collateralFields.type == CollateralType.personalCheck) || (
        <FormItem label={strings.amount}>
          <InputNumber
            min={0}
            value={(collateralFields as any).amount}
            onChange={(amount) => updateCollateral({ amount })}
          />
        </FormItem>
      )}

      {collateralFields.type == CollateralType.bankCollateral && (
        <FormItem label={strings.expirationDate}>
          <DatePicker
            onChange={(_, expirationDate) =>
              updateCollateral({ expirationDate })
            }
          />
        </FormItem>
      )}
      {collateralFields.type == CollateralType.other && (
        <FormItem label={strings.description}>
          <Input
            value={collateralFields.description}
            onChange={({ target }) =>
              updateCollateral({ description: target.value })
            }
          />
        </FormItem>
      )}
      <Button onClick={props.onRemove}>X</Button>
    </div>
  );
}
