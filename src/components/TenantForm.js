import React, { Component } from "react";
import {
  Form,
  Input,
  Icon,
  Button,
  Tooltip,
  Radio,
  TextArea,
  Divider,
  Row,
  Col
} from "antd";
import ContactForm from "./ContactForm";

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Textos = Input.TextArea;

const strings = {
  businessRadio: "עסק",
  privateRadio: "פרטי",
  nameLabel: "שם השוכר",
  BusinessIdLabel: "ח.פ.",
  PrivateIdLabel: "ת.ז.",
  typeLabel: "סוג העסק",
  privateTypeLabel: "שימוש",
  commentsLabel: "הערות",
  missingRequiredField: "אנא מלא שדה זה",
  submitLabel: "שמור",
  contacts: "אנשי קשר",
  privateTypeValue: "מגורים"
};

export class TenantForm extends Component {
  state = { lastBusinessType: "" };
  render() {
    const { fields } = this.props;
    return (
      <Form
        onSubmit={() => console.log("Submited!!")}
        style={{ direction: "rtl" }}
      >
        <FormItem>
          <RadioGroup
            value={fields.isBusiness.value}
            onChange={this.handleIsBusinessChange}
          >
            <RadioButton value={true}>{strings.businessRadio}</RadioButton>
            <RadioButton value={false}>{strings.privateRadio}</RadioButton>
          </RadioGroup>
        </FormItem>

        <FormItem label={strings.nameLabel}>
          <Input
            value={fields.name.value}
            onChange={e => fields.name.onChange(e.target.value)}
          />
        </FormItem>

        <FormItem
          label={
            fields.isBusiness.value
              ? strings.BusinessIdLabel
              : strings.PrivateIdLabel
          }
        >
          <Input
            value={fields.num.value}
            onChange={e => fields.num.onChange(e.target.value)}
          />
        </FormItem>

        <FormItem
          label={
            fields.isBusiness.value
              ? strings.typeLabel
              : strings.privateTypeLabel
          }
        >
          <Input
            value={fields.type.value}
            onChange={e => fields.type.onChange(e.target.value)}
            disabled={!fields.isBusiness.value}
          />
        </FormItem>

        <FormItem label={strings.commentsLabel}>
          <Textos
            value={fields.comments.value}
            onChange={e => fields.comments.onChange(e.target.value)}
            autosize={{ minRows: 2, maxRows: 6 }}
          />
        </FormItem>
        {/*

        <Divider>{strings.contacts}</Divider>
        <ContactForm getFieldDecorator={getFieldDecorator} /> */}
      </Form>
    );
  }

  handleIsBusinessChange = e => {
    const { value } = e.target;
    const { fields } = this.props;
    fields.isBusiness.onChange(value);
    if (value) {
      fields.type.onChange(this.state.lastBusinessType);
    } else {
      this.setState({ lastBusinessType: fields.type.value });
      fields.type.onChange(strings.privateTypeValue);
    }
  };
}
