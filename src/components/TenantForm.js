import React, { Component } from "react";
import PropTypes from "prop-types";
import * as _ from "lodash";
import { Form, Input, Button, Radio, Divider } from "antd";
import { ContactForm } from "./ContactForm";

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
  privateTypeValue: "מגורים",
  addContact: "איש קשר חדש"
};

export class TenantForm extends Component {
  state = { lastBusinessType: "" };
  render() {
    const { tenant, actions, contactActions } = this.props;
    return (
      <Form style={{ direction: "rtl" }}>
        <FormItem>
          <RadioGroup
            value={tenant.isBusiness}
            onChange={this.handleIsBusinessChange}
          >
            <RadioButton value={true}>{strings.businessRadio}</RadioButton>
            <RadioButton value={false}>{strings.privateRadio}</RadioButton>
          </RadioGroup>
        </FormItem>

        <FormItem label={strings.nameLabel}>
          <Input
            value={tenant.name}
            onChange={e => actions.setTenantName(e.target.value)}
          />
        </FormItem>

        <FormItem
          label={
            tenant.isBusiness ? strings.BusinessIdLabel : strings.PrivateIdLabel
          }
        >
          <Input
            value={tenant.idNum}
            onChange={e => actions.setTenantNum(e.target.value)}
          />
        </FormItem>

        <FormItem
          label={
            tenant.isBusiness ? strings.typeLabel : strings.privateTypeLabel
          }
        >
          <Input
            value={tenant.type}
            onChange={e => actions.setTenantType(e.target.value)}
            disabled={!tenant.isBusiness}
          />
        </FormItem>

        <FormItem label={strings.commentsLabel}>
          <Textos
            value={tenant.comments}
            onChange={e => actions.setTenantComments(e.target.value)}
            autosize={{ minRows: 2, maxRows: 6 }}
          />
        </FormItem>

        <Divider>{strings.contacts}</Divider>

        {tenant.contacts.map(contact => {
          const { id, ...fieldValues } = contact;
          return (
            <div
              key={id}
              style={{
                border: "solid 1px #d8d8d8",
                padding: "10px",
                marginTop: "10px"
              }}
            >
              <ContactForm
                fieldValues={{ ...fieldValues }}
                actions={wrapContactActions(contactActions, id)}
              />
            </div>
          );
        })}
        <Button type="dashed" onClick={actions.addContact}>
          {strings.addContact}
        </Button>
        <Button onClick={() => actions.onSubmit(tenant)}>Save!</Button>
      </Form>
    );
  }

  handleIsBusinessChange = e => {
    const { value } = e.target;
    const { tenant, actions } = this.props;
    actions.setTenantIsBusiness(value);
    if (value) {
      actions.setTenantType(this.state.lastBusinessType);
    } else {
      this.setState({ lastBusinessType: tenant.type });
      actions.setTenantType(strings.privateTypeValue);
    }
  };
}

const wrapContactActions = (actions, id) =>
  _.mapValues(actions, action => (...params) => action(id, ...params));

TenantForm.propTypes = {
  tenant: PropTypes.shape({
    isBusiness: PropTypes.bool,
    name: PropTypes.string,
    idNum: PropTypes.string,
    type: PropTypes.string,
    comments: PropTypes.string,
    contacts: PropTypes.array
  }),
  actions: PropTypes.shape({
    setTenantIsBusiness: PropTypes.func,
    setTenantName: PropTypes.func,
    setTenantNum: PropTypes.func,
    setTenantType: PropTypes.func,
    setTenantComments: PropTypes.func,
    addContact: PropTypes.func,
    onSubmit: PropTypes.func
  }),
  contactActions: PropTypes.shape({
    setContactName: PropTypes.func,
    setContactRole: PropTypes.func,
    setContactPhone: PropTypes.func,
    setContactEmail: PropTypes.func
  })
};
