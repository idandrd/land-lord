import React from "react";
import { Button, InputNumber } from "antd";

import { Option as OptionPeriod } from "../types";
import { FormItem } from "./FormItem";

const strings = {
  optionLeaseLength: "משך האופציה (בחודשים)",
  optionNoticeAhead: "זמן התראה מראש (בחודשים)",
  addOption: "הוסף תקופת אופציה",
};

const emptyOption: OptionPeriod = { leaseLength: 12, noticeAhead: 3 };

export interface OptionFormProps {
  optionPeriods: OptionPeriod[];
  onChange: (val: OptionPeriod[]) => void;
}

type OptionKey = keyof OptionPeriod;

export interface SingleOptionProps {
  optionPeriod: OptionPeriod;
  onChange: (fieldName: OptionKey, fieldValue: number) => void;
  onRemove: () => void;
}

export function OptionForm(props: OptionFormProps) {
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

  function removeOption(index: number) {
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
      {props.optionPeriods.map((optionPeriod, i) => (
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
          onChange={(val) => props.onChange("leaseLength", Number(val))}
        />
      </FormItem>
      <FormItem label={strings.optionNoticeAhead}>
        <InputNumber
          min={1}
          value={props.optionPeriod.noticeAhead}
          onChange={(val) => props.onChange("noticeAhead", Number(val))}
        />
      </FormItem>
      <Button onClick={props.onRemove}>X</Button>
    </div>
  );
}
