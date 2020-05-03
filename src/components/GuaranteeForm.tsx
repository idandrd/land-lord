import React from "react";
import shortid from "shortid";
import { Button, InputNumber, Input, DatePicker, Select } from "antd";
import { Guarantee, GuaranteeType, BankGuarantee } from "../types";
import { FormItem } from "./FormItem";
const Option = Select.Option;

const strings = {
  addGuarantee: "הוסף ערבות",
  guaranteeType: "סוג ערבות",
  amount: "סכום",
  expirationDate: "תקף עד לתאריך",
  description: "תיאור",
};

const guaranteeTypes: { name: GuaranteeType; label: string }[] = [
  { name: GuaranteeType.bankGuarantee, label: "ערבות בנקאית" },
  { name: GuaranteeType.bankCheck, label: "צ'ק בנקאי" },
  { name: GuaranteeType.personalCheck, label: "צ'ק אישי" },
  { name: GuaranteeType.deposit, label: "פיקדון" },
  { name: GuaranteeType.other, label: "אחר" },
];

const emptyGuarantee: Guarantee = {
  type: GuaranteeType.bankGuarantee,
  amount: 0,
  expirationDate: "2020-05-01",
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
  // function updateField(index: number) {
  //   return (fieldName: GuaranteeKey, fieldValue: number) => {
  //     const newOptions = props.optionPeriods.map((option, i) => {
  //       if (i == index) {
  //         return { ...option, [fieldName]: fieldValue };
  //       }
  //       return option;
  //     });
  //     props.onChange(newOptions);
  //   };
  // }

  function getOnGuaranteeChange(index: number) {
    return function onGuaranteeChange(newGuarantee: Guarantee) {
      const newGuarantees = props.guarantees.map((guarantee, i) =>
        i == index ? newGuarantee : guarantee
      );
      console.log("guarantee changed!", newGuarantees)
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
          key={shortid.generate()}
          guarantee={guarantee}
          onChange={getOnGuaranteeChange(i)}
          onRemove={() => removeGuarantee(i)}
        />
      ))}
      <Button onClick={addGuarantee}>{strings.addGuarantee}</Button>
    </div>
  );
}

class SingleGuarantee extends React.Component<SingleGuaranteeProps> {
  state = {
    type: "bankGuarantee",
    amount: 0,
    expirationDate: "2020-05-01",
    description: "",
    ...this.props.guarantee,
  };

  // componentDidMount() {
  //   this.setState({ ...this.props.guarantee });
  // }

  componentDidUpdate(_, prevState) {
    if (this.state !== prevState) {
      const guarantee = this.getGuarantee();
      this.props.onChange(guarantee as Guarantee);
    }
  }

  getGuarantee() {
    const { type, amount, expirationDate, description } = this.state;
    switch (type) {
      case GuaranteeType.bankGuarantee:
        return { type, amount, expirationDate };
      case GuaranteeType.personalCheck:
        return { type };
      case GuaranteeType.other:
        return { type, description };
      default:
        return { type, amount };
    }
  }

  render() {
    return (
      <div
        style={{ border: "1px dashed", width: "80%", padding: 9, margin: 4 }}
      >
        <FormItem label={strings.guaranteeType}>
          <Select
            defaultValue={this.state.type}
            onChange={(type: GuaranteeType) => this.setState({ type })}
            style={{ width: "100%" }}
          >
            {guaranteeTypes.map((option, i) => (
              <Option key={i} value={option.name}>
                {option.label}
              </Option>
            ))}
          </Select>
        </FormItem>
        {this.state.type !== GuaranteeType.personalCheck && (
          <FormItem label={strings.amount}>
            <InputNumber
              value={(this.state as any).amount}
              onChange={(val) =>
                this.setState({ amount: parseInt(val.toString()) })
              }
            />
          </FormItem>
        )}
        {this.state.type == GuaranteeType.bankGuarantee && (
          <FormItem label={strings.expirationDate}>
            <DatePicker
              onChange={(_, expirationDate) =>
                this.setState({ expirationDate })
              }
            />
          </FormItem>
        )}
        {this.state.type == GuaranteeType.other && (
          <FormItem label={strings.description}>
            <Input
              value={this.state.description}
              onChange={({ target }) =>
                this.setState({ description: target.value })
              }
            />
          </FormItem>
        )}
        <Button onClick={this.props.onRemove}>X</Button>
      </div>
    );
  }
}
