import React from "react";
import { Button, InputNumber } from "antd";

import { Guarantee } from "../types";
import { FormItem } from "./FormItem";

const strings = {

};

const emptyGuarantee: Guarantee = { type: "bankGuarantee", amount: 0, expirationDate: "2020-05-01" };

export interface GuaranteeFormProps {
  guarantees: Guarantee[];
  onChange: (val: Guarantee[]) => void;
}

type GuaranteeKey = keyof Guarantee;

export interface SingleGuaranteeProps {
  guarantee: Guarantee;
  onChange: (fieldName: GuaranteeKey, fieldValue: number | string) => void;
  onRemove: () => void;
}

export function GuaranteeForm(props: GuaranteeFormProps) {
  
  function updateField(index: number) {
    return (fieldName: OptionKey, fieldValue: number) => {
      const newOptions = props.optionPeriods.map((option, i) => {
        if (i == index) {
          return { ...option, [fieldName]: fieldValue };
        }
        return option;
      });
      props.onChange(newOptions);
    };
  }

  function removeGuarantee(index: number) {
    return () => {
      const newOptions = props.optionPeriods.filter((_, i) => i !== index);
      props.onChange(newOptions);
    };
  }

  function addOption() {
    const newOptions = [...props.optionPeriods, { ...emptyOption }];
    props.onChange(newOptions);
  }

  return (
    <div>
      {props.guarantees.map((optionPeriod, i) => (
        <SingleOption
          key={i}
          optionPeriod={optionPeriod}
          onChange={updateField(i)}
          onRemove={removeOption(i)}
        />
      ))}
      <Button onClick={addOption}>{strings.addOption}</Button>
    </div>
  );
}

function SingleOption(props: SingleOptionProps) {
  return (
    <div style={{ border: "1px dashed", width: "80%", padding: 9, margin: 4 }}>
      <FormItem label={strings.optionLeaseLength}>
        <InputNumber
          min={1}
          value={props.optionPeriod.leaseLength}
          onChange={val => props.onChange("leaseLength", Number(val))}
        />
      </FormItem>
      <FormItem label={strings.optionNoticeAhead}>
        <InputNumber
          min={1}
          value={props.optionPeriod.noticeAhead}
          onChange={val => props.onChange("noticeAhead", Number(val))}
        />
      </FormItem>
      <Button onClick={props.onRemove}>X</Button>
    </div>
  );
}
