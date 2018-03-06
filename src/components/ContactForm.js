import React, {Component} from 'react';
import { Form, Input, Icon, Button, Tooltip, Radio, TextArea } from 'antd';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Textos = Input.TextArea;

const strings = {
  nameLabel: 'שם',
  roleLabel: 'תפקיד',
  phoneLabel: 'טלפון',
  emailLabel: 'מייל',
}


class ContactForm extends Component {
  state = {};

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    const { getFieldDecorator } = this.props;
    
    return (
      <div>
        
        <FormItem label={strings.nameLabel}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: strings.missingRequiredField }],
          })(
            <Input/>
          )}
        </FormItem>
        
        <FormItem label={strings.roleLabel}>
          {getFieldDecorator('role')(
            <Input/>
          )}
        </FormItem>

        <FormItem label={strings.phoneLabel}>
          {getFieldDecorator('phone')(
            <Input/>
          )}
        </FormItem>

        <FormItem label={strings.emailLabel}>
          {getFieldDecorator('email', {
            rules: [{type: 'email', message: 'The input is not valid E-mail!',}]
          })(
            <Input/>
          )}
        </FormItem>

      </div>
    );
  }
}

export default Form.create()(ContactForm);