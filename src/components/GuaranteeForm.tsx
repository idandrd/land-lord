import React from "react";
import { Button, InputNumber, Input, DatePicker, Select } from "antd";
import { Guarantee } from "../types";
import { FormItem } from "./FormItem";
const Option = Select.Option;

const strings = {
  addGuarantee: "הוסף ערב",
  name: "שם הערב",
  idNum: "תעודת זהות",
  phone: "מספר טלפון",
  comments: "הערות",
};

const emptyGuarantee: Guarantee = {
  name: "",
  idNum: "",
  phone: "",
  comments: "",
};

export interface GuaranteeFormProps {
  guarantees: Guarantee[];
  onChange: (val: Guarantee[]) => void;
}

export interface SingleGuaranteeProps {
  guarantee: Guarantee;
  onChange: (newGuarantee: Guarantee) => void;
  onRemove: () => void;
}

export function GuaranteeForm(props: GuaranteeFormProps) {
  function getOnGuaranteeChange(index: number) {
    return function onGuaranteeChange(newGuarantee: Guarantee) {
      const newGuarantees = props.guarantees.map((guarantee, i) =>
        i == index ? newGuarantee : guarantee
      );
      props.onChange(newGuarantees);
    };
  }

  function removeGuarantee(index: number) {
    const newGuarantees = props.guarantees.filter((_, i) => i !== index);
    props.onChange(newGuarantees);
  }

  function addGuarantee() {
    const newGuarantees = [...props.guarantees, { ...emptyGuarantee }];
    props.onChange(newGuarantees);
  }

  return (
    <div>
      {props.guarantees.map((guarantee, i) => (
        <SingleGuarantee
          key={i}
          guarantee={guarantee}
          onChange={getOnGuaranteeChange(i)}
          onRemove={() => removeGuarantee(i)}
        />
      ))}
      <Button onClick={addGuarantee}>{strings.addGuarantee}</Button>
    </div>
  );
}

function SingleGuarantee(props: SingleGuaranteeProps) {
  function updateGuarantee(fields: object) {
    const newGuarantee = {
      ...props.guarantee,
      ...fields,
    };
    props.onChange(newGuarantee);
  }

  return (
    <div style={{ border: "1px dashed", width: "80%", padding: 9, margin: 4 }}>
      <FormItem label={strings.name}>
        <Input
          value={props.guarantee.name}
          onChange={({ target }) => updateGuarantee({ name: target.value })}
        />
      </FormItem>
      <FormItem label={strings.idNum}>
        <Input
          value={props.guarantee.idNum}
          onChange={({ target }) => updateGuarantee({ idNum: target.value })}
        />
      </FormItem>
      <FormItem label={strings.phone}>
        <Input
          value={props.guarantee.phone}
          onChange={({ target }) => updateGuarantee({ phone: target.value })}
        />
      </FormItem>
      <FormItem label={strings.comments}>
        <Input
          value={props.guarantee.comments}
          onChange={({ target }) => updateGuarantee({ comments: target.value })}
        />
      </FormItem>
      <Button onClick={props.onRemove}>X</Button>
    </div>
  );
}
