import React from "react";
import shortid from "shortid";
import { Button, DatePicker, Input, InputNumber, Divider, Select } from "antd";

import { Contract, Asset, CheckBundle } from "../types";
import { generateTasks, firebaseService } from "../service";
import { FormItem } from "./FormItem";
import { OptionForm } from "./OptionForm";

const Option = Select.Option;
const TextArea = Input.TextArea;

const strings = {
  signingDate: "נחתם בתאריך",
  startLeaseDate: "תאריך תחילת השכרה",
  tenant: "השוכר",
  asset: "הנכס",
  unit: "יחידות",
  submit: "שמור",
  firstCheck: "תאריך הצ'ק הראשון",
  checksAmount: "כמות צ'קים שהתקבלו",
  leaseLength: "משך חוזה בסיס (בחודשים)",
  gracePeriodLength: "גרייס (בחודשים)",
  optionPeriods: "אופציות",
  paymentEveryMonths: "תשלום כל כמה חודשים",
  monthDayOfPayment: "יום בחודש לתשלום",
  paymentMethod: "אמצעי תשלום",
  paymentIndexLink: "הצמדת תשלום",
  checkBundles: "צ'קים שהתקבלו",
  paymentPeriods: "תקופות תשלום",
  assetProperties: "תוספות לנכס",
  guarantees: "ערבויות",
  comments: "הערות",

  amountOfChecks: "כמות צ'קים שהתקבלה",
  dateOfFirstCheck: "תאריך הצ'ק הראשון",
  checkForHowManyMonths: "כמה חודשים בין צ'ק לצ'ק",

  paymentPeriodLengthInMonths: "אורך תקופת תשלום (בחודשים)",
  paymentPeriodAmountPerMonth: "תשלום חודשי"
};

interface ContractFormProps {
  tenants: any;
  assets: Asset[];
  contract: any;
  actions: any;
}
interface ContractFormState extends Contract {}

const emptyCheckBundle: CheckBundle = {
  amountOfChecks: 0,
  dateOfFirstCheck: "",
  checkForHowManyMonths: 1
};

const initialState: ContractFormState = {
  id: "",
  tenantId: "",
  assetId: "",
  unitIds: [],
  signingDate: "",
  startLeaseDate: "",
  leaseLength: 12,
  gracePeriodLength: 0,
  optionPeriods: [],
  paymentEveryMonths: 1,
  monthDayOfPayment: 1,
  paymentMethod: "check",
  paymentIndexLink: "madad",
  checkBundles: [
    {
      amountOfChecks: 12,
      dateOfFirstCheck: "2019-03-20",
      checkForHowManyMonths: 1
    }
  ],
  paymentPeriods: [],
  comments: ""
};

export class ContractForm extends React.Component<
  ContractFormProps,
  ContractFormState
> {
  state = { ...initialState };

  unitSelectComponent = (
    <UnitSelect onChange={(unitIds: string[]) => this.setState({ unitIds })} />
  );

  onSelectAssetChange = (assetId: string) => {
    this.unitSelectComponent = <div />;
    this.setState({ assetId }, () => {
      this.unitSelectComponent = (
        <UnitSelect
          asset={this.props.assets.find(asset => asset.id === assetId)}
          onChange={(unitIds: string[]) => this.setState({ unitIds })}
        />
      );
      this.setState({ unitIds: [] });
    });
  };

  onSubmit = () => {
    const contractId = shortid.generate();
    const contract = { ...this.state, id: contractId };
    const contractTasks = generateTasks(contract);
    firebaseService.saveTasks(contractTasks);
    this.props.actions.onSubmit(contract);
  };

  render() {
    const { tenants, assets, contract, actions } = this.props;
    return (
      <div style={{ direction: "rtl" }}>
        <FormItem label={strings.tenant}>
          <CaseItemSelect
            options={tenants}
            value={this.state.tenantId}
            onChange={tenantId => this.setState({ tenantId })}
          />
        </FormItem>
        <FormItem label={strings.asset}>
          <CaseItemSelect
            options={assets}
            value={this.state.assetId}
            onChange={this.onSelectAssetChange}
          />
        </FormItem>
        <FormItem label={strings.unit}>{this.unitSelectComponent}</FormItem>
        <FormItem label={strings.signingDate}>
          <DatePicker
            onChange={(_, signingDate) => this.setState({ signingDate })}
          />
        </FormItem>
        <FormItem label={strings.startLeaseDate}>
          <DatePicker
            onChange={(_, startLeaseDate) => this.setState({ startLeaseDate })}
          />
        </FormItem>
        <FormItem label={strings.leaseLength}>
          <InputNumber
            min={1}
            value={this.state.leaseLength}
            onChange={val =>
              this.setState({ leaseLength: parseInt(val.toString()) })
            }
          />
        </FormItem>
        <FormItem label={strings.gracePeriodLength}>
          <InputNumber
            min={0}
            value={this.state.gracePeriodLength}
            onChange={val =>
              this.setState({ gracePeriodLength: parseInt(val.toString()) })
            }
          />
        </FormItem>
        <FormItem label={strings.paymentEveryMonths}>
          <InputNumber
            min={1}
            value={this.state.paymentEveryMonths}
            onChange={val =>
              this.setState({ paymentEveryMonths: parseInt(val.toString()) })
            }
          />
        </FormItem>
        <FormItem label={strings.monthDayOfPayment}>
          <InputNumber
            min={1}
            max={28}
            value={this.state.monthDayOfPayment}
            onChange={val =>
              this.setState({ monthDayOfPayment: parseInt(val.toString()) })
            }
          />
        </FormItem>
        <FormItem label={strings.paymentMethod}>
          <Select
            style={{ width: "100%" }}
            defaultValue={this.state.paymentMethod}
            onChange={val =>
              this.setState({ paymentMethod: val.toString() as any })
            }
          >
            <Option value="check">צ'קים</Option>
            <Option value="cash">מזומן</Option>
            <Option value="bankTransfer">העברה בנקאית</Option>
            <Option value="other">אחר</Option>
          </Select>
        </FormItem>
        <FormItem label={strings.paymentIndexLink}>
          <Select
            style={{ width: "100%" }}
            defaultValue={this.state.paymentIndexLink}
            onChange={val =>
              this.setState({ paymentIndexLink: val.toString() as any })
            }
          >
            <Option value="madad">הצמדה למדד</Option>
            <Option value="madadUps">הצמדה לעליות המדד</Option>
            <Option value="dolar">הצמדה לדולר</Option>
            <Option value="other">אחר</Option>
          </Select>
        </FormItem>

        <Divider>{strings.optionPeriods}</Divider>
        <OptionForm
          optionPeriods={this.state.optionPeriods}
          onChange={optionPeriods => this.setState({ optionPeriods })}
        />

        <Divider>{strings.checkBundles}</Divider>
        <CheckBundleForm
          amountOfChecksValue={this.state.checkBundles[0].amountOfChecks}
          amountOfChecksOnChange={val =>
            this.setState({
              checkBundles: [
                { ...this.state.checkBundles[0], amountOfChecks: val }
              ]
            })
          }
          dateOfFirstCheckValue={1200}
          dateOfFirstCheckOnChange={val => console.log(val)}
          checkForHowManyMonthsValue={12}
          checkForHowManyMonthsOnChange={val => console.log(val)}
        />
        <Button>+</Button>

        <Divider>{strings.paymentPeriods}</Divider>
        <PaymentPeriodForm
          lengthInMonthsValue={12}
          lengthInMonthsOnChange={val => console.log(val)}
          amountPerMonthValue={1200}
          amountPerMonthOnChange={val => console.log(val)}
        />
        <Button>+</Button>

        <FormItem label={strings.comments}>
          <TextArea
            value={this.state.comments}
            onChange={({ target }) => this.setState({ comments: target.value })}
            autosize={{ minRows: 2, maxRows: 6 }}
          />
        </FormItem>

        <Button type="primary" onClick={this.onSubmit}>
          {strings.submit}
        </Button>
      </div>
    );
  }
}

const CaseItemSelect = props => (
  <Select {...props} style={{ width: "100%" }}>
    {props.options.map((item, index) => (
      <Option key={index} value={item.id}>
        {item.name}
      </Option>
    ))}
  </Select>
);

const UnitSelect = (props: {
  asset?: Asset;
  onChange: (unitIds: string[]) => void;
}) => {
  const { asset } = props;
  return (
    <Select mode="multiple" onChange={props.onChange} style={{ width: "100%" }}>
      {asset &&
        asset.units.map((unit, index) => (
          <Option key={index} value={unit.id || index}>
            {unit.name}
          </Option>
        ))}
    </Select>
  );
};

export const PaymentPeriodForm = (props: {
  lengthInMonthsValue: number;
  lengthInMonthsOnChange: (val: number) => void;
  amountPerMonthValue: number;
  amountPerMonthOnChange: (val: number) => void;
}) => (
  <div style={{ border: "1px dashed", width: "80%", padding: 9, margin: 4 }}>
    <FormItem label={strings.paymentPeriodLengthInMonths}>
      <InputNumber
        min={1}
        value={props.lengthInMonthsValue}
        onChange={props.lengthInMonthsOnChange}
      />
    </FormItem>
    <FormItem label={strings.paymentPeriodAmountPerMonth}>
      <InputNumber
        min={1}
        value={props.amountPerMonthValue}
        onChange={props.amountPerMonthOnChange}
      />
    </FormItem>
    <Button>X</Button>
  </div>
);

export const CheckBundleForm = (props: {
  amountOfChecksValue: number;
  amountOfChecksOnChange: (val: number) => void;
  dateOfFirstCheckValue: number;
  dateOfFirstCheckOnChange: (val: string) => void;
  checkForHowManyMonthsValue: number;
  checkForHowManyMonthsOnChange: (val: number) => void;
}) => (
  <div style={{ border: "1px dashed", width: "80%", padding: 9, margin: 4 }}>
    <FormItem label={strings.amountOfChecks}>
      <InputNumber
        min={1}
        value={props.amountOfChecksValue}
        onChange={props.amountOfChecksOnChange}
      />
    </FormItem>
    <FormItem label={strings.dateOfFirstCheck}>
      <DatePicker
        onChange={(_, startLeaseDate) =>
          props.dateOfFirstCheckOnChange(startLeaseDate)
        }
      />
    </FormItem>
    <FormItem label={strings.checkForHowManyMonths}>
      <InputNumber
        min={1}
        value={props.checkForHowManyMonthsValue}
        onChange={props.checkForHowManyMonthsOnChange}
      />
    </FormItem>
    <Button>X</Button>
  </div>
);
