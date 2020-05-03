import React from "react";
import shortid from "shortid";
import { Button, InputNumber, DatePicker } from "antd";

import { CheckBundle } from "../types";
import { FormItem } from "./FormItem";

const strings = {
  amountOfChecks: "כמות צ'קים שהתקבלה",
  dateOfFirstCheck: "תאריך הצ'ק הראשון",
  checkForHowManyMonths: "כמה חודשים בין צ'ק לצ'ק",

  addCheckBundle: "הוסף צ'קים שהתקבלו",
};

const emptyCheckBundle: CheckBundle = {
  amountOfChecks: 1,
  dateOfFirstCheck: "",
  checkForHowManyMonths: 1,
};

export interface CheckBundleFormProps {
  checkBundles: CheckBundle[];
  onChange: (val: CheckBundle[]) => void;
}

type CheckBundleKey = keyof CheckBundle;

export interface SingleCheckBundleProps {
  checkBundle: CheckBundle;
  onChange: <T extends CheckBundle[CheckBundleKey]>(
    fieldName: CheckBundleKey,
    fieldValue: T
  ) => void;
  onRemove: () => void;
}

export function CheckBundleForm(props: CheckBundleFormProps) {
  function updateField(index: number) {
    return <T extends CheckBundle[CheckBundleKey]>(
      fieldName: CheckBundleKey,
      fieldValue: T
    ) => {
      const newCheckBundles = props.checkBundles.map((checkBundle, i) => {
        if (i == index) {
          return { ...checkBundle, [fieldName]: fieldValue };
        }
        return checkBundle;
      });
      props.onChange(newCheckBundles);
    };
  }

  function removeCheckBundle(index: number) {
    return () => {
      const newCheckBundles = props.checkBundles.filter((_, i) => i !== index);
      props.onChange(newCheckBundles);
    };
  }

  function addCheckBundle() {
    const newCheckBundles = [...props.checkBundles, { ...emptyCheckBundle }];
    props.onChange(newCheckBundles);
  }

  return (
    <div>
      {props.checkBundles.map((checkBundle, i) => (
        <SingleCheckBundle
          key={shortid.generate()}
          checkBundle={checkBundle}
          onChange={updateField(i)}
          onRemove={removeCheckBundle(i)}
        />
      ))}
      <Button onClick={addCheckBundle}>{strings.addCheckBundle}</Button>
    </div>
  );
}

function SingleCheckBundle(props: SingleCheckBundleProps) {
  return (
    <div style={{ border: "1px dashed", width: "80%", padding: 9, margin: 4 }}>
      <FormItem label={strings.amountOfChecks}>
        <InputNumber
          min={1}
          value={props.checkBundle.amountOfChecks}
          onChange={(val) => props.onChange("amountOfChecks", Number(val))}
        />
      </FormItem>
      <FormItem label={strings.dateOfFirstCheck}>
        <DatePicker
          onChange={(_, val) => props.onChange("dateOfFirstCheck", val)}
        />
      </FormItem>
      <FormItem label={strings.checkForHowManyMonths}>
        <InputNumber
          min={1}
          value={props.checkBundle.checkForHowManyMonths}
          onChange={(val) =>
            props.onChange("checkForHowManyMonths", Number(val))
          }
        />
      </FormItem>
      <Button onClick={props.onRemove}>X</Button>
    </div>
  );
}
