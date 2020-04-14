import { Button, Input, Select } from "antd";
import React from "react";
import { BaseOwner } from "../types";
import { FormItem } from "./FormItem";
import shortid from "shortid";
const Option = Select.Option;

export const strings = {
  ownerName: "שם",
  ownerType: "סוג הבעלים",
  IdNum: "ת.ז./ח.פ.",
  comments: "הערות",
  save: "שמור",
  partnership: "שותפות",
  company: "חברה",
  private: "פרטי"
};

interface OwnerFormState extends BaseOwner {
  id: string;
}

const initialState: OwnerFormState = {
  id: "NOT-SET",
  name: "",
  type: "",
  idNum: "",
  comments: ""
};

export class OwnerForm extends React.Component<any, OwnerFormState> {
  state = { ...initialState };

  onSubmit = () => {
    const owner = {
      name: this.state.name,
      type: this.state.type,
      idNum: this.state.idNum,
      comments: this.state.comments,
      id: this.state.id
    };
    this.props.onSubmit(owner);
  };

  componentDidMount() {
    this.setState({ id: shortid.generate() });
    const { editOwner } = this.props;
    if (editOwner) {
      this.setState({
        ...editOwner,
        showTypeInUnits: true,
        showOwnerInUnits: true
      });
    }
  }

  render() {
    return (
      <div style={{ direction: "rtl" }}>
        <FormItem label={strings.ownerName}>
          <Input
            value={this.state.name}
            onChange={({ target }) => this.setState({ name: target.value })}
          />
        </FormItem>
        <FormItem label={strings.ownerType}>
          <Select
            onChange={(type: string) => this.setState({type})}
            style={{ width: "100%" }}
          >
            <Option value={strings.company}>{strings.company}</Option>
            <Option value={strings.partnership}>{strings.partnership}</Option>
            <Option value={strings.private}>{strings.private}</Option>
          </Select>
        </FormItem>
        <FormItem label={strings.IdNum}>
          <Input
            value={this.state.idNum}
            onChange={({ target }) => this.setState({ idNum: target.value })}
          />
        </FormItem>
        <FormItem label={strings.comments}>
          <Input
            value={this.state.comments}
            onChange={({ target }) => this.setState({ comments: target.value })}
          />
        </FormItem>

        <Button type="primary" onClick={this.onSubmit}>
          {strings.save}
        </Button>
        <Button onClick={() => console.log(this.state)}>log</Button>
      </div>
    );
  }
}
