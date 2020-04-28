import React from "react";
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

  // function removeGuarantee(index: number) {
  //   return () => {
  //     const newOptions = props.optionPeriods.filter((_, i) => i !== index);
  //     props.onChange(newOptions);
  //   };
  // }

  // function addOption() {
  //   const newOptions = [...props.optionPeriods, { ...emptyOption }];
  //   props.onChange(newOptions);
  // }

  return (
    <div>
      <SingleGuarantee
        guarantee={{
          type: GuaranteeType.bankGuarantee,
          amount: 40000,
          expirationDate: "2020-5-1",
        }}
        onChange={(val) => console.log(val)}
        onRemove={() => {}}
      />
      <Button>{strings.addGuarantee}</Button>
    </div>
  );
}

class SingleGuarantee extends React.Component<SingleGuaranteeProps> {
  state = {
    type: "bankGuarantee",
    amount: 0,
    expirationDate: "2020-05-01",
    description: "",
  };

  componentDidMount() {
    this.setState({ ...this.props.guarantee });
  }

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
      <div>
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
      </div>
    );
  }
}
