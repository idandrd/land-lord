import React from "react";
import PropTypes from "prop-types";
import { Input, Button } from "antd";

const strings = {
  nameLabel: "שם",
  roleLabel: "תפקיד",
  phoneLabel: "טלפון",
  emailLabel: "מייל"
};

export class ContactForm extends React.Component {
  render() {
    const { fieldValues, actions } = this.props;
    return (
      <div>
        <Input
          placeholder={strings.nameLabel}
          value={fieldValues.name}
          onChange={e => actions.setContactName(e.target.value)}
        />
        <Input
          placeholder={strings.roleLabel}
          value={fieldValues.role}
          onChange={e => actions.setContactRole(e.target.value)}
        />
        <Input
          placeholder={strings.phoneLabel}
          value={fieldValues.phone}
          onChange={e => actions.setContactPhone(e.target.value)}
        />
        <Input
          placeholder={strings.emailLabel}
          value={fieldValues.email}
          onChange={e => actions.setContactEmail(e.target.value)}
        />
        <Button onClick={actions.removeContact}>X</Button>
      </div>
    );
  }
}

ContactForm.propTypes = {
  fieldValues: PropTypes.any,
  actions: PropTypes.any
};
