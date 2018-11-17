import React, { Component } from "react";
import * as _ from "lodash";
import { Input, Button, Radio, Divider } from "antd";
import { FormItem } from "./FormItem";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Textos = Input.TextArea;

const strings = {
  businessRadio: "עסק",
  privateRadio: "פרטי",
  isBusinessLabel: "האם עסק",
  nameLabel: "שם השוכר",
  BusinessIdLabel: "ח.פ.",
  PrivateIdLabel: "ת.ז.",
  typeLabel: "סוג העסק",
  privateTypeLabel: "שימוש",
  commentsLabel: "הערות",
  missingRequiredField: "אנא מלא שדה זה",
  submitLabel: "שמור",
  contacts: "אנשי קשר",
  privateTypeValue: "מגורים",
  save: "שמור",
  addContact: "איש קשר חדש",
  nameLabel: "שם",
  roleLabel: "תפקיד",
  phoneLabel: "טלפון",
  otherPhoneLabel: "טלפון נוסף",
  faxLabel: "פקס",
  emailLabel: "מייל"
};

const emptyContact = {
  name: "",
  role: "",
  phone: "",
  otherPhone: "",
  fax: "",
  email: ""
};

const initialState = {
  isBusiness: true,
  name: "",
  idNum: "",
  type: "",
  comments: "",
  contacts: [{ ...emptyContact }],

  lastBusinessType: ""
};

export class TenantForm extends Component {
  state = { ...initialState };

  onContactRemove = contactKey => {
    const contacts = this.state.contacts.filter(
      (_contact, i) => i !== contactKey
    );
    this.setState({ contacts });
  };

  addContact = () =>
    this.setState({ contacts: [...this.state.contacts, { ...emptyContact }] });

  onContactChange = (contactKey, field, value) => {
    const updatedContact = {
      ...this.state.contacts[contactKey],
      [field]: value
    };
    const contacts = [...this.state.contacts];
    contacts[contactKey] = updatedContact;
    this.setState({ contacts });
  };

  handleIsBusinessChange = e => {
    const { value } = e.target;
    if (value) {
      this.setState({ isBusiness: value, type: this.state.lastBusinessType });
    } else {
      this.setState({
        isBusiness: value,
        lastBusinessType: this.state.type,
        type: strings.privateTypeValue
      });
    }
  };

  onSubmit = () => {
    const { name, isBusiness, idNum, type, comments, contacts } = this.state;
    this.props.actions.onSubmit({
      name,
      isBusiness,
      idNum,
      type,
      comments,
      contacts
    });
  };

  render() {
    return (
      <div style={{ direction: "rtl" }}>
        <FormItem label={strings.nameLabel}>
          <Input
            value={this.state.name}
            onChange={({ target }) => this.setState({ name: target.value })}
          />
        </FormItem>

        <FormItem label={strings.isBusinessLabel}>
          <RadioGroup
            value={this.state.isBusiness}
            onChange={this.handleIsBusinessChange}
          >
            <RadioButton value={true}>{strings.businessRadio}</RadioButton>
            <RadioButton value={false}>{strings.privateRadio}</RadioButton>
          </RadioGroup>
        </FormItem>

        <FormItem
          label={
            this.state.isBusiness
              ? strings.BusinessIdLabel
              : strings.PrivateIdLabel
          }
        >
          <Input
            value={this.state.idNum}
            onChange={({ target }) => this.setState({ idNum: target.value })}
          />
        </FormItem>

        <FormItem
          label={
            this.state.isBusiness ? strings.typeLabel : strings.privateTypeLabel
          }
        >
          <Input
            value={this.state.type}
            onChange={({ target }) => this.setState({ type: target.value })}
            disabled={!this.state.isBusiness}
          />
        </FormItem>

        <FormItem label={strings.commentsLabel}>
          <Textos
            value={this.state.comments}
            onChange={({ target }) => this.setState({ comments: target.value })}
            autosize={{ minRows: 2, maxRows: 6 }}
          />
        </FormItem>

        <Divider>{strings.contacts}</Divider>

        {this.state.contacts.map((contact, key) => (
          <ContactForm
            key={key}
            contact={contact}
            onRemove={() => this.onContactRemove(key)}
            onFieldChange={(field, value) =>
              this.onContactChange(key, field, value)
            }
          />
        ))}
        <Button onClick={this.addContact}>{strings.addContact}</Button>
        <Button type="primary" onClick={this.onSubmit}>
          {strings.save}
        </Button>
      </div>
    );
  }
}

export class ContactForm extends React.Component {
  render() {
    const { contact, onRemove } = this.props;
    const onChange = fieldName => e =>
      this.props.onFieldChange(fieldName, e.target.value);
    return (
      <div
        style={{ border: "1px dashed", width: "80%", padding: 9, margin: 4 }}
      >
        <FormItem label={strings.nameLabel}>
          <Input value={contact.name} onChange={onChange("name")} />
        </FormItem>
        <FormItem label={strings.roleLabel}>
          <Input value={contact.role} onChange={onChange("role")} />
        </FormItem>
        <FormItem label={strings.phoneLabel}>
          <Input value={contact.phone} onChange={onChange("phone")} />
        </FormItem>
        <FormItem label={strings.otherPhoneLabel}>
          <Input value={contact.otherPhone} onChange={onChange("otherPhone")} />
        </FormItem>
        <FormItem label={strings.faxLabel}>
          <Input value={contact.fax} onChange={onChange("fax")} />
        </FormItem>
        <FormItem label={strings.emailLabel}>
          <Input value={contact.email} onChange={onChange("email")} />
        </FormItem>
        <Button onClick={onRemove}>X</Button>
      </div>
    );
  }
}
