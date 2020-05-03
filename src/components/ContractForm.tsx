import React from "react";
import shortid from "shortid";
import { Button, DatePicker, Input, InputNumber, Divider, Select } from "antd";

import { Contract, Asset } from "../types";
import { generateTasks, firebaseService } from "../service";
import { FormItem } from "./FormItem";

import { OptionForm } from "./OptionForm";
import { PaymentPeriodForm } from "./PaymentPeriodForm";
import { CheckBundleForm } from "./CheckBundleForm";
import { CollateralForm } from "./CollateralForm";
import { GuaranteeForm } from "./GuaranteeForm";

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
  collaterals: "בטחונות",
  guarantees: "ערבים לחוזה",
  comments: "הערות",
};

interface ContractFormProps {
  tenants: any;
  assets: Asset[];
  contract: any;
  actions: any;
  editContract: Contract;
}
interface ContractFormState extends Contract {}

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
  checkBundles: [],
  paymentPeriods: [],
  collaterals: [],
  guarantees: [],
  comments: "",
};

export class ContractForm extends React.Component<
  ContractFormProps,
  ContractFormState
> {
  state = this.props.editContract || { ...initialState };

  unitSelectComponent = (
    <UnitSelect onChange={(unitIds: string[]) => this.setState({ unitIds })} />
  );

  onSelectAssetChange = (assetId: string) => {
    this.unitSelectComponent = <div />;
    this.setState({ assetId }, () => {
      this.unitSelectComponent = (
        <UnitSelect
          asset={this.props.assets.find((asset) => asset.id === assetId)}
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
    const { tenants, assets } = this.props;
    return (
      <div style={{ direction: "rtl" }}>
        <FormItem label={strings.tenant}>
          <CaseItemSelect
            options={tenants}
            value={this.state.tenantId}
            onChange={(tenantId) => this.setState({ tenantId })}
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
            onChange={(val) =>
              this.setState({ leaseLength: parseInt(val.toString()) })
            }
          />
        </FormItem>
        <FormItem label={strings.gracePeriodLength}>
          <InputNumber
            min={0}
            value={this.state.gracePeriodLength}
            onChange={(val) =>
              this.setState({ gracePeriodLength: parseInt(val.toString()) })
            }
          />
        </FormItem>
        <FormItem label={strings.paymentEveryMonths}>
          <InputNumber
            min={1}
            value={this.state.paymentEveryMonths}
            onChange={(val) =>
              this.setState({ paymentEveryMonths: parseInt(val.toString()) })
            }
          />
        </FormItem>
        <FormItem label={strings.monthDayOfPayment}>
          <InputNumber
            min={1}
            max={28}
            value={this.state.monthDayOfPayment}
            onChange={(val) =>
              this.setState({ monthDayOfPayment: parseInt(val.toString()) })
            }
          />
        </FormItem>
        <FormItem label={strings.paymentMethod}>
          <Select
            style={{ width: "100%" }}
            defaultValue={this.state.paymentMethod}
            onChange={(val) =>
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
            onChange={(val) =>
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
          onChange={(optionPeriods) => this.setState({ optionPeriods })}
        />

        <Divider>{strings.checkBundles}</Divider>
        <CheckBundleForm
          checkBundles={this.state.checkBundles}
          onChange={(checkBundles) => this.setState({ checkBundles })}
        />

        <Divider>{strings.paymentPeriods}</Divider>
        <PaymentPeriodForm
          paymentPeriods={this.state.paymentPeriods}
          onChange={(paymentPeriods) => this.setState({ paymentPeriods })}
        />

        <Divider>{strings.collaterals}</Divider>
        <CollateralForm
          collaterals={this.state.collaterals}
          onChange={(collaterals) => this.setState({ collaterals })}
        />

        <Divider>{strings.guarantees}</Divider>
        <GuaranteeForm
          guarantees={this.state.guarantees}
          onChange={(guarantees) => this.setState({ guarantees })}
        />

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

const CaseItemSelect = (props) => (
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
