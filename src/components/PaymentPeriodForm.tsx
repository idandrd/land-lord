import React from "react";
import shortid from "shortid";
import { Button, InputNumber } from "antd";

import { PaymentPeriod } from "../types";
import { FormItem } from "./FormItem";

const strings = {
  lengthInMonths: "אורך תקופת תשלום (בחודשים)",
  amountPerMonth: "תשלום חודשי",
  addPaymentPeriod: "הוסף תקופת תשלום"
};

const emptyPaymentPeriod: PaymentPeriod = {
  lengthInMonths: 12,
  amountPerMonth: 1
};

export interface PaymentPeriodFormProps {
  paymentPeriods: PaymentPeriod[];
  onChange: (val: PaymentPeriod[]) => void;
}

type PaymentPeriodKey = keyof PaymentPeriod;

export interface SinglePaymentPeriodProps {
  paymentPeriod: PaymentPeriod;
  onChange: (fieldName: PaymentPeriodKey, fieldValue: number) => void;
  onRemove: () => void;
}

export function PaymentPeriodForm(props: PaymentPeriodFormProps) {
  function updateField(index: number) {
    return (fieldName: PaymentPeriodKey, fieldValue: number) => {
      const newPaymentPeriods = props.paymentPeriods.map((paymentPeriod, i) => {
        if (i == index) {
          return { ...paymentPeriod, [fieldName]: fieldValue };
        }
        return paymentPeriod;
      });
      props.onChange(newPaymentPeriods);
    };
  }

  function removePaymentPeriod(index: number) {
    return () => {
      const newPaymentPeriods = props.paymentPeriods.filter(
        (_, i) => i !== index
      );
      props.onChange(newPaymentPeriods);
    };
  }

  function addPaymentPeriod() {
    const newPaymentPeriods = [
      ...props.paymentPeriods,
      { ...emptyPaymentPeriod }
    ];
    props.onChange(newPaymentPeriods);
  }

  return (
    <div>
      {props.paymentPeriods.map((paymentPeriod, i) => (
        <SinglePaymentPeriod
          key={shortid.generate()}
          paymentPeriod={paymentPeriod}
          onChange={updateField(i)}
          onRemove={removePaymentPeriod(i)}
        />
      ))}
      <Button onClick={addPaymentPeriod}>{strings.addPaymentPeriod}</Button>
    </div>
  );
}

function SinglePaymentPeriod(props: SinglePaymentPeriodProps) {
  return (
    <div style={{ border: "1px dashed", width: "80%", padding: 9, margin: 4 }}>
      <FormItem label={strings.lengthInMonths}>
        <InputNumber
          min={1}
          value={props.paymentPeriod.lengthInMonths}
          onChange={val => props.onChange("lengthInMonths", Number(val))}
        />
      </FormItem>
      <FormItem label={strings.amountPerMonth}>
        <InputNumber
          min={1}
          value={props.paymentPeriod.amountPerMonth}
          onChange={val => props.onChange("amountPerMonth", Number(val))}
        />
      </FormItem>
      <Button onClick={props.onRemove}>X</Button>
    </div>
  );
}
