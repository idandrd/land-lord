import React, { Component } from "react";
import { Button, Modal } from "antd";
import TenantsTable from "../components/TenantsTable";
import { TenantFormContainer } from "./TenantForm";

const strings = {
  modalTitle: "שוכר חדש",
  modalOkText: "שמור",
  modalCancelText: "ביטול"
};

export default class Tenants extends Component {
  state = {
    modalVisible: false
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.toggleModal}>
          {strings.modalTitle}
        </Button>
        <TenantsTable />
        <Modal
          visible={this.state.modalVisible}
          onOk={this.handleModalOk}
          onCancel={this.toggleModal}
          title={strings.modalTitle}
          okText={strings.modalOkText}
          cancelText={strings.modalCancelText}
          style={{ direction: "rtl" }}
          closable={false}
        >
          <TenantFormContainer />
        </Modal>
      </div>
    );
  }

  toggleModal = () => this.setState({ modalVisible: !this.state.modalVisible });

  handleModalOk = () => {
    this.toggleModal();
  };
}
